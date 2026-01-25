export default function StreakTracker({ currentStreak, longestStreak, lastVisit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl mb-4">🔥</div>
      <h2 className="text-2xl font-black text-slate-800 uppercase italic">Active Streak</h2>
      <div className="text-5xl font-black text-[#0fabc0] my-4">{currentStreak} DAYS</div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personal Best: {longestStreak} Days</p>
    </div>
  );
}