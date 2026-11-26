/**
 * Enquiry intake.
 *
 * Every booking form on the site posts here instead of to Formspree. A lead is
 * written straight into the same Cloudflare D1 database the gutter-cleaning site
 * uses, so David reads chimney and gutter leads in the one admin page:
 *
 *   https://davidsguttercleaning.com.au/quote-admin/
 *
 * Rows are tagged `business = 'chimney'` so the admin can tell them apart, and
 * `kind = 'enquiry'` so they land in the Enquiries tab rather than among the
 * gutter quick-quotes, which have a pricing flow this site has no equivalent of.
 *
 * The visitor never leaves this site: FormThanks.astro posts in the background
 * and swaps a thank-you in for the form. A browser with JavaScript off posts the
 * form normally and is redirected to /thanks instead, so an enquiry is never
 * lost either way.
 */

import type { APIRoute } from 'astro';
// Astro 6 removed `Astro.locals.runtime.env` — bindings now come from the
// Workers runtime directly, and the execution context arrives as
// `locals.cfContext`.
import { env } from 'cloudflare:workers';

export const prerender = false;

/** Length caps match the gutter site's, since both write the same table. */
const MAX = {
  name: 100,
  phone: 40,
  email: 120,
  suburb: 80,
  service: 60,
  note: 500,
  source: 60,
  extra: 80,
};

/**
 * The extra questions a handful of the forms ask — which are whitelisted rather
 * than stored wholesale, so a hand-made POST can't stuff the row with junk. The
 * admin only renders keys it has a label for, so adding one here needs a label
 * adding there too.
 */
const EXTRAS = ['fireplace_type', 'heater_type', 'service_type', 'page'];

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** Trim, cap length, and reject anything that isn't a usable string. */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/**
 * Read the posted body whether it arrived as JSON from the site's own fetch or
 * as an ordinary form POST with JavaScript turned off. Both have to work.
 */
async function readBody(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    return await request.json().catch(() => ({}));
  }
  // Covers both application/x-www-form-urlencoded and multipart/form-data.
  if (type.includes('form')) {
    const form = await request.formData().catch(() => null);
    if (!form) return {};
    const out: Record<string, string> = {};
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') out[key] = value;
    }
    return out;
  }
  return {};
}

/** 32 hex chars. The token is the row's primary key, shared with the gutter
 *  site's quotes, so it has to be unguessable there as well as unique here. */
function newToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Ask the gutter site's Worker to raise the alert.
 *
 * It cannot be done from here: the Resend key and the push signing key are
 * Cloudflare secrets on that Worker, and secrets cannot be read back out to be
 * copied into this one. Regenerating a pair for both would mean David
 * re-registering every phone, and two copies of the one private key afterwards —
 * so the Worker that already holds them sends on this site's behalf.
 *
 * Best-effort by design, and called after the row is safely written: a lead that
 * is saved but un-alerted is recoverable from the admin page, a lost one is not.
 */
async function notify(env: any, lead: Record<string, string>) {
  const endpoint = env.NOTIFY_URL || 'https://davidsguttercleaning.com.au/api/notify';
  if (!env.NOTIFY_SECRET) {
    console.error('enquiry: NOTIFY_SECRET is not set — no alert sent');
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-notify-secret': env.NOTIFY_SECRET,
      },
      body: JSON.stringify({ business: 'chimney', ...lead }),
    });
    if (!res.ok) {
      console.error('enquiry: alert rejected', res.status, (await res.text()).slice(0, 200));
    }
  } catch (err) {
    console.error('enquiry: could not reach the alert endpoint', err);
  }
}

