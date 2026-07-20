/**
 * DFOMetricsEntryPage — old dashboard (/dfo-entry)
 *
 * Redesigned with:
 *  - Weekly submission (instead of monthly)
 *  - Sections A–L per the updated field specification
 *  - Visitor Log (A–E) as repeatable per-entry records
 *  - Aggregates (F–L) filled once per week
 */
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ChevronDown, CheckCircle2, ClipboardList, ArrowRight, RotateCcw,
  Plus, Trash2, Info, Users, Megaphone, Landmark, Building2, Banknote,
  CalendarDays,
} from 'lucide-react';
import { APPOINTMENT_CATEGORIES, CATEGORY_SCHEME_MAPPING, SCHEMES_DB, USER_TYPES } from '@/data/appointmentData';

import TopBar from '@/components/layout/TopBar';
import { useDFOData } from '@/context/DFODataContext';
import { getDFOByState } from '@/data/dfoOverviewData';

// State → DFO mapping
const DFO_BY_STATE = getDFOByState('Jul 2026');
const STATE_OPTIONS = DFO_BY_STATE.map(g => ({
  state: g.state,
  dfos: g.dfos.map(d => ({ id: d.id, name: d.name })),
}));

// Lookup data
const ENTERPRISE_TYPES = [
  'New / Prospective Entrepreneur (Not yet registered as MSME)',
  'Existing MSME',
];

const NATURE_OF_ENQUIRY = {
  'New / Prospective Entrepreneur (Not yet registered as MSME)': [
    'Business Setup & Udyam Registration Guidance',
    'Schemes & Subsidies',
    'Credit & Finance Support',
    'Entrepreneurship & Skill Development',
    'Market Access & Business Growth',
    'Others',
  ],
  'Existing MSME': [
    'UDYAM related',
    'Scheme Benefits & Incentives',
    'Finance, Credit & Delayed Payment Issues',
    'Market Access & Procurement Support',
    'Technology, Quality & Certification Support',
    'Business Expansion, Export & Grievances',
    'Others',
  ],
};

// Flat list of all scheme categories (mirrors appointment page)
const ALL_SCHEME_CATEGORIES = [
  ...APPOINTMENT_CATEGORIES[USER_TYPES.NEW_ENTREPRENEUR].map(c => ({
    value: c.id,
    label: `${c.label}  (New Entrepreneur)`,
  })),
  ...APPOINTMENT_CATEGORIES[USER_TYPES.EXISTING_MSME].map(c => ({
    value: c.id,
    label: `${c.label}  (Existing MSME)`,
  })),
];

const ENTERPRISE_TO_USER_TYPE = {
  'New / Prospective Entrepreneur (Not yet registered as MSME)': USER_TYPES.NEW_ENTREPRENEUR,
  'Existing MSME': USER_TYPES.EXISTING_MSME,
};

const STAKEHOLDER_TYPES = [
  { id: 'stateGovt', label: 'State Government', icon: Landmark },
  { id: 'industry', label: 'Industry Associations', icon: Building2 },
  { id: 'banks', label: 'Banks', icon: Banknote },
  { id: 'others', label: 'Others', icon: Users },
];

// Reusable small components

