import { useState, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Users, IndianRupee, Briefcase, Clock, ChevronDown,
  UserRound, ShieldCheck, TrendingUp, ArrowRight,
  Calendar, BarChart2, Building2, Database, Globe,
} from 'lucide-react';

import TopBar from '@/components/layout/TopBar';
import KPICard from '@/components/ui/KPICard';
import SectionHeader from '@/components/ui/SectionHeader';
import InsightItem from '@/components/ui/InsightItem';
import ProgressBar from '@/components/ui/ProgressBar';
import StateTable from '@/components/tables/StateTable';
import DFORankedTable from '@/components/tables/DFORankedTable';
import TrendBarChart from '@/components/charts/TrendBarChart';

import {
  SCHEMES, SCHEME_META,
  getNationalKPIs, getStatePerformance,
  getTopDFOs, getBottomDFOs,
  getKarnatakaDFOs, getTrendData, getInsights,
  getAnnualKPIs, getAnnualTrend,
} from '@/data/schemeData';

// KPI Configuration map for rendering metric cards
const KPI_CONFIG = [
  { key: 'totalApplications',    icon: Users,       iconBg: 'bg-blue-700' },
  { key: 'applicationsApproved', icon: ShieldCheck, iconBg: 'bg-emerald-600' },
  { key: 'marginMoneySanctioned',icon: IndianRupee, iconBg: 'bg-blue-900' },
  { key: 'employmentProposed',   icon: Briefcase,   iconBg: 'bg-orange-500' },
  { key: 'approvalRate',         icon: TrendingUp,  iconBg: 'bg-teal-600' },
  { key: 'avgProcessingTime',    icon: Clock,       iconBg: 'bg-red-500' },
];

const YEAR_OPTIONS = ['2026', '2025'];

const SCHEME_OPTIONS = [
  { id: 'all', label: 'All' },
  ...SCHEMES.filter(s => s.id !== 'mudra'),
];

const ALL_SCHEME_META = {
  description: 'Overview of all active MSME schemes in a combined view.',
  owner: 'MSME',
  ownerFull: 'Aggregated scheme overview',
};

// Static mock data for the various charts and tables
const SCHEME_DISTRIBUTION = {
  pmegp:  [
    { scheme: 'PMEGP',          value: 14135, color: '#1e3a8a' },
    { scheme: 'PM Vishwakarma', value: 9820,  color: '#3b82f6' },
    { scheme: 'SFURTI',         value: 2871,  color: '#6366f1' },
    { scheme: 'MUDRA',          value: 8856,  color: '#0ea5e9' },
    { scheme: 'ZED Cert.',      value: 3240,  color: '#22d3ee' },
  ],
  mudra:  [
    { scheme: 'Shishu Loans',  value: 88420, color: '#1e3a8a' },
    { scheme: 'Kishore Loans', value: 72640, color: '#3b82f6' },
    { scheme: 'Tarun Loans',   value: 59300, color: '#6366f1' },
  ],
  sfurti: [
    { scheme: 'Traditional',  value: 1840, color: '#1e3a8a' },
    { scheme: 'Agro-based',   value: 620,  color: '#3b82f6' },
    { scheme: 'Handloom',     value: 411,  color: '#6366f1' },
  ],
};

const ENTERPRISE_TYPE = {
  pmegp:  [
    { label: 'General', value: 66.4, count: '5.92 Lakh', color: '#1e3a8a' },
    { label: 'OBC',     value: 17.7, count: '1.58 Lakh', color: '#3b82f6' },
    { label: 'SC',      value: 10.4, count: '0.98 Lakh', color: '#6366f1' },
    { label: 'ST',      value: 6.5,  count: '0.58 Lakh', color: '#93c5fd' },
  ],
  mudra:  [
    { label: 'Shishu',  value: 40, count: '35.4 Lakh', color: '#1e3a8a' },
    { label: 'Kishore', value: 33, count: '29.2 Lakh', color: '#3b82f6' },
    { label: 'Tarun',   value: 27, count: '23.9 Lakh', color: '#93c5fd' },
  ],
  sfurti: [
    { label: 'Traditional', value: 64, count: '11.7K', color: '#1e3a8a' },
    { label: 'Agro-based',  value: 22, count: '4.0K',  color: '#3b82f6' },
    { label: 'Handloom',    value: 14, count: '2.6K',  color: '#93c5fd' },
  ],
};

