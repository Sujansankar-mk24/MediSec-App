import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon, ChevronLeft, User, 
  GraduationCap, Target, Bell, LogOut, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Settings() {
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

  const { data: userProfile, isLoading } = useQuery({
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
      toast.success('Settings saved!');
    }
  });

  const handleUpdateSetting = (field, value) => {
    if (!userProfile) return;
    updateProfileMutation.mutate({
      id: userProfile.id,
      data: { [field]: value }
    });
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-slate-900">Settings</h1>
              <p className="text-xs text-slate-500">Customize your experience</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0fabc0] to-[#9ad7f7] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{user?.full_name || 'User'}</h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-slate-500">Loading...</div>
            ) : userProfile ? (
              <div className="space-y-5">
                {/* Role */}
                <div>
                  <Label className="text-slate-700 mb-2 block">Your Role</Label>
                  <Select 
                    value={userProfile.role || ''} 
                    onValueChange={(v) => handleUpdateSetting('role', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare_worker">Healthcare Worker</SelectItem>
                      <SelectItem value="it_professional">IT Professional</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Organization */}
                <div>
                  <Label className="text-slate-700 mb-2 block">Organization Type</Label>
                  <Select 
                    value={userProfile.organization_type || ''} 
                    onValueChange={(v) => handleUpdateSetting('organization_type', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div>
                  <Label className="text-slate-700 mb-2 block">Experience Level</Label>
                  <Select 
                    value={userProfile.experience_level || ''} 
                    onValueChange={(v) => handleUpdateSetting('experience_level', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quiz Difficulty */}
                <div>
                  <Label className="text-slate-700 mb-2 block">Preferred Quiz Difficulty</Label>
                  <Select 
                    value={userProfile.quiz_difficulty || 'medium'} 
                    onValueChange={(v) => handleUpdateSetting('quiz_difficulty', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>Complete onboarding to access settings</p>
                <Link to={createPageUrl('Home')}>
                  <Button className="mt-4">Go to Home</Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Stats Card */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#0fabc0]">{userProfile.total_points || 0}</p>
                  <p className="text-xs text-slate-500">Total Points</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-orange-500">{userProfile.current_streak || 0}</p>
                  <p className="text-xs text-slate-500">Day Streak</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{userProfile.completed_quizzes?.length || 0}</p>
                  <p className="text-xs text-slate-500">Quizzes Done</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{userProfile.completed_scenarios?.length || 0}</p>
                  <p className="text-xs text-slate-500">Scenarios</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </main>
    </div>
  );
}