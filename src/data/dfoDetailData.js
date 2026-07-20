/**
 * DFO DETAIL PAGE — Dummy Data
 * Every DFO has its own unique entry.
 * TODO: GET /api/dfo/:dfoId/detail?month=YYYY-MM
 */

// 1. KPIs
export const DFO_DETAIL_KPIS = {
  hubli: { name: 'DFO Hubli', zone: 'Karnataka Zone', msmeCatered: { value: 50, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '5.75', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹30.4 L / ₹55 L', label: 'Budget Utilised (Till July)', sub: '55% Utilised' }, stakeholderMeetings: { value: 8, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '8G / 4T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  bangalore: { name: 'DFO Bangalore', zone: 'Karnataka Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '6.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹26.8 L / ₹48 L', label: 'Budget Utilised (Till July)', sub: '56% Utilised' }, stakeholderMeetings: { value: 4, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '5G / 2T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  mangalore: { name: 'Branch DFO Mangalore', zone: 'Karnataka Zone', msmeCatered: { value: 50, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '7.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹20.4 L / ₹55 L', label: 'Budget Utilised (Till July)', sub: '48% Utilised' }, stakeholderMeetings: { value: 8, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '6G / 3T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  gulbarga: { name: 'Branch DFO Gulbarga', zone: 'Karnataka Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '3.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹16.0 L / ₹45 L', label: 'Budget Utilised (Till July)', sub: '36% Utilised' }, stakeholderMeetings: { value: 3, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '3G / 1T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  visakhapatnam: { name: 'DFO Visakhapatnam', zone: 'Andhra Pradesh Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '4.50', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹20.5 L / ₹50 L', label: 'Budget Utilised (Till July)', sub: '41% Utilised' }, stakeholderMeetings: { value: 8, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '2G / 1T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  thrissur: { name: 'DFO Thrissur', zone: 'Kerala Zone', msmeCatered: { value: 50, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '6.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹24.0 L / ₹52 L', label: 'Budget Utilised (Till July)', sub: '46% Utilised' }, stakeholderMeetings: { value: 7, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '4G / 2T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  lakshadweep: { name: 'Br. DFO Lakshadweep', zone: 'Lakshadweep Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '10.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹10.5 L / ₹35 L', label: 'Budget Utilised (Till July)', sub: '30% Utilised' }, stakeholderMeetings: { value: 4, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '1G / 0T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  chennai: { name: 'DFO Chennai', zone: 'Tamil Nadu Zone', msmeCatered: { value: 50, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '8.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹23.7 L / ₹45 L', label: 'Budget Utilised (Till July)', sub: '53% Utilised' }, stakeholderMeetings: { value: 8, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '5G / 2T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  coimbatore: { name: 'Branch DFO Coimbatore', zone: 'Tamil Nadu Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '4.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹23.5 L / ₹52 L', label: 'Budget Utilised (Till July)', sub: '45% Utilised' }, stakeholderMeetings: { value: 4, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '3G / 1T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  madurai: { name: 'DFO Madurai', zone: 'Tamil Nadu Zone', msmeCatered: { value: 50, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '5.75', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹31.6 L / ₹52 L', label: 'Budget Utilised (Till July)', sub: '61% Utilised' }, stakeholderMeetings: { value: 7, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '4G / 2T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  tirunelveli: { name: 'DFO Tirunelveli', zone: 'Tamil Nadu Zone', msmeCatered: { value: 25, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '0.80', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '6.00', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 10, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '4.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹16.2 L / ₹45 L', label: 'Budget Utilised (Till July)', sub: '36% Utilised' }, stakeholderMeetings: { value: 2, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '1G / 1T', label: 'Public Procurement', sub: 'GEM/Tender' } },
  hyderabad: { name: 'DFO Hyderabad', zone: 'Telangana Zone', msmeCatered: { value: 20, label: 'MSMEs Attended (Walk Ins)', sub: 'This Month' }, queriesResolved: { value: '1.60', label: '% MSME Queries Resolved', sub: 'This Month', suffix: '%' }, avgTAT: { value: '6.10', label: 'Avg. Turnaround Time (Days)', sub: 'This Month' }, schemeApps: { value: 20, label: 'Scheme Applications Supported', sub: 'This Month' }, conversionRate: { value: '8.00', label: 'Application Conversion Rate', sub: 'This Month', suffix: '%' }, budgetUtilised: { value: '₹23.0 L / ₹48 L', label: 'Budget Utilised (Till July)', sub: '58% Utilised' }, stakeholderMeetings: { value: 5, label: 'Stakeholder Meetings', sub: 'This Month' }, publicProcurement: { value: '3G / 1T', label: 'Public Procurement', sub: 'GEM/Tender' } },
};


// 2. Performance Comparison
const mkC = (msme, q, tat, conv, camps, zM, zQ, zT, zC, zCa) => [
  { label: 'MSMEs Attended (Walk Ins)', dfo: msme, zoneAvg: zM, annualAvg: Math.round((msme + zM) / 2 * 0.9), changeVsZone: Math.round(Math.abs(msme - zM) / zM * 100), changeDir: msme >= zM ? 'up' : 'down', changeLabel: 'vs Zone Avg' },
  { label: '% MSME Queries Resolved', dfo: q, zoneAvg: zQ, annualAvg: parseFloat(((q + zQ) / 2 * 0.9).toFixed(2)), changeVsZone: Math.round(Math.abs(q - zQ) / zQ * 100), changeDir: q >= zQ ? 'up' : 'down', changeLabel: 'vs Zone Avg', suffix: '%' },
  { label: 'Avg. Turnaround Time (Days)', dfo: tat, zoneAvg: zT, annualAvg: parseFloat(((tat + zT) / 2 * 1.05).toFixed(2)), changeVsZone: Math.round(Math.abs(tat - zT) / zT * 100), changeDir: tat <= zT ? 'down' : 'up', changeLabel: tat <= zT ? 'better than Zone Avg' : 'worse than Zone Avg', downIsGood: true },
  { label: 'Application Conversion Rate (%)', dfo: conv, zoneAvg: zC, annualAvg: parseFloat(((conv + zC) / 2 * 0.92).toFixed(2)), changeVsZone: Math.round(Math.abs(conv - zC) / zC * 100), changeDir: conv >= zC ? 'up' : 'down', changeLabel: 'vs Zone Avg', suffix: '%' },
  { label: 'Awareness Campaigns Conducted', dfo: camps, zoneAvg: zCa, annualAvg: Math.round((camps + zCa) / 2 * 0.9), changeVsZone: Math.round(Math.abs(camps - zCa) / zCa * 100), changeDir: camps >= zCa ? 'up' : 'down', changeLabel: 'vs Zone Avg' },
];
export const PERFORMANCE_COMPARISON = {
  hubli: mkC(50, 1.60, 5.75, 8.00, 8, 37, 1.10, 6.40, 6.00, 6),
  bangalore: mkC(25, 0.80, 6.00, 4.00, 4, 37, 1.10, 6.40, 6.00, 6),
  mangalore: mkC(50, 1.60, 7.00, 8.00, 8, 37, 1.10, 6.40, 6.00, 6),
  gulbarga: mkC(25, 0.80, 3.00, 4.00, 4, 37, 1.10, 6.40, 6.00, 6),
  visakhapatnam: mkC(25, 0.80, 4.50, 4.00, 4, 25, 0.80, 4.50, 4.00, 4),
  thrissur: mkC(50, 1.60, 6.00, 8.00, 8, 50, 1.60, 6.00, 8.00, 8),
  lakshadweep: mkC(25, 0.80, 10.0, 4.00, 4, 25, 0.80, 10.0, 4.00, 4),
  chennai: mkC(50, 1.60, 8.00, 8.00, 8, 38, 1.20, 6.50, 6.00, 6),
  coimbatore: mkC(25, 0.80, 4.00, 4.00, 4, 38, 1.20, 6.50, 6.00, 6),
  madurai: mkC(50, 1.60, 5.75, 8.00, 8, 38, 1.20, 6.50, 6.00, 6),
  tirunelveli: mkC(25, 0.80, 6.00, 4.00, 4, 38, 1.20, 6.50, 6.00, 6),
  hyderabad: mkC(20, 1.60, 6.10, 8.00, 8, 20, 1.60, 6.10, 8.00, 8),
};

// 3. Trend Data
export const DFO_TREND_DATA = {
  hubli: [{ month: 'Mar 2025', msmeCatered: 32, queriesResolved: 1.00, conversionRate: 5, avgTAT: 8.20 }, { month: 'Apr 2025', msmeCatered: 41, queriesResolved: 1.30, conversionRate: 6, avgTAT: 6.90 }, { month: 'May 2025', msmeCatered: 50, queriesResolved: 1.60, conversionRate: 8, avgTAT: 5.75 }],
  bangalore: [{ month: 'Mar 2025', msmeCatered: 18, queriesResolved: 0.50, conversionRate: 2, avgTAT: 8.00 }, { month: 'Apr 2025', msmeCatered: 22, queriesResolved: 0.65, conversionRate: 3, avgTAT: 7.20 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 6.00 }],
  mangalore: [{ month: 'Mar 2025', msmeCatered: 30, queriesResolved: 1.00, conversionRate: 5, avgTAT: 9.50 }, { month: 'Apr 2025', msmeCatered: 40, queriesResolved: 1.30, conversionRate: 6, avgTAT: 8.20 }, { month: 'May 2025', msmeCatered: 50, queriesResolved: 1.60, conversionRate: 8, avgTAT: 7.00 }],
  gulbarga: [{ month: 'Mar 2025', msmeCatered: 15, queriesResolved: 0.50, conversionRate: 2, avgTAT: 4.50 }, { month: 'Apr 2025', msmeCatered: 20, queriesResolved: 0.65, conversionRate: 3, avgTAT: 3.80 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 3.00 }],
  visakhapatnam: [{ month: 'Mar 2025', msmeCatered: 15, queriesResolved: 0.50, conversionRate: 2, avgTAT: 6.00 }, { month: 'Apr 2025', msmeCatered: 20, queriesResolved: 0.65, conversionRate: 3, avgTAT: 5.20 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 4.50 }],
  thrissur: [{ month: 'Mar 2025', msmeCatered: 30, queriesResolved: 1.00, conversionRate: 5, avgTAT: 8.00 }, { month: 'Apr 2025', msmeCatered: 40, queriesResolved: 1.30, conversionRate: 6, avgTAT: 7.00 }, { month: 'May 2025', msmeCatered: 50, queriesResolved: 1.60, conversionRate: 8, avgTAT: 6.00 }],
  lakshadweep: [{ month: 'Mar 2025', msmeCatered: 20, queriesResolved: 0.60, conversionRate: 2, avgTAT: 14.0 }, { month: 'Apr 2025', msmeCatered: 22, queriesResolved: 0.70, conversionRate: 3, avgTAT: 12.0 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 10.0 }],
  chennai: [{ month: 'Mar 2025', msmeCatered: 30, queriesResolved: 1.00, conversionRate: 4, avgTAT: 10.5 }, { month: 'Apr 2025', msmeCatered: 40, queriesResolved: 1.30, conversionRate: 6, avgTAT: 9.20 }, { month: 'May 2025', msmeCatered: 50, queriesResolved: 1.60, conversionRate: 8, avgTAT: 8.00 }],
  coimbatore: [{ month: 'Mar 2025', msmeCatered: 14, queriesResolved: 0.50, conversionRate: 2, avgTAT: 6.50 }, { month: 'Apr 2025', msmeCatered: 18, queriesResolved: 0.65, conversionRate: 3, avgTAT: 5.20 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 4.00 }],
  madurai: [{ month: 'Mar 2025', msmeCatered: 28, queriesResolved: 1.00, conversionRate: 5, avgTAT: 8.00 }, { month: 'Apr 2025', msmeCatered: 38, queriesResolved: 1.30, conversionRate: 6, avgTAT: 7.00 }, { month: 'May 2025', msmeCatered: 50, queriesResolved: 1.60, conversionRate: 8, avgTAT: 5.75 }],
  tirunelveli: [{ month: 'Mar 2025', msmeCatered: 12, queriesResolved: 0.50, conversionRate: 2, avgTAT: 8.50 }, { month: 'Apr 2025', msmeCatered: 18, queriesResolved: 0.65, conversionRate: 3, avgTAT: 7.20 }, { month: 'May 2025', msmeCatered: 25, queriesResolved: 0.80, conversionRate: 4, avgTAT: 6.00 }],
  hyderabad: [{ month: 'Mar 2025', msmeCatered: 12, queriesResolved: 1.00, conversionRate: 5, avgTAT: 8.00 }, { month: 'Apr 2025', msmeCatered: 16, queriesResolved: 1.30, conversionRate: 6, avgTAT: 7.00 }, { month: 'May 2025', msmeCatered: 20, queriesResolved: 1.60, conversionRate: 8, avgTAT: 6.10 }],
};

// 4. Zone Rankings
const KA = [
  { rank: 1, name: 'DFO Hubli', msmeCatered: 50, resolution: 1.60, conversion: 8.00, tat: 5.75, score: 87 },
  { rank: 2, name: 'DFO Bangalore', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 6.00, score: 64 },
  { rank: 3, name: 'Branch DFO Mangalore', msmeCatered: 50, resolution: 1.60, conversion: 8.00, tat: 7.00, score: 63 },
  { rank: 4, name: 'Branch DFO Gulbarga', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 3.00, score: 58 },
];
const TN = [
  { rank: 1, name: 'DFO Chennai', msmeCatered: 50, resolution: 1.60, conversion: 8.00, tat: 8.00, score: 79 },
  { rank: 2, name: 'DFO Madurai', msmeCatered: 50, resolution: 1.60, conversion: 8.00, tat: 5.75, score: 74 },
  { rank: 3, name: 'DFO Tirunelveli', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 6.00, score: 68 },
  { rank: 4, name: 'Branch DFO Coimbatore', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 4.00, score: 61 },
];
const hl = (rows, id) => rows.map(r => ({ ...r, isHighlighted: r.name === DFO_DETAIL_KPIS[id]?.name }));
export const ZONE_RANKING = {
  hubli: hl(KA, 'hubli'), bangalore: hl(KA, 'bangalore'), mangalore: hl(KA, 'mangalore'), gulbarga: hl(KA, 'gulbarga'),
  visakhapatnam: [{ rank: 1, name: 'DFO Visakhapatnam', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 4.50, score: 71, isHighlighted: true }],
  thrissur: [{ rank: 1, name: 'DFO Thrissur', msmeCatered: 50, resolution: 1.60, conversion: 8.00, tat: 6.00, score: 82, isHighlighted: true }],
  lakshadweep: [{ rank: 1, name: 'Br. DFO Lakshadweep', msmeCatered: 25, resolution: 0.80, conversion: 4.00, tat: 10.0, score: 45, isHighlighted: true }],
  chennai: hl(TN, 'chennai'), coimbatore: hl(TN, 'coimbatore'), madurai: hl(TN, 'madurai'), tirunelveli: hl(TN, 'tirunelveli'),
  hyderabad: [{ rank: 1, name: 'DFO Hyderabad', msmeCatered: 20, resolution: 1.60, conversion: 8.00, tat: 6.10, score: 76, isHighlighted: true }],
};

// 5. Growth Sectors
export const DFO_GROWTH_SECTORS = {
  hubli: [{ name: 'Engineering', value: 40, color: '#1e3a8a' }, { name: 'Textiles', value: 25, color: '#059669' }, { name: 'Foundry', value: 20, color: '#f97316' }, { name: 'Agriculture Equip.', value: 15, color: '#8b5cf6' }],
  bangalore: [{ name: 'IT & Software', value: 45, color: '#1e3a8a' }, { name: 'Electronics', value: 25, color: '#059669' }, { name: 'Aerospace Parts', value: 20, color: '#f97316' }, { name: 'Textiles', value: 10, color: '#8b5cf6' }],
  mangalore: [{ name: 'Seafood Processing', value: 35, color: '#1e3a8a' }, { name: 'Cashew Exports', value: 30, color: '#059669' }, { name: 'Tiles & Ceramics', value: 20, color: '#f97316' }, { name: 'Coconut Products', value: 15, color: '#8b5cf6' }],
  gulbarga: [{ name: 'Dal & Pulses', value: 40, color: '#1e3a8a' }, { name: 'Cotton Ginning', value: 30, color: '#059669' }, { name: 'Granite Polishing', value: 20, color: '#f97316' }, { name: 'Agri-machinery', value: 10, color: '#8b5cf6' }],
  visakhapatnam: [{ name: 'Aquaculture', value: 38, color: '#1e3a8a' }, { name: 'Pharmaceuticals', value: 28, color: '#059669' }, { name: 'Ship Building Parts', value: 20, color: '#f97316' }, { name: 'IT Services', value: 14, color: '#8b5cf6' }],
  thrissur: [{ name: 'Spices & Exports', value: 35, color: '#1e3a8a' }, { name: 'Handicrafts', value: 28, color: '#059669' }, { name: 'Seafood', value: 22, color: '#f97316' }, { name: 'Tourism Services', value: 15, color: '#8b5cf6' }],
  lakshadweep: [{ name: 'Fishing', value: 50, color: '#1e3a8a' }, { name: 'Coconut Products', value: 25, color: '#059669' }, { name: 'Handicrafts', value: 15, color: '#f97316' }, { name: 'Tourism', value: 10, color: '#8b5cf6' }],
  chennai: [{ name: 'Auto Components', value: 35, color: '#1e3a8a' }, { name: 'Leather Goods', value: 25, color: '#059669' }, { name: 'IT Services', value: 25, color: '#f97316' }, { name: 'Textiles', value: 15, color: '#8b5cf6' }],
  coimbatore: [{ name: 'Textiles & Yarn', value: 45, color: '#1e3a8a' }, { name: 'Pump & Motors', value: 30, color: '#059669' }, { name: 'Wet Grinders', value: 15, color: '#f97316' }, { name: 'Agri-equipment', value: 10, color: '#8b5cf6' }],
  madurai: [{ name: 'Textiles', value: 40, color: '#1e3a8a' }, { name: 'Granite Crafts', value: 25, color: '#059669' }, { name: 'Tourism & Handicrafts', value: 20, color: '#f97316' }, { name: 'Food Processing', value: 15, color: '#8b5cf6' }],
  tirunelveli: [{ name: 'Rice Milling', value: 35, color: '#1e3a8a' }, { name: 'Halwa & Sweets', value: 28, color: '#059669' }, { name: 'Banana Products', value: 22, color: '#f97316' }, { name: 'Wind Energy Parts', value: 15, color: '#8b5cf6' }],
  hyderabad: [{ name: 'Pharmaceuticals', value: 40, color: '#1e3a8a' }, { name: 'IT & Software', value: 30, color: '#059669' }, { name: 'Textiles & Garments', value: 18, color: '#f97316' }, { name: 'Food Processing', value: 12, color: '#8b5cf6' }],
};

// 6. Challenges
export const DFO_CHALLENGES = {
  hubli: [{ label: 'Credit delays / Access to finance', severity: 'high' }, { label: 'Skilled labour shortage', severity: 'medium' }, { label: 'Logistics and transportation cost', severity: 'medium' }],
  bangalore: [{ label: 'High commercial real estate costs', severity: 'high' }, { label: 'Competition from IT firms for talent', severity: 'high' }, { label: 'Complex GST compliance requirements', severity: 'medium' }],
  mangalore: [{ label: 'Monsoon disruptions to supply chain', severity: 'high' }, { label: 'Port congestion affecting exports', severity: 'medium' }, { label: 'Lack of cold-storage infrastructure', severity: 'medium' }],
  gulbarga: [{ label: 'Water scarcity affecting agri-processing', severity: 'high' }, { label: 'Poor road connectivity to markets', severity: 'medium' }, { label: 'Limited access to institutional credit', severity: 'medium' }],
  visakhapatnam: [{ label: 'Cyclone risk & disaster preparedness', severity: 'high' }, { label: 'Skilled manpower for shipyard ancillaries', severity: 'high' }, { label: 'Environmental clearances for industries', severity: 'medium' }],
  thrissur: [{ label: 'Land acquisition for expansion', severity: 'high' }, { label: 'High labour wages vs neighbouring states', severity: 'medium' }, { label: 'Export documentation & compliance burden', severity: 'medium' }],
  lakshadweep: [{ label: 'Remote location — high freight costs', severity: 'high' }, { label: 'Very limited raw material availability', severity: 'high' }, { label: 'Internet connectivity for digital payments', severity: 'medium' }],
  chennai: [{ label: 'Water scarcity for industrial use', severity: 'high' }, { label: 'Rising rental & operational costs', severity: 'medium' }, { label: 'Pollution control board approval delays', severity: 'medium' }],
  coimbatore: [{ label: 'Power tariff increases', severity: 'high' }, { label: 'Shortage of skilled textile workers', severity: 'medium' }, { label: 'Competition from cheaper imports', severity: 'medium' }],
  madurai: [{ label: 'Groundwater depletion in industrial zones', severity: 'high' }, { label: 'Dependence on single textile market', severity: 'medium' }, { label: 'Irregular power supply', severity: 'medium' }],
  tirunelveli: [{ label: 'Market access for specialty food products', severity: 'medium' }, { label: 'Lack of processing & packaging facilities', severity: 'medium' }, { label: 'Awareness of MSME scheme benefits', severity: 'medium' }],
  hyderabad: [{ label: 'Pharma regulatory compliance costs', severity: 'high' }, { label: 'High cost of lab & testing infrastructure', severity: 'medium' }, { label: 'Talent retention in IT sector', severity: 'medium' }],
};

// 7. Performance Scores
export const PERFORMANCE_SCORE = {
  hubli: { score: 87, label: 'Excellent', breakdown: [{ label: 'Service Delivery', score: 90, max: 100 }, { label: 'Scheme Facilitation', score: 85, max: 100 }, { label: 'Outreach & Awareness', score: 82, max: 100 }, { label: 'Reporting & Compliance', score: 91, max: 100 }] },
  bangalore: { score: 64, label: 'Satisfactory', breakdown: [{ label: 'Service Delivery', score: 65, max: 100 }, { label: 'Scheme Facilitation', score: 60, max: 100 }, { label: 'Outreach & Awareness', score: 62, max: 100 }, { label: 'Reporting & Compliance', score: 69, max: 100 }] },
  mangalore: { score: 63, label: 'Satisfactory', breakdown: [{ label: 'Service Delivery', score: 68, max: 100 }, { label: 'Scheme Facilitation', score: 62, max: 100 }, { label: 'Outreach & Awareness', score: 58, max: 100 }, { label: 'Reporting & Compliance', score: 64, max: 100 }] },
  gulbarga: { score: 58, label: 'Average', breakdown: [{ label: 'Service Delivery', score: 55, max: 100 }, { label: 'Scheme Facilitation', score: 60, max: 100 }, { label: 'Outreach & Awareness', score: 55, max: 100 }, { label: 'Reporting & Compliance', score: 62, max: 100 }] },
  visakhapatnam: { score: 71, label: 'Good', breakdown: [{ label: 'Service Delivery', score: 72, max: 100 }, { label: 'Scheme Facilitation', score: 68, max: 100 }, { label: 'Outreach & Awareness', score: 70, max: 100 }, { label: 'Reporting & Compliance', score: 74, max: 100 }] },
  thrissur: { score: 82, label: 'Excellent', breakdown: [{ label: 'Service Delivery', score: 85, max: 100 }, { label: 'Scheme Facilitation', score: 80, max: 100 }, { label: 'Outreach & Awareness', score: 78, max: 100 }, { label: 'Reporting & Compliance', score: 85, max: 100 }] },
  lakshadweep: { score: 45, label: 'Needs Improvement', breakdown: [{ label: 'Service Delivery', score: 45, max: 100 }, { label: 'Scheme Facilitation', score: 42, max: 100 }, { label: 'Outreach & Awareness', score: 48, max: 100 }, { label: 'Reporting & Compliance', score: 45, max: 100 }] },
  chennai: { score: 79, label: 'Good', breakdown: [{ label: 'Service Delivery', score: 80, max: 100 }, { label: 'Scheme Facilitation', score: 78, max: 100 }, { label: 'Outreach & Awareness', score: 75, max: 100 }, { label: 'Reporting & Compliance', score: 83, max: 100 }] },
  coimbatore: { score: 61, label: 'Satisfactory', breakdown: [{ label: 'Service Delivery', score: 62, max: 100 }, { label: 'Scheme Facilitation', score: 58, max: 100 }, { label: 'Outreach & Awareness', score: 60, max: 100 }, { label: 'Reporting & Compliance', score: 64, max: 100 }] },
  madurai: { score: 74, label: 'Good', breakdown: [{ label: 'Service Delivery', score: 75, max: 100 }, { label: 'Scheme Facilitation', score: 72, max: 100 }, { label: 'Outreach & Awareness', score: 70, max: 100 }, { label: 'Reporting & Compliance', score: 79, max: 100 }] },
  tirunelveli: { score: 68, label: 'Good', breakdown: [{ label: 'Service Delivery', score: 70, max: 100 }, { label: 'Scheme Facilitation', score: 65, max: 100 }, { label: 'Outreach & Awareness', score: 66, max: 100 }, { label: 'Reporting & Compliance', score: 71, max: 100 }] },
  hyderabad: { score: 76, label: 'Good', breakdown: [{ label: 'Service Delivery', score: 78, max: 100 }, { label: 'Scheme Facilitation', score: 74, max: 100 }, { label: 'Outreach & Awareness', score: 72, max: 100 }, { label: 'Reporting & Compliance', score: 80, max: 100 }] },
};

// 8. Insights
export const DFO_INSIGHTS = {
  hubli: ['MSME walk-ins increased 22% over 3 months.', 'Query resolution improved from 1.00% to 1.60%.', 'Conversion rate grew from 5% to 8%.', 'Turnaround time reduced 30% — March to May.', 'Above zone average in 4 out of 5 key parameters.'],
  bangalore: ['Walk-ins grew 39% — 18 in March to 25 in May.', 'Query resolution steadily improving; target 1.20% next quarter.', 'TAT reduced from 8.00 to 6.00 days — 25% improvement.', 'Conversion rate doubled from 2% to 4% in 3 months.', 'Campaigns need scaling — currently below zone average.'],
  mangalore: ['Walk-ins surged 67% driven by coastal MSME outreach.', 'Query resolution at zone-best 1.60%.', 'TAT at 7.00 days — above zone average; focus area for Q3.', 'Export-focused MSMEs increasing — scheme awareness is key.', 'Port-adjacent location drives seafood & cashew sector uptake.'],
  gulbarga: ['Walk-ins growing steadily from 15 to 25 over 3 months.', 'TAT at 3.00 days — best in Karnataka Zone.', 'Low query resolution (0.80%) — targeted training recommended.', 'Agri-processing MSMEs are primary beneficiaries.', 'Credit linkage campaigns planned for next quarter.'],
  visakhapatnam: ['Walk-ins grew 67% driven by port-led MSME growth.', 'TAT improved from 6.00 to 4.50 days — 25% reduction.', 'Aquaculture and pharma sectors show highest scheme interest.', 'Cyclone preparedness may disrupt Q3 — contingency planning needed.', '40 MSMEs registered online via digital onboarding initiative.'],
  thrissur: ['Walk-ins maintained at 50 — stable and consistent performer.', 'Resolution and conversion rates both at zone-best levels.', 'Spice & handicraft export MSMEs leading scheme adoption.', 'Strong coordination with Kerala Industrial Development Corporation.', 'Top-ranked DFO in Kerala Zone across all parameters.'],
  lakshadweep: ['Remote geography limits walk-ins but growth trend is positive.', 'TAT at 10 days — logistics bottleneck identified.', 'Fishing sector MSMEs account for 50% of scheme applications.', 'Internet connectivity improvement underway to aid digital outreach.', 'Special remote-area incentive awareness campaign planned for June.'],
  chennai: ['Walk-ins grew 67% on back of auto-component cluster outreach.', 'TAT on track to reach sub-7 days by July.', 'Auto-ancillary and leather goods MSMEs dominate scheme applications.', 'Top-ranked DFO in Tamil Nadu Zone.', 'Digital payment adoption among MSMEs rose to 68% this month.'],
  coimbatore: ['Walk-ins increased from 14 to 25 — strong textile cluster engagement.', 'TAT best in Tamil Nadu Zone at 4.00 days.', 'Textile & yarn MSMEs account for 45% of facilitated applications.', 'Power tariff issue flagged by 62% of walk-in MSMEs.', 'Pump & motor manufacturers showing growing interest in PMEGP.'],
  madurai: ['Walk-ins rose from 28 to 50 — strong response to heritage-sector outreach.', 'TAT at 5.75 days — second best in Tamil Nadu Zone.', 'Granite craft and textile MSMEs are leading scheme beneficiaries.', 'Tourism-linked MSMEs growing post-pandemic.', 'DFO Madurai ranked 2nd in Tamil Nadu Zone overall.'],
  tirunelveli: ['Walk-ins growing; banana and food-processing MSMEs onboarding.', 'Query resolution stable at 0.80% — improvement roadmap in place.', 'Tirunelveli specialty food brands seeking GI-tag support.', 'Wind-energy component MSMEs emerging as high-potential cluster.', 'Rural MSME outreach via panchayat-level camps planned.'],
  hyderabad: ['Walk-ins grew from 12 to 20 in 3 months.', 'Pharma cluster is most active MSME segment in scheme uptake.', 'IT sector MSMEs increasingly interested in credit guarantee schemes.', 'TAT at 6.10 days — targeting sub-5 by Q3.', 'DFO Hyderabad ranked top in Telangana Zone on all parameters.'],
};

// 9. Budget Detail per DFO
export const DFO_BUDGET_DETAIL = {
  visakhapatnam: { annualBudget: 50.0, utilisedTillJuly: 20.5, utilisationPct: 41, balanceBudget: 29.5 },
  hubli: { annualBudget: 55.0, utilisedTillJuly: 30.4, utilisationPct: 55, balanceBudget: 24.6 },
  bangalore: { annualBudget: 48.0, utilisedTillJuly: 26.8, utilisationPct: 56, balanceBudget: 21.2 },
  mangalore: { annualBudget: 55.0, utilisedTillJuly: 20.4, utilisationPct: 48, balanceBudget: 34.6 },
  gulbarga: { annualBudget: 45.0, utilisedTillJuly: 16.0, utilisationPct: 36, balanceBudget: 29.0 },
  thrissur: { annualBudget: 52.0, utilisedTillJuly: 24.0, utilisationPct: 46, balanceBudget: 28.0 },
  lakshadweep: { annualBudget: 35.0, utilisedTillJuly: 10.5, utilisationPct: 30, balanceBudget: 24.5 },
  chennai: { annualBudget: 45.0, utilisedTillJuly: 23.7, utilisationPct: 53, balanceBudget: 21.3 },
  coimbatore: { annualBudget: 52.0, utilisedTillJuly: 23.5, utilisationPct: 45, balanceBudget: 28.5 },
  madurai: { annualBudget: 52.0, utilisedTillJuly: 31.6, utilisationPct: 61, balanceBudget: 20.4 },
  tirunelveli: { annualBudget: 45.0, utilisedTillJuly: 16.2, utilisationPct: 36, balanceBudget: 28.8 },
  hyderabad: { annualBudget: 48.0, utilisedTillJuly: 23.0, utilisationPct: 58, balanceBudget: 25.0 },
};

// 10. Campaign Detail per DFO
export const DFO_CAMPAIGN_DETAIL = {
  visakhapatnam: {
    conducted: 4, totalParticipants: 186,
    campaigns: [
      { name: 'PMEGP Awareness Drive', scheme: 'PMEGP', participants: 48 },
      { name: 'CGTMSE Credit Workshop', scheme: 'CGTMSE', participants: 44 },
      { name: 'ZED Certification Awareness', scheme: 'ZED Certification', participants: 51 },
      { name: 'PM Vishwakarma Orientation', scheme: 'PM Vishwakarma', participants: 43 },
    ],
  },
  hubli: {
    conducted: 8, totalParticipants: 320,
    campaigns: [
      { name: 'PMEGP Cluster Outreach', scheme: 'PMEGP', participants: 85 },
      { name: 'CGTMSE Info Session', scheme: 'CGTMSE', participants: 60 },
      { name: 'ZED Awareness Camp', scheme: 'ZED Certification', participants: 72 },
      { name: 'PM Vishwakarma Workshop', scheme: 'PM Vishwakarma', participants: 55 },
      { name: 'Udyam Registration Drive', scheme: 'PMEGP', participants: 48 },
    ],
  },
  bangalore: { conducted: 4, totalParticipants: 142, campaigns: [{ name: 'PMEGP IT MSME Session', scheme: 'PMEGP', participants: 52 }, { name: 'CGTMSE Awareness', scheme: 'CGTMSE', participants: 40 }, { name: 'ZED Drive', scheme: 'ZED Certification', participants: 28 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 22 }] },
  mangalore: { conducted: 8, totalParticipants: 295, campaigns: [{ name: 'Coastal MSME Outreach', scheme: 'PMEGP', participants: 80 }, { name: 'CGTMSE Workshop', scheme: 'CGTMSE', participants: 72 }, { name: 'ZED Drive', scheme: 'ZED Certification', participants: 68 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 75 }] },
  gulbarga: { conducted: 4, totalParticipants: 130, campaigns: [{ name: 'Agri MSME Session', scheme: 'PMEGP', participants: 45 }, { name: 'CGTMSE Camp', scheme: 'CGTMSE', participants: 35 }, { name: 'ZED Awareness', scheme: 'ZED Certification', participants: 28 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 22 }] },
  thrissur: { conducted: 8, totalParticipants: 310, campaigns: [{ name: 'Spice MSME Drive', scheme: 'PMEGP', participants: 90 }, { name: 'CGTMSE Workshop', scheme: 'CGTMSE', participants: 70 }, { name: 'ZED Drive', scheme: 'ZED Certification', participants: 80 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 70 }] },
  lakshadweep: { conducted: 4, totalParticipants: 105, campaigns: [{ name: 'Island MSME Outreach', scheme: 'PMEGP', participants: 35 }, { name: 'Fishing MSME Drive', scheme: 'CGTMSE', participants: 30 }, { name: 'ZED Awareness', scheme: 'ZED Certification', participants: 22 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 18 }] },
  chennai: { conducted: 8, totalParticipants: 340, campaigns: [{ name: 'Auto MSME Drive', scheme: 'PMEGP', participants: 95 }, { name: 'CGTMSE Workshop', scheme: 'CGTMSE', participants: 85 }, { name: 'ZED Camp', scheme: 'ZED Certification', participants: 80 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 80 }] },
  coimbatore: { conducted: 4, totalParticipants: 162, campaigns: [{ name: 'Textile MSME Camp', scheme: 'PMEGP', participants: 55 }, { name: 'CGTMSE Drive', scheme: 'CGTMSE', participants: 42 }, { name: 'ZED Awareness', scheme: 'ZED Certification', participants: 38 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 27 }] },
  madurai: { conducted: 8, totalParticipants: 298, campaigns: [{ name: 'Granite MSME Outreach', scheme: 'PMEGP', participants: 78 }, { name: 'CGTMSE Session', scheme: 'CGTMSE', participants: 72 }, { name: 'ZED Camp', scheme: 'ZED Certification', participants: 80 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 68 }] },
  tirunelveli: { conducted: 2, totalParticipants: 95, campaigns: [{ name: 'Food MSME Camp', scheme: 'PMEGP', participants: 52 }, { name: 'PM Vishwakarma Awareness', scheme: 'PM Vishwakarma', participants: 43 }] },
  hyderabad: { conducted: 5, totalParticipants: 216, campaigns: [{ name: 'Pharma MSME Drive', scheme: 'PMEGP', participants: 55 }, { name: 'CGTMSE Review', scheme: 'CGTMSE', participants: 48 }, { name: 'ZED Certification', scheme: 'ZED Certification', participants: 40 }, { name: 'PM Vishwakarma', scheme: 'PM Vishwakarma', participants: 38 }, { name: 'IT MSME Session', scheme: 'PMEGP', participants: 35 }] },
};

// 11. Stakeholder Meeting Detail per DFO
// categoryBreakdown: counts per category for donut/bar
// meetings: individual meeting records
export const DFO_STAKEHOLDER_MEETINGS = {
  visakhapatnam: {
    total: 8,
    categoryBreakdown: [
      { category: 'State Government', count: 2, color: '#1e3a8a' },
      { category: 'Industry Associations', count: 3, color: '#059669' },
      { category: 'Banks', count: 2, color: '#f97316' },
      { category: 'Others', count: 1, color: '#8b5cf6' },
    ],
    meetings: [
      { date: '03 Jul 2025', organisation: 'District Industries Centre Visakhapatnam', category: 'State Government', agenda: 'PMEGP Implementation Review' },
      { date: '08 Jul 2025', organisation: 'CII Andhra Pradesh', category: 'Industry Associations', agenda: 'MSME Outreach & Awareness Planning' },
      { date: '12 Jul 2025', organisation: 'SBI Regional Office', category: 'Banks', agenda: 'Credit Facilitation for MSMEs' },
      { date: '18 Jul 2025', organisation: 'NSIC Vendor Development Centre', category: 'Others', agenda: 'Vendor Development Programme' },
      { date: '21 Jul 2025', organisation: 'AP MSME Development Corporation', category: 'State Government', agenda: 'Quarterly Review & Scheme Monitoring' },
      { date: '24 Jul 2025', organisation: 'FAPCCI', category: 'Industry Associations', agenda: 'Export Promotion & Market Linkages' },
      { date: '26 Jul 2025', organisation: 'Canara Bank Vizag Zone', category: 'Banks', agenda: 'CGTMSE Guarantee Scheme Review' },
      { date: '29 Jul 2025', organisation: 'APITCO', category: 'Industry Associations', agenda: 'Technology Upgradation Support' },
    ],
  },
  hubli: {
    total: 8,
    categoryBreakdown: [
      { category: 'State Government', count: 2, color: '#1e3a8a' },
      { category: 'Industry Associations', count: 3, color: '#059669' },
      { category: 'Banks', count: 2, color: '#f97316' },
      { category: 'Others', count: 1, color: '#8b5cf6' },
    ],
    meetings: [
      { date: '02 Jul 2025', organisation: 'DIC Hubli-Dharwad', category: 'State Government', agenda: 'PMEGP Beneficiary Review' },
      { date: '07 Jul 2025', organisation: 'FKCCI Hubli Chapter', category: 'Industry Associations', agenda: 'MSME Cluster Development' },
      { date: '11 Jul 2025', organisation: 'SBI Hubli Circle', category: 'Banks', agenda: 'CGTMSE Sanction Review' },
      { date: '16 Jul 2025', organisation: 'Karnataka MSME Corporation', category: 'State Government', agenda: 'Scheme Monitoring' },
      { date: '19 Jul 2025', organisation: 'KASSIA', category: 'Industry Associations', agenda: 'ZED Certification Drive' },
      { date: '22 Jul 2025', organisation: 'Bank of Baroda', category: 'Banks', agenda: 'Credit Linkage for Weavers' },
      { date: '25 Jul 2025', organisation: 'Engineering Industries Assoc.', category: 'Industry Associations', agenda: 'Export Market Linkages' },
      { date: '28 Jul 2025', organisation: 'KVIC Hubli', category: 'Others', agenda: 'Khadi & Village Industries Outreach' },
    ],
  },
  bangalore: { total: 4, categoryBreakdown: [{ category: 'State Government', count: 1, color: '#1e3a8a' }, { category: 'Industry Associations', count: 2, color: '#059669' }, { category: 'Banks', count: 1, color: '#f97316' }], meetings: [{ date: '05 Jul 2025', organisation: 'DIC Bengaluru', category: 'State Government', agenda: 'PMEGP Review' }, { date: '10 Jul 2025', organisation: 'NASSCOM', category: 'Industry Associations', agenda: 'IT MSME Scheme Awareness' }, { date: '17 Jul 2025', organisation: 'HDFC Bank Bangalore', category: 'Banks', agenda: 'Credit Facilitation' }, { date: '24 Jul 2025', organisation: 'CII Karnataka', category: 'Industry Associations', agenda: 'ZED Drive' }] },
  mangalore: { total: 8, categoryBreakdown: [{ category: 'State Government', count: 2, color: '#1e3a8a' }, { category: 'Industry Associations', count: 3, color: '#059669' }, { category: 'Banks', count: 2, color: '#f97316' }, { category: 'Others', count: 1, color: '#8b5cf6' }], meetings: [{ date: '03 Jul 2025', organisation: 'DIC Dakshina Kannada', category: 'State Government', agenda: 'PMEGP Review' }, { date: '08 Jul 2025', organisation: 'Cashew Export Promotion Council', category: 'Industry Associations', agenda: 'Export Facilitation' }, { date: '12 Jul 2025', organisation: 'Canara Bank Mangalore', category: 'Banks', agenda: 'CGTMSE Review' }, { date: '16 Jul 2025', organisation: 'Port Authority Mangalore', category: 'Others', agenda: 'Logistics & Export Linkages' }, { date: '20 Jul 2025', organisation: 'Karnataka MSME Dept', category: 'State Government', agenda: 'ZED Scheme Camp' }, { date: '23 Jul 2025', organisation: 'KASSIA Coastal Chapter', category: 'Industry Associations', agenda: 'Cluster Development' }, { date: '25 Jul 2025', organisation: 'SBI Mangalore', category: 'Banks', agenda: 'Credit Review' }, { date: '28 Jul 2025', organisation: 'Tiles & Ceramics Assoc.', category: 'Industry Associations', agenda: 'PM Vishwakarma Awareness' }] },
  gulbarga: { total: 3, categoryBreakdown: [{ category: 'State Government', count: 1, color: '#1e3a8a' }, { category: 'Industry Associations', count: 1, color: '#059669' }, { category: 'Banks', count: 1, color: '#f97316' }], meetings: [{ date: '05 Jul 2025', organisation: 'DIC Kalaburagi', category: 'State Government', agenda: 'PMEGP Review' }, { date: '14 Jul 2025', organisation: 'Dal Mills Association', category: 'Industry Associations', agenda: 'PMEGP Scheme Awareness' }, { date: '22 Jul 2025', organisation: 'SBI Gulbarga', category: 'Banks', agenda: 'CGTMSE Loan Facilitation' }] },
  thrissur: { total: 7, categoryBreakdown: [{ category: 'State Government', count: 2, color: '#1e3a8a' }, { category: 'Industry Associations', count: 3, color: '#059669' }, { category: 'Banks', count: 2, color: '#f97316' }], meetings: [{ date: '04 Jul 2025', organisation: 'Kerala MSME Dept Thrissur', category: 'State Government', agenda: 'Scheme Review' }, { date: '09 Jul 2025', organisation: 'FICCI Kerala', category: 'Industry Associations', agenda: 'MSME Cluster Drive' }, { date: '14 Jul 2025', organisation: 'South Indian Bank', category: 'Banks', agenda: 'Credit Facilitation' }, { date: '18 Jul 2025', organisation: 'Spice Board of India', category: 'Industry Associations', agenda: 'Export Promotion' }, { date: '21 Jul 2025', organisation: 'Kerala Industrial Dev. Corp', category: 'State Government', agenda: 'ZED Certification' }, { date: '24 Jul 2025', organisation: 'Federal Bank', category: 'Banks', agenda: 'CGTMSE Camp' }, { date: '27 Jul 2025', organisation: 'Handicrafts Dev. Corp', category: 'Industry Associations', agenda: 'PM Vishwakarma Drive' }] },
  lakshadweep: { total: 4, categoryBreakdown: [{ category: 'State Government', count: 1, color: '#1e3a8a' }, { category: 'Industry Associations', count: 1, color: '#059669' }, { category: 'Banks', count: 1, color: '#f97316' }, { category: 'Others', count: 1, color: '#8b5cf6' }], meetings: [{ date: '05 Jul 2025', organisation: 'UT Administration Lakshadweep', category: 'State Government', agenda: 'PMEGP Island Scheme' }, { date: '12 Jul 2025', organisation: 'Fishermen Cooperative', category: 'Industry Associations', agenda: 'MSME Scheme Awareness' }, { date: '19 Jul 2025', organisation: 'SBI Kavaratti', category: 'Banks', agenda: 'Credit Linkage' }, { date: '26 Jul 2025', organisation: 'Tourism Dept UT', category: 'Others', agenda: 'Tourism MSME Development' }] },
  chennai: { total: 8, categoryBreakdown: [{ category: 'State Government', count: 2, color: '#1e3a8a' }, { category: 'Industry Associations', count: 3, color: '#059669' }, { category: 'Banks', count: 2, color: '#f97316' }, { category: 'Others', count: 1, color: '#8b5cf6' }], meetings: [{ date: '03 Jul 2025', organisation: 'TIDCO Chennai', category: 'State Government', agenda: 'PMEGP Auto Cluster Review' }, { date: '08 Jul 2025', organisation: 'SIAM Tamil Nadu', category: 'Industry Associations', agenda: 'Auto Component MSME Drive' }, { date: '12 Jul 2025', organisation: 'IOB Chennai', category: 'Banks', agenda: 'CGTMSE Facilitation' }, { date: '16 Jul 2025', organisation: 'Leather Goods Manufacturers Assoc', category: 'Industry Associations', agenda: 'PM Vishwakarma' }, { date: '19 Jul 2025', organisation: 'TIDEL Park', category: 'Others', agenda: 'IT MSME Awareness' }, { date: '22 Jul 2025', organisation: 'TNSCB', category: 'State Government', agenda: 'ZED Scheme Review' }, { date: '25 Jul 2025', organisation: 'Canara Bank TN Circle', category: 'Banks', agenda: 'Loan Camp' }, { date: '28 Jul 2025', organisation: 'CODISSIA', category: 'Industry Associations', agenda: 'Cluster Awareness' }] },
  coimbatore: { total: 4, categoryBreakdown: [{ category: 'State Government', count: 1, color: '#1e3a8a' }, { category: 'Industry Associations', count: 2, color: '#059669' }, { category: 'Banks', count: 1, color: '#f97316' }], meetings: [{ date: '04 Jul 2025', organisation: 'DIC Coimbatore', category: 'State Government', agenda: 'PMEGP Review' }, { date: '11 Jul 2025', organisation: 'CODISSIA', category: 'Industry Associations', agenda: 'Textile MSME Camp' }, { date: '18 Jul 2025', organisation: 'Indian Bank Coimbatore', category: 'Banks', agenda: 'Credit Facilitation' }, { date: '25 Jul 2025', organisation: 'Pump Manufacturers Assoc.', category: 'Industry Associations', agenda: 'ZED Awareness' }] },
  madurai: { total: 7, categoryBreakdown: [{ category: 'State Government', count: 2, color: '#1e3a8a' }, { category: 'Industry Associations', count: 3, color: '#059669' }, { category: 'Banks', count: 2, color: '#f97316' }], meetings: [{ date: '03 Jul 2025', organisation: 'DIC Madurai', category: 'State Government', agenda: 'PMEGP Review' }, { date: '08 Jul 2025', organisation: 'Textile Merchants Assoc.', category: 'Industry Associations', agenda: 'PM Vishwakarma Drive' }, { date: '13 Jul 2025', organisation: 'Canara Bank Madurai', category: 'Banks', agenda: 'CGTMSE Review' }, { date: '17 Jul 2025', organisation: 'Granite Craft Assoc.', category: 'Industry Associations', agenda: 'ZED Certification' }, { date: '21 Jul 2025', organisation: 'TNSCB Madurai', category: 'State Government', agenda: 'Scheme Monitoring' }, { date: '24 Jul 2025', organisation: 'Indian Overseas Bank', category: 'Banks', agenda: 'Loan Camp' }, { date: '28 Jul 2025', organisation: 'Tourism Trade Assoc.', category: 'Industry Associations', agenda: 'Tourism MSME Awareness' }] },
  tirunelveli: { total: 2, categoryBreakdown: [{ category: 'Banks', count: 1, color: '#f97316' }, { category: 'Industry Associations', count: 1, color: '#059669' }], meetings: [{ date: '18 Jul 2026', organisation: 'SBI Tirunelveli', category: 'Banks', agenda: 'MSME Finance' }, { date: '27 Jul 2026', organisation: 'Tirunelveli Chamber', category: 'Industry Associations', agenda: 'Awareness Planning' }] },
  hyderabad: { total: 5, categoryBreakdown: [{ category: 'State Government', count: 1, color: '#1e3a8a' }, { category: 'Industry Associations', count: 2, color: '#059669' }, { category: 'Banks', count: 1, color: '#f97316' }, { category: 'Others', count: 1, color: '#8b5cf6' }], meetings: [{ date: '04 Jul 2026', organisation: 'FTCCI Hyderabad', category: 'Industry Associations', agenda: 'MSME Ecosystem' }, { date: '08 Jul 2026', organisation: 'SBI Hyderabad Circle', category: 'Banks', agenda: 'CGTMSE Review' }, { date: '15 Jul 2026', organisation: 'DIC Hyderabad', category: 'State Government', agenda: 'PMEGP Implementation' }, { date: '22 Jul 2026', organisation: 'T-Hub', category: 'Others', agenda: 'Startup MSMEs' }, { date: '29 Jul 2026', organisation: 'Hyderabad Management Association', category: 'Industry Associations', agenda: 'Entrepreneurship' }] },
};
