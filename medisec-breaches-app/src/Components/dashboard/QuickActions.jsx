import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { 
  Gamepad2, BookOpen, ClipboardCheck, Trophy, 
  ChevronRight 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const actions = [
  {
    id: 'scenario',
    title: 'Play Scenario',
    desc: 'Make critical decisions',
    icon: Gamepad2,
    color: 'from-[#890909] to-[#890909]/80',
    page: 'Scenarios'
  },
  {
    id: 'learn',
    title: 'Learn',
    desc: 'Breach types & prevention',
    icon: BookOpen,
    color: 'from-[#0fabc0] to-[#9ad7f7]',
    page: 'Learn'
  },
  {
    id: 'quiz',
    title: 'Take Quiz',
    desc: 'Test your knowledge',
    icon: ClipboardCheck,
    color: 'from-[#0fabc0] to-[#9ad7f7]',
    page: 'Quizzes'
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    desc: 'See top performers',
    icon: Trophy,
    color: 'from-[#0fabc0] to-[#0fabc0]/70',
    page: 'Leaderboard'
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, idx) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link to={createPageUrl(action.page)}>
            <div className={cn(
              "relative overflow-hidden rounded-xl p-4 bg-gradient-to-br text-white cursor-pointer group shadow-lg transition-all hover:shadow-xl",
              action.color
            )}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform" />
              <action.icon className="w-8 h-8 mb-3" />
              <p className="font-semibold">{action.title}</p>
              <p className="text-xs text-white/80">{action.desc}</p>
              <ChevronRight className="absolute bottom-4 right-4 w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}