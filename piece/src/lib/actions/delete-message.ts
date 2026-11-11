import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const deleteMessageAction = createAction({
  auth: waservixAuth,
  name: 'delete_message',
  classification: 'DESTRUCTIVE',
  displayName: 'Delete Message',
  description: 'Delete a message you sent, for everyone.',
  audience: 'both',
  aiMetadata: {
    description:
      'Delete a WhatsApp message the connected number sent, for everyone in the chat. Cannot be undone; a repeat call fails.',
    idempotent: false,
  },
  props: {
    msg_id: waservixProps.msgId,
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.DELETE, path: `/messages/${waservixApi.id(context.propsValue.msg_id)}` });
  },
});
