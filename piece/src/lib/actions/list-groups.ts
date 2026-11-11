import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';

export const listGroupsAction = createAction({
  auth: waservixAuth,
  name: 'list_groups',
  classification: 'SEARCH',
  displayName: 'List Groups',
  description: 'All WhatsApp groups your number is in.',
  audience: 'both',
  aiMetadata: {
    description:
      'List the WhatsApp groups the connected number is in, with their group IDs for sending. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {},
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: '/groups' });
  },
});
