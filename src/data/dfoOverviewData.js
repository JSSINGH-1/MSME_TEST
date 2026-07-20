import { Factory, Pill, Cog, Cpu, Microwave } from "lucide-react";

/**
 * Helper to generate pseudo-random variance based on month string
 */
function getVariance(monthStr = 'Jul 2026') {
  let hash = 0;
  for (let i = 0; i < monthStr.length; i++) {
    hash = monthStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Return a multiplier between 0.9 and 1.15
  const random = Math.abs(Math.sin(hash));
  return 0.9 + (random * 0.25);
}

const _BASE_DFO_NATIONAL_KPIS = {
  totalMSMECatered: { value: 870, label: 'Total MSME Attended', sub: 'Across 12 DFOs' },
  queriesResolved: { value: 78, label: '% MSME Queries Resolved', sub: 'Average', suffix: '%' },
  avgTurnaroundTime: { value: 5.20, label: 'Avg. Turnaround Time', sub: 'Average', suffix: ' Days' },
  schemeApplications: { value: 380, label: 'Scheme Applications Supported', sub: 'Total' },
  conversionRate: { value: 62, label: 'Application Conversion Rate', sub: 'Average', suffix: '%' },
  awarenessCampaigns: { value: 72, label: 'Awareness Campaigns Conducted', sub: 'Total' },
  budgetUtilisedPct: { value: 49, label: 'Budget Utilisation', sub: 'National Avg', suffix: '%' },
  stakeholderMeetings: { value: 70, label: 'Stakeholder Meetings', sub: 'Total' },
  publicProcurement: { value: 48, label: 'Public Procurement', sub: 'GEM: 32 | Tender: 16', suffix: '' },
};

export function getDFONationalKPIs(month) {
  const v = getVariance(month);

  // Queries resolved should stay > 80% usually
  let resolvedPct = Math.round(78 * (v > 1 ? v : 1.05));
  if (resolvedPct < 80) resolvedPct = 80 + Math.floor(v * 5); // force >= 80%
  if (resolvedPct > 98) resolvedPct = 98;

  let conversionRate = Math.round(62 * v);
  if (conversionRate > 85) conversionRate = 85;

  let budgetPct = Math.round(49 * v);
  if (budgetPct > 95) budgetPct = 95;

  return {
    ..._BASE_DFO_NATIONAL_KPIS,
    totalMSMECatered: { ..._BASE_DFO_NATIONAL_KPIS.totalMSMECatered, value: Math.round(870 * v) },
    schemeApplications: { ..._BASE_DFO_NATIONAL_KPIS.schemeApplications, value: Math.round(380 * v) },
    awarenessCampaigns: { ..._BASE_DFO_NATIONAL_KPIS.awarenessCampaigns, value: Math.round(72 * v) },
    stakeholderMeetings: { ..._BASE_DFO_NATIONAL_KPIS.stakeholderMeetings, value: Math.round(70 * v) },
    publicProcurement: { ..._BASE_DFO_NATIONAL_KPIS.publicProcurement, value: Math.round(48 * v) },
    avgTurnaroundTime: { ..._BASE_DFO_NATIONAL_KPIS.avgTurnaroundTime, value: (5.20 / (v > 0 ? v : 1)).toFixed(2) },
    queriesResolved: { ..._BASE_DFO_NATIONAL_KPIS.queriesResolved, value: String(resolvedPct) },
    conversionRate: { ..._BASE_DFO_NATIONAL_KPIS.conversionRate, value: String(conversionRate) },
    budgetUtilisedPct: { ..._BASE_DFO_NATIONAL_KPIS.budgetUtilisedPct, value: String(budgetPct) },
  };
}

const _BASE_STATE_CHART_DATA = [
  { state: 'Andhra Pradesh', shortState: 'AP', msmeCatered: 25, queriesResolved: 75, conversionRate: 58, avgTAT: 4.50 },
  { state: 'Karnataka', shortState: 'KA', msmeCatered: 155, queriesResolved: 82, conversionRate: 65, avgTAT: 5.10 },
  { state: 'Kerala', shortState: 'KL', msmeCatered: 55, queriesResolved: 80, conversionRate: 63, avgTAT: 4.80 },
  { state: 'Lakshadweep', shortState: 'LD', msmeCatered: 28, queriesResolved: 70, conversionRate: 55, avgTAT: 6.20 },
  { state: 'Tamil Nadu', shortState: 'TN', msmeCatered: 158, queriesResolved: 81, conversionRate: 64, avgTAT: 5.40 },
  { state: 'Telangana', shortState: 'TG', msmeCatered: 52, queriesResolved: 79, conversionRate: 62, avgTAT: 5.80 },
];

export function getDFOStateChartData(month) {
  const v = getVariance(month);
  return _BASE_STATE_CHART_DATA.map(d => ({
    ...d,
    msmeCatered: Math.round(d.msmeCatered * v),
    queriesResolved: Math.min(99, Math.round(d.queriesResolved * (v > 1 ? v : 1.05))),
    conversionRate: Math.min(95, Math.round(d.conversionRate * v)),
    avgTAT: parseFloat((d.avgTAT / (v > 0 ? v : 1)).toFixed(2)),
  }));
}

const _BASE_DFO_BY_STATE = [
  {
    state: 'Andhra Pradesh', count: 1,
    dfos: [{ id: 'visakhapatnam', name: 'DFO Visakhapatnam', msmeCatered: 25, queriesResolved: 75, avgTAT: 4.50, schemeApps: 14, conversionRate: 58, campaigns: 4, budgetUtilisedPct: 41, stakeholderMeetings: 8, procurementGEM: 2, procurementTender: 1 }],
  },
  {
    state: 'Karnataka', count: 4,
    dfos: [
      { id: 'hubli', name: 'DFO Hubli', msmeCatered: 55, queriesResolved: 85, avgTAT: 4.80, schemeApps: 28, conversionRate: 68, campaigns: 8, budgetUtilisedPct: 55, stakeholderMeetings: 8, procurementGEM: 8, procurementTender: 4 },
      { id: 'bangalore', name: 'DFO Bangalore', msmeCatered: 30, queriesResolved: 80, avgTAT: 5.50, schemeApps: 18, conversionRate: 62, campaigns: 4, budgetUtilisedPct: 56, stakeholderMeetings: 4, procurementGEM: 5, procurementTender: 2 },
      { id: 'mangalore', name: 'Branch DFO Mangalore', msmeCatered: 45, queriesResolved: 82, avgTAT: 5.80, schemeApps: 22, conversionRate: 65, campaigns: 8, budgetUtilisedPct: 48, stakeholderMeetings: 8, procurementGEM: 6, procurementTender: 3 },
      { id: 'gulbarga', name: 'Branch DFO Gulbarga', msmeCatered: 25, queriesResolved: 72, avgTAT: 3.40, schemeApps: 12, conversionRate: 56, campaigns: 4, budgetUtilisedPct: 36, stakeholderMeetings: 3, procurementGEM: 3, procurementTender: 1 },
    ],
  },
  {
    state: 'Kerala', count: 1,
    dfos: [{ id: 'thrissur', name: 'DFO Thrissur', msmeCatered: 55, queriesResolved: 80, avgTAT: 5.20, schemeApps: 26, conversionRate: 63, campaigns: 8, budgetUtilisedPct: 46, stakeholderMeetings: 7, procurementGEM: 4, procurementTender: 2 }],
  },
  {
    state: 'Lakshadweep', count: 1,
    dfos: [{ id: 'lakshadweep', name: 'Br. DFO Lakshadweep', msmeCatered: 28, queriesResolved: 70, avgTAT: 8.50, schemeApps: 12, conversionRate: 55, campaigns: 4, budgetUtilisedPct: 30, stakeholderMeetings: 4, procurementGEM: 1, procurementTender: 0 }],
  },
  {
    state: 'Tamil Nadu', count: 4,
    dfos: [
      { id: 'chennai', name: 'DFO Chennai', msmeCatered: 55, queriesResolved: 84, avgTAT: 6.50, schemeApps: 28, conversionRate: 66, campaigns: 8, budgetUtilisedPct: 53, stakeholderMeetings: 8, procurementGEM: 5, procurementTender: 2 },
      { id: 'coimbatore', name: 'Branch DFO Coimbatore', msmeCatered: 28, queriesResolved: 78, avgTAT: 4.20, schemeApps: 14, conversionRate: 60, campaigns: 4, budgetUtilisedPct: 45, stakeholderMeetings: 4, procurementGEM: 3, procurementTender: 1 },
      { id: 'madurai', name: 'DFO Madurai', msmeCatered: 52, queriesResolved: 81, avgTAT: 5.20, schemeApps: 25, conversionRate: 64, campaigns: 8, budgetUtilisedPct: 61, stakeholderMeetings: 7, procurementGEM: 4, procurementTender: 2 },
      { id: 'tirunelveli', name: 'DFO Tirunelveli', msmeCatered: 23, queriesResolved: 74, avgTAT: 5.60, schemeApps: 12, conversionRate: 58, campaigns: 2, budgetUtilisedPct: 36, stakeholderMeetings: 2, procurementGEM: 1, procurementTender: 1 },
    ],
  },
  {
    state: 'Telangana', count: 1,
    dfos: [{ id: 'hyderabad', name: 'DFO Hyderabad', msmeCatered: 52, queriesResolved: 79, avgTAT: 5.80, schemeApps: 24, conversionRate: 62, campaigns: 5, budgetUtilisedPct: 58, stakeholderMeetings: 5, procurementGEM: 3, procurementTender: 1 }],
  },
];

export function getDFOByState(month) {
  const v = getVariance(month);
  return _BASE_DFO_BY_STATE.map(g => ({
    ...g,
    dfos: g.dfos.map(d => ({
      ...d,
      msmeCatered: Math.round(d.msmeCatered * v),
      schemeApps: Math.round(d.schemeApps * v),
      queriesResolved: Math.min(99, Math.round(d.queriesResolved * (v > 1 ? v : 1.05))),
      conversionRate: Math.min(95, Math.round(d.conversionRate * v)),
      avgTAT: parseFloat((d.avgTAT / (v > 0 ? v : 1)).toFixed(2)),
      campaigns: Math.round(d.campaigns * v),
      budgetUtilisedPct: Math.min(100, Math.round(d.budgetUtilisedPct * v)),
      stakeholderMeetings: Math.round(d.stakeholderMeetings * v),
      procurementGEM: Math.round(d.procurementGEM * v),
      procurementTender: Math.round(d.procurementTender * v),
    }))
  }));
}

const _BASE_TOP_PERFORMERS = {
  highestMSME: [
    { rank: 1, name: 'DFO Hubli', value: 55 },
    { rank: 2, name: 'DFO Chennai', value: 55 },
    { rank: 3, name: 'DFO Thrissur', value: 55 },
  ],
  highestConversion: [
    { rank: 1, name: 'DFO Hubli', value: '68%' },
    { rank: 2, name: 'DFO Chennai', value: '66%' },
    { rank: 3, name: 'DFO Madurai', value: '64%' },
  ],
  lowestTAT: [
    { rank: 1, name: 'Branch DFO Gulbarga', value: '3.40' },
    { rank: 2, name: 'Branch DFO Coimbatore', value: '4.20' },
    { rank: 3, name: 'DFO Visakhapatnam', value: '4.50' },
  ],
};

export function getTopPerformers(month) {
  const v = getVariance(month);
  return {
    highestMSME: _BASE_TOP_PERFORMERS.highestMSME.map(d => ({ ...d, value: Math.round(d.value * v) })),
    highestConversion: _BASE_TOP_PERFORMERS.highestConversion.map(d => ({ ...d, value: `${Math.min(95, Math.round(parseInt(d.value) * v))}%` })),
    lowestTAT: _BASE_TOP_PERFORMERS.lowestTAT.map(d => ({ ...d, value: (parseFloat(d.value) / (v > 0 ? v : 1)).toFixed(2) })),
  };
}

export const GROWTH_SECTORS = [
  { name: 'Textiles', icon: Factory },
  { name: 'Food Processing', icon: Microwave },
  { name: 'Pharmaceuticals', icon: Pill },
  { name: 'Engineering', icon: Cog },
  { name: 'Electronics', icon: Cpu },
];

export const CHALLENGES = [
  'Banks not providing loans',
  'Market saturation',
  'High cost of raw material',
  'State compliances',
];
