import React, { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Users, CheckCircle, Clock, FileText, TrendingUp, TrendingDown,
  Megaphone, ArrowLeft, ArrowRight, ChevronRight, AlertTriangle,
  UserRound, Info, IndianRupee, HandshakeIcon, CalendarDays, ShoppingBag
} from 'lucide-react';

import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import InteractiveMarquee from '@/components/ui/InteractiveMarquee';
import ZoneRankingTable from '@/components/tables/ZoneRankingTable';
import TrendLineChart from '@/components/charts/TrendLineChart';
import DonutChart from '@/components/charts/DonutChart';
import GaugeChart from '@/components/charts/GaugeChart';

import {
  DFO_DETAIL_KPIS, PERFORMANCE_COMPARISON, DFO_TREND_DATA,
  ZONE_RANKING, DFO_GROWTH_SECTORS, DFO_CHALLENGES,
  PERFORMANCE_SCORE, DFO_INSIGHTS,
  DFO_BUDGET_DETAIL, DFO_CAMPAIGN_DETAIL, DFO_STAKEHOLDER_MEETINGS,
} from '@/data/dfoDetailData';

import { getDFOByState } from '@/data/dfoOverviewData';

import { useDFOData } from '@/context/DFODataContext';

// KPI card component
function DetailKPICard({ label, value, sub, icon: Icon, iconBg, wide = false }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-shadow ${wide ? 'col-span-2 md:col-span-1' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center ${iconBg}`}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] font-bold text-[#0d1f4c] leading-tight uppercase tracking-wide">{label}</span>
          <span className="text-[15px] font-bold text-gray-800 tabular-nums mt-1 truncate">{value}</span>
          <span className="text-[9px] text-blue-700 font-semibold mt-0.5">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// Comparison bar row component
function ComparisonRow({ row, dfoName }) {
  const max = Math.max(row.dfo, row.zoneAvg, row.annualAvg) * 1.2 || 1;
  const isGood = row.downIsGood ? row.changeDir === 'down' : row.changeDir === 'up';
  const toW = v => `${Math.round((v / max) * 100)}%`;
  const bars = [
    { label: dfoName, val: row.dfo, color: 'bg-blue-900' },
    { label: 'Zone Avg', val: row.zoneAvg, color: 'bg-gray-400' },
    { label: 'Annual Avg', val: row.annualAvg, color: 'bg-emerald-500' },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
      <p className="text-[10px] font-bold text-[#0d1f4c] text-center tracking-wide mb-2">{row.label}</p>
      {bars.map(b => (
        <div key={b.label} className="flex items-center gap-2 mb-1">
          <span className="text-[9px] text-[#0d1f4c] w-20 font-semibold flex-shrink-0 truncate">{b.label}</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${b.color} transition-all duration-500`} style={{ width: toW(b.val) }} />
          </div>
          <span className="text-[10px] font-bold text-gray-700 tabular-nums w-10 text-right">{b.val}{row.suffix ?? ''}</span>
        </div>
      ))}
      <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-semibold ${isGood ? 'text-emerald-600' : 'text-red-500'}`}>
        {isGood ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {row.changeDir === 'up' ? '+' : '-'}{row.changeVsZone}% {row.changeLabel}
      </div>
    </div>
  );
}

// Budget panel component
function BudgetPanel({ budget }) {
  if (!budget) return null;
  const barColor = budget.utilisationPct >= 60 ? '#059669' : budget.utilisationPct >= 40 ? '#d97706' : '#dc2626';
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-3">
        <div>
          <p className="text-[16px] font-bold text-[#0d1f4c]">₹{budget.utilisedTillJuly} L / ₹{budget.annualBudget} L</p>
          <p className="text-[11px] font-bold mt-0.5" style={{ color: barColor }}>{budget.utilisationPct}%</p>
          <p className="text-[9px] text-gray-500 font-semibold">Utilised</p>
        </div>
      </div>

      <div>
        <p className="text-[9px] text-gray-400 font-semibold mb-1 uppercase tracking-wide">Budget Utilisation Progress</p>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${budget.utilisationPct}%`, backgroundColor: barColor }} />
        </div>
        <p className="text-[9px] text-right mt-0.5 font-bold" style={{ color: barColor }}>{budget.utilisationPct}%</p>
      </div>

      <div className="space-y-1.5 text-[10px]">
        {[
          { label: 'Annual Budget (Sanctioned)', val: `₹${budget.annualBudget} L` },
          { label: 'Budget Utilised (Till July)', val: `₹${budget.utilisedTillJuly} L` },
          { label: 'Utilisation Percentage', val: `${budget.utilisationPct}%` },
          { label: 'Balance Budget', val: `₹${budget.balanceBudget} L` },
        ].map(r => (
          <div key={r.label} className="flex justify-between gap-2">
            <span className="text-gray-500">{r.label}</span>
            <span className="font-bold text-[#0d1f4c]">{r.val}</span>
          </div>
        ))}
        <p className="text-[8px] text-gray-400 pt-1 flex items-center gap-1">
          <span>⊙</span> Till July (7 Months)
        </p>
      </div>
    </div>
  );
}

