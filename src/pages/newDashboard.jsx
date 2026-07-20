import PlaceholderPage from '@/components/ui/PlaceholderPage';

// TODO: Build the Reports page
// Suggested API: GET /api/reports/list
export default function newDashboardPage() {
  return (
    <PlaceholderPage
      title="newDashboard"
      subtitle="newDashboard"
      bullets={[
        'Monthly performance report generator',
        'Scheme-wise PDF / Excel export',
        'Historical report archive with search and filter',
        'Scheduled report subscription management',
        'Custom report builder (select metrics + date range + scope)',
      ]}
    />
  );
}
