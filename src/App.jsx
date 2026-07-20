import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import LoginPage, { isAuthenticated } from '@/pages/LoginPage';
import NewDashLoginPage, { isNewDashAuthenticated } from '@/newDashboard/pages/NewDashLoginPage';

// Layout
import AppLayout from '@/components/layout/AppLayout';
import { App as A } from '@/newDashboard/routes';

import BookAppointmentPage from '@/pages/BookAppointmentPage';

// Pages — fully built
import SchemePerformancePage from '@/pages/SchemePerformancePage';
import DFOOverviewPage       from '@/pages/DFOOverviewPage';
import DFODetailPage         from '@/pages/DFODetailPage';

// Pages — stubs (ready to build out)
import OverviewPage          from '@/pages/OverviewPage';
import StatePerformancePage  from '@/pages/StatePerformancePage';
import CampaignsPage         from '@/pages/CampaignsPage';
import ReportsPage           from '@/pages/ReportsPage';
import DownloadsPage         from '@/pages/DownloadsPage';
import DFOMetricsEntryPage   from '@/pages/DFOMetricsEntryPage';

/** Route guard: redirects to login if not authenticated */
function RequireAuth({ children, check, loginPath }) {
  return check() ? children : <Navigate to={loginPath} replace />;
}

/**
 * App — root route tree.
 */
export default function App() {
  return (
    <Routes>
      {/* ── Login pages ────────────────────────────── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/new-dashboard/login" element={<NewDashLoginPage />} />
      <Route path="/book-appointment" element={<BookAppointmentPage />} />

      {/* ── Old DFO Dashboard (protected) ──────────── */}
      <Route element={
        <RequireAuth check={isAuthenticated} loginPath="/login">
          <AppLayout />
        </RequireAuth>
      }>
        {/* Default: redirect to DFO Performance (Overview removed — same data) */}
        <Route index element={<Navigate to="/dfo-performance" replace />} />
        <Route path="/scheme-performance"      element={<SchemePerformancePage />} />
        <Route path="/dfo-performance"         element={<DFOOverviewPage />} />
        <Route path="/dfo-performance/:dfoId"  element={<DFODetailPage />} />
        <Route path="/state-performance" element={<StatePerformancePage />} />
        <Route path="/campaigns"         element={<CampaignsPage />} />
        <Route path="/reports"           element={<ReportsPage />} />
        <Route path="/downloads"         element={<DownloadsPage />} />
        <Route path="/dfo-entry"         element={<DFOMetricsEntryPage />} />
      </Route>

      {/* ── New Intelligence Dashboard (protected) ─── */}
      <Route path="/new-dashboard/*" element={
        <RequireAuth check={isNewDashAuthenticated} loginPath="/new-dashboard/login">
          <A />
        </RequireAuth>
      } />

      {/* Catch-all → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
