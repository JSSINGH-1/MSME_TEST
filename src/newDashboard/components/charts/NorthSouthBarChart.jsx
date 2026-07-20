import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LabelList,
} from 'recharts';
import { Target } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-gray-600">{label?.replace('\n', ' ')}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: <strong>{p.value?.toLocaleString('en-IN')}</strong>
        </p>
      ))}
    </div>
  );
};

const CustomTick = ({ x, y, payload }) => {
  const lines = (payload.value || '').split('\n');

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        fill="#0d1f4c"
        fontSize={7.5}
        fontWeight={500}
      >
        {lines.map((line, i) => (
          <tspan
            key={i}
            x="0"
            dy={i === 0 ? 12 : 10}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

/**
 * NorthSouthBarChart — grouped comparison bars.
 * Props:
 *   d1Name   {string}
 *   d2Name   {string}
 *   metrics  {Array}  — [{ metric, d1, d2 }]
 *   takeaway {string}
 */
export default function NorthSouthBarChart({ d1Name, d2Name, metrics = [], takeaway }) {
  const chartData = metrics.map(m => ({
    name: m.metric,
    [d1Name]: m.d1,
    [d2Name]: m.d2,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex-1">
      {/* <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-3">
        {d1Name} vs {d2Name} — Key Metrics
      </p> */}

      <SectionHeader title={`${d1Name} vs ${d2Name} — Key Metrics`} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-0 w-full">
          <ResponsiveContainer width="99%" height={180}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 2, left: 0, bottom: 30 }}
              barCategoryGap="30%"
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              {/* <XAxis
                dataKey="name"
                tick={{ fontSize: 7, fill: '#6b7280' }}
                axisLine={false} tickLine={false}
                interval={0}
                tickFormatter={v => v.replace('\n', ' ')}
                angle={-15} textAnchor="end"
              /> */}
              <XAxis
                dataKey="name"
                tick={<CustomTick />}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 8, fill: '#0d1f4c' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend
                wrapperStyle={{ fontSize: 9, paddingTop: 8 }}
                iconSize={8} iconType="square"
              /> */}

              <Legend
                verticalAlign="top"
                align="center"
                iconType="square"
                iconSize={8}
                wrapperStyle={{
                  fontSize: 9,
                  paddingBottom: 10,
                }}
              />
              <Bar dataKey={d1Name} fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={14}>
                <LabelList dataKey={d1Name} position="top"
                  formatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v}
                  style={{ fontSize: 7, fill: '#374151', fontWeight: 600 }} />
              </Bar>
              <Bar dataKey={d2Name} fill="#0d9488" radius={[2, 2, 0, 0]} barSize={14}>
                <LabelList dataKey={d2Name} position="top"
                  formatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v}
                  style={{ fontSize: 7, fill: '#374151', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Takeaway */}
        {takeaway && (
          <div className="md:w-40 flex-shrink-0">
            <div className="bg-blue-50 border border-gray-200 rounded-lg p-3 h-full flex flex-col">
              {/* <p className="text-[10px] font-bold text-gray-700 mb-2">Key Takeaway</p> */}
              <SectionHeader title="Insights" size="10px" icon={Target} color="blue-700" GeneralCss="mb-2 " />
              <p className="text-[10px] text-[#0d1f4c] leading-relaxed text-left">{takeaway}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
