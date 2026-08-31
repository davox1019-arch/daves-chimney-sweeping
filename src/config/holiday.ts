// Holiday mode.
//
// While HOLIDAY_MODE is true, the phone number is removed from the page as the
// browser renders it: every "Call/Text" button becomes "Send an Enquiry" and points
// at the quote form, the "Phone:" rows and the footer number are hidden, and any
// unlinked mention ("Call 0476 302 729 to confirm...") is rewritten. The only way
// to reach Dave is a form submission.
//
// The HTML sent to crawlers is untouched — byte-identical to holiday-off apart from
// the injected style/script — so titles, descriptions, canonicals, robots tags,
// sitemap and the LocalBusiness `telephone` in the JSON-LD all stay exactly as they
// were. The number is only stripped in the rendered DOM, and the FAQ JSON-LD is
// rewritten in step with the visible answers so structured data never claims text
// the page no longer shows.
//
// Note: the number still appears in meta descriptions (and so in Google result
// snippets) and in the Google Business Profile. Those are deliberately left alone —
// editing them is what would actually cost rankings.
//
// Currently off: calls ring through again. The floating sticky button is a separate
// thing — it now lives in the page markup as a permanent "Send an Enquiry" link to
// #quote, independent of this flag. To make it a call button again, change the
// #sticky-cta / #blog-sticky-cta anchors back to href="tel:0476302729".
//
// Set this back to true when Dave goes away and calls should stop ringing.
export const HOLIDAY_MODE = false;
