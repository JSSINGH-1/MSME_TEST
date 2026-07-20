/**
 * DFO INTELLIGENCE & PLANNING DASHBOARD — Data
 *
 * ── VARIANCE FORMULA ────────────────────────────────────────
 * For any state/month/year not in the base data, we compute:
 *
 *   value = baseValue × annualFactor(year) × monthFactor(month)
 *
 * where:
 *   annualFactor = (1 + stateGrowthRate) ^ (targetYear - 2025)
 *   monthFactor  = MONTHLY_SEASONALITY[month] / MONTHLY_SEASONALITY[5]
 *
 * This gives realistic-looking trends without fabricating arbitrary numbers.
 *
 * ── PLUG-AND-PLAY ───────────────────────────────────────────
 * Every getter has a TODO with the expected API endpoint.
 * When backend is ready, replace the getter body with a fetch call.
 * The page components never change — only the getter internals.
 *
 * TODO pattern:
 *   export async function getIntelligenceKPIs(stateId, year, month) {
 *     const res = await fetch(`/api/intelligence/${stateId}/kpis?year=${year}&month=${month}`);
 *     return res.json();
 *   }
 */


// VARIANCE ENGINE


/** Monthly seasonality relative to May (index 5) = 1.00 */
const MONTHLY_SEASONALITY = {
  1: 0.81, 2: 0.85, 3: 0.92, 4: 0.96, 5: 1.00,
  6: 0.98, 7: 0.93, 8: 0.90, 9: 0.95, 10: 1.04,
  11: 0.88, 12: 0.83,
};

/** Annual growth rates by state — calibrated to match known YoY figures */
const STATE_GROWTH_RATES = {
  goa:         0.42,   // +45% YoY shown in screenshot → ~42% CAGR
  maharashtra: 0.31,
  karnataka:   0.33,
  kerala:      0.24,
  rajasthan:   0.28,
  tamilnadu:   0.29,
};

/**
 * Apply variance formula to produce a value for any year/month.
 * @param {number}  baseValue   — known value at (stateId, year=2025, month=5)
 * @param {string}  stateId
 * @param {number}  year        — target year
 * @param {number}  month       — target month (1–12)
 * @param {number}  baseYear    — anchor year (default 2025)
 * @param {number}  baseMonth   — anchor month (default 5 = May)
 */
export function applyVariance(baseValue, stateId, year, month, baseYear = 2025, baseMonth = 5) {
  const growthRate  = STATE_GROWTH_RATES[stateId] ?? 0.28;
  const yearFactor  = Math.pow(1 + growthRate, year - baseYear);
  const monthFactor = (MONTHLY_SEASONALITY[month] ?? 1.0) / (MONTHLY_SEASONALITY[baseMonth] ?? 1.0);
  return Math.round(baseValue * yearFactor * monthFactor);
}

/** Parse "May 2025" → { month: 5, year: 2025 } */
export function parseMonthYear(monthYear) {
  const MONTH_MAP = {
    January:1, February:2, March:3, April:4, May:5, June:6,
    July:7, August:8, September:9, October:10, November:11, December:12,
  };
  const [m, y] = (monthYear ?? 'May 2025').split(' ');
  return { month: MONTH_MAP[m] ?? 5, year: parseInt(y, 10) || 2025 };
}


// STATES & DISTRICTS
// TODO: GET /api/intelligence/states

