/**
 * GaugeChart — pure SVG semi-circle gauge.
 * No external dependency needed.
 *
 * Props:
 *  score  {number}  — 0‒100
 *  label  {string}  — text below score (e.g. "Excellent")
 *  max    {number}  — maximum (default 100)
 */
export default function GaugeChart({ score, label = '', max = 100 }) {
  const pct      = Math.min(score / max, 1);
  const radius   = 70;
  const cx       = 100;
  const cy       = 90;
  const startAngle = Math.PI;           // 180° — left
  const endAngle   = 0;                 // 0°   — right
  const arcLength  = endAngle - startAngle; // always negative → handled below

  // Helper: polar to cartesian
  const polarToCartesian = (angle) => ({
    x: cx + radius * Math.cos(angle),
    y: cy - radius * Math.sin(angle),
  });

  // Track (full semi-circle)
  const trackStart = polarToCartesian(Math.PI);
  const trackEnd   = polarToCartesian(0);

  // Fill arc (proportion of semi-circle)
  const fillAngle  = Math.PI - pct * Math.PI;  // from 180° down to (180° - pct*180°)
  const fillEnd    = polarToCartesian(fillAngle);

  // Colour based on score
  const gaugeColor =
    score >= 80 ? '#059669' :
    score >= 60 ? '#f59e0b' :
                  '#ef4444';

  

  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 0 1 ${trackEnd.x} ${trackEnd.y}`;
  const fillPath  = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 0 1 ${fillEnd.x} ${fillEnd.y}`;

  return (
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px] mx-auto">
        {/* Track */}
        <path d={trackPath} fill="none" stroke="#e5e7eb" strokeWidth="14" strokeLinecap="round" />
        {/* Fill */}
        <path d={fillPath}  fill="none" stroke={gaugeColor} strokeWidth="14" strokeLinecap="round" />
        {/* Score text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="26" fontWeight="800" fill="#1f2937">{score}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#9ca3af">/100</text>
        {/* Label */}
        <text x={cx} y={cy + 24} textAnchor="middle" fontSize="10" fontWeight="700" fill={gaugeColor}>{label}</text>
      </svg>
  );
}