const TOP_SCHEMES_DATA = {
  pmegp: [
    { rank: 1, name: 'PMEGP',           beneficiaries: '7.95 Lakh', sanctioned: '₹4,650 Cr', employment: '12.60 Lakh' },
    { rank: 2, name: 'PM Vishwakarma',  beneficiaries: '1.82 Lakh', sanctioned: '₹1,930 Cr', employment: '9.11 Lakh' },
    { rank: 3, name: 'CGTMSE',          beneficiaries: '1.18 Lakh', sanctioned: '₹5,630 Cr', employment: '8.25 Lakh' },
    { rank: 4, name: 'MUDRA Loans',     beneficiaries: '1.60 Lakh', sanctioned: '₹1,650 Cr', employment: '6.30 Lakh' },
    { rank: 5, name: 'ZED Cert.',       beneficiaries: '0.72 Lakh', sanctioned: '₹70 Cr',    employment: '2.99 Lakh' },
  ],
  mudra: [
    { rank: 1, name: 'Shishu Loans',   beneficiaries: '8.84 Lakh', sanctioned: '₹2,200 Cr', employment: '9.50 Lakh' },
    { rank: 2, name: 'Kishore Loans',  beneficiaries: '7.26 Lakh', sanctioned: '₹3,800 Cr', employment: '7.80 Lakh' },
    { rank: 3, name: 'Tarun Loans',    beneficiaries: '5.93 Lakh', sanctioned: '₹5,100 Cr', employment: '6.10 Lakh' },
    { rank: 4, name: 'PM Vishwakarma', beneficiaries: '1.82 Lakh', sanctioned: '₹1,930 Cr', employment: '3.40 Lakh' },
    { rank: 5, name: 'PMEGP',          beneficiaries: '0.95 Lakh', sanctioned: '₹920 Cr',   employment: '2.10 Lakh' },
  ],
  sfurti: [
    { rank: 1, name: 'Traditional Clusters', beneficiaries: '1.84 Lakh', sanctioned: '₹410 Cr', employment: '4.20 Lakh' },
    { rank: 2, name: 'Agro-based Clusters',  beneficiaries: '0.62 Lakh', sanctioned: '₹180 Cr', employment: '1.90 Lakh' },
    { rank: 3, name: 'Handloom Clusters',    beneficiaries: '0.41 Lakh', sanctioned: '₹120 Cr', employment: '1.30 Lakh' },
    { rank: 4, name: 'Food Processing',      beneficiaries: '0.28 Lakh', sanctioned: '₹90 Cr',  employment: '0.80 Lakh' },
    { rank: 5, name: 'Leather Clusters',     beneficiaries: '0.15 Lakh', sanctioned: '₹55 Cr',  employment: '0.45 Lakh' },
  ],
};

const STATE_RANKED = {
  pmegp: {
    top: [
      { state: 'Uttar Pradesh', beneficiaries: '1.38 Lakh', sanctioned: '₹2,459', dfos: 75, employment: '3.20 Lakh' },
      { state: 'Maharashtra',   beneficiaries: '0.94 Lakh', sanctioned: '₹1,635', dfos: 36, employment: '1.88 Lakh' },
      { state: 'Karnataka',     beneficiaries: '0.90 Lakh', sanctioned: '₹986',   dfos: 30, employment: '1.45 Lakh' },
      { state: 'Tamil Nadu',    beneficiaries: '0.73 Lakh', sanctioned: '₹872',   dfos: 32, employment: '1.32 Lakh' },
      { state: 'Rajasthan',     beneficiaries: '0.61 Lakh', sanctioned: '₹650',   dfos: 36, employment: '0.98 Lakh' },
    ],
    bottom: [
      { state: 'Mizoram',       beneficiaries: '320',  sanctioned: '₹15',  dfos: 8,  employment: '1,040' },
      { state: 'Nagaland',      beneficiaries: '410',  sanctioned: '₹19',  dfos: 7,  employment: '1,230' },
      { state: 'Arunachal Pr.', beneficiaries: '460',  sanctioned: '₹22',  dfos: 11, employment: '1,380' },
      { state: 'Sikkim',        beneficiaries: '483',  sanctioned: '₹28',  dfos: 5,  employment: '1,449' },
      { state: 'Lakshadweep',   beneficiaries: '520',  sanctioned: '₹26',  dfos: 3,  employment: '1,560' },
    ],
  },
};

const YEARLY_SUMMARY = {
  pmegp: [
    { fy: 'FY 2020-21', applications: '1,05,240',  approvals: '60,840',   approvalRate: '63.4%', sanctioned: '₹2,580 Cr', employment: '2,05,800' },
    { fy: 'FY 2021-22', applications: '1,14,820',  approvals: '73,150',   approvalRate: '63.7%', sanctioned: '₹2,840 Cr', employment: '2,28,300' },
    { fy: 'FY 2022-23', applications: '1,28,450',  approvals: '82,760',   approvalRate: '64.4%', sanctioned: '₹3,320 Cr', employment: '2,54,700' },
    { fy: 'FY 2023-24', applications: '1,39,810',  approvals: '90,620',   approvalRate: '64.8%', sanctioned: '₹3,680 Cr', employment: '2,79,200' },
    { fy: 'FY 2024-25', applications: '1,49,530',  approvals: '98,140',   approvalRate: '65.6%', sanctioned: '₹3,965 Cr', employment: '3,01,850' },
    { fy: 'FY 2025-26', applications: '1,58,640',  approvals: '1,04,780', approvalRate: '66.1%', sanctioned: '₹4,182 Cr', employment: '3,21,850' },
  ],
};

