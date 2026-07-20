import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, UserPlus, Briefcase, ChevronRight, 
  CheckCircle, Shield, FileText, Banknote, Users, TrendingUp,
  Settings, Award, MessageSquare, BriefcaseBusiness, Globe,
  CheckCircle2, Download, ExternalLink, Calendar as CalendarIcon, 
  Clock, MapPin, Phone, Mail, Check
} from 'lucide-react';
import { USER_TYPES, APPOINTMENT_CATEGORIES, SCHEMES_DB, CATEGORY_SCHEME_MAPPING, DFO_CONTACT_DETAILS } from '@/data/appointmentData';
import emblemImg from '@/assets/emblem.png';
import ministryText from '@/assets/ministry-text.png';

const indianStatesUTs = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

const karnatakaDistricts = [
  'Bagalkote',
  'Ballari',
  'Belagavi',
  'Bengaluru Rural',
  'Bengaluru South',
  'Bengaluru Urban',
  'Bidar',
  'Chamarajanagar',
  'Chikkaballapura',
  'Chikkamagaluru',
  'Chitradurga',
  'Dakshina Kannada',
  'Davanagere',
  'Dharwad',
  'Gadag',
  'Hassan',
  'Haveri',
  'Kalaburagi',
  'Kodagu',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysuru',
  'Raichur',
  'Shivamogga',
  'Tumakuru',
  'Udupi',
  'Uttara Kannada',
  'Vijayanagara',
  'Vijayapura',
  'Yadgir'
];

const getCategoryIcon = (id) => {
  const icons = {
    new_setup: Shield,
    new_schemes: FileText,
    new_credit: Banknote,
    new_skill: Users,
    new_market: TrendingUp,
    exist_udyam: Settings,
    exist_schemes: Award,
    exist_finance: Banknote,
    exist_market: BriefcaseBusiness,
    exist_tech: CheckCircle2,
    exist_expansion: Globe
  };
  const Icon = icons[id] || ChevronRight;
  return <Icon size={20} className="text-blue-600" />;
};

const getSchemeIcon = (id) => {
  // Use generic for all for simplicity, or map specific ones
  return <Shield size={24} className="text-emerald-600" />;
};

