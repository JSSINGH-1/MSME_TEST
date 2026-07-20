/**
 * ProgressBar — thin inline progress bar with optional label.
 *
 * Props:
 *  value      {number}  — current value (0‒max)
 *  max        {number}  — maximum value (default 100)
 *  color      {'green'|'navy'|'red'|'orange'}
 *  showLabel  {boolean} — show value text on the right
 *  labelSuffix {string} — appended to the label (e.g. '%', ' Days')
 */
export default function ProgressBar({ value, max = 100, color = 'green', showLabel = true, labelSuffix = '' }) {
  const pct = Math.min((value / max) * 100, 100);

  const trackColor = {
    green:  'bg-emerald-500',
    navy:   'bg-blue-900',
    red:    'bg-red-500',
    orange: 'bg-orange-400',
  }[color] ?? 'bg-emerald-500';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${trackColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && (
        <span className="text-[11px] font-semibold text-[#0d1f4c]/500  text-right tabular-nums">
          {value}{labelSuffix}
        </span>
      )}
    </div>
  );
}