// 6-month multi-line trend (with variance so lines don't overlap)
const MONTHLY_TREND_6M = {
  pmegp: [
    { month: 'Dec', registered: 24.10, beneficiary: 8.20, sanctioned: 1180, employment: 38.4 },
    { month: 'Jan', registered: 24.25, beneficiary: 8.45, sanctioned: 1250, employment: 38.8 },
    { month: 'Feb', registered: 24.90, beneficiary: 8.30, sanctioned: 1210, employment: 39.5 },
    { month: 'Mar', registered: 25.10, beneficiary: 8.62, sanctioned: 1320, employment: 40.2 },
    { month: 'Apr', registered: 25.80, beneficiary: 8.70, sanctioned: 1290, employment: 41.8 },
    { month: 'May', registered: 26.45, beneficiary: 8.92, sanctioned: 1432, employment: 42.78 },
  ],
  mudra: [
    { month: 'Dec', registered: 22.0, beneficiary: 7.5, sanctioned: 1100, employment: 35.0 },
    { month: 'Jan', registered: 22.2, beneficiary: 7.9, sanctioned: 1180, employment: 35.5 },
    { month: 'Feb', registered: 22.8, beneficiary: 7.7, sanctioned: 1160, employment: 36.8 },
    { month: 'Mar', registered: 23.5, beneficiary: 8.1, sanctioned: 1280, employment: 37.5 },
    { month: 'Apr', registered: 23.9, beneficiary: 8.0, sanctioned: 1250, employment: 38.6 },
    { month: 'May', registered: 24.5, beneficiary: 8.5, sanctioned: 1350, employment: 40.0 },
  ],
  sfurti: [
    { month: 'Dec', registered: 18.0, beneficiary: 5.5, sanctioned: 800, employment: 28.0 },
    { month: 'Jan', registered: 18.2, beneficiary: 5.9, sanctioned: 850, employment: 28.5 },
    { month: 'Feb', registered: 18.8, beneficiary: 5.7, sanctioned: 830, employment: 29.8 },
    { month: 'Mar', registered: 19.5, beneficiary: 6.2, sanctioned: 910, employment: 30.5 },
    { month: 'Apr', registered: 19.8, beneficiary: 6.1, sanctioned: 890, employment: 31.6 },
    { month: 'May', registered: 20.5, beneficiary: 6.7, sanctioned: 950, employment: 33.0 },
  ],
};

// Sub-components
function RankBadge({ rank }) {
  const cls = rank === 1 ? 'bg-amber-100 text-amber-700'
            : rank === 2 ? 'bg-slate-100 text-slate-600'
            : rank === 3 ? 'bg-orange-100 text-orange-600'
            : 'bg-gray-100 text-gray-500';
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${cls}`}>
      {rank}
    </span>
  );
}

/** Static action button */
function ActionBtn({ children }) {
  return (
    <button type="button"
      className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold text-[#0d1f4c] tracking-wider border border-[#0d1f4c]/20 rounded-md bg-white hover:bg-gray-100 transition-colors">
      {children} <ArrowRight size={12} strokeWidth={3} />
    </button>
  );
}

/** Top 5 Schemes ranked table */
function TopSchemesTable({ data }) {
  if (!data?.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['#', 'Scheme Name', 'Beneficiaries', 'Sanctioned', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.rank} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2.5 px-2"><RankBadge rank={row.rank} /></td>
              <td className="py-2.5 px-2 font-semibold text-gray-800 text-[12px]">{row.name}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-700 text-[12px] font-medium">{row.beneficiaries}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-600 text-[11px]">{row.sanctioned}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-600 text-[11px]">{row.employment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Compact Top/Bottom 5 States table */
function StateRankedTable({ data, variant = 'top' }) {
  if (!data?.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['State', 'Beneficiaries', 'Sanctioned', 'DFOs', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.state} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2.5 px-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    variant === 'top'
                      ? (i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-slate-100 text-slate-600' : 'bg-gray-100 text-gray-500')
                      : 'bg-red-50 text-red-500'
                  }`}>{i + 1}</span>
                  <span className="font-semibold text-gray-800 text-[12px]">{row.state}</span>
                </div>
              </td>
              <td className="py-2.5 px-2 tabular-nums text-gray-700 text-[12px] font-medium">{row.beneficiaries}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-600 text-[11px]">{row.sanctioned}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-600 text-[11px]">{row.dfos}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-600 text-[11px]">{row.employment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Karnataka DFO table with progress bars */
