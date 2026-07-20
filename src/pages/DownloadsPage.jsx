import PlaceholderPage from '@/components/ui/PlaceholderPage';

// TODO: Build the Downloads page
// Suggested API: GET /api/downloads/list
export default function DownloadsPage() {
  return (
    <PlaceholderPage
      title="Downloads"
      subtitle="Data Exports & Documents"
      bullets={[
        'Raw data exports in CSV and Excel format',
        'Scheme guidelines and circular PDFs',
        'DFO-level data packs by state and month',
        'Bulk download with date range selection',
        'Download history and audit log',
      ]}
    />
  );
}