export const INTELLIGENCE_STATES = [
  { id: 'goa',         label: 'Goa',          districts: ['All Districts', 'North Goa', 'South Goa'] },
  { id: 'maharashtra', label: 'Maharashtra',   districts: ['All Districts', 'Mumbai', 'Pune', 'Nashik', 'Nagpur'] },
  { id: 'karnataka',   label: 'Karnataka',     districts: ['All Districts', 'Bangalore Urban', 'Mysuru', 'Hubli-Dharwad', 'Belgaum'] },
  // { id: 'kerala',      label: 'Kerala',        districts: ['All Districts', 'Ernakulam', 'Thrissur', 'Kozhikode', 'Thiruvananthapuram'] },
  {
  id: 'kerala',
  label: 'Kerala',
  districts: [
    'All Districts',
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kasaragod',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Malappuram',
    'Palakkad',
    'Pathanamthitta',
    'Thiruvananthapuram',
    'Thrissur',
    'Wayanad'
  ]
},

  { id: 'rajasthan',   label: 'Rajasthan',     districts: ['All Districts', 'Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] },
  { id: 'tamilnadu',   label: 'Tamil Nadu',    districts: ['All Districts', 'Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
];


// BASE DATA — all anchored to May 2025


/**
 * Base KPIs for each state (May 2025 anchor).
 * District split [d1, d2] represents [North/Primary, South/Secondary].
 */
const _BASE_KPIS = {
  goa: {
    totalMSMEs: 76813, d1Name: 'North Goa', d1Share: 60.3, d1Count: 46312,
    d2Name: 'South Goa', d2Share: 39.7, d2Count: 30501,
    grievances: 436, yoyGrowth: 45, density: 1016,
  },
  maharashtra: {
    totalMSMEs: 4218400, d1Name: 'Mumbai', d1Share: 28.4, d1Count: 1198020,
    d2Name: 'Pune', d2Share: 18.6, d2Count: 784622,
    grievances: 8240, yoyGrowth: 31, density: 3410,
  },
  karnataka: {
    totalMSMEs: 1842600, d1Name: 'Bangalore Urban', d1Share: 34.2, d1Count: 630169,
    d2Name: 'Rest of Karnataka', d2Share: 65.8, d2Count: 1212431,
    grievances: 3820, yoyGrowth: 33, density: 2840,
  },

  // kerala: {
  //   totalMSMEs: 1126400, d1Name: 'Ernakulam', d1Share: 22.1, d1Count: 248934,
  //   d2Name: 'Rest of Kerala', d2Share: 77.9, d2Count: 877466,
  //   grievances: 2140, yoyGrowth: 24, density: 3190,
  // },

  kerala: {
  totalMSMEs: 968931,

  d1Name: 'Ernakulam',
  d1Share: 13.66,
  d1Count: 132384,

  d2Name: 'Thrissur',
  d2Share: 9.58,
  d2Count: 92831,

  grievances: 2654,
  yoyGrowth: 26,
  density: 3956,
},


  rajasthan: {
    totalMSMEs: 1684200, d1Name: 'Jaipur', d1Share: 19.8, d1Count: 333472,
    d2Name: 'Rest of Rajasthan', d2Share: 80.2, d2Count: 1350728,
    grievances: 4120, yoyGrowth: 28, density: 2210,
  },
  tamilnadu: {
    totalMSMEs: 2843100, d1Name: 'Chennai', d1Share: 24.6, d1Count: 1274202,
    d2Name: 'Rest of Tamil Nadu', d2Share: 75.4, d2Count: 2143898,
    grievances: 6180, yoyGrowth: 29, density: 3820,
  },
};

/** TODO: GET /api/intelligence/:stateId/kpis?year=YYYY&month=MM */
export function getIntelligenceKPIs(stateId, monthYear) {
  const { month, year } = parseMonthYear(monthYear);
  const b = _BASE_KPIS[stateId] ?? _BASE_KPIS.goa;
  const v = (val) => applyVariance(val, stateId, year, month);
  const totalMSMEs = v(b.totalMSMEs);
  return {
    totalMSMEs,
    d1Name: b.d1Name,
    d1Share: b.d1Share,
    d1Count: Math.round(totalMSMEs * b.d1Share / 100),
    d2Name: b.d2Name,
    d2Share: b.d2Share,
    d2Count: Math.round(totalMSMEs * b.d2Share / 100),
    grievances: v(b.grievances),
    yoyGrowth: b.yoyGrowth + Math.round((year - 2025) * 2 + (month - 5) * 0.3),
    density: v(b.density),
    lastUpdated: (() => {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return `${String(lastWeek.getDate()).padStart(2, '0')} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][lastWeek.getMonth()]} ${lastWeek.getFullYear()} 10:30 AM`;
    })(),
  };
}


// REGISTRATION TREND (yearly, upto Dec / upto current month)
// TODO: GET /api/intelligence/:stateId/registration-trend

const _TREND_BASE = {
  goa:         { 2020:3841,  2021:8308,  2022:13111, 2023:19083, 2024:16045, 2025:19240, 2026:11860  },
  maharashtra: { 2020:182400,2021:298600,2022:412800, 2023:541200,2024:480000,2025:398000,2026:142000 },
  karnataka:   { 2020:84200, 2021:138400,2022:192800, 2023:248600,2024:218000,2025:182000,2026:62000  },
  kerala: {
  2020: 46238,
  2021: 73163,
  2022: 102067,
  2023: 139608,
  2024: 123814,
  2025: 96893,
  2026: 51247
},
  rajasthan:   { 2020:62400, 2021:98200, 2022:138400, 2023:182000,2024:162000,2025:138000,2026:48000  },
  tamilnadu:   { 2020:124000,2021:196000,2022:268000, 2023:348000,2024:308000,2025:264000,2026:88000  },
};

const MONTH_NAMES_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Dynamically compute trend label for a given year */
function _trendLabel(yr) {
  const currentYear  = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-indexed
  if (yr < currentYear - 1) return `${yr}\n(Upto Dec)`;
  if (yr === currentYear - 1) return `${yr}\n(Upto Dec)`; // previous year — full
  if (yr === currentYear) {
    // Current year: upto previous month (data available through last month)
    const uptoMonth = currentMonth === 0 ? 'Dec' : MONTH_NAMES_SHORT[currentMonth - 1];
    return `${yr}\n(Upto ${uptoMonth})`;
  }
  return `${yr}`;
}

const _TREND_INSIGHTS = {
  goa:         ['Peak registrations achieved in 2023.', 'Registrations declined 15.9% between 2023 and 2024.', 'Focus on outreach and scheme promotion to revive growth.'],
  maharashtra: ['Steady growth from 2020 to 2023 peaking at 5.41 lakh.', 'Decline of 11.3% in 2024 needs policy attention.', 'Increase awareness in Tier-2 and Tier-3 cities.'],
  karnataka:   ['Peak at 2.49 lakh in 2023 driven by Bangalore tech MSMEs.', 'Post-2023 dip reflects national deregistration trends.', 'North Karnataka underperforming — targeted camps needed.'],
  kerala:      ['Kerala shows consistent growth up to 2023.', 'Tourism and seafood MSMEs most affected by post-2023 dip.', 'Women-led MSME registrations grew 28% in 2024.'],
  rajasthan:   ['Handicraft and textile clusters drove 2023 peak.', '2024 decline of 11% linked to GST compliance confusion.', 'Rural outreach programs needed in Shekhawati belt.'],
  tamilnadu:   ['Tamil Nadu peaked at 3.48 lakh in 2023.', 'Auto-ancillary and textile MSMEs led growth phase.', 'Coimbatore and Tiruppur need renewed scheme promotion.'],
};

/** TODO: GET /api/intelligence/:stateId/registration-trend */
export function getRegistrationTrend(stateId) {
  const base = _TREND_BASE[stateId] ?? _TREND_BASE.goa;
  const data = Object.entries(base).map(([yr, val]) => ({
    year: parseInt(yr), label: _trendLabel(parseInt(yr)), value: val,
  }));
  return { data, insights: _TREND_INSIGHTS[stateId] ?? _TREND_INSIGHTS.goa };
}


// NORTH vs SOUTH COMPARISON (grouped bar)
// TODO: GET /api/intelligence/:stateId/district-comparison?year=YYYY&month=MM

const _NS_BASE = {
  goa: {
    d1Name:'North Goa', d2Name:'South Goa',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:1394, d2:556  },
      { metric:'Champion Portal\nGrievances',      d1:246,  d2:190  },
      { metric:'MSME Registrations\n(Upto May)',   d1:7148, d2:4712 },
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:52,   d2:34   },
    ],
    takeaway: 'North Goa has higher MSME density, registrations and grievances. More outreach and grievance redressal focus required.',
  },
  maharashtra: {
    d1Name:'Mumbai', d2Name:'Pune',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:4820, d2:3640 },
      { metric:'Champion Portal\nGrievances',      d1:3210, d2:1840 },
      { metric:'MSME Registrations\n(Upto May)',   d1:52400,d2:38200},
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:34,   d2:28   },
    ],
    takeaway: 'Mumbai dominates MSME density. Pune shows rapid growth. Both need stronger grievance resolution mechanisms.',
  },
  karnataka: {
    d1Name:'Bangalore Urban', d2Name:'Rest of Karnataka',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:5840, d2:1820 },
      { metric:'Champion Portal\nGrievances',      d1:1640, d2:2180 },
      { metric:'MSME Registrations\n(Upto May)',   d1:24800,d2:32400},
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:38,   d2:28   },
    ],
    takeaway: 'Bangalore has high density but rest of Karnataka has more MSMEs in absolute terms. North Karnataka needs dedicated outreach.',
  },


  kerala: {
    d1Name:'Ernakulam', d2Name:'Rest of Kerala',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:4240, d2:2980 },
      { metric:'Champion Portal\nGrievances',      d1:820,  d2:1320 },
      { metric:'MSME Registrations\n(Upto May)',   d1:9840, d2:28400},
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:28,   d2:22   },
    ],
    takeaway: 'Ernakulam leads in density. Coastal and rural districts have untapped potential. Fisheries-based MSMEs need targeted support.',
  },


  rajasthan: {
    d1Name:'Jaipur', d2Name:'Rest of Rajasthan',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:3210, d2:1840 },
      { metric:'Champion Portal\nGrievances',      d1:1820, d2:2300 },
      { metric:'MSME Registrations\n(Upto May)',   d1:14200,d2:38400},
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:32,   d2:26   },
    ],
    takeaway: 'Jaipur leads urban MSMEs. Shekhawati and tribal belt districts remain underserved. Handicraft clusters need credit linkage.',
  },
  tamilnadu: {
    d1Name:'Chennai', d2Name:'Rest of Tamil Nadu',
    metrics: [
      { metric:'MSME Density\n(Per 10,000 Pop.)', d1:6420, d2:3280 },
      { metric:'Champion Portal\nGrievances',      d1:2840, d2:3340 },
      { metric:'MSME Registrations\n(Upto May)',   d1:38400,d2:82400},
      { metric:'YoY Growth\n(2024 vs 2023)',       d1:34,   d2:26   },
    ],
    takeaway: 'Chennai has highest MSME density. Coimbatore and Tiruppur textile clusters drive the rest. Both regions need scheme promotion.',
  },
};

