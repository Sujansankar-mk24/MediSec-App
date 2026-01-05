import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function StreakTracker({ currentStreak, longestStreak, lastVisit }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#890909] to-[#890909]/70 rounded-2xl p-5 text-white shadow-xl shadow-[#890909]/30 border-2 border-[#890909]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <p className="text-white/80 text-sm">Current Streak</p>
            <p className="text-3xl font-bold">{currentStreak} days</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <Trophy className="w-4 h-4" />
            <span>Best: {longestStreak}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5">
            <span className="text-xs text-white/70">{day}</span>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
              idx === today 
                ? "bg-white text-orange-500 ring-2 ring-white/50" 
                : idx < today 
                  ? "bg-white/30 text-white" 
                  : "bg-white/10 text-white/40"
            )}>
              {idx <= today ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}