# Invoicing, Payments and Tax Notes (India)

> **Verify everything here with a CA before relying on it. This is research, not tax or legal advice.**
> - Built from [`docs/research/tooling-and-ops.md`](../docs/research/tooling-and-ops.md) §3 and §8 and [`docs/00-strategy.md`](../docs/00-strategy.md) §5 and §10, plus a web check on 18 Oct 2026 of purpose codes and SAC codes (sources at the end).
> - Items marked **[not re-verified]** come from general knowledge in the research and were not checked against an official source.
> - **Book a CA consultation before the first foreign invoice** ([`docs/02-launch-checklist.md`](../docs/02-launch-checklist.md)), and bring the questions in §11.

---

## 1. Where you probably stand today

- **Assumption (strategy §11):** Hemant is **not yet GST-registered** and works as an individual (PAN-based), with a CA to be consulted.
- So, until a CA says otherwise: **don't charge GST**, don't show a GSTIN, and issue a **plain invoice/bill** with no tax line ([research](../docs/research/tooling-and-ops.md) §8).
- All AskHemant prices already **exclude GST**, so registering later doesn't change the published prices; GST would be added on top.

---

## 2. GST registration

| Point | What the research says |
|---|---|
| **Threshold** | Registration becomes compulsory once **aggregate turnover passes ₹20 lakh in a financial year** for services (**₹10 lakh** in special-category states) |
| **Exports count** | **Export receipts count toward that turnover** ([Skydo](https://www.skydo.com/blog/gst-for-freelancers)) |
| **Below the threshold** | Inter-state and export service suppliers don't have to register (Notification 10/2017-IGST) |
| **Possible exception: OIDAR** | The research says online, automated digital services (OIDAR) can force registration at any turnover **[not re-verified]**; whether that applies to an Indian seller with overseas buyers is exactly the question for the CA. Custom consulting is generally **not** OIDAR; selling **templates or SaaS** may be. Ask before selling any template pack (strategy §9 day-90 note) |
| **Rate** | 18% on consulting/IT services; 0% for exports under LUT ([Tally Solutions](https://tallysolutions.com/gst/gst-software-saas-exports-international-clients/) says the 18% figure is in CBIC's schedules) |

**Context:** at launch prices, ₹20 lakh is about 57 Solo Sprints, so the threshold is unlikely in the 90-day plan (day-90 target: ₹1.2–2.0 lakh collected). **Track cumulative receipts monthly** (domestic + export) in the scorecard, and start registration well before the line (house suggestion: at about ₹15 lakh).

**Why you might register voluntarily earlier:**
- to file an **LUT** and zero-rate exports properly (an LUT needs registration);
- to claim **input tax credit** (e.g. GST on Razorpay fees, hosting, software);
- because some Indian B2B clients prefer GST-registered vendors.
The downside: monthly/quarterly returns and 18% GST on domestic invoices, which small clients may feel. Decide with the CA.

---

## 3. Exports of services (foreign clients) and the LUT

**Zero-rating conditions** (Sec. 2(6) IGST Act, as summarised in the research; the CA should confirm the full list):
1. the supplier is in India;
2. the recipient is outside India;
3. the place of supply is outside India;
4. payment is received in **convertible foreign exchange** (or in INR where the RBI permits);
5. plus the section's other conditions. Ask specifically about **agency white-label work**: if you build for a foreign agency's end clients, check you're not treated as an "intermediary".

**LUT (Letter of Undertaking)**
- Filed on **Form RFD-11** on the GST portal. **Needs GST registration.**
- Valid until **31 March** each year: renew every financial year.
- Lets you invoice exports **without paying IGST**.
- The invoice must say: **"Supply meant for export under LUT without payment of IGST."**
- **Payment must be realised** within about 1 year of the invoice (sources differ; one cites up to 15 months). If not, IGST plus 18% interest can become payable.

**If you're not registered:** below the threshold, export invoices simply carry no GST, and no LUT is filed. Keep the FIRA for each payment anyway (§7), because you'll need the history once you register.

---

## 4. Invoices

**Numbering:** one sequence per financial year (1 Apr–31 Mar), unique and continuous, e.g. `AH/2026-27/001`, `AH/2026-27/002` … The current FY is 2026-27.

### 4.1 Fields

| Field | Unregistered (today) | GST-registered: India client | GST-registered: export |
|---|---|---|---|
| Your legal name, address, PAN | ✓ | ✓ | ✓ |
| Your GSTIN | — (don't show one) | ✓ | ✓ |
| Invoice number + date | ✓ | ✓ | ✓ |
| Client name + address | ✓ | ✓ | ✓ (foreign address) |
| Client GSTIN (B2B) | if they give it | ✓ | — |
| Place of supply | — | ✓ (state) | ✓ ("outside India", country) |
| SAC code | optional | ✓ (see 4.2) | ✓ |
| Description of service | ✓ (offer name + proposal number) | ✓ | ✓ |
| Taxable value | ✓ (= total) | ✓ | ✓ |
| Tax | **none** | CGST + SGST (same state) or IGST (other state) | 0, with the LUT line |
| LUT line | — | — | "Supply meant for export under LUT without payment of IGST." + LUT reference |
| Currency | INR | INR | USD (and INR value if the CA asks) |
| Payment details | Razorpay link | Razorpay link | Skydo / Wise details |
| Purpose code note | — | — | P0802 (see §6) |

### 4.2 SAC code (ask the CA to pick one)
- **998313**: IT consulting and support services (NASSCOM's member Q&A).
- **998311**: management consulting services.
- Sources **conflict**: one maps IT consulting to 998316, another to 998314 ([search notes](#sources)). Use the code your CA confirms and keep it consistent.

### 4.3 Sample layouts

**Unregistered, India client (today)**
```
INVOICE AH/2026-27/001                                   Date: [dd Mon yyyy]
From: Hemant Kumar (trading as AskHemant), [address], {{CITY}}, India · PAN [ ] · hello@askhemant.ai
To:   [Client legal name], [address] · GSTIN [if given]
Ref:  Proposal AH-P-2026-[NNN] · Agreement AH-A-2026-[NNN]

Description                                                Amount (₹)
Speed-to-Lead Sprint (Solo): 50% deposit                   17,500
                                                     Total 17,500
Not registered under GST; no GST charged.
Paid via Razorpay on [date], ref [payment ID].
```

**GST-registered, export (later)**
```
TAX INVOICE AH/2027-28/0NN                               Date: [ ]
From: Hemant Kumar (AskHemant), [address] · GSTIN [ ] · PAN [ ]
To:   [Client], [address], United Arab Emirates
Place of supply: outside India (UAE) · SAC [CA-confirmed code]
Description                                                Amount (USD)
Speed-to-Lead Sprint (Solo): go-live balance               749.00
IGST 0%                                                      0.00
                                                     Total 749.00
Supply meant for export under LUT without payment of IGST. LUT ARN [ ] valid to 31 Mar [yyyy].
Payment: Skydo [account details] · Purpose code P0802.
```

---

## 5. Payment flows by tool

| Situation | Tool | How | Fees *(absorbed by Hemant)* |
|---|---|---|---|
| India: Session ₹1,999, Audit ₹9,999, founding deposit ₹7,500 | **Razorpay Payment Pages** (reusable) | `{{RAZORPAY_SESSION_LINK}}`, `{{RAZORPAY_AUDIT_LINK}}`, `{{RAZORPAY_FOUNDING_LINK}}` (founding: only after a signed agreement). Setup: [`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §14 | **2% + 18% GST** on the fee ([Razorpay](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/)) |
| India: Sprint deposits/balances, Quick Win, retainers | **Razorpay Payment Link** per client | Name it with the client and proposal number; expire it with the proposal (7 days) | 2% + GST |
| A foreign client paying by card through Razorpay | Razorpay international cards | Needs separate activation **[not re-verified]** | **3% + GST** (effective ~3.54%, plus FX) |
| Abroad: Audit $499, Sprints, retainers, founding $599 | **Skydo** invoice (main) | §5.1 | **$19 flat under $2,000**; $29 for $2,001–10,000; 0.3% above $10,000; no FX markup; **free FIRA** (Skydo's own claims) |
| Abroad, if Skydo can't serve the client | **Wise Business** (backup) | Local USD/GBP/EUR/AUD details; confirm in the app that Indian **business** accounts can receive | Receiving a USD SWIFT wire up to ~$6.11 (WorldFirst comparison, Apr 2026) |
| Abroad: $99 Session only | **PayPal** | `{{PAYPAL_SESSION_LINK}}` | ~**4.4% + $0.30**, plus conversion |
| Anything | **Not Stripe** | Invite-only for new Indian accounts ([Stripe](https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india)) | — |

### 5.1 Skydo, step by step
1. KYC done in week 1 (PAN, Aadhaar, bank account, business details) ([`docs/03-accounts-setup-guide.md`](../docs/03-accounts-setup-guide.md) §15).
2. Create an **invoice in USD** with the USD price (e.g. Audit $499; Solo Sprint $750 deposit / $749 balance; founding $300 / $299).
3. Choose purpose code **P0802** (§6) and add the proposal number.
4. Send it to the client the same day (after the Fit Call or the signature).
5. When paid, download the **FIRA** and file it with the invoice (§7).
6. Record the INR amount actually credited in the Sheet's Cash column.

### 5.2 Wise Business (backup)
- Per Winvesta, **Indian personal Wise accounts stopped receiving payments from 5 Apr 2026**; **business** accounts reportedly still work. Confirm in the app before offering it. A per-transfer cap of ₹25 lakh is reported.
- Ask the CA how you'll get a FIRA / bank certificate for Wise receipts **[not researched]**.

### 5.3 PayPal ($99 Sessions)
- Used only because international buyers trust it for a quick, small payment.
- On withdrawal to India, choose the purpose code your CA confirms and keep the **FIRC/advice** PayPal or the bank provides.

---

## 6. Purpose codes (foreign receipts)

| Code | Meaning | When |
|---|---|---|
| **P0802** | Software consultancy and implementation | **Default for AskHemant builds** (strategy §5), i.e. implementing automation systems ([Skydo P0802](https://www.skydo.com/rbi-purpose-codes/P0802-software-consultancy-and-implementation)). Razorpay describes P0802 more broadly ([Razorpay](https://razorpay.com/blog/p0802-purpose-code-guide/)), so sources don't fully agree |
| P1006 | Business and management consultancy and public relations | Possibly for pure advice (e.g. an Ask Hemant Session) ([Skydo P1006](https://www.skydo.com/rbi-purpose-codes/P1006-business-management-consultancy-public-relations)). **Ask the CA** whether to use one code for everything |
| P0807 | Off-site software exports | Only if the export is reported under a SOFTEX filing (not expected) |
| ~~P1301 / P1499~~ | Personal transfers / other | **Avoid**: they record the money as personal income, not export of services |

Rule of thumb from the sources: the actual deliverable decides the code. Confirm with your bank or CA.

---

## 7. FIRA / FIRC

- Keep the **FIRA** (Foreign Inward Remittance Advice) or **FIRC** for **every** foreign receipt. It's the proof needed for GST export treatment ([research](../docs/research/tooling-and-ops.md) §3).
- Skydo issues a FIRA free with each payment (Skydo's claim). For PayPal and Wise, ask the CA what document to keep.
- File: `Invoices/2026-27/AH-2026-27-0NN.pdf` + `…-FIRA.pdf`, side by side.

---

## 8. TDS from Indian business clients **[general knowledge; not in the research]**

- Indian business clients may **deduct TDS** from professional or technical fees above certain thresholds and pay you the rest. Your quote stays the same; the deducted amount appears against your PAN (check AIS / Form 26AS) and counts toward your tax.
- If a client says "we'll deduct TDS", accept the lower bank receipt, mark the invoice as paid in full with "TDS deducted: ₹[ ]", and ask them for the TDS certificate.
- Rates, thresholds and section numbers changed with the **Income-tax Act, 2025 (in force from 1 Apr 2026)**: ask the CA.

---

## 9. Income tax **[not re-verified]**

- **Presumptive taxation for professionals** (Sec. 44ADA under the 1961 Act) deems **50% of gross receipts** as income, up to ₹50 lakh of receipts (₹75 lakh if cash receipts are ≤5%). Whether AI/automation work counts as an eligible "technical consultancy" profession needs CA confirmation.
- The **new Income-tax Act, 2025 (in force from 1 Apr 2026)** renumbers these provisions.
- **Advance tax** is payable quarterly if the year's liability exceeds ₹10,000.
- Keep business expenses (domain, hosting, VPS, mic, software, AI credits) with invoices: they matter if you don't use the presumptive scheme.

---

## 10. Monthly records (30 minutes, first Sunday of the month)

- [ ] Every payment received has an invoice/bill number in the sequence.
- [ ] Razorpay settlement report downloaded; fees noted.
- [ ] Every foreign receipt has its FIRA/FIRC saved next to the invoice.
- [ ] Cumulative FY receipts (domestic + export) updated → check against the ₹20 lakh threshold.
- [ ] Expense invoices saved (Hostinger, domain, VPS, ManyChat, AI APIs, Loom/Zoho if paid).
- [ ] TDS deducted by clients noted (if any).
- [ ] Refunds (if any) recorded against the original invoice.

---

## 11. Questions to take to the CA

1. Should I register for GST now (voluntarily) or wait for the ₹20 lakh threshold, given that I plan foreign clients?
2. Which **SAC code** fits AI automation builds (998313, 998311 or another), and is it the same for the Ask Hemant Session and retainers?
3. Which **purpose code** for foreign receipts: P0802 for everything, or P1006 for advice-only Sessions?
4. Do any of my services count as **OIDAR**? What if I later sell a template pack?
5. For **agency white-label** work for a foreign agency, could I be treated as an intermediary?
6. While unregistered, what exactly must my **invoice/bill** show? Is "Not registered under GST" the right wording?
7. Once registered: how to file the **LUT** (RFD-11), and what wording and reference go on export invoices?
8. Is **44ADA** (or its 2025-Act equivalent) available for this work? What records do I keep?
9. **Advance tax**: when do I start, and how do I estimate it?
10. **TDS** from Indian clients: what rates should I expect, and how do I reconcile it?
11. What document replaces a FIRA for **PayPal** and **Wise** receipts?
12. Do I need **e-stamping** for client agreements signed electronically in my state (also a lawyer question: [`05-consulting-agreement-template.md`](./05-consulting-agreement-template.md))?
13. Any issue with refunding a Razorpay payment (e.g. an Audit cancelled before the workshop) for my records?

---

## Sources

**From the research files**
- [Skydo: GST for freelancers](https://www.skydo.com/blog/gst-for-freelancers) (threshold incl. exports; LUT needs registration)
- [Razorpay: LUT in GST](https://razorpay.com/blog/lut-in-gst/) · [Winvesta: how to file an LUT](https://www.winvesta.in/blog/businesses/how-to-file-lut-for-export-of-services-gst-portal-guide-2025) · [Incorpx: GST on export of services](https://www.incorpx.io/blog/gst-export-of-services-freelancers-india) · [TaxGuru: GST for consultants](https://taxguru.in/goods-and-service-tax/gst-freelancers-consultants-guide-domestic-foreign-clients.html)
- [Razorpay pricing](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/) · [xflowpay: Razorpay international charges](https://www.xflowpay.com/blog/razorpay-international-payment-gateway-charges)
- [Skydo for consultants](https://www.skydo.com/receive-international-payments-in-india/consultant) · [Skydo PayPal fee calculator](https://www.skydo.com/compare/paypal-fee-calculator-usd-to-inr)
- [Winvesta: Wise vs Winvesta 2026](https://www.winvesta.in/blog/wise-vs-winvesta-which-is-actually-better-for-indian-freelancers-in-2026) · [WorldFirst: USD accounts](https://www.worldfirst.com/sasia/blog/freelancer-payments/best-usd-account-for-freelancers/)
- [Stripe: invite-only in India](https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india)
- [xflowpay: purpose codes for freelancers](https://www.xflowpay.com/blog/purpose-code-for-freelancers) · [labnol: PayPal purpose codes](https://labnol.org/india/paypal-purpose-codes/12871)

**Web check, 18 Oct 2026**
- [Skydo: P0802 software consultancy and implementation](https://www.skydo.com/rbi-purpose-codes/P0802-software-consultancy-and-implementation)
- [Skydo: P1006 business management consultancy](https://www.skydo.com/rbi-purpose-codes/P1006-business-management-consultancy-public-relations)
- [Razorpay: P0802 purpose code guide](https://razorpay.com/blog/p0802-purpose-code-guide/)
- [Skydo: P0807 off-site software exports](https://www.skydo.com/rbi-purpose-codes/P0807-off-site-software-exports)
- [NASSCOM member GST queries (SAC 998313)](https://new.nasscom.in/communities/digital-transformation/bfsi/gst/gst-nasscom-member-queries-5.html)
- [Tally Solutions: GST on software and SaaS exports](https://tallysolutions.com/gst/gst-software-saas-exports-international-clients/)
- [Busy: GST service rates](https://busy.in/gst/gst-service-rates-benefits-challenges/) · [Incorpx: SaaS GST guide](https://www.incorpx.io/blog/saas-business-gst-guide-india) (conflicting SAC mappings)
