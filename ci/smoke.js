const assert = require('assert');
const path = require('path');

const dir = path.resolve(process.argv[2]);
const pkg = require(path.join(dir, 'package.json'));
const mod = require(path.join(dir, pkg.main));
const piece = mod.waservix;

async function main() {
  assert.ok(piece, 'waservix export missing');
  const actions = Object.keys(piece.actions()).sort();
  const expected = ['check_number', 'custom_api_call', 'delete_message', 'edit_message', 'get_connection_status', 'get_contact', 'get_group', 'get_message_status', 'list_contacts', 'list_groups', 'resend_message', 'send_document', 'send_image', 'send_location', 'send_text'];
  assert.deepStrictEqual(actions, expected);
  assert.deepStrictEqual(Object.keys(piece.triggers()), ['new_whatsapp_event']);
  for (const name of actions.filter((a) => a !== 'custom_api_call')) {
    const a = piece.getAction(name);
    assert.ok(a.aiMetadata && a.aiMetadata.description, `${name}: aiMetadata`);
    assert.ok(a.classification, `${name}: classification`);
    assert.strictEqual(a.audience, 'both', `${name}: audience`);
  }
  console.log('ok  metadata:', actions.length, 'actions, 1 trigger');

  const bad = await piece.auth.validate({ auth: 'invalid_ci_smoke_test_key' });
  assert.strictEqual(bad.valid, false);
  console.log('ok  invalid key rejected by the live API:', bad.error);

  const trigger = piece.getTrigger('new_whatsapp_event');
  const body = { event: 'messages-personal.received', data: { from: '+250788123456', text: 'Muraho' } };
  const run = (propsValue, headers) => trigger.run({ propsValue, payload: { body, headers, queryParams: {} } });

  assert.deepStrictEqual(await run({}, {}), [body]);
  assert.deepStrictEqual(await run({ webhook_secret: 's3cret' }, { 'x-webhook-signature': 's3cret' }), [body]);
  assert.deepStrictEqual(await run({ webhook_secret: 's3cret' }, { 'x-webhook-signature': 'wrong' }), []);
  assert.deepStrictEqual(await run({ webhook_secret: 's3cret' }, {}), []);
  assert.deepStrictEqual(await run({ events: ['messages-personal.received'] }, {}), [body]);
  assert.deepStrictEqual(await run({ events: ['call.received'] }, {}), []);
  console.log('ok  webhook: secret check and event filter');
  console.log('ok  all smoke tests passed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
