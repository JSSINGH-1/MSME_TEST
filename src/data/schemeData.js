/**
 * SCHEME PERFORMANCE DATA
 *
 * ─────────────────────────────────────────────────────────────
 * PLUG-AND-PLAY PATTERN
 * ─────────────────────────────────────────────────────────────
 * All data is accessed through GETTER FUNCTIONS, not raw exports.
 * This means swapping to a real API only requires changing the
 * getter body — every component stays untouched.
 *
 * DUMMY (now):
 *   const kpis = getNationalKPIs('pmegp', 'May 2025');
 *
 * REAL API (later — only change is inside the getter):
 *   export async function getNationalKPIs(schemeId, month) {
 *     const res = await fetch(`/api/schemes/${schemeId}/kpis?month=${month}`);
 *     return res.json();
 *   }
 */


// SCHEMES LIST
// TODO: GET /api/schemes

export const SCHEMES = [
  { id: 'pmegp',  label: 'PMEGP (Prime Minister\'s Employment Generation Programme)' },
  { id: 'mudra',  label: 'MUDRA (Micro Units Development & Refinance Agency)' },
  { id: 'sfurti', label: 'SFURTI (Scheme of Fund for Regeneration of Traditional Industries)' },
];


// SCHEME META
// TODO: GET /api/schemes/:id

export const SCHEME_META = {
  pmegp: {
    description: 'PMEGP aims to generate self-employment opportunities in rural and urban areas by assisting new micro-enterprises through financial support and skill development.',
    owner: 'KVIC', ownerFull: 'Khadi and Village Industries Commission',
  },
  mudra: {
    description: 'MUDRA provides refinance support to banks and MFIs for lending to micro and small enterprises across manufacturing, trading, and service sectors.',
    owner: 'MUDRA Ltd.', ownerFull: 'Micro Units Development & Refinance Agency Ltd.',
  },
  sfurti: {
    description: 'SFURTI organises rural artisans into clusters to make them competitive and provides common facility centres, training, and market linkages.',
    owner: 'KVIC', ownerFull: 'Khadi and Village Industries Commission',
  },
};


// NATIONAL KPIs — keyed by schemeId → month
// TODO: GET /api/schemes/:id/kpis?month=YYYY-MM

