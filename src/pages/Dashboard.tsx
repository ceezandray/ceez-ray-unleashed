import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid, Calendar, DollarSign, TrendingUp, Share2,
  BarChart3, ShoppingBag, ArrowLeft, Clock,
  Upload, Mail, ExternalLink, FileText, Lock, Settings,
  Plus, Check, X, Paperclip, ChevronRight, Image, Video,
  LayoutDashboard, Wrench, Filter
} from "lucide-react";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface Todo {
  id: number;
  text: string;
  assign: "jasmine" | "quantice" | "staff";
  done: boolean;
}

interface StickyNote {
  id: number;
  text: string;
  type: "gray" | "red" | "quote";
  date: string;
}

interface Fix {
  id: number;
  title: string;
  desc: string;
  page: string;
  priority: "high" | "med" | "low";
  status: "open" | "progress" | "done";
}

interface OtherEarning {
  id: number;
  description: string;
  amount: string;
  date: string;
  project: string;
}

// ═══════════════════════════════════════════
// SIDEBAR ITEMS
// ═══════════════════════════════════════════
const sidebarSections: { label?: string; items: SidebarItem[] }[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: <LayoutGrid size={19} /> },
      { id: "calendar", label: "Calendar", icon: <Calendar size={19} /> },
    ],
  },
  {
    label: "Earnings",
    items: [
      { id: "yt-earnings", label: "YouTube", icon: <DollarSign size={19} /> },
      { id: "merch-earnings", label: "Merch Sales", icon: <ShoppingBag size={19} /> },
      { id: "other-earnings", label: "Other Earnings", icon: <TrendingUp size={19} /> },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "traffic", label: "Traffic & Analytics", icon: <BarChart3 size={19} /> },
      { id: "social", label: "Social Hub", icon: <Share2 size={19} /> },
    ],
  },
];

