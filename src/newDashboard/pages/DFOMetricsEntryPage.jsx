import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDown, CheckCircle2, ClipboardList, ArrowRight, RotateCcw } from 'lucide-react';
import TopBar from '@/newDashboard/components/layout/TopBar';

// State → DFO mapping
const STATE_DFO_MAP = {
  'Andhra Pradesh': ['DFO Visakhapatnam'],
  'Karnataka':      ['DFO Hubli', 'DFO Bangalore', 'Branch DFO Mangalore', 'Branch DFO Gulbarga'],
  'Kerala':         ['DFO Thrissur'],
  'Lakshadweep':    ['Br. DFO Lakshadweep'],
  'Tamil Nadu':     ['DFO Chennai', 'Branch DFO Coimbatore', 'Branch DFO Madurai', 'Branch DFO Tirunelveli'],
  'Telangana':      ['DFO Hyderabad'],
};

// Metric definitions (one field per metric)
const METRICS = [
  {
    id:          'msmeCatered',
    label:       'MSME Walk-Ins (Catered)',
    unit:        'No. of MSMEs',
    placeholder: 'e.g. 320',
    type:        'number',
    description: 'Total number of MSME entrepreneurs who visited the DFO office during the month.',
  },
  {
    id:          'queriesResolved',
    label:       'Queries Resolved (%)',
    unit:        '%',
    placeholder: 'e.g. 87',
    type:        'number',
    min:         0,
    max:         100,
    description: 'Percentage of MSME queries successfully resolved out of total queries received.',
  },
  {
    id:          'schemeApplications',
    label:       'Scheme Applications Received',
    unit:        'No. of applications',
    placeholder: 'e.g. 145',
    type:        'number',
    description: 'Total scheme applications filed under PMEGP, CGTMSE, ZED, PM Vishwakarma, etc.',
  },
  {
    id:          'conversionRate',
    label:       'Application Conversion Rate (%)',
    unit:        '%',
    placeholder: 'e.g. 62',
    type:        'number',
    min:         0,
    max:         100,
    description: 'Percentage of applications that were approved / converted.',
  },
  {
    id:          'avgTAT',
    label:       'Avg. Turnaround Time',
    unit:        'Days',
    placeholder: 'e.g. 4.5',
    type:        'number',
    description: 'Average number of working days taken to resolve an application.',
  },
  {
    id:          'campaignsConducted',
    label:       'Awareness Campaigns Conducted',
    unit:        'No. of campaigns',
    placeholder: 'e.g. 8',
    type:        'number',
    description: 'Total number of outreach/awareness events conducted during the month.',
  },
  {
    id:          'totalParticipants',
    label:       'Total Campaign Participants',
    unit:        'No. of participants',
    placeholder: 'e.g. 472',
    type:        'number',
    description: 'Total number of participants across all awareness campaigns.',
  },
  {
    id:          'budgetUtilised',
    label:       'Budget Utilised',
    unit:        '₹ Lakh',
    placeholder: 'e.g. 3.8',
    type:        'number',
    description: 'Amount of sanctioned budget utilised during the month (₹ in Lakh).',
  },
  {
    id:          'remarks',
    label:       'Remarks / Observations',
    unit:        '',
    placeholder: 'Any additional observations, challenges or highlights for the month…',
    type:        'textarea',
    description: 'Optional narrative context for this month\'s metrics.',
  },
];

