import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Users, CheckCircle, Clock, FileText,
  TrendingUp, Megaphone, Trophy, IndianRupee, HandshakeIcon, ShoppingBag,
} from 'lucide-react';

import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import InteractiveMarquee from '@/components/ui/InteractiveMarquee';
import DFOAccordionTable from '@/components/tables/DFOAccordionTable';
import StateBarChart from '@/components/charts/StateBarChart';

import {
  getDFONationalKPIs,
  getDFOStateChartData,
  getDFOByState,
  getTopPerformers,
  GROWTH_SECTORS,
  CHALLENGES,
} from '@/data/dfoOverviewData';

function DFOKPICard({ kpi, icon: Icon, iconBg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2.5">
        <div
          className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center ${iconBg}`}
        >
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[9px] font-bold text-[#0d1f4c] leading-tight uppercase tracking-wide">
            {kpi.label}
          </span>
          <span className="text-[15px] font-bold text-gray-800 tabular-nums mt-1 truncate">
            {typeof kpi.value === 'number'
              ? kpi.value.toLocaleString('en-IN')
              : kpi.value}
            {kpi.suffix ?? ''}
          </span>
          <span className="text-[9px] text-blue-700 font-semibold mt-0.5">
            {kpi.sub}
          </span>
        </div>
      </div>
    </div>
  );
}

const KPI_CONFIG = [
  { key: 'totalMSMECatered',   icon: Users,         iconBg: 'bg-blue-700'  },
  { key: 'queriesResolved',    icon: CheckCircle,   iconBg: 'bg-green-600' },
  { key: 'avgTurnaroundTime',  icon: Clock,         iconBg: 'bg-orange-500'},
  { key: 'schemeApplications', icon: FileText,      iconBg: 'bg-blue-700'  },
  { key: 'conversionRate',     icon: TrendingUp,    iconBg: 'bg-teal-600'  },
  { key: 'awarenessCampaigns', icon: Megaphone,     iconBg: 'bg-red-500'   },
  { key: 'budgetUtilisedPct',  icon: IndianRupee,   iconBg: 'bg-purple-600'},
  { key: 'stakeholderMeetings',icon: HandshakeIcon, iconBg: 'bg-indigo-600'},
  { key: 'publicProcurement',  icon: ShoppingBag,   iconBg: 'bg-cyan-600'  },
];

const STATE_CHARTS = [
  { dataKey: 'msmeCatered',     label: 'MSME Attended (Walk Ins) by State',        color: '#1e3a8a', type: 'bar',  ylabel: 'No. of MSMEs' },
  { dataKey: 'queriesResolved', label: '% of MSME Queries Resolved by State',       color: '#059669', type: 'line', suffix: '%' },
  { dataKey: 'conversionRate',  label: 'Application Conversion Rate (%) by State',  color: '#d97706', type: 'line', suffix: '%' },
  { dataKey: 'avgTAT',          label: 'Avg. Turnaround Time (Days) by State',       color: '#7c3aed', type: 'bar',  ylabel: 'Days' },
];

// Data Aggregation helper
function getAggregatedStateData(key, dfoByState) {
  return dfoByState.map(stateObj => {
    const dfos = stateObj.dfos;
    let value = 0;
    if (['queriesResolved', 'avgTurnaroundTime', 'conversionRate', 'budgetUtilisedPct'].includes(key)) {
      const sum = dfos.reduce((acc, d) => {
        if (key === 'queriesResolved') return acc + (Number(d.queriesResolved) || 0);
        if (key === 'avgTurnaroundTime') return acc + (Number(d.avgTAT) || 0);
        if (key === 'conversionRate') return acc + (Number(d.conversionRate) || 0);
        if (key === 'budgetUtilisedPct') return acc + (Number(d.budgetUtilisedPct) || 0);
        return acc;
      }, 0);
      value = dfos.length > 0 ? (sum / dfos.length) : 0;
      if (key === 'avgTurnaroundTime') value = Number(value.toFixed(2));
      else value = Math.round(value);
    } else {
      value = dfos.reduce((acc, d) => {
        if (key === 'totalMSMECatered') return acc + (Number(d.msmeCatered) || 0);
        if (key === 'schemeApplications') return acc + (Number(d.schemeApps) || 0);
        if (key === 'awarenessCampaigns') return acc + (Number(d.campaigns) || 0);
        if (key === 'stakeholderMeetings') return acc + (Number(d.stakeholderMeetings) || 0);
        if (key === 'publicProcurement') return acc + (Number(d.procurementGEM) || 0) + (Number(d.procurementTender) || 0);
        return acc;
      }, 0);
    }
    return { state: stateObj.state, value };
  }).sort((a, b) => b.value - a.value);
}

export default function DFOOverviewPage() {
  const { onOpenSidebar } = useOutletContext();
  const [tooltip, setTooltip] = useState(null);
  const isTouchRef = React.useRef(false);

  React.useEffect(() => {
    let lastTouchTime = 0;
    const handleTouch = () => { 
      isTouchRef.current = true; 
      lastTouchTime = Date.now();
    };
    const handleMouse = () => { 
      if (Date.now() - lastTouchTime < 500) return; // ignore synthetic mouse events right after touch
      isTouchRef.current = false; 
    };
    
    document.addEventListener('touchstart', handleTouch, true);
    document.addEventListener('mousemove', handleMouse, true);
    
    const handleTouchOutside = (e) => {
      if (isTouchRef.current && tooltip && !e.target.closest('.marquee-container')) {
        setTooltip(null);
      }
    };
    document.addEventListener('touchend', handleTouchOutside);
    
    return () => {
      document.removeEventListener('touchstart', handleTouch, true);
      document.removeEventListener('mousemove', handleMouse, true);
      document.removeEventListener('touchend', handleTouchOutside);
    };
  }, [tooltip]);

  const [month, setMonth] = useState(
    () => new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })
  );

  const dfoNationalKPIs = React.useMemo(() => getDFONationalKPIs(month), [month]);
  const stateChartData = React.useMemo(() => getDFOStateChartData(month), [month]);
  const dfoByState = React.useMemo(() => getDFOByState(month), [month]);
  const topPerformers = React.useMemo(() => getTopPerformers(month), [month]);

  return (
    <>
      <TopBar
        title="MSME DFO Performance Dashboard"
        subtitle="Bottom Up Parameters (Monthly)"
        month={month}
        onMonth={setMonth}
        showDownload={false}
        onOpenSidebar={onOpenSidebar}
      />

      <main className="flex-1 overflow-y-auto p-3 lg:p-5 space-y-4 lg:space-y-5">

        <section>
          <div className="pb-1 marquee-container" onMouseLeave={() => {
            if (!isTouchRef.current) setTooltip(null);
          }}>
            <InteractiveMarquee speed={0.5} pauseOnHover={true} isPaused={!!tooltip}>
              {KPI_CONFIG.map(({ key, icon, iconBg }) => (
                <div key={key} className="flex-1 min-w-[176px]"
                     onMouseEnter={(e) => {
                       if (isTouchRef.current) return;
                       const rect = e.currentTarget.getBoundingClientRect();
                       setTooltip({
                         key,
                         kpi: dfoNationalKPIs[key],
                         x: rect.left + rect.width / 2,
                         y: rect.bottom + 8,
                         stateData: getAggregatedStateData(key, dfoByState)
                       });
                     }}
                     onClick={(e) => {
                       if (!isTouchRef.current) return;
                       if (tooltip && tooltip.key === key) {
                         setTooltip(null);
                       } else {
                         const rect = e.currentTarget.getBoundingClientRect();
                         setTooltip({
                           key,
                           kpi: dfoNationalKPIs[key],
                           x: rect.left + rect.width / 2,
                           y: rect.bottom + 8,
                           stateData: getAggregatedStateData(key, dfoByState)
                         });
                       }
                     }}
                >
                  <DFOKPICard kpi={dfoNationalKPIs[key]} icon={icon} iconBg={iconBg} />
                </div>
              ))}
            </InteractiveMarquee>
          </div>
        </section>

        {tooltip && (
          <div 
            className="fixed z-[9999] bg-[#0d1f4c] text-white p-3 rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2"
            style={{ top: tooltip.y, left: tooltip.x, width: 220 }}
          >
            <div className="text-[11px] font-bold text-blue-300 border-b border-white/20 pb-1.5 mb-2 uppercase tracking-wider text-center">
              {tooltip.kpi.label}
            </div>
            <div className="space-y-1.5">
              {tooltip.stateData.map((d, i) => (
                <div key={i} className="flex justify-between items-center text-[11px]">
                  <span className="truncate pr-2 text-gray-300 font-medium">{d.state}</span>
                  <span className="font-bold tabular-nums text-white">
                    {typeof d.value === 'number' ? d.value.toLocaleString('en-IN') : d.value}{tooltip.kpi.suffix ?? ''}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1f4c] rotate-45"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
          {STATE_CHARTS.map(c => (
            <StateBarChart
              key={c.dataKey}
              data={stateChartData}
              dataKey={c.dataKey}
              color={c.color}
              label={c.label}
              type={c.type}
              suffix={c.suffix}
              ylabel={c.ylabel}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">

          {/* Accordion table */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm p-3 lg:p-4">
            <SectionHeader title="DFO Performance by State" />
            <div className="mt-3">
              <DFOAccordionTable data={dfoByState} />
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-4">

            {/* Top Performing DFOs */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <SectionHeader title="Top Performing DFOs" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">

                {/* Highest MSME Attended */}
                <div className="border p-2 shadow-sm border-[#0d1f4c]/10 rounded-lg">
                  <p className="text-[10px] font-bold text-[#0d1f4c] text-center leading-tight mb-3">
                    Highest MSME Attended<br />(Walk Ins)
                  </p>
                  <div className="flex justify-center mb-3">
                    <Trophy size={34} className="text-amber-500" />
                  </div>
                  <div className="space-y-2 mt-1">
                    {topPerformers.highestMSME.map((row) => (
                      <div key={row.rank} className="flex justify-between text-[10px] mt-1 border-b border-gray-100 last:border-0 pb-1">
                        <span className="font-bold text-[#0d1f4c]">
                          <span className="mr-1">{row.rank}.</span>
                          <span>{row.name}</span>
                        </span>
                        <span className="font-bold text-blue-700">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highest Conversion */}
                <div className="border p-2 shadow-sm border-[#0d1f4c]/10 rounded-lg">
                  <p className="text-[10px] font-bold text-[#0d1f4c] text-center leading-tight mb-3">
                    Highest Application<br />Conversion Rate
                  </p>
                  <div className="flex justify-center mb-3">
                    <TrendingUp size={34} className="text-emerald-600" />
                  </div>
                  <div className="space-y-2 mt-1">
                    {topPerformers.highestConversion.map((row) => (
                      <div key={row.rank} className="flex justify-between text-[10px] mt-1 border-b border-gray-100 last:border-0 pb-1">
                        <span className="font-bold text-[#0d1f4c]">
                          <span className="mr-1">{row.rank}.</span>
                          <span>{row.name}</span>
                        </span>
                        <span className="font-bold text-emerald-700">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lowest TAT */}
                <div className="border p-2 shadow-sm border-[#0d1f4c]/10 rounded-lg">
                  <p className="text-[10px] font-bold text-[#0d1f4c] text-center leading-tight mb-3">
                    Lowest Avg. Turnaround<br />Time (Days)
                  </p>
                  <div className="flex justify-center mb-3">
                    <Clock size={34} className="text-slate-500" />
                  </div>
                  <div className="space-y-2 mt-1">
                    {topPerformers.lowestTAT.map((row) => (
                      <div key={row.rank} className="flex justify-between text-[10px] mt-1 border-b border-gray-100 last:border-0 pb-1">
                        <span className="font-bold text-[#0d1f4c]">
                          <span className="mr-1">{row.rank}.</span>
                          <span>{row.name}</span>
                        </span>
                        <span className="font-bold text-blue-700">{Number(row.value).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Growth Sectors + Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="High Growth Potential Sectors (Identified)" />
                <div className="flex flex-col gap-2 mt-1">
                  {GROWTH_SECTORS.map((s) => (
                    <span key={s.name} className="flex items-center gap-4 text-[#0d1f4c] text-[10px] font-bold px-2.5 py-1">
                      <s.icon />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <SectionHeader title="Top Challenges / Bottlenecks Faced by MSME" />
                <div className="space-y-2 mt-1">
                  {CHALLENGES.map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-red-50 border border-red-100">
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[10px] text-[#0d1f4c] font-bold">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <p className="text-[9px] text-gray-400 pb-2">Note: Data is dummy and for illustrative purpose only.</p>
      </main>
    </>
  );
}
