import { useState, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Users, CheckCircle, IndianRupee,
  Briefcase, Target, Clock, Globe, ChevronDown,
} from 'lucide-react';

// Layout
import TopBar from '@/components/layout/TopBar';

// UI
import KPICard       from '@/components/ui/KPICard';
import SectionHeader from '@/components/ui/SectionHeader';
import InsightItem   from '@/components/ui/InsightItem';
import ProgressBar   from '@/components/ui/ProgressBar';

// Tables
import StateTable     from '@/components/tables/StateTable';
import DFORankedTable from '@/components/tables/DFORankedTable';

// Charts
import TrendBarChart from '@/components/charts/TrendBarChart';

// Data — getter functions (swap bodies for API calls when backend is ready)
import {
  SCHEMES,
  SCHEME_META,
  getNationalKPIs,
  getStatePerformance,
  getTopDFOs,
  getBottomDFOs,
  getKarnatakaDFOs,
  getTrendData,
  getInsights,
} from '@/data/schemeData';

// KPI card config
const KPI_CONFIG = [
  { key: 'totalApplications',     icon: Users,        iconBg: 'bg-blue-700'    },
  { key: 'applicationsApproved',  icon: CheckCircle,  iconBg: 'bg-emerald-600' },
  { key: 'marginMoneySanctioned', icon: IndianRupee,  iconBg: 'bg-blue-900'    },
  { key: 'employmentProposed',    icon: Briefcase,    iconBg: 'bg-orange-500'  },
  { key: 'approvalRate',          icon: Target,       iconBg: 'bg-teal-600'    },
  { key: 'avgProcessingTime',     icon: Clock,        iconBg: 'bg-red-500'     },
];

const TREND_CHARTS = [
  { dataKey: 'applications', label: 'Applications',             color: '#1e3a8a' },
  { dataKey: 'approvalRate', label: 'Approval Rate (%)',         color: '#059669', formatter: v => `${v}%` },
  { dataKey: 'sanctioned',   label: 'Sanctioned Amount (₹ Cr)', color: '#7c3aed', formatter: v => `₹${v}` },
  { dataKey: 'employment',   label: 'Employment Proposed',       color: '#d97706', formatter: v => v.toLocaleString('en-IN') },
];

