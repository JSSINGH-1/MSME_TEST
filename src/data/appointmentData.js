export const USER_TYPES = {
  NEW_ENTREPRENEUR: 'NEW_ENTREPRENEUR',
  EXISTING_MSME: 'EXISTING_MSME'
};

export const APPOINTMENT_CATEGORIES = {
  [USER_TYPES.NEW_ENTREPRENEUR]: [
    { id: 'new_setup',   label: 'Business Setup & Udyam Registration Guidance', desc: 'For guidance on business setup and UDYAM registration' },
    { id: 'new_schemes', label: 'Schemes & Subsidies', desc: 'Information on MSME schemes and subsidies' },
    { id: 'new_credit',  label: 'Credit & Finance Support', desc: 'Assistance with loans, credit and finance facilities' },
    { id: 'new_skill',   label: 'Entrepreneurship & Skill Development', desc: 'Support for training, skill development and capacity building' },
    { id: 'new_market',  label: 'Market Access & Business Growth', desc: 'Support for marketing, vendor registration and growth' }
  ],
  [USER_TYPES.EXISTING_MSME]: [
    { id: 'exist_udyam',      label: 'UDYAM related', desc: 'Assistance with UDYAM portal, modification, or issues' },
    { id: 'exist_schemes',    label: 'Scheme Benefits & Incentives', desc: 'Information on applicable MSME schemes and subsidies' },
    { id: 'exist_finance',    label: 'Finance, Credit & Delayed Payment Issues', desc: 'Credit support, loans, and MSME Samadhaan' },
    { id: 'exist_market',     label: 'Market Access & Procurement Support', desc: 'Vendor registration, GeM, and marketing schemes' },
    { id: 'exist_tech',       label: 'Technology, Quality & Certification Support', desc: 'ZED, technology upgrades, and certifications' },
    { id: 'exist_expansion',  label: 'Business Expansion, Export & Grievances', desc: 'Export promotion, incubation, and grievance redressal' }
  ]
};

export const SCHEMES_DB = {
  udyam_registration: {
    id: 'udyam_registration',
    name: 'UDYAM Registration',
    description: 'Guidance and support for business setup and UDYAM registration for new entrepreneurs.'
  },
  pmegp: {
    id: 'pmegp',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    description: 'Financial assistance for setting up new micro enterprises to generate self-employment in rural and urban areas.'
  },
  pm_vishwakarma: {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma',
    description: 'Support for traditional artisans and craftspeople with skill training, toolkit support, and credit access.'
  },
  cgtmse: {
    id: 'cgtmse',
    name: 'Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)',
    description: 'Collateral-free credit facility up to ₹5 Cr for micro and small enterprises.'
  },

  // cgssd: {
  //   id: 'cgssd',
  //   name: 'Credit Guarantee Scheme for Subordinate Debt (CGSSD)',
  //   description: 'Credit support for stressed MSMEs through subordinate debt.'
  // },

  msme_zed: {
    id: 'msme_zed',
    name: 'MSME Sustainable (ZED) Certification',
    description: 'Zero Defect Zero Effect certification for quality and environmental performance improvement.'
  },
  ramp: {
    id: 'ramp',
    name: 'Raising and Accelerating MSME Performance (RAMP)',
    description: 'Capacity building, technology upgradation, and improving market access for MSMEs.'
  },
  msme_team: {
    id: 'msme_team',
    name: 'MSME TEAM',
    description: 'Technology and quality upgradation support to help MSMEs improve performance.'
  },
  msme_innovative: {
    id: 'msme_innovative',
    name: 'MSME Innovative (Incubation, IPR and Design)',
    description: 'Support for MSME innovation through incubation centres, IPR protection, and design development.'
  },
  msme_gift: {
    id: 'msme_gift',
    name: 'MSME GIFT',
    description: 'Support scheme for technology and quality improvement for MSMEs.'
  },
  msme_spice: {
    id: 'msme_spice',
    name: 'MSME SPICE',
    description: 'Sustainability and process improvement support for MSMEs.'
  },
  esdp: {
    id: 'esdp',
    name: 'Entrepreneurship and Skill Development Programme (ESDP)',
    description: 'Capacity building and entrepreneurship development training programmes.'
  },
  tool_rooms: {
    id: 'tool_rooms',
    name: 'Tool Rooms and Technical Institutions',
    description: 'Infrastructure development and capacity building through tool rooms and technical institutions.'
  },
  national_scst_hub: {
    id: 'national_scst_hub',
    name: 'National SC-ST Hub Scheme',
    description: 'Support for SC/ST entrepreneurs to participate in public procurement and business growth.'
  },
  pms: {
    id: 'pms',
    name: 'Procurement and Marketing Support (PMS) Scheme',
    description: 'Support for marketing, trade fairs, vendor development, and procurement assistance.'
  },
  ic: {
    id: 'ic',
    name: 'International Cooperation (IC) Scheme',
    description: 'Financial support for participation in international exhibitions and study tours.'
  },
  sri_fund: {
    id: 'sri_fund',
    name: 'Self Reliant India (SRI) Fund',
    description: 'Equity support for MSMEs with growth potential under the Aatmanirbhar Bharat initiative.'
  },
  odr: {
    id: 'odr',
    name: 'Online Dispute Resolution (ODR)',
    description: 'Online platform for resolution of delayed payment disputes for MSMEs (MSME Samadhaan).'
  },
  msecdp: {
    id: 'msecdp',
    name: 'Micro & Small Enterprises Cluster Development Programme (MSE-CDP)',
    description: 'Infrastructure support for MSME clusters and common facility centres.'
  },
};

// Category → Scheme mapping  (from MSME Appointment Flow – Scheme Recommendation Mapping)
export const CATEGORY_SCHEME_MAPPING = {
  // 1. New / Prospective Entrepreneur
  new_setup:   ['udyam_registration', 'pmegp', 'esdp'],
  new_schemes: ['pm_vishwakarma', 'pmegp', 'msme_zed', 'esdp', 'ramp', 'msme_team', 'msme_innovative', 'msme_gift'],
  new_credit:  ['pmegp', 'cgtmse', 'sri_fund'],
  new_skill:   ['esdp', 'tool_rooms', 'national_scst_hub'],
  new_market:  ['pms', 'ic', 'msme_team', 'ramp'],

  // 2. Existing MSME
  exist_udyam:     [], // N/A — DFO will guide the user directly
  exist_schemes:   ['pm_vishwakarma', 'pmegp', 'msme_zed', 'esdp', 'ramp', 'msme_team', 'msme_innovative', 'msme_gift'],
  exist_finance:   ['cgtmse', 'cgssd', 'sri_fund', 'odr'],
  exist_market:    ['pms', 'ic', 'national_scst_hub', 'ramp', 'msme_team'],
  exist_tech:      ['msme_zed', 'msme_innovative', 'msme_spice', 'msme_gift'],
  exist_expansion: ['ic', 'ramp', 'odr', 'msme_team', 'msme_innovative'],
};

export const DFO_CONTACT_DETAILS = {
  name: 'DFO Bangalore',
  address: 'MSME-DFO Bangalore\nRajaji Nagar, Industrial Estate\nBangalore-560044, Karnataka',
  phone: '080-23151540 / 582 / 583',
  email: 'dcdi-bang@dcmsme.gov.in',
  officeHours: '10:00 AM - 05:00 PM\n(Monday to Friday)'
};
