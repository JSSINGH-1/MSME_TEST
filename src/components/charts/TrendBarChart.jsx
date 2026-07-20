import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * TrendBarChart — vertical bar chart, used in scheme performance trend section.
 *
 * Props:
 *  data      {Array}   — recharts-compatible array
 *  dataKey   {string}  — key to chart
 *  color     {string}  — hex color for bars
 *  label     {string}  — tooltip label
 *  formatter {fn}      — value formatter for tooltip
 */
export default function TrendBarChart({ data, dataKey, color, label, formatter }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
      <ResponsiveContainer width="100%" height={90}>
        <BarChart data={data} margin={{ top: 2, right: 2, left: -30, bottom: 2 }}>
          <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 8, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 10, borderRadius: 6, border: '1px solid #e5e7eb' }}
            formatter={v => [formatter ? formatter(v) : v, label]}
          />
          <Bar dataKey={dataKey} fill={color} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