// Karnataka DFO sub-table
function KarnatakaTable({ data }) {
  if (!data?.length) return <p className="text-xs text-gray-400 py-4 text-center">No data available</p>;
  const maxSanctioned = Math.max(...data.map(d => d.sanctioned));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['DFO', 'Applications', 'Approved', 'Approval Rate', 'Sanctioned (₹ Cr)', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.name} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2 px-2 font-medium text-gray-800 whitespace-nowrap">{row.name}</td>
              <td className="py-2 px-2 tabular-nums text-gray-700">{row.applications.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 tabular-nums text-gray-700">{row.approved.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 w-32">
                <ProgressBar value={row.approvalRate} color="green" labelSuffix="%" />
              </td>
              <td className="py-2 px-2 w-32">
                <ProgressBar value={Math.round((row.sanctioned / Math.max(maxSanctioned, 1)) * 100)} color="navy" showLabel={false} />
                <span className="text-[10px] text-gray-500">{row.sanctioned.toFixed(2)}</span>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full bg-orange-400" style={{ width: `${Math.round((row.employment / 1000) * 56)}px` }} />
                  <span className="tabular-nums text-gray-700">{row.employment.toLocaleString('en-IN')}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function SchemePerformancePage() {
  const navigate = useNavigate();

// Filter state — drives all data below
  const [month,  setMonth]  = useState('May 2025');
  const [scheme, setScheme] = useState('pmegp');

  /**
   * useMemo re-derives data whenever scheme or month changes.
   *
   * TO CONNECT REAL API:
   * Replace `useState` + `useMemo` with `useState([])` + `useEffect`:
   *
   *   const [kpis, setKpis] = useState(null);
   *   useEffect(() => {
   *     fetch(`/api/schemes/${scheme}/kpis?month=${month}`)
   *       .then(r => r.json()).then(setKpis);
   *   }, [scheme, month]);
   */
  const kpis        = useMemo(() => getNationalKPIs(scheme, month),       [scheme, month]);
  const stateData   = useMemo(() => getStatePerformance(scheme, month),   [scheme, month]);
  const topDFOs     = useMemo(() => getTopDFOs(scheme, month),            [scheme, month]);
  const bottomDFOs  = useMemo(() => getBottomDFOs(scheme, month),         [scheme, month]);
  const kaDFOs      = useMemo(() => getKarnatakaDFOs(scheme, month),      [scheme, month]);
  const trendData   = useMemo(() => getTrendData(scheme, month),          [scheme, month]);
  const insights    = useMemo(() => getInsights(scheme, month),           [scheme, month]);

  const meta = SCHEME_META[scheme];

  // Trend legend: last 3 months shown in chart
  const trendMonths = trendData.map(d => d.month);

  return (
    <>
      <TopBar
        title="MSME Scheme Performance Dashboard"
        subtitle="Scheme Level View"
        month={month}
        onMonth={setMonth}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* ── Scheme selector ───────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 grid grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Select Scheme
            </label>
            <div className="relative">
              <select
                value={scheme}
                onChange={e => setScheme(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SCHEMES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              About {scheme.toUpperCase()} Scheme
            </label>
            <p className="text-xs text-gray-600 leading-relaxed">{meta?.description}</p>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Scheme Owner
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Globe size={14} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{meta?.owner}</p>
                <p className="text-[10px] text-gray-500">{meta?.ownerFull}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── National KPIs ──────────────────────────────────── */}
        <section>
          <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            National Level Performance ({month})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {KPI_CONFIG.map(({ key, icon, iconBg }) => (
              kpis?.[key] ? <KPICard key={key} kpi={kpis[key]} icon={icon} iconBg={iconBg} /> : null
            ))}
          </div>
        </section>

        {/* ── State table + Top/Bottom DFOs ─────────────────── */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader
              title={`State Level Performance (${month})`}
              action="View all States"
              onAction={() => navigate('/state-performance')}
            />
            <StateTable data={stateData} />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
              <SectionHeader
                title="Top 5 DFOs (By Applications)"
                action="View all DFOs"
                onAction={() => navigate('/dfo-performance')}
              />
              <DFORankedTable data={topDFOs} variant="top" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
              <SectionHeader
                title="Bottom 5 DFOs (By Applications)"
                action="View all DFOs"
                onAction={() => navigate('/dfo-performance')}
              />
              <DFORankedTable data={bottomDFOs} variant="bottom" />
            </div>
          </div>
        </div>

        {/* ── Karnataka DFO table + Insights ────────────────── */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader
              title={`DFO Performance in Karnataka (${month})`}
              action="View all DFOs in Karnataka"
              onAction={() => navigate('/dfo-performance')}
            />
            <KarnatakaTable data={kaDFOs} />
          </div>

          <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader title="Key Insights & Recommendations" />
            <div className="space-y-2">
              {insights.map((ins, i) => <InsightItem key={i} type={ins.type} text={ins.text} />)}
            </div>
          </div>
        </div>

        {/* ── Trend charts ───────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader
            title={`${scheme.toUpperCase()} Performance Trend (Last 3 Months)`}
            action="View Detailed Trend Analysis"
            onAction={() => {}}
          />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-1">
            {TREND_CHARTS.map(c => (
              <TrendBarChart
                key={c.dataKey}
                data={trendData}
                dataKey={c.dataKey}
                color={c.color}
                label={c.label}
                formatter={c.formatter}
              />
            ))}
          </div>
          {/* Dynamic legend */}
          <div className="flex gap-5 mt-3 justify-center">
            {trendMonths.map((m, i) => {
              const shades = ['bg-blue-200', 'bg-blue-500', 'bg-blue-900'];
              return (
                <div key={m} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${shades[i]}`} />
                  <span className="text-[10px] text-gray-500">{m}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-gray-400 mt-2 text-center">
            Note: Data is dummy and for illustrative purposes only.
          </p>
        </div>

      </main>
    </>
  );
}
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, CheckCircle, IndianRupee,
  Briefcase, Target, Clock, Globe, ChevronDown,
} from 'lucide-react';

// Layout
import TopBar from '@/components/layout/TopBar';

// UI
import KPICard       from '@/components/ui/KPICard';
import SectionHeader from '@/components/ui/SectionHeader';
import InsightItem   from '@/components/ui/InsightItem';
import ProgressBar   from '@/components/ui/ProgressBar';

// Tables
import StateTable     from '@/components/tables/StateTable';
import DFORankedTable from '@/components/tables/DFORankedTable';

// Charts
import TrendBarChart from '@/components/charts/TrendBarChart';

// Data — getter functions (swap bodies for API calls when backend is ready)
import {
  SCHEMES,
  SCHEME_META,
  getNationalKPIs,
  getStatePerformance,
  getTopDFOs,
  getBottomDFOs,
  getKarnatakaDFOs,
  getTrendData,
  getInsights,
} from '@/data/schemeData';

// KPI card config
const KPI_CONFIG = [
  { key: 'totalApplications',     icon: Users,        iconBg: 'bg-blue-700'    },
  { key: 'applicationsApproved',  icon: CheckCircle,  iconBg: 'bg-emerald-600' },
  { key: 'marginMoneySanctioned', icon: IndianRupee,  iconBg: 'bg-blue-900'    },
  { key: 'employmentProposed',    icon: Briefcase,    iconBg: 'bg-orange-500'  },
  { key: 'approvalRate',          icon: Target,       iconBg: 'bg-teal-600'    },
  { key: 'avgProcessingTime',     icon: Clock,        iconBg: 'bg-red-500'     },
];

const TREND_CHARTS = [
  { dataKey: 'applications', label: 'Applications',             color: '#1e3a8a' },
  { dataKey: 'approvalRate', label: 'Approval Rate (%)',         color: '#059669', formatter: v => `${v}%` },
  { dataKey: 'sanctioned',   label: 'Sanctioned Amount (₹ Cr)', color: '#7c3aed', formatter: v => `₹${v}` },
  { dataKey: 'employment',   label: 'Employment Proposed',       color: '#d97706', formatter: v => v.toLocaleString('en-IN') },
];

// Karnataka DFO sub-table
function KarnatakaTable({ data }) {
  if (!data?.length) return <p className="text-xs text-gray-400 py-4 text-center">No data available</p>;
  const maxSanctioned = Math.max(...data.map(d => d.sanctioned));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['DFO', 'Applications', 'Approved', 'Approval Rate', 'Sanctioned (₹ Cr)', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.name} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2 px-2 font-medium text-gray-800 whitespace-nowrap">{row.name}</td>
              <td className="py-2 px-2 tabular-nums text-gray-700">{row.applications.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 tabular-nums text-gray-700">{row.approved.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 w-32">
                <ProgressBar value={row.approvalRate} color="green" labelSuffix="%" />
              </td>
              <td className="py-2 px-2 w-32">
                <ProgressBar value={Math.round((row.sanctioned / Math.max(maxSanctioned, 1)) * 100)} color="navy" showLabel={false} />
                <span className="text-[10px] text-gray-500">{row.sanctioned.toFixed(2)}</span>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full bg-orange-400" style={{ width: `${Math.round((row.employment / 1000) * 56)}px` }} />
                  <span className="tabular-nums text-gray-700">{row.employment.toLocaleString('en-IN')}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function SchemePerformancePage() {
  const navigate = useNavigate();

// Filter state — drives all data below
  const [month,  setMonth]  = useState('May 2025');
  const [scheme, setScheme] = useState('pmegp');

  /**
   * useMemo re-derives data whenever scheme or month changes.
   *
   * TO CONNECT REAL API:
   * Replace `useState` + `useMemo` with `useState([])` + `useEffect`:
   *
   *   const [kpis, setKpis] = useState(null);
   *   useEffect(() => {
   *     fetch(`/api/schemes/${scheme}/kpis?month=${month}`)
   *       .then(r => r.json()).then(setKpis);
   *   }, [scheme, month]);
   */
  const kpis        = useMemo(() => getNationalKPIs(scheme, month),       [scheme, month]);
  const stateData   = useMemo(() => getStatePerformance(scheme, month),   [scheme, month]);
  const topDFOs     = useMemo(() => getTopDFOs(scheme, month),            [scheme, month]);
  const bottomDFOs  = useMemo(() => getBottomDFOs(scheme, month),         [scheme, month]);
  const kaDFOs      = useMemo(() => getKarnatakaDFOs(scheme, month),      [scheme, month]);
  const trendData   = useMemo(() => getTrendData(scheme, month),          [scheme, month]);
  const insights    = useMemo(() => getInsights(scheme, month),           [scheme, month]);

  const meta = SCHEME_META[scheme];

  // Trend legend: last 3 months shown in chart
  const trendMonths = trendData.map(d => d.month);

  return (
    <>
      <TopBar
        title="MSME Scheme Performance Dashboard"
        subtitle="Scheme Level View"
        month={month}
        onMonth={setMonth}
      />

      <main className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* ── Scheme selector ───────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 grid grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Select Scheme
            </label>
            <div className="relative">
              <select
                value={scheme}
                onChange={e => setScheme(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SCHEMES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              About {scheme.toUpperCase()} Scheme
            </label>
            <p className="text-xs text-gray-600 leading-relaxed">{meta?.description}</p>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Scheme Owner
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Globe size={14} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{meta?.owner}</p>
                <p className="text-[10px] text-gray-500">{meta?.ownerFull}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── National KPIs ──────────────────────────────────── */}
        <section>
          <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            National Level Performance ({month})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {KPI_CONFIG.map(({ key, icon, iconBg }) => (
              kpis?.[key] ? <KPICard key={key} kpi={kpis[key]} icon={icon} iconBg={iconBg} /> : null
            ))}
          </div>
        </section>

        {/* ── State table + Top/Bottom DFOs ─────────────────── */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader
              title={`State Level Performance (${month})`}
              action="View all States"
              onAction={() => navigate('/state-performance')}
            />
            <StateTable data={stateData} />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
              <SectionHeader
                title="Top 5 DFOs (By Applications)"
                action="View all DFOs"
                onAction={() => navigate('/dfo-performance')}
              />
              <DFORankedTable data={topDFOs} variant="top" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
              <SectionHeader
                title="Bottom 5 DFOs (By Applications)"
                action="View all DFOs"
                onAction={() => navigate('/dfo-performance')}
              />
              <DFORankedTable data={bottomDFOs} variant="bottom" />
            </div>
          </div>
        </div>

        {/* ── Karnataka DFO table + Insights ────────────────── */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader
              title={`DFO Performance in Karnataka (${month})`}
              action="View all DFOs in Karnataka"
              onAction={() => navigate('/dfo-performance')}
            />
            <KarnatakaTable data={kaDFOs} />
          </div>

          <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader title="Key Insights & Recommendations" />
            <div className="space-y-2">
              {insights.map((ins, i) => <InsightItem key={i} type={ins.type} text={ins.text} />)}
            </div>
          </div>
        </div>

        {/* ── Trend charts ───────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader
            title={`${scheme.toUpperCase()} Performance Trend (Last 3 Months)`}
            action="View Detailed Trend Analysis"
            onAction={() => {}}
          />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-1">
            {TREND_CHARTS.map(c => (
              <TrendBarChart
                key={c.dataKey}
                data={trendData}
                dataKey={c.dataKey}
                color={c.color}
                label={c.label}
                formatter={c.formatter}
              />
            ))}
          </div>
          {/* Dynamic legend */}
          <div className="flex gap-5 mt-3 justify-center">
            {trendMonths.map((m, i) => {
              const shades = ['bg-blue-200', 'bg-blue-500', 'bg-blue-900'];
              return (
                <div key={m} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${shades[i]}`} />
                  <span className="text-[10px] text-gray-500">{m}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-gray-400 mt-2 text-center">
            Note: Data is dummy and for illustrative purposes only.
          </p>
        </div>

      </main>
    </>
  );
}
