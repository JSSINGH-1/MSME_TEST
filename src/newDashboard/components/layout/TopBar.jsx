import { Download, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MonthYearPicker from '@/components/ui/MonthYearPicker';
import ministryText from '@/assets/ministry-text.png';
import emblemImg from '@/assets/emblem.png';

/**
 * TopBar — responsive header for Intelligence Dashboard.
 * mix-blend-mode:screen works correctly only when images are direct children
 * of the element with the background color (no z-index / transform / will-change
 * on intermediate wrappers, as those create stacking contexts that break blending).
 */
export default function TopBar({ title, subtitle, month, onMonth, showDownload = true, onOpenSidebar }) {
  const navigate = useNavigate();

  function handleSignOut() {
    sessionStorage.removeItem('msme_intel_auth');
    navigate('/new-dashboard/login', { replace: true });
  }

  return (
    <header className="bg-[#0d1f4c] text-white flex-shrink-0 border-b border-white/10">

      {/* ── Desktop: single row ─────────────────────────────── */}
      <div className="hidden lg:flex items-center h-[76px] px-4 xl:px-1 relative">

        {/* Left: ministry logo — NO z-index wrapper, blend needs direct backdrop */}
        <img
          src={ministryText}
          alt="Ministry of Micro, Small & Medium Enterprises"
          className="h-[52px] xl:h-[58px] 2xl:h-[62px] w-auto object-contain flex-shrink-0"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Center: absolute so title is always geometrically centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-[240px] xl:px-[280px]">
          <h1 className="text-base xl:text-lg 2xl:text-[22px] tracking-wider font-bold uppercase leading-tight text-center truncate w-full">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm xl:text-base 2xl:text-[17.5px] text-blue-300 tracking-wide mt-0.5 text-center truncate w-full">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest hidden xl:inline">Month</span>
          <MonthYearPicker value={month} onChange={onMonth} />
          {showDownload && (
            <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors
                               rounded-lg px-3 py-1.5 border border-white/20 text-[11px] font-medium whitespace-nowrap">
              <Download size={12} />
              Download Report
            </button>
          )}
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-red-500/30 transition-colors
                       rounded-lg px-2.5 py-1.5 border border-white/20 text-[11px] font-medium whitespace-nowrap"
          >
            <LogOut size={13} />
            <span className="hidden xl:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* ── Mobile / Tablet: two rows ───────────────────────── */}
      <div className="lg:hidden">
        {/* Row 1: hamburger · branding · controls */}
        <div className="flex items-center px-3 py-2 gap-2">
          <button
            onClick={onOpenSidebar}
            className="text-white p-1 rounded hover:bg-white/10 flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Emblem + ministry text — direct children so blend works */}
          <img
            src={emblemImg}
            alt=""
            className="h-9 sm:h-10 w-auto object-contain flex-shrink-0"
            style={{ mixBlendMode: 'screen' }}
          />
          <img
            src={ministryText}
            alt="Ministry of MSME"
            className="h-[36px] sm:h-[44px] w-auto object-contain flex-shrink-0"
            style={{ mixBlendMode: 'screen' }}
          />

          <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
            <MonthYearPicker value={month} onChange={onMonth} />
            {showDownload && (
              <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors
                                 rounded-lg px-2 py-1.5 border border-white/20 text-[11px] font-medium">
                <Download size={12} />
              </button>
            )}
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="flex items-center gap-1 bg-white/10 hover:bg-red-500/30 transition-colors
                         rounded-lg px-2 py-1.5 border border-white/20 text-[11px] font-medium"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>

        {/* Row 2: centered title */}
        <div className="px-3 pb-2 text-center">
          <h1 className="text-[11px] sm:text-xs tracking-wider font-bold uppercase leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[9px] sm:text-[10px] text-blue-300 tracking-wide mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

    </header>
  );
}
