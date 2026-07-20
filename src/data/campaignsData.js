/**
 * Awareness Campaigns Data — July 2026
 *
 * NOTE: Data is dummy and for illustrative purposes only.
 * Source: Monthly campaign reporting by DFOs.
 */

// Per-DFO monthly summary
export const CAMPAIGNS_MONTHLY_SUMMARY = [
  { month: 'July 2026', state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam',     campaignsConducted: 4, participants: 186 },
  { month: 'July 2026', state: 'Karnataka',      dfo: 'DFO Hubli',              campaignsConducted: 8, participants: 472 },
  { month: 'July 2026', state: 'Karnataka',      dfo: 'DFO Bangalore',          campaignsConducted: 4, participants: 241 },
  { month: 'July 2026', state: 'Karnataka',      dfo: 'Branch DFO Mangalore',   campaignsConducted: 8, participants: 396 },
  { month: 'July 2026', state: 'Karnataka',      dfo: 'Branch DFO Gulbarga',    campaignsConducted: 4, participants: 154 },
  { month: 'July 2026', state: 'Kerala',         dfo: 'DFO Thrissur',           campaignsConducted: 8, participants: 418 },
  { month: 'July 2026', state: 'Lakshadweep',    dfo: 'Br. DFO Lakshadweep',   campaignsConducted: 4, participants: 82  },
  { month: 'July 2026', state: 'Tamil Nadu',     dfo: 'DFO Chennai',            campaignsConducted: 8, participants: 538 },
  { month: 'July 2026', state: 'Tamil Nadu',     dfo: 'Branch DFO Coimbatore',  campaignsConducted: 4, participants: 229 },
  { month: 'July 2026', state: 'Tamil Nadu',     dfo: 'Branch DFO Madurai',     campaignsConducted: 8, participants: 401 },
  { month: 'July 2026', state: 'Tamil Nadu',     dfo: 'Branch DFO Tirunelveli', campaignsConducted: 4, participants: 171 },
  { month: 'July 2026', state: 'Telangana',      dfo: 'DFO Hyderabad',          campaignsConducted: 8, participants: 511 },
];

// Campaign-wise drill-down (meeting records)
export const CAMPAIGN_MEETINGS = [
  // Andhra Pradesh — DFO Visakhapatnam
  { id: 'M001', month: 'July 2026', date: '03-Jul-2026', state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam', campaignName: 'PMEGP Implementation Review',    scheme: 'PMEGP',       stakeholderCategory: 'State Government',    organisation: 'District Industries Centre (Visakhapatnam)', participants: 45 },
  { id: 'M002', month: 'July 2026', date: '08-Jul-2026', state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam', campaignName: 'MSME Outreach Planning',          scheme: 'General',     stakeholderCategory: 'Industry Association', organisation: 'CII Andhra Pradesh',                          participants: 62 },
  { id: 'M003', month: 'July 2026', date: '12-Jul-2026', state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam', campaignName: 'Credit Facilitation for MSMEs',   scheme: 'CGTMSE',      stakeholderCategory: 'Banks',               organisation: 'SBI Regional Office',                         participants: 48 },
  { id: 'M004', month: 'July 2026', date: '18-Jul-2026', state: 'Andhra Pradesh', dfo: 'DFO Visakhapatnam', campaignName: 'Vendor Development Programme',    scheme: 'PM Vishwakarma', stakeholderCategory: 'Others',            organisation: 'National Small Industries Corporation',       participants: 31 },

  // Karnataka — DFO Hubli
  { id: 'M005', month: 'July 2026', date: '02-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'Scheme Implementation Review',  scheme: 'PMEGP',          stakeholderCategory: 'State Government',     organisation: 'District Industries Centre Hubli',  participants: 52 },
  { id: 'M006', month: 'July 2026', date: '05-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'MSME Awareness Campaign',        scheme: 'General',        stakeholderCategory: 'Industry Association',  organisation: 'Karnataka Chamber of Commerce',     participants: 75 },
  { id: 'M007', month: 'July 2026', date: '09-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'CGTMSE Promotion',               scheme: 'CGTMSE',         stakeholderCategory: 'Banks',                organisation: 'Canara Bank MSME Cell',             participants: 43 },
  { id: 'M008', month: 'July 2026', date: '11-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'ZED Certification Promotion',    scheme: 'ZED',            stakeholderCategory: 'Industry Association',  organisation: 'FKCCI Hubli Chapter',               participants: 60 },
  { id: 'M009', month: 'July 2026', date: '15-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'District MSME Review',           scheme: 'General',        stakeholderCategory: 'State Government',     organisation: "Deputy Commissioner Office",        participants: 55 },
  { id: 'M010', month: 'July 2026', date: '18-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'PMEGP Financing Workshop',        scheme: 'PMEGP',          stakeholderCategory: 'Banks',                organisation: 'Union Bank of India',               participants: 70 },
  { id: 'M011', month: 'July 2026', date: '22-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'Entrepreneurship Promotion',     scheme: 'General',        stakeholderCategory: 'Others',               organisation: 'KVIC',                              participants: 48 },
  { id: 'M012', month: 'July 2026', date: '28-Jul-2026', state: 'Karnataka', dfo: 'DFO Hubli', campaignName: 'Cluster Development Meet',       scheme: 'Cluster Dev.',   stakeholderCategory: 'Industry Association',  organisation: 'Laghu Udyog Bharati',               participants: 69 },

  // Karnataka — DFO Bangalore
  { id: 'M013', month: 'July 2026', date: '04-Jul-2026', state: 'Karnataka', dfo: 'DFO Bangalore', campaignName: 'Startup MSMEs Conclave',        scheme: 'General',    stakeholderCategory: 'Industry Association',  organisation: 'NASSCOM Karnataka',    participants: 65 },
  { id: 'M014', month: 'July 2026', date: '07-Jul-2026', state: 'Karnataka', dfo: 'DFO Bangalore', campaignName: 'Working Capital Awareness',      scheme: 'CGTMSE',     stakeholderCategory: 'Banks',                organisation: 'HDFC Bank MSME Division', participants: 58 },
  { id: 'M015', month: 'July 2026', date: '14-Jul-2026', state: 'Karnataka', dfo: 'DFO Bangalore', campaignName: 'PM Vishwakarma Review',          scheme: 'PM Vishwakarma', stakeholderCategory: 'State Government', organisation: 'DIC Bangalore',         participants: 72 },
  { id: 'M016', month: 'July 2026', date: '23-Jul-2026', state: 'Karnataka', dfo: 'DFO Bangalore', campaignName: 'Marketing Support Seminar',       scheme: 'General',    stakeholderCategory: 'Others',               organisation: 'NSIC Bangalore',        participants: 46 },

  // Karnataka — Branch DFO Mangalore
  { id: 'M017', month: 'July 2026', date: '05-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'Export MSMEs Outreach',     scheme: 'General',    stakeholderCategory: 'Industry Association', organisation: 'Kanara Chamber of Commerce', participants: 55 },
  { id: 'M018', month: 'July 2026', date: '10-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'MSME Credit Workshop',       scheme: 'CGTMSE',     stakeholderCategory: 'Banks',               organisation: 'Indian Bank',                participants: 60 },
  { id: 'M019', month: 'July 2026', date: '16-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'Cluster Initiatives Meet',   scheme: 'Cluster Dev.', stakeholderCategory: 'State Government',  organisation: 'DIC Mangalore',              participants: 48 },
  { id: 'M020', month: 'July 2026', date: '25-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'Coir MSMEs Awareness',       scheme: 'General',    stakeholderCategory: 'Others',              organisation: 'Coir Board',                 participants: 41 },
  { id: 'M020b',month: 'July 2026', date: '28-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'PMEGP Outreach Camp',        scheme: 'PMEGP',      stakeholderCategory: 'State Government',    organisation: 'DIC Mangalore',              participants: 50 },
  { id: 'M020c',month: 'July 2026', date: '31-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'ZED Certification Drive',    scheme: 'ZED',        stakeholderCategory: 'Industry Association', organisation: 'Mangalore Chamber',         participants: 55 },
  { id: 'M020d',month: 'July 2026', date: '02-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Mangalore', campaignName: 'Digital MSME Awareness',    scheme: 'General',    stakeholderCategory: 'Others',              organisation: 'NSIC Mangalore',             participants: 87 },

  // Karnataka — Branch DFO Gulbarga
  { id: 'M021', month: 'July 2026', date: '06-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Gulbarga', campaignName: 'PMEGP Review Meet',           scheme: 'PMEGP',    stakeholderCategory: 'State Government',    organisation: 'DIC Kalaburagi',                      participants: 48 },
  { id: 'M022', month: 'July 2026', date: '12-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Gulbarga', campaignName: 'Loan Facilitation Camp',       scheme: 'CGTMSE',   stakeholderCategory: 'Banks',               organisation: 'State Bank of India',                 participants: 62 },
  { id: 'M023', month: 'July 2026', date: '19-Jul-2026', state: 'Karnataka', dfo: 'Branch DFO Gulbarga', campaignName: 'MSME Registration Drive',      scheme: 'General',  stakeholderCategory: 'Industry Association', organisation: 'Gulbarga Industries Association',     participants: 44 },

  // Kerala — DFO Thrissur
  { id: 'M024', month: 'July 2026', date: '01-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'PMEGP Awareness Workshop',     scheme: 'PMEGP',    stakeholderCategory: 'State Government',    organisation: 'DIC Thrissur',                  participants: 58 },
  { id: 'M025', month: 'July 2026', date: '04-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'Export Promotion Drive',        scheme: 'General',  stakeholderCategory: 'Industry Association', organisation: 'Kerala Chamber of Commerce',    participants: 72 },
  { id: 'M026', month: 'July 2026', date: '08-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'CGTMSE Awareness Session',      scheme: 'CGTMSE',   stakeholderCategory: 'Banks',               organisation: 'Federal Bank',                  participants: 55 },
  { id: 'M027', month: 'July 2026', date: '18-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'ZED Implementation Workshop',   scheme: 'ZED',      stakeholderCategory: 'State Government',    organisation: 'DIC Thrissur',                  participants: 65 },
  { id: 'M028', month: 'July 2026', date: '24-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'Cluster Support Forum',         scheme: 'Cluster Dev.', stakeholderCategory: 'Others',           organisation: 'Coir Board',                    participants: 50 },
  { id: 'M028b',month: 'July 2026', date: '03-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'MSME Credit Linkage Camp',      scheme: 'CGTMSE',   stakeholderCategory: 'Banks',               organisation: 'Canara Bank Kerala',            participants: 66 },
  { id: 'M028c',month: 'July 2026', date: '11-Jul-2026', state: 'Kerala', dfo: 'DFO Thrissur', campaignName: 'PM Vishwakarma Orientation',    scheme: 'PM Vishwakarma', stakeholderCategory: 'State Government', organisation: 'DIC Thrissur',                 participants: 52 },

  // Lakshadweep — Br. DFO Lakshadweep
  { id: 'M029', month: 'July 2026', date: '07-Jul-2026', state: 'Lakshadweep', dfo: 'Br. DFO Lakshadweep', campaignName: 'Kavaratti MSMEs Awareness',   scheme: 'General',   stakeholderCategory: 'State Government',    organisation: 'UT Administration',                  participants: 22 },
  { id: 'M030', month: 'July 2026', date: '14-Jul-2026', state: 'Lakshadweep', dfo: 'Br. DFO Lakshadweep', campaignName: 'Credit Support Workshop',      scheme: 'CGTMSE',    stakeholderCategory: 'Banks',               organisation: 'SBI Kavaratti',                      participants: 18 },
  { id: 'M031', month: 'July 2026', date: '21-Jul-2026', state: 'Lakshadweep', dfo: 'Br. DFO Lakshadweep', campaignName: 'Tourism Enterprises Meet',     scheme: 'General',   stakeholderCategory: 'Industry Association', organisation: 'Lakshadweep Traders Association',    participants: 24 },
  { id: 'M032', month: 'July 2026', date: '28-Jul-2026', state: 'Lakshadweep', dfo: 'Br. DFO Lakshadweep', campaignName: 'Marine MSMEs Forum',           scheme: 'General',   stakeholderCategory: 'Others',              organisation: 'Fisheries Department',               participants: 18 },

  // Tamil Nadu — DFO Chennai
  { id: 'M033', month: 'July 2026', date: '03-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'ZED & Lean Manufacturing Seminar', scheme: 'ZED',        stakeholderCategory: 'Industry Association', organisation: 'CII Tamil Nadu',          participants: 78 },
  { id: 'M034', month: 'July 2026', date: '07-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'CGTMSE Awareness Drive',            scheme: 'CGTMSE',     stakeholderCategory: 'Banks',               organisation: 'Indian Overseas Bank',    participants: 65 },
  { id: 'M035', month: 'July 2026', date: '10-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'Scheme Monitoring Review',           scheme: 'General',    stakeholderCategory: 'State Government',    organisation: 'DIC Chennai',             participants: 72 },
  { id: 'M036', month: 'July 2026', date: '17-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'Marketing Assistance Camp',          scheme: 'General',    stakeholderCategory: 'Others',              organisation: 'NSIC Chennai',            participants: 55 },
  { id: 'M036b',month: 'July 2026', date: '21-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'PMEGP Implementation Review',        scheme: 'PMEGP',      stakeholderCategory: 'State Government',    organisation: 'DIC Chennai',             participants: 88 },
  { id: 'M036c',month: 'July 2026', date: '24-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'Credit Facilitation Workshop',        scheme: 'CGTMSE',     stakeholderCategory: 'Banks',               organisation: 'Chennai District Co-op Bank', participants: 90 },
  { id: 'M036d',month: 'July 2026', date: '28-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'Vendor Development Programme',        scheme: 'PM Vishwakarma', stakeholderCategory: 'Industry Association', organisation: 'TANSTIA',              participants: 50 },
  { id: 'M036e',month: 'July 2026', date: '31-Jul-2026', state: 'Tamil Nadu', dfo: 'DFO Chennai', campaignName: 'MSME Registration Drive',             scheme: 'General',    stakeholderCategory: 'Others',              organisation: 'NSIC Chennai',            participants: 40 },

  // Tamil Nadu — Branch DFO Coimbatore
  { id: 'M037', month: 'July 2026', date: '04-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Coimbatore', campaignName: 'Textile MSME Workshop',       scheme: 'General', stakeholderCategory: 'Industry Association', organisation: 'SIMA Coimbatore',        participants: 68 },
  { id: 'M038', month: 'July 2026', date: '11-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Coimbatore', campaignName: 'PMEGP Awareness Camp',         scheme: 'PMEGP',   stakeholderCategory: 'State Government',    organisation: 'DIC Coimbatore',          participants: 55 },
  { id: 'M039', month: 'July 2026', date: '18-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Coimbatore', campaignName: 'Credit Access Drive',           scheme: 'CGTMSE',  stakeholderCategory: 'Banks',               organisation: 'Indian Bank Coimbatore',  participants: 60 },
  { id: 'M039b',month: 'July 2026', date: '25-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Coimbatore', campaignName: 'ZED Certification Awareness',   scheme: 'ZED',     stakeholderCategory: 'Industry Association', organisation: 'CII Coimbatore',         participants: 46 },

  // Tamil Nadu — Branch DFO Madurai
  { id: 'M040', month: 'July 2026', date: '03-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'PMEGP Awareness Meet',            scheme: 'PMEGP',   stakeholderCategory: 'State Government',     organisation: 'DIC Madurai',           participants: 58 },
  { id: 'M041', month: 'July 2026', date: '09-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'MSME Credit Linkage',              scheme: 'CGTMSE',  stakeholderCategory: 'Banks',                organisation: 'Canara Bank Madurai',   participants: 65 },
  { id: 'M042', month: 'July 2026', date: '16-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'PM Vishwakarma Orientation',       scheme: 'PM Vishwakarma', stakeholderCategory: 'State Government', organisation: 'DIC Madurai',          participants: 70 },
  { id: 'M043', month: 'July 2026', date: '21-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'ZED Manufacturing Workshop',       scheme: 'ZED',     stakeholderCategory: 'Industry Association', organisation: 'CII Madurai',           participants: 55 },
  { id: 'M044', month: 'July 2026', date: '25-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'Export MSME Awareness',            scheme: 'General', stakeholderCategory: 'Industry Association', organisation: 'FICCI Madurai',         participants: 58 },
  { id: 'M044b',month: 'July 2026', date: '28-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'Cluster Dev Seminar',              scheme: 'Cluster Dev.', stakeholderCategory: 'Others',          organisation: 'NSIC Madurai',          participants: 55 },
  { id: 'M044c',month: 'July 2026', date: '31-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Madurai', campaignName: 'MSME Finance Forum',               scheme: 'CGTMSE',  stakeholderCategory: 'Banks',                organisation: 'SBI Madurai',           participants: 40 },

  // Tamil Nadu — Branch DFO Tirunelveli
  { id: 'M045', month: 'July 2026', date: '05-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Tirunelveli', campaignName: 'PMEGP Awareness Drive',        scheme: 'PMEGP',   stakeholderCategory: 'State Government',    organisation: 'DIC Tirunelveli',       participants: 44 },
  { id: 'M046', month: 'July 2026', date: '12-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Tirunelveli', campaignName: 'Credit Support Workshop',       scheme: 'CGTMSE',  stakeholderCategory: 'Banks',               organisation: 'Indian Bank Tirunelveli', participants: 55 },
  { id: 'M047', month: 'July 2026', date: '19-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Tirunelveli', campaignName: 'ZED Awareness Camp',            scheme: 'ZED',     stakeholderCategory: 'Industry Association', organisation: 'CII Tirunelveli',      participants: 42 },
  { id: 'M048', month: 'July 2026', date: '26-Jul-2026', state: 'Tamil Nadu', dfo: 'Branch DFO Tirunelveli', campaignName: 'MSME Registration Drive',       scheme: 'General', stakeholderCategory: 'Others',              organisation: 'NSIC Tirunelveli',      participants: 30 },

  // Telangana — DFO Hyderabad
  { id: 'M049', month: 'July 2026', date: '02-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'PMEGP Implementation Meet',      scheme: 'PMEGP',   stakeholderCategory: 'State Government',    organisation: 'DIC Hyderabad',           participants: 68 },
  { id: 'M050', month: 'July 2026', date: '07-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'MSME Credit Awareness',           scheme: 'CGTMSE',  stakeholderCategory: 'Banks',               organisation: 'SBI Hyderabad RO',        participants: 72 },
  { id: 'M051', month: 'July 2026', date: '12-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'PM Vishwakarma Orientation',      scheme: 'PM Vishwakarma', stakeholderCategory: 'State Government', organisation: 'DIC Hyderabad',          participants: 75 },
  { id: 'M052', month: 'July 2026', date: '17-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'ZED Awareness Seminar',           scheme: 'ZED',     stakeholderCategory: 'Industry Association', organisation: 'CII Telangana',          participants: 65 },
  { id: 'M053', month: 'July 2026', date: '22-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'Export MSME Forum',               scheme: 'General', stakeholderCategory: 'Industry Association', organisation: 'FICCI Hyderabad',         participants: 60 },
  { id: 'M054', month: 'July 2026', date: '26-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'Cluster Development Meet',        scheme: 'Cluster Dev.', stakeholderCategory: 'Others',          organisation: 'NSIC Hyderabad',          participants: 55 },
  { id: 'M055', month: 'July 2026', date: '29-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'Digital MSME Awareness',          scheme: 'General', stakeholderCategory: 'State Government',    organisation: 'DIC Hyderabad',           participants: 68 },
  { id: 'M055b',month: 'July 2026', date: '31-Jul-2026', state: 'Telangana', dfo: 'DFO Hyderabad', campaignName: 'Credit Linkage Camp',             scheme: 'CGTMSE',  stakeholderCategory: 'Banks',               organisation: 'Union Bank Hyderabad',    participants: 48 },
];
