import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * MonthYearPicker — simple month + year selector.
 *
 * Props:
 *   value    {string}    "May 2025"
 *   onChange {function}  called with "May 2025" on selection
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const MONTH_FULL = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export default function MonthYearPicker({ value, onChange }) {
  const parts        = (value ?? 'Jul 2026').split(' ');
  const initMonth    = parts[0] || 'Jul';
  const initYear     = parseInt(parts[1], 10) || 2026;

  const [open,     setOpen]     = useState(false);
  const [viewYear, setViewYear] = useState(initYear);
  const ref = useRef(null);

  // Sync view year when value prop changes externally
  useEffect(() => {
    const y = parseInt((value ?? '').split(' ')[1], 10);
    if (!isNaN(y)) setViewYear(y);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (monthIdx) => {
    onChange?.(`${MONTH_FULL[monthIdx]} ${viewYear}`);
    setOpen(false);
  };

  const selectedMonthIdx = MONTH_FULL.indexOf(parts[0]);
  const selectedYear     = initYear;

  const minYear = 1920;
  const maxYear = new Date().getFullYear();

  return (
    <div className="relative" ref={ref}>

      {/* ── Trigger ───────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors
                   rounded-lg px-3 py-1.5 border border-white/20 text-white"
      >
        <Calendar size={13} className="text-blue-300 flex-shrink-0" />
        <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">{value}</span>
        <ChevronRight
          size={12}
          className={`text-blue-300 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {/* ── Dropdown ──────────────────────────────────────── */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl
                     shadow-2xl border border-gray-200 overflow-hidden select-none"
          style={{ width: '220px' }}
        >
          {/* Year navigation */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1f4c]">
            <button
              onClick={() => setViewYear(y => Math.max(y - 1, minYear))}
              disabled={viewYear <= minYear}
              className="p-1 rounded text-blue-200 hover:text-white hover:bg-white/10
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-base font-bold text-white">{viewYear}</span>

            <button
              onClick={() => setViewYear(y => Math.min(y + 1, maxYear))}
              disabled={viewYear >= maxYear}
              className="p-1 rounded text-blue-200 hover:text-white hover:bg-white/10
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1.5 p-3">
            {MONTHS.map((abbr, idx) => {
              const isSelected = idx === selectedMonthIdx && viewYear === selectedYear;
              const isCurrent  = idx === new Date().getMonth() && viewYear === new Date().getFullYear();

              return (
                <button
                  key={abbr}
                  onClick={() => select(idx)}
                  className={`py-2 rounded-lg text-[12px] font-semibold transition-all
                    ${isSelected
                      ? 'bg-[#0d1f4c] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {abbr}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}