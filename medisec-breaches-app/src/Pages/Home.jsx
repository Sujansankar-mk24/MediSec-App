import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '../Components/ui/badge';
import { Star, Settings } from 'lucide-react';
import OnboardingFlow from '../Components/onboarding/OnboardingFlow';
import StreakTracker from '../Components/dashboard/StreakTracker';
import DailyBreachCard from '../Components/dashboard/DailyBreachCard';
import QuickActions from '../Components/dashboard/QuickActions';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '../api/base44Client';

export default function Home() {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        console.log('Not logged in');
      }
    };
    loadUser();
  }, []);

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const profiles = await base44.entities.UserProfile.filter({ user_email: user.email });
      return profiles[0] || null;
    },
    enabled: !!user?.email
  });

  const { data: dailyBreaches } = useQuery({
    queryKey: ['dailyBreaches'],
    queryFn: () => base44.entities.DailyBreach.list('-date', 5),
    initialData: []
  });

  const createProfileMutation = useMutation({
    mutationFn: (data) => base44.entities.UserProfile.create({
      ...data,
      user_email: user.email,
      onboarding_completed: true,
      current_streak: 1,
      longest_streak: 1,
      last_visit_date: new Date().toISOString().split('T')[0],
      total_points: 0,
      completed_scenarios: [],
      completed_quizzes: [],
      badges: []
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }
  });

  const handleOnboardingComplete = (formData) => {
    createProfileMutation.mutate(formData);
  };

  if (user && !profileLoading && !userProfile) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const featuredBreach = dailyBreaches[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-[#0fabc0]/10 via-white/80 to-[#890909]/10 border-b border-[#0fabc0]/30">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951bfb0e3605dc6b839d842/709e9af07_Screenshot2025-12-28at110937PM.png"
              alt="MediSec Logo"
              className="w-12 h-12 rounded-xl object-cover shadow-lg"
            />
            <div>
              <h1 className="font-bold text-slate-900">MediSec</h1>
              <p className="text-xs text-slate-500">Healthcare Security</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {userProfile && (
              <Badge className="bg-[#0fabc0] text-white font-semibold shadow-md">
                <Star className="w-3 h-3 mr-1" />
                {userProfile.total_points || 0} pts
              </Badge>
            )}
            <Link to={createPageUrl('Settings')}>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {user ? `Welcome back, ${user.full_name?.split(' ')[0] || 'Guardian'}!` : 'Welcome to MediSec'}
          </h2>
          <p className="text-slate-500">
            {user ? 'Continue your cybersecurity journey' : 'Learn about healthcare data security'}
          </p>
        </motion.div>

        {userProfile && (
          <StreakTracker 
            currentStreak={userProfile.current_streak || 0}
            longestStreak={userProfile.longest_streak || 0}
            lastVisit={userProfile.last_visit_date}
          />
        )}

        {featuredBreach && (
          <DailyBreachCard 
            breach={featuredBreach}
            onLearnMore={(breach) => {
              window.location.href = createPageUrl('BreachDetails') + `?id=${breach.id}`;
            }}
          />
        )}

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
          <QuickActions />
        </div>
      </main>
    </div>
  );
}
