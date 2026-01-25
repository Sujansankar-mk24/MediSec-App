import React from 'react';
import { useNavigate } from "react-router-dom";
import { Brain, Trophy } from "lucide-react";

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter text-center">
        Choose Your Path
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Massive Card-style Buttons */}
        <button 
          onClick={() => navigate("/scenarios")}
          className="bg-white p-16 rounded-[60px] shadow-2xl hover:scale-105 transition-all group border-b-[16px] border-slate-200"
        >
          <Brain size={80} className="mx-auto mb-8 text-[#0fabc0]" />
          <h3 className="text-4xl font-black uppercase italic mb-3 text-slate-800">Start Scenarios</h3>
          <p className="text-slate-500 font-bold uppercase text-sm tracking-[0.3em]">Simulation Mode</p>
        </button>

        <button 
          onClick={() => navigate("/quizzes")}
          className="bg-white p-16 rounded-[60px] shadow-2xl hover:scale-105 transition-all group border-b-[16px] border-slate-200"
        >
          <Trophy size={80} className="mx-auto mb-8 text-amber-500" />
          <h3 className="text-4xl font-black uppercase italic mb-3 text-slate-800">Take a Quiz!</h3>
          <p className="text-slate-500 font-bold uppercase text-sm tracking-[0.3em]">Knowledge Test</p>
        </button>
      </div>
    </div>
  );
}