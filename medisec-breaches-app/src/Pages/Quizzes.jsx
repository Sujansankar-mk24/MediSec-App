import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, ChevronLeft, Clock, 
  HelpCircle, Trophy, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import QuizPlayer from '@/components/quiz/QuizPlayer';
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
  misconfiguration: 'from-[#0fabc0] to-[#9ad7f7]',
  social_engineering: 'from-[#890909] to-[#890909]/80',
  general: 'from-slate-500 to-slate-600'
};

export default function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
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

  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => base44.entities.Quiz.list(),
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

  const { data: quizResults } = useQuery({
    queryKey: ['quizResults', user?.email],
    queryFn: () => base44.entities.QuizResult.filter({ user_email: user.email }),
    enabled: !!user?.email,
    initialData: []
  });

  const createResultMutation = useMutation({
    mutationFn: (data) => base44.entities.QuizResult.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizResults'] });
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.UserProfile.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }
  });

  const handleQuizComplete = async (result) => {
    if (user && selectedQuiz) {
      await createResultMutation.mutateAsync({
        user_email: user.email,
        quiz_id: selectedQuiz.id,
        score: result.score,
        total_possible: result.total_possible,
        percentage: result.percentage,
        passed: result.passed,
        time_taken_seconds: result.time_taken_seconds,
        answers: result.answers
      });

      if (userProfile) {
        const completedQuizzes = [...(userProfile.completed_quizzes || [])];
        if (!completedQuizzes.includes(selectedQuiz.id)) {
          completedQuizzes.push(selectedQuiz.id);
        }
        
        await updateProfileMutation.mutateAsync({
          id: userProfile.id,
          data: {
            completed_quizzes: completedQuizzes,
            total_points: (userProfile.total_points || 0) + result.score
          }
        });
      }
    }
    setSelectedQuiz(null);
  };

  const filteredQuizzes = quizzes.filter(q => 
    activeFilter === 'all' || q.difficulty === activeFilter
  );

  const getQuizBestScore = (quizId) => {
    const results = quizResults.filter(r => r.quiz_id === quizId);
    if (results.length === 0) return null;
    return Math.max(...results.map(r => r.percentage));
  };

  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Quizzes</span>
          </button>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-6">{selectedQuiz.title}</h1>
          
          <QuizPlayer 
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-[#0fabc0]/10 via-white/80 to-[#9ad7f7]/10 border-b border-[#0fabc0]/30">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-slate-900">Knowledge Quizzes</h1>
              <p className="text-xs text-slate-500">Test your cybersecurity knowledge</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0fabc0] to-[#9ad7f7] rounded-2xl p-5 text-slate-900"
        >
          <ClipboardCheck className="w-10 h-10 mb-3 text-slate-900" />
          <h2 className="text-xl font-bold mb-2 text-slate-900">Quiz Challenge</h2>
          <p className="text-slate-800 text-sm">
            Test your knowledge on healthcare cybersecurity topics and earn points!
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          {['all', 'easy', 'medium', 'hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveFilter(diff)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === diff
                  ? "bg-[#0fabc0] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>

        {/* Quizzes List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">Loading quizzes...</div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No quizzes available yet</div>
          ) : (
            filteredQuizzes.map((quiz, idx) => {
              const bestScore = getQuizBestScore(quiz.id);
              const isCompleted = bestScore !== null;
              
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#0fabc0]/30"
                    onClick={() => setSelectedQuiz(quiz)}
                  >
                    <div className={cn(
                      "h-2 bg-gradient-to-r",
                      categoryColors[quiz.category] || 'from-slate-400 to-slate-500'
                    )} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{quiz.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <HelpCircle className="w-4 h-4" />
                              {quiz.questions?.length || 0} questions
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {quiz.time_limit_minutes || 10} min
                            </span>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="flex flex-col items-center">
                            <Trophy className={cn(
                              "w-5 h-5",
                              bestScore >= quiz.passing_score ? "text-emerald-500" : "text-amber-500"
                            )} />
                            <span className="text-xs text-slate-500">{bestScore}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className={difficultyColors[quiz.difficulty]}>
                            {quiz.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {quiz.category?.replace('_', ' ')}
                          </Badge>
                        </div>
                        <span className="text-sm text-slate-500">
                          Pass: {quiz.passing_score || 70}%
                        </span>
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