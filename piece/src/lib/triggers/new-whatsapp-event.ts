import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';

export const newWhatsappEventTrigger = createTrigger({
  auth: waservixAuth,
  name: 'new_whatsapp_event',
  classification: 'READ',
  displayName: 'New WhatsApp Event',
  description: 'Starts when your WhatsApp number receives a message, a message status changes or the connection changes.',
  aiMetadata: {
    description:
      'Fires once per WAservix webhook event for the connected WhatsApp number: an incoming personal or group message, a status update (delivered, read), a reaction, a deletion, a call or a session change. The payload holds the event name and its data.',
  },
  props: {
    setup: Property.MarkDown({
      value: `**One-time setup in WAservix**

1. Copy this URL:
\`\`\`text
{{webhookUrl}}
\`\`\`
2. In your Tekservix dashboard open **WAservix → Devices**, open your number and paste it in **Webhook URL**.
3. Tick the events you want WAservix to send, then save.
4. Optional: copy the number's **Webhook secret** into the field below so this flow ignores calls that did not come from WAservix.`,
    }),
    events: Property.StaticMultiSelectDropdown({
      displayName: 'Events',
      description: 'Only start the flow for these events. Leave empty for every event WAservix sends.',
      required: false,
      options: {
        options: [
          { label: 'Message Received (any)', value: 'messages.received' },
          { label: 'Personal Message Received', value: 'messages-personal.received' },
          { label: 'Group Message Received', value: 'messages-group.received' },
          { label: 'Message Sent', value: 'message.sent' },
          { label: 'Message Status Update', value: 'messages.update' },
          { label: 'Read Receipt', value: 'message-receipt.update' },
          { label: 'Message Reaction', value: 'messages.reaction' },
          { label: 'Message Deleted', value: 'messages.deleted' },
          { label: 'Call Received', value: 'call.received' },
          { label: 'Session Status', value: 'session.status' },
        ],
      },
    }),
    webhook_secret: Property.ShortText({
      displayName: 'Webhook Secret',
      description: 'The Webhook secret of the same number, from WAservix → Devices. Leave empty to accept every call.',
      required: false,
    }),
  },
  type: TriggerStrategy.WEBHOOK,
  sampleData: {
    event: 'messages-personal.received',
    data: {
      msgId: '3EB0C431C26A1916E1A2',
      from: '+250788123456',
      pushName: 'Aline',
      type: 'text',
      text: 'Hi, do you deliver on Saturday?',
      timestamp: 1762853400,
    },
  },
  async onEnable() {
    return;
  },
  async onDisable() {
    return;
  },
  async run(context) {
    const secret = context.propsValue.webhook_secret ?? '';
    const headers = context.payload.headers ?? {};
    if (secret && !waservixApi.verifySecret({ given: headers['x-webhook-signature'], secret })) {
      return [];
    }
    const body = context.payload.body;
    const event = body !== null && typeof body === 'object' && 'event' in body ? String(body.event) : '';
    const events = context.propsValue.events ?? [];
    if (events.length > 0 && !events.includes(event)) {
      return [];
    }
    return [body];
  },
});
