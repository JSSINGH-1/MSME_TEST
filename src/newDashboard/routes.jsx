import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AppLayout from '@/newDashboard/components/layout/AppLayout';

// Pages — fully built
import SchemePerformancePage from '@/pages/SchemePerformancePage';
import DFOOverviewPage       from '@/pages/DFOOverviewPage';
import DFODetailPage         from '@/pages/DFODetailPage';

// // Pages — stubs (ready to build out)
import OverviewPage          from '@/pages/OverviewPage';
import StatePerformancePage  from '@/pages/StatePerformancePage';
import CampaignsPage         from '@/pages/CampaignsPage';
import ReportsPage           from '@/pages/ReportsPage';
import DownloadsPage         from '@/pages/DownloadsPage';

import DFOIntelligencePage from './pages/DFOIntelligencePage';
import DFOIntelligenceReferencePreview from './pages/DFOIntelligenceReferencePreview';
import DFOMetricsEntryPage from './pages/DFOMetricsEntryPage';

/**
 * App — root route tree.
 *
 * All pages share the AppLayout (Sidebar + TopBar shell).
 * DFO Detail is a nested route under /dfo-performance/:dfoId
 * so the breadcrumb can navigate back cleanly.
 *
 * To add a new page:
 *  1. Create src/pages/YourPage.jsx
 *  2. Add a <Route path="/your-path" element={<YourPage />} /> here
 *  3. Add the matching entry to src/constants/navigation.js
 */
export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DFOIntelligencePage />} />
        <Route path="dfo-entry" element={<DFOMetricsEntryPage />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/new-dashboard" replace />} />
      </Route>
    </Routes>
  );
}
