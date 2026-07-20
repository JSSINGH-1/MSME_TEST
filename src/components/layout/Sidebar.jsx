import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navigation';
import emblemImg from '@/assets/emblem.png';
import { X } from 'lucide-react';


export default function Sidebar({ onClose }) {
  return (
    <aside
      className="flex flex-col flex-shrink-0 overflow-y-auto bg-[#0d1f4c] h-full
                 w-[156px] min-w-[156px]
                 lg:w-[148px] lg:min-w-[148px]
                 xl:w-[148px] xl:min-w-[148px]
                 2xl:w-[148px] 2xl:min-w-[148px]"
    >
      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden self-end m-2 p-1 text-white hover:bg-white/10 rounded"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      )}

      {/* ── Brand / Logo area (hidden on mobile overlay) ──── */}

      <div className="hidden lg:flex items-center justify-center border-b border-white/10
                      h-[76px] px-4 xl:px-5"
        style={{ paddingLeft: '40px', paddingRight: '30px' }}>
        <img
          src={emblemImg}
          alt=""
          className="h-[56px] xl:h-[62px] w-full object-fill"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      {/* ── Navigation ────────────────────────────── */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => (
          <NavLink
            key={id}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-[11px] xl:py-[13px] text-[10px] xl:text-[11px] leading-tight transition-all border-l-4 ${isActive
                ? 'bg-white/10 text-white border-blue-400 font-semibold'
                : 'text-blue-200 hover:bg-white/5 hover:text-white border-transparent'
              }`
            }
          >
            <Icon size={14} className="flex-shrink-0" />
            <span className="max-w-[70px] break-words"
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── Footer note ───────────────────────────── */}
      <div className="px-2 py-2 border-t border-white/10">
        <p className="text-[8px] text-blue-400 text-center leading-tight">
          Data is indicative &amp; for reference only
        </p>
      </div>
    </aside>
  );
}
