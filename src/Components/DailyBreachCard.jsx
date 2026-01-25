import React from 'react';

export default function DailyBreachCard({ breach }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-slate-900 leading-tight">{breach.title}</h2>
      <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100">
        <p className="text-slate-600 leading-relaxed text-lg font-medium">{breach.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white border-2 border-slate-50 p-5 rounded-2xl text-center">
           <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Impact</p>
           <p className="text-xl font-black text-[#0fabc0]">{breach.records_affected} Records</p>
         </div>
         <div className="bg-white border-2 border-slate-50 p-5 rounded-2xl text-center">
           <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Threat Level</p>
           <p className="text-xl font-black text-rose-600">CRITICAL</p>
         </div>
      </div>
    </div>
  );
}