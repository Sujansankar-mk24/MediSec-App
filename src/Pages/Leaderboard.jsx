import QuickActions from "../Components/QuickActions";
import DailyBreachCard from "../Components/DailyBreachCard";
import StreakTracker from "../Components/StreakTracker";
import breach from "../data/dailyBreach";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* QUICK ACTIONS BOX */}
        <div className="bg-white p-6 rounded-[32px] shadow-2xl">
          <QuickActions />
        </div>

        {/* DAILY INTEL BOX */}
        <div className="bg-white p-10 rounded-[45px] shadow-2xl">
          <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100 inline-block">
             <h2 className="text-sm font-black text-[#0fabc0] uppercase tracking-widest">Latest Intelligence Brief</h2>
          </div>
          <DailyBreachCard breach={breach} />
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[35px] shadow-2xl">
          <StreakTracker />
        </div>

        <div className="bg-white p-8 rounded-[35px] shadow-2xl">
          <div className="bg-cyan-50 text-[#0fabc0] px-4 py-1 rounded-lg text-xs font-bold w-fit mb-4 uppercase">Security Tip</div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-slate-600 font-medium leading-relaxed italic">
              "Check every email sender address. If it looks fishy, report it immediately."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}