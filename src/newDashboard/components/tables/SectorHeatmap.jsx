/**
 * SectorHeatmap — color-coded table: districts (rows) × sectors (cols).
 * Props:
 *   data {object} — from getSectorHeatmap(): { columns, rows: [{ district, data[] }] }
 */

import SectionHeader from "../ui/SectionHeader";


export default function SectorHeatmap({ data }) {

  if (!data?.columns?.length) return null;

  const isAllDistrictsView = data.rows.length > 2;
  const title = isAllDistrictsView
    ? 'Sector Presence Heatmap - All Districts (By MSME Count)'
    : `Sector Presence Heatmap - ${data.rows[0]?.district} vs ${data.rows[1]?.district} (By MSME Count)`;

  const values = data.rows.flatMap((row) => row.data);
  const max = Math.max(...values, 1);
  const color = (value) => {
    const pct = value / max;
    if (pct > 0.74) return 'bg-emerald-700 text-white';
    if (pct > 0.5) return 'bg-emerald-500 text-white';
    if (pct > 0.25) return 'bg-emerald-300 text-emerald-950';
    return 'bg-emerald-100 text-emerald-950';
  };

  return (
    <Panel className="p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        {/* <Title>Sector Presence Heatmap - {data.rows[0]?.district} vs {data.rows[1]?.district} (By MSME Count)</Title> */}
        <SectionHeader title={title} />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-gray-500">Low</span>
          {['bg-emerald-100', 'bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700'].map((item) => <span key={item} className={`h-3 w-5 ${item}`} />)}
          <span className="text-[10px] font-bold text-gray-500">High</span>
        </div>
      </div>
      <div className="overflow-x-auto -mx-3 px-3">
        <table className="w-full border-collapse text-[10px]" style={{ minWidth: '600px' }}>
          <thead>
            <tr>
              <th className="w-[88px] border border-gray-200 bg-gray-50 p-1 text-left font-black text-[#0d1f4c]">District</th>
              {data.columns.map((column) => (
                <th key={column} className="border border-gray-200 bg-gray-50 p-1 font-bold leading-tight text-[#0d1f4c]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.district}>
                <td className="border border-gray-200 bg-white p-1 font-black text-[#0d1f4c]">{row.district}</td>
                {row.data.map((value, index) => (
                  <td key={`${row.district}-${data.columns[index]}`} className={`border border-white p-1 text-center font-bold tabular-nums ${color(value)}`}>
                    {value.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function Panel({ children, className = '' }) {
  return (
    <section className={`bg-white border border-gray-200 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function Title({ children }) {
  return <h2 className="text-[20px] font-black leading-none text-[#0d1f4c]">{children}</h2>;
}