/** TODO: GET /api/intelligence/:stateId/district-comparison?year=YYYY&month=MM */
export function getNorthSouthComparison(stateId, monthYear) {
  const { month, year } = parseMonthYear(monthYear);
  const base = _NS_BASE[stateId] ?? _NS_BASE.goa;
  const v = (val) => applyVariance(val, stateId, year, month);
  return {
    d1Name: base.d1Name,
    d2Name: base.d2Name,
    metrics: base.metrics.map(m => ({
      metric: m.metric,
      // Growth rates don't scale with variance — keep as-is with slight year shift
      d1: m.metric.includes('YoY') ? m.d1 + (year - 2025) * 2 : v(m.d1),
      d2: m.metric.includes('YoY') ? m.d2 + (year - 2025) * 2 : v(m.d2),
    })),
    takeaway: base.takeaway,
  };
}


// TOP 10 SECTORS per district
// TODO: GET /api/intelligence/:stateId/sectors?district=d1&year=YYYY&month=MM

const _SECTORS_D1 = {
  goa: [
    { sector:'Other Land Transport', count:6135 },{ sector:'Travel Agencies', count:2191 },
    { sector:'Personal Services', count:1941 },   { sector:'Restaurants', count:1780 },
    { sector:'Retail Trade', count:1482 },         { sector:'Construction of Buildings', count:1273 },
    { sector:'Wholesale Trade', count:1243 },      { sector:'Agriculture', count:1081 },
    { sector:'Fabricated Metal Products', count:811 },{ sector:'Other Business Services', count:700 },
  ],
  maharashtra: [
    { sector:'Financial Services', count:82400 },{ sector:'Retail Trade', count:74200 },
    { sector:'IT & Software Services', count:68400 },{ sector:'Construction', count:54800 },
    { sector:'Wholesale Trade', count:48200 },{ sector:'Restaurants & Hotels', count:42600 },
    { sector:'Personal Services', count:38400 },{ sector:'Textiles', count:34800 },
    { sector:'Auto Components', count:28400 },{ sector:'Pharmaceutical', count:24800 },
  ],
  karnataka: [
    { sector:'IT & ITES', count:48200 },{ sector:'Retail Trade', count:38400 },
    { sector:'Construction', count:32400 },{ sector:'Garments & Textiles', count:28200 },
    { sector:'Restaurants', count:24800 },{ sector:'Engineering & Fabrication', count:18400 },
    { sector:'Wholesale Trade', count:16200 },{ sector:'Personal Services', count:14800 },
    { sector:'Auto Parts', count:12400 },{ sector:'Food Processing', count:10200 },
  ],

  // kerala: [
  //   { sector:'Retail Trade', count:28400 },{ sector:'Construction', count:22400 },
  //   { sector:'Personal Services', count:18200 },{ sector:'Restaurants', count:14800 },
  //   { sector:'Wholesale Trade', count:12400 },{ sector:'Seafood Processing', count:9800 },
  //   { sector:'Tourism Services', count:8400 },{ sector:'Handloom & Handicrafts', count:7200 },
  //   { sector:'Agriculture', count:6400 },{ sector:'Electronic Goods', count:5200 },
  // ],

  kerala: {

  Ernakulam: [
    { sector:'Other land transport', count:8713 },
    { sector:'Other personal service activities', count:6549 },
    { sector:'Manufacture of other food products', count:5038 },
    { sector:'Travel agency and tour operator activities', count:4250 },
    { sector:'Retail sale of other household equipment in specialized stores', count:3934 },
    { sector:'Retail sale of food beverages and tobacco in specialized stores', count:3736 },
    { sector:'Event catering and other food service activities', count:3440 },
    { sector:'Retail sale of other goods in specialized stores', count:3389 },
    { sector:'Manufacture of wearing apparel except fur apparel', count:3243 },
    { sector:'Computer programming consultancy and related activities', count:2836 },
  ],

  Alappuzha: [
    { sector:'Other personal service activities', count:3785 },
    { sector:'Other land transport', count:3228 },
    { sector:'Manufacture of other food products', count:2445 },
    { sector:'Travel agency and tour operator activities', count:2231 },
    { sector:'Event catering and other food service activities', count:2072 },
    { sector:'Retail sale of food beverages and tobacco in specialized stores', count:2052 },
    { sector:'Retail sale of other household equipment in specialized stores', count:1995 },
    { sector:'Other manufacturing n.e.c.', count:1633 },
    { sector:'Retail sale of other goods in specialized stores', count:1488 },
    { sector:'Construction of buildings', count:1328 },
  ],

  Kannur: [
    { sector:'Other personal service activities', count:10245 },
    { sector:'Other land transport', count:10208 },
    { sector:'Manufacture of other food products', count:2767 },
    { sector:'Travel agency and tour operator activities', count:2564 },
    { sector:'Event catering and other food service activities', count:1947 },
    { sector:'Retail sale of other household equipment in specialized stores', count:1827 },
    { sector:'Manufacture of wearing apparel except fur apparel', count:1450 },
    { sector:'Transport via pipeline', count:1377 },
    { sector:'Renting and leasing of motor vehicles', count:1324 },
    { sector:'Construction of buildings', count:1283 },
  ],

  Idukki: [
  { sector:'Other personal service activities', count:2254 },
  { sector:'Other land transport', count:2188 },
  { sector:'Manufacture of other food products', count:1145 },
  { sector:'Growing of perennial crops', count:1082 },
  { sector:'Travel agency and tour operator activities', count:964 },
  { sector:'Event catering and other food service activities', count:902 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:885 },
  { sector:'Construction of buildings', count:782 },
  { sector:'Retail sale of other household equipment in specialized stores', count:721 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:634 },
],

Kasaragod: [
  { sector:'Other land transport', count:3914 },
  { sector:'Other personal service activities', count:3781 },
  { sector:'Manufacture of other food products', count:1736 },
  { sector:'Travel agency and tour operator activities', count:1645 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:1461 },
  { sector:'Event catering and other food service activities', count:1412 },
  { sector:'Retail sale of other household equipment in specialized stores', count:1379 },
  { sector:'Construction of buildings', count:1184 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:1008 },
  { sector:'Other manufacturing n.e.c.', count:914 },
],

Kollam: [
  { sector:'Other personal service activities', count:6185 },
  { sector:'Other land transport', count:5971 },
  { sector:'Manufacture of other food products', count:3318 },
  { sector:'Travel agency and tour operator activities', count:2984 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:2840 },
  { sector:'Event catering and other food service activities', count:2661 },
  { sector:'Retail sale of other household equipment in specialized stores', count:2484 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:1835 },
  { sector:'Construction of buildings', count:1728 },
  { sector:'Other manufacturing n.e.c.', count:1614 },
],

Kottayam: [
  { sector:'Other personal service activities', count:4652 },
  { sector:'Other land transport', count:4518 },
  { sector:'Manufacture of other food products', count:2486 },
  { sector:'Travel agency and tour operator activities', count:2214 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:2107 },
  { sector:'Event catering and other food service activities', count:2046 },
  { sector:'Retail sale of other household equipment in specialized stores', count:1892 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:1537 },
  { sector:'Construction of buildings', count:1476 },
  { sector:'Other manufacturing n.e.c.', count:1341 },
],

Kozhikode: [
  { sector:'Other personal service activities', count:9248 },
  { sector:'Other land transport', count:9036 },
  { sector:'Manufacture of other food products', count:4581 },
  { sector:'Travel agency and tour operator activities', count:4327 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:4118 },
  { sector:'Event catering and other food service activities', count:3942 },
  { sector:'Retail sale of other household equipment in specialized stores', count:3815 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:2862 },
  { sector:'Construction of buildings', count:2617 },
  { sector:'Other manufacturing n.e.c.', count:2428 },
],

Malappuram: [
  { sector:'Other personal service activities', count:11463 },
  { sector:'Other land transport', count:10984 },
  { sector:'Manufacture of other food products', count:5482 },
  { sector:'Travel agency and tour operator activities', count:5117 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:4828 },
  { sector:'Event catering and other food service activities', count:4566 },
  { sector:'Retail sale of other household equipment in specialized stores', count:4321 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:3478 },
  { sector:'Construction of buildings', count:3184 },
  { sector:'Other manufacturing n.e.c.', count:2873 },
],

Palakkad: [
  { sector:'Other personal service activities', count:5626 },
  { sector:'Other land transport', count:5489 },
  { sector:'Manufacture of other food products', count:2814 },
  { sector:'Travel agency and tour operator activities', count:2594 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:2467 },
  { sector:'Event catering and other food service activities', count:2325 },
  { sector:'Retail sale of other household equipment in specialized stores', count:2188 },
  { sector:'Construction of buildings', count:1764 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:1682 },
  { sector:'Other manufacturing n.e.c.', count:1534 },
],

Pathanamthitta: [
  { sector:'Other personal service activities', count:2148 },
  { sector:'Other land transport', count:2037 },
  { sector:'Manufacture of other food products', count:1084 },
  { sector:'Travel agency and tour operator activities', count:1026 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:964 },
  { sector:'Event catering and other food service activities', count:908 },
  { sector:'Retail sale of other household equipment in specialized stores', count:876 },
  { sector:'Construction of buildings', count:714 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:658 },
  { sector:'Other manufacturing n.e.c.', count:602 },
],

Thiruvananthapuram: [
  { sector:'Other personal service activities', count:10128 },
  { sector:'Other land transport', count:9784 },
  { sector:'Manufacture of other food products', count:5062 },
  { sector:'Travel agency and tour operator activities', count:4725 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:4518 },
  { sector:'Event catering and other food service activities', count:4296 },
  { sector:'Retail sale of other household equipment in specialized stores', count:4017 },
  { sector:'Computer programming consultancy and related activities', count:3861 },
  { sector:'Construction of buildings', count:3026 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:2864 },
],

Thrissur: [
  { sector:'Other personal service activities', count:8362 },
  { sector:'Other land transport', count:8214 },
  { sector:'Manufacture of other food products', count:4214 },
  { sector:'Travel agency and tour operator activities', count:3961 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:3726 },
  { sector:'Event catering and other food service activities', count:3584 },
  { sector:'Retail sale of other household equipment in specialized stores', count:3391 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:2648 },
  { sector:'Construction of buildings', count:2417 },
  { sector:'Other manufacturing n.e.c.', count:2238 },
],

Wayanad: [
  { sector:'Other personal service activities', count:1468 },
  { sector:'Other land transport', count:1416 },
  { sector:'Growing of perennial crops', count:842 },
  { sector:'Manufacture of other food products', count:736 },
  { sector:'Travel agency and tour operator activities', count:682 },
  { sector:'Retail sale of food beverages and tobacco in specialized stores', count:654 },
  { sector:'Event catering and other food service activities', count:618 },
  { sector:'Construction of buildings', count:524 },
  { sector:'Retail sale of other household equipment in specialized stores', count:486 },
  { sector:'Manufacture of wearing apparel except fur apparel', count:438 },
],

},

  
  rajasthan: [
    { sector:'Textile & Garments', count:42400 },{ sector:'Retail Trade', count:28200 },
    { sector:'Construction', count:22800 },{ sector:'Handicrafts', count:18400 },
    { sector:'Restaurants & Hotels', count:14200 },{ sector:'Agriculture', count:12800 },
    { sector:'Marble & Granite', count:10400 },{ sector:'Wholesale Trade', count:9200 },
    { sector:'Personal Services', count:7800 },{ sector:'Gems & Jewellery', count:6400 },
  ],
  tamilnadu: [
    { sector:'Textiles & Yarn', count:84200 },{ sector:'Auto Components', count:62400 },
    { sector:'Retail Trade', count:54800 },{ sector:'Construction', count:42400 },
    { sector:'Leather Goods', count:38200 },{ sector:'IT Services', count:32400 },
    { sector:'Food Processing', count:28800 },{ sector:'Restaurants', count:24200 },
    { sector:'Agriculture', count:18400 },{ sector:'Wholesale Trade', count:14800 },
  ],
};



