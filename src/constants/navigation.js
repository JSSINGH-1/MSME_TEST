import {
  Users,
  FileText,
  BookOpen,
  Gauge,
  ClipboardList,
} from 'lucide-react';

/**
 * Sidebar navigation items.
 * `path` maps directly to a react-router-dom route.
 *
 * Removed redundant/empty screens:
 *   Overview, State Performance, Awareness Campaigns, Downloads
 */
export const NAV_ITEMS = [
  { id: 'dfo',           label: 'DFO Performance',       icon: Users,          path: '/dfo-performance' },
  { id: 'scheme',        label: 'Scheme Performance',    icon: FileText,        path: '/scheme-performance' },
  { id: 'reports',       label: 'Reports',               icon: BookOpen,        path: '/reports' },
  { id: 'dfo-entry',     label: 'DFO Metrics Entry',     icon: ClipboardList,  path: '/dfo-entry' },
  { id: 'new-dashboard', label: 'Intelligence & Planning',icon: Gauge,          path: '/new-dashboard' },
];

export const MONTHS = ['May 2025', 'Apr 2025', 'Mar 2025', 'Feb 2025', 'Jan 2025'];

