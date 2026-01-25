import React from 'react';
import DailyBreachCard from "../Components/DailyBreachCard";
import StreakTracker from "../Components/StreakTracker";
import breach from "../data/dailyBreach";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center w-full space-y-12">
      <div className="bg-white p-10 rounded-[50px] shadow-2xl w-full max-w-4xl text-center border-b-[12px] border-slate-100">
        <div className="bg-slate-100 px-6 py-2 rounded-2xl mb-8 inline-block">
           <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Live Intelligence Feed</h2>
        </div>
        <DailyBreachCard breach={breach} />
      </div>

      <div className="bg-white p-10 rounded-[50px] shadow-2xl w-full max-w-2xl text-center border-b-[12px] border-slate-100">
        <StreakTracker currentStreak={5} longestStreak={12} lastVisit="Today" />
      </div>
    </div>
  );
}