// ===== CarSafar: seeded catalogue (indicative sample data for the prototype) =====
const CITIES = {
  Delhi:     { rto: 0.08 },
  Mumbai:    { rto: 0.12 },
  Bangalore: { rto: 0.17 },
  Kolkata:   { rto: 0.10 },
  Pune:      { rto: 0.12 },
  Hyderabad: { rto: 0.14 }
};
const INSURANCE_RATE = 0.04, OTHER_RATE = 0.005, INTEREST = 9.5;

const C = (n, h) => ({ n, h });
const WHITE = C("Pearl White", "#f4f5f2"), SILVER = C("Silky Silver", "#b9bec4"), GREY = C("Graphite Grey", "#5b6168"), BLACK = C("Midnight Black", "#1d1f23");
const CARS = [
  { id: "swift", brand: "Maruti", model: "Swift", aliases: ["swift"], body: "hatch", type: "Hatchback", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 24.8, boot: 265, seats: 5, airbags: 6, ncap: null, engine: "1197 cc",
    colors: [WHITE, SILVER, C("Sizzling Red", "#c8202f"), C("Luster Blue", "#1f5fa8"), C("Novel Orange", "#e0712c"), GREY],
    variants: [{ n: "LXi", p: 649000, f: "6 airbags, ESP, manual AC" }, { n: "VXi", p: 757000, f: "Adds 7\" touchscreen, electric ORVMs" }, { n: "ZXi+", p: 964000, f: "Adds 9\" touchscreen, wireless charging, auto AC" }] },
  { id: "wagonr", brand: "Maruti", model: "Wagon R", aliases: ["wagon r", "wagonr"], body: "tallhatch", type: "Hatchback", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 24.35, boot: 341, seats: 5, airbags: 2, ncap: null, engine: "998 cc",
    colors: [WHITE, SILVER, C("Poolside Blue", "#3a8fc4"), C("Gallant Red", "#b3202a"), GREY],
    variants: [{ n: "LXi", p: 565000, f: "Dual airbags, manual AC" }, { n: "VXi", p: 638000, f: "Adds touchscreen, power windows all round" }, { n: "ZXi+", p: 747000, f: "Adds 7\" SmartPlay Pro, alloy wheels" }] },
  { id: "baleno", brand: "Maruti", model: "Baleno", aliases: ["baleno"], body: "hatch", type: "Hatchback", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 22.35, boot: 318, seats: 5, airbags: 6, ncap: null, engine: "1197 cc",
    colors: [WHITE, C("Nexa Blue", "#1c3f8f"), C("Opulent Red", "#9e1c26"), SILVER, GREY],
    variants: [{ n: "Sigma", p: 666000, f: "6 airbags, ESP, manual AC" }, { n: "Delta", p: 800000, f: "Adds 7\" touchscreen, AMT option" }, { n: "Alpha", p: 983000, f: "Adds HUD, 360° camera, 9\" touchscreen" }] },
  { id: "dzire", brand: "Maruti", model: "Dzire", aliases: ["dzire"], body: "sedan", type: "Sedan", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 24.79, boot: 382, seats: 5, airbags: 6, ncap: "5-star (Global NCAP)", engine: "1197 cc",
    colors: [WHITE, C("Gallant Red", "#a81d28"), C("Nutmeg Brown", "#6b4a35"), SILVER, C("Alluring Blue", "#24508f"), BLACK],
    variants: [{ n: "LXi", p: 684000, f: "6 airbags, ESP, manual AC" }, { n: "VXi", p: 794000, f: "Adds touchscreen, steering controls" }, { n: "ZXi+", p: 1019000, f: "Adds sunroof, 360° camera, auto AC" }] },
  { id: "fronx", brand: "Maruti", model: "Fronx", aliases: ["fronx"], body: "csuv", type: "Compact SUV", fuel: "Petrol / CNG", trans: "Manual / AMT / AT", mileage: 21.79, boot: 308, seats: 5, airbags: 6, ncap: null, engine: "1197 cc / 998 cc turbo",
    colors: [WHITE, C("Earthen Brown", "#6e5440"), C("Opulent Red", "#9e1c26"), C("Nexa Blue", "#1c3f8f"), SILVER, GREY],
    variants: [{ n: "Sigma", p: 755000, f: "6 airbags, ESP, manual AC" }, { n: "Delta+", p: 888000, f: "Adds 9\" touchscreen, LED projectors" }, { n: "Alpha Turbo AT", p: 1306000, f: "Adds HUD, 360° camera, turbo-petrol automatic" }] },
  { id: "brezza", brand: "Maruti", model: "Brezza", aliases: ["brezza"], body: "csuv", type: "Compact SUV", fuel: "Petrol / CNG", trans: "Manual / AT", mileage: 19.8, boot: 328, seats: 5, airbags: 2, ncap: "4-star (Global NCAP)", engine: "1462 cc",
    colors: [WHITE, C("Brave Khaki", "#8a7d5c"), C("Sizzling Red", "#c8202f"), SILVER, GREY, C("Exuberant Blue", "#1b4f8f")],
    variants: [{ n: "LXi", p: 869000, f: "Dual airbags, manual AC, steel wheels" }, { n: "VXi", p: 1000000, f: "Adds 7\" touchscreen, rear parking sensors, auto AC" }, { n: "ZXi+", p: 1414000, f: "Adds sunroof, 360° camera, HUD, 6 airbags" }] },
  { id: "ertiga", brand: "Maruti", model: "Ertiga", aliases: ["ertiga"], body: "muv", type: "MUV (7-seater)", fuel: "Petrol / CNG", trans: "Manual / AT", mileage: 20.51, boot: 209, seats: 7, airbags: 4, ncap: null, engine: "1462 cc",
    colors: [WHITE, SILVER, C("Pearl Metallic Auburn Red", "#7d1d24"), C("Dignity Brown", "#5c4434"), GREY, BLACK],
    variants: [{ n: "LXi", p: 884000, f: "4 airbags, ESP, rear AC vents" }, { n: "VXi", p: 1050000, f: "Adds touchscreen, steering controls" }, { n: "ZXi+ AT", p: 1313000, f: "Adds 6-speed automatic, auto AC, 6 airbags" }] },
  { id: "creta", brand: "Hyundai", model: "Creta", aliases: ["creta"], body: "suv", type: "Mid-size SUV", fuel: "Petrol / Diesel", trans: "Manual / IVT / AT / DCT", mileage: 17.4, boot: 433, seats: 5, airbags: 6, ncap: null, engine: "1497 cc / 1482 cc turbo",
    colors: [C("Atlas White", "#f6f6f3"), C("Titan Grey", "#6a6f75"), C("Abyss Black", "#18191c"), C("Fiery Red", "#b0182a"), C("Robust Emerald", "#1f4a3c"), C("Ranger Khaki", "#7d7458")],
    variants: [{ n: "E", p: 1100000, f: "6 airbags, rear AC vents, manual AC" }, { n: "SX", p: 1530000, f: "Adds sunroof, 10.25\" touchscreen, wireless charging" }, { n: "SX(O) Turbo DCT", p: 2030000, f: "Adds ADAS level 2, ventilated seats, 360° camera" }] },
  { id: "venue", brand: "Hyundai", model: "Venue", aliases: ["venue"], body: "csuv", type: "Compact SUV", fuel: "Petrol / Diesel", trans: "Manual / DCT", mileage: 18.3, boot: 350, seats: 5, airbags: 6, ncap: null, engine: "1197 cc / 998 cc turbo",
    colors: [C("Atlas White", "#f6f6f3"), C("Titan Grey", "#6a6f75"), C("Abyss Black", "#18191c"), C("Fiery Red", "#b0182a"), C("Denim Blue", "#2d4f7c")],
    variants: [{ n: "E", p: 794000, f: "6 airbags, ESC, manual AC" }, { n: "S(O)", p: 1000000, f: "Adds sunroof, 8\" touchscreen" }, { n: "SX(O) Turbo DCT", p: 1353000, f: "Adds ADAS, ventilated seats, Bose audio" }] },
  { id: "i20", brand: "Hyundai", model: "i20", aliases: ["i20", "i 20"], body: "hatch", type: "Hatchback", fuel: "Petrol", trans: "Manual / IVT", mileage: 20.35, boot: 311, seats: 5, airbags: 6, ncap: null, engine: "1197 cc",
    colors: [C("Atlas White", "#f6f6f3"), C("Amazon Grey", "#7a7f72"), C("Fiery Red", "#b0182a"), C("Starry Night", "#1d2a4a"), C("Titan Grey", "#6a6f75")],
    variants: [{ n: "Era", p: 704000, f: "6 airbags, ESC, manual AC" }, { n: "Sportz", p: 830000, f: "Adds 8\" touchscreen, LED DRLs" }, { n: "Asta (O) IVT", p: 1120000, f: "Adds sunroof, 10.25\" touchscreen, Bose audio" }] },
  { id: "exter", brand: "Hyundai", model: "Exter", aliases: ["exter"], body: "micro", type: "Micro SUV", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 19.4, boot: 391, seats: 5, airbags: 6, ncap: null, engine: "1197 cc",
    colors: [C("Atlas White", "#f6f6f3"), C("Cosmic Blue", "#2a5aa0"), C("Ranger Khaki", "#7d7458"), C("Fiery Red", "#b0182a"), C("Titan Grey", "#6a6f75")],
    variants: [{ n: "EX", p: 600000, f: "6 airbags, ESC, manual AC" }, { n: "S", p: 750000, f: "Adds 8\" touchscreen, rear camera" }, { n: "SX(O) Connect AMT", p: 1040000, f: "Adds sunroof, dashcam, connected car tech" }] },
  { id: "nexon", brand: "Tata", model: "Nexon", aliases: ["nexon"], body: "csuv", type: "Compact SUV", fuel: "Petrol / Diesel / CNG", trans: "Manual / AMT / DCA", mileage: 17.4, boot: 382, seats: 5, airbags: 6, ncap: "5-star (Global NCAP)", engine: "1199 cc turbo / 1497 cc diesel",
    colors: [C("Pristine White", "#f3f4f1"), C("Daytona Grey", "#5f6266"), C("Flame Red", "#c1272d"), C("Pure Grey", "#8a8d90"), C("Creative Ocean", "#1d6f8a"), C("Fearless Purple", "#5b3d7a")],
    variants: [{ n: "Smart", p: 800000, f: "6 airbags, ESP, manual AC" }, { n: "Creative", p: 1120000, f: "Adds 10.25\" touchscreen, 360° camera, auto AC" }, { n: "Fearless+", p: 1560000, f: "Adds ventilated seats, sunroof, JBL audio" }] },
  { id: "punch", brand: "Tata", model: "Punch", aliases: ["punch"], body: "micro", type: "Micro SUV", fuel: "Petrol / CNG", trans: "Manual / AMT", mileage: 20.09, boot: 366, seats: 5, airbags: 2, ncap: "5-star (Global NCAP)", engine: "1199 cc",
    colors: [C("Orcus White", "#f3f4f1"), C("Tornado Blue", "#2d5b9a"), C("Calypso Red", "#b5242c"), C("Daytona Grey", "#5f6266"), C("Tropical Mist", "#9bb3a4")],
    variants: [{ n: "Pure", p: 600000, f: "Dual airbags, ABS, manual AC" }, { n: "Adventure", p: 750000, f: "Adds touchscreen, steering controls" }, { n: "Creative+ AMT", p: 1020000, f: "Adds sunroof, 10.25\" touchscreen, auto AC" }] },
  { id: "altroz", brand: "Tata", model: "Altroz", aliases: ["altroz"], body: "hatch", type: "Hatchback", fuel: "Petrol / Diesel / CNG", trans: "Manual / AMT / DCA", mileage: 19.33, boot: 345, seats: 5, airbags: 6, ncap: "5-star (Global NCAP)", engine: "1199 cc / 1497 cc diesel",
    colors: [C("Pristine White", "#f3f4f1"), C("Ember Glow", "#b0452c"), C("Royal Blue", "#24418a"), C("Pure Grey", "#8a8d90"), C("Dune Glow", "#b59b6e")],
    variants: [{ n: "Smart", p: 689000, f: "6 airbags, ESP, manual AC" }, { n: "Creative", p: 850000, f: "Adds 10.25\" touchscreen, rear camera" }, { n: "Accomplished+ S", p: 1149000, f: "Adds sunroof, 360° camera, ventilated seats" }] },
  { id: "xuv3xo", brand: "Mahindra", model: "XUV 3XO", aliases: ["xuv 3xo", "xuv3xo", "3xo", "xuv 300", "xuv300"], body: "csuv", type: "Compact SUV", fuel: "Petrol / Diesel", trans: "Manual / AMT / AT", mileage: 18.9, boot: 364, seats: 5, airbags: 6, ncap: "5-star (Bharat NCAP)", engine: "1197 cc turbo / 1497 cc diesel",
    colors: [C("Everest White", "#f3f4f1"), C("Tango Red", "#b81f2a"), C("Citrine Yellow", "#d9a61e"), C("Deep Forest", "#2c3f33"), C("Galaxy Grey", "#5d6167"), C("Nebula Blue", "#2b4a7d")],
    variants: [{ n: "MX1", p: 799000, f: "6 airbags, ESP, manual AC" }, { n: "AX5", p: 1169000, f: "Adds panoramic sunroof, 10.25\" touchscreen" }, { n: "AX7 L", p: 1556000, f: "Adds ADAS level 2, 360° camera, Harman audio" }] },
  { id: "scorpion", brand: "Mahindra", model: "Scorpio N", aliases: ["scorpio n", "scorpio-n", "scorpion", "scorpio"], body: "bigsuv", type: "SUV (7-seater)", fuel: "Diesel / Petrol", trans: "Manual / AT", mileage: 15.4, boot: 460, seats: 7, airbags: 2, ncap: "5-star (Global NCAP)", engine: "2184 cc diesel / 1997 cc turbo",
    colors: [C("Everest White", "#f3f4f1"), C("Napoli Black", "#17181b"), C("Red Rage", "#9b1b22"), C("Dazzling Silver", "#b9bec4"), C("Deep Forest", "#2c3f33"), C("Royal Gold", "#9a7b4f")],
    variants: [{ n: "Z2", p: 1399000, f: "Dual airbags, ESP, 7 seats" }, { n: "Z6", p: 1750000, f: "Adds 8\" touchscreen, connected tech" }, { n: "Z8 L AT 4WD", p: 2489000, f: "Adds 6 airbags, 4WD, Sony audio, sunroof" }] },
  { id: "sonet", brand: "Kia", model: "Sonet", aliases: ["sonet"], body: "csuv", type: "Compact SUV", fuel: "Petrol / Diesel", trans: "Manual / iMT / AT / DCT", mileage: 18.4, boot: 385, seats: 5, airbags: 6, ncap: null, engine: "1197 cc / 998 cc turbo / 1493 cc diesel",
    colors: [C("Glacier White", "#f4f5f2"), C("Aurora Black", "#18191c"), C("Intense Red", "#b0182a"), C("Pewter Olive", "#5e6150"), C("Imperial Blue", "#203c78"), GREY],
    variants: [{ n: "HTE", p: 800000, f: "6 airbags, ESC, manual AC" }, { n: "HTK+", p: 1050000, f: "Adds sunroof, 8\" touchscreen" }, { n: "GTX+ DCT", p: 1570000, f: "Adds ADAS, ventilated seats, Bose audio" }] },
  { id: "seltos", brand: "Kia", model: "Seltos", aliases: ["seltos"], body: "suv", type: "Mid-size SUV", fuel: "Petrol / Diesel", trans: "Manual / IVT / AT / DCT", mileage: 17.0, boot: 433, seats: 5, airbags: 6, ncap: "3-star (Global NCAP)", engine: "1497 cc / 1482 cc turbo / 1493 cc diesel",
    colors: [C("Glacier White", "#f4f5f2"), C("Aurora Black", "#18191c"), C("Intense Red", "#b0182a"), C("Pewter Olive", "#5e6150"), C("Imperial Blue", "#203c78"), C("Gravity Grey", "#5a5e63")],
    variants: [{ n: "HTE", p: 1113000, f: "6 airbags, manual AC, halogen lamps" }, { n: "HTX", p: 1571000, f: "Adds sunroof, LED lamps, 10.25\" touchscreen" }, { n: "X-Line", p: 2051000, f: "Adds ADAS level 2, Bose audio, ventilated seats" }] },
  { id: "amaze", brand: "Honda", model: "Amaze", aliases: ["amaze"], body: "sedan", type: "Sedan", fuel: "Petrol", trans: "Manual / CVT", mileage: 18.65, boot: 416, seats: 5, airbags: 6, ncap: null, engine: "1199 cc",
    colors: [C("Platinum White", "#f4f4ef"), C("Lunar Silver", "#b9bec4"), C("Meteoroid Grey", "#5d6167"), C("Golden Brown", "#7c5a3a"), C("Obsidian Blue", "#1e2d4a"), C("Radiant Red", "#a51d27")],
    variants: [{ n: "V", p: 810000, f: "6 airbags, VSA, auto AC" }, { n: "VX", p: 920000, f: "Adds 8\" touchscreen, LaneWatch camera" }, { n: "ZX CVT", p: 1120000, f: "Adds ADAS (Honda Sensing), CVT automatic" }] },
  { id: "hyryder", brand: "Toyota", model: "Urban Cruiser Hyryder", aliases: ["hyryder", "urban cruiser", "hyrider"], body: "suv", type: "Mid-size SUV", fuel: "Petrol / Strong Hybrid / CNG", trans: "Manual / AT / e-CVT", mileage: 21.12, boot: 373, seats: 5, airbags: 6, ncap: null, engine: "1462 cc / 1490 cc hybrid",
    colors: [C("Café White", "#f2f0ea"), C("Enticing Silver", "#b9bec4"), C("Gaming Grey", "#5a5e63"), C("Sportin Red", "#b31d29"), C("Cave Black", "#18191c"), C("Speedy Blue", "#2a5aa0")],
    variants: [{ n: "E", p: 1134000, f: "6 airbags, ESP, manual AC" }, { n: "G", p: 1500000, f: "Adds 9\" touchscreen, auto AC" }, { n: "V Hybrid", p: 2019000, f: "Adds strong hybrid (27.97 kmpl claimed), HUD, 360° camera" }] }
];
CARS.forEach(c => { c.name = `${c.brand} ${c.model}`; });
// Approximate wheelbase and ground clearance (mm), indicative: proxies for rear legroom and rough-road ability
const DIMS = {"swift": {"wb": 2450, "gc": 163}, "wagonr": {"wb": 2435, "gc": 165}, "baleno": {"wb": 2520, "gc": 170}, "dzire": {"wb": 2450, "gc": 163}, "fronx": {"wb": 2520, "gc": 190}, "brezza": {"wb": 2500, "gc": 198}, "ertiga": {"wb": 2740, "gc": 185}, "creta": {"wb": 2610, "gc": 190}, "venue": {"wb": 2500, "gc": 195}, "i20": {"wb": 2580, "gc": 170}, "exter": {"wb": 2450, "gc": 185}, "nexon": {"wb": 2498, "gc": 208}, "punch": {"wb": 2445, "gc": 187}, "altroz": {"wb": 2501, "gc": 165}, "xuv3xo": {"wb": 2600, "gc": 201}, "scorpion": {"wb": 2750, "gc": 187}, "sonet": {"wb": 2500, "gc": 211}, "seltos": {"wb": 2610, "gc": 190}, "amaze": {"wb": 2470, "gc": 172}, "hyryder": {"wb": 2600, "gc": 210}};
CARS.forEach(c => { c.wb = DIMS[c.id].wb; c.gc = DIMS[c.id].gc; });


