/**
 * Badge — small pill label with severity variants.
 *
 * Props:
 *  label    {string}
 *  variant  {'success'|'warning'|'danger'|'info'|'neutral'}
 */
export default function Badge({ label, variant = 'neutral' }) {
  const styles = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100  text-amber-700  border-amber-200',
    danger:  'bg-red-100    text-red-700    border-red-200',
    info:    'bg-blue-100   text-blue-700   border-blue-200',
    neutral: 'bg-gray-100   text-gray-600   border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[variant] ?? styles.neutral}`}>
      {label}
    </span>
  );
}
