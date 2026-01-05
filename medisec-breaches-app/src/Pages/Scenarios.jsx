import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Gamepad2, ChevronLeft, ChevronRight, Clock, 
  Trophy, Lock, Star, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ScenarioGame from '@/components/scenarios/ScenarioGame';
import { cn } from "@/lib/utils";

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-rose-100 text-rose-700'
};

const categoryColors = {
  phishing: 'from-[#890909] to-[#890909]/80',
  ransomware: 'from-[#890909] to-[#890909]/80',
  insider_threat: 'from-[#0fabc0] to-[#9ad7f7]',
  physical: 'from-[#0fabc0] to-[#9ad7f7]',
  third_party: 'from-[#0fabc0] to-[#9ad7f7]',
  social_engineering: 'from-[#890909] to-[#890909]/80'
};

export default function Scenarios() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: scenarios, isLoading } = useQuery({
    queryKey: ['scenarios'],
    queryFn: () => base44.entities.Scenario.list(),
    initialData: []
  });

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const profiles = await base44.entities.UserProfile.filter({ user_email: user.email });
      return profiles[0] || null;
    },
    enabled: !!user?.email
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.UserProfile.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }
  });

  const handleScenarioComplete = (result) => {
    if (userProfile && selectedScenario) {
      const completedScenarios = [...(userProfile.completed_scenarios || [])];
      if (!completedScenarios.includes(selectedScenario.id)) {
        completedScenarios.push(selectedScenario.id);
      }
      
      updateProfileMutation.mutate({
        id: userProfile.id,
        data: {
          completed_scenarios: completedScenarios,
          total_points: (userProfile.total_points || 0) + result.score
        }
      });
    }
    setSelectedScenario(null);
  };

  const filteredScenarios = scenarios.filter(s => 
    activeFilter === 'all' || s.category === activeFilter
  );

  const categories = ['all', ...new Set(scenarios.map(s => s.category))];

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedScenario(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Scenarios</span>
          </button>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-6">{selectedScenario.title}</h1>
          
          <ScenarioGame 
            scenario={selectedScenario}
            onComplete={handleScenarioComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-[#890909]/10 via-white/80 to-[#0fabc0]/10 border-b border-[#890909]/30">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-slate-900">Interactive Scenarios</h1>
              <p className="text-xs text-slate-500">Make critical decisions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#890909] to-[#890909]/80 rounded-2xl p-5 text-white"
        >
          <Gamepad2 className="w-10 h-10 mb-3" />
          <h2 className="text-xl font-bold mb-2">Cyber Scenario Challenge</h2>
          <p className="text-white/90 text-sm">
            You're placed in real healthcare cybersecurity situations. 
            Make choices and see the consequences unfold!
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeFilter === cat
                  ? "bg-[#0fabc0] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              {cat === 'all' ? 'All' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Scenarios List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">Loading scenarios...</div>
          ) : filteredScenarios.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No scenarios available yet</div>
          ) : (
            filteredScenarios.map((scenario, idx) => {
              const isCompleted = userProfile?.completed_scenarios?.includes(scenario.id);
              
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#890909]/30"
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className={cn(
                      "h-2 bg-gradient-to-r",
                      categoryColors[scenario.category] || 'from-slate-400 to-slate-500'
                    )} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{scenario.title}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2">{scenario.description}</p>
                        </div>
                        {isCompleted && (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 ml-3">
                            <Trophy className="w-4 h-4 text-emerald-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className={difficultyColors[scenario.difficulty]}>
                            {scenario.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {scenario.category?.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Star className="w-4 h-4 text-amber-500" />
                          {scenario.points_possible || 100} pts
                        </div>
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