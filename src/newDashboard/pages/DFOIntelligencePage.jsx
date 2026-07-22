import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDown, RefreshCw, Users, MapPin, Headphones, TrendingUp, Building2, CheckCircle, Landmark } from 'lucide-react';

import TopBar from '@/newDashboard/components/layout/TopBar';

// Intelligence-specific charts & tables
import RegistrationTrendChart from '@/newDashboard/components/charts/RegistrationTrendChart';
import NorthSouthBarChart from '@/newDashboard/components/charts/NorthSouthBarChart';
import HorizontalBarChart from '@/newDashboard/components/charts/HorizontalBarChart';
import OpportunityBubbleChart from '@/newDashboard/components/charts/OpportunityBubbleChart';
import GrievancesPanel from '@/newDashboard/components/charts/GrievancesPanel';
import SectorHeatmap from '@/newDashboard/components/tables/SectorHeatmap';

// Data getters
import {
  INTELLIGENCE_STATES,
  getIntelligenceKPIs,
  getRegistrationTrend,
  getNorthSouthComparison,
  getD1TopSectors,
  getD2TopSectors,
  getOpportunityMatrix,
  getGrievanceData,
  getRecommendedActions,
  getAtAGlance,
  getSectorHeatmap,
} from '@/newDashboard/data/dfoIntelligenceData';
import SectionHeader from '../components/ui/SectionHeader';

