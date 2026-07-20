/**
 * ReportsPage — old dashboard (/reports)
 *
 * Simplified to a single consolidated DFO Performance Report
 * with PDF and Excel download options.
 */
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileText, Table2, Download, Clock, CheckCircle2, BarChart3, Calendar } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';

// Download button component
function DownloadButton({ type, month }) {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'done'

  const isPdf = type === 'pdf';

  function handleClick() {
    if (state !== 'idle') return;
    setState('loading');
    setTimeout(() => {
      setState('done');
      setTimeout(() => setState('idle'), 3000);
    }, 1400);
  }

  const base = 'flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 border shadow-sm';

  if (state === 'done') {
    return (
      <button disabled className={`${base} bg-emerald-500 text-white border-emerald-500 cursor-default`}>
        <CheckCircle2 size={14} />
        Downloaded!
      </button>
    );
  }

  if (state === 'loading') {
    return (
      <button disabled className={`${base} bg-blue-50 text-blue-600 border-blue-200 cursor-wait`}>
        <Clock size={14} className="animate-spin" />
        Preparing…
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${base} ${
        isPdf
          ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
      }`}
    >
      {isPdf
        ? <><FileText size={14} /> Download PDF</>
        : <><Table2  size={14} /> Download Excel</>
      }
    </button>
  );
}

// Page
export default function ReportsPage() {
  const { onOpenSidebar } = useOutletContext();
  const [month, setMonth] = useState('July 2026');

  return (
    <>
      <TopBar
        title="Reports"
        subtitle="Consolidated DFO Performance Report"
        month={month}
        onMonth={setMonth}
        showDownload={false}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-3 lg:p-6 flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl space-y-5">

          {/* ── Hero Banner ─────────────────────────────── */}
          <div className="bg-gradient-to-r from-[#0d1f4c] to-[#1e3a8a] rounded-2xl p-6 text-white">
            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-300 mb-1">Reports Centre</p>
            <h2 className="text-lg font-bold mb-0.5">Monthly Reports</h2>
            <p className="text-[11px] text-blue-200">
              Download the consolidated performance report for <strong>{month}</strong>.
            </p>
          </div>

          {/* ── Single Report Card ──────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">

            {/* Icon + title row */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0d1f4c] to-[#1e3a8a] flex items-center justify-center flex-shrink-0 shadow-sm">
                <BarChart3 size={26} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-[#0d1f4c] leading-snug">
                  Consolidated DFO Performance Report
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar size={10} className="text-gray-400" />
                  <span className="text-[10px] text-gray-500 font-medium">{month}</span>
                  <span className="text-[10px] text-gray-300 mx-1">·</span>
                  <CheckCircle2 size={10} className="text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 font-medium">Available</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
              Combined monthly performance summary across all District Facilitation Offices (DFOs). Includes:
            </p>
            <ul className="space-y-1.5 mb-6">
              {[
                'MSME walk-ins, queries resolved, avg. TAT &amp; conversion rates',
                'Budget allocated, utilised &amp; remaining balance',
                'Awareness campaigns conducted &amp; total participants',
                'Stakeholder meetings by category with details &amp; outcomes',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d1f4c] flex-shrink-0 mt-1.5" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-5" />

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-2">Choose Format</p>
                <div className="flex flex-wrap gap-2">
                  <DownloadButton type="pdf"   month={month} />
                  <DownloadButton type="excel" month={month} />
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[9px] text-amber-700 max-w-[200px]">
                <strong className="block mb-0.5">Note</strong>
                Report files will be available once provided by the admin. Downloads are simulated.
              </div>
            </div>
          </div>

          {/* ── Footer note ──────────────────────────────── */}
          <p className="text-[9px] text-gray-400 text-center pb-2">
            One consolidated report per month. Data is for illustrative purposes — real files to be provided by admin.
          </p>

        </div>
      </main>
    </>
  );
}