const NOT_IN_CATALOGUE = ["bmw", "audi", "mercedes", "benz", "volvo", "jaguar", "lexus", "porsche", "tesla", "skoda", "volkswagen", "vw", "renault", "nissan", "jeep", "mg", "fortuner", "innova", "honda city", "verna", "thar", "xuv700", "xuv 700", "harrier", "safari", "carens", "alto", "celerio", "tiago", "kwid", "glanza", "kylaq", "slavia", "virtus", "hector", "grand vitara", "xl6", "triber", "carnival", "bolero", "aura", "x1", "x3", "q3", "q5", "windsor", "sierra"];

const DEALER_PREFIX = { Delhi: ["Capital", "Rajdhani", "Metro"], Mumbai: ["Seaside", "Marine", "Bay"], Bangalore: ["Garden City", "Silicon", "Lakeview"], Kolkata: ["Eastern", "Howrah", "Riverside"], Pune: ["Deccan", "Sahyadri", "Kothrud"], Hyderabad: ["Charminar", "Deccan Pearl", "Hitech"] };
const DEALER_AREA = { Delhi: "Karol Bagh", Mumbai: "Andheri", Bangalore: "Indiranagar", Kolkata: "Salt Lake", Pune: "Baner", Hyderabad: "Banjara Hills" };
function dealerFor(car, city) {
  const brands = ["Maruti", "Hyundai", "Tata", "Mahindra", "Kia", "Honda", "Toyota"];
  const i = brands.indexOf(car.brand);
  return { name: `${DEALER_PREFIX[city][i % 3]} ${car.brand}, ${DEALER_AREA[city]}`, rating: (4.3 + ((i * 7) % 5) / 10).toFixed(1), reply: `~${6 + (i * 3) % 9} min` };
}

