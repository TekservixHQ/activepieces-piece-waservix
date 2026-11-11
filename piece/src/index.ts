import { createPiece, PieceCategory } from '@activepieces/pieces-framework';
import { createCustomApiCallAction } from '@activepieces/pieces-common';
import { waservixAuth } from './lib/auth';
import { BASE_URL } from './lib/common';
import { sendTextAction } from './lib/actions/send-text';
import { sendImageAction } from './lib/actions/send-image';
import { sendDocumentAction } from './lib/actions/send-document';
import { sendLocationAction } from './lib/actions/send-location';
import { getMessageStatusAction } from './lib/actions/get-message-status';
import { editMessageAction } from './lib/actions/edit-message';
import { deleteMessageAction } from './lib/actions/delete-message';
import { resendMessageAction } from './lib/actions/resend-message';
import { checkNumberAction } from './lib/actions/check-number';
import { getConnectionStatusAction } from './lib/actions/get-connection-status';
import { getContactAction } from './lib/actions/get-contact';
import { listContactsAction } from './lib/actions/list-contacts';
import { getGroupAction } from './lib/actions/get-group';
import { listGroupsAction } from './lib/actions/list-groups';
import { newWhatsappEventTrigger } from './lib/triggers/new-whatsapp-event';

export const waservix = createPiece({
  displayName: 'WAservix',
  description: 'Send WhatsApp messages from your own number with the WAservix WhatsApp API gateway by Tekservix.',
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://cdn.jsdelivr.net/gh/TekservixHQ/activepieces-piece-waservix@main/logo.png',
  categories: [PieceCategory.COMMUNICATION, PieceCategory.MARKETING],
  auth: waservixAuth,
  authors: ['TekservixHQ'],
  actions: [
    sendTextAction,
    sendImageAction,
    sendDocumentAction,
    sendLocationAction,
    getMessageStatusAction,
    editMessageAction,
    deleteMessageAction,
    resendMessageAction,
    checkNumberAction,
    getConnectionStatusAction,
    getContactAction,
    listContactsAction,
    getGroupAction,
    listGroupsAction,
    createCustomApiCallAction({
      baseUrl: () => BASE_URL,
      auth: waservixAuth,
      authMapping: async (auth) => ({ Authorization: `Bearer ${auth.secret_text}` }),
    }),
  ],
  triggers: [newWhatsappEventTrigger],
});
