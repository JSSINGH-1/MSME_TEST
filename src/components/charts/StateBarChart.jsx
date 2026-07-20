import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  LabelList
} from 'recharts';
import { Info } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

export default function StateBarChart({
  data,
  dataKey,
  color,
  label,
  type = 'bar',
  suffix = '',
  ylabel = '',
}) {
  const tooltipFormatter = (v) => [`${v}${suffix}`, label];
  
  const CustomTick = ({ x, y, payload }) => {
    const lines = payload.value.split('\n');

    return (
      <g transform={`translate(${x},${y})`}>
        
        <text
          textAnchor="middle"
          fill="#0d1f4c"
          fontSize={8}
          fontWeight={600}
          dx={0}
          dy={4}
        >
          {lines.map((line, i) => (
            <tspan
              key={i}
              x="0"
              dy={i === 0 ? 12 : 12}
            >
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      {/* <p className="text-[10px] font-bold text-[#0d1f4c] uppercase tracking-wide mb-3">
        {label}
      </p> */}
      <div className="text-[10px] font-bold text-[#0d1f4c] tracking-wide mb-3">
        <SectionHeader title={label} size="10px" icon={Info} prefIcon={false} inlineIcon={false} css="" />
      </div>
      {type === 'line' ? (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 25  , left: -25 , bottom: 15 }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="shortState"
              interval={0}
              tick={<CustomTick />}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) =>
                suffix === '%' ? `${value}%` : value
              }
              tick={{
                fontSize: 8,
                fill: '#0d1f4c',
              }}
              axisLine={false}
              tickLine={false}
              width={60}
              dx={-5}
            />

            
            <Tooltip
              contentStyle={{
                fontSize: 10,
                borderRadius: 6,
                border: '1px solid #e5e7eb',
              }}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.state || label
              }
              formatter={(v) => [`${v}${suffix}`, label]}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 3 }}
            >
            
            </Line>
          </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 20, bottom: 15, left: -25 }}
            barCategoryGap="35%"
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="shortState"
              interval={0}
              tick={<CustomTick />}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) =>
                suffix === '%' ? `${value}%` : value
              }
              tick={{
                fontSize: 8,
                fill: '#0d1f4c',
              }}
              axisLine={false}
              tickLine={false}
              label={{
                value: ylabel,
                angle: -90,
                style: {
                  fontSize: 8,
                  fill: '#0d1f4c',
                  fontWeight: 600,
                },
              }}
              // width={70}
            />

            <Tooltip
              contentStyle={{
                fontSize: 10,
                borderRadius: 6,
                border: '1px solid #e5e7eb',
              }}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.state || label
              }
              formatter={(v) => [`${v}${suffix}`, label]}
            />

            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[2, 2, 0, 0]}
              barSize={18}
            >
              <LabelList
                dataKey={dataKey}
                position="top"
                formatter={(value) =>
                  suffix === '%' ? `${value}%` : value
                }
                style={{
                  fontSize: 8,
                  fill: '#374151',
                  fontWeight: 600,
                }}
              />
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}