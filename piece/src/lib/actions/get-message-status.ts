import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const getMessageStatusAction = createAction({
  auth: waservixAuth,
  name: 'get_message_status',
  classification: 'READ',
  displayName: 'Get Message Status',
  description: 'Queued, sent, delivered, read, played or failed.',
  audience: 'both',
  aiMetadata: {
    description:
      'Get the delivery status of one sent WhatsApp message by its msgId (queued, sent, delivered, read, played or failed). Read-only, safe to retry.',
    idempotent: true,
  },
  props: {
    msg_id: waservixProps.msgId,
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: `/messages/${waservixApi.id(context.propsValue.msg_id)}/info` });
  },
});
