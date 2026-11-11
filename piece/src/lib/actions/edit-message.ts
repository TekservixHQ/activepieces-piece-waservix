import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const editMessageAction = createAction({
  auth: waservixAuth,
  name: 'edit_message',
  classification: 'WRITE',
  displayName: 'Edit Message',
  description: 'Change the text of a message you sent (about 15 minutes after sending).',
  audience: 'both',
  aiMetadata: {
    description:
      'Replace the text of a WhatsApp text message the connected number sent, within about 15 minutes of sending. Setting the same text again is harmless.',
    idempotent: true,
  },
  props: {
    msg_id: waservixProps.msgId,
    text: Property.LongText({ displayName: 'New Text', required: true }),
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.PUT, path: `/messages/${waservixApi.id(context.propsValue.msg_id)}`, body: { text: context.propsValue.text } });
  },
});
