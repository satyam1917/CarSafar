const E = require("./engine.js");
const ctx = { city: "Delhi", car: null };
const creta = E.CARS.find(c => c.id === "creta");
const nexon = E.CARS.find(c => c.id === "nexon");
const cretaDelhi = E.inr(E.onRoad(creta.variants[0].p, "Delhi").total);
const cretaMumbai = E.inr(E.onRoad(creta.variants[0].p, "Mumbai").total);
const nexonEmi = (() => { const t = E.onRoad(nexon.variants[0].p, "Delhi").total; return E.inr(E.emi(t - 200000, 60)); })();
const PRICE_RX = /₹\s?\d/;

const cases = [
  ["Creta on-road price in Delhi?", r => r.kind === "answer" && r.text.includes(cretaDelhi)],
  ["EMI for Nexon with 2L down, 5 years?", r => r.text.includes(nexonEmi) && /indicative/i.test(r.text)],
  ["EMI for Nexon with ₹2,00,000 down for 60 months", r => r.text.includes(nexonEmi)],
  ["Any discount on Seltos this month?", r => r.kind === "handoff" && !PRICE_RX.test(r.text)],
  ["Is the Swift available for delivery tomorrow?", r => r.kind === "handoff"],
  ["What's the waiting period for Brezza?", r => r.kind === "handoff"],
  ["Compare Brezza vs Nexon mileage", r => r.text.includes("19.8") && r.text.includes("17.4")],
  ["What's the price of a BMW X1?", r => r.kind === "not_covered" && !PRICE_RX.test(r.text)],
  ["Toyota Fortuner on road price Mumbai", r => r.kind === "not_covered" && !PRICE_RX.test(r.text)],
  ["Which is better for a family of 5?", r => r.kind === "answer" && /433 L/.test(r.text)],
  ["Creta ka on-road price kya hai Mumbai mein?", r => r.text.includes(cretaMumbai) && r.text.includes("Mumbai")],
  ["Nexon kitne ka padega Bangalore mein", r => r.text.includes("Bangalore") && r.text.includes("Tata Nexon")],
  ["Who won the cricket match yesterday?", r => r.kind === "redirect"],
  ["Give me the dealer's phone number", r => r.kind === "refuse" && !/\d{10}/.test(r.text)],
  ["What are the variants of XUV 3XO?", r => r.text.includes("MX1") && r.text.includes("AX7 L")],
  ["Is the Nexon safe?", r => r.text.includes("5-star")],
  ["I want to book a test drive for the Seltos", r => r.kind === "testdrive" && r.text.includes("Kia Seltos")],
  ["Best price you can give on Creta SX?", r => r.kind === "handoff" && !PRICE_RX.test(r.text)],
  ["price?", r => /Which car/.test(r.text)],
  ["Swift mileage", r => r.text.includes("24.8")],
  // Round 2: adversarial cases added after round 1
  ["Nexon on road price in Chennai", r => r.kind === "not_covered" && !PRICE_RX.test(r.text)],
  ["Creta vs BMW X1 price", r => r.text.includes(cretaDelhi) && /don't have verified data/.test(r.text) && !/kmpl/.test(r.text)],
  ["Is the Nexon safe?", r => r.text.includes("5-star") && !/manual AC/.test(r.text)],
  ["Creta EMI with 25000000 down", r => /wouldn't need a loan/.test(r.text) && !/₹0\/month/.test(r.text)],
  ["Creta 7 seater hai?", r => /^No, the Hyundai Creta seats 5/.test(r.text) && /Ertiga/.test(r.text)],
  // Round 3: catalogue expansion (20 cars, colours, 6 cities)
  ["Is white Creta available for quick delivery?", r => r.kind === "handoff" && /Atlas White/.test(r.text) && !PRICE_RX.test(r.text)],
  ["Which colours does the Punch come in?", r => r.kind === "answer" && /Orcus White/.test(r.text) && /5 colours/.test(r.text)],
  ["Honda City price", r => r.kind === "not_covered" && !PRICE_RX.test(r.text)],
  ["Dzire on road price in Kolkata", r => r.text.includes(E.inr(E.onRoad(684000, "Kolkata").total)) && /Kolkata/.test(r.text)],
  ["Suggest a car for a joint family of 7", r => /Ertiga/.test(r.text) && /Scorpio N/.test(r.text)],
  ["Is the Creta safe?", r => /don't have a verified crash-test rating/.test(r.text) && !/star/.test(r.text)],
  ["Cars under 7 lakh", r => /Wagon R/.test(r.text) && /Exter/.test(r.text) && !/Creta/.test(r.text)],
  ["Hyryder mileage", r => r.text.includes("21.12")],
  ["Creta resale value after 3 years", r => r.kind === "answer" && /Resale Lock-In/.test(r.text) && PRICE_RX.test(r.text)]
];

let pass = 0;
const rows = cases.map(([q, check], i) => {
  const r = E.answer(q, { ...ctx });
  const ok = !!check(r);
  if (ok) pass++;
  return { n: i + 1, q, kind: r.kind, ok, text: r.text.replace(/\n/g, " | ") };
});
for (const r of rows) console.log(`${r.ok ? "PASS" : "FAIL"} #${r.n} [${r.kind}] ${r.q}\n      → ${r.text}`);
console.log(`\n${pass}/${cases.length} passed`);
// Invented-price guardrail: no handoff / not_covered / refuse / redirect answer may contain a rupee figure
const leaks = rows.filter(r => ["handoff", "not_covered", "refuse", "redirect"].includes(r.kind) && PRICE_RX.test(r.text));
console.log(`Invented-price leaks: ${leaks.length}`);
// ===== Feature evals: Decision Score, Resale Lock-In, contact masking =====
const P = (o) => Object.assign({ family: 5, use: "mixed", budget: 1500000, flex: 0.1, fuel: "Any", ranks: ["safety", "resale", "boot", "maint", "tech"] }, o);
const ds = (id, p) => E.decisionScore(E.CARS.find(c => c.id === id), p, "Delhi");
const feat = [
  ["DS: family of 7 ranks a 7-seater above a 5-seater", () => ds("ertiga", P({ family: 7, budget: 1300000 })).score > ds("creta", P({ family: 7, budget: 1300000 })).score],
  ["DS: explains the 7-seat mismatch in plain language", () => /seats only 5/.test(ds("creta", P({ family: 7 })).why)],
  ["DS: tight budget penalises a car above it", () => ds("creta", P({ budget: 900000, flex: 0 })).parts.budget < ds("punch", P({ budget: 900000, flex: 0 })).parts.budget],
  ["DS: safety-first ranks a 5-star car above a car with no rating", () => ds("nexon", P({ ranks: ["safety", "boot", "resale", "maint", "tech"] })).score > ds("venue", P({ ranks: ["safety", "boot", "resale", "maint", "tech"] })).score],
  ["DS: changing priorities changes the result (not arbitrary)", () => ds("nexon", P({ ranks: ["resale", "maint", "boot", "safety", "tech"] })).score !== ds("nexon", P({ ranks: ["safety", "tech", "boot", "maint", "resale"] })).score],
  ["DS: fuel preference with no match is flagged", () => /no Diesel option/.test(ds("swift", P({ fuel: "Diesel" })).why)],
  ["DS: scores stay within 0-100 for every car and profile", () => E.CARS.every(c => [P({}), P({ family: 7, budget: 500000, fuel: "Hybrid" }), P({ use: "city", flex: 0.2 })].every(p => { const s = ds(c.id, p).score; return s >= 0 && s <= 100; }))],
  ["Resale: value falls with every extra year", () => E.CARS.every(c => E.resaleEstimate(c, 3).value > E.resaleEstimate(c, 5).value)],
  ["Resale: lock-in price is below the estimate", () => E.CARS.every(c => E.resaleEstimate(c, 3).lock < E.resaleEstimate(c, 3).value)],
  ["Resale: high-km use lowers the value", () => E.resaleEstimate(E.CARS[0], 3, 25000).value < E.resaleEstimate(E.CARS[0], 3, 10000).value],
  ["DS: bumpy-road profile ranks a high-clearance car above a low one", () => ds("nexon", P({ use: "rough" })).score > ds("dzire", P({ use: "rough" })).score],
  ["DS: legroom-first ranks a long-wheelbase car above a short one", () => ds("creta", P({ ranks: ["legroom", "boot", "safety", "resale", "maint", "tech"] })).score > ds("punch", P({ ranks: ["legroom", "boot", "safety", "resale", "maint", "tech"] })).score],
  ["DS: explains ground clearance for bumpy roads", () => /ground clearance/.test(ds("creta", P({ use: "rough" })).why)],
  ["Guardrail: dealer phone number is masked", () => { const m = E.maskContact("Call me on 98765 43210"); return m.flagged && !/\d{5}/.test(m.text); }],
  ["Guardrail: WhatsApp redirect is removed", () => E.maskContact("Let's continue on WhatsApp").flagged],
  ["Guardrail: normal dealer message is untouched", () => { const m = E.maskContact("Delivery in 5-7 days, ₹25,000 off"); return !m.flagged && m.text === "Delivery in 5-7 days, ₹25,000 off"; }]
];
let fp = 0; const featRows = feat.map(([n, f], i) => { const ok = !!f(); if (ok) fp++; console.log(`${ok ? "PASS" : "FAIL"} F${i + 1} ${n}`); return { n: "F" + (i + 1), q: n, ok }; });
console.log(`Feature evals: ${fp}/${feat.length} passed`);
require("fs").writeFileSync(__dirname + "/feature_results.json", JSON.stringify(featRows, null, 1));
require("fs").writeFileSync(__dirname + "/eval_results.json", JSON.stringify(rows, null, 1));
