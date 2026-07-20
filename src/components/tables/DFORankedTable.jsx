import ProgressBar from '../ui/ProgressBar';

/**
 * DFORankedTable — top-5 or bottom-5 DFO rankings.
 *
 * Props:
 *  data     {Array}   — from schemeData TOP_DFOS / BOTTOM_DFOS
 *  variant  {'top'|'bottom'}
 */
export default function DFORankedTable({ data, variant = 'top' }) {
  const isTop = variant === 'top';

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['Rank', 'DFO', 'State', 'Applications', 'Approval Rate', 'Sanctioned (₹ Cr)'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[11px] font-bold text-[#0d1f4c] tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.rank} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2 px-2">
                <span className={`inline-flex items-center justify-center  text-[10px] font-bold text-[#0d1f4c]`}>
                  {row.rank}
                </span>
              </td>
              <td className="py-2 px-2 font-medium text-[#0d1f4c]/800 whitespace-nowrap">{row.name}</td>
              <td className="py-2 px-2 text-[#0d1f4c]/500 whitespace-nowrap">{row.state}</td>
              <td className="py-2 px-2 tabular-nums text-[#0d1f4c]/700">{row.applications}</td>
              <td className="py-2 px-2 w-28">
                <ProgressBar value={row.approvalRate} max={100} color={isTop ? 'green' : 'red'} labelSuffix="%" />
              </td>
              <td className="py-2 px-2 tabular-nums font-medium text-[#0d1f4c]/700">{row.sanctioned.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
