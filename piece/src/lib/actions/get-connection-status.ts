import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';

export const getConnectionStatusAction = createAction({
  auth: waservixAuth,
  name: 'get_connection_status',
  classification: 'READ',
  displayName: 'Get Connection Status',
  description: 'Is your number connected, or does it need a QR scan?',
  audience: 'both',
  aiMetadata: {
    description:
      'Get the connection status of the WhatsApp number (connected, connecting, need_scan, disconnected, logged_out or expired). Use it before a big send. Read-only, safe to retry.',
    idempotent: true,
  },
  props: {},
  async run(context) {
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.GET, path: '/status' });
  },
});
