import {
  Landmark,
  ArrowLeftFromLine,
} from 'lucide-react';


/**
 * Sidebar navigation items.
 * `path` maps directly to a react-router-dom route.
 */
export const NAV_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard', icon: Landmark, path: '/new-dashboard' },
  { id: 'Return',    icon: ArrowLeftFromLine, iconSize: '20px', path: '/' },
];

export const MONTHS = ['Jul 2026', 'Jun 2026', 'May 2026', 'Apr 2026', 'Mar 2026'];
