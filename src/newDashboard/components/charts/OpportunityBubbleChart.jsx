import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Target } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const d = payload[0]?.payload;

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-gray-700">{d?.name}</p>
      <p className="text-gray-500">
        Enterprise Count: <strong>{d?.enterpriseCount}</strong>
      </p>
      <p className="text-gray-500">
        Scheme Penetration: <strong>{d?.schemePenetration}%</strong>
      </p>
    </div>
  );
};

const CustomDot = ({ cx, cy, payload }) => {
  const r = payload.size ?? 12;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={payload.color}
        fillOpacity={0.9}
        stroke="white"
        strokeWidth={2}
      />

      <text
        x={cx - 10}
        y={cy - r - 9}
        textAnchor="middle"
        fontSize={8}
        fill="#374151"
        fontWeight={600}
      >
        {` ${payload.name}`}
      </text>
    </g>
  );
};

export default function OpportunityBubbleChart({
  data = [],
  focusAreas,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-fit p-4">
      <SectionHeader
        title="Opportunity Matrix (Focus Sectors)"
      // GeneralCss="pl-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-[3fr_1.1fr] gap-4 pt-3">

        {/* CHART */}
        <div className="relative tracking-wider min-w-0">

          {/* Top label */}
          <div className='text-[#0d1f4c]'>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] z-10">
              High Enterprise Count
            </div>

            {/* Left labels */}
            <div className="absolute left-2 top-20 translate-y-1/2 -rotate-90 origin-left text-[8px] z-10 whitespace-nowrap">
              High Scheme Penetration
            </div>

            <div className="absolute left-2 bottom-9 -rotate-90 origin-left text-[8px]  z-10 whitespace-nowrap">
              Low Scheme Penetration
            </div>
          </div>

          <div style={{ height: 250 }}>
            <ResponsiveContainer width="99%" height="100%">
              <ScatterChart
                margin={{
                  top: 30,
                  right: 20,
                  left: -35,
                  bottom: 35,
                }}
              >
                {/* Single quadrant lines */}
                <CartesianGrid
                  horizontal={false}
                  vertical={false}
                />

                <ReferenceLine
                  x={50}
                  stroke="#d1d5db"
                  strokeWidth={1}
                />

                <ReferenceLine
                  y={50}
                  stroke="#d1d5db"
                  strokeWidth={1}
                />

                <XAxis
                  type="number"
                  dataKey="enterpriseCount"
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="number"
                  dataKey="schemePenetration"
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Scatter
                  data={data}
                  shape={<CustomDot />}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Labels */}
          <div className="relative text-[#0d1f4c]">

            {/* <div className="absolute left-1/2 -translate-x-1/2 text-[8px] text-gray-500">
              High Enterprise Count
            </div> */}

            <div className="absolute left-1/4 bottom-10 -translate-x-1/2 text-[8px] ">
              Low Enterprise Count
            </div>

            <div className="absolute right-1/4 translate-x-1/2 bottom-10 text-[8px]">
              High Enterprise Count
            </div>
          </div>
        </div>

        {/* FOCUS PANEL */}

        {focusAreas && (
          <div className="flex flex-col min-h-0">
            <div className="bg-emerald-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Target size={11} className="text-emerald-600 flex-shrink-0" />
                <p className="text-[9px] font-bold text-emerald-700">Focus Areas</p>
              </div>
              <p className="text-[8px] text-[#0d1f4c] leading-relaxed">{focusAreas}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}