export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    udyamNo: '',
    enterpriseName: '',
    stateUT: '',
    district: ''
  });
  const districtOptions = formData.stateUT === 'Karnataka' ? karnatakaDistricts : [];
  const isDistrictDisabled = formData.stateUT !== 'Karnataka';
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => Math.max(1, s - 1));
  const filteredStateOptions = indianStatesUTs.filter(state =>
    state.toLowerCase().includes((formData.stateUT || '').toLowerCase())
  );

  const handleValidateAndContinue = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!formData.stateUT || !formData.stateUT.trim()) {
      newErrors.stateUT = "State/UT is required.";
    }

    if (!formData.district || !formData.district.trim()) {
      newErrors.district = "District is required.";
    }

    if (userType === USER_TYPES.EXISTING_MSME && !formData.udyamNo.trim()) {
      newErrors.udyamNo = "Udyam Registration Number is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleNext();
  };

  // Calendar mock data
  const timeSlots = [
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:00 AM', status: 'unavailable' },
    { time: '11:30 AM', status: 'available' },
    { time: '12:00 PM', status: 'available', selected: true }, // will override later
    { time: '12:30 PM', status: 'available' },
    { time: '01:00 PM', status: 'lunch', label: 'Lunch Break: 01:00 PM - 02:00 PM' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'available' },
    { time: '03:30 PM', status: 'available' },
    { time: '04:00 PM', status: 'available' },
    { time: '04:30 PM', status: 'available' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── Top bar ─────────────────────────── */}
      <div className="w-full bg-[#0d1f4c] border-b border-white/10 flex-shrink-0 flex items-center px-4 lg:px-8 py-3 relative min-h-[64px]">
        <div className="flex items-center gap-4 absolute left-4 lg:left-8">
          <img src={emblemImg} alt="Emblem" className="h-10 lg:h-12 w-auto object-contain" style={{ mixBlendMode: 'screen' }} />
          <img src={ministryText} alt="Ministry" className="h-10 lg:h-12 w-auto object-contain hidden md:block" style={{ mixBlendMode: 'screen' }} />
        </div>
        <div className="text-center w-full">
          <h1 className="text-white font-bold text-sm lg:text-base tracking-wide">MSME DFO PERFORMANCE DASHBOARD</h1>
          <p className="text-blue-200 text-xs mt-0.5">Book an Appointment</p>
        </div>
      </div>

      {/* ── Main Content Container ─────────────────────────── */}
      <div className="flex-1 flex flex-col items-center p-4 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200 overflow-hidden flex flex-col min-h-[500px] max-h-[85vh]">
          
          {/* Header Area */}
          <div className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            {step > 1 && step < 7 ? (
              <button onClick={handleBack} className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div className="w-16" />}
            
            <div className="text-center flex-1">
              {step === 1 && <h2 className="text-xl font-bold text-[#0d1f4c]">Welcome!</h2>}
              {step === 2 && <h2 className="text-lg font-bold text-[#0d1f4c]">Select Appointment Category</h2>}
              {step === 3 && <h2 className="text-lg font-bold text-[#0d1f4c]">Schemes that may help you</h2>}
              {step === 4 && <h2 className="text-lg font-bold text-[#0d1f4c]">Enter Your Details</h2>}
              {step === 5 && <h2 className="text-lg font-bold text-[#0d1f4c]">Select Date & Time</h2>}
              {step === 6 && <h2 className="text-lg font-bold text-[#0d1f4c]">Review & Confirm Your Appointment</h2>}
              
              {step === 1 && <p className="text-xs text-slate-500 mt-1">Please choose the category that best describes you to book an appointment with DFO.</p>}
              {step === 2 && <p className="text-xs text-slate-500 mt-1">Choose the category that best matches your requirement.</p>}
              {step === 3 && <p className="text-xs text-slate-500 mt-1">Based on the category you selected, the following schemes may be relevant for you.</p>}
              {step === 4 && <p className="text-xs text-slate-500 mt-1">Please provide your details to book an appointment.</p>}
              {step === 5 && <p className="text-xs text-slate-500 mt-1">Choose a convenient date and time for your appointment. Time slots are in 30-minute intervals.</p>}
              {step === 6 && <p className="text-xs text-slate-500 mt-1">Please review your details before confirming.</p>}
            </div>
            <div className="w-16" />
          </div>

          {/* Body Area */}
          <div className="p-6 lg:p-10 flex-1 flex flex-col overflow-y-auto">
            
            {/* Step 1 */}
            {step === 1 && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12">
                <div 
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 cursor-pointer transition-all ${userType === USER_TYPES.NEW_ENTREPRENEUR ? 'border-green-600 bg-green-50/30' : 'border-slate-100 hover:border-green-300'}`}
                  onClick={() => setUserType(USER_TYPES.NEW_ENTREPRENEUR)}
                >
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-4 text-white">
                    <UserPlus size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1f4c] text-center mb-2">New / Prospective<br/>Entrepreneur</h3>
                  <p className="text-xs text-slate-500 mb-6">Not yet registered<br/>as MSME</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setUserType(USER_TYPES.NEW_ENTREPRENEUR); handleNext(); }}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${userType === USER_TYPES.NEW_ENTREPRENEUR ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-400'}`}
                  >Continue</button>
                </div>
                
                <div 
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 cursor-pointer transition-all ${userType === USER_TYPES.EXISTING_MSME ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-300'}`}
                  onClick={() => setUserType(USER_TYPES.EXISTING_MSME)}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 text-white">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1f4c] text-center mb-2">Existing MSME</h3>
                  <p className="text-xs text-slate-500 mb-6 mt-5">Already registered<br/>as MSME</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setUserType(USER_TYPES.EXISTING_MSME); handleNext(); }}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${userType === USER_TYPES.EXISTING_MSME ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}
                  >Continue</button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="max-w-2xl mx-auto w-full space-y-3">
                {APPOINTMENT_CATEGORIES[userType]?.map(cat => (
                  <div 
                    key={cat.id}
                    onClick={() => { setCategory(cat); handleNext(); }}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0d1f4c] group-hover:text-blue-700">{cat.label}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (() => {
              const schemeIds = CATEGORY_SCHEME_MAPPING[category?.id] ?? [];
              const isNACategory = schemeIds.length === 0;
              return (
                <div className="max-w-2xl mx-auto w-full flex flex-col">
                  {isNACategory ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 px-6 bg-blue-50/50 rounded-2xl border border-blue-100 mb-8">
                      <div className="w-16 h-16 rounded-full bg-[#0d1f4c]/10 flex items-center justify-center mb-4">
                        <Shield size={28} className="text-[#0d1f4c]" />
                      </div>
                      <h4 className="text-base font-bold text-[#0d1f4c] mb-2">Your DFO will assist you directly</h4>
                      <p className="text-sm text-slate-500 max-w-sm">
                        For UDYAM-related queries, there are no specific scheme recommendations. Your District MSME Officer will personally guide you through the process.
                      </p>
                      <p className="text-xs text-slate-400 mt-3">Please proceed to book an appointment to get expert assistance.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-8">
                      {schemeIds.map(schemeId => {
                        const scheme = SCHEMES_DB[schemeId];
                        if (!scheme) return null;
                        return (
                          <div key={scheme.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 flex-shrink-0">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="48" height="48" rx="12" fill="#Ecfdf5"/>
                                  <path d="M24 12V36M16 20H32" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#0d1f4c]">{scheme.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{scheme.description}</p>
                              </div>
                            </div>
                            <button className="text-xs font-semibold text-blue-600 hover:underline whitespace-nowrap ml-4">View Details</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-4 mt-auto">
                    {!isNACategory && (
                      <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition-colors">
                        These are helpful
                      </button>
                    )}
                    <button onClick={handleNext} className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                      {isNACategory ? 'Book Appointment' : 'I want to book appointment'}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Step 4 */}
            {step === 4 && (
              <div className="max-w-md mx-auto w-full">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rajesh Kumar" 
                      value={formData.fullName} 
                      onChange={e => {
                        setFormData({...formData, fullName: e.target.value});
                        if (errors.fullName) setErrors({...errors, fullName: null});
                      }} 
                      className={`w-full px-3 py-2 border rounded-lg text-sm outline-none placeholder-slate-300 transition-colors ${errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}`} 
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">Mobile Number *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 9876543210" 
                      value={formData.mobile} 
                      onChange={e => {
                        setFormData({...formData, mobile: e.target.value});
                        if (errors.mobile) setErrors({...errors, mobile: null});
                      }} 
                      className={`w-full px-3 py-2 border rounded-lg text-sm outline-none placeholder-slate-300 transition-colors ${errors.mobile ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}`} 
                    />
                    {errors.mobile && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.mobile}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">Email ID *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. rajesh.kumar@example.com" 
                      value={formData.email} 
                      onChange={e => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: null});
                      }} 
                      className={`w-full px-3 py-2 border rounded-lg text-sm outline-none placeholder-slate-300 transition-colors ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}`} 
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">State/UT *</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select State/UT"
                        value={formData.stateUT}
                        onFocus={() => setIsStateDropdownOpen(true)}
                        onBlur={() => setTimeout(() => setIsStateDropdownOpen(false), 120)}
                        onChange={e => {
                          const nextState = e.target.value;
                          setFormData({...formData, stateUT: nextState, district: ''});
                          if (errors.stateUT) setErrors({...errors, stateUT: null});
                          if (errors.district) setErrors({...errors, district: null});
                          setIsStateDropdownOpen(true);
                        }}
                        className={`w-full px-3 py-2 border rounded-lg text-sm outline-none placeholder-slate-300 transition-colors ${errors.stateUT ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}`} 
                      />
                      {isStateDropdownOpen && filteredStateOptions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                          {filteredStateOptions.map(state => (
                            <button
                              key={state}
                              type="button"
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => {
                                setFormData({...formData, stateUT: state, district: ''});
                                if (errors.stateUT) setErrors({...errors, stateUT: null});
                                if (errors.district) setErrors({...errors, district: null});
                                setIsStateDropdownOpen(false);
                              }}
                              className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              {state}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.stateUT && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.stateUT}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">District *</label>
                    <select
                      value={formData.district}
                      disabled={isDistrictDisabled}
                      onChange={e => {
                        setFormData({...formData, district: e.target.value});
                        if (errors.district) setErrors({...errors, district: null});
                      }}
                      className={`w-full px-3 py-2 border rounded-lg text-sm outline-none placeholder-slate-300 transition-colors ${errors.district ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'} ${isDistrictDisabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white'}`} 
                    >
                      {isDistrictDisabled ? (
                        <option value="">District data not available</option>
                      ) : (
                        <>
                          <option value="">Select District</option>
                          {districtOptions.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </>
                      )}
                    </select>
                    {errors.district && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.district}</p>}
                  </div>
                  {userType === USER_TYPES.EXISTING_MSME && (
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="block text-xs font-bold text-[#0d1f4c]">Udyam Registration Number *</label>
                        <span className="text-[10px] text-slate-400">(For existing MSME only)</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="e.g. UDYAM-KR-03-0001234" 
                        value={formData.udyamNo} 
                        onChange={e => {
                          setFormData({...formData, udyamNo: e.target.value});
                          if (errors.udyamNo) setErrors({...errors, udyamNo: null});
                        }} 
                        className={`w-full px-3 py-2 border rounded-lg text-sm outline-none uppercase placeholder-slate-300 transition-colors ${errors.udyamNo ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'}`} 
                      />
                      {errors.udyamNo && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.udyamNo}</p>}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#0d1f4c] mb-1.5">Enterprise Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rajesh Engineering Works" 
                      value={formData.enterpriseName} 
                      onChange={e => setFormData({...formData, enterpriseName: e.target.value})} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none placeholder-slate-300 transition-colors" 
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={handleValidateAndContinue} className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                    Validate & Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (() => {
              const year = calendarMonth.getFullYear();
              const month = calendarMonth.getMonth();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const firstDay = new Date(year, month, 1).getDay();
              
              const monthName = calendarMonth.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
              
              const handlePrevMonth = () => setCalendarMonth(new Date(year, month - 1, 1));
              const handleNextMonth = () => setCalendarMonth(new Date(year, month + 1, 1));
              
              const formattedSelectedDateForSlots = selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
              
              return (
              <div className="max-w-3xl mx-auto w-full flex flex-col md:flex-row gap-8">
                {/* Dynamic Calendar */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="text-slate-400 hover:text-slate-700 p-1"><ArrowLeft size={16}/></button>
                    <span className="font-bold text-sm text-[#0d1f4c]">{monthName}</span>
                    <button onClick={handleNextMonth} className="text-slate-400 hover:text-slate-700 p-1"><ArrowRight size={16}/></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <div key={d} className="text-[10px] font-bold text-slate-400">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty days */}
                    {Array.from({length: firstDay}).map((_, i) => <div key={`empty-${i}`}/>)}
                    
                    {/* Days 1-daysInMonth */}
                    {Array.from({length: daysInMonth}).map((_, i) => {
                      const day = i + 1;
                      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                      // Mock availability logic (weekends unavailable, rest available/partially)
                      const dayOfWeek = (firstDay + i) % 7;
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                      const hasAvailability = !isWeekend;
                      const isPartiallyAvailable = day % 3 === 0 && !isWeekend;
                      
                      return (
                        <div key={day} className="aspect-square flex items-center justify-center p-1">
                          <button 
                            onClick={() => {
                              if (hasAvailability) setSelectedDate(new Date(year, month, day));
                            }}
                            disabled={!hasAvailability}
                            className={`w-full h-full rounded-full text-xs font-semibold transition-colors flex flex-col items-center justify-center relative
                              ${isSelected ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 
                                !hasAvailability ? 'text-slate-300 cursor-not-allowed' :
                                'text-slate-700 hover:bg-slate-100'}
                            `}
                          >
                            <span>{day}</span>
                            {/* Dot for availability */}
                            {!isSelected && hasAvailability && (
                              <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isPartiallyAvailable ? 'bg-orange-400' : 'bg-emerald-500'}`}></div>
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-6 text-[10px] text-slate-500 justify-center border-t pt-4">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Available</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"/> Partially Available</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-300"/> Unavailable</div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="w-full md:w-1/2">
                  <h4 className="text-sm font-bold text-[#0d1f4c] mb-4 text-center">Available Slots for {formattedSelectedDateForSlots}</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {timeSlots.map(slot => {
                      if (slot.status === 'lunch') {
                        return <div key={slot.time} className="col-span-full py-2 bg-slate-100 rounded-lg text-center text-xs text-slate-500 font-semibold">{slot.label}</div>
                      }
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button 
                          key={slot.time}
                          onClick={() => { setSelectedTime(slot.time); handleNext(); }}
                          className={`py-2 rounded-lg border text-xs font-bold transition-all
                            ${isSelected ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 
                              slot.status === 'available' ? 'border-emerald-200 text-slate-700 hover:border-emerald-400' : 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'}
                          `}
                          disabled={slot.status === 'unavailable'}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              );
            })()}

            {/* Step 6 */}
            {step === 6 && (
              <div className="max-w-lg mx-auto w-full">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium w-1/3">Category</td><td className="py-2.5 font-bold text-[#0d1f4c]">{category?.label || 'Schemes & Subsidies'}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">DFO Office</td><td className="py-2.5 font-bold text-[#0d1f4c]">DFO Bangalore</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Date</td><td className="py-2.5 font-bold text-[#0d1f4c]">{selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} ({selectedDate.toLocaleDateString('en-IN', { weekday: 'long' })})</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Time</td><td className="py-2.5 font-bold text-[#0d1f4c]">{selectedTime}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Name</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.fullName}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Mobile Number</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.mobile}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Email ID</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.email}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">State/UT</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.stateUT}</td></tr>
                      <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">District</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.district}</td></tr>
                      {userType === USER_TYPES.EXISTING_MSME && <tr className="border-b border-slate-200/60"><td className="py-2.5 text-slate-500 font-medium">Udyam No.</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.udyamNo}</td></tr>}
                      <tr><td className="py-2.5 text-slate-500 font-medium">Enterprise Name</td><td className="py-2.5 font-bold text-[#0d1f4c]">{formData.enterpriseName}</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer mb-8 group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${confirmed ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white group-hover:border-blue-400'}`}>
                    {confirmed && <Check size={14} strokeWidth={3}/>}
                  </div>
                  <input type="checkbox" className="hidden" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                  <span className="text-sm font-semibold text-[#0d1f4c]">I confirm that the above details are correct.</span>
                </label>

                <div className="flex justify-center">
                  <button 
                    disabled={!confirmed}
                    onClick={handleNext} 
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}

            {/* Step 7 & 8 */}
            {step === 7 && (
              <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl mx-auto h-full">
                {/* Left: Confirmation */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 rounded-2xl border border-slate-200">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 relative">
                    <CheckCircle size={40} className="text-emerald-600" />
                    {/* sparkles */}
                    <div className="absolute -top-2 -right-4 text-emerald-300">✦</div>
                    <div className="absolute top-8 -left-6 text-emerald-400">✧</div>
                    <div className="absolute bottom-2 -right-2 text-emerald-500">✦</div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0d1f4c] mb-2">Your Appointment is Confirmed!</h2>
                  <p className="text-sm text-slate-500 mb-8 max-w-sm">
                    Your appointment has been successfully booked. We have sent the confirmation details to your email.
                  </p>
                  
                  <div className="w-full bg-white border border-slate-200 rounded-xl p-5 mb-8 text-left">
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div className="text-slate-500 font-medium">Appointment ID</div>
                      <div className="font-bold text-[#0d1f4c]">APPT-DFO-BLR-190525-0012</div>
                      <div className="text-slate-500 font-medium">Date & Time</div>
                      <div className="font-bold text-[#0d1f4c]">{selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}<br/><span className="text-xs font-medium text-slate-500">{selectedTime}</span></div>
                      <div className="text-slate-500 font-medium">DFO Office</div>
                      <div className="font-bold text-[#0d1f4c]">DFO Bangalore</div>
                      <div className="text-slate-500 font-medium">Category</div>
                      <div className="font-bold text-[#0d1f4c]">{category?.label || 'Schemes & Subsidies'}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 w-full">
                    <button className="flex-1 py-2.5 rounded-lg border border-slate-200 font-bold text-sm text-[#0d1f4c] hover:bg-slate-100 flex items-center justify-center gap-2">
                      <CalendarIcon size={16} /> Add to Calendar
                    </button>
                    <button className="flex-1 py-2.5 rounded-lg border border-slate-200 font-bold text-sm text-[#0d1f4c] hover:bg-slate-100 flex items-center justify-center gap-2">
                      <Download size={16} /> Download / Print
                    </button>
                  </div>
                  <button onClick={() => navigate('/')} className="w-full mt-4 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                    Go to Dashboard
                  </button>
                </div>

                {/* Right: Contact Details */}
                <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0d1f4c] mb-2">{DFO_CONTACT_DETAILS.name} - Contact Details</h3>
                  <p className="text-xs text-slate-500 mb-8">Please reach out to the DFO office for any queries.</p>
                  
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><MapPin size={16}/></div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1">Address</div>
                        <div className="text-sm font-semibold text-[#0d1f4c] whitespace-pre-line">{DFO_CONTACT_DETAILS.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Phone size={16}/></div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1">Contact Number</div>
                        <div className="text-sm font-semibold text-[#0d1f4c]">{DFO_CONTACT_DETAILS.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Mail size={16}/></div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1">Email ID</div>
                        <div className="text-sm font-semibold text-blue-600 hover:underline">{DFO_CONTACT_DETAILS.email}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><Clock size={16}/></div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1">Office Hours</div>
                        <div className="text-sm font-semibold text-[#0d1f4c] whitespace-pre-line">{DFO_CONTACT_DETAILS.officeHours}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><MapPin size={16}/></div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1">Google Maps</div>
                        <a href="#" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">View on Google Maps <ExternalLink size={12}/></a>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={() => navigate('/')} className="w-full mt-8 py-2.5 rounded-lg border-2 border-[#0d1f4c] text-[#0d1f4c] font-bold text-sm hover:bg-[#0d1f4c] hover:text-white transition-colors">
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Notes (for calendar step) */}
        {step === 5 && (
          <div className="max-w-4xl w-full mt-4 text-xs text-slate-500 px-4">
            <p className="font-bold text-slate-700 mb-1">Notes</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Time slots are in 30-minute intervals from 10:00 AM to 04:00 PM. Lunch break is from 01:00 PM to 02:00 PM.</li>
              <li>Slots shown in Green are available, Orange are limited, and Grey are not available.</li>
              <li>A confirmation email will be sent to the registered email ID after booking.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