const _SECTORS_D2 = {
  goa: [
    { sector:'Construction of Buildings', count:1905 },{ sector:'Retail Trade', count:1656 },
    { sector:'Other Land Transport', count:1287 },{ sector:'Food Products', count:1165 },
    { sector:'Fabricated Metal Products', count:893 },{ sector:'Agriculture', count:728 },
    { sector:'Wholesale Trade', count:692 },{ sector:'Personal Services', count:560 },
    { sector:'Other Business Services', count:420 },{ sector:'Electrical Equipment', count:310 },
  ],
  maharashtra: [
    { sector:'IT & Software Services', count:124000 },{ sector:'Auto & EV Components', count:98400 },
    { sector:'Financial Services', count:84200 },{ sector:'Construction', count:72400 },
    { sector:'Retail Trade', count:62800 },{ sector:'Engineering Goods', count:54200 },
    { sector:'Pharmaceutical', count:48400 },{ sector:'Textiles', count:42200 },
    { sector:'Food Processing', count:36400 },{ sector:'Wholesale Trade', count:30800 },
  ],
  karnataka: [
    { sector:'Retail Trade', count:128400 },{ sector:'Construction', count:104200 },
    { sector:'Agriculture', count:92400 },{ sector:'Textiles', count:78200 },
    { sector:'Engineering & Fabrication', count:64800 },{ sector:'Restaurants', count:52400 },
    { sector:'Wholesale Trade', count:44200 },{ sector:'Personal Services', count:36800 },
    { sector:'Food Processing', count:28400 },{ sector:'Mining & Quarrying', count:22200 },
  ],

  kerala: {

  Ernakulam: [
    { sector:'Retail Trade', count:94800 },
    { sector:'Agriculture', count:82400 },
    { sector:'Construction', count:68200 },
    { sector:'Restaurants', count:54400 },
    { sector:'Fisheries & Aquaculture', count:48200 },
    { sector:'Coconut Products', count:38400 },
    { sector:'Handloom & Handicrafts', count:32800 },
    { sector:'Wholesale Trade', count:26400 },
    { sector:'Personal Services', count:22200 },
    { sector:'Rubber Products', count:16800 },
  ],

  Alappuzha: [
    // district-specific data
  ],

  Kannur: [
    // district-specific data
  ],

  Idukki: [
    // district-specific data
  ],

  Kasaragod: [
    // district-specific data
  ],

  Kollam: [
    // district-specific data
  ],

  Kottayam: [
    // district-specific data
  ],

  Kozhikode: [
    // district-specific data
  ],

  Malappuram: [
    // district-specific data
  ],

  Palakkad: [
    // district-specific data
  ],

  Pathanamthitta: [
    // district-specific data
  ],

  Thiruvananthapuram: [
    // district-specific data
  ],

  Thrissur: [
    // district-specific data
  ],

  Wayanad: [
    // district-specific data
  ],

},
  rajasthan: [
    { sector:'Agriculture & Allied', count:184200 },{ sector:'Retail Trade', count:148400 },
    { sector:'Textile & Garments', count:124200 },{ sector:'Construction', count:98400 },
    { sector:'Handicrafts', count:84200 },{ sector:'Mining', count:68400 },
    { sector:'Wholesale Trade', count:54800 },{ sector:'Food Processing', count:42400 },
    { sector:'Livestock & Dairy', count:36200 },{ sector:'Restaurants', count:28800 },
  ],
  tamilnadu: [
    { sector:'Textiles & Weaving', count:184200 },{ sector:'Agriculture', count:148400 },
    { sector:'Retail Trade', count:128200 },{ sector:'Construction', count:98400 },
    { sector:'Food Processing', count:82400 },{ sector:'Wholesale Trade', count:64800 },
    { sector:'Engineering Goods', count:52400 },{ sector:'Restaurants', count:44200 },
    { sector:'Personal Services', count:36800 },{ sector:'Fisheries', count:28400 },
  ],
};


