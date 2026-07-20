import ProgressBar from '../ui/ProgressBar';

/**
 * StateTable — state-wise scheme performance.
 *
 * Props:
 *  data  {Array}  — from schemeData.js STATE_PERFORMANCE
 */
export default function StateTable({ data }) {
  const maxSanctioned = Math.max(...data.map(d => d.sanctioned));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {['State', 'Applications', 'Approved', 'Approval Rate (%)', 'Sanctioned (₹ Cr)', 'Employment'].map(h => (
              <th key={h} className="text-left py-2 px-2 text-[11px] text-[#0d1f4c] font-bold tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.state} className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
              <td className="py-2 px-2 font-medium text-[#0d1f4c]-800 whitespace-nowrap">{row.state}</td>
              <td className="py-2 px-2 tabular-nums text-[#0d1f4c]-700">{row.applications.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 tabular-nums text-[#0d1f4c]-700">{row.approved.toLocaleString('en-IN')}</td>
              <td className="py-2 px-2 w-36">
                <ProgressBar value={row.approvalRate} max={100} color="green" labelSuffix="%" />
              </td>
              <td className="py-2 px-2 w-40">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <ProgressBar
                      value={Math.round((row.sanctioned / maxSanctioned) * 100)}
                      max={100}
                      color="navy"
                      showLabel={false}
                    />
                  </div>
                  <span className="text-[11px] text-gray-700 whitespace-nowrap">
                    {row.sanctioned.toFixed(2)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex-1">
                    <ProgressBar
                      value={Math.round((Math.round((row.employment / 4000) * 56)))}
                      max={100}
                      color="orange"
                      showLabel={false}
                    />
                  </div>  
                  <span className="tabular-nums text-[#0d1f4c]-700">{row.employment.toLocaleString('en-IN')}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
