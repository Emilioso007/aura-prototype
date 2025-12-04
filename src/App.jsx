import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  Wifi, 
  Signal, 
  Lock, 
  Triangle,
  AlertTriangle,
  Plus,
  ChevronLeft,
  ShieldAlert,
  ShieldCheck,
  Activity,
  ChevronDown,
  Globe,
  Loader2,
  CheckCircle,
  XCircle,
  Scan,
  BookOpen,
  Eye,
  Trash2,
  Fingerprint,
  Facebook,
  Instagram,
  Twitter,
  Ghost,
  Video
} from 'lucide-react';

// --- Custom Styles ---
const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
    50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }
  
  @keyframes slide-down {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-down {
    animation: slide-down 0.4s ease-out forwards;
  }
  
  /* Hide Scrollbar */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- UI Components ---

const GlassCard = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg hover:bg-white/10 transition-all duration-300 ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6 px-2">
    <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
    {subtitle && <div className="h-0.5 w-12 bg-blue-500 mt-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
  </div>
);

const GlowingButton = ({ children, onClick, active, variant = "primary", className = "", loading = false }) => {
  const baseStyles = "w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variants = {
    primary: active 
      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-transparent" 
      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white",
    danger: "bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    ghost: "bg-transparent text-gray-500 hover:text-white"
  };

  return (
    <button onClick={!loading ? onClick : undefined} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : children}
    </button>
  );
};

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={18} className="text-green-400" />,
    error: <XCircle size={18} className="text-red-400" />,
    info: <Activity size={18} className="text-blue-400" />
  };

  return (
    <div className="absolute top-14 left-4 right-4 z-[100] animate-slide-down">
      <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

const AnimatedChart = () => (
  <div className="w-full h-24 relative overflow-hidden">
    <svg viewBox="0 0 300 60" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d="M0,40 Q30,25 60,35 T120,30 T180,45 T240,20 T300,35 V60 H0 Z" 
        fill="url(#chartGradient)" 
        className="opacity-50"
      />
      <path 
        d="M0,40 Q30,25 60,35 T120,30 T180,45 T240,20 T300,35" 
        fill="none" 
        stroke="#60A5FA" 
        strokeWidth="2"
        strokeLinecap="round"
        className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
      />
    </svg>
  </div>
);

const CircularStat = ({ label, percentage, color }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
        <circle 
          cx="40" cy="40" r="36" 
          stroke={color} 
          strokeWidth="6" 
          fill="none" 
          strokeDasharray="226" 
          strokeDashoffset={226 - (226 * percentage) / 100}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</span>
  </div>
);

// --- Sub-Pages ---

const HomePage = ({ navigateTo, showToast }) => (
  <div className="animate-fade-in-up pb-32">
    <div className="flex justify-between items-end mb-8 px-2">
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Aura</h1>
        <p className="text-sm text-gray-400 mt-1">System Status: <span className="text-green-400 font-bold glow">SECURE</span></p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
         <ShieldCheck className="text-white" size={20} />
      </div>
    </div>

    <GlassCard className="mb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Data Statistics</h3>
        <Activity size={16} className="text-blue-400" />
      </div>
      <div className="flex justify-around mb-8">
        <CircularStat label="Protection" percentage={92} color="#60A5FA" />
        <CircularStat label="Privacy" percentage={78} color="#A78BFA" />
      </div>
      <div className="border-t border-white/5 pt-4">
        <div className="flex justify-between items-end mb-2 px-1">
          <span className="text-[10px] text-gray-400 uppercase">Network Traffic</span>
          <span className="text-xs font-mono text-blue-300">2.4 GB/s</span>
        </div>
        <AnimatedChart />
      </div>
    </GlassCard>

    <SectionTitle title="Connected Accounts" subtitle />

    <div className="space-y-3">
      {[
        { name: "Social Media 1", status: "Risk Detected", color: "text-red-400", onClick: () => navigateTo('account_detail') },
        { name: "Bank Account", status: "Secure", color: "text-green-400", onClick: () => showToast("Scanning Bank Account...", "info") },
        { name: "Cloud Storage", status: "Scanning...", color: "text-blue-400", onClick: () => showToast("Cloud scan in progress...", "info") }
      ].map((acc, i) => (
        <GlassCard key={i} onClick={acc.onClick} className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
              <Globe size={20} className="text-gray-300" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-100">{acc.name}</p>
              <p className={`text-[10px] font-bold uppercase tracking-wide ${acc.color}`}>{acc.status}</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            {acc.status === "Scanning..." ? <Loader2 size={16} className="text-blue-400 animate-spin" /> : <ChevronLeft size={16} className="rotate-180 text-gray-500" />}
          </div>
        </GlassCard>
      ))}
      
      <button 
        onClick={() => showToast("Searching for new accounts...", "info")}
        className="w-full py-4 border-2 border-dashed border-gray-700 rounded-2xl text-gray-500 text-sm font-bold uppercase tracking-wider hover:border-gray-500 hover:text-gray-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Add Account
      </button>
    </div>
  </div>
);

const AlertsPage = ({ showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const openModal = (alert) => {
    setSelectedAlert(alert);
    setModalOpen(true);
  };

  const handleResolve = () => {
    setModalOpen(false);
    setTimeout(() => showToast("Threat successfully neutralized", "success"), 300);
  };

  return (
    <div className="animate-fade-in-up pb-32">
      <div className="mb-8 px-2">
        <h1 className="text-3xl font-bold text-white mb-2">System Alerts</h1>
        <div className="flex gap-2">
           <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/20">3 CRITICAL</span>
           <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-bold border border-yellow-500/20">5 WARNINGS</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {[
          { title: "Unauthorized Access", desc: "Login attempt from Moscow, RU", severity: "critical", icon: AlertTriangle },
          { title: "Password Leak", desc: "Your email appeared in a breach", severity: "high", icon: ShieldAlert },
          { title: "Update Required", desc: "Security patch pending", severity: "medium", icon: Activity }
        ].map((alert, i) => (
          <div 
            key={i} 
            onClick={() => openModal(alert)}
            className={`
              relative p-4 rounded-2xl border backdrop-blur-md cursor-pointer transition-transform active:scale-[0.98]
              ${alert.severity === 'critical' 
                ? 'bg-red-500/10 border-red-500/50 animate-pulse-glow' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl ${alert.severity === 'critical' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
                  <alert.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-100 text-sm">{alert.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{alert.desc}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="History" />
      <div className="space-y-2 opacity-60">
        {[1, 2, 3].map((i) => (
           <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-sm text-gray-400">Resolved Alert #{1023 + i}</span>
              <ShieldCheck size={14} className="text-green-500" />
           </div>
        ))}
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#1a1a1a] w-full sm:w-[90%] sm:rounded-3xl rounded-t-3xl border border-gray-700 overflow-hidden shadow-2xl relative">
             <div className="h-1 w-12 bg-gray-600 rounded-full mx-auto mt-3 mb-6"></div>
             
             <div className="px-6 pb-8">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-500/20 rounded-full text-red-500">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Threat Details</h2>
               </div>
               
               <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-6 text-sm text-gray-300 leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                 <p className="mb-4"><span className="text-red-400 font-bold">EVENT:</span> {selectedAlert.title}</p>
                 <p className="mb-4">Our AI monitoring systems detected unusual activity consistent with a brute-force attack on your linked Social Media account.</p>
                 <p className="mb-4 text-xs text-gray-500 font-mono">IP: 192.168.1.X <br/> TIME: 14:02 UTC <br/> DEVICE: Unknown Linux Device</p>
                 <p className="text-green-400">Recommended Action: Change password immediately and enable 2FA.</p>
               </div>

               <div className="flex flex-col gap-3">
                 <GlowingButton variant="primary" onClick={handleResolve}>Resolve Threat</GlowingButton>
                 <GlowingButton variant="ghost" onClick={() => setModalOpen(false)}>Dismiss</GlowingButton>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LeaksPage = ({ showToast }) => {
  const [expanded, setExpanded] = useState(null);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const loadOlder = () => {
    setLoadingOlder(true);
    setTimeout(() => {
      setLoadingOlder(false);
      showToast("No older leaks found.", "success");
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up pb-32">
      <div className="px-2 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dark Web Scan</h1>
        <p className="text-xs text-gray-400">Last scan completed: <span className="text-white font-mono">2 mins ago</span></p>
      </div>

      <div className="space-y-4">
        {[
          { id: 1, source: "Adobe Breach", date: "2023", data: "Emails, Passwords" },
          { id: 2, source: "LinkedIn Scraping", date: "2021", data: "Public Profiles, Phones" },
          { id: 3, source: "Dropbox Incident", date: "2012", data: "Encrypted Passwords" },
        ].map((leak) => (
          <div key={leak.id} className="group">
            <div 
              onClick={() => toggle(leak.id)}
              className={`
                relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
                ${expanded === leak.id ? 'bg-white/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'hover:bg-white/10'}
              `}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold text-xs border border-gray-700">
                    {leak.source.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-100 text-sm">{leak.source}</h3>
                    <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">{leak.date} • {leak.data}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 ${expanded === leak.id ? 'rotate-180 bg-blue-500 text-white' : 'text-gray-500'}`}>
                  <ChevronDown size={18} />
                </div>
              </div>
              
              {/* Expandable Content */}
              <div className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${expanded === leak.id ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <span className="text-red-400 font-bold">ALERT:</span> Your email address was found in this database. 
                    This breach exposes <span className="text-white">{leak.data}</span>. 
                    It is highly recommended you change your password on this site and any others where you reused it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
          onClick={loadOlder}
          disabled={loadingOlder}
          className="text-xs text-gray-500 font-medium hover:text-white transition-colors flex items-center gap-2 py-2 px-4 rounded-full active:bg-white/5"
        >
           {loadingOlder ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
           {loadingOlder ? "Scanning Archives..." : "Load Older Scans"}
        </button>
      </div>
    </div>
  );
};

const GuidePage = ({ showToast }) => {
  return (
    <div className="animate-fade-in-up pb-32">
       <div className="px-2 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Academy</h1>
        <p className="text-xs text-gray-400">Master your digital footprint with these quick lessons.</p>
        
        {/* Progress */}
        <div className="mt-4 flex items-center gap-2">
           <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full w-[40%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
           </div>
           <span className="text-[10px] font-bold text-blue-400">2/5 Completed</span>
        </div>
      </div>

      <div className="space-y-4">
         <GlassCard onClick={() => showToast("Opening: Ghost Browsing...", "info")} className="cursor-pointer group hover:border-blue-500/50">
           <div className="flex items-start gap-4">
             <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
               <Eye size={24} />
             </div>
             <div>
               <h3 className="font-bold text-white text-sm mb-1">Ghost Browsing</h3>
               <p className="text-xs text-gray-400 leading-relaxed">
                 Learn how to use VPNs and privacy browsers to minimize tracking cookies.
               </p>
               <span className="text-[10px] text-blue-400 font-bold uppercase mt-2 block">5 min read</span>
             </div>
           </div>
         </GlassCard>

         <GlassCard onClick={() => showToast("Opening: Social Cleanup...", "info")} className="cursor-pointer group hover:border-purple-500/50">
           <div className="flex items-start gap-4">
             <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
               <Trash2 size={24} />
             </div>
             <div>
               <h3 className="font-bold text-white text-sm mb-1">Social Cleanup</h3>
               <p className="text-xs text-gray-400 leading-relaxed">
                 Old accounts are vulnerabilities. Here is a checklist for deleting unused profiles.
               </p>
               <span className="text-[10px] text-purple-400 font-bold uppercase mt-2 block">3 min read</span>
             </div>
           </div>
         </GlassCard>

         <GlassCard onClick={() => showToast("Opening: Digital ID...", "info")} className="cursor-pointer group hover:border-green-500/50">
           <div className="flex items-start gap-4">
             <div className="p-3 bg-green-500/10 rounded-xl text-green-400 group-hover:scale-110 transition-transform">
               <Fingerprint size={24} />
             </div>
             <div>
               <h3 className="font-bold text-white text-sm mb-1">Your Digital ID</h3>
               <p className="text-xs text-gray-400 leading-relaxed">
                 Understand what data brokers know about you and how to opt-out.
               </p>
               <span className="text-[10px] text-green-400 font-bold uppercase mt-2 block">8 min read</span>
             </div>
           </div>
         </GlassCard>
      </div>

      <div className="mt-8 px-4 py-6 bg-white/5 rounded-2xl border border-white/5 text-center">
         <h3 className="font-bold text-white mb-2">Weekly Challenge</h3>
         <p className="text-xs text-gray-400 mb-4">Change passwords for 3 accounts.</p>
         <GlowingButton variant="ghost" onClick={() => showToast("Challenge Accepted!", "success")}>Accept Challenge</GlowingButton>
      </div>
    </div>
  );
};

const AccountDetailView = ({ onBack, showToast }) => {
  const [revoking, setRevoking] = useState(false);

  const handleRevoke = () => {
    setRevoking(true);
    setTimeout(() => {
      setRevoking(false);
      showToast("Access Token Revoked", "success");
      setTimeout(onBack, 1000);
    }, 2000);
  };

  return (
    <div className="animate-fade-in-up pb-32 min-h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 pt-2">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-90">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-white">Analysis Report</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 animate-pulse-glow">
           <Globe size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Social Media 1</h2>
        <p className="text-sm text-gray-400">@alex_doe • Linked 2 days ago</p>
      </div>

      <GlassCard className="mb-6 bg-red-500/5 border-red-500/20">
        <div className="flex items-start gap-3">
          <Triangle className="text-red-500 fill-red-500 mt-1 shrink-0" size={20} />
          <div>
            <h3 className="text-sm font-bold text-red-200 mb-1">Vulnerability Detected</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              The authorization token for this account appears to be weak. Third-party apps may have unrestricted access to your direct messages.
            </p>
          </div>
        </div>
      </GlassCard>

      <SectionTitle title="Activity Log" subtitle />
      <GlassCard className="mb-6">
        <AnimatedChart />
        <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1 font-mono">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
        </div>
      </GlassCard>

      <div className="mt-auto pt-8">
        <GlowingButton variant="danger" onClick={handleRevoke} loading={revoking}>
          {revoking ? "Revoking..." : "Revoke Access"}
        </GlowingButton>
        <p className="text-[10px] text-gray-500 text-center mt-3">
          Revoking access will disconnect Aura from monitoring this account.
        </p>
      </div>
    </div>
  );
};

// --- Main App Wrapper ---

export default function PhoneEmulator() {
  const [view, setView] = useState('lockscreen'); 
  const [activeTab, setActiveTab] = useState('HOME');
  const [navStack, setNavStack] = useState('main'); 
  const [currentTime, setCurrentTime] = useState('09:41');
  const [notification, setNotification] = useState(null);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (message, type) => {
    setNotification({ message, type });
  };

  const closeToast = () => setNotification(null);

  const openApp = () => setView('app');
  const goHome = () => { setView('home'); setNavStack('main'); setActiveTab('HOME'); };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4 font-sans select-none overflow-hidden">
      <style>{styles}</style>
      
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-[0_0_50px_rgba(50,50,50,0.5)] border-[8px] border-[#1a1a1a] overflow-hidden ring-1 ring-gray-800">
        
        {/* Toast Notification */}
        {notification && (
          <Toast 
            message={notification.message} 
            type={notification.type} 
            onClose={closeToast} 
          />
        )}

        {/* Status Bar */}
        <div className="absolute top-0 w-full h-12 px-6 flex justify-between items-center text-white text-xs z-50 font-medium tracking-wide pointer-events-none mix-blend-difference">
          <div className="w-10 text-center">{currentTime}</div>
          <div className="flex items-center space-x-2">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
             <div className="w-2 h-2 rounded-full bg-gray-800/50 mr-2"></div>
             <div className="w-12 h-2 rounded-full bg-gray-900"></div>
        </div>

        {/* --- LOCK SCREEN --- */}
        {view === 'lockscreen' && (
          <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center flex flex-col items-center pt-24 text-white animate-fade-in-up cursor-pointer relative"
            onClick={() => setView('home')}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            <div className="relative z-10 flex flex-col items-center">
                <Lock size={24} className="mb-6 opacity-80" />
                <h1 className="text-8xl font-thin tracking-tighter drop-shadow-2xl">{currentTime}</h1>
                <p className="text-lg font-medium opacity-90 mt-2">Wednesday, December 4</p>
            </div>
            
            <div className="absolute bottom-10 flex flex-col items-center animate-pulse gap-2 z-10">
              <p className="text-xs font-bold tracking-widest opacity-80 uppercase">Swipe to Unlock</p>
              <div className="w-32 h-1 bg-white rounded-full opacity-80 shadow-[0_0_10px_white]"></div>
            </div>
          </div>
        )}

        {/* --- HOME SCREEN (OS) --- */}
        {view === 'home' && (
          <div className="w-full h-full bg-gray-900 flex flex-col relative animate-fade-in-up overflow-hidden">
             {/* Wallpaper */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-80"></div>

            <div className="grid grid-cols-4 gap-4 px-5 pt-24 relative z-10">
               {/* AURA APP ICON */}
               <div 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={openApp}
               >
                 <div className="w-14 h-14 bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-active:scale-90 transition-transform overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-60"></div>
                   <span className="relative z-10 text-white font-bold text-[10px] tracking-widest">AURA</span>
                 </div>
                 <span className="text-[10px] text-white font-medium drop-shadow-md">Aura</span>
               </div>
               
               {/* SOCIAL MEDIA APPS */}
               {[
                 { name: "Facebook", icon: Facebook, color: "bg-blue-600", url: "https://www.facebook.com" },
                 { name: "Instagram", icon: Instagram, color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500", url: "https://www.instagram.com" },
                 { name: "Twitter", icon: Twitter, color: "bg-sky-500", url: "https://twitter.com" },
                 { name: "TikTok", icon: Video, color: "bg-black", url: "https://www.tiktok.com" },
                 { name: "Snapchat", icon: Ghost, color: "bg-yellow-400", url: "https://www.snapchat.com" }
               ].map((app, i) => (
                 <div 
                   key={i} 
                   className="flex flex-col items-center gap-2 cursor-pointer group"
                   onClick={() => window.open(app.url, '_blank')}
                 >
                   <div className={`w-14 h-14 ${app.color} backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-active:scale-90 transition-transform overflow-hidden`}>
                     <app.icon className="text-white" size={28} />
                   </div>
                   <span className="text-[10px] text-white font-medium drop-shadow-md">{app.name}</span>
                 </div>
               ))}

               {/* Remaining Dummy Icons */}
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 opacity-80">
                   <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg"></div>
                   <div className="w-8 h-2 bg-white/20 rounded-full"></div>
                 </div>
               ))}
            </div>
            
            {/* Dock */}
            <div className="absolute bottom-6 left-4 right-4 h-20 bg-white/10 backdrop-blur-xl rounded-[30px] flex items-center justify-around px-2 border border-white/10 shadow-2xl">
              {[...Array(4)].map((_, i) => (
                 <div key={i} className="w-12 h-12 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"></div>
              ))}
            </div>
          </div>
        )}

        {/* --- AURA APP UI --- */}
        {view === 'app' && (
          <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden animate-fade-in-up font-sans">
            
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-[-20%] left-[-20%] w-[140%] h-[80%] rounded-full mix-blend-screen filter blur-[100px] opacity-20 transition-all duration-1000 ${
                    activeTab === 'HOME' ? 'bg-blue-600' : activeTab === 'ALERTS' ? 'bg-red-600' : activeTab === 'LEAKS' ? 'bg-purple-600' : 'bg-green-600'
                }`}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] rounded-full bg-cyan-600/10 mix-blend-screen filter blur-[80px]"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-14 px-4 relative z-10">
              {navStack === 'account_detail' ? (
                <AccountDetailView onBack={() => setNavStack('main')} showToast={showToast} />
              ) : (
                <>
                  {activeTab === 'HOME' && <HomePage navigateTo={setNavStack} showToast={showToast} />}
                  {activeTab === 'ALERTS' && <AlertsPage showToast={showToast} />}
                  {activeTab === 'LEAKS' && <LeaksPage showToast={showToast} />}
                  {activeTab === 'GUIDE' && <GuidePage showToast={showToast} />}
                </>
              )}
            </div>

            {/* Custom Tab Bar */}
            <div className="absolute bottom-8 left-4 right-4 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex justify-between items-center px-1 z-20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
               {[
                   { id: 'HOME', icon: ShieldCheck, label: 'Home' },
                   { id: 'ALERTS', icon: AlertTriangle, label: 'Alerts' },
                   { id: 'LEAKS', icon: Globe, label: 'Leaks' },
                   { id: 'GUIDE', icon: BookOpen, label: 'Learn' }
               ].map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => { setActiveTab(tab.id); setNavStack('main'); }}
                   className={`
                     flex-1 h-full rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 relative
                     ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                   `}
                 >
                   {activeTab === tab.id && (
                       <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/5 shadow-inner"></div>
                   )}
                   <tab.icon size={20} className={`relative z-10 ${activeTab === tab.id ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`} />
                   <span className="text-[10px] font-bold tracking-wider relative z-10">{tab.label}</span>
                 </button>
               ))}
            </div>
            
            {/* Home Indicator */}
            <div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 cursor-pointer hover:bg-white/50 transition-colors"
                onClick={goHome}
            ></div>

          </div>
        )}
      </div>
    </div>
  );
}