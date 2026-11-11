import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';

export const getGroupAction = createAction({
  auth: waservixAuth,
  name: 'get_group',
  classification: 'READ',
  displayName: 'Get Group',
  description: 'Group name, participants and settings.',
  audience: 'both',
  aiMetadata: {
    description:
      'Get one WhatsApp group the number belongs to by its group ID (ends in @g.us): name, participants, settings. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {
    group_id: Property.ShortText({ displayName: 'Group ID', description: 'Ends in @g.us. Find it with List Groups.', required: true }),
  },
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: `/groups/${context.propsValue.group_id.trim()}/metadata` });
  },
});
