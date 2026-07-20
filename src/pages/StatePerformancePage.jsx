import PlaceholderPage from '@/components/ui/PlaceholderPage';

// TODO: Build the state performance drilldown page
// Suggested API: GET /api/states/performance?month=YYYY-MM
export default function StatePerformancePage() {
  return (
    <PlaceholderPage
      title="State Performance Dashboard"
      subtitle="State Level View"
      bullets={[
        'All-state comparison table with sortable columns',
        'State-level drilldown: click any state to see its DFOs',
        'Scheme-wise filter across all states',
        'Approval rate, sanction amount, and employment charts per state',
        'Export to Excel / CSV',
      ]}
    />
  );
}