function SelectField({ label, value, onChange, options, placeholder, disabled = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-[#0d1f4c] uppercase tracking-wide">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5
                     text-[11px] font-semibold text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400
                     focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-400
                     disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map(o => (
            typeof o === 'string'
              ? <option key={o} value={o}>{o}</option>
              : <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, placeholder, unit, hint, min = 0, max, errorMsg }) {
  const numVal = parseFloat(value);
  const hasError = value !== '' && !isNaN(numVal) && (
    (max !== undefined && numVal > max) || (numVal < min)
  );
  const validationMsg = hasError
    ? (max !== undefined && numVal > max ? `Must be ≤ ${max}${unit === '%' ? '%' : ''}` : `Must be ≥ ${min}`)
    : (errorMsg || null);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <label className="text-[11px] font-bold text-[#0d1f4c] leading-tight">{label}</label>
        {unit && (
          <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            {unit}
          </span>
        )}
      </div>
      {hint && <p className="text-[9px] text-gray-400 mb-2 leading-relaxed">{hint}</p>}
      <input
        type="number" min={min} max={max} step="any"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={evt => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-[11px] font-semibold text-[#0d1f4c]
                   focus:outline-none focus:ring-2 focus:border-transparent transition-all
                   placeholder:font-normal placeholder:text-gray-300
                   ${hasError ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-blue-400'}`}
      />
      {validationMsg && <p className="text-[9px] text-red-500 mt-1 font-semibold">{validationMsg}</p>}
    </div>
  );
}

// Page
export default function DFOMetricsEntryPage() {
  const { onOpenSidebar } = useOutletContext();
  const [month, setMonth] = useState('July 2026');
  const { updateDFOMetrics } = useDFOData();

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDFOId, setSelectedDFOId] = useState('');
  const [weekStart, setWeekStart] = useState('');
  const [weekEnd, setWeekEnd] = useState('');

  const handleWeekStartChange = (val) => {
    setWeekStart(val);
    if (val) {
      const date = new Date(val);
      date.setDate(date.getDate() + 6);
      setWeekEnd(date.toISOString().split('T')[0]);
    } else {
      setWeekEnd('');
    }
  };

  // Visitor log (per walk-in/appointment)
  const emptyVisit = () => ({
    id: Date.now() + Math.random(),
    enterpriseType: '',
    visitType: '',
    visitDate: '',
    natureOfEnquiry: '',
    schemeCategory: '',
    selectedScheme: '',
    queryStatus: '',
    dateOfRedressal: '',
  });
  const [visits, setVisits] = useState([]);
  const addVisit = () => setVisits(p => [...p, emptyVisit()]);
  const removeVisit = (id) => setVisits(p => p.filter(v => v.id !== id));
  const updateVisit = (id, field, val) => setVisits(p => p.map(v => v.id === id ? { ...v, [field]: val } : v));



  // MSME Service KPIs
  const [kpis, setKpis] = useState({
    msmeCatered: '',
    avgTAT: '',
    schemeApplications: '',
    conversionRate: '',
  });

  // H: Budget & Finance
  const [budget, setBudget] = useState({ allocated: '', utilised: '' });
  const budgetAllocated = parseFloat(budget.allocated) || 0;
  const budgetUtilised = parseFloat(budget.utilised) || 0;
  const pctUtilised = budgetAllocated > 0 ? Math.min(100, (budgetUtilised / budgetAllocated) * 100).toFixed(1) : null;
  const pctRemaining = pctUtilised != null ? (100 - parseFloat(pctUtilised)).toFixed(1) : null;

  // I: Outreach Campaigns
  const emptyCampaign = () => ({ id: Date.now() + Math.random(), name: '', scheme: '', actions: '', participants: '' });
  const [campaigns, setCampaigns] = useState([]);
  function addCampaign() { setCampaigns(p => [...p, emptyCampaign()]); }
  function removeCampaign(id) { setCampaigns(p => p.filter(c => c.id !== id)); }
  function updateCampaign(id, field, val) {
    setCampaigns(p => p.map(c => c.id === id ? { ...c, [field]: val } : c));
  }
  const totalParticipants = campaigns.reduce((s, c) => s + (parseInt(c.participants, 10) || 0), 0);

  // J: Stakeholder Meetings
  const [stakeTypeCounts, setStakeTypeCounts] = useState({ stateGovt: '', industry: '', banks: '', others: '' });
  const emptyMeeting = () => ({ id: Date.now() + Math.random(), date: '', organization: '', category: '', agenda: '', actions: '' });
  const [meetings, setMeetings] = useState([]);
  function addMeeting() { setMeetings(p => [...p, emptyMeeting()]); }
  function removeMeeting(id) { setMeetings(p => p.filter(m => m.id !== id)); }
  function updateMeeting(id, field, val) {
    setMeetings(p => p.map(m => m.id === id ? { ...m, [field]: val } : m));
  }

  // K: Public Procurement
  const [procurement, setProcurement] = useState({ gemRegistrations: '', gemBids: '', govtTenders: '' });

  // L: Remarks
  const [remarks, setRemarks] = useState('');

  // Helpers
  const dfoList = STATE_OPTIONS.find(s => s.state === selectedState)?.dfos ?? [];
  const selectedDFOName = dfoList.find(d => d.id === selectedDFOId)?.name ?? '';
  const canProceed = selectedState && selectedDFOId && weekStart && weekEnd;

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[11px] text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-300";

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate that Date of Redressal is filled when Query Resolution Status is 'Yes'
    const invalidEntries = visits.filter(v => v.queryStatus === 'Yes' && !v.dateOfRedressal);
    if (invalidEntries.length > 0) {
      alert(`Please fill in the Date of Redressal for ${invalidEntries.length} ${invalidEntries.length === 1 ? 'entry' : 'entries'} where Query Resolution Status is 'Yes'.`);
      return;
    }
    
    const totalQueries = visits.length;
    const resolvedQueries = visits.filter(v => v.queryStatus === 'Yes').length;
    const calcQueriesResolved = totalQueries > 0 ? (resolvedQueries / totalQueries) * 100 : 0;

    const payload = {
      msmeCatered: parseFloat(kpis.msmeCatered) || 0,
      queriesResolved: calcQueriesResolved,
      avgTAT: parseFloat(kpis.avgTAT) || 0,
      schemeApplications: parseFloat(kpis.schemeApplications) || 0,
      conversionRate: parseFloat(kpis.conversionRate) || 0,
      visitorCount: visits.length,
      visitsData: visits, // Storing visits data
      campaignsConducted: campaigns.length,
      totalParticipants,
    };
    if (budget.utilised !== '') payload.budgetUtilised = parseFloat(budget.utilised);
    updateDFOMetrics(selectedDFOId, payload);
    setStep(3);
  }

  function handleReset() {
    setStep(1);
    setSelectedState(''); setSelectedDFOId('');
    setWeekStart(''); setWeekEnd('');
    setVisits([]);
    setKpis({ msmeCatered: '', avgTAT: '', schemeApplications: '', conversionRate: '' });
    setBudget({ allocated: '', utilised: '' });
    setCampaigns([]);
    setStakeTypeCounts({ stateGovt: '', industry: '', banks: '', others: '' });
    setMeetings([]);
    setProcurement({ gemRegistrations: '', gemBids: '', govtTenders: '' });
    setRemarks('');
  }

  const sectionCls = "bg-white rounded-xl border border-gray-100 shadow-sm p-5";
  const sectionTitleCls = "text-[10px] font-bold text-[#0d1f4c] uppercase tracking-widest mb-4 pb-2 border-b border-gray-100";

  return (
    <>
      <TopBar
        title="MSME DFO Performance Dashboard"
        subtitle="DFO Metrics Entry — Weekly Submission"
        month={month}
        onMonth={setMonth}
        showDownload={false}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-3 lg:p-5">

        {/* ── Progress steps ──────────────────────────── */}
        <div className="flex items-center gap-2 mb-5">
          {['Select DFO & Week', 'Enter Metrics', 'Submitted'].map((s, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all
                  ${done ? 'bg-emerald-100 text-emerald-700' : active ? 'bg-[#0d1f4c] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? <CheckCircle2 size={11} /> : <span>{n}</span>}
                  {s}
                </div>
                {i < 2 && <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* Step 1 — Select State / DFO / Week            */}
        {/* ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <ClipboardList size={18} className="text-blue-600" />
                <h2 className="text-[13px] font-bold text-[#0d1f4c]">Select Reporting Details</h2>
              </div>

              <SelectField
                label="State/UT"
                value={selectedState}
                onChange={v => { setSelectedState(v); setSelectedDFOId(''); }}
                options={STATE_OPTIONS.map(s => s.state)}
                placeholder="Select state…"
              />
              <SelectField
                label="DFO Office"
                value={selectedDFOId}
                onChange={setSelectedDFOId}
                options={dfoList.map(d => ({ value: d.id, label: d.name }))}
                placeholder={selectedState ? 'Select DFO…' : 'Select a state first…'}
                disabled={!selectedState}
              />

              {/* Week Picker */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#0d1f4c] uppercase tracking-wide flex items-center gap-1.5">
                    <CalendarDays size={11} /> Week Start Date
                  </label>
                  <input type="date" value={weekStart} onChange={e => handleWeekStartChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#0d1f4c] uppercase tracking-wide flex items-center gap-1.5">
                    <CalendarDays size={11} /> Week End Date
                  </label>
                  <input type="date" value={weekEnd} min={weekStart} onChange={e => setWeekEnd(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceed}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold transition-all mt-2
                  ${canProceed ? 'bg-[#0d1f4c] text-white hover:bg-[#1e3a8a] shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Proceed to Metrics Entry
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* Step 2 — Full Metrics Form                    */}
        {/* ══════════════════════════════════════════════ */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-5xl mx-auto">

            {/* Context banner */}
            <div className="bg-gradient-to-r from-[#0d1f4c] to-[#1e3a8a] rounded-xl p-4 text-white flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">Entering weekly metrics for</p>
                <p className="text-[14px] font-bold">{selectedDFOName}</p>
                <p className="text-[10px] text-blue-200">
                  {selectedState}&nbsp;·&nbsp;{month}
                  {weekStart && weekEnd && <>&nbsp;·&nbsp;{weekStart} to {weekEnd}</>}
                </p>
              </div>
              <button type="button" onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-[10px] font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 transition-colors">
                <RotateCcw size={11} /> Change
              </button>
            </div>

            {/* ── Visitor Log (Per Walk-in / Appointment) ───────── */}
            <section className={sectionCls}>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-4">
                <div>
                  <h3 className={sectionTitleCls.replace('mb-4 pb-2 border-b border-gray-100', '')}>
                    Visitor Log (Per Walk-in / Appointment Entry)
                  </h3>
                  {visits.length > 0 && (
                    <p className="text-[9px] text-gray-400 mt-0.5">
                      <strong className="text-[#0d1f4c]">{visits.length}</strong> {visits.length !== 1 ? 'entries' : 'entry'}
                    </p>
                  )}
                </div>
                <button type="button" onClick={addVisit}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1f4c] text-white text-[10px] font-bold hover:bg-[#1e3a8a] transition-colors shadow-sm">
                  <Plus size={12} /> Add Entry
                </button>
              </div>

              {visits.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <Users size={28} className="text-gray-200 mb-2" />
                  <p className="text-[10px] text-gray-400">No visitor entries added yet.</p>
                </div>
              )}

              {visits.length > 0 && (
                <div className="space-y-4">
                  {visits.map((v, idx) => {
                    const vUserType = ENTERPRISE_TO_USER_TYPE[v.enterpriseType];
                    const dynamicCategories = vUserType
                      ? APPOINTMENT_CATEGORIES[vUserType].map(c => ({ value: c.id, label: c.label }))
                      : [];

                    const vSchemesByCategory = v.schemeCategory
                      ? (CATEGORY_SCHEME_MAPPING[v.schemeCategory] ?? [])
                        .filter(id => SCHEMES_DB[id])
                        .map(id => ({ value: id, label: SCHEMES_DB[id].name }))
                      : [];

                    return (
                      <div key={v.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-bold text-[#0d1f4c] uppercase tracking-wide">Entry #{idx + 1}</span>
                          <button type="button" onClick={() => removeVisit(v.id)}
                            className="flex items-center gap-1 text-[9px] text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                          {/* Type of Enterprise */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Type of Enterprise</label>
                            <div className="relative">
                              <select value={v.enterpriseType} onChange={e => updateVisit(v.id, 'enterpriseType', e.target.value)}
                                className={`${inputCls} appearance-none pr-7`}>
                                <option value="">Select…</option>
                                {ENTERPRISE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          {/* Walk-in or Appointment */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Walk-in or Appointment</label>
                            <div className="flex gap-2 mt-0.5">
                              {['Walk-in', 'Appointment'].map(opt => (
                                <button key={opt} type="button"
                                  onClick={() => updateVisit(v.id, 'visitType', opt)}
                                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${v.visitType === opt
                                    ? 'bg-[#0d1f4c] text-white border-[#0d1f4c]'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#0d1f4c]/40'
                                    }`}>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Date of Visit */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Date of Walk-in / Appointment</label>
                            <input type="date" value={v.visitDate} onChange={e => updateVisit(v.id, 'visitDate', e.target.value)}
                              className={inputCls} />
                          </div>

                          {/* Nature of Enquiry */}
                          <div className="flex flex-col gap-1 md:col-span-2 xl:col-span-3">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Nature of Enquiry / Meeting</label>
                            <div className="relative">
                              <select value={v.natureOfEnquiry}
                                onChange={e => updateVisit(v.id, 'natureOfEnquiry', e.target.value)}
                                disabled={!v.enterpriseType}
                                className={`${inputCls} appearance-none pr-7 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}>
                                <option value="">{v.enterpriseType ? 'Select nature of enquiry…' : 'Select enterprise type first…'}</option>
                                {(NATURE_OF_ENQUIRY[v.enterpriseType] || []).map(n => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          {/* Scheme Category */}
                          <div className="flex flex-col gap-1 md:col-span-2 xl:col-span-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Scheme Category Applied For</label>
                            <input type="text" value={v.schemeCategory} onChange={e => updateVisit(v.id, 'schemeCategory', e.target.value)}
                              disabled={!v.enterpriseType}
                              placeholder={v.enterpriseType ? 'Enter scheme category…' : 'Select enterprise type first…'}
                              className={`${inputCls} disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`} />
                          </div>

                          {/* Scheme */}
                          <div className="flex flex-col gap-1 md:col-span-2 xl:col-span-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Type of Enquiry</label>
                            <div className="relative">
                              <select value={v.selectedScheme} onChange={e => updateVisit(v.id, 'selectedScheme', e.target.value)}
                                disabled={!v.schemeCategory || ['Guidance', 'Grievance'].length === 0}
                                className={`${inputCls} appearance-none pr-7 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}>
                                <option value="">{v.schemeCategory ? 'Select scheme…' : 'Select category first…'}</option>
                                {['Guidance', 'Grievance'].map(type => <option key={type} value={type}>{type}</option>)}
                              </select>
                              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          {/* Query Status */}
                          <div className="flex flex-col gap-1 md:col-span-2 xl:col-span-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Query Resolution Status</label>
                            <div className="relative">
                              <select value={v.queryStatus} onChange={e => updateVisit(v.id, 'queryStatus', e.target.value)}
                                className={`${inputCls} appearance-none pr-7`}>
                                <option value="">Select status…</option>
                                {['Yes', 'No', 'In Progress'].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          {/* Date of Redressal - Conditional */}
                          {v.queryStatus === 'Yes' && (
                            <div className="flex flex-col gap-1 md:col-span-2 xl:col-span-1">
                              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">
                                Date of Redressal <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                value={v.dateOfRedressal}
                                onChange={e => updateVisit(v.id, 'dateOfRedressal', e.target.value)}
                                className={`${inputCls} ${!v.dateOfRedressal ? 'border-red-200 bg-red-50' : ''}`}
                              />
                              {!v.dateOfRedressal && <p className="text-[9px] text-red-500 font-semibold">Required field</p>}
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ── MSME Service KPIs (all in one section) ──────────── */}
            <section className={sectionCls}>
              <h3 className={sectionTitleCls}>MSME Service KPIs</h3>

              {/* Core KPI inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-3">
                <NumberInput
                  label="MSME Walk-Ins Attended"
                  unit="No. of MSMEs"
                  placeholder="e.g. 320"
                  value={kpis.msmeCatered}
                  onChange={v => setKpis(p => ({ ...p, msmeCatered: v }))}
                  hint="Total MSME entrepreneurs who visited the DFO office this week."
                  min={0}
                />
                <NumberInput
                  label="Avg. Turnaround Time"
                  unit="Days"
                  placeholder="e.g. 4.5"
                  value={kpis.avgTAT}
                  onChange={v => setKpis(p => ({ ...p, avgTAT: v }))}
                  hint="Average working days to resolve an application."
                />
                <NumberInput
                  label="Scheme Applications Supported"
                  unit="No. of applications"
                  placeholder="e.g. 145"
                  value={kpis.schemeApplications}
                  onChange={v => setKpis(p => ({ ...p, schemeApplications: v }))}
                  hint="Total applications filed under MSME schemes this week."
                />
                <NumberInput
                  label="Application Conversion Rate"
                  unit="%"
                  placeholder="e.g. 62"
                  value={kpis.conversionRate}
                  onChange={v => setKpis(p => ({ ...p, conversionRate: v }))}
                  hint="Percentage of applications approved / converted."
                  min={0} max={100}
                />
              </div>

              {/* Public Procurement */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-[10px] font-bold text-[#0d1f4c] mb-3">Public Procurement</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <NumberInput label="GeM Registrations Supported" unit="No."
                    placeholder="e.g. 12" value={procurement.gemRegistrations}
                    onChange={v => setProcurement(p => ({ ...p, gemRegistrations: v }))}
                    hint="Number of MSMEs supported with GeM portal registration." min={0} />
                  <NumberInput label="Supported in Submission of GeM Bids" unit="No."
                    placeholder="e.g. 5" value={procurement.gemBids}
                    onChange={v => setProcurement(p => ({ ...p, gemBids: v }))}
                    hint="Number of MSMEs supported in submitting bids on GeM." min={0} />
                  <NumberInput label="Supported in Submission of Govt. Tenders" unit="No."
                    placeholder="e.g. 3" value={procurement.govtTenders}
                    onChange={v => setProcurement(p => ({ ...p, govtTenders: v }))}
                    hint="Number of MSMEs supported in submitting government tenders." min={0} />
                </div>
              </div>
            </section>

            {/* ── Budget & Finance ───────────────────── */}
            <section className={sectionCls}>
              <h3 className={sectionTitleCls}>Budget &amp; Finance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <NumberInput label="Budget Allocated (Annual)" unit="₹ Lakh" placeholder="e.g. 25.0"
                  value={budget.allocated} onChange={v => setBudget(p => ({ ...p, allocated: v }))}
                  hint="Total sanctioned annual budget for this DFO (₹ in Lakh)." min={0} />
                <NumberInput label="Budget Utilised (Till This Week)" unit="₹ Lakh" placeholder="e.g. 14.5"
                  value={budget.utilised} onChange={v => setBudget(p => ({ ...p, utilised: v }))}
                  hint="Amount of budget utilised so far this financial year (₹ in Lakh)." min={0}
                  max={budget.allocated !== '' && !isNaN(parseFloat(budget.allocated)) ? parseFloat(budget.allocated) : undefined}
                  errorMsg={budget.allocated !== '' && budget.utilised !== '' && parseFloat(budget.utilised) > parseFloat(budget.allocated)
                    ? `Cannot exceed allocated budget (₹${budget.allocated}L)` : undefined} />
              </div>
              {pctUtilised != null && (
                <div className="flex flex-wrap gap-3 mt-1">
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wide">Utilised</span>
                    <span className="text-[15px] font-bold text-[#0d1f4c]">{pctUtilised}%</span>
                    <span className="text-[9px] text-gray-400">of allocated</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide">Remaining</span>
                    <span className="text-[15px] font-bold text-emerald-700">{pctRemaining}%</span>
                    <span className="text-[9px] text-gray-400">unspent</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Balance</span>
                    <span className="text-[15px] font-bold text-gray-700">₹{(budgetAllocated - budgetUtilised).toFixed(2)}L</span>
                  </div>
                </div>
              )}
            </section>

            {/* ── Outreach & Campaigns ───────────────── */}
            <section className={sectionCls}>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-4">
                <div>
                  <h3 className={sectionTitleCls.replace('mb-4 pb-2 border-b border-gray-100', '')}>Outreach &amp; Campaigns</h3>
                  {campaigns.length > 0 && (
                    <p className="text-[9px] text-gray-400 mt-0.5">
                      <strong className="text-[#0d1f4c]">{campaigns.length}</strong> campaign{campaigns.length !== 1 ? 's' : ''}&nbsp;·&nbsp;
                      <strong className="text-[#0d1f4c]">{totalParticipants}</strong> total participants
                    </p>
                  )}
                </div>
                <button type="button" onClick={addCampaign}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1f4c] text-white text-[10px] font-bold hover:bg-[#1e3a8a] transition-colors shadow-sm">
                  <Plus size={12} /> Add Campaign
                </button>
              </div>
              {campaigns.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Megaphone size={28} className="text-gray-200 mb-2" />
                  <p className="text-[10px] text-gray-400">No campaigns added yet.</p>
                  <p className="text-[9px] text-gray-300">Click <strong>Add Campaign</strong> to log awareness activities.</p>
                </div>
              )}
              {campaigns.length > 0 && (
                <div className="space-y-3">
                  {campaigns.map((c, idx) => (
                    <div key={c.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-bold text-[#0d1f4c] uppercase tracking-wide">Campaign #{idx + 1}</span>
                        <button type="button" onClick={() => removeCampaign(c.id)}
                          className="flex items-center gap-1 text-[9px] text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={11} /> Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        {[
                          { field: 'name', label: 'Campaign Name', placeholder: 'e.g. PMEGP Awareness Drive', type: 'text' },
                          { field: 'scheme', label: 'Scheme/Initiative', placeholder: 'e.g. PMEGP, ZED', type: 'text' },
                          { field: 'actions', label: 'Actions / Outcomes', placeholder: 'e.g. 12 registrations', type: 'text' },
                          { field: 'participants', label: 'Participants', placeholder: 'e.g. 85', type: 'number' },
                        ].map(f => (
                          <div key={f.field}>
                            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">{f.label}</label>
                            <input type={f.type} min={f.type === 'number' ? 0 : undefined}
                              value={c[f.field]} onChange={e => updateCampaign(c.id, f.field, e.target.value)}
                              placeholder={f.placeholder} className={inputCls} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ── Stakeholder Meetings ───────────────── */}
            <section className={sectionCls}>
              <h3 className={sectionTitleCls}>Stakeholder Meetings</h3>
              <p className="text-[9px] text-gray-400 mb-4 -mt-2">Enter the number of meetings held with each stakeholder type, then add meeting details below.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {STAKEHOLDER_TYPES.map(({ id, label, icon: Icon }) => (
                  <div key={id} className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon size={12} className="text-blue-500" />
                      <span className="text-[9px] font-bold text-gray-600 leading-tight">{label}</span>
                    </div>
                    <input type="number" min={0} value={stakeTypeCounts[id]}
                      onChange={e => setStakeTypeCounts(p => ({ ...p, [id]: e.target.value }))}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] font-bold text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-center" />
                    <p className="text-[8px] text-gray-400 text-center mt-1">meetings</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#0d1f4c]">
                  Meeting Details
                  {meetings.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold">{meetings.length}</span>
                  )}
                </p>
                <button type="button" onClick={addMeeting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0d1f4c] text-[#0d1f4c] text-[10px] font-bold hover:bg-[#0d1f4c] hover:text-white transition-colors">
                  <Plus size={12} /> Add Meeting
                </button>
              </div>
              {meetings.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <Users size={24} className="text-gray-200 mb-2" />
                  <p className="text-[10px] text-gray-400">No meeting details added yet.</p>
                </div>
              )}
              {meetings.length > 0 && (
                <div className="space-y-3">
                  {meetings.map((m, idx) => (
                    <div key={m.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-bold text-[#0d1f4c] uppercase tracking-wide">Meeting #{idx + 1}</span>
                        <button type="button" onClick={() => removeMeeting(m.id)}
                          className="flex items-center gap-1 text-[9px] text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={11} /> Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">Meeting Date</label>
                          <input type="date" value={m.date} onChange={e => updateMeeting(m.id, 'date', e.target.value)} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">Organization</label>
                          <input type="text" value={m.organization} onChange={e => updateMeeting(m.id, 'organization', e.target.value)}
                            placeholder="e.g. FICCI Karnataka Chapter" className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">Stakeholder Category</label>
                          <div className="relative">
                            <select value={m.category} onChange={e => updateMeeting(m.id, 'category', e.target.value)}
                              className={`${inputCls} appearance-none pr-7`}>
                              <option value="">Select category…</option>
                              {STAKEHOLDER_TYPES.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}
                            </select>
                            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="md:col-span-2 xl:col-span-1">
                          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">Agenda / Purpose</label>
                          <input type="text" value={m.agenda} onChange={e => updateMeeting(m.id, 'agenda', e.target.value)}
                            placeholder="e.g. PMEGP loan disbursement review" className={inputCls} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-1">Actions / Outcomes</label>
                          <input type="text" value={m.actions} onChange={e => updateMeeting(m.id, 'actions', e.target.value)}
                            placeholder="e.g. Follow-up scheduled; 12 applications expedited" className={inputCls} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ── Remarks / Weekly Summary ──────────── */}
            <section className={sectionCls}>
              <h3 className={sectionTitleCls}>Remarks / Weekly Summary</h3>
              <textarea rows={4} value={remarks} onChange={e => setRemarks(e.target.value)}
                placeholder="Key achievements, challenges faced, upcoming plans, or any other observations for this week…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[11px] text-[#0d1f4c]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                           transition-all resize-none placeholder:text-gray-300" />
            </section>

            {/* ── Submit row ────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 pt-1 pb-4">
              <button type="button" onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
              <button type="submit"
                className="flex items-center gap-2 px-7 py-2.5 rounded-lg bg-[#0d1f4c] text-white text-[11px] font-bold hover:bg-[#1e3a8a] shadow-sm transition-all">
                <CheckCircle2 size={14} /> Submit Weekly Metrics
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* Step 3 — Success                              */}
        {/* ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="max-w-md mx-auto text-center mt-10">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-[16px] font-bold text-[#0d1f4c] mb-1">Weekly Metrics Submitted!</h2>
            <p className="text-[11px] text-gray-500 mb-2">
              Metrics for <strong>{selectedDFOName}</strong> ({selectedState}) — <strong>{month}</strong>
              {weekStart && weekEnd && <>, week of <strong>{weekStart} to {weekEnd}</strong></>} have been recorded successfully.
            </p>
            <p className="text-[10px] text-gray-400 mb-6">
              The dashboard will reflect updated data once all DFOs submit their weekly entries.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setStep(2)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Edit Submission
              </button>
              <button onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#0d1f4c] text-white text-[11px] font-bold hover:bg-[#1e3a8a] transition-colors">
                <ClipboardList size={13} /> Enter for Another DFO
              </button>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
