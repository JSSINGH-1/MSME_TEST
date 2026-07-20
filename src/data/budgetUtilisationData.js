/**
 * Budget Utilisation Data — July 2026 Reporting Month
 *
 * NOTE: Data is dummy and for illustrative purposes only.
 * Every DFO has an annual sanctioned budget.
 * Since the current reporting month is July, we display "Budget Utilised Till Date"
 * instead of the full annual spend.
 */
export const BUDGET_UTILISATION_DATA = [
  { state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam',       annualBudget: 52, utilisedTillJuly: 21.5, utilisationPct: 41 },
  { state: 'Karnataka',      dfo: 'DFO Hubli',                annualBudget: 55, utilisedTillJuly: 30.4, utilisationPct: 55 },
  { state: 'Karnataka',      dfo: 'DFO Bangalore',            annualBudget: 48, utilisedTillJuly: 26.8, utilisationPct: 56 },
  { state: 'Karnataka',      dfo: 'Branch DFO Mangalore',     annualBudget: 55, utilisedTillJuly: 20.4, utilisationPct: 48 },
  { state: 'Karnataka',      dfo: 'Branch DFO Gulbarga',      annualBudget: 45, utilisedTillJuly: 16.0, utilisationPct: 36 },
  { state: 'Kerala',         dfo: 'DFO Thrissur',             annualBudget: 52, utilisedTillJuly: 24.0, utilisationPct: 46 },
  { state: 'Lakshadweep',    dfo: 'Br. DFO Lakshadweep',     annualBudget: 35, utilisedTillJuly: 10.5, utilisationPct: 30 },
  { state: 'Tamil Nadu',     dfo: 'DFO Chennai',              annualBudget: 45, utilisedTillJuly: 23.7, utilisationPct: 53 },
  { state: 'Tamil Nadu',     dfo: 'Branch DFO Coimbatore',   annualBudget: 52, utilisedTillJuly: 23.5, utilisationPct: 45 },
  { state: 'Tamil Nadu',     dfo: 'Branch DFO Madurai',       annualBudget: 52, utilisedTillJuly: 31.6, utilisationPct: 61 },
  { state: 'Tamil Nadu',     dfo: 'Branch DFO Tirunelveli',   annualBudget: 45, utilisedTillJuly: 16.2, utilisationPct: 36 },
  { state: 'Telangana',      dfo: 'DFO Hyderabad',            annualBudget: 48, utilisedTillJuly: 23.0, utilisationPct: 58 },
];

export const BUDGET_TOTALS = {
  totalAnnualBudget:    536,    // ₹ Lakh  (₹5.36 Cr)
  utilisedTillJuly:     267.6,  // ₹ Lakh  (₹2.68 Cr)
  overallUtilisation:   49.9,   // %
};
