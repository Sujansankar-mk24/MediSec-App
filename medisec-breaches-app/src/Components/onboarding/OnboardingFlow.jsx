import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Building2, GraduationCap, Briefcase, 
  ChevronRight, ChevronLeft, Sparkles, Check,
  Hospital, Pill, FlaskConical, FileText
} from 'lucide-react';
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to CyberShield',
    subtitle: 'Your healthcare cybersecurity companion'
  },
  {
    id: 'role',
    title: 'What best describes your role?',
    subtitle: 'This helps us personalize your experience'
  },
  {
    id: 'organization',
    title: 'Where do you work?',
    subtitle: 'Select your organization type'
  },
  {
    id: 'experience',
    title: 'How familiar are you with cybersecurity?',
    subtitle: 'Be honest - we\'ll meet you where you are'
  },
  {
    id: 'interests',
    title: 'What topics interest you most?',
    subtitle: 'Select all that apply'
  },
  {
    id: 'difficulty',
    title: 'Choose your quiz difficulty',
    subtitle: 'You can change this anytime'
  }
];

const roleOptions = [
  { value: 'healthcare_worker', label: 'Healthcare Worker', icon: Hospital, desc: 'Nurse, Doctor, Technician' },
  { value: 'it_professional', label: 'IT Professional', icon: Shield, desc: 'Security, Support, Admin' },
  { value: 'administrator', label: 'Administrator', icon: Briefcase, desc: 'Management, Compliance' },
  { value: 'student', label: 'Student', icon: GraduationCap, desc: 'Learning healthcare/IT' },
  { value: 'other', label: 'Other', icon: Building2, desc: 'Different role' }
];

const orgOptions = [
  { value: 'hospital', label: 'Hospital', icon: Hospital },
  { value: 'clinic', label: 'Clinic', icon: Building2 },
  { value: 'insurance', label: 'Insurance', icon: FileText },
  { value: 'pharmacy', label: 'Pharmacy', icon: Pill },
  { value: 'research', label: 'Research', icon: FlaskConical },
  { value: 'other', label: 'Other', icon: Building2 }
];

const experienceLevels = [
  { value: 'beginner', label: 'Beginner', desc: 'New to cybersecurity concepts', color: 'from-emerald-400 to-emerald-600' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Know the basics, want to learn more', color: 'from-amber-400 to-amber-600' },
  { value: 'advanced', label: 'Advanced', desc: 'Well-versed, seeking expertise', color: 'from-rose-400 to-rose-600' }
];

const interestTopics = [
  'Phishing Attacks', 'Ransomware', 'Insider Threats', 'Physical Security',
  'Third-Party Risks', 'Social Engineering', 'HIPAA Compliance', 'Data Encryption'
];

const difficultyOptions = [
  { value: 'easy', label: 'Easy', desc: 'Great for beginners', color: 'bg-emerald-500' },
  { value: 'medium', label: 'Medium', desc: 'Balanced challenge', color: 'bg-amber-500' },
  { value: 'hard', label: 'Hard', desc: 'For the experts', color: 'bg-rose-500' }
];

export default function OnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    organization_type: '',
    experience_level: '',
    interests: [],
    quiz_difficulty: 'medium'
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (step.id === 'welcome') return true;
    if (step.id === 'role') return formData.role !== '';
    if (step.id === 'organization') return formData.organization_type !== '';
    if (step.id === 'experience') return formData.experience_level !== '';
    if (step.id === 'interests') return formData.interests.length > 0;
    if (step.id === 'difficulty') return formData.quiz_difficulty !== '';
    return true;
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6951bfb0e3605dc6b839d842/709e9af07_Screenshot2025-12-28at110937PM.png"
              alt="MediSec Logo"
              className="w-24 h-24 mx-auto mb-6 rounded-2xl object-cover shadow-xl"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-3">MediSec</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Learn about healthcare data breaches through interactive scenarios, daily updates, and personalized quizzes.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Personalized learning journey awaits</span>
            </div>
          </motion.div>
        );

      case 'role':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-3"
          >
            {roleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, role: option.value }))}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                  formData.role === option.value
                    ? "border-[#0fabc0] bg-[#0fabc0]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  formData.role === option.value ? "bg-[#0fabc0] text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <option.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{option.label}</p>
                  <p className="text-sm text-slate-500">{option.desc}</p>
                </div>
                {formData.role === option.value && (
                  <Check className="w-5 h-5 text-[#0fabc0]" />
                )}
              </button>
            ))}
          </motion.div>
        );

      case 'organization':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-3"
          >
            {orgOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, organization_type: option.value }))}
                className={cn(
                  "flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all",
                  formData.organization_type === option.value
                    ? "border-[#0fabc0] bg-[#0fabc0]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center",
                  formData.organization_type === option.value ? "bg-[#0fabc0] text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <option.icon className="w-7 h-7" />
                </div>
                <p className="font-medium text-slate-900">{option.label}</p>
              </button>
            ))}
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {experienceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setFormData(prev => ({ ...prev, experience_level: level.value }))}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left",
                  formData.experience_level === level.value
                    ? "border-[#0fabc0] bg-[#0fabc0]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn(
                  "w-3 h-12 rounded-full bg-gradient-to-b",
                  level.color
                )} />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{level.label}</p>
                  <p className="text-sm text-slate-500">{level.desc}</p>
                </div>
                {formData.experience_level === level.value && (
                  <Check className="w-5 h-5 text-[#0fabc0]" />
                )}
              </button>
            ))}
          </motion.div>
        );

      case 'interests':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2"
          >
            {interestTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleInterest(topic)}
                className={cn(
                  "px-4 py-2.5 rounded-full border-2 transition-all text-sm font-medium",
                  formData.interests.includes(topic)
                    ? "border-[#0fabc0] bg-[#0fabc0] text-white"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                )}
              >
                {topic}
              </button>
            ))}
          </motion.div>
        );

      case 'difficulty':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, quiz_difficulty: option.value }))}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left",
                  formData.quiz_difficulty === option.value
                    ? "border-[#0fabc0] bg-[#0fabc0]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn("w-4 h-4 rounded-full", option.color)} />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{option.label}</p>
                  <p className="text-sm text-slate-500">{option.desc}</p>
                </div>
                {formData.quiz_difficulty === option.value && (
                  <Check className="w-5 h-5 text-[#0fabc0]" />
                )}
              </button>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-xl border-0">
        <div className="mb-6">
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-slate-500 mt-2 text-right">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-6"
          >
            <h1 className="text-xl font-bold text-slate-900 mb-1">
              {steps[currentStep].title}
            </h1>
            <p className="text-sm text-slate-500">{steps[currentStep].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mb-8 min-h-[300px]">
          {renderStepContent()}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "flex-1 bg-gradient-to-r from-[#0fabc0] to-[#9ad7f7] hover:from-[#0fabc0]/90 hover:to-[#9ad7f7]/90 text-slate-900 font-semibold",
              currentStep === 0 && "w-full"
            )}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}