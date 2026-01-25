import React from 'react';
import { User, ShieldCheck, Bell } from 'lucide-react';

export default function Settings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* SUBJECT 1: USER PROFILE */}
      <div className="bg-white p-10 rounded-[45px] shadow-2xl">
        <div className="flex items-center gap-6 mb-8 border-b pb-6">
          <div className="bg-[#0fabc0] p-4 rounded-full text-white shadow-lg">
            <User size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase italic">Your Profile</h3>
            <p className="text-slate-400 font-bold text-xs uppercase">Level 12 Security Agent</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Employee ID: <span className="text-slate-900">MS-9942</span></p>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Department: <span className="text-slate-900">Informatics</span></p>
        </div>
      </div>

      {/* SUBJECT 2: PREFERENCES */}
      <div className="bg-white p-10 rounded-[45px] shadow-2xl">
        <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-8">System Preferences</h3>
        
        <div className="space-y-4">
           <div className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center border border-slate-100">
             <span className="font-black text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2"><Bell size={16}/> Email Alerts</span>
             <div className="w-12 h-6 bg-[#0fabc0] rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
           </div>
           
           <div className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center border border-slate-100">
             <span className="font-black text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2"><ShieldCheck size={16}/> Bio-Login</span>
             <div className="w-12 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
           </div>
        </div>
      </div>

    </div>
  );
}