const _NATIONAL_KPIS = {
  pmegp: {
    'January 2025':  { totalApplications:{value:9820,change:8.1,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:6180,change:7.2,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'241.30',change:9.4,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:18940,change:8.8,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'62.93',change:0.6,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'36.2',change:1.1,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'February 2025': { totalApplications:{value:10240,change:4.3,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:6520,change:5.5,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'256.80',change:6.4,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:19870,change:4.9,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'63.67',change:0.7,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'35.1',change:3.0,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'March 2025':    { totalApplications:{value:10250,change:0.1,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:6680,change:2.5,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'260.50',change:1.4,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:20150,change:1.4,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'65.17',change:1.5,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'33.8',change:3.7,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'April 2025':    { totalApplications:{value:10870,change:6.0,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:7050,change:5.5,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'261.10',change:0.2,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:21490,change:6.6,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'64.85',change:0.3,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'33.5',change:0.9,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'May 2025':      { totalApplications:{value:12850,change:18.2,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:8240,change:16.9,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'320.45',change:22.7,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:25680,change:19.5,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'64.10',change:0.8,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'31.5',change:6.0,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'December 2024': { totalApplications:{value:8940,change:3.2,direction:'down',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:5540,change:2.8,direction:'down',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'218.60',change:2.1,direction:'down',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:17240,change:2.9,direction:'down',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'61.97',change:0.8,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'37.9',change:2.4,direction:'up',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'November 2024': { totalApplications:{value:9220,change:6.4,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:5710,change:5.8,direction:'up',label:'Applications Approved',sub:'This Month'}, marginMoneySanctioned:{value:'225.40',change:3.1,direction:'up',label:'Margin Money Sanctioned',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:17750,change:4.2,direction:'up',label:'Employment Proposed',sub:'This Month'}, approvalRate:{value:'61.93',change:0.3,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'38.1',change:0.5,direction:'up',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
  },
  mudra: {
    'January 2025':  { totalApplications:{value:31200,change:5.4,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:28100,change:4.9,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'1840.20',change:6.1,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:42300,change:5.8,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.06',change:0.4,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'12.4',change:2.2,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'February 2025': { totalApplications:{value:32800,change:5.1,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:29600,change:5.3,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'1920.50',change:4.4,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:44100,change:4.3,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.24',change:0.2,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'12.1',change:2.4,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'March 2025':    { totalApplications:{value:35400,change:7.9,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:31900,change:7.8,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'2080.30',change:8.3,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:47200,change:7.0,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.11',change:0.1,direction:'down',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'11.8',change:2.5,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'April 2025':    { totalApplications:{value:36100,change:2.0,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:32600,change:2.2,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'2130.80',change:2.4,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:48100,change:1.9,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.30',change:0.2,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'11.5',change:2.5,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'May 2025':      { totalApplications:{value:39200,change:8.6,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:35500,change:8.9,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'2310.40',change:8.5,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:52400,change:9.0,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.56',change:0.3,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'11.1',change:3.5,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'December 2024': { totalApplications:{value:29400,change:2.1,direction:'down',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:26500,change:1.8,direction:'down',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'1740.60',change:1.5,direction:'down',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:40100,change:2.3,direction:'down',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.14',change:0.2,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'13.1',change:3.8,direction:'up',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'November 2024': { totalApplications:{value:30020,change:3.8,direction:'up',label:'Total Applications',sub:'This Month'}, applicationsApproved:{value:27100,change:3.6,direction:'up',label:'Loans Sanctioned',sub:'This Month'}, marginMoneySanctioned:{value:'1780.90',change:4.2,direction:'up',label:'Amount Disbursed',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:41000,change:3.5,direction:'up',label:'Beneficiaries Supported',sub:'This Month'}, approvalRate:{value:'90.27',change:0.1,direction:'up',label:'Sanction Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'12.8',change:1.2,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
  },
  sfurti: {
    'January 2025':  { totalApplications:{value:420,change:5.0,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:310,change:4.7,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'48.20',change:6.2,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:6200,change:5.1,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'73.81',change:0.9,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'44.1',change:1.8,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'February 2025': { totalApplications:{value:440,change:4.8,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:328,change:5.8,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'51.40',change:6.6,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:6540,change:5.5,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'74.55',change:0.7,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'43.2',change:2.0,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'March 2025':    { totalApplications:{value:468,change:6.4,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:348,change:6.1,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'54.80',change:6.6,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:6950,change:6.3,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'74.36',change:0.2,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'42.5',change:1.6,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'April 2025':    { totalApplications:{value:482,change:3.0,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:361,change:3.7,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'56.60',change:3.3,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:7180,change:3.3,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'74.90',change:0.5,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'41.8',change:1.6,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'May 2025':      { totalApplications:{value:510,change:5.8,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:384,change:6.4,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'61.20',change:8.1,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:7620,change:6.1,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'75.29',change:0.4,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'40.3',change:3.6,direction:'down',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'December 2024': { totalApplications:{value:390,change:2.6,direction:'down',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:284,change:3.1,direction:'down',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'44.10',change:2.4,direction:'down',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:5780,change:2.9,direction:'down',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'72.82',change:0.8,direction:'down',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'46.2',change:2.1,direction:'up',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
    'November 2024': { totalApplications:{value:400,change:3.6,direction:'up',label:'Total Cluster Applications',sub:'This Month'}, applicationsApproved:{value:293,change:3.9,direction:'up',label:'Clusters Approved',sub:'This Month'}, marginMoneySanctioned:{value:'45.80',change:3.9,direction:'up',label:'Grant Amount Released',sub:'This Month',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:5950,change:2.9,direction:'up',label:'Artisans Covered',sub:'This Month'}, approvalRate:{value:'73.25',change:0.4,direction:'up',label:'Approval Rate',sub:'This Month',suffix:'%',note:'pp'}, avgProcessingTime:{value:'46.8',change:0.9,direction:'up',label:'Avg. Processing Time',sub:'This Month',suffix:' Days',downIsGood:true} },
  },
};


// ANNUAL KPIs — FY totals keyed by schemeId → year
// TODO: GET /api/schemes/:id/annual-kpis?year=YYYY

const _ANNUAL_KPIS = {
  pmegp: {
    '2025': { totalApplications:{value:118640,change:14.2,direction:'up',label:'Total Applications',sub:'FY 2024-25'}, applicationsApproved:{value:76180,change:13.8,direction:'up',label:'Applications Approved',sub:'FY 2024-25'}, marginMoneySanctioned:{value:'2840.50',change:15.4,direction:'up',label:'Margin Money Sanctioned',sub:'FY 2024-25',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:228400,change:14.9,direction:'up',label:'Employment Proposed',sub:'FY 2024-25'}, approvalRate:{value:'64.22',change:1.8,direction:'up',label:'Approval Rate',sub:'FY 2024-25',suffix:'%',note:'pp'}, avgProcessingTime:{value:'34.2',change:4.1,direction:'down',label:'Avg. Processing Time',sub:'FY 2024-25',suffix:' Days',downIsGood:true} },
    '2026': { totalApplications:{value:88560,change:22.4,direction:'up',label:'Total Applications',sub:'FY 2025-26 (YTD)'}, applicationsApproved:{value:58240,change:21.8,direction:'up',label:'Applications Approved',sub:'FY 2025-26 (YTD)'}, marginMoneySanctioned:{value:'2204.20',change:23.1,direction:'up',label:'Margin Money Sanctioned',sub:'FY 2025-26 (YTD)',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:175800,change:22.6,direction:'up',label:'Employment Proposed',sub:'FY 2025-26 (YTD)'}, approvalRate:{value:'65.77',change:1.5,direction:'up',label:'Approval Rate',sub:'FY 2025-26 (YTD)',suffix:'%',note:'pp'}, avgProcessingTime:{value:'31.8',change:7.0,direction:'down',label:'Avg. Processing Time',sub:'FY 2025-26 (YTD)',suffix:' Days',downIsGood:true} },
  },
  mudra: {
    '2025': { totalApplications:{value:394240,change:8.6,direction:'up',label:'Total Applications',sub:'FY 2024-25'}, applicationsApproved:{value:356800,change:8.4,direction:'up',label:'Loans Sanctioned',sub:'FY 2024-25'}, marginMoneySanctioned:{value:'23218.40',change:9.1,direction:'up',label:'Amount Disbursed',sub:'FY 2024-25',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:524800,change:8.8,direction:'up',label:'Beneficiaries Supported',sub:'FY 2024-25'}, approvalRate:{value:'90.50',change:0.6,direction:'up',label:'Sanction Rate',sub:'FY 2024-25',suffix:'%',note:'pp'}, avgProcessingTime:{value:'12.6',change:3.8,direction:'down',label:'Avg. Processing Time',sub:'FY 2024-25',suffix:' Days',downIsGood:true} },
    '2026': { totalApplications:{value:220360,change:16.2,direction:'up',label:'Total Applications',sub:'FY 2025-26 (YTD)'}, applicationsApproved:{value:200880,change:15.9,direction:'up',label:'Loans Sanctioned',sub:'FY 2025-26 (YTD)'}, marginMoneySanctioned:{value:'13013.00',change:17.4,direction:'up',label:'Amount Disbursed',sub:'FY 2025-26 (YTD)',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:295400,change:16.0,direction:'up',label:'Beneficiaries Supported',sub:'FY 2025-26 (YTD)'}, approvalRate:{value:'91.16',change:0.7,direction:'up',label:'Sanction Rate',sub:'FY 2025-26 (YTD)',suffix:'%',note:'pp'}, avgProcessingTime:{value:'11.8',change:6.3,direction:'down',label:'Avg. Processing Time',sub:'FY 2025-26 (YTD)',suffix:' Days',downIsGood:true} },
  },
  sfurti: {
    '2025': { totalApplications:{value:5100,change:6.8,direction:'up',label:'Total Cluster Applications',sub:'FY 2024-25'}, applicationsApproved:{value:3802,change:6.5,direction:'up',label:'Clusters Approved',sub:'FY 2024-25'}, marginMoneySanctioned:{value:'561.20',change:7.2,direction:'up',label:'Grant Amount Released',sub:'FY 2024-25',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:75400,change:6.9,direction:'up',label:'Artisans Covered',sub:'FY 2024-25'}, approvalRate:{value:'74.55',change:1.2,direction:'up',label:'Approval Rate',sub:'FY 2024-25',suffix:'%',note:'pp'}, avgProcessingTime:{value:'43.0',change:2.6,direction:'down',label:'Avg. Processing Time',sub:'FY 2024-25',suffix:' Days',downIsGood:true} },
    '2026': { totalApplications:{value:2871,change:18.6,direction:'up',label:'Total Cluster Applications',sub:'FY 2025-26 (YTD)'}, applicationsApproved:{value:2188,change:18.2,direction:'up',label:'Clusters Approved',sub:'FY 2025-26 (YTD)'}, marginMoneySanctioned:{value:'344.50',change:20.1,direction:'up',label:'Grant Amount Released',sub:'FY 2025-26 (YTD)',prefix:'₹',suffix:' Cr'}, employmentProposed:{value:45940,change:18.8,direction:'up',label:'Artisans Covered',sub:'FY 2025-26 (YTD)'}, approvalRate:{value:'76.21',change:1.7,direction:'up',label:'Approval Rate',sub:'FY 2025-26 (YTD)',suffix:'%',note:'pp'}, avgProcessingTime:{value:'40.8',change:5.1,direction:'down',label:'Avg. Processing Time',sub:'FY 2025-26 (YTD)',suffix:' Days',downIsGood:true} },
  },
};

/** TODO: GET /api/schemes/:id/annual-kpis?year=YYYY */
export function getAnnualKPIs(schemeId, year) {
  return _ANNUAL_KPIS[schemeId]?.[year] ?? _ANNUAL_KPIS.pmegp['2026'];
}

// Annual trend — full-FY bar chart data
const _ANNUAL_TREND = {
  pmegp: [
    { year:'FY 22-23', applications:89200, approvalRate:61.4, sanctioned:2142.0, employment:172600 },
    { year:'FY 23-24', applications:103800, approvalRate:62.5, sanctioned:2468.4, employment:198800 },
    { year:'FY 24-25', applications:118640, approvalRate:64.2, sanctioned:2840.5, employment:228400 },
    { year:'FY 25-26 (YTD)', applications:88560, approvalRate:65.8, sanctioned:2204.2, employment:175800 },
  ],
  mudra: [
    { year:'FY 22-23', applications:328400, approvalRate:88.2, sanctioned:19240.0, employment:440000 },
    { year:'FY 23-24', applications:362800, approvalRate:89.4, sanctioned:21320.0, employment:482400 },
    { year:'FY 24-25', applications:394240, approvalRate:90.5, sanctioned:23218.4, employment:524800 },
    { year:'FY 25-26 (YTD)', applications:220360, approvalRate:91.2, sanctioned:13013.0, employment:295400 },
  ],
  sfurti: [
    { year:'FY 22-23', applications:4180, approvalRate:72.0, sanctioned:452.0, employment:62400 },
    { year:'FY 23-24', applications:4762, approvalRate:73.2, sanctioned:510.8, employment:70800 },
    { year:'FY 24-25', applications:5100, approvalRate:74.6, sanctioned:561.2, employment:75400 },
    { year:'FY 25-26 (YTD)', applications:2871, approvalRate:76.2, sanctioned:344.5, employment:45940 },
  ],
};

/** TODO: GET /api/schemes/:id/annual-trend */
export function getAnnualTrend(schemeId) {
  return _ANNUAL_TREND[schemeId] ?? _ANNUAL_TREND.pmegp;
}

/**
 * TODO: Replace body with → fetch(`/api/schemes/${schemeId}/kpis?month=${month}`)
 */
// export function getNationalKPIs(schemeId, month) {
//   return _NATIONAL_KPIS[schemeId]?.[month] ?? _NATIONAL_KPIS.pmegp['May 2025'];
// }

export const getPreviousMonth = (monthStr) => {
  const date = new Date(monthStr);

  date.setMonth(date.getMonth() - 1);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export function getNationalKPIs(schemeId, month) {
  // Try exact match first
  let data = _NATIONAL_KPIS[schemeId]?.[month];
  // 2026 months: scale up from May 2025 baseline using growth factor
  if (!data && month?.includes('2026')) {
    const base2025 = _NATIONAL_KPIS[schemeId]?.['May 2025'] ?? _NATIONAL_KPIS.pmegp['May 2025'];
    const growthFactor = { 'March 2026':1.04,'April 2026':1.08,'May 2026':1.12,'June 2026':1.16,'July 2026':1.20 }[month] ?? 1.10;
    data = Object.fromEntries(Object.entries(base2025).map(([k, v]) => {
      const scaled = typeof v.value === 'number'
        ? Math.round(v.value * growthFactor)
        : typeof v.value === 'string' && !isNaN(parseFloat(v.value))
          ? (parseFloat(v.value) * (k === 'avgProcessingTime' ? (1/growthFactor) : growthFactor)).toFixed(1)
          : v.value;
      return [k, { ...v, value: scaled, change: parseFloat((growthFactor * 5).toFixed(1)), direction: k === 'avgProcessingTime' ? 'down' : 'up' }];
    }));
  }
  if (!data) data = _NATIONAL_KPIS.pmegp['May 2025'];

  const prevMonth = getPreviousMonth(month);
  const currentMonth = new Date().toLocaleString("en-IN", {month:"long", year:"numeric"});

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      {
        ...value,
        sub: month === currentMonth ? 'This Month' : month,
        comparisonMonth: prevMonth,
      },
    ])

  );
}


// STATE PERFORMANCE — keyed by schemeId → month
// TODO: GET /api/schemes/:id/state-performance?month=YYYY-MM

const _applyVariance = (base, pct) => ({
  ...base,
  applications: Math.round(base.applications * pct),
  approved:     Math.round(base.approved     * pct),
  sanctioned:   parseFloat((base.sanctioned  * pct).toFixed(2)),
  employment:   Math.round(base.employment   * pct),
  approvalRate: parseFloat(Math.min(base.approvalRate + (Math.random() - 0.5) * 2, 99).toFixed(1)),
});

const _BASE_STATE = {
  pmegp: [
    { state:'Uttar Pradesh',  applications:1850, approved:1250, approvalRate:67.6, sanctioned:45.60, employment:3720 },
    { state:'Maharashtra',    applications:1620, approved:1020, approvalRate:63.0, sanctioned:38.20, employment:3150 },
    { state:'Karnataka',      applications:1350, approved:920,  approvalRate:68.1, sanctioned:35.45, employment:2890 },
    { state:'Tamil Nadu',     applications:1280, approved:820,  approvalRate:64.1, sanctioned:28.70, employment:2420 },
    { state:'Rajasthan',      applications:950,  approved:600,  approvalRate:63.2, sanctioned:20.15, employment:1750 },
    { state:'West Bengal',    applications:880,  approved:540,  approvalRate:61.4, sanctioned:18.30, employment:1620 },
    { state:'Madhya Pradesh', applications:760,  approved:460,  approvalRate:60.5, sanctioned:15.80, employment:1380 },
    { state:'Gujarat',        applications:720,  approved:430,  approvalRate:59.7, sanctioned:13.60, employment:1250 },
  ],
  mudra: [
    { state:'Uttar Pradesh',  applications:7420, approved:6780, approvalRate:91.4, sanctioned:182.40, employment:9840 },
    { state:'Maharashtra',    applications:6180, approved:5620, approvalRate:90.9, sanctioned:158.20, employment:8410 },
    { state:'Karnataka',      applications:4950, approved:4480, approvalRate:90.5, sanctioned:124.60, employment:6720 },
    { state:'Tamil Nadu',     applications:4820, approved:4360, approvalRate:90.5, sanctioned:119.80, employment:6580 },
    { state:'Rajasthan',      applications:3940, approved:3540, approvalRate:89.8, sanctioned:98.40,  employment:5380 },
    { state:'West Bengal',    applications:3680, approved:3290, approvalRate:89.4, sanctioned:91.20,  employment:5020 },
    { state:'Madhya Pradesh', applications:3120, approved:2780, approvalRate:89.1, sanctioned:77.80,  employment:4260 },
    { state:'Gujarat',        applications:2980, approved:2660, approvalRate:89.3, sanctioned:74.20,  employment:4080 },
  ],
  sfurti: [
    { state:'Uttar Pradesh',  applications:82,  approved:64, approvalRate:78.0, sanctioned:9.80,  employment:1240 },
    { state:'Maharashtra',    applications:74,  approved:57, approvalRate:77.0, sanctioned:8.60,  employment:1140 },
    { state:'Karnataka',      applications:61,  approved:46, approvalRate:75.4, sanctioned:6.90,  employment:920  },
    { state:'Tamil Nadu',     applications:58,  approved:43, approvalRate:74.1, sanctioned:6.40,  employment:870  },
    { state:'Rajasthan',      applications:48,  approved:35, approvalRate:72.9, sanctioned:5.20,  employment:700  },
    { state:'West Bengal',    applications:44,  approved:32, approvalRate:72.7, sanctioned:4.80,  employment:640  },
    { state:'Madhya Pradesh', applications:38,  approved:27, approvalRate:71.1, sanctioned:4.10,  employment:540  },
    { state:'Gujarat',        applications:35,  approved:25, approvalRate:71.4, sanctioned:3.80,  employment:500  },
  ],
};

// Month multipliers — simulate growth/dip trends across months
const _STATE_MULTIPLIERS = {
  'November 2024': 0.76, 'December 2024': 0.74,
  'January 2025':  0.80, 'February 2025': 0.84,
  'March 2025':    0.88, 'April 2025':    0.92, 'May 2025': 1.00,
  'March 2026':    1.04, 'April 2026':    1.08,
  'May 2026':      1.12, 'June 2026':     1.16, 'July 2026': 1.20,
};

/**
 * TODO: Replace body with → fetch(`/api/schemes/${schemeId}/state-performance?month=${month}`)
 */
export function getStatePerformance(schemeId, month) {
  const base = _BASE_STATE[schemeId] ?? _BASE_STATE.pmegp;
  const mult = _STATE_MULTIPLIERS[month] ?? 1.0;
  return base.map(s => _applyVariance(s, mult));
}


// TOP / BOTTOM DFOs — keyed by schemeId → month
// TODO: GET /api/schemes/:id/top-dfos?month=YYYY-MM&order=desc&limit=5
// TODO: GET /api/schemes/:id/top-dfos?month=YYYY-MM&order=asc&limit=5

const _TOP_DFOS_BASE = {
  pmegp: [
    { rank:1, name:'DFO Hubli',          state:'Karnataka',      applications:350, approvalRate:72.0, sanctioned:8.75 },
    { rank:2, name:'DFO Thrissur',       state:'Kerala',         applications:310, approvalRate:70.1, sanctioned:7.20 },
    { rank:3, name:'DFO Visakhapatnam', state:'Andhra Pradesh', applications:280, approvalRate:68.5, sanctioned:5.70 },
    { rank:4, name:'DFO Coimbatore',    state:'Tamil Nadu',     applications:275, approvalRate:68.0, sanctioned:6.25 },
    { rank:5, name:'DFO Jaipur',        state:'Rajasthan',      applications:250, approvalRate:67.2, sanctioned:5.80 },
  ],
  mudra: [
    { rank:1, name:'DFO Pune',           state:'Maharashtra',    applications:1820, approvalRate:93.4, sanctioned:48.20 },
    { rank:2, name:'DFO Bengaluru',      state:'Karnataka',      applications:1680, approvalRate:92.8, sanctioned:44.60 },
    { rank:3, name:'DFO Ahmedabad',      state:'Gujarat',        applications:1540, approvalRate:92.1, sanctioned:40.80 },
    { rank:4, name:'DFO Chennai',        state:'Tamil Nadu',     applications:1490, approvalRate:91.8, sanctioned:39.40 },
    { rank:5, name:'DFO Hyderabad',      state:'Telangana',      applications:1420, approvalRate:91.5, sanctioned:37.60 },
  ],
  sfurti: [
    { rank:1, name:'DFO Varanasi',       state:'Uttar Pradesh',  applications:24, approvalRate:83.3, sanctioned:2.94 },
    { rank:2, name:'DFO Jaipur',         state:'Rajasthan',      applications:21, approvalRate:81.0, sanctioned:2.52 },
    { rank:3, name:'DFO Mysuru',         state:'Karnataka',      applications:19, approvalRate:78.9, sanctioned:2.28 },
    { rank:4, name:'DFO Kanchipuram',    state:'Tamil Nadu',     applications:17, approvalRate:76.5, sanctioned:2.04 },
    { rank:5, name:'DFO Kolhapur',       state:'Maharashtra',    applications:16, approvalRate:75.0, sanctioned:1.92 },
  ],
};

const _BOTTOM_DFOS_BASE = {
  pmegp: [
    { rank:1, name:'DFO Aizawl',         state:'Mizoram',           applications:45, approvalRate:42.2, sanctioned:0.85 },
    { rank:2, name:'DFO Kohima',         state:'Nagaland',          applications:48, approvalRate:43.8, sanctioned:0.92 },
    { rank:3, name:'DFO Leh',            state:'Ladakh',            applications:50, approvalRate:44.0, sanctioned:0.95 },
    { rank:4, name:'DFO Itanagar',       state:'Arunachal Pradesh', applications:55, approvalRate:45.5, sanctioned:1.05 },
    { rank:5, name:'DFO Yanam',          state:'Puducherry',        applications:60, approvalRate:46.7, sanctioned:1.10 },
  ],
  mudra: [
    { rank:1, name:'DFO Leh',            state:'Ladakh',            applications:180, approvalRate:74.4, sanctioned:3.20 },
    { rank:2, name:'DFO Aizawl',         state:'Mizoram',           applications:210, approvalRate:75.8, sanctioned:3.85 },
    { rank:3, name:'DFO Kohima',         state:'Nagaland',          applications:240, approvalRate:76.2, sanctioned:4.40 },
    { rank:4, name:'DFO Itanagar',       state:'Arunachal Pradesh', applications:270, approvalRate:77.0, sanctioned:4.95 },
    { rank:5, name:'DFO Daman',          state:'Daman & Diu',       applications:290, approvalRate:78.4, sanctioned:5.30 },
  ],
  sfurti: [
    { rank:1, name:'DFO Leh',            state:'Ladakh',            applications:2, approvalRate:50.0, sanctioned:0.18 },
    { rank:2, name:'DFO Port Blair',     state:'A&N Islands',       applications:3, approvalRate:33.3, sanctioned:0.24 },
    { rank:3, name:'DFO Silvassa',       state:'Dadra & NH',        applications:3, approvalRate:33.3, sanctioned:0.26 },
    { rank:4, name:'DFO Aizawl',         state:'Mizoram',           applications:4, approvalRate:50.0, sanctioned:0.32 },
    { rank:5, name:'DFO Kohima',         state:'Nagaland',          applications:4, approvalRate:50.0, sanctioned:0.34 },
  ],
};

const _scaleDFO = (list, mult) => list.map(d => ({
  ...d,
  applications: Math.round(d.applications * mult),
  sanctioned:   parseFloat((d.sanctioned * mult).toFixed(2)),
}));

/**
 * TODO: Replace with → fetch(`/api/schemes/${schemeId}/top-dfos?month=${month}&order=desc`)
 */
export function getTopDFOs(schemeId, month) {
  const base = _TOP_DFOS_BASE[schemeId] ?? _TOP_DFOS_BASE.pmegp;
  const mult = _STATE_MULTIPLIERS[month] ?? 1.0;
  return _scaleDFO(base, mult);
}

/**
 * TODO: Replace with → fetch(`/api/schemes/${schemeId}/top-dfos?month=${month}&order=asc`)
 */
export function getBottomDFOs(schemeId, month) {
  const base = _BOTTOM_DFOS_BASE[schemeId] ?? _BOTTOM_DFOS_BASE.pmegp;
  const mult = _STATE_MULTIPLIERS[month] ?? 1.0;
  return _scaleDFO(base, mult);
}


// KARNATAKA DFOs — keyed by schemeId → month
// TODO: GET /api/schemes/:id/dfo-performance?state=Karnataka&month=YYYY-MM

const _KA_DFOS_BASE = {
  pmegp: [
    { name:'DFO Hubli',            applications:350, approved:252, approvalRate:72.0, sanctioned:8.75, employment:860 },
    { name:'DFO Bangalore',        applications:280, approved:188, approvalRate:67.1, sanctioned:6.35, employment:610 },
    { name:'Branch DFO Mangalore', applications:210, approved:138, approvalRate:65.7, sanctioned:4.85, employment:470 },
    { name:'Branch DFO Gulbarga',  applications:180, approved:116, approvalRate:64.4, sanctioned:3.60, employment:340 },
  ],
  mudra: [
    { name:'DFO Hubli',            applications:1240, approved:1128, approvalRate:90.9, sanctioned:32.40, employment:1680 },
    { name:'DFO Bangalore',        applications:1680, approved:1530, approvalRate:91.1, sanctioned:44.20, employment:2280 },
    { name:'Branch DFO Mangalore', applications:820,  approved:742,  approvalRate:90.5, sanctioned:21.60, employment:1120 },
    { name:'Branch DFO Gulbarga',  applications:680,  approved:612,  approvalRate:90.0, sanctioned:18.00, employment:928  },
  ],
  sfurti: [
    { name:'DFO Hubli',            applications:18, approved:14, approvalRate:77.8, sanctioned:2.10, employment:280 },
    { name:'DFO Bangalore',        applications:14, approved:11, approvalRate:78.6, sanctioned:1.62, employment:218 },
    { name:'Branch DFO Mangalore', applications:11, approved:8,  approvalRate:72.7, sanctioned:1.20, employment:160 },
    { name:'Branch DFO Gulbarga',  applications:9,  approved:6,  approvalRate:66.7, sanctioned:0.90, employment:120 },
  ],
};

/**
 * TODO: Replace with → fetch(`/api/schemes/${schemeId}/dfo-performance?state=Karnataka&month=${month}`)
 */
export function getKarnatakaDFOs(schemeId, month) {
  const base = _KA_DFOS_BASE[schemeId] ?? _KA_DFOS_BASE.pmegp;
  const mult = _STATE_MULTIPLIERS[month] ?? 1.0;
  return base.map(d => ({
    ...d,
    applications: Math.round(d.applications * mult),
    approved:     Math.round(d.approved     * mult),
    sanctioned:   parseFloat((d.sanctioned  * mult).toFixed(2)),
    employment:   Math.round(d.employment   * mult),
  }));
}


// TREND DATA — last 3 months relative to selected month
// TODO: GET /api/schemes/:id/trend?endMonth=YYYY-MM&months=3

const _MONTHS_ORDER = [
  'November 2024','December 2024',
  'January 2025','February 2025','March 2025','April 2025','May 2025',
  'March 2026','April 2026','May 2026','June 2026','July 2026',
];

const _TREND_BASE = {
  pmegp: {
    'November 2024': { applications:9220,  approvalRate:61.9, sanctioned:225.4, employment:17750 },
    'December 2024': { applications:8940,  approvalRate:61.9, sanctioned:218.6, employment:17240 },
    'January 2025':  { applications:9820,  approvalRate:62.9, sanctioned:241.3, employment:18940 },
    'February 2025': { applications:10240, approvalRate:63.7, sanctioned:256.8, employment:19870 },
    'March 2025':    { applications:10250, approvalRate:65.2, sanctioned:260.5, employment:20150 },
    'April 2025':    { applications:10870, approvalRate:64.9, sanctioned:261.1, employment:21490 },
    'May 2025':      { applications:12850, approvalRate:64.1, sanctioned:320.8, employment:25680 },
    'March 2026':    { applications:13380, approvalRate:66.2, sanctioned:334.0, employment:26700 },
    'April 2026':    { applications:13940, approvalRate:66.8, sanctioned:348.2, employment:27800 },
    'May 2026':      { applications:14560, approvalRate:67.4, sanctioned:363.0, employment:29100 },
    'June 2026':     { applications:15080, approvalRate:68.1, sanctioned:376.8, employment:30200 },
    'July 2026':     { applications:15620, approvalRate:68.6, sanctioned:391.0, employment:31400 },
  },
  mudra: {
    'November 2024': { applications:30020, approvalRate:90.3, sanctioned:1780.9, employment:41000 },
    'December 2024': { applications:29400, approvalRate:90.1, sanctioned:1740.6, employment:40100 },
    'January 2025':  { applications:31200, approvalRate:90.1, sanctioned:1840.2, employment:42300 },
    'February 2025': { applications:32800, approvalRate:90.2, sanctioned:1920.5, employment:44100 },
    'March 2025':    { applications:35400, approvalRate:90.1, sanctioned:2080.3, employment:47200 },
    'April 2025':    { applications:36100, approvalRate:90.3, sanctioned:2130.8, employment:48100 },
    'May 2025':      { applications:39200, approvalRate:90.6, sanctioned:2310.4, employment:52400 },
    'March 2026':    { applications:40760, approvalRate:91.0, sanctioned:2403.0, employment:54500 },
    'April 2026':    { applications:42380, approvalRate:91.2, sanctioned:2499.0, employment:56700 },
    'May 2026':      { applications:44100, approvalRate:91.5, sanctioned:2601.0, employment:59000 },
    'June 2026':     { applications:45720, approvalRate:91.8, sanctioned:2702.0, employment:61200 },
    'July 2026':     { applications:47400, approvalRate:92.0, sanctioned:2808.0, employment:63500 },
  },
  sfurti: {
    'November 2024': { applications:400, approvalRate:73.3, sanctioned:45.8,  employment:5950 },
    'December 2024': { applications:390, approvalRate:72.8, sanctioned:44.1,  employment:5780 },
    'January 2025':  { applications:420, approvalRate:73.8, sanctioned:48.2,  employment:6200 },
    'February 2025': { applications:440, approvalRate:74.6, sanctioned:51.4,  employment:6540 },
    'March 2025':    { applications:468, approvalRate:74.4, sanctioned:54.8,  employment:6950 },
    'April 2025':    { applications:482, approvalRate:74.9, sanctioned:56.6,  employment:7180 },
    'May 2025':      { applications:510, approvalRate:75.3, sanctioned:61.2,  employment:7620 },
    'March 2026':    { applications:530, approvalRate:75.8, sanctioned:63.6,  employment:7920 },
    'April 2026':    { applications:552, approvalRate:76.2, sanctioned:66.2,  employment:8240 },
    'May 2026':      { applications:575, approvalRate:76.6, sanctioned:69.0,  employment:8580 },
    'June 2026':     { applications:596, approvalRate:77.0, sanctioned:71.5,  employment:8900 },
    'July 2026':     { applications:618, approvalRate:77.4, sanctioned:74.2,  employment:9240 },
  },
};

/**
 * Returns the 3 months ending at (and including) the selected month.
 * TODO: Replace with → fetch(`/api/schemes/${schemeId}/trend?endMonth=${month}&months=3`)
 */
export function getTrendData(schemeId, month) {
  const allMonths = _MONTHS_ORDER;
  const idx       = allMonths.indexOf(month);
  const endIdx    = idx >= 0 ? idx : allMonths.length - 1;
  const startIdx  = Math.max(0, endIdx - 2);
  const slice     = allMonths.slice(startIdx, endIdx + 1);

  const base = _TREND_BASE[schemeId] ?? _TREND_BASE.pmegp;
  return slice
    .filter(m => base[m])
    .map(m => ({ month: m, ...base[m] }));
}


// INSIGHTS — keyed by schemeId → month
// TODO: GET /api/schemes/:id/insights?month=YYYY-MM

const _INSIGHTS = {
  pmegp: {
    'May 2025':      [ { type:'success', text:'Top performing state: Uttar Pradesh with 1,850 applications and 67.6% approval rate.' }, { type:'success', text:'DFO Hubli (Karnataka) is the top performer with 72% approval rate and highest sanctioned amount.' }, { type:'warning', text:'Bottom performing DFOs need support in documentation, awareness and follow-up.' }, { type:'info', text:'Focus on reducing average processing time below 30 days.' }, { type:'info', text:'Increase outreach in North East and UT regions.' } ],
    'April 2025':    [ { type:'success', text:'Applications grew 6% MoM — driven by Uttar Pradesh and Maharashtra clusters.' }, { type:'info', text:'Processing time plateaued at 33.5 days — automation of document verification recommended.' }, { type:'warning', text:'Approval rate dipped 0.3 pp — DFOs to review pending files older than 15 days.' }, { type:'info', text:'Employment generation steady — targeting 25,000 by May 2025.' } ],
    'March 2025':    [ { type:'success', text:'March saw highest approval rate in FY 2024-25 at 65.2% — Karnataka led the quarter.' }, { type:'info', text:'Margin money released crossed ₹260 Cr mark for the first time this year.' }, { type:'warning', text:'Lakshadweep and Andaman & Nicobar need dedicated outreach camps.' }, { type:'info', text:'Digital application submissions increased to 38% of total.' } ],
  },
  mudra: {
    'May 2025':      [ { type:'success', text:'Highest ever monthly disbursement: ₹2,310 Cr — 8.5% above April.' }, { type:'success', text:'Sanction rate held above 90% for the 7th consecutive month.' }, { type:'info', text:'Women beneficiaries now account for 62% of MUDRA loans — target 65% by Q3.' }, { type:'warning', text:'NPA monitoring to be strengthened in Ladakh and Mizoram clusters.' }, { type:'info', text:'Shishu category loans dominate — promote Kishore and Tarun categories in urban clusters.' } ],
    'April 2025':    [ { type:'success', text:'Loan applications grew 2% MoM — Kishore category driving growth in Maharashtra.' }, { type:'info', text:'Processing time improved to 11.5 days — targeting sub-10 days by Q3.' }, { type:'success', text:'Sanction rate crossed 90.3% — best in current quarter.' }, { type:'warning', text:'Loan utilisation tracking needs improvement in NE states.' } ],
    'March 2025':    [ { type:'success', text:'March disbursement ₹2,080 Cr — highest in Q4 FY 2024-25.' }, { type:'info', text:'35,400 applications processed — highest single-month volume this fiscal year.' }, { type:'warning', text:'Repayment tracking dashboard rollout pending for 8 states.' }, { type:'info', text:'Manufacturing sector loans grew 12% QoQ — positive signal for MSME sector.' } ],
  },
  sfurti: {
    'May 2025':      [ { type:'success', text:'75 clusters operationalised in May — handicraft sector leads with 28 new clusters.' }, { type:'success', text:'Grant release ₹61.2 Cr — highest single-month release in FY 2024-25.' }, { type:'info', text:'Common facility centres (CFCs) for 18 clusters pending infrastructure completion.' }, { type:'warning', text:'Cluster monitoring in Ladakh and A&N Islands needs improvement.' }, { type:'info', text:'GI tag applications for 6 SFURTI clusters under review by DPIIT.' } ],
    'April 2025':    [ { type:'success', text:'74.9% approval rate — best quarter in current fiscal for SFURTI.' }, { type:'info', text:'482 cluster applications — target 500+ per month from June 2025.' }, { type:'warning', text:'NE states cluster completion rate at 61% — district-level monitoring needed.' }, { type:'info', text:'Food processing clusters showing 18% higher employment per cluster vs other sectors.' } ],
    'March 2025':    [ { type:'success', text:'End-of-quarter push: 468 applications and ₹54.8 Cr released in March.' }, { type:'info', text:'Handloom clusters in UP and Rajasthan showing highest artisan income improvement.' }, { type:'warning', text:'Female artisan participation target of 60% not yet met in 4 states.' }, { type:'info', text:'Digital marketing training for cluster artisans rolled out across 12 states.' } ],
  },
};

const _DEFAULT_INSIGHTS = [
  { type:'info', text:'Data for the selected month is being compiled.' },
  { type:'info', text:'Switch to a recent month (May–Jul 2026) for detailed insights.' },
];

const _2026_INSIGHTS_PMEGP = [
  { type:'success', text:'Applications growing 4% MoM consistently since Mar 2026 — driven by UP and Maharashtra.' },
  { type:'success', text:'Approval rate crossed 68% in Jul 2026 — highest in two fiscal years.' },
  { type:'info',    text:'Processing time target: sub-28 days by Dec 2026 — currently at 29.8 days avg.' },
  { type:'warning', text:'NE states (Nagaland, Mizoram) still underperforming — targeted outreach needed.' },
  { type:'info',    text:'GEM portal procurement by DFOs increased 18% QoQ — continue to promote.' },
];

const _2026_INSIGHTS_MUDRA = [
  { type:'success', text:'MUDRA disbursements crossed ₹2,800 Cr in Jul 2026 — FY 2026-27 record high.' },
  { type:'success', text:'Sanction rate at 92% — above national target for 4 consecutive months.' },
  { type:'info',    text:'Women beneficiaries now at 65% — FY target achieved in Q1 itself.' },
  { type:'warning', text:'Tarun category loan NPA rate elevated in 3 states — monitoring intensified.' },
  { type:'info',    text:'Digital loan applications (mobile/web) now 58% of total — reducing DFO workload.' },
];

const _2026_INSIGHTS_SFURTI = [
  { type:'success', text:'618 cluster applications in Jul 2026 — highest monthly volume on record.' },
  { type:'success', text:'Grant release ₹74.2 Cr — 21% above Jul 2025 baseline.' },
  { type:'info',    text:'Common Facility Centres: 42 operational, 18 under construction.' },
  { type:'warning', text:'Female artisan participation target of 65% achieved in 6 states; pending in 4 others.' },
  { type:'info',    text:'GI tag applications approved for 3 SFURTI clusters — boosting export potential.' },
];

/**
 * TODO: Replace with → fetch(`/api/schemes/${schemeId}/insights?month=${month}`)
 */
export function getInsights(schemeId, month) {
  // Exact match first
  if (_INSIGHTS[schemeId]?.[month]) return _INSIGHTS[schemeId][month];
  // 2026 months → return 2026 scheme insights
  if (month?.includes('2026')) {
    if (schemeId === 'mudra')  return _2026_INSIGHTS_MUDRA;
    if (schemeId === 'sfurti') return _2026_INSIGHTS_SFURTI;
    return _2026_INSIGHTS_PMEGP;
  }
  return _DEFAULT_INSIGHTS;
}