export const POST: APIRoute = async ({ request, locals, url }) => {
  const cfEnv = env as any;
  const cfContext = (locals as any).cfContext;

  const body = await readBody(request);
  // A browser posting the form itself wants a page back; the site's own fetch
  // asks for JSON, either by sending it or by saying it accepts it — the latter
  // matters because that fetch posts a FormData body to keep the field names
  // the markup already uses.
  const wantsPage =
    !(request.headers.get('content-type') || '').includes('application/json') &&
    !(request.headers.get('accept') || '').includes('application/json');
  const done = (payload: any, status = 200) =>
    wantsPage ? Response.redirect(url.origin + '/thanks', 303) : json(payload, status);
  const fail = (message: string, status: number) => {
    if (wantsPage) {
      return new Response(message, { status, headers: { 'content-type': 'text/plain' } });
    }
    return json({ error: message }, status);
  };

  // Honeypot: a real person never fills a hidden field. `_gotcha` is what the
  // old Formspree markup called it — still accepted so a page cached from
  // before this change keeps working.
  if (clean(body.company, 50) || clean(body._gotcha, 50)) {
    return done({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const email = clean(body.email, MAX.email);
  const service = clean(body.service, MAX.service);
  const note = clean(body.message, MAX.note);
  // Stamped with the business as well as whichever form it came from, so a row
  // is identifiable as chimney work from the card itself — not only from the
  // `business` column the admin filters on.
  const formSource = clean(body.source, MAX.source);
  const source = formSource ? ('chimney · ' + formSource).slice(0, MAX.source) : 'chimney';

  // `suburb` is the page's own suburb, filled in by the template; `suburb_detail`
  // is what the customer typed, which only a few of the forms ask for. What they
  // typed wins, because on a page like /chimney-sweeping/macedon-ranges the page
  // suburb is a region and the typed one is the actual town.
  const typed = clean(body.suburb_detail, MAX.suburb);
  const pageSuburb = clean(body.suburb, MAX.suburb);
  const suburb = typed || pageSuburb;

  // The browser enforces `required` on all three, so a miss here is a hand-made
  // POST or a very old cached page.
  if (!name || !phone || !suburb) {
    return fail('Please go back and fill in your name, phone and suburb.', 400);
  }

  if (!cfEnv.DB) {
    console.error('enquiry: no DB binding');
    return fail(
      'Something went wrong saving your details — please call or text Dave on 0476 302 729.',
      500
    );
  }

  const ip = request.headers.get('cf-connecting-ip') || '';
  const recent = await cfEnv.DB.prepare(
    `SELECT COUNT(*) AS n FROM quotes WHERE ip = ? AND created_at > ?`
  )
    .bind(ip, Date.now() - 10 * 60 * 1000)
    .first();
  if (recent && recent.n >= 5) {
    return fail(
      'Too many messages from this connection — please call or text Dave on 0476 302 729 instead.',
      429
    );
  }

  // Everything from here on has to cope with a database that predates migration
  // 006 in the gutter repository, which is what adds the `business` column. If
  // this site were ever deployed ahead of that migration, the alternative is a
  // customer seeing an error page — so the lead is written in the old shape
  // instead, still saying "chimney" in `source`, and is easy to relabel later.
  const businessColumnMissing = (err: any) =>
    [err && err.message, err && err.cause && err.cause.message, String(err)]
      .join(' ')
      .includes('business');

  // Someone who taps Send twice shouldn't become two people to ring. Scoped to
  // this business: the same person asking about gutters and a chimney in the
  // same ten minutes is two real jobs.
  const findDupe = (withBusiness: boolean) =>
    cfEnv.DB.prepare(
      `SELECT token FROM quotes
         WHERE kind = 'enquiry' AND phone = ?
           AND ${withBusiness ? "business = 'chimney'" : "IFNULL(source, '') LIKE 'chimney%'"}
           AND created_at > ? AND deleted_at IS NULL
       ORDER BY created_at DESC LIMIT 1`
    )
      .bind(phone, Date.now() - 10 * 60 * 1000)
      .first();

  let legacySchema = false;
  let dupe;
  try {
    dupe = await findDupe(true);
  } catch (err) {
    if (!businessColumnMissing(err)) throw err;
    console.error('enquiry: no `business` column yet — falling back', err);
    legacySchema = true;
    dupe = await findDupe(false);
  }
  if (dupe && dupe.token) return done({ ok: true, token: dupe.token });

  const extras: Record<string, string> = {};
  for (const key of EXTRAS) {
    const value = clean(body[key], MAX.extra);
    if (value) extras[key] = value;
  }
  // Worth keeping when the customer typed somewhere other than the page they
  // were on — it says which suburb page brought them in.
  if (typed && pageSuburb && typed !== pageSuburb) extras.page_suburb = pageSuburb;
  const extra = Object.keys(extras).length ? JSON.stringify(extras) : null;

  const token = newToken();
  const values = [
    token,
    suburb,
    note || null,
    Date.now(),
    ip,
    name,
    phone,
    email || null,
    service || null,
    extra,
    source,
  ];

  const insert = (withBusiness: boolean) =>
    cfEnv.DB.prepare(
      withBusiness
        ? `INSERT INTO quotes
             (token, kind, business, address, note, status, created_at, ip,
              name, phone, email, service, extra, source)
           VALUES (?, 'enquiry', 'chimney', ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?)`
        : `INSERT INTO quotes
             (token, kind, address, note, status, created_at, ip,
              name, phone, email, service, extra, source)
           VALUES (?, 'enquiry', ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(...values)
      .run();

  if (legacySchema) {
    await insert(false);
  } else {
    try {
      await insert(true);
    } catch (err) {
      if (!businessColumnMissing(err)) throw err;
      console.error('enquiry: no `business` column yet — saved without it', err);
      await insert(false);
    }
  }

  const alerts = notify(cfEnv, { name, phone, email, suburb, service, note });
  // Without a context to hand the sends to, wait for them here rather than
  // letting the response cancel them — a slow alert beats a silent one.
  if (cfContext?.waitUntil) cfContext.waitUntil(alerts);
  else await alerts;

  return done({ ok: true, token });
};

/** A GET here is someone poking at the URL, not a customer. */
export const GET: APIRoute = () => json({ error: 'Post an enquiry form here.' }, 405);
