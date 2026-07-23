import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  Download,
  Headphones,
  Landmark,
  MapPin,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ministryText from '@/assets/ministry-text.png';
import MonthYearPicker from '@/newDashboard/components/ui/MonthYearPicker';
import {
  INTELLIGENCE_STATES,
  getAtAGlance,
  getD1TopSectors,
  getD2TopSectors,
  getGrievanceData,
  getIntelligenceKPIs,
  getNorthSouthComparison,
  getOpportunityMatrix,
  getRecommendedActions,
  getRegistrationTrend,
  getSectorHeatmap,
} from '@/newDashboard/data/dfoIntelligenceData';

const navy = '#0d1f4c';
const teal = '#0d9488';

function Panel({ children, className = '' }) {
  return (
    <section className={`bg-white border border-gray-200 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function Title({ children }) {
  return <h2 className="text-[10px] font-black leading-none text-[#0d1f4c]">{children}</h2>;
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="flex items-center gap-2 text-[9px] font-bold text-[#0d1f4c]">
      <span>{label}</span>
      <span className="relative inline-flex">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-7 min-w-[142px] appearance-none border-0 bg-transparent py-1 pl-2 pr-7 text-[9px] font-semibold text-gray-700 outline-none"
        >
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        <ChevronDown size={11} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
      </span>
    </label>
  );
}

function PreviewTopBar({ month, onMonth }) {
  return (
    <header className="relative flex h-[86px] flex-shrink-0 items-center justify-between bg-[#0d1f4c] px-5 text-white">
      <img
        src={ministryText}
        alt="Ministry of Micro, Small & Medium Enterprises"
        className="h-[64px] w-[330px] object-contain object-left"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-[21px] font-black uppercase leading-tight">DFO Intelligence & Planning Dashboard</h1>
        <p className="mt-1 text-[13px] font-semibold text-blue-200">Actionable Insights for Better Planning & Interventions</p>
      </div>
      <div className="relative z-10 flex items-center gap-3">
        <div className="rounded bg-white/95 p-2 text-[#0d1f4c] shadow-sm">
          <div className="mb-1 text-[9px] font-bold">Month</div>
          <MonthYearPicker value={month} onChange={onMonth} />
        </div>
        <button className="flex h-8 items-center gap-1.5 rounded border border-white/15 bg-white/10 px-3 text-[10px] font-semibold text-white">
          <Download size={12} />
          Download Report
        </button>
      </div>
    </header>
  );
}

function KpiStrip({ kpis, stateLabel }) {
  const districtLabel = kpis?.district ?? 'All Districts';
  const cards = [
    { label: 'District', value: districtLabel, sub: stateLabel, icon: Users, color: 'text-blue-700' },
    { label: 'Total MSMEs', value: kpis?.totalMSMEs?.toLocaleString('en-IN'), sub: 'District MSMEs', icon: MapPin, color: 'text-emerald-700' },
    { label: 'Kerala Share', value: `${kpis?.keralaShare}%`, sub: `${kpis?.districtMSMEs?.toLocaleString('en-IN')} MSMEs`, icon: MapPin, color: 'text-teal-700' },
    { label: 'Total Industries (NIC Activities)', value: kpis?.totalIndustries?.toLocaleString('en-IN'), sub: 'NIC Activities', icon: Headphones, color: 'text-indigo-700' },
    { label: 'Champion Portal Cases', value: kpis?.championPortalCases?.toLocaleString('en-IN'), sub: 'Total Cases', icon: TrendingUp, color: 'text-green-700' },
    { label: 'District Rank', value: kpis?.districtRank, sub: 'Within Kerala', icon: Landmark, color: 'text-orange-700' },
  ];

  return (
    <div className="grid grid-cols-6 gap-4 px-4 py-3">
      {cards.map(({ label, value, sub, icon: Icon, color }) => (
        <div key={label} className="flex min-w-0 items-center gap-3">
          <Icon size={32} className={`${color} flex-shrink-0`} strokeWidth={2.6} />
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold text-[#0d1f4c]">{label}</p>
            <p className="text-[18px] font-black leading-tight text-[#0d1f4c] tabular-nums">{value}</p>
            <p className="truncate text-[8px] font-bold text-gray-600">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendPanel({ data, insights, title }) {
  const peak = data.reduce((best, item) => (item.value > best.value ? item : best), data[0] ?? { value: 0 });
  const icons = [TrendingUp, AlertTriangle, Target];
  const colors = ['text-emerald-600', 'text-red-500', 'text-blue-600'];

  return (
    <Panel className="h-[182px] p-3">
      <Title>{title}</Title>
      <div className="mt-2 grid h-[148px] grid-cols-[1fr_178px] gap-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 14, right: 10, bottom: 18, left: -12 }}>
            <CartesianGrid stroke="#edf0f4" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 7, fill: '#4b5563' }} axisLine={false} tickLine={false} interval={0} tickFormatter={(value) => value.replace('\n', ' ')} />
            <YAxis tick={{ fontSize: 8, fill: '#4b5563' }} axisLine={false} tickLine={false} tickFormatter={(value) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value)} width={28} />
            <Tooltip formatter={(value) => value.toLocaleString('en-IN')} labelFormatter={(label) => label.replace('\n', ' ')} />
            <Line dataKey="value" stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 3, fill: '#1e3a8a' }} activeDot={{ r: 4 }} />
            <LabelList dataKey="value" position="top" formatter={(value) => value.toLocaleString('en-IN')} style={{ fontSize: 7, fill: '#1f2937', fontWeight: 700 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="border-l border-gray-200 pl-3">
          <p className="mb-2 text-[9px] font-black text-[#0d1f4c]">Insights</p>
          <div className="space-y-2">
            {insights.map((text, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={text} className="flex gap-2">
                  <Icon size={12} className={`${colors[index % colors.length]} mt-0.5 flex-shrink-0`} />
                  <p className="text-[8px] font-semibold leading-snug text-gray-600">{text}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[8px] font-bold text-gray-400">Peak: {peak.value?.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </Panel>
  );
}

function DistrictMetricsPanel({ d1Name, d2Name, metrics, takeaway, month }) {
  const chartData = metrics.map((item) => ({ name: item.metric, [d1Name]: item.d1, [d2Name]: item.d2 }));

  return (
    <Panel className="h-[182px] p-3">
      <Title>{d1Name} vs {d2Name} - Key Metrics ({month})</Title>
      <div className="mt-1 grid h-[152px] grid-cols-[1fr_145px] gap-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 18, right: 4, bottom: 20, left: -10 }} barGap={3}>
            <CartesianGrid stroke="#edf0f4" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 7, fill: '#4b5563' }} axisLine={false} tickLine={false} interval={0} tickFormatter={(value) => value.replace('\n', ' ')} />
            <YAxis tick={{ fontSize: 8, fill: '#4b5563' }} axisLine={false} tickLine={false} tickFormatter={(value) => (value >= 1000 ? `${Math.round(value / 1000)}K` : value)} width={30} />
            <Tooltip formatter={(value) => value.toLocaleString('en-IN')} labelFormatter={(label) => label.replace('\n', ' ')} />
            <Legend wrapperStyle={{ fontSize: 8 }} iconSize={7} />
            <Bar dataKey={d1Name} fill="#1e3a8a" barSize={15}>
              <LabelList dataKey={d1Name} position="top" formatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value)} style={{ fontSize: 7, fontWeight: 700 }} />
            </Bar>
            <Bar dataKey={d2Name} fill={teal} barSize={15}>
              <LabelList dataKey={d2Name} position="top" formatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value)} style={{ fontSize: 7, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="rounded border border-gray-200 bg-gray-50 p-2">
          <p className="mb-2 text-[8px] font-black text-[#0d1f4c]">Key Takeaway</p>
          <p className="text-[8px] font-semibold leading-snug text-gray-600">{takeaway}</p>
        </div>
      </div>
    </Panel>
  );
}

function SectorBars({ data, title, color }) {
  const max = data[0]?.count ?? 1;

  return (
    <Panel className="h-[174px] p-3">
      <div className="mb-2 flex items-center justify-between">
        <Title>{title}</Title>
        <span className="text-[8px] font-bold text-gray-500">MSME Count</span>
      </div>
      <div className="space-y-1">
        {data.slice(0, 10).map((row, index) => (
          <div key={row.sector} className="grid grid-cols-[120px_1fr_38px] items-center gap-2">
            <span className="truncate text-[8px] font-semibold text-[#0d1f4c]" title={row.sector}>{row.sector}</span>
            <span className="h-2 overflow-hidden rounded-sm bg-gray-100">
              <span className="block h-full rounded-sm" style={{ width: `${Math.max(4, Math.round((row.count / max) * 100))}%`, backgroundColor: color, opacity: 1 - index * 0.055 }} />
            </span>
            <span className="text-right text-[8px] font-bold text-gray-700 tabular-nums">{row.count.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function OpportunityPanel({ data, focusAreas }) {
  return (
    <Panel className="h-[174px] p-3">
      <Title>Opportunity Matrix (Focus Sectors)</Title>
      <div className="mt-1 grid h-[142px] grid-cols-[1fr_120px] gap-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 18, right: 10, bottom: 12, left: -14 }}>
            <CartesianGrid stroke="#e8ecf1" />
            <XAxis type="number" dataKey="enterpriseCount" domain={[0, 100]} tick={false} axisLine={false} tickLine={false} />
            <YAxis type="number" dataKey="schemePenetration" domain={[0, 100]} tick={false} axisLine={false} tickLine={false} />
            <Tooltip />
            <Scatter
              data={data}
              shape={({ cx, cy, payload }) => (
                <g>
                  <circle cx={cx} cy={cy} r={payload.size ?? 12} fill={payload.color} fillOpacity={0.9} stroke="white" strokeWidth={1.5} />
                  <text x={cx} y={cy - (payload.size ?? 12) - 4} textAnchor="middle" fontSize={7} fill="#374151" fontWeight={700}>{payload.name}</text>
                </g>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="rounded border border-gray-200 bg-gray-50 p-2">
          <div className="mb-1 flex items-center gap-1.5 text-[8px] font-black text-emerald-700">
            <Target size={10} />
            Focus Areas
          </div>
          <p className="text-[8px] font-semibold leading-snug text-gray-600">{focusAreas}</p>
        </div>
      </div>
    </Panel>
  );
}

function GrievancePanel({ data, month }) {
  const donutData = [
    { name: data.d1Name, value: data.d1, color: navy },
    { name: data.d2Name, value: data.d2, color: teal },
  ];
  const max = Math.max(...data.categories.map((item) => item.count), 1);

  return (
    <Panel className="h-[166px] p-3">
      <Title>Champion Portal Analytics ({month})</Title>
      <div className="mt-2 grid h-[132px] grid-cols-[126px_1fr_150px] gap-3">
        <div className="relative h-[104px] w-[104px] self-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={donutData} dataKey="value" innerRadius="56%" outerRadius="82%" startAngle={90} endAngle={-270} paddingAngle={2}>
                {donutData.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString('en-IN')} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[16px] font-black leading-none text-[#0d1f4c]">{data.total.toLocaleString('en-IN')}</span>
            <span className="text-[7px] font-bold text-gray-500">Total</span>
            <span className="text-[7px] font-bold text-gray-500">Grievances</span>
          </div>
        </div>
        <div className="self-center space-y-1">
          {donutData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-[8px] font-bold text-gray-600">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
              {item.name}: {item.value.toLocaleString('en-IN')} ({index === 0 ? data.d1Pct : data.d2Pct}%)
            </div>
          ))}
        </div>
        <div>
          <p className="mb-1 text-[8px] font-black text-[#0d1f4c]">Grievances by Category</p>
          <div className="space-y-1">
            {data.categories.map((item, index) => (
              <div key={item.name} className="grid grid-cols-[72px_1fr_45px] items-center gap-1.5">
                <span className="truncate text-[7px] font-semibold text-gray-600">{item.name}</span>
                <span className="h-2 rounded-sm bg-gray-100">
                  <span className="block h-full rounded-sm" style={{ width: `${Math.round((item.count / max) * 100)}%`, backgroundColor: index === 3 ? '#f97316' : index > 3 ? '#9ca3af' : navy }} />
                </span>
                <span className="text-right text-[7px] font-bold text-gray-600">{item.count} ({item.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function RecommendedActions({ actions }) {
  return (
    <Panel className="h-[166px] p-3">
      <Title>Recommended Actions</Title>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {[{ title: actions.d1Name, items: actions.d1 }, { title: actions.d2Name, items: actions.d2 }].map((group) => (
          <div key={group.title}>
            <p className="mb-1 text-[8px] font-black text-[#0d1f4c]">{group.title}</p>
            <div className="space-y-1">
              {group.items.slice(0, 4).map((item) => (
                <div key={item} className="flex gap-1.5">
                  <CheckCircle size={10} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                  <p className="text-[8px] font-semibold leading-snug text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AtAGlance({ data }) {
  const rows = [
    ['Population (Goa)', data.population],
    ['Total Districts', data.districts],
    ['Sub-Districts', data.subDistricts],
    ['Blocks', data.blocks],
    ['Villages', data.villages],
  ];

  return (
    <Panel className="h-[166px] p-3">
      <Title>At a Glance</Title>
      <div className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[8px] font-semibold text-gray-600">
              <Building2 size={10} className="text-[#0d1f4c]" />
              {label}
            </span>
            <span className="text-[8px] font-black text-[#0d1f4c]">{typeof value === 'number' ? value.toLocaleString('en-IN') : value}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Heatmap({ data }) {
  const values = data.rows.flatMap((row) => row.data);
  const max = Math.max(...values, 1);
  const color = (value) => {
    const pct = value / max;
    if (pct > 0.74) return 'bg-emerald-700 text-white';
    if (pct > 0.5) return 'bg-emerald-500 text-white';
    if (pct > 0.25) return 'bg-emerald-300 text-emerald-950';
    return 'bg-emerald-100 text-emerald-950';
  };

  return (
    <Panel className="p-3">
      <div className="mb-2 flex items-center justify-between">
        <Title>Sector Presence Heatmap - {data.rows[0]?.district} vs {data.rows[1]?.district} (By MSME Count)</Title>
        <div className="flex items-center gap-1">
          <span className="text-[7px] font-bold text-gray-500">Low</span>
          {['bg-emerald-100', 'bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700'].map((item) => <span key={item} className={`h-3 w-5 ${item}`} />)}
          <span className="text-[7px] font-bold text-gray-500">High</span>
        </div>
      </div>
      <table className="w-full table-fixed border-collapse text-[7px]">
        <thead>
          <tr>
            <th className="w-[88px] border border-gray-200 bg-gray-50 p-1 text-left font-black text-[#0d1f4c]">District</th>
            {data.columns.map((column) => (
              <th key={column} className="border border-gray-200 bg-gray-50 p-1 font-bold leading-tight text-[#0d1f4c]">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.district}>
              <td className="border border-gray-200 bg-white p-1 font-black text-[#0d1f4c]">{row.district}</td>
              {row.data.map((value, index) => (
                <td key={`${row.district}-${data.columns[index]}`} className={`border border-white p-1 text-center font-bold tabular-nums ${color(value)}`}>
                  {value.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export default function DFOIntelligenceReferencePreview() {
  const [month, setMonth] = useState('Jul 2026');
  const [stateId, setStateId] = useState('kerala');
  const [district, setDistrict] = useState('All Districts');
  const currentState = INTELLIGENCE_STATES.find((state) => state.id === stateId) ?? INTELLIGENCE_STATES[0];

  const kpis = useMemo(() => getIntelligenceKPIs(stateId, month, district), [stateId, month, district]);
  const trend = useMemo(() => getRegistrationTrend(stateId, district), [stateId, district]);
  const nsComp = useMemo(() => getNorthSouthComparison(stateId, month, district), [stateId, month, district]);
  const d1Sectors = useMemo(() => getD1TopSectors(stateId, month, district), [stateId, month, district]);
  const d2Sectors = useMemo(() => getD2TopSectors(stateId, month, district), [stateId, month, district]);
  const opportunity = useMemo(() => getOpportunityMatrix(stateId, district), [stateId, district]);
  const grievances = useMemo(() => getGrievanceData(stateId, month, district), [stateId, month, district]);
  const actions = useMemo(() => getRecommendedActions(stateId, district), [stateId, district]);
  const glance = useMemo(() => getAtAGlance(stateId, district), [stateId, district]);
  const heatmap = useMemo(() => getSectorHeatmap(stateId, month, district), [stateId, month, district]);

  const districtLabel = kpis?.district ?? district;

  return (
    <>
      <PreviewTopBar month={month} onMonth={setMonth} />
      <main className="flex-1 overflow-y-auto bg-[#f7f3ed]">
        <div className="mx-auto min-w-[1180px] max-w-[1280px] px-5 py-3">
          <div className="flex h-8 items-center justify-between bg-white px-4 shadow-sm">
            <div className="flex items-center gap-6">
              <SelectField label="State" value={stateId} onChange={(value) => { setStateId(value); setDistrict('All Districts'); }} options={INTELLIGENCE_STATES.map((state) => ({ value: state.id, label: state.label }))} />
              <SelectField label="District View" value={district} onChange={setDistrict} options={currentState.districts} />
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black text-[#0d1f4c]">
              Last Updated: {kpis.lastUpdated}
              <RefreshCw size={11} />
            </div>
          </div>

          <Panel>
            <KpiStrip kpis={kpis} stateLabel={currentState.label} />
          </Panel>

          <div className="mt-3 grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <TrendPanel data={trend.data} insights={trend.insights} title={`MSME Registrations Trend (${districtLabel})`} />
            </div>
            <div className="col-span-6">
              <DistrictMetricsPanel d1Name={nsComp.d1Name} d2Name={nsComp.d2Name} metrics={nsComp.metrics} takeaway={nsComp.takeaway} month={month} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <SectorBars data={d1Sectors} title={`Top 10 Industries - ${districtLabel}`} color="#1e3a8a" />
            </div>
            <div className="col-span-4">
              <SectorBars data={d2Sectors} title={`Bottom 5 Industries - ${districtLabel}`} color={teal} />
            </div>
            <div className="col-span-4">
              <OpportunityPanel data={opportunity.data} focusAreas={opportunity.focusAreas} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-12 gap-3">
            <div className="col-span-5">
              <GrievancePanel data={grievances} month={month} />
            </div>
            <div className="col-span-5">
              <RecommendedActions actions={actions} />
            </div>
            <div className="col-span-2">
              <AtAGlance data={glance} />
            </div>
          </div>

          <div className="mt-3">
            <Heatmap data={heatmap} />
          </div>
        </div>
      </main>
    </>
  );
}