// ═══════════════════════════════════════════
// CHART COMPONENT
// ═══════════════════════════════════════════
const BarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const max = Math.max(...data);
  return (
    <div>
      <div className="flex items-end gap-[5px] h-20">
        {data.map((v, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t transition-colors hover:!bg-[hsl(var(--dash-red))] ${
              i === data.length - 1 ? "bg-[hsl(var(--dash-red))]" : "bg-[rgba(255,255,255,0.10)]"
            }`}
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[11px] font-medium text-[hsl(var(--dash-text-4))]">
        {labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════
const ProgressBar = ({ name, value, pct }: { name: string; value: string; pct: number }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-[hsl(var(--dash-text-2))]">{name}</span>
      <span className="text-[13px] font-bold text-[hsl(var(--dash-text))]">{value}</span>
    </div>
    <div className="h-1.5 bg-[rgba(255,255,255,0.07)]  overflow-hidden">
      <div
        className="h-full  bg-[hsl(var(--dash-red))]"
        style={{ width: `${pct}%`, opacity: Math.max(0.3, pct / 100) }}
      />
    </div>
  </div>
);

// ═══════════════════════════════════════════
// STAT CARD
// ═══════════════════════════════════════════
const StatCard = ({
  label, value, delta, accent, negative
}: {
  label: string; value: string; delta: string; accent?: boolean; negative?: boolean;
}) => (
  <div className={`bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 ${accent ? "border-l-[3px] border-l-[hsl(var(--dash-red))]" : ""}`}>
    <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-2">{label}</div>
    <div className="text-[28px] font-extrabold text-[hsl(var(--dash-text))] leading-none tracking-tight">{value}</div>
    <div className={`text-[13px] font-semibold mt-2 ${negative ? "text-[hsl(var(--dash-red))]" : "text-[hsl(var(--dash-text))]"}`}>{delta}</div>
  </div>
);

// ═══════════════════════════════════════════
// MAIN DASHBOARD PAGE
// ═══════════════════════════════════════════
const DashboardPage = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("dashboard");
  const [clock, setClock] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");

  useEffect(() => {
    if (!sessionStorage.getItem("bpf-auth")) {
      navigate("/login");
    }
  }, [navigate]);

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoAssign, setTodoAssign] = useState<Todo["assign"]>("jasmine");

  const [stickies, setStickies] = useState<StickyNote[]>([]);
  const [notes, setNotes] = useState("");

  const [fixes, setFixes] = useState<Fix[]>([
    { id: 1, title: "Mobile nav menu broken on iOS Safari", desc: "Hamburger menu doesn't open on iPhone 14 and below", page: "Homepage", priority: "high", status: "open" },
    { id: 2, title: "Contact form not sending emails", desc: "Form submits but emails never arrive in Gmail", page: "Contact", priority: "high", status: "open" },
    { id: 3, title: "Merch images loading slowly", desc: "Shop page images not optimized, LCP > 4s", page: "Shop", priority: "med", status: "progress" },
    { id: 4, title: "YouTube embed not responsive on tablet", desc: "Video overflows container on 768px screens", page: "Videos", priority: "med", status: "progress" },
    { id: 5, title: "SEO meta tags missing on blog posts", desc: "OG tags not rendering when shared to social", page: "Blog", priority: "med", status: "open" },
    { id: 6, title: "Footer links need updating", desc: "Old social links still pointing to deleted accounts", page: "Global", priority: "low", status: "open" },
    { id: 7, title: "About page typo in bio section", desc: "\"Ceez & Ray\" misspelled in third paragraph", page: "About", priority: "low", status: "open" },
  ]);
  const [fixInput, setFixInput] = useState("");
  const [fixPriority, setFixPriority] = useState<Fix["priority"]>("med");

  const [otherEarnings, setOtherEarnings] = useState<OtherEarning[]>([]);
  const [earningDesc, setEarningDesc] = useState("");
  const [earningAmount, setEarningAmount] = useState("");
  const [earningDate, setEarningDate] = useState("");
  const [earningProject, setEarningProject] = useState("");

  const [toolsOpen, setToolsOpen] = useState(false);

  const [calendarFilter, setCalendarFilter] = useState<Set<string>>(new Set(["quantice", "staff", "jasmine"]));
  const [showCalendarFilter, setShowCalendarFilter] = useState(false);

  const tick = useCallback(() => {
    const now = new Date();
    setClock(now.toLocaleTimeString("en-US", {
      timeZone: timezone, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true
    }));
  }, [timezone]);

  useEffect(() => {
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos(prev => [{ id: Date.now(), text: todoInput.trim(), assign: todoAssign, done: false }, ...prev]);
    setTodoInput("");
  };

  const addSticky = (type: StickyNote["type"]) => {
    setStickies(prev => [...prev, {
      id: Date.now(), text: "", type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }]);
  };

  const addFix = () => {
    if (!fixInput.trim()) return;
    setFixes(prev => [...prev, {
      id: Date.now(), title: fixInput.trim(), desc: "Added just now", page: "—", priority: fixPriority, status: "open"
    }]);
    setFixInput("");
  };

  const addOtherEarning = () => {
    if (!earningDesc.trim() || !earningAmount.trim()) return;
    setOtherEarnings(prev => [...prev, {
      id: Date.now(),
      description: earningDesc.trim(),
      amount: earningAmount.trim(),
      date: earningDate || new Date().toLocaleDateString(),
      project: earningProject.trim(),
    }]);
    setEarningDesc("");
    setEarningAmount("");
    setEarningDate("");
    setEarningProject("");
  };

  const openCount = fixes.filter(f => f.status === "open").length;

  const chartLabels = ["Mar 14", "Mar 17", "Mar 20", "Mar 23", "Mar 26", "Today"];

  const assignLabels = { jasmine: "Jasmine", quantice: "Quantice", staff: "Staff" };

  const calendarEvents = [
    { day: "29", mo: "Mar", title: "Upload Day", detail: "New video goes live — final edit by 10am", assign: "quantice" as const },
    { day: "31", mo: "Mar", title: "Month Recap & Q2 Planning", detail: "Review March numbers, plan April content", assign: "staff" as const },
    { day: "5", mo: "Apr", title: "Collab Shoot", detail: "Filming with guest — confirm location", assign: "jasmine" as const },
    { day: "8", mo: "Apr", title: "Upload Day", detail: "Ep 2 release — all platforms", assign: "quantice" as const },
    { day: "11", mo: "Apr", title: "Merch Restock Drop", detail: "Limited hoodie restock — announce 48hrs before", assign: "staff" as const },
    { day: "15", mo: "Apr", title: "Upload Day", detail: "Ep 3 release", assign: "quantice" as const },
  ];

  const filteredCalendarEvents = calendarEvents.filter(ev => calendarFilter.has(ev.assign));

  const toggleCalendarFilter = (key: string) => {
    setCalendarFilter(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="dash-font h-screen flex flex-col bg-[hsl(var(--dash-bg))] text-[hsl(var(--dash-text))] text-[15px] overflow-hidden">
      {/* TOPBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-4 bg-[rgba(0,0,0,0.60)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.10)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 px-3 py-1.5  border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.08)] text-[hsl(var(--dash-text))] text-xs font-bold hover:bg-[rgba(255,255,255,0.16)] transition-all">
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Site</span>
          </button>
          <span className="text-[15px] font-extrabold tracking-tight">Creator Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5  border text-xs font-semibold transition-all ${toolsOpen ? "border-[hsl(var(--dash-red))] text-[hsl(var(--dash-red))] bg-[hsl(var(--dash-red-bg))]" : "border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))]"}`}
          >
            ⚙ Tools
          </button>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="flex items-center gap-1.5 px-2.5 py-1.5  border border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] text-xs font-semibold hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] transition-all"
          >
            <Settings size={13} />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.18)]  px-2.5 py-1 text-[11px] font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dash-text))] animate-pulse" />
            Online
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[rgba(255,255,255,0.85)]" />
            <span className="text-[13px] font-bold text-[rgba(255,255,255,0.85)] tabular-nums">{clock}</span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.20)]  text-[hsl(var(--dash-text))] text-[11px] font-bold px-1.5 py-0.5 outline-none cursor-pointer"
            >
              <option value="America/New_York">EST</option>
              <option value="America/Los_Angeles">PST</option>
            </select>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("bpf-auth"); navigate("/login"); }}
            className="px-2.5 py-1.5  border border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] text-xs font-semibold hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPasswordChange(false)}>
          <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.18)]  p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-extrabold mb-4">Change Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none mb-3 focus:border-[hsl(var(--dash-red))]"
            />
            <button
              onClick={() => { setShowPasswordChange(false); setNewPassword(""); }}
              className="w-full py-2.5 bg-[hsl(var(--dash-red))]  text-sm font-bold shadow-[0_2px_8px_hsl(var(--dash-red-glow))]"
            >
              Update Password
            </button>
            <p className="text-[11px] text-[hsl(var(--dash-text-4))] mt-2 text-center">Password changes will take effect on next login.</p>
          </div>
        </div>
      )}

      {/* HERO BANNER */}
      <div className="relative h-[195px] flex-shrink-0 mt-[52px] overflow-hidden bg-[hsl(var(--dash-bg))]">
        <img src="/images/hero-ferris.jpg" alt="Ceez and Ray" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.75) 18%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.90) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-[hsl(var(--dash-bg))]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(to right, hsl(var(--dash-red)) 0%, hsl(var(--dash-red) / 0.5) 50%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-4 flex items-end justify-between px-7">
          <div className="flex gap-0">
            {[
              { val: "2.4M", lbl: "Monthly Views" },
              { val: "142K", lbl: "Subscribers" },
              { val: "$3,812", lbl: "YT Revenue" },
              { val: "$6,241", lbl: "Merch Sales" },
            ].map((kpi, i) => (
              <div key={i} className="px-4 py-2 border-r border-[rgba(255,255,255,0.15)] last:border-r-0 mr-4 last:mr-0">
                <div className="text-xl font-extrabold text-[hsl(var(--dash-text))] leading-none tracking-tight drop-shadow-lg">{kpi.val}</div>
                <div className="text-[10px] font-bold text-[hsl(var(--dash-red))] uppercase tracking-widest mt-0.5">{kpi.lbl}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <img src="/images/bpf-logo.png" alt="Black Picket Fence" className="h-[50px] drop-shadow-2xl" style={{ objectFit: "contain" }} />
            <img src="/images/ceezandray-logo.png" alt="Ceez & Ray" className="h-[42px] drop-shadow-2xl" style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 grid grid-cols-[210px_1fr_260px] overflow-hidden">
        {/* SIDEBAR - NOT scrollable */}
        <div className="bg-[hsl(var(--sidebar-background))] border-r border-[rgba(255,255,255,0.09)] flex flex-col p-3 gap-1 overflow-hidden">
          {sidebarSections.map((section, si) => (
            <div key={si}>
              {si > 0 && <div className="h-px bg-[rgba(255,255,255,0.09)] my-1.5 mx-1" />}
              {section.label && (
                <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[hsl(var(--dash-text-4))] px-3.5 pt-2.5 pb-1">{section.label}</div>
              )}
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className={`relative flex items-center gap-2.5 w-full px-3.5 py-2.5  text-sm font-semibold transition-all border ${
                    activePanel === item.id
                      ? "bg-[hsl(var(--dash-red))] text-[hsl(var(--dash-text))] border-transparent shadow-[0_4px_16px_hsl(var(--dash-red-glow))]"
                      : "text-[hsl(var(--dash-text-3))] border-transparent hover:bg-[rgba(229,57,53,0.08)] hover:text-[hsl(var(--dash-text-2))] hover:border-[rgba(255,255,255,0.09)]"
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* MAIN CONTENT - scrollable */}
        <div className="overflow-y-auto relative">
          {/* Dashboard Home Panel */}
          {activePanel === "dashboard" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">Dashboard</div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[rgba(255,255,255,0.06)] text-[hsl(var(--dash-text-3))]">Home</div>
              </div>

              {/* To-Do Section */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-xs font-extrabold tracking-wider uppercase text-[hsl(var(--dash-text-4))]">To-Do List</div>
                  <div className="flex gap-2 items-center flex-1 ml-4">
                    <input
                      value={todoInput}
                      onChange={e => setTodoInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addTodo()}
                      placeholder="Add a task..."
                      className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2 text-[13px] text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))]"
                    />
                    <select
                      value={todoAssign}
                      onChange={e => setTodoAssign(e.target.value as Todo["assign"])}
                      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-2.5 py-2 text-xs font-semibold text-[hsl(var(--dash-text))] outline-none cursor-pointer"
                    >
                      <option value="jasmine">Jasmine</option>
                      <option value="quantice">Quantice</option>
                      <option value="staff">Staff</option>
                    </select>
                    <button onClick={addTodo} className="px-3 py-2 bg-[hsl(var(--dash-red))]  text-[hsl(var(--dash-text))] text-xs font-bold shadow-[0_2px_8px_hsl(var(--dash-red-glow))] hover:brightness-110">Add</button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {todos.length === 0 && <div className="text-[13px] text-[hsl(var(--dash-text-4))] py-3">No tasks yet. Add one above.</div>}
                  {todos.map(t => (
                    <div key={t.id} className={`flex items-center gap-2.5 px-3 py-2.5  border-[1.5px] transition-all border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] ${t.done ? "opacity-45 line-through" : ""}`}>
                      <button
                        onClick={() => setTodos(prev => prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
                        className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex-shrink-0 flex items-center justify-center transition-all border-[rgba(255,255,255,0.3)] ${t.done ? "bg-white" : ""}`}
                      >
                        {t.done && <Check size={10} className="text-[hsl(var(--dash-bg))]" />}
                      </button>
                      <span className="flex-1 text-sm font-medium">{t.text}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5  uppercase tracking-wider bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]">{assignLabels[t.assign]}</span>
                      <button onClick={() => setTodos(prev => prev.filter(x => x.id !== t.id))} className="w-[22px] h-[22px]  flex items-center justify-center text-[hsl(var(--dash-text-4))] hover:bg-[hsl(var(--dash-red-bg))] hover:text-[hsl(var(--dash-red))] transition-all">
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-extrabold tracking-wider uppercase text-[hsl(var(--dash-text-4))]">Quick Notes</div>
                  <button onClick={() => { if (confirm("Clear all notes?")) setNotes(""); }} className="text-[11px] font-semibold text-[hsl(var(--dash-text-4))] hover:text-[hsl(var(--dash-red))] transition-colors">Clear</button>
                </div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Jot down quick ideas, reminders, links..."
                  className="w-full min-h-[120px] max-h-[200px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3.5 py-3 text-sm text-[hsl(var(--dash-text))] outline-none resize-y focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))] leading-relaxed"
                />
              </div>

              {/* Sticky Notes */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-xs font-extrabold tracking-wider uppercase text-[hsl(var(--dash-text-4))]">Sticky Notes</div>
                  <div className="flex gap-1.5">
                    <button onClick={() => addSticky("gray")} className="text-[11px] font-bold px-3 py-1  bg-[#4a4a4a] text-[hsl(var(--dash-text))] hover:bg-[#5a5a5a] transition-all">+ Note</button>
                    <button onClick={() => addSticky("red")} className="text-[11px] font-bold px-3 py-1  bg-[hsl(var(--dash-red))] text-[hsl(var(--dash-text))] shadow-[0_2px_8px_hsl(var(--dash-red-glow))] hover:brightness-110 transition-all">+ Alert</button>
                    <button onClick={() => addSticky("quote")} className="text-[11px] font-bold px-3 py-1  bg-transparent text-[hsl(var(--dash-red))] border-[1.5px] border-[hsl(var(--dash-red))] hover:bg-[hsl(var(--dash-red-bg))] transition-all">+ Quote</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5 min-h-[50px]">
                  {stickies.length === 0 && <div className="text-[13px] text-[hsl(var(--dash-text-4))] py-3">Click + Note, + Alert, or + Quote to add a sticky note</div>}
                  {stickies.map(s => {
                    const styles = {
                      gray: "bg-[#e8e8e8] text-[#1a1a1a]",
                      red: "bg-[hsl(var(--dash-red))] text-[hsl(var(--dash-text))]",
                      quote: "bg-transparent text-[hsl(var(--dash-red))] border-2 border-[hsl(var(--dash-red))] italic font-semibold",
                    };
                    return (
                      <div key={s.id} className={`relative w-[180px] min-h-[120px]  p-3.5 pb-7 text-[13px] font-medium leading-relaxed shadow-lg transition-all hover:-translate-y-0.5 ${styles[s.type]}`}>
                        <textarea
                          className="w-full border-none bg-transparent text-inherit text-[13px] font-medium leading-relaxed resize-none outline-none min-h-[80px]"
                          style={{ fontStyle: s.type === "quote" ? "italic" : "normal", fontWeight: s.type === "quote" ? 600 : 500 }}
                          value={s.text}
                          onChange={e => setStickies(prev => prev.map(x => x.id === s.id ? { ...x, text: e.target.value } : x))}
                          placeholder={s.type === "quote" ? "Write a quote..." : "Write a note..."}
                        />
                        <span className="absolute bottom-2 left-3.5 text-[10px] font-semibold opacity-50">{s.date}</span>
                        <button
                          onClick={() => setStickies(prev => prev.filter(x => x.id !== s.id))}
                          className="absolute top-2 right-2 w-5 h-5  bg-[rgba(0,0,0,0.18)] flex items-center justify-center text-[11px] opacity-0 hover:opacity-100 transition-opacity"
                          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                          onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* YouTube Earnings Panel */}
          {activePanel === "yt-earnings" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">YouTube Earnings</div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[rgba(255,255,255,0.10)] text-[hsl(var(--dash-text))]">● Live</div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[hsl(var(--dash-red-bg))] text-[hsl(var(--dash-red))]">March 2026</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <StatCard label="Estimated Revenue" value="$3,812" delta="↑ +22.3% vs Feb" accent />
                <StatCard label="Total Views" value="2.4M" delta="↑ +18.5% MoM" accent />
                <StatCard label="Watch Hours" value="14.2K" delta="↑ +1.8K this week" accent />
                <StatCard label="CPM" value="$4.82" delta="↑ +$0.34" />
                <StatCard label="RPM" value="$1.59" delta="↑ +$0.12" />
                <StatCard label="Subscribers" value="142K" delta="↑ +3,241 this month" />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Daily Revenue — Last 14 Days</div>
                <BarChart data={[88, 112, 74, 130, 98, 118, 82, 144, 106, 122, 95, 128, 138, 152]} labels={chartLabels} />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Revenue Breakdown</div>
                <ProgressBar name="Ad Revenue (Display)" value="$2,140" pct={100} />
                <ProgressBar name="Ad Revenue (Overlay)" value="$750" pct={35} />
                <ProgressBar name="YouTube Premium" value="$612" pct={28} />
                <ProgressBar name="Super Chats / Stickers" value="$310" pct={14} />
              </div>
            </div>
          )}

          {/* Merch Earnings Panel */}
          {activePanel === "merch-earnings" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">Merch Sales</div>
                <div className="text-xs font-medium text-[hsl(var(--dash-text-4))]">Fourthwall — Revenue Overview</div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[rgba(255,255,255,0.10)] text-[hsl(var(--dash-text))]">● Synced</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <StatCard label="Monthly Revenue" value="$6,241" delta="↑ +14.2% MoM" accent />
                <StatCard label="Total Orders" value="184" delta="↑ +27 this week" accent />
                <StatCard label="Avg Order Value" value="$33.92" delta="↑ +$2.10 vs last mo" accent />
                <StatCard label="Returns" value="3" delta="1.6% return rate" negative />
                <StatCard label="New Customers" value="61%" delta="of all buyers" />
                <StatCard label="YTD Revenue" value="$18.4K" delta="On track ↑" />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Top Products</div>
                {[
                  { name: "Ceez & Ray Logo Tee", sold: "82 sold", rev: "$2,460" },
                  { name: "Black Hoodie", sold: "41 sold", rev: "$1,640" },
                  { name: "Creator Cap", sold: "37 sold", rev: "$925" },
                  { name: "Sticker Pack", sold: "24 sold", rev: "$216" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.09)] last:border-b-0">
                    <span className="text-sm font-semibold text-[hsl(var(--dash-text-2))]">{p.name}</span>
                    <span className="text-xs font-medium text-[hsl(var(--dash-text-4))]">{p.sold}</span>
                    <span className="text-[15px] font-extrabold">{p.rev}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  overflow-hidden shadow-lg flex-1">
                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-4 py-2.5 border-b border-[rgba(255,255,255,0.09)] text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] bg-[hsl(var(--dash-surface2))]">
                  <span>Customer</span><span>Product</span><span>Total</span><span>Status</span>
                </div>
                {[
                  { name: "Jordan M.", product: "Logo Tee / L", total: "$30.00", status: "Shipped" },
                  { name: "Kayla T.", product: "Black Hoodie / M", total: "$40.00", status: "Shipped" },
                  { name: "DeShawn R.", product: "Creator Cap", total: "$25.00", status: "Processing" },
                  { name: "Maria L.", product: "Sticker Pack", total: "$9.00", status: "Shipped" },
                  { name: "Tyler B.", product: "Logo Tee / XL", total: "$30.00", status: "Pending" },
                ].map((o, i) => (
                  <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-4 py-3 border-b border-[rgba(255,255,255,0.09)] last:border-b-0 text-sm font-medium text-[hsl(var(--dash-text-2))] hover:bg-[rgba(255,255,255,0.02)] transition-colors items-center">
                    <span>{o.name}</span>
                    <span>{o.product}</span>
                    <span>{o.total}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5  inline-block w-fit ${
                      o.status === "Shipped" ? "bg-[rgba(229,57,53,0.15)] text-[hsl(var(--dash-text))]" :
                      o.status === "Processing" ? "bg-[rgba(255,255,255,0.08)] text-[hsl(var(--dash-text-3))]" :
                      "bg-[rgba(255,159,10,0.12)] text-[hsl(var(--dash-amber))]"
                    }`}>{o.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Earnings Panel */}
          {activePanel === "other-earnings" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">Other Earnings</div>
                <div className="text-xs font-medium text-[hsl(var(--dash-text-4))]">Brand Deals, Endorsements & More</div>
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Log New Earning</div>
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <input value={earningDesc} onChange={e => setEarningDesc(e.target.value)} placeholder="Income description" className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))]" />
                  <input value={earningAmount} onChange={e => setEarningAmount(e.target.value)} placeholder="Amount ($)" className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))]" />
                  <input type="date" value={earningDate} onChange={e => setEarningDate(e.target.value)} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))]" />
                  <input value={earningProject} onChange={e => setEarningProject(e.target.value)} placeholder="Project details" className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))]" />
                </div>
                <button onClick={addOtherEarning} className="px-4 py-2.5 bg-[hsl(var(--dash-red))]  text-sm font-bold text-[hsl(var(--dash-text))] shadow-[0_2px_8px_hsl(var(--dash-red-glow))] hover:brightness-110">Submit</button>
              </div>
              {otherEarnings.length > 0 && (
                <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  overflow-hidden shadow-lg">
                  <div className="grid grid-cols-[2fr_1fr_1fr_2fr] px-4 py-2.5 border-b border-[rgba(255,255,255,0.09)] text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] bg-[hsl(var(--dash-surface2))]">
                    <span>Description</span><span>Amount</span><span>Date</span><span>Project</span>
                  </div>
                  {otherEarnings.map(e => (
                    <div key={e.id} className="grid grid-cols-[2fr_1fr_1fr_2fr] px-4 py-3 border-b border-[rgba(255,255,255,0.09)] last:border-b-0 text-sm font-medium text-[hsl(var(--dash-text-2))]">
                      <span>{e.description}</span><span className="font-bold">${e.amount}</span><span>{e.date}</span><span>{e.project}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-2">Examples</div>
                <div className="text-sm text-[hsl(var(--dash-text-3))] leading-relaxed">Brand deals • Endorsements • Product placement • Banner ads • Sponsorships • Consulting</div>
              </div>
            </div>
          )}

          {/* Traffic & Analytics Panel */}
          {activePanel === "traffic" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">Traffic & Analytics</div>
                <div className="text-xs font-medium text-[hsl(var(--dash-text-4))]">Google Analytics + YouTube Data</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <StatCard label="Website Sessions" value="18.2K" delta="↑ +12% MoM" accent />
                <StatCard label="Avg Session Duration" value="2:34" delta="↑ +0:18" />
                <StatCard label="Bounce Rate" value="42%" delta="↓ -3.2%" />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Top Traffic Regions</div>
                <ProgressBar name="United States" value="68%" pct={68} />
                <ProgressBar name="United Kingdom" value="12%" pct={12} />
                <ProgressBar name="Canada" value="8%" pct={8} />
                <ProgressBar name="Nigeria" value="5%" pct={5} />
                <ProgressBar name="Other" value="7%" pct={7} />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-3">Top Keywords</div>
                {["ceez and ray", "black picket fence show", "ai comedy series", "ceez ray bodega", "bpf entertainment"].map((kw, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.06)] last:border-b-0">
                    <span className="text-sm text-[hsl(var(--dash-text-2))]">{kw}</span>
                    <span className="text-xs text-[hsl(var(--dash-text-4))]">#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Panel */}
          {activePanel === "calendar" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight">Calendar</div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowCalendarFilter(!showCalendarFilter)}
                      className="flex items-center gap-1.5 px-3 py-1.5  border border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] text-xs font-semibold hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] transition-all"
                    >
                      <Filter size={13} /> Filter
                    </button>
                    {showCalendarFilter && (
                      <div className="absolute top-full right-0 mt-1 w-[180px] bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.18)]  p-2 shadow-2xl z-50">
                        {(["quantice", "jasmine", "staff"] as const).map(key => (
                          <button
                            key={key}
                            onClick={() => toggleCalendarFilter(key)}
                            className="flex items-center gap-2.5 w-full px-3 py-2  text-sm font-semibold hover:bg-[rgba(255,255,255,0.06)] transition-all"
                          >
                            <div className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all ${calendarFilter.has(key) ? "bg-white border-transparent" : "border-[rgba(255,255,255,0.3)]"}`}>
                              {calendarFilter.has(key) && <Check size={10} className="text-[hsl(var(--dash-bg))]" />}
                            </div>
                            <span>{assignLabels[key]}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5  border border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] text-xs font-semibold hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] hover:bg-[hsl(var(--dash-red-bg))] transition-all">
                    <Calendar size={13} /> Open Google Calendar
                  </a>
                </div>
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  overflow-hidden shadow-lg">
                {filteredCalendarEvents.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-[hsl(var(--dash-text-4))]">No events match the current filter.</div>
                )}
                {filteredCalendarEvents.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3.5 px-4 py-3 border-b border-[rgba(255,255,255,0.09)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className="w-[42px] text-center flex-shrink-0">
                      <div className="text-xl font-extrabold leading-none text-white">{ev.day}</div>
                      <div className="text-[9px] font-normal uppercase tracking-wider text-white">{ev.mo}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">{ev.title}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.5)] mt-0.5">{ev.detail}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5  whitespace-nowrap bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)]">{assignLabels[ev.assign]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Hub Panel */}
          {activePanel === "social" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div className="text-xl font-extrabold tracking-tight text-white">Social Hub</div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[rgba(255,255,255,0.06)] text-white">5 Platforms</div>
                <div className="text-[10px] font-medium text-[rgba(255,255,255,0.6)] ml-auto">Posts auto-clear every Sunday</div>
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-extrabold tracking-wider uppercase text-white mb-2.5">Broadcast</div>
                <textarea placeholder="Write once. Post everywhere." className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-white outline-none resize-none h-[70px] focus:border-[hsl(var(--dash-red))] placeholder:text-[rgba(255,255,255,0.4)]" />
                <div className="flex items-center gap-2 mt-2">
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border-[1.5px] border-[hsl(var(--dash-red))]  text-[hsl(var(--dash-red))] hover:bg-[hsl(var(--dash-red-bg))] transition-all">
                    <Image size={13} /> Photo
                  </button>
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border-[1.5px] border-[hsl(var(--dash-red))]  text-[hsl(var(--dash-red))] hover:bg-[hsl(var(--dash-red-bg))] transition-all">
                    <Video size={13} /> Video
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {["Instagram", "TikTok", "YouTube", "Facebook", "Threads"].map(p => (
                    <button key={p} className="text-[11px] font-semibold px-3 py-0.5 border-[1.5px] border-[rgba(255,255,255,0.25)]  text-white hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] hover:bg-[hsl(var(--dash-red-bg))] transition-all">{p}</button>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button className="text-[13px] font-semibold px-3.5 py-1.5 border-[1.5px] border-[rgba(255,255,255,0.25)]  text-white hover:border-white transition-all">Schedule</button>
                  <button className="text-[13px] font-bold px-4 py-1.5 bg-[hsl(var(--dash-red))]  text-white shadow-[0_2px_8px_hsl(var(--dash-red-glow))] hover:brightness-110 transition-all">Broadcast</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
                {[
                  { name: "Instagram", subs: "—", status: "Pending API" },
                  { name: "TikTok", subs: "—", status: "Pending API" },
                  { name: "YouTube", subs: "—", status: "Pending API" },
                ].map(p => (
                  <div key={p.name} className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  overflow-hidden shadow-lg flex flex-col">
                    <div className="px-3 py-2.5 border-b border-[rgba(255,255,255,0.09)] flex items-center justify-between bg-[hsl(var(--dash-surface2))]">
                      <span className="text-sm font-extrabold text-white">{p.name}</span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[rgba(255,255,255,0.6)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.3)]" />
                        {p.status}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4 text-center text-xs text-[rgba(255,255,255,0.5)]">
                      Connect {p.name} API to see your content
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Website Fixes Panel */}
          {activePanel === "fixes" && (
            <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(255,255,255,0.09)]">
                <div>
                  <div className="text-xl font-extrabold tracking-tight">Website Fixes</div>
                  <div className="text-xs font-medium text-[hsl(var(--dash-text-4))]">CeezandRay.com — Issue Tracker</div>
                </div>
                <div className="text-[11px] font-bold px-2.5 py-0.5  bg-[hsl(var(--dash-red-bg))] text-[hsl(var(--dash-red))]">{openCount} Open</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <StatCard label="Open Issues" value={String(openCount)} delta="Needs attention" negative />
                <StatCard label="In Progress" value={String(fixes.filter(f => f.status === "progress").length)} delta="Being worked on" />
                <StatCard label="Resolved" value={String(fixes.filter(f => f.status === "done").length)} delta="This month" />
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  p-4 shadow-lg">
                <div className="text-[11px] font-bold tracking-wider uppercase text-[hsl(var(--dash-text-4))] mb-2.5">Add New Issue</div>
                <div className="flex gap-2">
                  <input
                    value={fixInput}
                    onChange={e => setFixInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addFix()}
                    placeholder="Describe the website issue..."
                    className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[hsl(var(--dash-red))] placeholder:text-[hsl(var(--dash-text-4))]"
                  />
                  <select
                    value={fixPriority}
                    onChange={e => setFixPriority(e.target.value as Fix["priority"])}
                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)]  px-3 py-2.5 text-sm text-[hsl(var(--dash-text))] outline-none cursor-pointer"
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button onClick={addFix} className="px-4 py-2.5 bg-[hsl(var(--dash-red))]  text-sm font-bold text-[hsl(var(--dash-text))] shadow-[0_2px_8px_hsl(var(--dash-red-glow))] hover:brightness-110">Add</button>
                </div>
              </div>
              <div className="bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)]  overflow-hidden shadow-lg flex-1">
                {fixes.map(fix => (
                  <div key={fix.id} className="flex items-center gap-3.5 px-4 py-3 border-b border-[rgba(255,255,255,0.09)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      fix.priority === "high" ? "bg-[hsl(var(--dash-red))] shadow-[0_0_6px_hsl(var(--dash-red-glow))]" :
                      fix.priority === "med" ? "bg-[hsl(var(--dash-amber))]" : "bg-[rgba(128,128,128,0.5)]"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{fix.title}</div>
                      <div className="text-xs text-[hsl(var(--dash-text-4))] mt-0.5">{fix.desc}</div>
                    </div>
                    <span className="text-[11px] font-semibold text-[hsl(var(--dash-text-4))] whitespace-nowrap hidden md:block">{fix.page}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5  whitespace-nowrap ${
                      fix.status === "open" ? "bg-[hsl(var(--dash-red-bg))] text-[hsl(var(--dash-red))]" :
                      fix.status === "progress" ? "bg-[rgba(255,159,10,0.12)] text-[hsl(var(--dash-amber))]" :
                      "bg-[rgba(128,128,128,0.12)] text-[hsl(var(--dash-text-3))]"
                    }`}>{fix.status === "progress" ? "In Progress" : fix.status === "open" ? "Open" : "Done"}</span>
                    {fix.status !== "done" && (
                      <button
                        onClick={() => setFixes(prev => prev.map(f => f.id === fix.id ? { ...f, status: "done" } : f))}
                        className="text-[11px] font-semibold px-2 py-1 border border-[rgba(255,255,255,0.18)]  text-[hsl(var(--dash-text-3))] hover:border-[hsl(var(--dash-text-3))] hover:text-[hsl(var(--dash-text))] transition-all"
                      >Done</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - fixed (not scrollable) */}
        <div className="bg-[hsl(var(--sidebar-background))] border-l border-[rgba(255,255,255,0.09)] flex flex-col overflow-hidden">
          {/* Upload Content - red icon + red text */}
          <div className="p-3 pt-3">
            <a
              href="https://drive.google.com/drive/folders/1Rz3fzmttd4Ue59mHPL7V-mJUYS6FI7H-?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-full py-3  border-2 border-[hsl(var(--dash-red))] text-[hsl(var(--dash-red))] text-sm font-bold hover:bg-[hsl(var(--dash-red-bg))] hover:shadow-[0_0_0_3px_hsl(var(--dash-red-glow))] transition-all pl-4"
            >
              <Upload size={18} /> Upload Content
            </a>
          </div>

          {/* Storyboard - aligned with upload */}
          <div className="px-3 pb-2">
            <button
              onClick={() => navigate("/storyboard")}
              className="flex items-center gap-2.5 w-full py-3  border-2 border-[#2196f3] text-[#2196f3] text-sm font-bold hover:bg-[rgba(33,150,243,0.08)] transition-all pl-4"
            >
              <LayoutDashboard size={18} className="text-[#2196f3]" /> Storyboard
            </button>
          </div>

          {/* Email */}
          <div className="px-3.5 py-2.5 border-t border-[rgba(255,255,255,0.09)]">
            <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[hsl(var(--dash-text-4))] mb-2">Email</div>
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-3 py-2.5  border-[1.5px] border-[rgba(255,255,255,0.18)] bg-[hsl(var(--dash-surface))] text-sm font-bold text-[hsl(var(--dash-text-3))] hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-text))] transition-all shadow-lg">
              <span className="flex items-center gap-2"><Mail size={15} /> Open Gmail</span>
              <span className="text-[11px] font-bold bg-[hsl(var(--dash-red))] text-[hsl(var(--dash-text))] px-2 py-0.5 ">12</span>
            </a>
          </div>

          {/* Documents */}
          <div className="px-3.5 py-2.5 border-t border-[rgba(255,255,255,0.09)] flex-1 flex flex-col min-h-0">
            <div className="flex flex-col gap-1">
              {[
                { icon: <FileText size={16} />, name: "Legal Agreements", meta: "Contracts & IP docs", color: "bg-[rgba(229,57,53,0.15)] text-[hsl(var(--dash-red))]" },
                { icon: <Lock size={16} />, name: "Passwords", meta: "Shared credentials vault", color: "bg-[rgba(255,159,10,0.15)] text-[hsl(var(--dash-amber))]" },
                { icon: <Wrench size={16} />, name: "Website Fixes", meta: `${openCount} open issues`, color: "bg-[rgba(255,255,255,0.10)] text-white", onClick: () => setActivePanel("fixes"), badge: openCount },
              ].map((doc, i) => (
                <button
                  key={i}
                  onClick={doc.onClick}
                  className="flex items-center gap-2.5 px-2.5 py-2  border border-[rgba(255,255,255,0.09)] bg-[hsl(var(--dash-surface))] hover:border-[rgba(255,255,255,0.18)] hover:bg-[hsl(var(--dash-surface2))] transition-all text-left w-full"
                >
                  <div className={`w-[34px] h-[34px]  flex items-center justify-center flex-shrink-0 ${doc.color}`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold truncate">{doc.name}</div>
                    <div className="text-[11px] font-medium text-[hsl(var(--dash-text-4))] mt-0.5">{doc.meta}</div>
                  </div>
                  {"badge" in doc && doc.badge ? (
                    <span className="w-[17px] h-[17px]  text-[9px] font-extrabold flex items-center justify-center bg-[hsl(var(--dash-red))] text-white">{doc.badge}</span>
                  ) : (
                    <ChevronRight size={14} className="text-[hsl(var(--dash-text-4))] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools Drawer */}
      <div className={`fixed top-[52px] bottom-0 w-[280px] z-[99] bg-[hsl(var(--sidebar-background))] border-l border-[rgba(255,255,255,0.09)] shadow-[-8px_0_32px_rgba(0,0,0,0.45)] flex flex-col overflow-y-auto transition-all duration-300 ${toolsOpen ? "right-0" : "-right-[280px]"}`}>
        <div className="px-4 py-4 border-b border-[rgba(255,255,255,0.09)] text-[13px] font-extrabold tracking-wider uppercase flex items-center justify-between">
          <span>🛠 Tools</span>
          <button onClick={() => setToolsOpen(false)} className="w-7 h-7  border border-[rgba(255,255,255,0.18)] flex items-center justify-center text-[hsl(var(--dash-text-3))] hover:bg-[hsl(var(--dash-red-bg))] hover:border-[hsl(var(--dash-red))] hover:text-[hsl(var(--dash-red))] transition-all">
            <X size={14} />
          </button>
        </div>
        {[
          { label: "Video", links: [
            { name: "Higgsfield", url: "https://higgsfield.ai" },
            { name: "Veo", url: "https://deepmind.google/technologies/veo/" },
          ]},
          { label: "Audio", links: [
            { name: "ElevenLabs", url: "https://elevenlabs.io" },
            { name: "Rask (Dubbing)", url: "https://rask.ai" },
            { name: "Whisper (Transcribing)", url: "https://openai.com/research/whisper" },
            { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
            { name: "Suno (Music)", url: "https://suno.com" },
          ]},
          { label: "Scripting & Imaging", links: [
            { name: "ChatGPT", url: "https://chatgpt.com" },
            { name: "Manus", url: "https://manus.im" },
            { name: "Gemini", url: "https://gemini.google.com" },
            { name: "Claude", url: "https://claude.ai" },
            { name: "Ideogram", url: "https://ideogram.ai" },
          ]},
          { label: "Analytics & Monetization", links: [
            { name: "Google Analytics", url: "https://analytics.google.com" },
            { name: "YouTube Studio", url: "https://studio.youtube.com" },
            { name: "Fourthwall Dashboard", url: "https://dashboard.fourthwall.com" },
          ]},
        ].map((section, i) => (
          <div key={i} className="px-4 py-3 border-b border-[rgba(255,255,255,0.09)]">
            <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[hsl(var(--dash-text-4))] mb-2">{section.label}</div>
            {section.links.map((link, j) => (
              <a key={j} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-2.5 py-2  text-sm font-semibold text-[hsl(var(--dash-text-3))] hover:bg-[rgba(255,255,255,0.06)] hover:text-[hsl(var(--dash-text))] hover:translate-x-0.5 transition-all">
                <div className="w-[7px] h-[7px] rounded-full bg-[rgba(255,255,255,0.18)]" />
                {link.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
