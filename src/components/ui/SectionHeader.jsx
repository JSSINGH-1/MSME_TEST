import { ArrowRight } from 'lucide-react';

/**
 * SectionHeader — consistent header for every dashboard section.
 *
 * Props:
 *  title    {string}
 *  onAction {function}  — optional right-side link callback
 *  action   {string}    — label for the right-side link
 *  icon     {LucideIcon} — optional icon next to title
 */
export default function SectionHeader({ title, action, onAction, icon: Icon, color, Info, size='16px', prefIcon=true, inlineIcon=true,css: CSS, GeneralCss: GCSS}) {
  return (
    <div className={`flex items-center justify-between mb-3 ${GCSS} p pl-1.5`}>
      <div className="flex items-center gap-2">
        {prefIcon && Icon && (
          <Icon size={15} className="text-gray-400" color={color} />
        )}

        <h3
          className={`flex items-center gap-2 font-bold text-[#0d1f4c] text-[${size}]`}
          style={{ fontSize: size }}
        >
          {title}

          {!prefIcon && inlineIcon && Icon && (
            <Icon
              size={15}
              className={`text-gray-400 ${CSS || ''}`}
              color={color}
            />
          )}
        </h3>
      </div>
      {!prefIcon && !inlineIcon && Icon && (<Icon size={15} className={`text-gray-400 ${CSS || " "}`} color={color} />)}
      {action && onAction && (  
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          {action} <ArrowRight size={11} />
        </button>
      )}
    </div>
  );
}
