import PlaceholderPage from '@/components/ui/PlaceholderPage';

// TODO: Build the Awareness Campaigns dashboard
// Suggested API: GET /api/campaigns?month=YYYY-MM
export default function CampaignsPage() {
  return (
    <PlaceholderPage
      title="Awareness Campaigns Dashboard"
      subtitle="Campaign Level View"
      bullets={[
        'Campaign calendar with upcoming and completed events',
        'DFO-wise campaign count and reach metrics',
        'Sector-targeted campaign breakdown',
        'Campaign effectiveness: attendance vs. scheme application conversion',
        'Media/outreach channel analysis',
      ]}
    />
  );
}
