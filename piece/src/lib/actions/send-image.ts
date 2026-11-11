import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const sendImageAction = createAction({
  auth: waservixAuth,
  name: 'send_image',
  classification: 'WRITE',
  displayName: 'Send Image',
  description: 'Send an image by URL, with an optional caption.',
  audience: 'both',
  aiMetadata: {
    description:
      'Send an image on WhatsApp from a public image URL, with an optional caption. Use Send Document for PDFs and other files. Retrying sends duplicates.',
    idempotent: false,
  },
  props: {
    to: waservixProps.to,
    image_url: Property.ShortText({ displayName: 'Image URL', description: 'A public link to a JPG or PNG, e.g. https://example.com/product.jpg', required: true }),
    caption: Property.LongText({ displayName: 'Caption', required: false }),
  },
  async run(context) {
    const { to, image_url, caption } = context.propsValue;
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.POST, path: '/send-message', body: { to, imageUrl: image_url, ...(caption ? { text: caption } : {}) } });
  },
});
