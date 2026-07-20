/**
 * ZoneRankingTable — ranked table of DFOs in a zone.
 *
 * Props:
 *  data  {Array}  — from dfoDetailData ZONE_RANKING[dfoId]
 */
export default function ZoneRankingTable({ data }) {
  return (
    <div className="overflow-x-auto border border-gray-200">
    {/* <div className="overflow-x-auto"> */}
      <table className="w-full text-xs ">
        <thead>
          <tr className="border-b-2 border-gray-300">
          {/* <tr> */}
            {['Rank', 'DFO', 'MSMEs Attended', 'Resolution %', 'Conversion %', 'TAT (Days)', 'Score'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[9px] font-bold text-[#0d1f4c] uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#0d1f4c] text-[10px] font-medium">
          {data.map((row) => (
            <tr
              key={row.rank}
              className={` transition-colors ${row.isHighlighted ? '  border border-emerald-100 rounded-lg bg-emerald-50 font-semibold' : ' border-t border-gray-100 hover:bg-gray-50'}`}
            >
              <td className="py-2 px-2 text-gray-600">{row.rank}</td>
              <td className={`py-2 px-2 whitespace-nowrap ${row.isHighlighted ? 'text-blue-700' : 'text-gray-800'}`}>{row.name}</td>
              <td className="py-2 px-2 tabular-nums ">{row.msmeCatered}</td>
              <td className="py-2 px-2 tabular-nums ">{row.resolution.toFixed(2)}%</td>
              <td className="py-2 px-2 tabular-nums">{row.conversion.toFixed(2)}%</td>
              <td className="py-2 px-2 tabular-nums ">{row.tat.toFixed(2)}</td>
              <td className="py-2 px-2">
                <span className={`font-bold tabular-nums ${row.isHighlighted ? 'text-blue-700' : 'text-gray-700'}`}>
                  {row.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
