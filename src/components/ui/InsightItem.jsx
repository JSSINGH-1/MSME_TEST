import { CheckCheck, AlertCircle, Lightbulb } from 'lucide-react';

const VARIANT_MAP = {
  success: { icon: CheckCheck,   bg: 'bg-emerald-50', border: 'border-emerald-200', iconColor: 'text-emerald-600' },
  warning: { icon: AlertCircle,  bg: 'bg-red-50',     border: 'border-red-200',     iconColor: 'text-red-500' },
  info:    { icon: Lightbulb,    bg: 'bg-blue-50',    border: 'border-blue-200',    iconColor: 'text-blue-600' },
};

/**
 * InsightItem — a colour-coded insight/recommendation row.
 *
 * Props:
 *  type  {'success'|'warning'|'info'}
 *  text  {string}
 */
export default function InsightItem({ type, text }) {
  const { icon: Icon, bg, border, iconColor } = VARIANT_MAP[type] ?? VARIANT_MAP.info;
  return (
    <div className={`flex gap-2.5 p-2.5 rounded-lg border ${bg} ${border}`}>
      <Icon size={13} className={`${iconColor} mt-0.5 flex-shrink-0`} />
      <p className="text-[11px] text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