// Small helpers

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-[#0d1f4c] uppercase tracking-wide">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5
                     text-[11px] font-semibold text-[#0d1f4c] focus:outline-none focus:ring-2 focus:ring-blue-400
                     focus:border-transparent transition-all"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function MetricField({ metric, value, onChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <label className="text-[11px] font-bold text-[#0d1f4c] leading-tight">{metric.label}</label>
        {metric.unit && (
          <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            {metric.unit}
          </span>
        )}
      </div>
      <p className="text-[9px] text-gray-400 mb-2 leading-relaxed">{metric.description}</p>
      {metric.type === 'textarea' ? (
        <textarea
          rows={3}
          value={value}
          onChange={e => onChange(metric.id, e.target.value)}
          placeholder={metric.placeholder}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[10px] text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                     resize-none transition-all"
        />
      ) : (
        <input
          type="number"
          min={metric.min}
          max={metric.max}
          value={value}
          onChange={e => onChange(metric.id, e.target.value)}
          placeholder={metric.placeholder}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[11px] font-semibold text-[#0d1f4c]
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
      )}
    </div>
  );
}

// Page
const MONTHS_OPTIONS = ['July 2026', 'June 2026', 'May 2026', 'April 2026', 'March 2026'];

export default function DFOMetricsEntryPage() {
  const { onOpenSidebar } = useOutletContext();

  // Step tracking: 1 = state+DFO+month select, 2 = metrics form, 3 = success
  const [step, setStep] = useState(1);

  // Selection
  const [selectedState,  setSelectedState]  = useState('');
  const [selectedDFO,    setSelectedDFO]    = useState('');
  const [selectedMonth,  setSelectedMonth]  = useState('July 2026');

  // Metric values keyed by metric id
  const [values, setValues] = useState({});

  const dfoOptions = selectedState ? STATE_DFO_MAP[selectedState] ?? [] : [];
  const canProceed = selectedState && selectedDFO && selectedMonth;

  function handleValueChange(id, val) {
    setValues(prev => ({ ...prev, [id]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: POST to real API
    // fetch('/api/dfo-metrics', { method: 'POST', body: JSON.stringify({ state: selectedState, dfo: selectedDFO, month: selectedMonth, ...values }) })
    setStep(3);
  }

  function handleReset() {
    setStep(1);
    setSelectedState('');
    setSelectedDFO('');
    setSelectedMonth('July 2026');
    setValues({});
  }

  return (
    <>
      <TopBar
        title="DFO Monthly Metrics Entry"
        subtitle="Log Monthly Metrics to Supply the Dashboard"
        showDownload={false}
        month={selectedMonth}
        onMonth={setSelectedMonth}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-3 lg:p-5">

        {/* ── Progress steps ───────────────────────────── */}
        <div className="flex items-center gap-2 mb-5">
          {['Select DFO', 'Enter Metrics', 'Submitted'].map((s, i) => {
            const n = i + 1;
            const done   = step > n;
            const active = step === n;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all
                  ${done   ? 'bg-emerald-100 text-emerald-700'
                  : active ? 'bg-[#0d1f4c] text-white'
                  :          'bg-gray-100 text-gray-400'}`}>
                  {done ? <CheckCircle2 size={11} /> : <span>{n}</span>}
                  {s}
                </div>
                {i < 2 && <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* ────────────────────────────────────────────── */}
        {/* Step 1 — Select State / DFO / Month           */}
        {/* ────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <ClipboardList size={18} className="text-blue-600" />
                <h2 className="text-[13px] font-bold text-[#0d1f4c]">Select Reporting Details</h2>
              </div>
              <p className="text-[10px] text-gray-400 -mt-2 mb-2">
                First select the State, DFO, and the reporting month. Then you will be prompted to fill in each metric.
              </p>

              <SelectField
                label="Reporting Month"
                value={selectedMonth}
                onChange={setSelectedMonth}
                options={MONTHS_OPTIONS}
                placeholder="Select month…"
              />
              <SelectField
                label="State"
                value={selectedState}
                onChange={v => { setSelectedState(v); setSelectedDFO(''); }}
                options={Object.keys(STATE_DFO_MAP)}
                placeholder="Select state…"
              />
              <SelectField
                label="DFO"
                value={selectedDFO}
                onChange={setSelectedDFO}
                options={dfoOptions}
                placeholder={selectedState ? 'Select DFO…' : 'Select a state first…'}
              />

              <button
                onClick={() => setStep(2)}
                disabled={!canProceed}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold transition-all mt-2
                  ${canProceed
                    ? 'bg-[#0d1f4c] text-white hover:bg-[#1e3a8a] shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Proceed to Metrics Entry
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────── */}
        {/* Step 2 — Metrics Form                         */}
        {/* ────────────────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Context banner */}
            <div className="bg-gradient-to-r from-[#0d1f4c] to-[#1e3a8a] rounded-xl p-4 text-white flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">Entering metrics for</p>
                <p className="text-[13px] font-bold">{selectedDFO}</p>
                <p className="text-[10px] text-blue-200">{selectedState} &nbsp;·&nbsp; {selectedMonth}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-[10px] font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 transition-colors"
              >
                <RotateCcw size={11} />
                Change
              </button>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {METRICS.map(metric => (
                <MetricField
                  key={metric.id}
                  metric={metric}
                  value={values[metric.id] ?? ''}
                  onChange={handleValueChange}
                />
              ))}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0d1f4c] text-white text-[11px] font-bold hover:bg-[#1e3a8a] shadow-sm transition-all"
              >
                <CheckCircle2 size={13} />
                Submit Metrics
              </button>
            </div>
          </form>
        )}

        {/* ────────────────────────────────────────────── */}
        {/* Step 3 — Success                              */}
        {/* ────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="max-w-md mx-auto text-center mt-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-[16px] font-bold text-[#0d1f4c] mb-1">Metrics Submitted!</h2>
            <p className="text-[11px] text-gray-500 mb-2">
              Monthly metrics for <strong>{selectedDFO}</strong> ({selectedState}) — <strong>{selectedMonth}</strong> have been recorded successfully.
            </p>
            <p className="text-[10px] text-gray-400 mb-6">
              The dashboard will reflect updated data once all DFOs submit their entries.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => { setStep(2); }}
                className="px-4 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Edit Submission
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#0d1f4c] text-white text-[11px] font-bold hover:bg-[#1e3a8a] transition-colors"
              >
                <ClipboardList size={13} />
                Enter for Another DFO
              </button>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
