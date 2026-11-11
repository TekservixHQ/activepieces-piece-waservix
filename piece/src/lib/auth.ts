import { PieceAuth } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixApi } from './common';

export const waservixAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: `You need a Tekservix account with WAservix and a WhatsApp number connected (scan the QR code once in the dashboard).

1. Sign in at https://tekservix.com and open **WAservix → Devices**.
2. Open your number and copy its **API key**.
3. Paste it here. Each WhatsApp number has its own key, so add one connection per number.

No account yet? Start at https://tekservix.com/waservix`,
  required: true,
  validate: async ({ auth }) => {
    const result = await waservixApi
      .call({ apiKey: auth, method: HttpMethod.GET, path: '/status' })
      .then(() => ({ valid: true as const }))
      .catch(() => ({ valid: false as const, error: 'This API key was not accepted by WAservix.' }));
    return result;
  },
});
