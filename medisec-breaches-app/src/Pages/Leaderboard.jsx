import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, ChevronLeft, Medal, Crown, Star,
  Flame, Target, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const allProfiles = await base44.entities.UserProfile.list('-total_points', 50);
      return allProfiles.filter(p => p.total_points > 0);
    },
    initialData: []
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: []
  });

  const getUserName = (email) => {
    const found = users.find(u => u.email === email);
    return found?.full_name || email?.split('@')[0] || 'Anonymous';
  };

  const getUserInitials = (email) => {
    const name = getUserName(email);
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const currentUserRank = profiles.findIndex(p => p.user_email === user?.email) + 1;

  const topThree = profiles.slice(0, 3);
  const restOfList = profiles.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <button className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-white">Leaderboard</h1>
              <p className="text-xs text-slate-400">Top cybersecurity guardians</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hall of Fame</h2>
          <p className="text-slate-400">Compete with fellow guardians</p>
        </motion.div>

        {/* Top 3 Podium */}
        {topThree.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end justify-center gap-4 mb-8"
          >
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 font-bold text-lg mb-2">
                {getUserInitials(topThree[1]?.user_email)}
              </div>
              <p className="text-sm text-white font-medium truncate max-w-[80px]">
                {getUserName(topThree[1]?.user_email)}
              </p>
              <p className="text-xs text-amber-400">{topThree[1]?.total_points} pts</p>
              <div className="w-20 h-16 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-lg mt-2 flex items-center justify-center">
                <Medal className="w-8 h-8 text-slate-300" />
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Crown className="w-8 h-8 text-amber-400 mb-1" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-xl mb-2 ring-4 ring-amber-400/30">
                {getUserInitials(topThree[0]?.user_email)}
              </div>
              <p className="text-sm text-white font-medium truncate max-w-[80px]">
                {getUserName(topThree[0]?.user_email)}
              </p>
              <p className="text-xs text-amber-400">{topThree[0]?.total_points} pts</p>
              <div className="w-20 h-24 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg mt-2 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-200" />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-amber-100 font-bold text-lg mb-2">
                {getUserInitials(topThree[2]?.user_email)}
              </div>
              <p className="text-sm text-white font-medium truncate max-w-[80px]">
                {getUserName(topThree[2]?.user_email)}
              </p>
              <p className="text-xs text-amber-400">{topThree[2]?.total_points} pts</p>
              <div className="w-20 h-12 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-lg mt-2 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Your Rank */}
        {currentUserRank > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {getUserInitials(user?.email)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Your Ranking</p>
                  <p className="text-sm text-slate-400">Keep learning to climb!</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">#{currentUserRank}</p>
                  <p className="text-xs text-slate-400">
                    {profiles.find(p => p.user_email === user?.email)?.total_points || 0} pts
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Rest of Leaderboard */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading...</div>
          ) : restOfList.length === 0 && topThree.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No rankings yet</p>
              <p className="text-sm">Be the first to earn points!</p>
            </div>
          ) : (
            restOfList.map((profile, idx) => {
              const rank = idx + 4;
              const isCurrentUser = profile.user_email === user?.email;
              
              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={cn(
                    "p-4",
                    isCurrentUser 
                      ? "bg-[#0fabc0]/10 border-[#0fabc0]/30" 
                      : "bg-slate-800/50 border-slate-700/50"
                  )}>
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center text-slate-400 font-medium">
                        {rank}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-medium">
                        {getUserInitials(profile.user_email)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-medium truncate",
                          isCurrentUser ? "text-[#0fabc0]" : "text-white"
                        )}>
                          {getUserName(profile.user_email)}
                          {isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            {profile.current_streak || 0} streak
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {profile.completed_quizzes?.length || 0} quizzes
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-400">{profile.total_points}</p>
                        <p className="text-xs text-slate-500">points</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}