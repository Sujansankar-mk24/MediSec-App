import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Quizzes from "./Pages/Quizzes";
import Scenarios from "./Pages/Scenarios";
import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Learn from "./Pages/Learn";
import QuickActions from "./Components/QuickActions";

export default function App() {
  return (
    <div style={{ backgroundColor: '#0fabc0', minHeight: '100vh', width: '100%' }}>
      
      {/* 🟥 FULL-WIDTH MAROON HEADER - No gaps, White Text */}
      <header 
        className="w-full shadow-2xl border-b-8 border-black/20 py-10"
        style={{ backgroundColor: '#890909' }} 
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          {/* MediSec - White */}
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
            MediSec
          </h1>
          
          {/* Subtitle - White */}
          <div className="bg-white/10 px-8 py-2 rounded-full mt-4 mb-10 border border-white/20">
            <p className="text-white font-black tracking-[0.5em] text-xs uppercase">Pages</p>
          </div>
          
          <QuickActions />
        </div>
      </header>

      {/* ⬜ CONTENT AREA */}
      <main className="w-full flex justify-center py-12 px-6">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}