function KarnatakaTable({ data }) {
  if (!data?.length) return <p className="text-xs text-gray-400 py-4 text-center">No data available</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['DFO', 'Applications', 'Approved', 'Approval Rate', 'Sanctioned (₹ Cr)', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.name} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2.5 px-2 font-medium text-gray-800 whitespace-nowrap text-[12px]">{row.name}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-700 text-[12px]">{row.applications.toLocaleString('en-IN')}</td>
              <td className="py-2.5 px-2 tabular-nums text-gray-700 text-[12px]">{row.approved.toLocaleString('en-IN')}</td>
              <td className="py-2.5 px-2 w-28"><ProgressBar value={row.approvalRate} color="green" labelSuffix="%" /></td>
              <td className="py-2.5 px-2 w-36">
                <div className="flex items-center gap-2">
                  <div className="w-16 flex-shrink-0">
                    <ProgressBar value={Math.round((row.sanctioned / Math.max(...data.map(d => d.sanctioned), 1)) * 100)} color="navy" showLabel={false} />
                  </div>
                  <span className="text-[11px] text-gray-500">{row.sanctioned.toFixed(2)}</span>
                </div>
              </td>
              <td className="py-2.5 px-2 tabular-nums text-gray-700 text-[12px]">{row.employment.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Horizontal bar chart for Beneficiaries by Scheme */
function SchemeDistributionChart({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[11px] text-gray-600 w-28 shrink-0 truncate text-right font-medium">{d.scheme}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
            <div className="h-full rounded-sm transition-all duration-500"
              style={{ width: `${max > 0 ? Math.round((d.value / max) * 100) : 0}%`, backgroundColor: d.color }} />
          </div>
          <span className="text-[11px] font-semibold text-gray-700 tabular-nums w-16 shrink-0">
            {d.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  );
}

/** SVG multi-line trend chart (6 months, 4 lines) with hover tooltips */
function MultiLineTrendChart({ data }) {
  const [tooltip, setTooltip] = useState(null);
  if (!data?.length) return null;

  const W = 380, H = 160, PAD = { t: 14, r: 10, b: 30, l: 10 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const n = data.length;

  const LINES = [
    { key: 'registered',  label: 'Registered MSMEs (Lakh)', color: '#1e3a8a', unit: 'Lakh' },
    { key: 'beneficiary', label: 'Beneficiary MSMEs (Lakh)', color: '#059669', unit: 'Lakh' },
    { key: 'sanctioned',  label: 'Sanctioned Amount (₹ Cr)', color: '#7c3aed', unit: '₹ Cr' },
    { key: 'employment',  label: 'Employment (Lakh)',        color: '#d97706', unit: 'Lakh' },
  ];

  const norm = (vals) => {
    const mnOrig = Math.min(...vals), mxOrig = Math.max(...vals);
    const range = mxOrig - mnOrig;
    const mn = mnOrig - range * 0.15;
    const mx = mxOrig + range * 0.15;
    return vals.map(v => range === 0 ? 0.5 : (v - mn) / (mx - mn));
  };

  const pts = (key) => {
    const vals = data.map(d => d[key]);
    return norm(vals).map((n, i) => ({
      x: PAD.l + (i / (data.length - 1)) * innerW,
      y: PAD.t + (1 - n) * innerH,
      raw: vals[i],
    }));
  };

  const pathD = (points) =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H, overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const y = PAD.t + t * innerH;
          return <line key={t} x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {/* Month labels */}
        {data.map((d, i) => (
          <text key={i} x={PAD.l + (i / (n - 1)) * innerW} y={H - 6}
            textAnchor="middle" fontSize={11} fill="#9ca3af">{d.month}</text>
        ))}
        {/* Lines + dots */}
        {LINES.map(l => {
          const points = pts(l.key);
          return (
            <g key={l.key}>
              <path d={pathD(points)} fill="none" stroke={l.color} strokeWidth={2.5} strokeLinejoin="round" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={5} fill={l.color} stroke="white" strokeWidth={1.5}
                  className="cursor-pointer"
                  onMouseEnter={() => setTooltip({ x: p.x, y: p.y, label: l.label, val: p.raw, unit: l.unit, color: l.color })}
                  onMouseLeave={() => setTooltip(null)} />
              ))}
            </g>
          );
        })}
        {/* Tooltip */}
        {tooltip && (() => {
          const tw = 110, th = 34;
          const tx = Math.min(Math.max(tooltip.x - tw / 2, 4), W - tw - 4);
          const ty = tooltip.y - th - 10 < 0 ? tooltip.y + 12 : tooltip.y - th - 10;
          return (
            <g>
              <rect x={tx} y={ty} width={tw} height={th} rx={5} fill={tooltip.color} opacity={0.95} />
              <text x={tx + tw / 2} y={ty + 12} textAnchor="middle" fontSize={9} fill="white" opacity={0.85}>
                {tooltip.label.split(' (')[0]}
              </text>
              <text x={tx + tw / 2} y={ty + 25} textAnchor="middle" fontSize={12} fill="white" fontWeight="bold">
                {tooltip.val.toFixed(2)} {tooltip.unit}
              </text>
            </g>
          );
        })()}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2">
        {LINES.map(l => (
          <div key={l.key} className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full" style={{ backgroundColor: l.color }} />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: l.color, boxShadow: `0 0 0 1px ${l.color}` }} />
            <span className="text-[11px] text-gray-600">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** SVG donut chart (larger) */
function DonutChart({ data, totalLabel = '8.92', totalSub = 'Lakh' }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumPct = 0;
  const r = 52, circ = 2 * Math.PI * r, cx = 70, cy = 70;

  return (
    <div className="flex items-center gap-6">
      <svg width={140} height={140} className="shrink-0">
        {data.map((d, i) => {
          const pct = d.value / total;
          const dash = pct * circ;
          const offset = (1 - cumPct) * circ;
          cumPct += pct;
          return (
            <circle key={i} cx={cx} cy={cy} r={r}
              fill="none" stroke={d.color} strokeWidth={18}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`} />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={16} fontWeight="bold" fill="#0d1f4c">{totalLabel}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize={11} fill="#6b7280">{totalSub}</text>
      </svg>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[12px] text-gray-700 font-medium">{d.label}</span>
            <span className="text-[12px] font-bold text-gray-800 ml-auto tabular-nums pl-3">{d.count ?? `${d.value}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Annual year-wise combo chart (bars + line) with hover tooltip */
function AnnualTrendChart({ data }) {
  const [tooltip, setTooltip] = useState(null);
  if (!data?.length) return null;

  const W = 700, H = 200, PAD = { t: 16, r: 20, b: 36, l: 60 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const n = data.length;
  const groupW = innerW / n;
  const bw = Math.min(28, groupW * 0.35);

  const apps = data.map(d => parseInt(d.applications.replace(/,/g, ''), 10) || 0);
  const aprs = data.map(d => parseInt(d.approvals.replace(/,/g, ''), 10)   || 0);
  const sanc = data.map(d => parseFloat(d.sanctioned.replace(/[₹,\s]/g, '').replace('Cr', '')) || 0);

  const maxBar  = Math.max(...apps, ...aprs);
  const maxLine = Math.max(...sanc);
  const minLine = Math.min(...sanc);

  const barScaleH = (v) => (v / maxBar)  * innerH;
  const lineScaleY = (v) => PAD.t + (1 - (v - minLine) / (maxLine - minLine || 1)) * innerH;
  const groupCx    = (i) => PAD.l + i * groupW + groupW / 2;
  const linePath   = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${groupCx(i).toFixed(1)} ${lineScaleY(sanc[i]).toFixed(1)}`).join(' ');

  // Y axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: PAD.t + (1 - t) * innerH,
    val: Math.round(maxBar * t / 1000) + 'K',
  }));

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H, overflow: 'visible' }}>
        {/* Grid + y-axis labels */}
        {yTicks.map(({ y, val }) => (
          <g key={val}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={1} />
            <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{val}</text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = groupCx(i);
          const appH = barScaleH(apps[i]);
          const aprH = barScaleH(aprs[i]);
          const appX = cx - bw - 2;
          const aprX = cx + 2;
          return (
            <g key={i}>
              <rect x={appX} y={PAD.t + innerH - appH} width={bw} height={appH} fill="#1e3a8a" rx={3} opacity={0.85}
                onMouseEnter={() => setTooltip({ x: cx, y: PAD.t + innerH - appH - 6, lines: [
                  { label: d.fy, val: '', color: '#1e3a8a' },
                  { label: 'Applications', val: d.applications, color: '#1e3a8a' },
                  { label: 'Approvals', val: d.approvals, color: '#059669' },
                  { label: 'Sanctioned', val: d.sanctioned, color: '#7c3aed' },
                  { label: 'Rate', val: d.approvalRate, color: '#059669' },
                ]})}
                onMouseLeave={() => setTooltip(null)} className="cursor-pointer" />
              <rect x={aprX} y={PAD.t + innerH - aprH} width={bw} height={aprH} fill="#059669" rx={3} opacity={0.85}
                onMouseEnter={() => setTooltip({ x: cx, y: PAD.t + innerH - aprH - 6, lines: [
                  { label: d.fy, val: '', color: '#1e3a8a' },
                  { label: 'Applications', val: d.applications, color: '#1e3a8a' },
                  { label: 'Approvals', val: d.approvals, color: '#059669' },
                  { label: 'Sanctioned', val: d.sanctioned, color: '#7c3aed' },
                  { label: 'Rate', val: d.approvalRate, color: '#059669' },
                ]})}
                onMouseLeave={() => setTooltip(null)} className="cursor-pointer" />
              <text x={cx} y={H - 8} textAnchor="middle" fontSize={10} fill="#6b7280">{d.fy.slice(3)}</text>
            </g>
          );
        })}

        {/* Sanctioned Amount line */}
        <path d={linePath} fill="none" stroke="#7c3aed" strokeWidth={2.5} strokeLinejoin="round" />
        {sanc.map((v, i) => (
          <circle key={i} cx={groupCx(i)} cy={lineScaleY(v)} r={5} fill="#7c3aed" stroke="white" strokeWidth={1.5}
            className="cursor-pointer"
            onMouseEnter={() => setTooltip({ x: groupCx(i), y: lineScaleY(v) - 6, lines: [
              { label: data[i].fy, val: '', color: '#7c3aed' },
              { label: 'Sanctioned', val: data[i].sanctioned, color: '#7c3aed' },
              { label: 'Approval Rate', val: data[i].approvalRate, color: '#059669' },
            ]})}
            onMouseLeave={() => setTooltip(null)} />
        ))}

        {/* Tooltip */}
        {tooltip && (() => {
          const th = 16 + tooltip.lines.length * 16;
          const tw = 130;
          const tx = Math.min(Math.max(tooltip.x - tw / 2, 2), W - tw - 2);
          const ty = tooltip.y - th < 0 ? tooltip.y + 10 : tooltip.y - th;
          return (
            <g>
              <rect x={tx} y={ty} width={tw} height={th} rx={6} fill="#1e293b" opacity={0.95} />
              {tooltip.lines.map((line, li) => (
                <g key={li}>
                  {line.val && <circle cx={tx + 10} cy={ty + 10 + li * 16} r={3} fill={line.color} />}
                  <text
                    x={line.val ? tx + 18 : tx + tw / 2}
                    y={ty + 14 + li * 16}
                    textAnchor={line.val ? 'start' : 'middle'}
                    fontSize={line.val ? 10 : 11}
                    fill="white"
                    fontWeight={li === 0 ? 'bold' : 'normal'}
                    opacity={li === 0 ? 1 : 0.85}
                  >
                    {line.val ? `${line.label}: ${line.val}` : line.label}
                  </text>
                </g>
              ))}
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

/** Annual yearly summary table */
function YearlySummaryTable({ data }) {
  if (!data?.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['Financial Year', 'Applications', 'Approvals', 'Approval Rate', 'Sanctioned Amount', 'Employment'].map(h => (
              <th key={h} className="text-left py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.fy} className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors ${i === data.length - 1 ? 'bg-blue-50/30' : ''}`}>
              <td className="py-2.5 px-3 font-semibold text-gray-800 text-[12px]">{row.fy}</td>
              <td className="py-2.5 px-3 tabular-nums text-gray-700 text-[12px]">{row.applications}</td>
              <td className="py-2.5 px-3 tabular-nums text-gray-700 text-[12px]">{row.approvals}</td>
              <td className="py-2.5 px-3 tabular-nums text-emerald-700 font-bold text-[12px]">{row.approvalRate}</td>
              <td className="py-2.5 px-3 tabular-nums text-gray-700 text-[12px]">{row.sanctioned}</td>
              <td className="py-2.5 px-3 tabular-nums text-gray-700 text-[12px]">{row.employment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SchemePerformancePage() {
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState('all');
  const [viewMode, setViewMode] = useState('monthly');
  const [month, setMonth]   = useState('July 2026');
  const [annualYear, setAnnualYear] = useState('2026');

  const meta      = scheme === 'all' ? ALL_SCHEME_META : SCHEME_META?.[scheme];
  const schemeLabel = scheme === 'all' ? 'All Schemes' : scheme.toUpperCase();
  const isAnnual  = viewMode === 'annual';
  const fyLabel   = annualYear === '2026' ? 'FY 2025-26 (YTD)' : 'FY 2024-25';

  // Data
  const activeKPIs = useMemo(() => isAnnual ? getAnnualKPIs(scheme, annualYear) : getNationalKPIs(scheme, month), [scheme, month, isAnnual, annualYear]);
  const stateData  = useMemo(() => getStatePerformance(scheme, isAnnual ? annualYear : month), [scheme, month, isAnnual, annualYear]);
  const topDFOs    = useMemo(() => getTopDFOs(scheme, isAnnual ? annualYear : month), [scheme, isAnnual, month, annualYear]);
  const bottomDFOs = useMemo(() => getBottomDFOs(scheme, isAnnual ? annualYear : month), [scheme, isAnnual, month, annualYear]);
  const kaDFOs     = useMemo(() => getKarnatakaDFOs(scheme, month), [scheme, month]);
  const insights   = useMemo(() => getInsights(scheme, month), [scheme, month]);

  const schemeDist = SCHEME_DISTRIBUTION[scheme] ?? SCHEME_DISTRIBUTION.pmegp;
  const entType    = ENTERPRISE_TYPE[scheme]     ?? ENTERPRISE_TYPE.pmegp;
  const topSchemes = TOP_SCHEMES_DATA[scheme]    ?? TOP_SCHEMES_DATA.pmegp;
  const stateTop5  = (STATE_RANKED[scheme] ?? STATE_RANKED.pmegp).top;
  const stateBot5  = (STATE_RANKED[scheme] ?? STATE_RANKED.pmegp).bottom;
  const trend6m    = MONTHLY_TREND_6M[scheme]    ?? MONTHLY_TREND_6M.pmegp;
  const yearlySumm = YEARLY_SUMMARY[scheme]      ?? YEARLY_SUMMARY.pmegp;

  return (
    <>
      <TopBar
        title="MSME Scheme Performance Dashboard"
        subtitle="Scheme Level View"
        month={month}
        onMonth={setMonth}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-3 lg:p-5 space-y-3">

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 grid grid-cols-2 lg:grid-cols-5 gap-2">

          {/* Scheme picker */}
          <div className="p-3 border border-gray-200 rounded-lg">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Select Scheme</label>
            <div className="relative">
              <select value={scheme} onChange={e => setScheme(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {SCHEME_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* About */}
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">About {schemeLabel}</label>
            <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{meta?.description}</p>
          </div>

          {/* Data Coverage */}
          <div className="border border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Data Coverage
            </label>
            <div className="flex gap-5 justify-center">
              <div>
                <p className="text-[20px] font-bold text-[#0d1f4c] leading-tight">36</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-wide">States</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#0d1f4c] leading-tight">738</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-wide">DFOs</p>
              </div>
            </div>
          </div>

          {/* Scheme Owner */}
          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Scheme Owner</label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <UserRound size={18} className="text-blue-700" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-800">{meta?.owner}</p>
                <p className="text-[9px] text-gray-500 leading-tight">{meta?.ownerFull}</p>
              </div>
            </div>
          </div>

          {/* View toggle + Data Source */}
          <div className="border border-gray-200 rounded-lg p-3 flex flex-col gap-2 col-span-2 lg:col-span-1">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">View Mode</label>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-full">
              <button onClick={() => setViewMode('monthly')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all ${!isAnnual ? 'bg-white shadow text-[#0d1f4c]' : 'text-gray-400 hover:text-gray-600'}`}>
                <Calendar size={12} /> Monthly
              </button>
              <button onClick={() => setViewMode('annual')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all ${isAnnual ? 'bg-white shadow text-[#0d1f4c]' : 'text-gray-400 hover:text-gray-600'}`}>
                <BarChart2 size={12} /> Annual
              </button>
            </div>
            {isAnnual && (
              <div className="relative">
                <select value={annualYear} onChange={e => setAnnualYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium appearance-none pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {YEAR_OPTIONS.map(y => (
                    <option key={y} value={y}>{y === '2026' ? 'FY 2025-26 (YTD)' : 'FY 2024-25'}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            )}
            <div className="flex items-center gap-1.5 mt-auto">
              <Database size={10} className="text-gray-400 flex-shrink-0" />
              <span className="text-[9px] text-gray-400 leading-tight">PMEGP Portal &amp; Various Scheme Portals</span>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {KPI_CONFIG.map(({ key, icon, iconBg }) => (
              activeKPIs?.[key] ? (
                <KPICard key={key} kpi={activeKPIs[key]} icon={icon} iconBg={iconBg} />
              ) : null
            ))}
          </div>
        </section>

        {!isAnnual && (
          <>
            <div className={`grid grid-cols-1 gap-3 ${scheme === 'all' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
              {scheme === 'all' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <SectionHeader title="Top 5 Schemes (By Beneficiaries)" />
                  <div className="mt-2"><TopSchemesTable data={topSchemes} /></div>
                  <div className="mt-3"><ActionBtn>View All Schemes</ActionBtn></div>
                </div>
              )}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Top 5 States (By Beneficiaries)" />
                <div className="mt-2"><StateRankedTable data={stateTop5} variant="top" /></div>
                <div className="mt-3"><ActionBtn>View All States</ActionBtn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Bottom 5 States (By Beneficiaries)" />
                <div className="mt-2"><StateRankedTable data={stateBot5} variant="bottom" /></div>
                <div className="mt-3"><ActionBtn>View All States</ActionBtn></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title={`Beneficiaries by Scheme (${month})`} />
                <div className="mt-3"><SchemeDistributionChart data={schemeDist} /></div>
                <div className="mt-3"><ActionBtn>View All Schemes</ActionBtn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Trend Overview (Last 6 Months)" />
                <div className="mt-2"><MultiLineTrendChart data={trend6m} /></div>
                <div className="mt-3"><ActionBtn>View Detailed Trend</ActionBtn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Top 5 DFOs (By Beneficiaries)" />
                <DFORankedTable data={topDFOs} variant="top" />
                <div className="mt-3"><ActionBtn>View All DFOs</ActionBtn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Bottom 5 DFOs (By Beneficiaries)" />
                <DFORankedTable data={bottomDFOs} variant="bottom" />
                <div className="mt-3"><ActionBtn>View All DFOs</ActionBtn></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title={`DFO Performance in Karnataka (${month}) — By Beneficiaries`} />
                <div className="mt-2"><KarnatakaTable data={kaDFOs} /></div>
                <div className="mt-3"><ActionBtn>View All DFOs in Karnataka</ActionBtn></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <SectionHeader title={`Beneficiaries by Enterprise Type (${month})`} />
                  <div className="mt-3"><DonutChart data={entType} /></div>
                  <div className="mt-3"><ActionBtn>View Details</ActionBtn></div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
                  <SectionHeader title="Key Insights &amp; Recommendations" />
                  <div className="space-y-1.5 mt-2">
                    {insights.map((ins, i) => <InsightItem key={i} type={ins.type} text={ins.text} />)}
                  </div>
                  <div className="mt-3"><ActionBtn>View Detailed Insights</ActionBtn></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════
            ANNUAL VIEW
        ════════════════════════════════════════ */}
        {isAnnual && (
          <>
            {/* Year-wise trend + Top States */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title={`${schemeLabel} Performance — Year Wise Trend`} />
                <div className="mt-3">
                  <AnnualTrendChart data={yearlySumm} />
                </div>
                <div className="flex gap-5 mt-3 flex-wrap">
                  {[
                    { color: '#1e3a8a', label: 'Applications (Lakh)' },
                    { color: '#059669', label: 'Approvals (Lakh)' },
                    { color: '#7c3aed', label: 'Sanctioned Amount (₹ Cr)' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                      <span className="text-[11px] text-gray-600">{l.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3"><ActionBtn>View Detailed Yearly Analysis</ActionBtn></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title={`Top 5 States (By Sanctioned Amount) — ${fyLabel}`} />
                <div className="mt-2"><StateRankedTable data={stateTop5} variant="top" /></div>
                <div className="mt-3"><ActionBtn>View All States</ActionBtn></div>
              </div>
            </div>

            {/* Top 5 DFOs annual */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <SectionHeader title={`Top 5 DFOs (By Sanctioned Amount) — ${fyLabel}`} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Top 5 DFOs</p>
                  <DFORankedTable data={topDFOs} variant="top" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Bottom 5 DFOs</p>
                  <DFORankedTable data={bottomDFOs} variant="bottom" />
                </div>
              </div>
              <div className="mt-3"><ActionBtn>View All DFOs</ActionBtn></div>
            </div>

            {/* Yearly summary table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <SectionHeader title={`${schemeLabel} Performance — Yearly Summary`} />
              <div className="mt-2"><YearlySummaryTable data={yearlySumm} /></div>
              <div className="mt-3"><ActionBtn>View Detailed Yearly Analysis</ActionBtn></div>
            </div>

            {/* Category donut + Key Insights side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title={`Beneficiaries by Category — ${fyLabel}`} />
                <div className="mt-4"><DonutChart data={entType} /></div>
                <div className="mt-3"><ActionBtn>View Details</ActionBtn></div>
              </div>
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Key Insights &amp; Recommendations" />
                <div className="space-y-2 mt-2">
                  {insights.map((ins, i) => <InsightItem key={i} type={ins.type} text={ins.text} />)}
                </div>
                <div className="mt-3"><ActionBtn>View Detailed Insights</ActionBtn></div>
              </div>
            </div>
          </>
        )}

      </main>
    </>
  );
}