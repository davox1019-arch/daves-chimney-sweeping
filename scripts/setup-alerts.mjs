#!/usr/bin/env node
/**
 * Lets this site raise lead alerts.
 *
 *   node scripts/setup-alerts.mjs
 *
 * Generates one shared secret and stores it on both Workers — this one, which
 * asks for the alert, and the gutter Worker, which holds the Resend and push
 * keys and actually sends it. The secret is piped straight into wrangler and is
 * never printed or written to disk, so re-running this is also how to rotate it
 * (both sides are replaced together, so nothing is left half-changed).
 *
 * Needs `npx wrangler login` first.
 */

import { spawnSync } from 'node:child_process';
import { webcrypto } from 'node:crypto';
import { existsSync } from 'node:fs';

const CHIMNEY_WORKER = 'daves-chimney-sweeping';
const GUTTER_WORKER = 'david-gutter-cleaning';
const GUTTER_REPO = String.raw`C:\Users\Nathan\Documents\Claude\Projects\Dave's Gutter Cleaning\daves-gutter-cleaning`;

const say = (m) => console.log(m);
const die = (m) => {
  console.error(`\n✗ ${m}\n`);
  process.exit(1);
};

function putSecret(name, value, cwd, worker) {
  const res = spawnSync('npx', ['wrangler', 'secret', 'put', name, '--name', worker], {
    input: value,
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true,
    cwd,
  });
  if (res.status !== 0) die(`Could not set ${name} on ${worker}.`);
}

say('\n── Lead alert setup ──────────────────────────────────\n');

if (!existsSync(GUTTER_REPO)) {
  die(
    `Could not find the gutter repository at:\n    ${GUTTER_REPO}\n` +
      '  Both Workers need the same secret, so edit GUTTER_REPO in this script to point at it.'
  );
}

say('1/2  Generating a shared secret…');
const secret = Buffer.from(webcrypto.getRandomValues(new Uint8Array(32))).toString('base64url');
say('     ✓ Generated.\n');

say('2/2  Storing it on both Workers…');
putSecret('NOTIFY_SECRET', secret, process.cwd(), CHIMNEY_WORKER);
putSecret('NOTIFY_SECRET', secret, GUTTER_REPO, GUTTER_WORKER);
say('     ✓ Stored (it was never displayed or saved locally).\n');

say(`── Done ──────────────────────────────────────────────

Chimney leads will now email David and buzz his phone, through the gutter
Worker. Two things are worth knowing:

  • The gutter Worker needs deploying for its side to take effect:
      cd "${GUTTER_REPO}"
      npm run deploy

  • For a notification to show the chimney logo rather than the generic
    wording, David taps "Turn on phone alerts" in the admin once more. That
    re-registers the phone with the keys a notification payload needs.
`);
