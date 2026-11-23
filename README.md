# CarSafar

**Everything Cars. One Complete Journey.** Discover · Compare · Connect · Purchase. Ask about any car, and talk to a dealer only when you're ready.

CarSafar is a concept prototype of a car-buying app for Indian families. It takes a buyer from "which car?" to "keys in hand" without a single cold call: instant answers from verified data, a personalised Decision Score, private chat with a verified dealer, test-drive booking and a guaranteed resale price.

- **Live prototype:** https://claude.ai/artifact/Qc6E8R1tnHnPaad5UDtvuB
- **One-pager (Groww APM submission):** https://claude.ai/artifact/BSYRbT4WD6xhpumZEVL5g2
- **Detailed write-up and appendix:** https://claude.ai/artifact/B7Apno7LhhSoMJiFBFG7Qz

## Submission package

| Deliverable | Where |
| --- | --- |
| 1-page write-up (problem, in scope, out of scope, solution and why) | One-pager doc above (about 650 words, plus a journey diagram and an app-flow diagram) |
| One-pager slide | `CarSafar_OnePager_Fully_Editable.pptx`: every text, box, line and icon is a separate piece; import into Canva via *Create a design → Import file* |
| Prompts used to build the tool | Detailed write-up, appendix |
| Evals | `evals.js` and the [Evals](#evals) section below; results in `eval_results.json` and `feature_results.json` |
| App link | Live prototype above (share it publicly so reviewers can open it) |

> Concept prototype for a product case study. Not affiliated with or endorsed by any car marketplace or manufacturer. All prices, colours, offers and specs are indicative sample data.

---

## The problem

My joint family was buying a car. Everyone browsed car apps late at night. We needed a car suited to Varanasi's narrow, crowded, bumpy roads, with good legroom and room for a joint family, and no app could tell us which one fit. We picked a white Hyundai Creta and needed quick delivery, but only a dealer knew who had stock. So we found dealer numbers and called them one by one, repeating the same details while different family members heard different answers.

The journey breaks at two points:

1. **Deciding:** spec sheets don't tell a family which car fits *them*.
2. **The handoff to a dealer:** firm answers on stock, delivery and price mean phone calls and giving away your number.

## Features

| Feature | What it does | Pain it removes |
| --- | --- | --- |
| **Dealer chat** | AI answers price, EMI, variants, colours and specs instantly; one tap hands the question to a verified dealer with car, colour, budget and timeline attached | Calling around and repeating details |
| **Decision Score** | 5 questions → a score out of 100 for each shortlisted car, with a plain-language reason; updates when the shortlist changes | Not knowing how to weigh specs |
| **Test-drive booking** | Showroom or home, pick a slot, dealer confirms in the chat | Calls just to fix a slot |
| **Resale Lock-In** | Indicative resale value after 3–5 years and a guaranteed buy-back price you can lock | Worry about losing value |
| **Offers and alerts** | Sample dealer offers per car, claimable in chat; price-drop alerts | Not knowing the real deal |

### Guardrails (from the feature spec)

- Both phone numbers are masked; calls go through a CarSafar virtual number.
- Phone numbers and WhatsApp links typed in chat are hidden automatically, so the conversation stays on-platform.
- A lead is billed to the dealer the moment the buyer sends the first message.
- Dealers have a 15-minute reply target; a missed target re-routes the lead to a backup dealer.

## App flow

```
Home ──► New cars (filters: budget, body, brand, fuel; sort)
  │            │
  │            ▼
  └──────► Car page ── sticky menu: Overview · Offers · Variants · Specs · EMI · Resale · Price by city · Similar
               │  shortcut tiles under the price jump to each section
               │  bottom bar (always visible): Book test drive · Chat with dealer
               ▼
          Chat drawer ── AI answers ──► dealer handoff ──► dealer thread (reply + notification)
               │
          Shortlist (♡) ──► Decision Score (5 questions) ──► ranked scores with reasons

Footer ► Dealer partners: lead inbox (scored, billed, SLA timer) · Pilot metrics (North Star, funnel, guardrails)
```

## Scope

**Solves:** which car fits *my* family (Decision Score); firm price, EMI and variant answers at any hour; reaching a verified dealer without hunting numbers or sharing your own; stock, colour, offers and delivery date in one thread; test drives without calls; resale worry; context-rich leads for dealers.

**Doesn't solve:** used cars; loans, booking payments and insurance; shortening waiting periods; negotiating for the buyer; service, challans and documents after purchase; replacing the physical test drive.

## Catalogue

The prototype ships with sample data only; the design doesn't depend on catalogue size. 20 cars that middle-class Indian families commonly buy, each with 3 variants and 5–6 colours, in 6 cities (Delhi, Mumbai, Bangalore, Kolkata, Pune, Hyderabad):

Maruti Swift, Wagon R, Baleno, Dzire, Fronx, Brezza, Ertiga · Hyundai Creta, Venue, i20, Exter · Tata Nexon, Punch, Altroz · Mahindra XUV 3XO, Scorpio N · Kia Sonet, Seltos · Honda Amaze · Toyota Urban Cruiser Hyryder.

## How the logic works

### Answer engine

Rule-based and grounded only in the catalogue, so it can't invent a price.

- **Answers directly:** on-road price (ex-showroom + RTO by city + insurance + other), indicative EMI at 9.5% p.a., variants, colours, mileage, seating, safety, resale value and budget searches. It understands Hinglish (e.g. "Creta ka on-road price kya hai Mumbai mein?").
- **Hands off to a dealer:** offers, discounts, stock, delivery and waiting periods.
- **Declines rather than guesses:** cars outside the catalogue, cities outside the pilot, crash-test ratings it doesn't have, and requests for a dealer's personal number.

### Decision Score

```
score = 60% your ranked priorities + 25% fit for your driving + 15% budget fit
```

- **Priorities:** you rank at least 3 of rear legroom, safety, boot space, resale value, low maintenance and tech. The first pick carries the most weight.
- **Driving fit:**
    - Narrow or bumpy roads use ground clearance and compactness.
    - City driving uses size and mileage.
    - Highway driving uses body type, diesel availability and mileage.
- **Penalties:** fewer seats than your family needs (×0.55) and no match for your fuel preference (×0.8).
- **Scale:** scores are spread around 75 so differences are visible, and capped within 0–100.
- **Proxies (indicative):** legroom uses wheelbase; rough-road fit uses ground clearance; resale and maintenance use brand-level indices.

### Resale Lock-In

```
value = ex-showroom × 0.85 × (1 − d)^(years − 1) × km adjustment
d     = 13% per year, adjusted by the brand's resale index
lock  = 90% of the estimate (assumes a buy-back partner)
```

## Evals

```bash
node evals.js
```

| Suite | Result |
| --- | --- |
| Chat answer quality (34 questions: golden set, adversarial round, catalogue expansion) | **34 / 34 pass** |
| Invented prices in replies that hand off, decline or redirect | **0** |
| Feature logic (Decision Score, Resale Lock-In, contact masking) | **16 / 16 pass** |
| End-to-end click-through (headless browser, desktop + 390px phone) | All flows pass, no console errors |

Bugs found and fixed through evals:

- A price shown for the wrong city.
- A ₹0 EMI.
- A vague 7-seater answer.
- An after-hours reply that never appeared.
- A banner that stayed on screen after leaving the page.
- Duplicate buttons on the car page.
- Sideways scrolling on phones.

## Files

| File | Purpose |
| --- | --- |
| `engine.js` | Catalogue, answer engine, Decision Score, resale model, contact masking (also loads in Node for evals) |
| `template.html` | App UI: styles, screens, chat drawer, dealer inbox, metrics; `/*ENGINE*/` marks where the engine is inlined |
| `connect.html` | Built single-file app (template + engine); this is what's published |
| `img/` | CarSafar logo, wordmark and app icon; `img/cars/` holds car photos |
| `evals.js` | Chat and feature evals; writes `eval_results.json` and `feature_results.json` |

Build the single file:

```bash
python3 -c "t=open('template.html').read(); e=open('engine.js').read(); open('connect.html','w').write(t.replace('/*ENGINE*/', e))"
```

No dependencies and no backend: open `connect.html` in any browser. All state lives in memory for the session.

### Run it locally

Unzip `carsafar-site.zip` and double-click `start-carsafar.bat` (Windows) or `start-carsafar.command` (Mac), or open `index.html` directly. `HOW-TO-RUN.txt` inside the zip has the details.

## Metrics

| Layer | Metrics (pilot targets are assumptions) |
| --- | --- |
| **North Star** | Qualified dealer conversations per week (buyer and dealer have both spoken; budget and timeline shared) |
| **Success** | Decision Score completion (60%+) · chat start rate (3–5%) · questions fully answered by AI (60%+) · median first dealer reply (<15 min) · chat → test drive (8–10%) · test drive → booking · repeat visits after a reply or alert · revenue per lead |
| **Check (counter-metrics)** | Total leads per car page (chat shouldn't just replace form leads) · chats with no dealer reply · AI answers flagged or corrected · test-drive no-shows · dealer churn and lead-quality rating |
| **Guardrails** | Spam reports (<1%) · leaked phone numbers (0) · invented prices on the eval set (0) · AI wrong-answer flags (<2%) · unanswered leads after re-routing (<10%) · notification opt-outs (<3%) · page speed and crash rate no worse than today |

Validated by an A/B test in one pilot city against the current lead form.

## Limitations and next steps

- **Brand:** CarSafar logo and app icon in `img/`.
- **Car images:** 16 models use real photos, one per colour (`img/cars/<id>-<colour index>.jpg`). The photo's own colour is the original; the other colours are generated by recolouring only the painted body (glass, tyres, grille and lights untouched). Exter, Seltos, Scorpio N and Hyryder still use drawings that recolour per swatch.
- **Offers and resale:** offers, resale indices and the buy-back partner are assumptions; a real version needs dealer offer feeds and a buy-back partner.
- **Not real:** the virtual number and dealer replies are simulated.
- **Next:**
    - Usability test with 5 recent car buyers
    - Short model videos (V2)
    - Lender-backed personalised EMI
    - Regional languages
