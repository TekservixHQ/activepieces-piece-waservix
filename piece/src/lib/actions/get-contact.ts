import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const getContactAction = createAction({
  auth: waservixAuth,
  name: 'get_contact',
  classification: 'READ',
  displayName: 'Get Contact',
  description: 'Get one WhatsApp contact.',
  audience: 'both',
  aiMetadata: {
    description:
      'Get one WhatsApp contact of the connected number by phone number. Use List Contacts to see all. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {
    phone: waservixProps.phone,
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: `/contacts/${waservixApi.id(context.propsValue.phone)}` });
  },
});
