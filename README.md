# DRISHTI Portal - MSME DFO Performance Dashboard

Welcome to the DRISHTI Portal! This is the core platform for tracking, evaluating, and deriving insights on MSME Scheme Performance, specifically tailored for DFO (Development and Facilitation Office) operations. 

This README serves as an exhaustive Knowledge Transfer (KT) document for any incoming developer, architect, or contributor. It covers every file, component, and routing path within the project to ensure you can onboard seamlessly.

---

## 🏗 Technical Overview

The DRISHTI Portal is a modern, single-page application (SPA) built using React. It leverages a component-based architecture for maintainability and scalability. The application primarily serves as an interactive dashboard that visualizes large datasets related to MSME schemes, budgets, and DFO performance metrics. It uses responsive design principles to ensure a seamless experience across desktop and mobile devices.

### Tech Stack
- **Frontend Framework**: React (via Vite for fast HMR and optimized builds)
- **Routing**: React Router DOM (client-side routing)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Icons**: Lucide React
- **Data Visualization**: Recharts (for SVG-based interactive charts)
- **State Management**: React Context API

---

## 📂 Exhaustive Project Structure & File Breakdown

The project codebase is contained entirely within the `src/` directory. The structure is separated into the "Legacy/Standard Dashboard" and the "New Intelligence Dashboard".

### Root Level `src/` Files
- **`App.jsx`**: The root routing tree of the application. It handles authentication guards and directs users to specific pages based on the URL path.
- **`main.jsx`**: The React entry point. It binds the React application to the root DOM node and wraps the application in the `BrowserRouter` and any global Context Providers.
- **`index.css`**: Global stylesheet containing Tailwind base imports and any custom global CSS overrides.

### `src/assets/`
Contains static image assets used globally across the UI.
- **`emblem.png`**: The National Emblem logo.
- **`ministry-text.png`**: The Ministry of MSME text logo.

---

### `src/components/` (Standard Dashboard Components)
Reusable UI building blocks for the primary dashboard.

#### `charts/` (Recharts Wrappers)
- **`DonutChart.jsx`**: Renders a circular donut chart, used primarily for "High Growth Potential Sectors".
- **`GaugeChart.jsx`**: Renders a speedometer-style gauge, used for visualizing the "Performance Score" out of 100.
- **`StateBarChart.jsx`**: Renders standard vertical/horizontal bar charts to compare data across multiple states.
- **`TrendBarChart.jsx`**: A variation of the bar chart used for plotting historical trends over time.
- **`TrendLineChart.jsx`**: A line chart specifically built to show monthly trends across multiple metrics.

#### `layout/` (Structural Components)
- **`AppLayout.jsx`**: The master layout wrapper that provides the structural grid for the Sidebar and Main Content areas.
- **`Sidebar.jsx`**: The collapsible navigation menu on the left side of the dashboard.
- **`TopBar.jsx`**: The sticky header containing the page title, breadcrumbs, user profile, and global month/year picker.

#### `tables/` (Data Grids)
- **`DFOAccordionTable.jsx`**: A complex, collapsible table showing State-level aggregations that can be expanded to reveal DFO-level details.
- **`DFORankedTable.jsx`**: A standard table sorting DFOs by specific KPIs.
- **`StateTable.jsx`**: A generic data table for state-wise tabular data.
- **`ZoneRankingTable.jsx`**: A specialized table ranking DFOs within a specific geographical zone based on performance metrics.

#### `ui/` (Micro-Components)
- **`Badge.jsx`**: A small, colored pill/tag component (e.g., used for "High", "Low" severity tags).
- **`InsightItem.jsx`**: A formatted list item used for displaying AI-generated or key bullet-point insights.
- **`InteractiveMarquee.jsx`**: A custom, touch-enabled scrolling marquee container used to display top-level National KPIs.
- **`KPICard.jsx`**: The standard rectangular card displaying a metric, a value, and an icon.
- **`MonthYearPicker.jsx`**: A dropdown UI to select the reporting month/year.
- **`PlaceholderPage.jsx`**: A fallback UI component used for routes that are still under construction (e.g., `/reports`).
- **`ProgressBar.jsx`**: A simple horizontal progress bar indicator.
- **`SectionHeader.jsx`**: A standardized title wrapper for dashboard cards and sections.

---

### `src/context/`
- **`DFODataContext.jsx`**: A React Context Provider that stores temporary, client-side data overrides. When a DFO Officer submits new data via the `DFOMetricsEntryPage`, this context captures it and updates the dashboard views instantly without needing a backend refresh.

---

### `src/data/` (Mock Database)
Since the backend is not yet fully integrated, these files export static JSON data and getter functions.
- **`appointmentData.js`**: Contains the logic mapping MSME profiles (New vs Existing) and Sectors to specific scheme recommendations used in the Appointment Booking flow.
- **`budgetUtilisationData.js`**: Mock data outlining sanctioned vs. utilized budgets per DFO.
- **`campaignsData.js`**: Mock data detailing awareness campaigns and participant counts.
- **`dfoDetailData.js`**: Highly granular data specific to individual DFO IDs (e.g., stakeholder meetings, specific challenges).
- **`dfoOverviewData.js`**: Aggregated data used on the national overview, including state-level groupings and top-performer rankings.
- **`schemeData.js`**: Data specifically categorized by MSME schemes (PMEGP, Mudra, SFURTI).

