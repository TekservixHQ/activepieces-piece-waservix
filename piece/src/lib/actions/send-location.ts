import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const sendLocationAction = createAction({
  auth: waservixAuth,
  name: 'send_location',
  classification: 'WRITE',
  displayName: 'Send Location',
  description: 'Send a map pin.',
  audience: 'both',
  aiMetadata: {
    description:
      'Send a location pin on WhatsApp from latitude and longitude, with an optional place name. Retrying sends duplicates.',
    idempotent: false,
  },
  props: {
    to: waservixProps.to,
    latitude: Property.Number({ displayName: 'Latitude', description: 'e.g. -1.9441', required: true }),
    longitude: Property.Number({ displayName: 'Longitude', description: 'e.g. 30.0619', required: true }),
    name: Property.ShortText({ displayName: 'Place Name', required: false }),
  },
  async run(context) {
    const { to, latitude, longitude, name } = context.propsValue;
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.POST, path: '/send-message', body: { to, location: { latitude, longitude, ...(name ? { name } : {}) } } });
  },
});
