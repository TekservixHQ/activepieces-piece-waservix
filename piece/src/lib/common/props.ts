import { Property } from '@activepieces/pieces-framework';

export const waservixProps = {
  to: Property.ShortText({
    displayName: 'To',
    description: 'Phone number in international format (e.g. +250788123456), or a group ID ending in @g.us.',
    required: true,
  }),
  msgId: Property.ShortText({
    displayName: 'Message ID',
    description: 'The msgId returned when the message was sent (also in the "Message Sent" trigger).',
    required: true,
  }),
  phone: Property.ShortText({
    displayName: 'Phone Number',
    description: 'In international format, e.g. +250788123456.',
    required: true,
  }),
};
