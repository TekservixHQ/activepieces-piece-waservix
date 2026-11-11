import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const resendMessageAction = createAction({
  auth: waservixAuth,
  name: 'resend_message',
  classification: 'WRITE',
  displayName: 'Resend Message',
  description: 'Try a failed message again.',
  audience: 'both',
  aiMetadata: {
    description:
      'Queue a failed WhatsApp message to be sent again by its msgId. Only for failed messages; retrying may send twice.',
    idempotent: false,
  },
  props: {
    msg_id: waservixProps.msgId,
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.POST, path: `/messages/${waservixApi.id(context.propsValue.msg_id)}/resend` });
  },
});
