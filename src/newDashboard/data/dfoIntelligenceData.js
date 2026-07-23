import districtFile from './districtData.json';

const KERALA = districtFile.state;
const DISTRICTS = KERALA.districts;
const DISTRICT_BY_ID = Object.fromEntries(DISTRICTS.map((district) => [district.id, district]));

const MONTHLY_SEASONALITY = {
  1: 0.81, 2: 0.85, 3: 0.92, 4: 0.96, 5: 1.0,
  6: 0.98, 7: 0.93, 8: 0.9, 9: 0.95, 10: 1.04,
  11: 0.88, 12: 0.83,
};

const MONTH_MAP = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

function getDistrict(district = KERALA.defaultDistrict) {
  return DISTRICT_BY_ID[district] ?? DISTRICT_BY_ID[KERALA.defaultDistrict];
}

function getLastUpdated() {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return `${String(lastWeek.getDate()).padStart(2, '0')} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][lastWeek.getMonth()]} ${lastWeek.getFullYear()} 10:30 AM`;
}

export function parseMonthYear(monthYear) {
  const [monthName, yearValue] = (monthYear ?? 'May 2025').split(' ');
  return { month: MONTH_MAP[monthName] ?? 5, year: parseInt(yearValue, 10) || 2025 };
}

export function applyVariance(baseValue, stateId, year, month, baseYear = 2025, baseMonth = 5) {
  const growthRate = stateId === 'kerala' ? 0.24 : 0.24;
  const yearFactor = Math.pow(1 + growthRate, year - baseYear);
  const monthFactor = (MONTHLY_SEASONALITY[month] ?? 1.0) / (MONTHLY_SEASONALITY[baseMonth] ?? 1.0);
  return Math.round(baseValue * yearFactor * monthFactor);
}

export const INTELLIGENCE_STATES = [
  {
    id: KERALA.id,
    label: KERALA.label,
    districts: DISTRICTS.map((district) => district.label),
  },
];

function buildKpis(district) {
  const consolidated = DISTRICT_BY_ID['All Districts'];
  return {
    district: district.label,
    stateLabel: KERALA.label,
    totalMSMEs: district.totalMSMEs,
    keralaShare: district.summaryShare,
    totalIndustries: district.totalIndustries,
    championPortalCases: district.championPortalCases,
    districtRank: district.districtRank,
    keralaMSMEs: consolidated.totalMSMEs,
    districtMSMEs: district.totalMSMEs,
    d1Name: district.label,
    d1Share: district.summaryShare,
    d1Count: district.totalMSMEs,
    d2Name: KERALA.label,
    d2Share: 100,
    d2Count: consolidated.totalMSMEs,
    grievances: district.championPortalCases,
    yoyGrowth: 0,
    density: 0,
    lastUpdated: getLastUpdated(),
  };
}

function buildTrend(district) {
  return district.trend;
}

function buildComparison(district) {
  return district.comparison;
}

function buildHeatmap(district) {
  return district.heatmap;
}

export function getIntelligenceKPIs(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return buildKpis(selected);
}

export function getRegistrationTrend(stateId, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.trend;
}

export function getNorthSouthComparison(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.comparison;
}

export function getD1TopSectors(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.topIndustries;
}

export function getD2TopSectors(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.bottomIndustries;
}

export function getOpportunityMatrix(stateId, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.opportunity;
}

export function getGrievanceData(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.grievance;
}

export function getRecommendedActions(stateId, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.actions;
}

export function getAtAGlance(stateId, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.glance;
}

export function getSectorHeatmap(stateId, monthYear, district = KERALA.defaultDistrict) {
  const selected = getDistrict(district);
  return selected.heatmap;
}
