import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const checkNumberAction = createAction({
  auth: waservixAuth,
  name: 'check_number',
  classification: 'READ',
  displayName: 'Check WhatsApp Number',
  description: 'Check whether a phone number has WhatsApp.',
  audience: 'both',
  aiMetadata: {
    description:
      'Check whether a phone number has a WhatsApp account before messaging it. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {
    phone: waservixProps.phone,
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: `/on-whatsapp/${waservixApi.id(context.propsValue.phone)}` });
  },
});
