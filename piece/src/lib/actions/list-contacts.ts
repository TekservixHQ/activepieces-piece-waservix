import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';

export const listContactsAction = createAction({
  auth: waservixAuth,
  name: 'list_contacts',
  classification: 'SEARCH',
  displayName: 'List Contacts',
  description: 'All contacts of your WhatsApp number.',
  audience: 'both',
  aiMetadata: {
    description:
      'List the WhatsApp contacts of the connected number. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {},
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: '/contacts' });
  },
});
