import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * TrendLineChart — small line chart panel.
 *
 * Props:
 *  data    {Array}
 *  dataKey {string}
 *  label   {string}
 *  color   {string}
 *  suffix  {string}
 */
export default function TrendLineChart({ data, dataKey, label, color = '#1e3a8a', suffix = '' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
      <p className="text-[10px] font-bold text-[#0d1f4c] tracking-wide mb-2 pb-5 text-center">{label}</p>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -25, bottom: 5}}>
          <CartesianGrid
  stroke="#e5e7eb"
  strokeDasharray="3 3"
  vertical={false}
/>
          <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#0d1f4c' }} axisLine={false} tickLine={false} dy={10} className="font-semibold" />
          <YAxis tick={{ fontSize: 8, fill: '#0d1f4c' }} axisLine={false} tickLine={false} dx={-15} className="font-semibold"/>
          <Tooltip
            contentStyle={{ fontSize: 10, borderRadius: 6, border: '1px solid #e5e7eb' }}
            formatter={v => [`${v}${suffix}`, label]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
