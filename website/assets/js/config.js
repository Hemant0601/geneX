/*
 * AskHemant website configuration: the ONE file to edit after deploying.
 *
 * Replace each {{TOKEN}} with the real value, keeping the quotes. Any value
 * that still contains "{{" is treated as "not set": the site hides that
 * button, or falls back to email/WhatsApp, so nothing ever shows a broken link.
 *
 * This file is public (anyone can read it in their browser), so put only
 * public IDs here: never API secrets, passwords or private sheet IDs.
 * The server sends it with "no-cache", so edits show up on the next page load.
 *
 * One exception, for visitors without JavaScript: the contact form on the
 * home page (index.html) also carries {{WEB3FORMS_ACCESS_KEY}} in a hidden
 * field. The replace-all command in DEPLOY-HOSTINGER.md fills both at once.
 */
window.ASKHEMANT_CONFIG = {
  /* Known defaults: no change needed */
  siteUrl: "https://askhemant.ai",
  email: "hello@askhemant.ai",
  instagramHandle: "askhemant",
  instagramUrl: "https://instagram.com/askhemant",

  /* WhatsApp: digits only, with country code, no "+" or spaces (e.g. 9198XXXXXXXX) */
  whatsappNumber: "{{WHATSAPP_NUMBER}}",
  whatsappDefaultText: "Hi Hemant, I found you on askhemant.ai",

  /* Cal.com: https://cal.com/<calUsername>/<slug> */
  calUsername: "askhemant",
  calFitCallSlug: "fit-call",               // public, 20 min, free
  calSessionSlug: "ask-hemant-session",     // 45 min, shared after payment

  /* Forms */
  web3formsAccessKey: "{{WEB3FORMS_ACCESS_KEY}}", // web3forms.com → access key for hello@askhemant.ai
  tallyKitFormId: "{{TALLY_KIT_FORM_ID}}",       // the ID in tally.so/r/<ID> (calculator form)

  /* Payment links (full https:// URLs) */
  razorpaySessionLink: "{{RAZORPAY_SESSION_LINK}}",   // ₹1,999 Ask Hemant Session
  razorpayAuditLink: "{{RAZORPAY_AUDIT_LINK}}",       // ₹9,999 Lead Leak Audit
  razorpayFoundingLink: "{{RAZORPAY_FOUNDING_LINK}}", // founding deposit (share only after selection)
  paypalSessionLink: "{{PAYPAL_SESSION_LINK}}",       // $99 Ask Hemant Session

  /* Analytics: loads ONLY when set (and never for visitors who opt out) */
  ga4MeasurementId: "{{GA4_MEASUREMENT_ID}}",   // looks like G-XXXXXXXXXX
  clarityProjectId: "{{CLARITY_PROJECT_ID}}",   // the ID from clarity.microsoft.com

  /* Shown on the privacy and terms pages; "India" is used until it is set */
  city: "{{CITY}}",

  /* Founding Client Program: lower foundingSlotsLeft by hand when a slot is signed */
  foundingSlotsLeft: 3,
  foundingSlotsTotal: 3,
  foundingDeadline: "2026-11-30", // closes at 23:59 IST on this date

  /* Optional demo video for the home page. Leave "" to keep the slot hidden.
     Accepts an .mp4/.webm URL, a YouTube link or a Vimeo link. */
  demoVideoUrl: ""
};
