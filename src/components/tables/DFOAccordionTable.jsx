import { useState } from 'react';
import {
  ChevronUp, ChevronDown,
  Users, CheckCircle, Clock, FileText,
  IndianRupee, HandshakeIcon, Megaphone, ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';

// colour-coded budget utilisation badge
function BudgetBadge({ pct }) {
  const color = pct >= 60 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-red-500';
  return (
    <div className={`flex items-center gap-0.5 ${color} justify-center`}>
      <IndianRupee size={9} className="flex-shrink-0" />
      <span className="text-[11px] font-semibold tabular-nums">{pct}%</span>
    </div>
  );
}

// fixed-width column definitions
const COL_DFO  = { minWidth: 148, width: 148 };
const COL_S    = { minWidth: 52,  width: 52,  textAlign: 'center' };
const COL_XS   = { minWidth: 44,  width: 44,  textAlign: 'center' };

// Single icon+value cell
function Cell({ style, icon: Icon, color, value, suffix = '' }) {
  return (
    <div style={style} className={`flex items-center justify-center gap-0.5 ${color}`}>
      <Icon size={10} className="flex-shrink-0" />
      <span className="text-[11px] font-semibold tabular-nums">{value}{suffix}</span>
    </div>
  );
}

// Procurement mini-badge
function ProcBadge({ gem, tender }) {
  return (
    <div style={COL_XS} className="flex flex-col items-center leading-none">
      <span className="text-[9px] text-purple-600 font-bold tabular-nums">{gem}G</span>
      <span className="text-[9px] text-indigo-500 font-semibold tabular-nums">{tender}T</span>
    </div>
  );
}

export default function DFOAccordionTable({ data }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(new Set(data.map(g => g.state)));

  const toggle = (state) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(state) ? next.delete(state) : next.add(state);
      return next;
    });
  };

  const breakpointColumnsObj = { default: 2, 1024: 1, 1400: 1, 2000: 2, 2600: 3, 6000: 4 };

  const renderGroup = (group) => {
    const isOpen = expanded.has(group.state);
    return (
      <div key={group.state} className="border border-gray-200 rounded-lg overflow-hidden">
        {/* State header */}
        <button
          onClick={() => toggle(group.state)}
          className="w-full flex items-center justify-between px-3 py-2 bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            {isOpen ? <ChevronUp size={13} className="text-gray-500" /> : <ChevronDown size={13} className="text-gray-500" />}
            <span className="text-xs font-bold text-[#0d1f4c]/90">{group.state}</span>
            <span className="text-[10px] font-semibold text-[#0d1f4c]">({group.count})</span>
          </div>
        </button>

        {/* DFO rows — horizontally scrollable */}
        {isOpen && (
          <div className="overflow-x-auto">
            <div className="min-w-[600px] w-full">
              {/* Column header */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 text-[8px] font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <span style={COL_DFO} className="text-left">DFO</span>
                <span style={COL_S}>Walk-ins</span>
                <span style={COL_S}>Resolved%</span>
                <span style={COL_S}>TAT</span>
                <span style={COL_S}>Conv%</span>
                <span style={COL_XS}>Apps</span>
                <span style={COL_XS}>Budget%</span>
                <span style={COL_XS}>Camps</span>
                <span style={COL_XS}>Meetings</span>
                <span style={COL_XS}>GEM/T</span>
              </div>

              {group.dfos.map((dfo) => (
                <div
                  key={dfo.id}
                  onClick={() => navigate(`/dfo-performance/${dfo.id}`)}
                  className="flex items-center justify-between px-3 py-2 hover:bg-blue-50/60 cursor-pointer transition-colors border-b border-gray-100 last:border-0 w-full"
                >
                  {/* DFO name */}
                  <span style={COL_DFO} className="text-[11px] text-[#0d1f4c] font-bold pr-1 text-left truncate">
                    {dfo.name}
                  </span>

                  {/* Walk-ins — blue */}
                  <Cell style={COL_S} icon={Users} color="text-blue-700" value={dfo.msmeCatered} />

                  {/* Resolved % — green */}
                  <Cell style={COL_S} icon={CheckCircle} color="text-emerald-600" value={dfo.queriesResolved.toFixed(0)} suffix="%" />

                  {/* TAT — orange */}
                  <Cell style={COL_S} icon={Clock} color="text-orange-500" value={dfo.avgTAT.toFixed(1)} />

                  {/* Conversion rate — teal */}
                  <Cell style={COL_S} icon={TrendingUp} color="text-teal-600" value={dfo.conversionRate} suffix="%" />

                  {/* Apps — slate-blue */}
                  <Cell style={COL_XS} icon={FileText} color="text-blue-700" value={dfo.schemeApps} />

                  {/* Budget % — colour-coded */}
                  <div style={COL_XS} className="flex justify-center">
                    <BudgetBadge pct={dfo.budgetUtilisedPct ?? 0} />
                  </div>

                  {/* Campaigns — red */}
                  <Cell style={COL_XS} icon={Megaphone} color="text-red-500" value={dfo.campaigns ?? 0} />

                  {/* Meetings — indigo */}
                  <Cell style={COL_XS} icon={HandshakeIcon} color="text-indigo-600" value={dfo.stakeholderMeetings ?? 0} />

                  {/* GEM / Tender procurement */}
                  <ProcBadge gem={dfo.procurementGEM ?? 0} tender={dfo.procurementTender ?? 0} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-2"
      columnClassName="space-y-2"
    >
      {data.map(renderGroup)}
    </Masonry>
  );
}