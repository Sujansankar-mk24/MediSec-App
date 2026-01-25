import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, CheckCircle2, XCircle, ChevronRight, 
  RotateCcw, Trophy, Lightbulb, Zap
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ScenarioGame({ scenario, onComplete }) {
  const [currentStepId, setCurrentStepId] = useState(scenario?.steps?.[0]?.step_id || 'start');
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [history, setHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState(null);

  const currentStep = scenario?.steps?.find(s => s.step_id === currentStepId);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowConsequence(true);
    
    const newScore = score + (choice.points || 0);
    setScore(newScore);
    
    setHistory(prev => [...prev, {
      step_id: currentStepId,
      choice: choice.text,
      is_correct: choice.is_correct,
      points: choice.points || 0
    }]);

    setTimeout(() => {
      if (choice.next_step?.startsWith('outcome_')) {
        const outcome = scenario.final_outcomes?.find(o => o.outcome_id === choice.next_step);
        setFinalOutcome(outcome);
        setIsComplete(true);
      } else {
        setCurrentStepId(choice.next_step);
        setSelectedChoice(null);
        setShowConsequence(false);
      }
    }, 2500);
  };

  const handleRestart = () => {
    setCurrentStepId(scenario?.steps?.[0]?.step_id || 'start');
    setScore(0);
    setSelectedChoice(null);
    setShowConsequence(false);
    setHistory([]);
    setIsComplete(false);
    setFinalOutcome(null);
  };

  const handleFinish = () => {
    onComplete({
      score,
      total_possible: scenario.points_possible || 100,
      history,
      outcome: finalOutcome
    });
  };

  if (!scenario) {
    return (
      <div className="text-center py-12 text-slate-500">
        No scenario loaded
      </div>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <Card className="overflow-hidden">
          <div className={cn(
            "p-6 text-center text-white",
            finalOutcome?.is_success 
              ? "bg-gradient-to-br from-emerald-500 to-teal-600"
              : "bg-gradient-to-br from-rose-500 to-red-600"
          )}>
            {finalOutcome?.is_success ? (
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold mb-2">{finalOutcome?.title}</h2>
            <p className="text-white/90">{finalOutcome?.description}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{score}</p>
                <p className="text-sm text-slate-500">Points Earned</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{scenario.points_possible || 100}</p>
                <p className="text-sm text-slate-500">Total Possible</p>
              </div>
            </div>

            {finalOutcome?.lessons?.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-slate-900">Key Takeaways</span>
                </div>
                <ul className="space-y-2">
                  {finalOutcome.lessons.map((lesson, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-cyan-500 mt-0.5">•</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleRestart}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={handleFinish}
                className="flex-1 bg-gradient-to-r from-[#0fabc0] to-[#9ad7f7] text-slate-900 font-semibold hover:opacity-90"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
          {score} pts
        </Badge>
        <Progress 
          value={(history.length / (scenario.steps?.length || 1)) * 100} 
          className="w-32 h-2"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="overflow-hidden border-2 border-[#890909]/30 shadow-lg shadow-[#890909]/20">
            <div className="bg-gradient-to-r from-[#890909] to-[#890909]/80 p-5 text-white">
              <Badge className="bg-white/20 text-white mb-3">
                {scenario.role_context}
              </Badge>
              <p className="text-lg leading-relaxed">{currentStep?.narrative}</p>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-sm font-medium text-slate-500 mb-3">What do you do?</p>
              
              {currentStep?.choices?.map((choice, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  disabled={showConsequence}
                  onClick={() => handleChoice(choice)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all",
                    showConsequence && selectedChoice === choice
                      ? choice.is_correct
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-rose-500 bg-rose-50"
                      : showConsequence
                        ? "opacity-50 border-slate-200"
                        : "border-slate-200 hover:border-[#0fabc0] hover:bg-[#0fabc0]/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0",
                      showConsequence && selectedChoice === choice
                        ? choice.is_correct ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-700">{choice.text}</span>
                  </div>
                </motion.button>
              ))}

              <AnimatePresence>
                {showConsequence && selectedChoice && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className={cn(
                      "p-4 rounded-xl",
                      selectedChoice.is_correct ? "bg-emerald-100" : "bg-rose-100"
                    )}>
                      <div className="flex items-start gap-3">
                        {selectedChoice.is_correct ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        )}
                        <div>
                          <p className={cn(
                            "font-medium",
                            selectedChoice.is_correct ? "text-emerald-800" : "text-rose-800"
                          )}>
                            {selectedChoice.is_correct ? 'Good choice!' : 'Not ideal...'}
                          </p>
                          <p className={cn(
                            "text-sm mt-1",
                            selectedChoice.is_correct ? "text-emerald-700" : "text-rose-700"
                          )}>
                            {selectedChoice.consequence}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}