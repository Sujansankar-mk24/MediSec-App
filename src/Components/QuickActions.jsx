import { useNavigate } from "react-router-dom";
import { Brain, Trophy, Settings, Home, ShieldAlert, LayoutDashboard } from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  const btnStyle = "flex flex-col items-center justify-center gap-2 bg-white/10 border-2 border-white/20 hover:bg-white text-white hover:text-[#890909] w-24 h-24 rounded-[30px] transition-all shadow-lg group";

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <button onClick={() => navigate("/")} className={btnStyle}>
        <Home size={28} />
        <span className="text-[10px] font-black uppercase">Home</span>
      </button>

      <button onClick={() => navigate("/dashboard")} className={btnStyle}>
        <LayoutDashboard size={28} />
        <span className="text-[10px] font-black uppercase">Dashboard</span>
      </button>

      <button onClick={() => navigate("/scenarios")} className={btnStyle}>
        <Brain size={28} />
        <span className="text-[10px] font-black uppercase">Scenarios</span>
      </button>

      <button onClick={() => navigate("/quizzes")} className={btnStyle}>
        <Trophy size={28} />
        <span className="text-[10px] font-black uppercase">Quizzes</span>
      </button>

      <button onClick={() => navigate("/settings")} className={btnStyle}>
        <Settings size={28} />
        <span className="text-[10px] font-black uppercase">Settings</span>
      </button>

      <button className="flex flex-col items-center justify-center gap-2 bg-white text-[#890909] hover:bg-red-100 w-24 h-24 rounded-[30px] shadow-2xl transition-transform active:scale-95">
        <ShieldAlert size={28} />
        <span className="text-[10px] font-black uppercase tracking-tighter">Report</span>
      </button>
    </div>
  );
}