---

### `src/pages/` (Standard Dashboard Views)
These components map directly to the router in `App.jsx`.
- **`BookAppointmentPage.jsx`**: The public-facing wizard for MSMEs to book appointments with DFOs. It includes a multi-step form and an automatic scheme recommendation engine.
- **`CampaignsPage.jsx`**: Placeholder for deep-dive campaign analytics.
- **`DFODetailPage.jsx`**: The drilled-down view for a specific DFO (`/dfo-performance/:dfoId`). Displays isolated budgets, localized trends, and specific stakeholder meetings.
- **`DFOMetricsEntryPage.jsx`**: The data entry form where DFOs submit their weekly/monthly performance KPIs. Interacts heavily with `DFODataContext.jsx`.
- **`DFOOverviewPage.jsx`**: The home page of the dashboard (`/dfo-performance`). Aggregates data nationally and breaks it down by state.
- **`DownloadsPage.jsx`**: Placeholder for a report exporting interface.
- **`LoginPage.jsx`**: The authentication gateway.
- **`OverviewPage.jsx`**: A legacy stub.
- **`ReportsPage.jsx`**: Placeholder for tabular report generation.
- **`SchemePerformancePage.jsx`**: Analyzes the impact of specific schemes (e.g., tracking PMEGP applications, approvals, and employment generation).
- **`SchemePerfromancePageDev.jsx`**: A scratchpad/development version of the Scheme page.
- **`StatePerformancePage.jsx`**: Placeholder for deep-dive state analytics.
- **`newDashboard.jsx`**: A legacy routing stub.

---

### `src/newDashboard/` (The Intelligence Dashboard)
A completely modular, isolated application context built alongside the old dashboard to implement a modernized, high-density analytical UX.

#### `routes.jsx` & `constants/navigation.js`
- Handles the nested routing for `/new-dashboard/*`.
- `navigation.js` stores the sidebar link configurations.

#### `components/` (Intelligence UI)
- **`charts/GrievancesPanel.jsx`**: A complex split-panel component showing a donut chart of grievances alongside category breakdowns and alerts.
- **`charts/HorizontalBarChart.jsx`**: A compact bar chart used for ranking items.
- **`charts/NorthSouthBarChart.jsx`**: A comparative grouped bar chart.
- **`charts/OpportunityBubbleChart.jsx`**: A scatter/bubble chart mapping sectors by enterprise count vs. scheme penetration.
- **`charts/RegistrationTrendChart.jsx`**: A line chart showing MSME registrations over multiple years.
- **`layout/`**: Contains the isolated `AppLayout`, `Sidebar`, and `TopBar` specifically styled for the dark-mode/intelligence theme.
- **`tables/SectorHeatmap.jsx`**: A dense, color-coded matrix table visualizing sector presence across different districts.
- **`ui/`**: Intelligence-specific micro-components.

#### `data/`
- **`dfoIntelligenceData.js`**: The massive mock data engine powering the Intelligence dashboard. Includes a "Variance Engine" that calculates randomized data fluctuations to simulate real-time analytics.
- **`stateData.js`**: Geo-data and district mappings for the intelligence views.

#### `pages/`
- **`DFOIntelligencePage.jsx`**: The core dashboard view of the new application, assembling the heatmaps, bubble charts, and grievance panels into a single massive grid.
- **`DFOIntelligenceReferencePreview.jsx`**: A static preview/sandbox of the Intelligence layout.
- **`DFOMetricsEntryPage.jsx`**: The data entry form, re-styled for the Intelligence application.
- **`NewDashLoginPage.jsx`**: The dark-themed authentication portal for the Intelligence side.

---

## 🗺 Routing Architecture

Here is the exact mapping of URLs to their root components as defined in `App.jsx`.

**Primary Portal Routes:**
- **`/login`** -> `src/pages/LoginPage.jsx`
- **`/book-appointment`** -> `src/pages/BookAppointmentPage.jsx`

**Legacy Dashboard Routes (Protected):**
- **`/dfo-performance`** -> `src/pages/DFOOverviewPage.jsx`
- **`/dfo-performance/:dfoId`** -> `src/pages/DFODetailPage.jsx`
- **`/scheme-performance`** -> `src/pages/SchemePerformancePage.jsx`
- **`/dfo-entry`** -> `src/pages/DFOMetricsEntryPage.jsx`
- **`/state-performance`** -> `src/pages/StatePerformancePage.jsx` (Stub)
- **`/campaigns`** -> `src/pages/CampaignsPage.jsx` (Stub)
- **`/reports`** -> `src/pages/ReportsPage.jsx` (Stub)
- **`/downloads`** -> `src/pages/DownloadsPage.jsx` (Stub)

**Intelligence Dashboard Routes (Protected):**
- **`/new-dashboard/login`** -> `src/newDashboard/pages/NewDashLoginPage.jsx`
- **`/new-dashboard`** -> `src/newDashboard/pages/DFOIntelligencePage.jsx`

---

## 🚀 Getting Started

To run this project locally, you will need to have [Node.js](https://nodejs.org/) installed. 

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open in your browser
Once the server is running, open [http://localhost:5173](http://localhost:5173) in your browser.

---


2. Submit a Pull Request (PR) against the `main` or `develop` branch.
3. Provide a clear description of the changes made and the problem solved.
