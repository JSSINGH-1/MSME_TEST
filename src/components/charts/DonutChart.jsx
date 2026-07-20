import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DonutChart({ data, size = 220 }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex items-center justify-between gap-4 h-full">
      {/* Donut */}
      <div className="flex-1 min-w-0 w-full">
        <ResponsiveContainer width="99%" height={size}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  opacity={
                    activeIndex === null || activeIndex === index
                      ? 1
                      : 0.35
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                fontSize: 10,
                borderRadius: 6,
                border: '1px solid #e5e7eb',
              }}
              formatter={(value) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col gap-3 min-w-[180px]">
        {data.map((item, index) => (
          <div
            key={item.name}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${activeIndex === index
                ? 'font-bold text-[#0d1f4c] scale-105'
                : 'text-gray-600'
              }`}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-[11px]">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}