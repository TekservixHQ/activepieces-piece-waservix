import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const sendTextAction = createAction({
  auth: waservixAuth,
  name: 'send_text',
  classification: 'WRITE',
  displayName: 'Send Text',
  description: 'Send a WhatsApp text message from your number.',
  audience: 'both',
  aiMetadata: {
    description:
      'Send a WhatsApp text message from the connected number to a phone number or group. Use Send Image or Send Document for files. Each call sends again, so retrying sends duplicates.',
    idempotent: false,
  },
  props: {
    to: waservixProps.to,
    text: Property.LongText({ displayName: 'Message', description: 'The text to send. WhatsApp formatting works: *bold*, _italic_, ~strike~.', required: true }),
  },
  async run(context) {
    const { to, text } = context.propsValue;
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.POST, path: '/send-message', body: { to, text } });
  },
});
