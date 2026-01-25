import React, { useState } from 'react';
import { Trophy, Play, ArrowLeft, Star, Clock, RotateCcw } from 'lucide-react';

const QUIZ_LIST = [
  {
    id: 1,
    difficulty: "Easy",
    title: "Privacy Basics",
    questions: [
      { q: "What is PHI?", a: ["Private Health Info", "Protected Health Info", "Personal Health Intel"], c: 1 },
      { q: "Is a patient's birth date considered PHI?", a: ["Yes", "No", "Only if they are over 18"], c: 0 },
      { q: "Can you share your login password with an IT staffer?", a: ["Yes", "No, never", "Only in emergencies"], c: 1 },
      { q: "Who is responsible for HIPAA compliance?", a: ["Every employee", "Only Doctors", "Only IT"], c: 0 },
      { q: "What does the 'P' in HIPAA stand for?", a: ["Privacy", "Portability", "Protection"], c: 1 },
      { q: "Access your records via work system?", a: ["Yes", "No, use patient portal", "Only if you are a doctor"], c: 1 },
      { q: "Is an IP address PHI?", a: ["Yes", "No", "Only for celebrities"], c: 0 },
      { q: "Shredding paper records is:", a: ["Optional", "Highly Recommended", "Legally Required"], c: 2 },
      { q: "A 'Strong Password' should contain:", a: ["8+ mixed characters", "Just your name", "Numbers only"], c: 0 },
      { q: "Reporting a lost work phone should happen:", a: ["Next week", "Immediately", "After 24 hours"], c: 1 }
    ]
  },
  {
    id: 2,
    difficulty: "Medium",
    title: "Network Defense",
    questions: [
      { q: "What is 'Tailgating' in security?", a: ["Driving fast", "Following someone into a secure area", "Email spam"], c: 1 },
      { q: "A 'Phishing' email usually asks for:", a: ["Feedback", "Urgent action/credentials", "A meeting"], c: 1 },
      { q: "VPN stands for:", a: ["Virtual Private Network", "Verify Password Now", "Valid Port Node"], c: 0 },
      { q: "Where should you store sensitive files?", a: ["Local Desktop", "Encrypted Cloud/Server", "USB Drive"], c: 1 },
      { q: "What is MFA?", a: ["Multi-Factor Auth", "Medical File Access", "Main Frame Admin"], c: 0 },
      { q: "Public Wi-Fi is safe if you use a password.", a: ["True", "False", "Only in hospitals"], c: 1 },
      { q: "Which is a 'Social Engineering' tactic?", a: ["Pretexting", "Firewalls", "Antivirus"], c: 0 },
      { q: "Ransomware usually enters via:", a: ["Power surges", "Malicious attachments", "Bad monitors"], c: 1 },
      { q: "Locking your screen (Win+L) is for:", a: ["Lunch breaks", "Any time you leave", "End of shift"], c: 1 },
      { q: "A 'Firewall' is for:", a: ["Putting out fires", "Filtering network traffic", "Cleaning hardware"], c: 1 }
    ]
  },
  {
    id: 3,
    difficulty: "Hard",
    title: "Incident Response",
    questions: [
      { q: "What is the 'Minimum Necessary' rule?", a: ["Lowering pay", "Accessing only data needed for a task", "Short shifts"], c: 1 },
      { q: "A 'Zero-Day' exploit is:", a: ["Old news", "A newly discovered, unpatched hole", "A 24-hour virus"], c: 1 },
      { q: "What is 'Spear Phishing'?", a: ["Targeted phishing", "Fishing for sport", "Random spam"], c: 0 },
      { q: "The 'Security Rule' protects what?", a: ["Paper PHI", "Electronic PHI (ePHI)", "All hospital staff"], c: 1 },
      { q: "An 'Insider Threat' is always malicious.", a: ["True", "False (can be accidental)", "Only in movies"], c: 1 },
      { q: "Encryption turns data into:", a: ["Clear text", "Ciphertext", "Images"], c: 1 },
      { q: "A 'Brute Force' attack targets:", a: ["Physical doors", "Passwords", "Database servers"], c: 1 },
      { q: "What is 'De-identification'?", a: ["Losing your ID", "Removing identifiers from data", "Changing names"], c: 1 },
      { q: "Business Associates (BAs) must follow HIPAA.", a: ["Yes", "No", "Only if they want to"], c: 0 },
      { q: "What is a 'Honey Pot'?", a: ["Breakroom snack", "Decoy system to trap hackers", "A type of virus"], c: 1 }
    ]
  }
];

export default function Quizzes() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selectedIdx) => {
    if (selectedIdx === activeQuiz.questions[index].c) setScore(prev => prev + 1);
    if (index + 1 < activeQuiz.questions.length) setIndex(index + 1);
    else setShowResults(true);
  };

  const reset = () => { setActiveQuiz(null); setIndex(0); setScore(0); setShowResults(false); };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-2xl text-center border-b-[12px] border-amber-400">
          <Trophy size={80} className="mx-auto text-amber-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase italic mb-2">Results</h2>
          <div className="bg-slate-50 rounded-[35px] p-10 my-8 w-full">
            <span className="text-8xl font-black text-[#0fabc0]">{score}</span>
            <span className="text-4xl font-black text-slate-300"> / 10</span>
          </div>
          <button onClick={reset} className="w-full py-6 bg-[#890909] text-white rounded-3xl font-black uppercase flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
            <RotateCcw size={24} /> Try Another
          </button>
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const current = activeQuiz.questions[index];
    return (
      <div className="flex flex-col items-center w-full">
        <div className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-4xl border-b-[12px] border-[#0fabc0]">
          <div className="flex justify-between items-center mb-10">
            <button onClick={reset} className="text-slate-400 hover:text-[#890909]"><ArrowLeft/></button>
            <span className="font-black text-xs text-slate-400 uppercase tracking-widest">Question {index + 1} of 10</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-10 text-center">"{current.q}"</h2>
          <div className="grid gap-4">
            {current.a.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} className="p-6 rounded-3xl border-4 border-slate-100 hover:border-[#0fabc0] hover:bg-slate-50 font-bold text-xl text-slate-700 transition-all text-center">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
         {QUIZ_LIST.map(quiz => (
           <div key={quiz.id} className="bg-white p-10 rounded-[50px] shadow-2xl text-center border-b-[12px] border-slate-200 flex flex-col justify-between min-h-[400px]">
              <div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block ${
                  quiz.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-600' : 
                  quiz.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>{quiz.difficulty}</span>
                <h2 className="text-3xl font-black text-slate-800 uppercase italic mb-8">{quiz.title}</h2>
              </div>
              <button onClick={() => setActiveQuiz(quiz)} className="w-full py-5 bg-[#0fabc0] text-white rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-[#890909] transition-all">
                <Play size={20}/> Start Quiz
              </button>
           </div>
         ))}
       </div>
    </div>
  );
}