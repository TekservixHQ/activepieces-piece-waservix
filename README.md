# WAservix piece for Activepieces

<img src="logo.png" width="72" align="right" alt="WAservix">

Send WhatsApp messages from your own number inside [Activepieces](https://www.activepieces.com) flows, with [WAservix](https://tekservix.com/waservix) (formerly WApenda) by Tekservix.

**You need a Tekservix account with WAservix and a WhatsApp number connected in the dashboard.** The piece is a client of the public WAservix API: your plan, limits and numbers are managed in your WAservix dashboard. [Create an account](https://tekservix.com/waservix) · [API docs](https://tekservix.com/waservix/docs/)

## Install

Activepieces installs community pieces from npm by package name:

1. Open **Settings → My Pieces → Install Piece** (on self-hosted Activepieces: **Platform Admin → Pieces → Install Piece**).
2. Choose **NPM registry** and type `activepieces-piece-waservix`.
3. Click **Install**. WAservix now shows up in the piece list of the flow builder.

## Connect

1. In your Tekservix dashboard open **WAservix → Devices**, open your number and copy its **API key**.
2. In Activepieces add a WAservix step, click **Create connection** and paste the key. It is checked against your number straight away. Each WhatsApp number has its own key, so add one connection per number.

## What it can do

| Type | Name | What it does |
| --- | --- | --- |
| Trigger | New WhatsApp Event | Starts the flow on incoming personal or group messages, status updates, read receipts, reactions, deletions, calls or session changes. Paste the URL it shows into your number's webhook in WAservix; the optional webhook secret is checked on every call. |
| Action | Send Text | A WhatsApp text to a number or a group. |
| Action | Send Image | An image by URL, with a caption. |
| Action | Send Document | A file (PDF invoice, ticket...) by URL. |
| Action | Send Location | A map pin. |
| Action | Get Message Status | Queued, sent, delivered, read, played or failed. |
| Action | Edit / Delete / Resend Message | Fix a text, delete it for everyone, or retry a failed one. |
| Action | Check WhatsApp Number | Does this number have WhatsApp? |
| Action | Get Connection Status | Connected, or does it need a QR scan? |
| Action | Get Contact / List Contacts | Your number's contacts. |
| Action | Get Group / List Groups | Groups, participants and group IDs for sending. |
| Action | Custom API Call | Any other WAservix API endpoint, with your key added for you. |

All actions are tagged for Activepieces AI agents and MCP, so an agent can reply to a customer on WhatsApp by itself.

## Example flows

- **New order → WhatsApp:** Shopify / WooCommerce "New order" → WAservix *Send Text* with the order details, then *Send Document* with the invoice PDF.
- **WhatsApp message → AI reply:** WAservix *New WhatsApp Event* (Personal Message Received) → an AI step → WAservix *Send Text* back to the sender.
- **Form lead → WhatsApp:** Typeform / Google Forms new response → *Check WhatsApp Number* → *Send Text*.

## Build from source

This repository holds only the piece. CI copies `piece/` into a pinned checkout of the Activepieces monorepo, then lints, builds and packs it with the official CLI (`npm run build-piece waservix`), smoke-tests the packed bundle and publishes it to npm with provenance on version tags.

## Other WAservix integrations

[npm](https://www.npmjs.com/package/waservix) · [PyPI](https://pypi.org/project/waservix/) · [n8n](https://www.npmjs.com/package/n8n-nodes-waservix) · [Node-RED](https://flows.nodered.org/node/node-red-contrib-waservix) · [All docs](https://tekservix.com/waservix/docs/)

## Support

support@tekservix.com · [tekservix.com](https://tekservix.com)

MIT licensed.