function IntelKPICard({ value, sub, label, icon: Icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-100' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 ">
        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${iconBg}`}>
          <Icon size={30} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col text-[#0d1f4c]">
          <span className="text-[10px] font-bold leading-tight min-h-[10px]">{label}</span>
          <span className="text-[15px] font-bold tabular-nums mt-0.5">{value}</span>
          <span className="text-[10px] font-semibold mt-0.5">{sub && <p className="-mt-0.5">{sub}</p>}</span>
        </div>
      </div>
    </div>
  );
}

function AtAGlance({ data }) {
  if (!data) return null;

  const items = [
    { label: 'Population (State)', value: data.population, icon: Users },
    { label: 'Total Districts', value: data.districts, icon: MapPin },
    { label: 'Sub-Districts', value: data.subDistricts, icon: Building2 },
    { label: 'Blocks', value: data.blocks, icon: Building2 },
    { label: 'Villages', value: data.villages, icon: MapPin },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full">
      <SectionHeader title="At a Glance" />
      <div className="space-y-1.5">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Icon size={10} className="text-blue-400 flex-shrink-0" />
                <span className="text-[9px] text-[#0d1f4c]">{item.label}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-700 tabular-nums">
                {typeof item.value === 'number' ? item.value.toLocaleString('en-IN') : item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecommendedActions({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full">
      <SectionHeader title="Recommended Actions" />
      <div className="grid grid-cols-2 gap-4">
        {[{ name: data.d1Name, actions: data.d1 }, { name: data.d2Name, actions: data.d2 }].map(group => (
          <div key={group.name}>
            <p className="text-[9px] font-bold text-blue-700 mb-1.5">{group.name}</p>
            <div className="space-y-1.5">
              {group.actions?.map((action, i) => (
                <div key={i} className="flex gap-1.5">
                  <CheckCircle size={11} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[9px] text-[#0d1f4c] leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Select({ value, onChange, options, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#0d1f4c]/50 font-semibold whitespace-nowrap">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg pl-2.5 pr-6 py-1.5 text-[11px] font-semibold text-[#0d1f4c]/70 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
        <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function DFOIntelligencePage() {
  const { onOpenSidebar } = useOutletContext();
  const [month, setMonth] = useState('Jul 2026');
  const [stateId, setStateId] = useState('kerala');
  const [district, setDistrict] = useState('Ernakulam');

  const currentState = INTELLIGENCE_STATES.find(s => s.id === stateId) ?? INTELLIGENCE_STATES[0];

  const kpis = useMemo(() => getIntelligenceKPIs(stateId, month), [stateId, month]);
  const trend = useMemo(() => getRegistrationTrend(stateId), [stateId]);
  const nsComp = useMemo(() => getNorthSouthComparison(stateId, month), [stateId, month]);
  const d1Sectors = useMemo(() => getD1TopSectors(stateId, month, district), [stateId, month, district]);
  const d2Sectors = useMemo(() => getD2TopSectors(stateId, month, district), [stateId, month, district]);
  const oppMatrix = useMemo(() => getOpportunityMatrix(stateId), [stateId]);
  const grievances = useMemo(() => getGrievanceData(stateId, month), [stateId, month]);
  const actions = useMemo(() => getRecommendedActions(stateId), [stateId]);
  const atAGlance = useMemo(() => getAtAGlance(stateId), [stateId]);
  const heatmap = useMemo(() => getSectorHeatmap(stateId, month, district), [stateId, month, district]);

  const stateLabel = currentState.label;
  const districtLabel = kpis?.district ?? district;

  const cards = [
    { label: 'District', value: districtLabel, sub: stateLabel, icon: Users, color: 'text-blue-700' },
    { label: 'Total MSMEs', value: kpis?.totalMSMEs?.toLocaleString('en-IN'), sub: 'District MSMEs', icon: MapPin, color: 'text-emerald-700' },
    { label: 'Kerala Share', value: `${kpis?.keralaShare}%`, sub: `${kpis?.districtMSMEs?.toLocaleString('en-IN')} MSMEs`, icon: MapPin, color: 'text-teal-500' },
    { label: 'Total Industries (NIC Activities)', value: kpis?.totalIndustries?.toLocaleString('en-IN'), sub: 'NIC Activities', icon: Headphones, color: 'text-indigo-700' },
    { label: 'Champion Portal Cases', value: kpis?.championPortalCases?.toLocaleString('en-IN'), sub: 'Total Cases', icon: TrendingUp, color: 'text-emerald-700' },
    { label: 'District Rank', value: kpis?.districtRank, sub: 'Within Kerala', icon: Landmark, color: 'text-orange-700' },
  ];

  return (
    <>
      <TopBar
        title="Intelligence & Planning Dashboard"
        subtitle="Actionable Insights for Better Planning & Interventions"
        month={month}
        onMonth={setMonth}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap text-[#0d1f4c] items-center justify-between px-3 lg:px-5 py-2.5 bg-white border-b border-gray-200 gap-3 lg:gap-4">
          <div className="flex flex-wrap items-center gap-3 lg:gap-5">
            <Select
              label="State"
              value={stateId}
              onChange={v => { setStateId(v); setDistrict('All Districts'); }}
              options={INTELLIGENCE_STATES.map(s => ({ value: s.id, label: s.label }))}
            />
            <Select
              label="District View"
              value={district}
              onChange={setDistrict}
              options={currentState.districts}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] ">
            <RefreshCw size={10} />
            <span>Last Updated: {kpis?.lastUpdated}</span>
          </div>
        </div>

        <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
            {cards.map(({ label, value, sub, icon: Icon, color }) => (
              <IntelKPICard
                key={label}
                label={label}
                value={value}
                sub={sub}
                icon={Icon}
                iconBg={color}
                iconColor={color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 lg:gap-4">
            <div className="lg:col-span-3">
              <RegistrationTrendChart
                data={trend.data}
                insights={trend.insights}
                title={`MSME Registrations Trend (${stateLabel})`}
              />
            </div>
            <div className="lg:col-span-3">
              <NorthSouthBarChart
                d1Name={nsComp?.d1Name}
                d2Name={nsComp?.d2Name}
                metrics={nsComp?.metrics}
                takeaway={nsComp?.takeaway}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <HorizontalBarChart
              data={d1Sectors}
              title={`Top 10 Industries — ${districtLabel}`}
              color="#1e3a8a"
            />
            <HorizontalBarChart
              data={d2Sectors}
              title={`Bottom 5 Industries — ${districtLabel}`}
              color="#0d9488"
            />
            <OpportunityBubbleChart
              data={oppMatrix?.data}
              focusAreas={oppMatrix?.focusAreas}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 items-stretch">
            <div className="md:col-span-2 lg:col-span-3 h-full">
              <GrievancesPanel
                data={grievances}
                title={`Champion Portal Analytics (${month})`}
              />
            </div>
            <div className="lg:col-span-2 h-full">
              <RecommendedActions data={actions} />
            </div>
            <div className="md:col-span-2 lg:col-span-1 h-full">
              <AtAGlance data={atAGlance} />
            </div>
          </div>

          <SectorHeatmap data={heatmap} />

          <p className="text-[9px] text-gray-400 pb-1 text-center">
            Note: Data is dummy and for illustrative purpose only.
          </p>
        </div>
      </main>
    </>
  );
}
