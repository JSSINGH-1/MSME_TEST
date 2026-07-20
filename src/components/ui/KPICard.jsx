import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * KPICard — metric card with icon, value, trend.
 *
 * Props:
 *  kpi        {object}  — data object from the data layer
 *  icon       {LucideIcon}
 *  iconBg     {string}  — Tailwind bg class for the icon circle
 *  showTrend  {boolean} — whether to show the vs-previous-month line
 */
export default function KPICard({ kpi, icon: Icon, iconBg, showTrend = true }) {
  const isPositive = kpi.direction === 'up';
  const isGood     = kpi.downIsGood ? !isPositive : isPositive;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 lg:p-3 hover:shadow-md transition-shadow min-w-0">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 xl:w-12 xl:h-12 rounded-full flex-shrink-0 flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className="text-white xl:hidden" />
          <Icon size={25} className="text-white hidden xl:block" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold text-[#0d1f4c] 	 leading-tight">
            {kpi.label}
          </span>

          {/* value */}
          <div className="text-base xl:text-2xl font-bold text-gray-800 tabular-nums truncate">
            {kpi.prefix ?? ''}{typeof kpi.value === 'number' ? kpi.value.toLocaleString('en-IN') : kpi.value}{kpi.suffix ?? ''}
          </div>
          <div className="text-[10px] text-gray-400">{kpi.sub}</div>

          {/* trend */}
          {showTrend && kpi.change !== undefined && (
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${isGood ? 'text-emerald-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : '-'}{kpi.change}{kpi.note ? ` ${kpi.note}` : '%'} vs {kpi.comparisonMonth}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
