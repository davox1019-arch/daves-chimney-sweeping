import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "pages", "chimney-sweeping");

const pages = {
  "ballan": {
    suburb: "Ballan",
    postcode: "3342",
    clusterBase: "Bacchus Marsh",
    clusterRegion: "Bacchus Marsh and nearby suburbs",
    hubHref: "/chimney-sweeping/bacchus-marsh",
    hubLabel: "Bacchus Marsh Chimney Sweeping",
    intro:
      "Ballan sits at a higher elevation than much of the Bacchus Marsh corridor, so wood heaters and fireplaces tend to get a real workout through winter.",
    localHeading: "Chimney Cleaning for Ballan Homes",
    localBody:
      "Ballan is part of our regular western run, and we handle everything from older brick fireplaces to newer wood heater flue systems. If your heater smells smoky, struggles to draw, or has not been cleaned since last winter, it is worth booking before the colder months settle in.",
  },
  "brookfield": {
    suburb: "Brookfield",
    postcode: "3338",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Brookfield is part of the fast-growing Melton corridor, and even newer fireplace and flue systems need proper annual cleaning once they are in regular use.",
    localHeading: "Brookfield Chimney and Flue Cleaning",
    localBody:
      "We service Brookfield homes as part of our regular Melton-area run. That means straightforward booking, local familiarity, and the full clean of the chimney, flue and heater system in one visit.",
  },
  "bundoora": {
    suburb: "Bundoora",
    postcode: "3083",
    clusterBase: "Bundoora",
    clusterRegion: "Bundoora and surrounding north-east suburbs",
    hubHref: "/",
    hubLabel: "Chimney Sweeping Melbourne",
    intro:
      "Bundoora has a mix of older family homes, renovated fireplaces and newer heater installations, so we see a broad range of chimney and flue setups here.",
    localHeading: "Servicing Bundoora Fireplaces and Wood Heaters",
    localBody:
      "Whether you have an original brick chimney or a more modern flue system, the same rule applies: annual cleaning helps airflow, reduces smoky smells, and keeps winter heating working properly. We cover Bundoora directly as part of our north-east service area.",
  },
  "cobblebank": {
    suburb: "Cobblebank",
    postcode: "3338",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Cobblebank is one of the newest parts of the Melton growth corridor, but newer homes with wood heaters still need regular flue and chimney maintenance.",
    localHeading: "Cobblebank Chimney Sweep Service",
    localBody:
      "We regularly service Cobblebank alongside Melton, Brookfield and the surrounding suburbs. If your heater has had a few winters of use without a professional clean, this is the right time to get it sorted.",
  },
  "darley": {
    suburb: "Darley",
    postcode: "3340",
    clusterBase: "Bacchus Marsh",
    clusterRegion: "Bacchus Marsh and nearby suburbs",
    hubHref: "/chimney-sweeping/bacchus-marsh",
    hubLabel: "Bacchus Marsh Chimney Sweeping",
    intro:
      "Darley sits above Bacchus Marsh on the western side of the valley, and the cooler elevated position means heaters often run hard through winter.",
    localHeading: "Darley Chimney and Fireplace Cleaning",
    localBody:
      "Older fireplaces, wood heaters and flue systems are common throughout Darley, and we regularly clean them as part of our Bacchus Marsh run. Annual servicing is the simplest way to prevent soot buildup, poor draw and smoky indoor fires.",
  },
  "diggers-rest": {
    suburb: "Diggers Rest",
    postcode: "3427",
    clusterBase: "Sunbury",
    clusterRegion: "Sunbury, Diggers Rest and nearby suburbs",
    hubHref: "/chimney-sweeping/sunbury",
    hubLabel: "Sunbury Chimney Sweeping",
    intro:
      "Diggers Rest sits in an exposed corridor between Sunbury and Melbourne, and those cold winter mornings mean fireplaces and wood heaters get plenty of use.",
    localHeading: "Diggers Rest Chimney Sweep and Flue Cleaning",
    localBody:
      "We cover Diggers Rest as part of our regular north-west service run. If your chimney has not been cleaned in over a year, or your heater has started smelling smoky or drawing poorly, it is worth booking before winter gets busy.",
  },
  "eltham-north": {
    suburb: "Eltham North",
    postcode: "3095",
    clusterBase: "Eltham North",
    clusterRegion: "Eltham North and surrounding north-east suburbs",
    hubHref: "/",
    hubLabel: "Chimney Sweeping Melbourne",
    intro:
      "Eltham North homes often rely on wood heating through long north-east winters, especially in larger family properties with established fireplaces and flues.",
    localHeading: "Eltham North Chimney Sweep Service",
    localBody:
      "We clean chimneys, flues and wood heaters across Eltham North and the surrounding suburbs. Regular servicing helps with airflow, reduces soot and creosote buildup, and gives you a cleaner, safer fire through winter.",
  },
  "gisborne": {
    suburb: "Gisborne",
    postcode: "3437",
    clusterBase: "Sunbury",
    clusterRegion: "Sunbury, Diggers Rest and nearby suburbs",
    hubHref: "/chimney-sweeping/sunbury",
    hubLabel: "Sunbury Chimney Sweeping",
    intro:
      "Gisborne homes deal with genuinely cold winters, which is exactly why annual chimney and flue cleaning matters before the heating season starts.",
    localHeading: "Gisborne Chimney and Wood Heater Cleaning",
    localBody:
      "We cover Gisborne as part of our regular north-west run and handle everything from traditional open fireplaces to modern heater flue systems. If your heater is working harder each winter, keeping the chimney clean is a smart maintenance job.",
  },
  "harkness": {
    suburb: "Harkness",
    postcode: "3337",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Harkness is part of the wider Melton corridor, where steady winter heater use makes preventative chimney cleaning a good yearly habit.",
    localHeading: "Chimney Cleaning in Harkness",
    localBody:
      "We service Harkness homes as part of our regular Melton-area work. Whether you have a wood heater, slow combustion unit or open fireplace, we clean the full system and check for the soot, ash and blockages that stop it drawing properly.",
  },
  "kurunjang": {
    suburb: "Kurunjang",
    postcode: "3337",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Kurunjang sits on the higher western side of Melton, where cool nights and winter wind exposure make fireplaces and wood heaters a common part of daily life.",
    localHeading: "Kurunjang Chimney Sweep and Flue Service",
    localBody:
      "We regularly clean chimneys and flues in Kurunjang alongside Melton, Harkness and Brookfield. If smoke is not drawing properly or the system has gone too long without a clean, we can sort it in one visit.",
  },
  "macleod": {
    suburb: "Macleod",
    postcode: "3085",
    clusterBase: "Macleod",
    clusterRegion: "Macleod and surrounding north-east suburbs",
    hubHref: "/",
    hubLabel: "Chimney Sweeping Melbourne",
    intro:
      "Macleod has plenty of established north-east housing where original fireplaces are still in service, along with newer heater installations that also need regular maintenance.",
    localHeading: "Macleod Chimney and Fireplace Cleaning",
    localBody:
      "We cover Macleod directly and regularly service homes throughout the surrounding north-east corridor. A clean chimney draws better, smells less and helps keep your heater working the way it should during winter.",
  },
  "maddingley": {
    suburb: "Maddingley",
    postcode: "3340",
    clusterBase: "Bacchus Marsh",
    clusterRegion: "Bacchus Marsh and nearby suburbs",
    hubHref: "/chimney-sweeping/bacchus-marsh",
    hubLabel: "Bacchus Marsh Chimney Sweeping",
    intro:
      "Maddingley shares the same cold valley conditions as the rest of the Bacchus Marsh area, so fireplaces and wood heaters here work hard over winter.",
    localHeading: "Maddingley Chimney Sweep Service",
    localBody:
      "We regularly service Maddingley chimneys, flues and wood heaters as part of our Bacchus Marsh run. If your system has not been cleaned since last season, now is the right time to get it done before the colder months peak.",
  },
  "melton-south": {
    suburb: "Melton South",
    postcode: "3338",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Melton South combines older homes and growing estates, and we regularly clean chimneys and flues across the suburb before winter demand ramps up.",
    localHeading: "Melton South Chimney and Flue Cleaning",
    localBody:
      "Whether your fireplace has been in place for decades or your wood heater is part of a newer build, annual cleaning still matters. We cover Melton South directly and clean the full system in one visit.",
  },
  "melton-west": {
    suburb: "Melton West",
    postcode: "3337",
    clusterBase: "Melton",
    clusterRegion: "Melton and surrounding suburbs",
    hubHref: "/chimney-sweeping/melton",
    hubLabel: "Melton Chimney Sweeping",
    intro:
      "Melton West has plenty of established homes where the fireplace or wood heater has been part of winter for years, making regular servicing an easy job to stay on top of.",
    localHeading: "Melton West Chimney Sweep Service",
    localBody:
      "We regularly work in Melton West and the surrounding suburbs, cleaning chimneys, flues and wood heaters before smoky fires and poor airflow turn into bigger problems.",
  },
  "research": {
    suburb: "Research",
    postcode: "3095",
    clusterBase: "Research",
    clusterRegion: "Research and surrounding north-east suburbs",
    hubHref: "/",
    hubLabel: "Chimney Sweeping Melbourne",
    intro:
      "Research has a semi-rural, leafy character and plenty of homes that rely on wood heating through long north-east winters.",
    localHeading: "Research Chimney Sweep and Wood Heater Cleaning",
    localBody:
      "We service Research homes directly, including fireplaces, wood heaters and flue systems that need annual cleaning before winter. Bird nests, soot buildup and sluggish draw are all common reasons locals call us in this area.",
  },
  "riddells-creek": {
    suburb: "Riddells Creek",
    postcode: "3431",
    clusterBase: "Sunbury",
    clusterRegion: "Sunbury, Diggers Rest and nearby suburbs",
    hubHref: "/chimney-sweeping/sunbury",
    hubLabel: "Sunbury Chimney Sweeping",
    intro:
      "Riddells Creek sits in a genuinely cold part of the Macedon foothills, where wood heaters run hard and chimney maintenance really matters.",
    localHeading: "Riddells Creek Chimney and Flue Cleaning",
    localBody:
      "We cover Riddells Creek as part of our regular north-west service area. If your chimney has not been professionally cleaned in over a year, or your heater has started smoking back into the room, it is worth booking before the heart of winter.",
  },
  "watsonia": {
    suburb: "Watsonia",
    postcode: "3087",
    clusterBase: "Watsonia",
    clusterRegion: "Watsonia and surrounding north-east suburbs",
    hubHref: "/",
    hubLabel: "Chimney Sweeping Melbourne",
    intro:
      "Watsonia is one of Melbourne's established north-east suburbs, and homes here run their wood heaters hard through winter.",
    localHeading: "Watsonia Chimney Sweep Service",
    localBody:
      "We clean chimneys, flues and fireplaces right across Watsonia and the surrounding Banyule area. Annual servicing helps keep the fire drawing properly, reduces smoke issues indoors, and clears out the soot and creosote that builds up over a busy heating season.",
  },
};