// Campaigns panel component
function CampaignsPanel({ campaignData }) {
  if (!campaignData) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Campaigns Conducted</p>
          <p className="text-[28px] font-bold text-[#0d1f4c] leading-tight">{campaignData.conducted}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Total Participants</p>
          <p className="text-[28px] font-bold text-emerald-600 leading-tight">{campaignData.totalParticipants}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[9px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left font-semibold text-gray-500 pb-1">Campaign</th>
              <th className="text-left font-semibold text-gray-500 pb-1">Scheme</th>
              <th className="text-right font-semibold text-gray-500 pb-1">Participants</th>
            </tr>
          </thead>
          <tbody>
            {campaignData.campaigns.slice(0, 5).map((c, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-1 text-gray-700 pr-2">{c.name}</td>
                <td className="py-1">
                  <span className="bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded-full text-[8px]">{c.scheme}</span>
                </td>
                <td className="py-1 text-right font-bold text-[#0d1f4c]">{c.participants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button className="text-[9px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
        View All Campaigns <ArrowRight size={10} />
      </button> */}
      <div className="flex">
        <button className="flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100/80 rounded-full px-5 py-2 transition-all">
          View All Campaigns <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

// Stakeholder meetings panel component
function StakeholderPanel({ meetingData, onViewDetails }) {
  if (!meetingData) return null;
  const total = meetingData.total;
  return (
    <div className="flex flex-col gap-3">
      <div className="text-center">
        <p className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold">Total Meetings</p>
        <p className="text-[28px] font-bold text-[#0d1f4c] leading-tight">{total}</p>
      </div>

      <div>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mb-2">Category Breakdown</p>
        <div className="space-y-2">
          {meetingData.categoryBreakdown.map(c => {
            const pct = Math.round((c.count / total) * 100);
            return (
              <div key={c.category} className="flex items-center gap-2">
                <span className="text-[9px] text-gray-600 w-28 flex-shrink-0">{c.category}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: c.color }} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 w-16 text-right">{c.count} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* <button className="text-[9px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
        View Meeting Details <ArrowRight size={10} />
      </button> */}
      <div className="flex mt-4">
        <button onClick={onViewDetails} className="flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100/80 rounded-full px-5 py-2 transition-all">
          View Meeting Details <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

// Meeting details table component
const CATEGORY_COLORS = {
  'State Government': 'bg-blue-100 text-blue-800',
  'Industry Associations': 'bg-emerald-100 text-emerald-800',
  'Banks': 'bg-orange-100 text-orange-800',
  'Others': 'bg-purple-100 text-purple-800',
};

function MeetingDetailsTable({ meetings = [] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? meetings : meetings.slice(0, 6);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left font-semibold text-gray-500 pb-2 pr-3">Date</th>
              <th className="text-left font-semibold text-gray-500 pb-2 pr-3">Organisation</th>
              <th className="text-left font-semibold text-gray-500 pb-2 pr-3">Category</th>
              <th className="text-left font-semibold text-gray-500 pb-2">Agenda</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((m, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60">
                <td className="py-1.5 pr-3 text-gray-500 whitespace-nowrap">{m.date}</td>
                <td className="py-1.5 pr-3 font-semibold text-[#0d1f4c]">{m.organisation}</td>
                <td className="py-1.5 pr-3">
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${CATEGORY_COLORS[m.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {m.category}
                  </span>
                </td>
                <td className="py-1.5 text-gray-600">{m.agenda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {meetings.length > 6 && (
        <button
          onClick={() => setShowAll(s => !s)}
          className="mt-2 text-[9px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          {showAll ? 'Show Less' : `View All Meetings (${meetings.length})`} <ArrowRight size={10} />
        </button>
      )}
    </div>
  );
}

// KPI config
const KPI_CONFIG = [
  { key: 'msmeCatered', icon: Users, iconBg: 'bg-blue-700' },
  { key: 'queriesResolved', icon: CheckCircle, iconBg: 'bg-green-600' },
  { key: 'avgTAT', icon: Clock, iconBg: 'bg-orange-500' },
  { key: 'schemeApps', icon: FileText, iconBg: 'bg-blue-700' },
  { key: 'conversionRate', icon: TrendingUp, iconBg: 'bg-teal-600' },
  { key: 'budgetUtilised', icon: IndianRupee, iconBg: 'bg-purple-600' },
  { key: 'stakeholderMeetings', icon: HandshakeIcon, iconBg: 'bg-indigo-600' },
  { key: 'publicProcurement', icon: ShoppingBag, iconBg: 'bg-rose-500' },
];

const TREND_PANELS = [
  { dataKey: 'msmeCatered', label: 'MSMEs Attended (Walk Ins)', color: '#1e3a8a' },
  { dataKey: 'queriesResolved', label: '% MSME Queries Resolved', color: '#059669', suffix: '%' },
  { dataKey: 'conversionRate', label: 'Application Conversion Rate (%)', color: '#d97706', suffix: '%' },
  { dataKey: 'avgTAT', label: 'Avg. Turnaround Time (Days)', color: '#7c3aed' },
];

// Main Page Component
export default function DFODetailPage() {
  const { onOpenSidebar } = useOutletContext();
  const { dfoId } = useParams();
  const navigate = useNavigate();
  const [month, setMonth] = useState('July 2026');
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);

  // Live override context
  const { getOverride } = useDFOData();
  const override = getOverride(dfoId) ?? {};

  const baseKpis = DFO_DETAIL_KPIS[dfoId];
  if (!baseKpis) {
    return (
      <>
        <TopBar title="MSME DFO Performance Dashboard" subtitle="DFO Level Dashboard" month={month} onMonth={setMonth} onOpenSidebar={onOpenSidebar} />
        <main className="flex-1 flex items-center justify-center p-10">
          <div className="text-center">
            <p className="text-gray-500 font-medium">DFO not found: <code className="bg-gray-100 px-2 py-0.5 rounded">{dfoId}</code></p>
            <button onClick={() => navigate('/dfo-performance')} className="mt-4 text-sm text-blue-600 hover:underline">← Back to DFO Performance</button>
          </div>
        </main>
      </>
    );
  }

  // Find dynamic overview data for this DFO for the selected month
  const dfoByState = getDFOByState(month);
  let overviewData = null;
  for (const state of dfoByState) {
    const found = state.dfos.find(x => x.id === dfoId);
    if (found) {
      overviewData = found;
      break;
    }
  }

  // Merge override on top of base KPIs
  // Merge overviewData and override on top of base KPIs
  const kpis = {
    ...baseKpis,
    msmeCatered: { ...baseKpis.msmeCatered, value: override.msmeCatered ?? overviewData?.msmeCatered ?? baseKpis.msmeCatered.value },
    queriesResolved: { ...baseKpis.queriesResolved, value: override.queriesResolved ?? overviewData?.queriesResolved ?? baseKpis.queriesResolved.value },
    avgTAT: { ...baseKpis.avgTAT, value: override.avgTAT ?? overviewData?.avgTAT ?? baseKpis.avgTAT.value },
    schemeApps: { ...baseKpis.schemeApps, value: override.schemeApplications ?? overviewData?.schemeApps ?? baseKpis.schemeApps.value },
    conversionRate: { ...baseKpis.conversionRate, value: override.conversionRate ?? overviewData?.conversionRate ?? baseKpis.conversionRate.value },
    stakeholderMeetings: { ...baseKpis.stakeholderMeetings, value: overviewData?.stakeholderMeetings ?? baseKpis.stakeholderMeetings.value },
    publicProcurement: { ...baseKpis.publicProcurement, value: overviewData ? `${overviewData.procurementGEM}G / ${overviewData.procurementTender}T` : baseKpis.publicProcurement.value },
  };

  // Budget — override if form submitted new budgetUtilised, otherwise use overviewData
  const baseBudget = DFO_BUDGET_DETAIL[dfoId];
  let budget = baseBudget;
  if (override.budgetUtilised !== undefined) {
    budget = { ...baseBudget, utilisedTillJuly: parseFloat(override.budgetUtilised), utilisationPct: Math.round((parseFloat(override.budgetUtilised) / baseBudget.annualBudget) * 100), balanceBudget: parseFloat((baseBudget.annualBudget - parseFloat(override.budgetUtilised)).toFixed(1)) };
  } else if (overviewData) {
    const utilised = parseFloat(((baseBudget.annualBudget * overviewData.budgetUtilisedPct) / 100).toFixed(1));
    budget = { ...baseBudget, utilisationPct: overviewData.budgetUtilisedPct, utilisedTillJuly: utilised, balanceBudget: parseFloat((baseBudget.annualBudget - utilised).toFixed(1)) };
  }

  // Campaign data — override if form submitted new campaignsConducted/participants
  const baseCampaign = DFO_CAMPAIGN_DETAIL[dfoId];
  const campaignData = (override.campaignsConducted !== undefined || override.totalParticipants !== undefined)
    ? { ...baseCampaign, conducted: override.campaignsConducted ?? overviewData?.campaigns ?? baseCampaign.conducted, totalParticipants: override.totalParticipants ?? baseCampaign.totalParticipants }
    : { ...baseCampaign, conducted: overviewData?.campaigns ?? baseCampaign.conducted };

  const meetingData = DFO_STAKEHOLDER_MEETINGS[dfoId];
  const comparison = PERFORMANCE_COMPARISON[dfoId] ?? [];
  const trendData = DFO_TREND_DATA[dfoId] ?? [];
  const zoneRanking = ZONE_RANKING[dfoId] ?? [];
  const sectors = DFO_GROWTH_SECTORS[dfoId] ?? [];
  const challenges = DFO_CHALLENGES[dfoId] ?? [];
  const perfScore = PERFORMANCE_SCORE[dfoId];
  const insights = DFO_INSIGHTS[dfoId] ?? [];

  const zoneName = kpis.zone ?? 'Zone';
  const dfoName = kpis.name ?? 'DFO';
  const selectedYear = parseInt(month.split(' ')[1]) || 2026;
  const fyLabel = `FY ${selectedYear - 1}-${String(selectedYear).slice(2)}`;

  const getGaugeColor = s => s >= 80 ? '#059669' : s >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <>
      <TopBar title="MSME DFO Performance Dashboard" subtitle="DFO Level Dashboard" month={month} onMonth={setMonth} onOpenSidebar={onOpenSidebar} />

      <main className="flex-1 overflow-y-auto p-3 lg:p-5 space-y-4 lg:space-y-5">

        {/* Breadcrumb and back button */}
        <div className="flex items-start justify-between">
          <div>
            <nav className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
              <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
              <ChevronRight size={10} />
              <button onClick={() => navigate('/dfo-performance')} className="hover:text-blue-600">{zoneName}</button>
              <ChevronRight size={10} />
              <span className="text-gray-700 font-semibold">{dfoName}</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                <UserRound size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">{dfoName}</h2>
                <p className="text-xs text-gray-500">{zoneName}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/dfo-performance')}
            className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-semibold border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft size={13} /> Back to State View
          </button>
        </div>

        {/* KPI cards */}
        <section>
          <div className="pb-1">
            <InteractiveMarquee speed={0.4} pauseOnHover={true}>
              {KPI_CONFIG.map(({ key, icon, iconBg }) => {
                const kpi = kpis[key];
                if (!kpi) return null;
                return (
                  <div key={key} className="flex-1 min-w-[176px]">
                    <DetailKPICard
                      label={kpi.label}
                      value={typeof kpi.value === 'number' ? kpi.value.toLocaleString('en-IN') + (kpi.suffix ?? '') : String(kpi.value)}
                      sub={kpi.sub}
                      icon={icon}
                      iconBg={iconBg}
                    />
                  </div>
                );
              })}
            </InteractiveMarquee>
          </div>
        </section>

        {/* Performance Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <SectionHeader title="Performance Comparison" icon={Info} prefIcon={false} />
            <div className="flex gap-4">
              {[
                { color: 'bg-blue-900', label: `${dfoName} (${month})` },
                { color: 'bg-gray-400', label: `${zoneName} Avg (${month})` },
                { color: 'bg-emerald-500', label: `Annual Avg (${fyLabel})` },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${l.color}`} />
                  <span className="text-[9px] font-semibold text-[#0d1f4c]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {comparison.map((row, i) => <ComparisonRow key={i} row={row} dfoName={dfoName} />)}
          </div>
        </div>

        {/* Budget, Campaigns, Stakeholder Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Budget */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader title="Budget Utilisation (Till July)" icon={Info} prefIcon={false} />
            <BudgetPanel budget={budget} />
          </div>

          {/* Awareness Campaigns */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <SectionHeader title="Awareness Campaign Details" icon={Info} prefIcon={false} />
              <button className="text-[9px] text-blue-600 font-semibold">View All</button>
            </div>
            <CampaignsPanel campaignData={campaignData} />
          </div>

          {/* Stakeholder Meetings Summary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <SectionHeader title="Stakeholder Meetings (Summary)" icon={Info} prefIcon={false} />
              <button className="text-[9px] text-blue-600 font-semibold">View All</button>
            </div>
            <StakeholderPanel meetingData={meetingData} onViewDetails={() => setShowMeetingDetails(!showMeetingDetails)} />
          </div>
        </div>

        {/* Stakeholder Meeting Details */}
        {showMeetingDetails && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <SectionHeader title="Stakeholder Meeting Details" icon={Info} prefIcon={false} />
              <button className="text-[9px] text-blue-600 font-semibold flex items-center gap-1">
                View All <ArrowRight size={10} />
              </button>
            </div>
            <MeetingDetailsTable meetings={meetingData?.meetings ?? []} />
          </div>
        )}

        {/* Trend Analysis and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-3 lg:p-4">
            <SectionHeader title="Trend Analysis (Last 3 Months)" icon={Info} prefIcon={false} />
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {TREND_PANELS.map(p => (
                <TrendLineChart key={p.dataKey} data={trendData} dataKey={p.dataKey} label={p.label} color={p.color} suffix={p.suffix} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <SectionHeader title="Insights" />
            <div className="space-y-2">
              {insights.map((text, i) => (
                <div key={i} className="flex gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-gray-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zone Ranking, Sectors, Challenges, and Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4">
          <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-3 lg:p-4">
            <SectionHeader title={`${zoneName} – DFO Ranking (${month})`} />
            <div className="mt-3">
              <ZoneRankingTable data={zoneRanking} />
            </div>
            <div className="flex  mt-4">
              <button className="flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100/80 rounded-full px-5 py-2 transition-all">
                View Full Ranking <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-3 lg:p-4">
            <SectionHeader title="High Growth Potential Sectors" icon={TrendingUp} color="#0d1f4c" />
            <div className="pb-7">
              <DonutChart data={sectors} size={220} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-1 md:col-span-2 lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
              <SectionHeader title="Top Challenges Faced" icon={AlertTriangle} color="#ff0000" />
              <div className="space-y-2">
                {challenges.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <span className="text-[10px] text-gray-700 flex-1">{c.label}</span>
                    <Badge label={c.severity.charAt(0).toUpperCase() + c.severity.slice(1)} variant={c.severity === 'high' ? 'danger' : 'warning'} />
                  </div>
                ))}
              </div>
              {/* <button
                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-semibold border border-blue-200 rounded-lg px-3 py-2 mt-7 hover:bg-blue-50 transition-colors"
              >
                View All Challenges <ArrowRight size={13} />
              </button> */}
              <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100/80 rounded-full px-5 py-2 transition-all">
                  View Full Ranking <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <SectionHeader title="Performance Score" />
              {perfScore && (
                <>
                  <GaugeChart score={perfScore.score} label={perfScore.label} />
                  <div className="space-y-3 mt-2">
                    {perfScore.breakdown.map(b => (
                      <div key={b.label} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">{b.label}</span>
                          <span className="text-[10px] font-bold text-gray-700">{b.score}/{b.max}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(b.score / b.max) * 100}%`, backgroundColor: getGaugeColor(b.score) }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-[9px] text-gray-400 pb-2">Note: Data is dummy and for illustrative purpose only.</p>
      </main>
    </>
  );
}
