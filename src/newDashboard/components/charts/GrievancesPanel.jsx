import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Section } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useState } from 'react';

export default function GrievancesPanel({ data, title }) {
  if (!data) return null;

  const [activeIndex, setActiveIndex] = useState(null);

  const donutData = [
    { name: data.d1Name, value: data.d1, color: '#1e3a8a' },
    { name: data.d2Name, value: data.d2, color: '#0d9488' },
  ];

  const maxCount = Math.max(
    ...(data.categories ?? []).map(c => c.count),
    1
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full">
      {/* <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-3">
        {title}
      </p> */}
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[120px_1fr_180px] gap-4 items-start">

        {/* DONUT + LEGEND */}
        <div className="flex flex-col items-center">
          <div
            style={{
              width: 100,
              height: 100,
              position: 'relative',
            }}
          >
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>

                <Pie
                  data={donutData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {donutData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      opacity={
                        activeIndex === null || activeIndex === i
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
                  formatter={v => [
                    v.toLocaleString('en-IN'),
                    '',
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-black text-gray-800 leading-none">
                {data.total?.toLocaleString('en-IN')}
              </span>
              <span className="text-[7px] text-[#0d1f4c] font-medium  mt-0.5">
                Total
              </span>
              <span className="text-[7px] font-medium text-[#0d1f4c]">
                Grievances
              </span>
            </div>
          </div>


          <div className="space-y-1 mt-2 w-full">
            {donutData.map((d, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${activeIndex === i
                  ? 'font-bold text-[#0d1f4c] scale-105'
                  : 'text-gray-600'
                  }`}
              >
                <div
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{
                    backgroundColor: d.color,
                  }}
                />

                <p className="text-[8px] text-[#0d1f4c]">
                  {d.name}:{' '}
                  <strong>
                    {d.value?.toLocaleString('en-IN')}
                  </strong>

                  <span className="text-[#0d1f4c] ml-1">
                    ({i === 0 ? data.d1Pct : data.d2Pct}%)
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY BREAKDOWN */}
        <div className='text-[#0d1f4c]'>
          <p className="text-[9px] font-bold  uppercase tracking-wide mb-2">
            Grievances by Category
          </p>

          <div className="space-y-1.5">
            {data.categories?.map((cat, i) => (
              <div key={i} className='text-[#0d1f4c]/70'>
                <div className="flex justify-between text-[9px]  mb-0.5">
                  <span>{cat.name}</span>

                  <span className="font-semibold tabular-nums font-bold">
                    {cat.count?.toLocaleString('en-IN')} ({cat.pct}%)
                  </span>
                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (cat.count / maxCount) * 100
                      )}%`,

                      backgroundColor:
                        i < 3
                          ? '#1e3a8a'
                          : i === 3
                            ? '#f97316'
                            : '#d1d5db',


                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALERT PANEL */}
        {data.alert && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 h-full">
            <div className="flex gap-1.5">
              {/* <AlertTriangle
                size={11}
                className="text-red-500 flex-shrink-0 mt-0.5" 
              /> */}

              <div className='flex flex-col'>
                {/* <p className="text-[10px] font-bold text-red-600 mb-1">
                  Alert
                </p>   */}

                <SectionHeader title="Alert" icon={AlertTriangle} color="red-500" GeneralCss='pl-0 text-red-500' />

                <p className="text-[10px] text-[#0d1f4c] leading-relaxed mt-2 ml-2 ">
                  {data.alert}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}