function extractFaqs(text) {
  const match = text.match(/const faqs = \[(.*?)\];/s);
  if (!match) return [];
  return Function(`return [${match[1]}];`)();
}

function extractNearby(text) {
  return [...text.matchAll(/<a class="(?:suburb-chip|sp)" href="\/chimney-sweeping\/([^"]+)">([^<]+)<\/a>/g)].map((match) => ({
    slug: match[1],
    label: match[2].replace(/&#8212;|&mdash;/g, "-").trim(),
  }));
}

function titleFor(suburb, postcode) {
  return `Chimney Sweep ${suburb} VIC ${postcode} - $199 Clean & Inspect`;
}

function descriptionFor(suburb, postcode) {
  return `Chimney sweeping ${suburb} VIC ${postcode} - $199 chimney inspection and full clean. Flue cleaning, wood heater service, owner-operated. Call 0476 302 729.`;
}

function renderFile(slug, pageData, faqs, nearbySuburbs) {
  const pageTitle = titleFor(pageData.suburb, pageData.postcode);
  const pageDescription = descriptionFor(pageData.suburb, pageData.postcode);

  return `---
import MainLayout from "../../layouts/MainLayout.astro";
import SuburbSeo from "../../components/SuburbSeo.astro";

const pageTitle = ${JSON.stringify(pageTitle)};
const pageDescription = ${JSON.stringify(pageDescription)};
const suburb = ${JSON.stringify(pageData.suburb)};
const postcode = ${JSON.stringify(pageData.postcode)};
const faqs = ${JSON.stringify(faqs, null, 2)};
const nearbySuburbs = ${JSON.stringify(nearbySuburbs, null, 2)};
---

<MainLayout
  title={pageTitle}
  description={pageDescription}
  clusterBase=${JSON.stringify(pageData.clusterBase)}
  clusterRegion=${JSON.stringify(pageData.clusterRegion)}
  homeHref="/"
  servicePageHref=${JSON.stringify(pageData.hubHref)}
  servicePageLabel=${JSON.stringify(pageData.hubLabel)}
>
  <SuburbSeo
    slug=${JSON.stringify(slug)}
    suburb={suburb}
    postcode={postcode}
    title={pageTitle}
    description={pageDescription}
    faqs={faqs}
  />

  <style>
    :root { --brand-dark: #1a1a18; --brand-mid: #2c2c29; --brand-accent: #c8500a; --brand-warm: #f5f0e8; --brand-white: #ffffff; --text-main: #1a1a18; --text-muted: #5a5a54; --border: #e2ddd4; --radius: 10px; }
    .hero { background: var(--brand-dark); color: var(--brand-white); padding: 3rem 1.25rem 2.75rem; text-align: center; }
    .hero-eyebrow { display: inline-block; background: var(--brand-accent); color: #fff; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.35rem 0.9rem; border-radius: 20px; margin-bottom: 1rem; }
    .hero h1 { font-size: clamp(1.9rem, 5.5vw, 2.6rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 0.85rem; color: var(--brand-white); }
    .price-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #1e4d14; color: #7edd5a; font-size: 0.9rem; font-weight: 800; padding: 0.45rem 1.1rem; border-radius: 20px; margin-bottom: 1rem; border: 1px solid #2a6b1c; }
    .hero-lead { font-size: 1.02rem; line-height: 1.68; color: #c8c5be; margin: 0 auto 0.8rem; max-width: 560px; }
    .hero-sub { font-size: 0.95rem; line-height: 1.6; color: #908d86; max-width: 520px; margin: 0 auto 2.1rem; }
    .btn-row { display: flex; flex-direction: column; gap: 0.75rem; align-items: center; }
    .btn { display: inline-block; padding: 0.95rem 2rem; border-radius: var(--radius); font-size: 1rem; font-weight: 700; text-decoration: none; text-align: center; width: 100%; max-width: 320px; transition: opacity 0.15s, transform 0.15s; }
    .btn:hover { opacity: 0.88; transform: translateY(-1px); }
    .btn-call { background: var(--brand-accent); color: #fff; font-size: 1.1rem; }
    .btn-quote { background: transparent; border: 2px solid #5a5a54; color: #c8c5be; }
    .trust-bar { background: var(--brand-mid); padding: 1rem 1.25rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
    .ti { display: flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; color: #908d86; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
    .ti svg { color: var(--brand-accent); flex-shrink: 0; }
    .section { padding: 2.35rem 1.25rem; max-width: 720px; margin: 0 auto; }
    .section + .section { border-top: 1px solid var(--border); }
    .section-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-accent); margin-bottom: 0.55rem; }
    .section h2 { font-size: clamp(1.35rem, 4vw, 1.75rem); font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); margin: 0 0 1rem; line-height: 1.2; }
    .section p { font-size: 0.98rem; line-height: 1.72; color: var(--text-muted); margin: 0 0 0.9rem; }
    .section p:last-child { margin-bottom: 0; }
    .price-box { background: var(--brand-warm); border: 2px solid #2a6b1c; border-radius: var(--radius); padding: 1.45rem 1.25rem; margin-top: 1rem; text-align: center; }
    .price-num { font-size: 3rem; font-weight: 800; color: #2a6b1c; line-height: 1; margin-bottom: 0.25rem; }
    .price-label { font-size: 1.02rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.75rem; }
    .price-includes { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 0.75rem; }
    .pi { background: var(--brand-white); border: 1px solid var(--border); border-radius: 6px; padding: 0.35rem 0.8rem; font-size: 0.84rem; font-weight: 600; color: var(--text-muted); }
    .pi::before { content: "\\2713 "; color: #2a6b1c; font-weight: 800; }
    .highlight-box { background: var(--brand-warm); border-left: 4px solid var(--brand-accent); border-radius: 0 var(--radius) var(--radius) 0; padding: 1.1rem 1.2rem; margin-top: 1rem; }
    .reason-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.25rem; }
    @media (max-width: 480px) { .reason-grid { grid-template-columns: 1fr; } }
    .reason-card { background: var(--brand-warm); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; }
    .reason-card-title { font-size: 0.92rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.3rem; }
    .reason-card-desc { font-size: 0.85rem; line-height: 1.55; color: var(--text-muted); }
    .check-list { list-style: none; padding: 0; margin: 1.1rem 0 0; display: flex; flex-direction: column; gap: 0.6rem; }
    .check-list li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.95rem; line-height: 1.55; color: var(--text-muted); padding: 0.75rem 0.9rem; background: var(--brand-warm); border: 1px solid var(--border); border-radius: 8px; }
    .check-list li::before { content: "\\2713"; color: var(--brand-accent); font-weight: 800; flex-shrink: 0; }
    .form-wrap { background: var(--brand-warm); border: 2px solid var(--brand-accent); border-radius: var(--radius); padding: 1.6rem 1.25rem; margin-top: 1rem; }
    .form-wrap h3 { font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin: 0 0 0.25rem; }
    .form-sub { font-size: 0.9rem; color: var(--text-muted); margin: 0 0 1.1rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
    @media (max-width: 500px) { .form-grid { grid-template-columns: 1fr; } }
    .field { display: flex; flex-direction: column; gap: 0.3rem; }
    .field.full { grid-column: 1 / -1; }
    .field label { font-size: 0.78rem; font-weight: 700; color: var(--text-main); letter-spacing: 0.03em; text-transform: uppercase; }
    .field input, .field select, .field textarea { width: 100%; border: 2px solid var(--border); border-radius: 8px; padding: 0.72rem 0.85rem; font-size: 0.95rem; background: var(--brand-white); color: var(--text-main); font-family: inherit; transition: border-color 0.15s; outline: none; }
    .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--brand-accent); }
    .field textarea { resize: vertical; min-height: 90px; }
    .form-submit { display: block; width: 100%; margin-top: 1rem; background: var(--brand-accent); color: #fff; border: none; padding: 1rem; border-radius: var(--radius); font-size: 1rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: opacity 0.15s, transform 0.15s; }
    .form-submit:hover { opacity: 0.88; transform: translateY(-1px); }
    .faq-list { display: flex; flex-direction: column; margin-top: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    details.faq-item { border-bottom: 1px solid var(--border); }
    details.faq-item:last-child { border-bottom: none; }
    details.faq-item summary { padding: 1rem 1.1rem; font-size: 0.95rem; font-weight: 700; color: var(--text-main); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none; background: var(--brand-white); transition: background 0.15s; gap: 1rem; }
    details.faq-item summary::-webkit-details-marker { display: none; }
    details.faq-item summary:hover { background: var(--brand-warm); }
    details.faq-item summary::after { content: "+"; font-size: 1.3rem; font-weight: 400; color: var(--brand-accent); flex-shrink: 0; }
    details.faq-item[open] summary::after { content: "\\2212"; }
    .faq-answer { padding: 0 1.1rem 1rem; font-size: 0.93rem; line-height: 1.7; color: var(--text-muted); background: var(--brand-white); }
    .suburb-chips { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 1rem; }
    .suburb-chip { display: inline-block; background: var(--brand-warm); border: 1px solid var(--border); border-radius: 6px; padding: 0.45rem 0.85rem; font-size: 0.84rem; font-weight: 600; color: var(--text-main); text-decoration: none; transition: background 0.15s, border-color 0.15s; }
    .suburb-chip:hover { background: var(--brand-accent); border-color: var(--brand-accent); color: #fff; }
    .page-links { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; }
    .page-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: var(--brand-warm); border: 1px solid var(--border); border-radius: var(--radius); text-decoration: none; font-size: 0.93rem; font-weight: 600; color: var(--text-main); transition: background 0.15s, border-color 0.15s; }
    .page-link:hover { background: var(--brand-accent); border-color: var(--brand-accent); color: #fff; }
    .page-link span { opacity: 0.5; font-size: 1.1rem; }
    .bottom-cta { background: var(--brand-dark); color: var(--brand-white); padding: 2.7rem 1.25rem; text-align: center; }
    .bottom-cta h2 { font-size: clamp(1.35rem, 4.5vw, 1.8rem); font-weight: 800; letter-spacing: -0.02em; color: var(--brand-white); margin: 0 0 0.6rem; }
    .bottom-cta p { font-size: 0.95rem; color: #908d86; margin: 0 auto 1.75rem; line-height: 1.6; max-width: 460px; }
  </style>

  <section class="hero">
    <span class="hero-eyebrow">{suburb} VIC {postcode}</span>
    <h1>Chimney Sweeping<br />{suburb} VIC {postcode}</h1>
    <div class="price-badge">&#10003; $199 Chimney Inspection &amp; Full Clean</div>
    <p class="hero-lead">${pageData.intro}</p>
    <p class="hero-sub">Owner-operated, local service, and direct contact with Dave from quote to job completion.</p>
    <div class="btn-row">
      <a class="btn btn-call" href="tel:0476302729">Call 0476 302 729</a>
      <a class="btn btn-quote" href="#quote">Book for $199</a>
    </div>
  </section>

  <div class="trust-bar">
    <span class="ti"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>$199 flat rate</span>
    <span class="ti"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>Owner-operated</span>
    <span class="ti"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>No call-out fee</span>
    <span class="ti"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>Mon-Sat</span>
  </div>

  <section class="section">
    <p class="section-label">Pricing</p>
    <h2>$199 Chimney Inspection and Full Clean in {suburb}</h2>
    <p>One flat rate for the full clean. No hidden extras, no call-out fee, and no guesswork on the day.</p>
    <div class="price-box">
      <div class="price-num">$199</div>
      <div class="price-label">Chimney Inspection and Full Clean - {suburb}</div>
      <div class="price-includes">
        <span class="pi">Chimney sweep</span>
        <span class="pi">Flue cleaning</span>
        <span class="pi">Soot and ash removal</span>
        <span class="pi">Blockage check</span>
        <span class="pi">Condition report</span>
        <span class="pi">No call-out fee</span>
      </div>
    </div>
  </section>

  <section class="section">
    <p class="section-label">Local service</p>
    <h2>${pageData.localHeading}</h2>
    <div class="highlight-box">
      <p>${pageData.localBody}</p>
      <p>We also cover nearby areas such as {nearbySuburbs.map((item) => item.label).join(", ")}.</p>
    </div>
  </section>

  <section class="section">
    <p class="section-label">Common reasons to book</p>
    <h2>Signs Your {suburb} Chimney Needs Cleaning</h2>
    <div class="reason-grid">
      <div class="reason-card"><div class="reason-card-title">Smoke coming back into the room</div><div class="reason-card-desc">A blocked or heavily sooted flue is the most common cause, and a proper clean usually fixes it.</div></div>
      <div class="reason-card"><div class="reason-card-title">Persistent smoky smell</div><div class="reason-card-desc">Old ash, creosote and buildup in the flue can leave a burnt smell even when the fire is out.</div></div>
      <div class="reason-card"><div class="reason-card-title">Weak draw or hard-to-light fire</div><div class="reason-card-desc">If the fire struggles to breathe, the chimney or flue often needs attention.</div></div>
      <div class="reason-card"><div class="reason-card-title">Over 12 months since the last clean</div><div class="reason-card-desc">Annual servicing is the easiest way to stay ahead of soot, nests and winter problems.</div></div>
    </div>
  </section>

  <section class="section">
    <p class="section-label">What is included</p>
    <h2>Everything Covered in One Visit</h2>
    <p>We clean the full system, not just the part you can see from the living room.</p>
    <ul class="check-list">
      <li>Chimney sweeping from firebox to chimney pot</li>
      <li>Flue liner or flue pipe cleaning</li>
      <li>Wood heater and slow combustion cleaning</li>
      <li>Open fireplace cleaning</li>
      <li>Soot, ash and creosote removal</li>
      <li>Bird nest and blockage clearing where needed</li>
      <li>Simple verbal condition report before we leave</li>
    </ul>
  </section>

  <section class="section" id="quote">
    <p class="section-label">Book now</p>
    <h2>Book Your $199 Chimney Clean in {suburb}</h2>
    <div class="form-wrap">
      <h3>Quick Quote - {suburb}</h3>
      <p class="form-sub">Send through your details and Dave will get back to you to confirm the job.</p>
      <form action="https://formspree.io/f/maqlwkpr" method="POST">
        <input type="hidden" name="suburb" value={suburb + " VIC " + postcode} />
        <input type="hidden" name="price" value="$199 chimney inspection and clean" />
        <div class="form-grid">
          <div class="field"><label>Full Name</label><input type="text" name="name" required placeholder="Your name" /></div>
          <div class="field"><label>Phone Number</label><input type="tel" name="phone" required placeholder="0400 000 000" /></div>
          <div class="field"><label>Email Address</label><input type="email" name="email" placeholder="Optional" /></div>
          <div class="field"><label>Service Needed</label>
            <select name="service" required>
              <option value="">Select...</option>
              <option value="Chimney Inspection and Clean - $199">Chimney Inspection and Clean - $199</option>
              <option>Wood Heater Service</option>
              <option>Flue Cleaning</option>
              <option>Blockage / Nest Removal</option>
              <option>Not sure - need advice</option>
            </select>
          </div>
          <div class="field full"><label>Any Details</label><textarea name="message" placeholder="Type of heater or fireplace, any issues you have noticed, and when it was last cleaned."></textarea></div>
        </div>
        <button type="submit" class="form-submit">Send Booking Request</button>
      </form>
    </div>
  </section>

  <section class="section">
    <p class="section-label">FAQs</p>
    <h2>Chimney Sweeping {suburb} - Common Questions</h2>
    <div class="faq-list">
      {faqs.map(({ q, a }) => (
        <details class="faq-item">
          <summary>{q}</summary>
          <div class="faq-answer">{a}</div>
        </details>
      ))}
    </div>
  </section>

  <section class="section">
    <p class="section-label">Nearby areas</p>
    <h2>Suburbs Near {suburb} We Also Service</h2>
    <p>We also cover the surrounding suburbs shown below.</p>
    <div class="suburb-chips">
      {nearbySuburbs.map((item) => (
        <a class="suburb-chip" href={"/chimney-sweeping/" + item.slug}>{item.label}</a>
      ))}
    </div>
  </section>

  <section class="section">
    <p class="section-label">More pages</p>
    <h2>Related Service Pages</h2>
    <nav class="page-links" aria-label="Nearby suburb pages">
      {nearbySuburbs.map((item) => (
        <a class="page-link" href={"/chimney-sweeping/" + item.slug}>{item.label} <span>&#8250;</span></a>
      ))}
      <a class="page-link" href=${JSON.stringify(pageData.hubHref)}>${pageData.hubLabel} <span>&#8250;</span></a>
      <a class="page-link" href="/contact">Contact Page <span>&#8250;</span></a>
    </nav>
  </section>

  <section class="bottom-cta">
    <h2>{suburb} Chimney Sweep - $199 Flat Rate</h2>
    <p>Call Dave directly or use the form above. We will confirm the job and lock in a time that works.</p>
    <div class="btn-row">
      <a class="btn btn-call" href="tel:0476302729">Call 0476 302 729</a>
      <a class="btn btn-quote" href="#quote">Book for $199</a>
    </div>
  </section>
</MainLayout>
`;
}

for (const [slug, pageData] of Object.entries(pages)) {
  const filePath = path.join(dir, `${slug}.astro`);
  const current = fs.readFileSync(filePath, "utf8");
  const faqs = extractFaqs(current);
  const nearbySuburbs = extractNearby(current);
  const next = renderFile(slug, pageData, faqs, nearbySuburbs);
  fs.writeFileSync(filePath, next);
}

console.log(`Regenerated ${Object.keys(pages).length} suburb pages.`);
