import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { waservixAuth } from '../auth';
import { waservixApi } from '../common';
import { waservixProps } from '../common/props';

export const sendDocumentAction = createAction({
  auth: waservixAuth,
  name: 'send_document',
  classification: 'WRITE',
  displayName: 'Send Document',
  description: 'Send a file (PDF, invoice, etc.) by URL.',
  audience: 'both',
  aiMetadata: {
    description:
      'Send a document such as a PDF invoice on WhatsApp from a public file URL, with an optional file name and caption. Use Send Image for pictures. Retrying sends duplicates.',
    idempotent: false,
  },
  props: {
    to: waservixProps.to,
    document_url: Property.ShortText({ displayName: 'File URL', description: 'A public link to the file, e.g. https://example.com/invoice.pdf', required: true }),
    file_name: Property.ShortText({ displayName: 'File Name', description: 'Name the recipient sees, e.g. Invoice-1042.pdf', required: false }),
    caption: Property.LongText({ displayName: 'Caption', required: false }),
  },
  async run(context) {
    const { to, document_url, file_name, caption } = context.propsValue;
    return waservixApi.call({ apiKey: context.auth.secret_text, method: HttpMethod.POST, path: '/send-message', body: { to, documentUrl: document_url, ...(file_name ? { fileName: file_name } : {}), ...(caption ? { text: caption } : {}) } });
  },
});
