import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LabelList, Cell,
} from 'recharts';
import SectionHeader from '../ui/SectionHeader';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700">{payload[0]?.payload?.sector}</p>
      <p className="text-blue-700 font-bold">{payload[0]?.value?.toLocaleString('en-IN')}</p>
    </div>
  );
};

/**
 * HorizontalBarChart — ranks sectors by MSME count.
 * Props:
 *   data   {Array}   — [{ sector, count }] sorted desc
 *   title  {string}
 *   color  {string}  — bar fill color
 */
export default function HorizontalBarChart({ data = [], title, color = '#1e3a8a' }) {
  return (
    // <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
    // <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-auto">
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full flex flex-col">
      {/* <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2">{title}</p> */}
      
      <SectionHeader title={title} GeneralCss='pl-0'/>
      {/* <div className="grid grid-cols-[auto_1fr] gap-x-1 gap-y-0.5 items-center"> */}
        {/* <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-wide">Sector</span>
        <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-wide">MSME Count</span> */}
      <div
        className="grid grid-cols-[auto_1fr] items-center h-full"
        style={{
          gridTemplateRows: `24px repeat(${Math.min(data.length, 10)}, 1fr)`
        }}
      >
        <span className="text-[7px] font-bold text-[#0d1f4c]/80 uppercase">
          Sector
        </span>

        <div className="flex justify-between">
          <span className="text-[7px] font-bold text-[#0d1f4c]/80 uppercase">
            MSME Count
          </span>
        </div>

        {data.slice(0,10).map((row, i) => {
          const max = data[0]?.count ?? 1;
          const pct = Math.round((row.count / max) * 100);
          const opacity = 1 - i * 0.07;
          return (
            <>
              {/* <span key={`label-${i}`} className="text-[9px] text-gray-600 pr-2 py-0.5 truncate max-w-[110px]" title={row.sector}> */}
              <span
                key={`label-${i}`}
                className="truncate text-[8px] font-medium text-[#0d1f4c] pr-1"
                title={row.sector}
              >
                {row.sector}
              </span>
              <div key={`bar-${i}`} className="flex items-center gap-1.5 py-0.5">
                <div className="flex-1 h-2.5 bg-gray-100 rounded-sm overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color, opacity }}
                  />
                </div>
                <span className="text-[9px] font-semibold text-gray-700 tabular-nums w-10 text-right flex-shrink-0">
                  {row.count.toLocaleString('en-IN')}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
