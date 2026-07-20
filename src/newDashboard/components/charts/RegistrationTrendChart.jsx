import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { TrendingUp, AlertCircle, Target } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const INSIGHT_ICONS = { trend: TrendingUp, alert: AlertCircle, action: Target };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-gray-700">{payload[0]?.payload?.label?.replace('\n', ' ')}</p>
      <p className="text-blue-700 font-bold">{payload[0]?.value?.toLocaleString('en-IN')}</p>
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
          <tspan key={i} x="0" dy={i === 0 ? 12 : 10}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

/**
 * RegistrationTrendChart
 * Props:
 *   data     {Array}  — [{ year, label, value }]
 *   insights {Array}  — [{ text }]
 *   title    {string}
 */
export default function RegistrationTrendChart({ data = [], insights = [], title = 'MSME Registrations Trend' }) {
  const peakEntry = data.reduce((a, b) => (b.value > a.value ? b : a), data[0] ?? {});
  const iconTypes = ['trend', 'alert', 'action'];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      {/* <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-3">{title}</p> */}
      <SectionHeader title={title} />
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Chart */}
        <div className="flex-1 min-w-0 w-full">
          <ResponsiveContainer width="99%" height={180}>
            <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              {/* <XAxis
                dataKey="label"
                tick={{ fontSize: 7, fill: '#6b7280' }}
                axisLine={false} tickLine={false}
                interval={0}
                tickFormatter={v => v.replace('\n', ' ')}
                angle={-20} textAnchor="end"
              /> */}
              <XAxis
                dataKey="label"
                tick={<CustomTick />}
                interval={0}
                axisLine={false}
                tickLine={false}
              />
              {/* <YAxis
                tick={{ fontSize: 8, fill: '#6b7280' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
                width={32}
              /> */}
              <YAxis
                tick={{ fontSize: 8, fill: '#0d1f4c' }}
                axisLine={false}
                tickLine={false}
                width={34}
                tickFormatter={(v) => `${Math.round(v / 1000)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Peak marker */}
              {peakEntry?.year && (
                <ReferenceDot
                  x={peakEntry.label} y={peakEntry.value}
                  r={5} fill="#1e3a8a" stroke="white" strokeWidth={2}
                />
              )}
              <Line
                type="monotone" dataKey="value"
                stroke="#1e3a8a" strokeWidth={2.5}
                dot={{ fill: '#1e3a8a', r: 3 }}
                activeDot={{ r: 5, fill: '#1e3a8a' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights panel */}
        <div className="w-full md:w-48 flex-shrink-0 bg-blue-50 border border-gray-200 rounded-lg p-3 self-start">
          {/* <p className="text-[10px] font-bold text-gray-700 mb-3">
            Insights
          </p> */}
          <SectionHeader title="Insights" size="10px" GeneralCss="pl-3 mb-2" />
          <div className="space-y-4">
            {insights.map((text, i) => {
              const iconType = iconTypes[i % iconTypes.length];
              const Icon = INSIGHT_ICONS[iconType];
              const colors = ['text-emerald-600', 'text-red-500', 'text-blue-600'];
              return (
                <div className="flex gap-2">
                  <Icon
                    size={13}
                    className={`${colors[i % 3]} flex-shrink-0 mt-0.5`}
                  />
                  <p className="text-[10px] text-[#0d1f4c] leading-relaxed">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
