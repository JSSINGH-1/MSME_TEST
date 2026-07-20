import { Construction } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

/**
 * PlaceholderPage — generic "coming soon" shell.
 * Used for pages that aren't built yet.
 *
 * Props:
 *  title     {string}
 *  subtitle  {string}
 *  bullets   {string[]}  — list of planned features
 */
export default function PlaceholderPage({ title, subtitle, bullets = [] }) {
  const { onOpenSidebar } = useOutletContext() ?? {};
  const [month, setMonth] = useState('May 2025');

  return (
    <>
      <TopBar title={title} subtitle={subtitle} month={month} onMonth={setMonth} onOpenSidebar={onOpenSidebar} />
      <main className="flex-1 overflow-y-auto flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-5">
            <Construction size={28} className="text-blue-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
          <p className="text-sm text-gray-400 mb-6">
            This page is under development. 
          </p>
          {bullets.length > 0 && (
            <ul className="text-left space-y-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