/** TODO: GET /api/intelligence/:stateId/sectors?district=primary&year=YYYY&month=MM */

function getKeralaSectorData(source, district = 'All Districts') {
  if (!source || typeof source !== 'object') return [];

  if (district && district !== 'All Districts') {
    const selected = source[district];
    if (Array.isArray(selected)) return selected;
  }

  const sectorTotals = new Map();

  Object.values(source).forEach((sectors) => {
    if (!Array.isArray(sectors)) return;

    sectors.forEach(({ sector, count }) => {
      sectorTotals.set(sector, (sectorTotals.get(sector) || 0) + count);
    });
  });

  return Array.from(sectorTotals.entries())
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function getD1TopSectors(stateId, monthYear, district = 'All Districts') {
  const { month, year } = parseMonthYear(monthYear);

  let base;

  if (stateId === 'kerala') {
    base = getKeralaSectorData(_SECTORS_D1.kerala, district);
  } else {
    base = _SECTORS_D1[stateId] ?? _SECTORS_D1.goa;
  }

  return base.map((s) => ({
    ...s,
    count: applyVariance(s.count, stateId, year, month),
  }));
}

export function getD2TopSectors(stateId, monthYear, district = 'All Districts') {
  const { month, year } = parseMonthYear(monthYear);

  let base;

  if (stateId === 'kerala') {
    base = getKeralaSectorData(_SECTORS_D2.kerala, district);
  } else {
    base = _SECTORS_D2[stateId] ?? _SECTORS_D2.goa;
  }

  return base.map((s) => ({
    ...s,
    count: applyVariance(s.count, stateId, year, month),
  }));
}


// OPPORTUNITY MATRIX (bubble/scatter chart)
// TODO: GET /api/intelligence/:stateId/opportunity-matrix

const _OPP_MATRIX = {
  goa: [
    { name:'Transport',    enterpriseCount:82, schemePenetration:72, size:18, color:'#0891b2' },
    { name:'Tourism',      enterpriseCount:74, schemePenetration:68, size:16, color:'#059669' },
    { name:'Retail Trade', enterpriseCount:78, schemePenetration:28, size:20, color:'#f97316' },
    { name:'Food Services',enterpriseCount:62, schemePenetration:32, size:14, color:'#8b5cf6' },
    { name:'Textiles',     enterpriseCount:28, schemePenetration:22, size:12, color:'#ef4444' },
    { name:'Manufacturing',enterpriseCount:24, schemePenetration:18, size:14, color:'#f59e0b' },
  ],
  maharashtra: [
    { name:'IT Services',  enterpriseCount:88, schemePenetration:74, size:22, color:'#0891b2' },
    { name:'Pharma',       enterpriseCount:72, schemePenetration:68, size:18, color:'#059669' },
    { name:'Auto Parts',   enterpriseCount:84, schemePenetration:32, size:20, color:'#f97316' },
    { name:'Textiles',     enterpriseCount:68, schemePenetration:28, size:16, color:'#ef4444' },
    { name:'Food Process', enterpriseCount:42, schemePenetration:22, size:14, color:'#f59e0b' },
    { name:'Engineering',  enterpriseCount:36, schemePenetration:18, size:12, color:'#8b5cf6' },
  ],
  karnataka: [
    { name:'IT & ITES',    enterpriseCount:92, schemePenetration:76, size:24, color:'#0891b2' },
    { name:'Engineering',  enterpriseCount:68, schemePenetration:62, size:18, color:'#059669' },
    { name:'Garments',     enterpriseCount:74, schemePenetration:28, size:20, color:'#ef4444' },
    { name:'Retail',       enterpriseCount:78, schemePenetration:24, size:16, color:'#f97316' },
    { name:'Agriculture',  enterpriseCount:34, schemePenetration:18, size:14, color:'#f59e0b' },
    { name:'Mining',       enterpriseCount:28, schemePenetration:14, size:12, color:'#8b5cf6' },
  ],

  kerala: [
  { name:'Retail Trade',         enterpriseCount:92, schemePenetration:34, size:24, color:'#0891b2' },
  { name:'Construction',         enterpriseCount:84, schemePenetration:48, size:22, color:'#059669' },
  { name:'Restaurants',          enterpriseCount:72, schemePenetration:42, size:18, color:'#f97316' },
  { name:'Wholesale Trade',      enterpriseCount:65, schemePenetration:38, size:18, color:'#8b5cf6' },
  { name:'Agriculture',          enterpriseCount:58, schemePenetration:22, size:16, color:'#ef4444' },
  { name:'Personal Services',    enterpriseCount:54, schemePenetration:28, size:16, color:'#f59e0b' }
],


  rajasthan: [
    { name:'Handicrafts',  enterpriseCount:72, schemePenetration:62, size:18, color:'#0891b2' },
    { name:'Textiles',     enterpriseCount:84, schemePenetration:58, size:22, color:'#059669' },
    { name:'Retail',       enterpriseCount:78, schemePenetration:24, size:16, color:'#f97316' },
    { name:'Gems & Jewels',enterpriseCount:48, schemePenetration:42, size:14, color:'#8b5cf6' },
    { name:'Agriculture',  enterpriseCount:82, schemePenetration:18, size:20, color:'#f59e0b' },
    { name:'Mining',       enterpriseCount:38, schemePenetration:14, size:12, color:'#ef4444' },
  ],
  tamilnadu: [
    { name:'Textiles',     enterpriseCount:92, schemePenetration:72, size:24, color:'#0891b2' },
    { name:'Auto Parts',   enterpriseCount:84, schemePenetration:68, size:22, color:'#059669' },
    { name:'Retail',       enterpriseCount:88, schemePenetration:24, size:18, color:'#f97316' },
    { name:'Leather',      enterpriseCount:64, schemePenetration:52, size:16, color:'#8b5cf6' },
    { name:'IT Services',  enterpriseCount:72, schemePenetration:62, size:18, color:'#0891b2' },
    { name:'Food Process', enterpriseCount:48, schemePenetration:22, size:14, color:'#f59e0b' },
  ],
};

const _OPP_FOCUS_AREAS = {
  goa:         'Sectors in the bottom right quadrant have high enterprise presence but low scheme penetration. Prioritize outreach and scheme promotion in these sectors.',
  maharashtra: 'Auto Parts and Textiles show high enterprise count but low scheme uptake. Targeted MUDRA and PMEGP campaigns recommended.',
  karnataka:   'Garments and Retail have large MSME base but low scheme penetration. North Karnataka clusters need focused financial linkage.',
  kerala:      'Retail Trade, Construction and Restaurant sectors have the highest MSME concentration. Agriculture and Personal Services require improved scheme penetration.',
  rajasthan:   'Agriculture and Retail have maximum enterprises but lowest scheme penetration. Mining sector needs awareness about credit schemes.',
  tamilnadu:   'Retail and Food Processing have high enterprise count but low scheme uptake. District-level camps can improve conversion rapidly.',
};

/** TODO: GET /api/intelligence/:stateId/opportunity-matrix */
export function getOpportunityMatrix(stateId) {
  return {
    data: _OPP_MATRIX[stateId] ?? _OPP_MATRIX.goa,
    focusAreas: _OPP_FOCUS_AREAS[stateId] ?? _OPP_FOCUS_AREAS.goa,
  };
}


// GRIEVANCES DATA
// TODO: GET /api/intelligence/:stateId/grievances?year=YYYY&month=MM

const _GRIEVANCE_BASE = {
  goa: {
    total: 436, d1: 246, d2: 190, d1Pct: 56.4, d2Pct: 43.6,
    categories: [
      { name:'Registration',   count:122, pct:28.0, color:'#1e3a8a' },
      { name:'Loan / Finance', count:98,  pct:22.5, color:'#1e3a8a' },
      { name:'Scheme Benefits',count:86,  pct:19.7, color:'#1e3a8a' },
      { name:'Payment Delays', count:74,  pct:17.0, color:'#f97316' },
      { name:'Others',         count:56,  pct:12.8, color:'#9ca3af' },
    ],
    alert: 'North Goa contributes 56% of all grievances. Focus on registration, loan processing and scheme awareness issues.',
  },
  maharashtra: {
    total:8240, d1:4820, d2:2180, d1Pct:58.5, d2Pct:26.5,
    categories: [
      { name:'Registration',   count:2142, pct:26.0, color:'#1e3a8a' },
      { name:'Loan / Finance', count:1894, pct:23.0, color:'#1e3a8a' },
      { name:'Scheme Benefits',count:1648, pct:20.0, color:'#1e3a8a' },
      { name:'Payment Delays', count:1400, pct:17.0, color:'#f97316' },
      { name:'Others',         count:1156, pct:14.0, color:'#9ca3af' },
    ],
    alert: 'Mumbai contributes 58.5% of grievances. Loan processing and registration issues dominate across the state.',
  },
  karnataka: {
    total:3820, d1:1640, d2:2180, d1Pct:42.9, d2Pct:57.1,
    categories: [
      { name:'Registration',   count:993,  pct:26.0, color:'#1e3a8a' },
      { name:'Loan / Finance', count:878,  pct:23.0, color:'#1e3a8a' },
      { name:'Scheme Benefits',count:764,  pct:20.0, color:'#1e3a8a' },
      { name:'Payment Delays', count:650,  pct:17.0, color:'#f97316' },
      { name:'Others',         count:535,  pct:14.0, color:'#9ca3af' },
    ],
    alert: 'North Karnataka contributes higher grievances per MSME than Bangalore. Documentation support needed.',
  },

  kerala: {
    total: 2654,
    d1: 1324,
    d2: 928,
    d1Pct: 49.9,
    d2Pct: 35.0,
    categories: [
      { name: 'Registration', count: 690, pct: 26.0, color: '#1e3a8a' },
      { name: 'Loan / Finance', count: 610, pct: 23.0, color: '#1e3a8a' },
      { name: 'Scheme Benefits', count: 531, pct: 20.0, color: '#1e3a8a' },
      { name: 'Payment Delays', count: 451, pct: 17.0, color: '#f97316' },
      { name: 'Others', count: 372, pct: 14.0, color: '#9ca3af' },
    ],
    alert: 'Ernakulam reports the highest grievance volume, followed by Thrissur. Registration and loan-related issues account for nearly half of all grievances, indicating the need for stronger district-level facilitation and awareness initiatives.',
  },

  
  rajasthan: {
    total:4120, d1:1820, d2:2300, d1Pct:44.2, d2Pct:55.8,
    categories: [
      { name:'Registration',   count:1071, pct:26.0, color:'#1e3a8a' },
      { name:'Loan / Finance', count:948,  pct:23.0, color:'#1e3a8a' },
      { name:'Scheme Benefits',count:824,  pct:20.0, color:'#1e3a8a' },
      { name:'Payment Delays', count:700,  pct:17.0, color:'#f97316' },
      { name:'Others',         count:577,  pct:14.0, color:'#9ca3af' },
    ],
    alert: 'Rural and tribal blocks contribute 55.8% of grievances. Credit access and scheme documentation are primary pain points.',
  },
  tamilnadu: {
    total:6180, d1:2840, d2:3340, d1Pct:45.9, d2Pct:54.1,
    categories: [
      { name:'Registration',   count:1607, pct:26.0, color:'#1e3a8a' },
      { name:'Loan / Finance', count:1421, pct:23.0, color:'#1e3a8a' },
      { name:'Scheme Benefits',count:1236, pct:20.0, color:'#1e3a8a' },
      { name:'Payment Delays', count:1051, pct:17.0, color:'#f97316' },
      { name:'Others',         count:865,  pct:14.0, color:'#9ca3af' },
    ],
    alert: 'Districts outside Chennai contribute 54% of grievances. Textile clusters report most payment delay issues.',
  },
};

/** TODO: GET /api/intelligence/:stateId/grievances?year=YYYY&month=MM */
export function getGrievanceData(stateId, monthYear) {
  const { month, year } = parseMonthYear(monthYear);
  const b = _GRIEVANCE_BASE[stateId] ?? _GRIEVANCE_BASE.goa;
  const v = (val) => applyVariance(val, stateId, year, month);
  const total = v(b.total);
  return {
    total,
    d1: v(b.d1), d2: v(b.d2),
    d1Name: _BASE_KPIS[stateId]?.d1Name ?? 'District 1',
    d2Name: _BASE_KPIS[stateId]?.d2Name ?? 'District 2',
    d1Pct: b.d1Pct, d2Pct: b.d2Pct,
    categories: b.categories.map(c => {
      const count = v(c.count);
      return { ...c, count, pct: parseFloat(((count / total) * 100).toFixed(1)) };
    }),
    alert: b.alert,
  };
}


// RECOMMENDED ACTIONS
// TODO: GET /api/intelligence/:stateId/recommended-actions?year=YYYY&month=MM

const _ACTIONS = {
  goa: {
    d1: ['Intensify outreach in Transport & Tourism sectors','Increase PMEGP and Credit Linked Scheme awareness','Conduct more stakeholder meetings in high grievance blocks','Reduce registration and loan processing time'],
    d2: ['Promote Manufacturing & Food Processing sectors','Increase participation in schemes (MUDRA, PMEGP, Udyam)','Organise more awareness campaigns in rural areas','Improve documentation support for applicants'],
  },
  maharashtra: {
    d1: ['Scale MUDRA Kishore and Tarun category outreach in Mumbai','Resolve registration portal issues causing 26% of grievances','Strengthen auto-ancillary MSME credit linkage programs','Fast-track payment delays in construction and retail sectors'],
    d2: ['Push PMEGP adoption in Pune auto-cluster MSMEs','Address scheme benefit delays in textile manufacturing','Organise quarterly DFO camps in industrial estates','Improve digital documentation support for applicants'],
  },
  karnataka: {
    d1: ['Scale IT-sector MSME scheme awareness in Bangalore','Create fast-track portal for high-volume DFO registration','Promote SFURTI for garment clusters in East Bangalore','Monitor and reduce 38% YoY growth sustainability'],
    d2: ['Prioritise outreach in North Karnataka agricultural MSMEs','Credit linkage camps in Hubli-Dharwad and Belgaum','Address mining-sector MSMEs ignored in scheme promotion','Strengthen grievance redressal in rural districts'],
  },
  kerala: {

  d1: [
    'Increase MSME outreach in Ernakulam industrial clusters.',
    'Accelerate Udyam registration support camps.',
    'Promote PMEGP and MUDRA awareness.',
    'Improve Champion grievance disposal.'
  ],

  d2: [
    'Expand district level MSME facilitation centres.',
    'Increase awareness in rural enterprises.',
    'Strengthen financial linkage through banks.',
    'Improve digital registration assistance.'
  ]

},
  rajasthan: {
    d1: ['Promote textile MSME credit-linked schemes in Jaipur','Gem and jewellery MSMEs need GI-tag and export support','Reduce loan processing TAT below 10 days in Jaipur DFO','Organise scheme awareness melas in industrial areas'],
    d2: ['Agricultural MSMEs in Shekhawati need priority credit','Tribal block handicraft clusters need SFURTI linkage','Mining-sector MSME registration compliance support','Rural blocks need mobile DFO camps for documentation help'],
  },
  tamilnadu: {
    d1: ['Auto-component MSME credit linkage with PLI scheme','Leather cluster MSMEs need PMEGP and export promotion','Promote PM Vishwakarma for artisan MSMEs in Chennai','Resolve payment delay grievances in construction sector'],
    d2: ['Tiruppur textile cluster needs SFURTI and MUDRA push','Fishery MSMEs in coastal districts underserved by schemes','Coimbatore engineering MSMEs need tech-upgrade support','Agri-processing MSMEs need cold-chain credit linkage'],
  },
};

/** TODO: GET /api/intelligence/:stateId/recommended-actions */
export function getRecommendedActions(stateId) {
  const actions = _ACTIONS[stateId] ?? _ACTIONS.goa;
  const b = _BASE_KPIS[stateId] ?? _BASE_KPIS.goa;
  return { d1Name: b.d1Name, d2Name: b.d2Name, d1: actions.d1, d2: actions.d2 };
}


// AT A GLANCE — static state facts
// TODO: GET /api/intelligence/:stateId/at-a-glance

const _AT_A_GLANCE = {
  goa:         { population:'15.44 Lakh', districts:2, subDistricts:12, blocks:24, villages:394 },
  maharashtra: { population:'12.47 Cr',   districts:36,subDistricts:358,blocks:355,villages:44198},
  karnataka:   { population:'6.61 Cr',    districts:31,subDistricts:236,blocks:227,villages:29736},
  kerala:      { population:'3.34 Cr',    districts:14,subDistricts:77, blocks:152,villages:1664 },
  rajasthan:   { population:'6.86 Cr',    districts:33,subDistricts:352,blocks:352,villages:44794},
  tamilnadu:   { population:'7.21 Cr',    districts:38,subDistricts:261,blocks:386,villages:12618},
};

/** TODO: GET /api/intelligence/:stateId/at-a-glance */
export function getAtAGlance(stateId) {
  return _AT_A_GLANCE[stateId] ?? _AT_A_GLANCE.goa;
}


// SECTOR HEATMAP
// TODO: GET /api/intelligence/:stateId/sector-heatmap?year=YYYY&month=MM

export function getSectorHeatmap(stateId, monthYear, district = 'All Districts') {
  const { month, year } = parseMonthYear(monthYear);
  const v = (val) => applyVariance(val, stateId, year, month);
  const d1Sectors = getD1TopSectors(stateId, monthYear, district);
  const d2Sectors = getD2TopSectors(stateId, monthYear, district);
  const b = _BASE_KPIS[stateId] ?? _BASE_KPIS.goa;

  // Build unified sector list from top sectors of both districts
  const allSectors = [...new Set([
    ...d1Sectors.map(s => s.sector),
    ...d2Sectors.map(s => s.sector),
  ])].slice(0, 12);

  const d1Map = Object.fromEntries(d1Sectors.map(s => [s.sector, s.count]));
  const d2Map = Object.fromEntries(d2Sectors.map(s => [s.sector, s.count]));

  return {
    columns: allSectors,
    rows: [
      { district: b.d1Name, data: allSectors.map(s => d1Map[s] ?? 0) },
      { district: b.d2Name, data: allSectors.map(s => d2Map[s] ?? 0) },
    ],
  };
}
