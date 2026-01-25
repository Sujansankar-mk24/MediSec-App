import React, { useState } from 'react';
import { Trophy, CheckCircle2, XCircle } from "lucide-react";

const SCENARIO_DATA = [
  { id: 1, title: "Unlocked Station", situation: "Nurse leaves a terminal logged in at the desk. A visitor is nearby.", options: [{text: "Lock it (Win+L)", correct: true}, {text: "Call nurse loudly", correct: false}], explanation: "Locking is the fastest way to secure data." },
  { id: 2, title: "Phishing Call", situation: "IT calls asking for your password to fix a 'server crash'.", options: [{text: "Give password", correct: false}, {text: "Hang up & call official IT", correct: true}], explanation: "Official IT never asks for passwords." },
  { id: 3, title: "Tailgating", situation: "Someone without a badge follows you into a restricted med-room.", options: [{text: "Let them in", correct: false}, {text: "Ask to see badge", correct: true}], explanation: "Unauthorized entry is a major physical breach." },
  { id: 4, title: "Lost Laptop", situation: "You find a company laptop in the cafeteria unattended.", options: [{text: "Take it to IT", correct: true}, {text: "Leave it there", correct: false}], explanation: "Unsecured hardware must be reported." },
  { id: 5, title: "Social Media", situation: "A coworker posts a photo of a 'funny' patient chart (no names visible).", options: [{text: "Like the post", correct: false}, {text: "Report to Privacy Officer", correct: true}], explanation: "Charts are PHI even without a name." },
  { id: 6, title: "Printed Records", situation: "The printer has a stack of patient records left in the tray.", options: [{text: "Shred them", correct: true}, {text: "Put them in a folder", correct: false}], explanation: "Abandoned PHI should be secured or destroyed." },
  { id: 7, title: "Email Error", situation: "You accidentally sent a patient file to the wrong 'John Smith'.", options: [{text: "Ignore it", correct: false}, {text: "Notify Supervisor", correct: true}], explanation: "Self-reporting is mandatory for breaches." },
  { id: 8, title: "Guest Wi-Fi", situation: "You want to check work emails on the hospital's Public Guest Wi-Fi.", options: [{text: "Go ahead", correct: false}, {text: "Use Secure VPN only", correct: true}], explanation: "Public Wi-Fi is easily intercepted." },
  { id: 9, title: "Badge Sharing", situation: "A doctor forgot their badge and asks to use yours for 'just one second'.", options: [{text: "Lend it", correct: false}, {text: "Politely refuse", correct: true}], explanation: "Badges track your specific actions." },
  { id: 10, title: "Suspicious USB", situation: "You find a USB drive labeled 'Staff Salaries' in the breakroom.", options: [{text: "Plug it in", correct: false}, {text: "Hand to Security", correct: true}], explanation: "This is a classic 'Baiting' attack technique." }
];

export default function Scenarios() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const current = SCENARIO_DATA[index];

  const handleSelect = (i, isCorrect) => {
    if (selected !== null) return;
    setSelected(i);
    if (isCorrect) setScore(s => s + 100);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8">
      {/* SCORECARD */}
      <div className="bg-white p-6 rounded-[30px] shadow-2xl flex justify-between items-center w-full max-w-md border-b-8 border-amber-400">
        <Trophy className="text-amber-500" size={32} />
        <span className="text-4xl font-black text-[#0fabc0]">{score} XP</span>
      </div>

      {/* SIMULATION BOX */}
      <div className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-4xl text-center border-b-[12px] border-slate-100">
        <h2 className="text-3xl font-black uppercase italic mb-6 text-[#890909]">{current.title}</h2>
        <div className="bg-slate-50 p-8 rounded-[35px] mb-10 border-2 border-slate-100 italic text-xl text-slate-700 font-bold leading-relaxed">
          "{current.situation}"
        </div>
        <div className="grid gap-4 w-full">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i, opt.correct)}
              className={`p-6 rounded-[25px] border-4 text-center font-black text-xl transition-all flex justify-center items-center gap-4 ${
                selected === null ? "bg-white border-slate-100 hover:border-[#0fabc0] hover:bg-slate-50" :
                opt.correct ? "bg-emerald-500 border-emerald-600 text-white shadow-lg" :
                selected === i ? "bg-rose-500 border-rose-600 text-white shadow-lg" : "bg-slate-50 border-transparent opacity-30"
              }`}
            >
              {opt.text}
              {selected !== null && opt.correct && <CheckCircle2 size={24} />}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-10 p-8 bg-slate-900 rounded-[35px] text-white">
             <p className="font-bold mb-8 text-slate-300 text-lg">{current.explanation}</p>
             <button onClick={() => { setIndex((index + 1) % SCENARIO_DATA.length); setSelected(null); }} className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase hover:bg-[#0fabc0] hover:text-white transition-all shadow-xl">
               Next Simulation
             </button>
          </div>
        )}
      </div>
    </div>
  );
}