// ===== Helpers =====
function inr(n) {
  n = Math.round(n);
  const s = String(n), last3 = s.slice(-3), rest = s.slice(0, -3);
  return "₹" + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + last3;
}
function lakh(n) { return "₹" + (n / 100000).toFixed(2).replace(/\.?0+$/, "") + " lakh"; }
function onRoad(exShowroom, city) {
  const c = CITIES[city];
  const rto = exShowroom * c.rto, ins = exShowroom * INSURANCE_RATE, other = exShowroom * OTHER_RATE;
  return { ex: exShowroom, rto, ins, other, total: exShowroom + rto + ins + other };
}
function emi(principal, months, rate = INTEREST) {
  const r = rate / 12 / 100;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}
function findCars(q) {
  const s = " " + q.toLowerCase() + " ";
  const hits = [];
  for (const c of CARS) {
    let idx = -1;
    for (const a of c.aliases) {
      const re = new RegExp("(^|[^a-z0-9])" + a.replace(/[-]/g, "\\-") + "([^a-z0-9]|$)");
      const m = s.match(re);
      if (m) { const i = m.index; if (idx < 0 || i < idx) idx = i; }
    }
    if (idx >= 0) hits.push({ c, idx });
  }
  return hits.sort((a, b) => a.idx - b.idx).map(h => h.c);
}
function mentionsOtherCar(q) {
  const s = " " + q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ") + " ";
  return NOT_IN_CATALOGUE.find(k => s.includes(" " + k + " ")) || null;
}
const OTHER_CITIES = ["chennai", "ahmedabad", "jaipur", "lucknow", "chandigarh", "kochi", "indore", "bhopal", "patna", "noida", "gurgaon", "gurugram", "surat", "nagpur"];
function unsupportedCity(q) { const s = q.toLowerCase(); return OTHER_CITIES.find(c => s.includes(c)) || null; }
function findCity(q) {
  const s = q.toLowerCase();
  if (/bengaluru|bangalore/.test(s)) return "Bangalore";
  if (/mumbai|bombay/.test(s)) return "Mumbai";
  if (/delhi/.test(s)) return "Delhi";
  if (/kolkata|calcutta/.test(s)) return "Kolkata";
  if (/pune/.test(s)) return "Pune";
  if (/hyderabad/.test(s)) return "Hyderabad";
  return null;
}
function parseDown(q) {
  const s = q.toLowerCase().replace(/,/g, "");
  let m = s.match(/(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*(l|lakh|lakhs|lac)\b/);
  if (m) return parseFloat(m[1]) * 100000;
  m = s.match(/(?:₹|rs\.?\s*)(\d{5,9})/);
  if (m) return parseFloat(m[1]);
  m = s.match(/(\d{5,9})\s*(?:down|dp)/);
  if (m) return parseFloat(m[1]);
  return null;
}
function parseTenure(q) {
  const s = q.toLowerCase();
  let m = s.match(/(\d+)\s*(years?|yrs?|saal)/); if (m) return parseInt(m[1]) * 12;
  m = s.match(/(\d+)\s*(months?|mo)\b/); if (m) return parseInt(m[1]);
  return null;
}
const COLOR_WORDS = /colou?rs?|shade|paint|white|black|red|blue|grey|gray|silver|brown|green|khaki|orange|yellow|purple/;
function matchColor(car, q) {
  const s = q.toLowerCase();
  return car.colors.find(c => s.includes(c.n.toLowerCase())) ||
    car.colors.find(c => c.n.toLowerCase().split(" ").some(w => w.length > 3 && /white|black|red|blue|grey|gray|silver|brown|green|khaki|orange|yellow|purple/.test(w) && s.includes(w)));
}

// ===== Answer engine: grounded only in the catalogue above =====
function answer(query, ctx) {
  const q = query.toLowerCase();
  const city = findCity(q) || ctx.city;
  const cars = findCars(q);
  const car = cars[0] || ctx.car || null;
  const other = mentionsOtherCar(q);
  const otherNote = (other && cars.length) ? `\n(I don't have verified data for the other model you mentioned, so I've left it out rather than guess.)` : "";

  // 1. Privacy: never share a dealer's personal contact
  if (/(dealer|salesman|agent|showroom).*(number|phone|mobile|contact|whatsapp)|(number|phone|mobile|contact).*(dealer|salesman)/.test(q))
    return { kind: "refuse", text: "I can't share a dealer's personal number. You can chat with a verified dealer right here, and your own number stays hidden too until you choose to share it." };

  // 2. City outside the pilot: never fall back to another city's price
  const badCity = unsupportedCity(q);
  if (badCity && !findCity(q) && /price|on[\s-]?road|cost|kitna|kitne|daam|emi|loan/.test(q))
    return { kind: "not_covered", text: `On-road prices differ by city (RTO and insurance), and ${badCity[0].toUpperCase() + badCity.slice(1)} isn't in this pilot yet, so I won't show you another city's price. Supported cities: ${Object.keys(CITIES).join(", ")}. A verified dealer can quote for your city.` };

  // 3. Cars outside the catalogue: never guess
  if (other && cars.length === 0)
    return { kind: "not_covered", text: `I don't have verified data for that model yet, so I won't guess. I can help with ${CARS.length} popular cars, including ${CARS.slice(0, 6).map(c => c.model).join(", ")} and more.` };

  // 4. Test drive
  if (/test[\s-]?drive/.test(q))
    return { kind: "testdrive", text: `Sure, let's book a test drive for the ${car ? car.name : "car"} in ${city}. Pick a slot below and the dealer confirms it here.` };

  // 5. Colours: what's offered is catalogue data; availability and delivery are dealer-only
  const stockQ = /availab|stock|deliver|waiting|quick|jaldi|kab milegi|ready/.test(q);
  if (car && COLOR_WORDS.test(q)) {
    const col = matchColor(car, q);
    if (stockQ) return { kind: "handoff", color: col ? col.n : null, text: `${col ? `Yes, the ${car.name} is offered in ${col.n}. ` : ""}Which colours are in stock, and how fast they can deliver, changes daily by dealer. A verified dealer in ${city} can confirm it, and your number stays hidden.` };
    return { kind: "answer", text: `${car.name} comes in ${car.colors.length} colours: ${car.colors.map(c => c.n).join(", ")}.${col ? `\n${col.n} is one of them. Want me to check stock and delivery with a dealer?` : ""}` };
  }

  // 6. Dealer-only information: offers, discounts, stock, delivery, waiting period
  if (/offer|discount|deal|cashback|exchange bonus|best price|negotiat|stock|availab|deliver|waiting|booking amount|kab milegi|chhoot|chhut/.test(q))
    return { kind: "handoff", text: `Offers, stock and delivery change daily and differ by dealer, so I can't confirm them. A verified dealer in ${city} can tell you exactly, and your number stays hidden.` };

  // 7. EMI
  if (/emi|loan|finance|installment|instalment|monthly/.test(q)) {
    if (!car) return { kind: "answer", text: "Which car should I calculate the EMI for?" };
    const v = car.variants[0];
    const total = onRoad(v.p, city).total;
    const down = parseDown(q) ?? Math.round(total * 0.2);
    const months = parseTenure(q) ?? 60;
    const principal = Math.max(total - down, 0);
    if (principal === 0) return { kind: "answer", text: `A down payment of ${inr(down)} covers the full on-road price of ${inr(total)} for the ${car.name} ${v.n} in ${city}, so you wouldn't need a loan.` };
    const e = emi(principal, months);
    return { kind: "answer", text: `Indicative EMI for ${car.name} ${v.n} in ${city}: about ${inr(e)}/month.\nOn-road ${inr(total)} − down payment ${inr(down)} = loan ${inr(principal)}, ${months} months at ${INTEREST}% p.a.\nIndicative only: the final rate depends on the lender and your credit profile.` };
  }

  // 8. Seating capacity
  const seatQ = q.match(/(\d)\s*-?\s*seat/);
  if (seatQ) {
    const want = parseInt(seatQ[1]);
    const fits = CARS.filter(c => c.seats === want).map(c => c.name);
    if (car) return { kind: "answer", text: car.seats === want ? `Yes, the ${car.name} seats ${want}.` : `No, the ${car.name} seats ${car.seats}, not ${want}.` + (fits.length ? ` ${want}-seaters here: ${fits.join(", ")}.` : "") };
    return { kind: "answer", text: fits.length ? `${want}-seaters here: ${fits.join(", ")}.` : `None of the cars here are ${want}-seaters.` };
  }

  // 9. Mileage / comparison
  const wantsPrice = /price|on[\s-]?road|cost|kitna|kitne|daam|kimat|keemat/.test(q);
  if (!wantsPrice && /mileage|kmpl|average|fuel efficien|compare|vs\.?|versus/.test(q)) {
    if (cars.length >= 2) {
      const [a, b] = cars;
      const better = a.mileage >= b.mileage ? a : b;
      return { kind: "answer", text: `Claimed mileage (ARAI): ${a.name} ${a.mileage} kmpl vs ${b.name} ${b.mileage} kmpl. ${better.name} is more fuel-efficient on paper.\nBoot space: ${a.name} ${a.boot} L vs ${b.name} ${b.boot} L.` };
    }
    if (car) return { kind: "answer", text: `${car.name} claimed mileage (ARAI): ${car.mileage} kmpl. Real-world figures are usually 15–20% lower in city traffic.` + otherNote };
  }

  // 10. Family / suitability
  if (/family|kids|luggage|boot|space/.test(q)) {
    if (/joint|big family|6 |7 |six|seven|parents/.test(q)) {
      const seven = CARS.filter(c => c.seats >= 7);
      return { kind: "answer", text: `For a bigger family, look at the 7-seaters: ${seven.map(c => `${c.name} (from ${lakh(c.variants[0].p)})`).join(", ")}.` };
    }
    const pool = (cars.length ? cars : CARS).filter(c => c.seats === 5);
    const ranked = [...pool].sort((a, b) => b.boot - a.boot);
    return { kind: "answer", text: `For a family of 5, boot space and rear-seat room matter most. Largest boots among 5-seaters: ${ranked.slice(0, 3).map(c => `${c.name} (${c.boot} L)`).join(", ")}.\nMid-size SUVs like the Creta and Seltos have the roomiest rear seats.` };
  }

  // 11. Variants
  if (/variant|difference|trim|which version|features/.test(q)) {
    if (!car) return { kind: "answer", text: "Which car's variants would you like to compare?" };
    return { kind: "answer", text: `${car.name} variants (ex-showroom):\n` + car.variants.map(v => `• ${v.n}: ${inr(v.p)}. ${v.f}`).join("\n") };
  }

  // 12. Price
  if (wantsPrice || /rate/.test(q)) {
    if (!car) return { kind: "answer", text: `Which car? I can give on-road prices for ${CARS.length} cars, e.g. ${CARS.slice(0, 5).map(c => c.model).join(", ")}.` };
    const lead = cars.length >= 2 ? cars.slice(1).map(c2 => `${c2.name} starts at ${inr(onRoad(c2.variants[0].p, city).total)} on-road in ${city}.\n`).join("") : "";
    const rows = car.variants.map(v => ({ v, r: onRoad(v.p, city) }));
    const base = rows[0].r;
    return { kind: "answer", text: lead + `${car.name} on-road price in ${city}: ${inr(rows[0].r.total)} (${rows[0].v.n}) to ${inr(rows[rows.length - 1].r.total)} (${rows[rows.length - 1].v.n}).\nBase variant breakup: ex-showroom ${inr(base.ex)} + RTO ${inr(base.rto)} + insurance ${inr(base.ins)} + other ${inr(base.other)}.` + otherNote };
  }

  // 12b. Resale value
  if (/resale|resell|re-sale|buy.?back|after \d+ years?|value after/.test(q) && car) {
    const yrs = parseInt((q.match(/(\d+)\s*(years?|yrs?|saal)/) || [])[1] || 3);
    const r = resaleEstimate(car, yrs, 12000, city);
    return { kind: "answer", text: `Indicative resale value of the ${car.name} (${car.variants[0].n}) after ${yrs} years: about ${inr(r.value)} (${r.retained}% of ex-showroom), at 12,000 km a year.\nWith Resale Lock-In you can lock a guaranteed buy-back of ${inr(r.lock)} today, subject to condition checks.` };
  }

  // 13. Safety
  if (/safe|ncap|airbag|crash/.test(q) && car)
    return { kind: "answer", text: car.ncap ? `${car.name} safety rating: ${car.ncap}. Airbags on the base variant: ${car.airbags}.` : `I don't have a verified crash-test rating for the ${car.name} in my data, so I won't guess. Airbags on the base variant: ${car.airbags}.` };

  // 14. Budget search
  const bud = q.match(/under\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(l|lakh|lac)/);
  if (bud) {
    const cap = parseFloat(bud[1]) * 100000;
    const fits = CARS.filter(c => c.variants[0].p <= cap).sort((a, b) => a.variants[0].p - b.variants[0].p);
    return { kind: "answer", text: fits.length ? `Cars starting under ${lakh(cap)} (ex-showroom): ${fits.map(c => `${c.name} (${lakh(c.variants[0].p)})`).join(", ")}.` : `None of the cars here start under ${lakh(cap)}.` };
  }

  // 15. Off-topic or unclear
  if (car) return { kind: "answer", text: `I can help with the ${car.name}: on-road price, EMI, variants, colours, mileage or safety. For offers, stock or delivery I'll connect you to a verified dealer.` };
  return { kind: "redirect", text: "I can only help with buying a car: prices, EMI, variants, colours, mileage, safety and dealer offers. Which car are you looking at?" };
}


// ===== Decision Score (personalised, transparent weighted scoring) =====
// Brand-level indices are stated assumptions for the prototype (would come from service-cost and resale data in production).
const BRAND_MAINT = { Maruti: 95, Toyota: 90, Hyundai: 85, Honda: 85, Kia: 80, Tata: 75, Mahindra: 70 };
const BRAND_RESALE = { Maruti: 92, Toyota: 92, Hyundai: 85, Honda: 82, Mahindra: 80, Kia: 78, Tata: 72 };
const ATTR_LABEL = { boot: "boot space", safety: "safety", maint: "low maintenance", resale: "resale value", tech: "tech features", legroom: "rear legroom" };
function attrScores(c) {
  const boots = CARS.map(x => x.boot), bmin = Math.min(...boots), bmax = Math.max(...boots);
  const top = c.variants[c.variants.length - 1].f.toLowerCase();
  const techHits = ["adas", "360", "sunroof", "ventilated", "hud", "10.25", "9\"", "bose", "jbl", "harman", "sony", "wireless"].filter(k => top.includes(k)).length;
  const safety = c.ncap ? ({ 5: 100, 4: 80, 3: 60 }[parseInt(c.ncap)] || 50) : (c.airbags >= 6 ? 55 : 35);
  const wbs = CARS.map(x => x.wb), wmin = Math.min(...wbs), wmax = Math.max(...wbs);
  return { legroom: Math.round(40 + 60 * (c.wb - wmin) / (wmax - wmin)), boot: Math.round(40 + 60 * (c.boot - bmin) / (bmax - bmin)), safety, maint: BRAND_MAINT[c.brand], resale: BRAND_RESALE[c.brand], tech: Math.min(100, 40 + techHits * 15) };
}
// prefs: { family: 4|5|7, use: 'city'|'highway'|'mixed', budget: rupees (max on-road), flex: 0|0.1|0.2, fuel: 'Any'|'Petrol'|'Diesel'|'CNG'|'Hybrid', ranks: ['safety','resale','boot','maint','tech'] }
function decisionScore(c, prefs, city) {
  const w = {}; prefs.ranks.forEach((k, i) => w[k] = Math.max(1, 6 - i));
  const wsum = Object.values(w).reduce((a, b) => a + b, 0);
  const a = attrScores(c);
  const fit = prefs.ranks.reduce((s, k) => s + a[k] * w[k], 0) / wsum;
  const urban = { hatch: 100, tallhatch: 100, micro: 95, sedan: 80, csuv: 85, suv: 65, muv: 60, bigsuv: 45 }[c.body];
  const hwy = { hatch: 55, tallhatch: 45, micro: 60, sedan: 80, csuv: 75, suv: 95, muv: 85, bigsuv: 100 }[c.body] + (c.fuel.includes("Diesel") ? 5 : 0);
  const mil = Math.min(100, 40 + (c.mileage - 15) * 6);
  const gcs = Math.min(100, Math.max(20, 20 + (c.gc - 160) * 1.6));      // 160 mm -> 20, 210 mm -> 100
  const use = prefs.use === "city" ? 0.5 * urban + 0.5 * mil : prefs.use === "highway" ? 0.7 * Math.min(100, hwy) + 0.3 * mil :
    prefs.use === "rough" ? 0.5 * gcs + 0.3 * Math.min(100, urban + 10) + 0.2 * mil : 0.5 * Math.min(100, hwy) + 0.5 * mil;
  const base = onRoad(c.variants[0].p, city).total, cap = prefs.budget * (1 + prefs.flex);
  const budget = base <= prefs.budget ? 100 : base <= cap ? 75 : Math.max(10, 75 - (base - cap) / prefs.budget * 200);
  let score = 0.6 * fit + 0.25 * use + 0.15 * budget;
  score = score >= 75 ? 75 + (score - 75) * 1.3 : 75 + (score - 75) * 2;   // spread scores; softer at the top so no car looks 'perfect'
  const notes = [];
  if (prefs.family >= 6 && c.seats < 7) { score *= 0.55; notes.push(`it seats only ${c.seats}, and your family needs 7`); }
  if (prefs.fuel !== "Any" && !c.fuel.includes(prefs.fuel)) { score *= 0.8; notes.push(`no ${prefs.fuel} option`); }
  if (base > cap) notes.push(`its starting on-road price (${inr(base)}) is above your budget`);
  if (!c.ncap && prefs.ranks.indexOf("safety") <= 1) notes.push("no verified crash-test rating in our data");
  score = Math.max(0, Math.min(100, Math.round(score)));
  const ranked = prefs.ranks.slice(0, 3).map(k => ({ k, v: a[k] }));
  const best = ranked.slice().sort((x, y) => y.v - x.v)[0], worst = ranked.slice().sort((x, y) => x.v - y.v)[0];
  let why = `Scores high on ${ATTR_LABEL[best.k]}`;
  if (worst.k !== best.k && worst.v < 75) why += ` but lower on ${ATTR_LABEL[worst.k]}`;
  why += prefs.use === "rough" ? `; ${c.gc >= 185 ? "good" : "low"} ground clearance (~${c.gc} mm) for bumpy, crowded roads.` : prefs.use === "city" ? `; ${use >= 75 ? "easy" : "less easy"} for city driving.` : prefs.use === "highway" ? `; ${use >= 75 ? "comfortable" : "less suited"} for highway runs.` : ".";
  if (notes.length) why += ` Watch out: ${notes.join("; ")}.`;
  return { score, why, parts: { fit: Math.round(fit), use: Math.round(use), budget: Math.round(budget) }, attrs: a };
}

// ===== Resale Lock-In (indicative depreciation model) =====
function resaleEstimate(c, years, kmPerYear = 12000, city = "Delhi") {
  const price = onRoad(c.variants[0].p, city).ex;
  const d = 0.13 - (BRAND_RESALE[c.brand] - 80) / 300;      // yearly depreciation after year 1
  const kmAdj = Math.max(0.85, 1 - Math.max(0, kmPerYear - 12000) / 100000);
  const value = price * 0.85 * Math.pow(1 - d, Math.max(0, years - 1)) * kmAdj;
  const lock = value * 0.9;                                  // guaranteed buy-back = 90% of estimate (partner assumption)
  return { value: Math.round(value / 1000) * 1000, lock: Math.round(lock / 1000) * 1000, retained: Math.round(value / price * 100) };
}

// ===== Guardrail: mask contact details so chats stay on-platform =====
function maskContact(t) {
  let flagged = false;
  let out = t.replace(/(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/g, () => { flagged = true; return "[number hidden by CarSafar]"; });
  out = out.replace(/\b(whats\s?app|wa\.me\/\S*)/gi, m => { flagged = true; return "[off-platform link removed]"; });
  return { text: out, flagged };
}

function leadTag(lead) {
  if (lead.timeline === "This month" && lead.budgetOk) return "Hot";
  if (lead.timeline === "This month" || lead.timeline === "1–3 months") return "Warm";
  return "Cold";
}

if (typeof module !== "undefined") module.exports = { CARS, CITIES, answer, onRoad, emi, inr, lakh, leadTag, dealerFor, decisionScore, resaleEstimate, maskContact, attrScores };
