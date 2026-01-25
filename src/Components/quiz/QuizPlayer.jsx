import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// GO UP TWO LEVELS to reach the UI folder
import { Card } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { Progress } from "../ui/progress.jsx";

import { 
  CheckCircle2, XCircle, ChevronRight,
  Trophy, RotateCcw
} from 'lucide-react';

// ... rest of the file stays the same

export default function QuizPlayer({ quiz, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState((quiz?.time_limit_minutes || 10) * 60);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quiz?.questions?.[currentIndex];
  const totalQuestions = quiz?.questions?.length || 0;

  useEffect(() => {
    if (timeLeft <= 0 || isComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correct_answer;
    setAnswers(prev => [...prev, {
      question_id: currentQuestion.question_id,
      selected_answer: answerIndex,
      is_correct: isCorrect
    }]);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        handleQuizComplete();
      }
    }, 1500);
  };

  const handleQuizComplete = () => {
    setIsComplete(true);
  };

  const calculateResults = () => {
    const correctCount = answers.filter(a => a.is_correct).length;
    const totalPoints = answers.reduce((sum, a, idx) => {
      return sum + (a.is_correct ? (quiz.questions[idx]?.points || 10) : 0);
    }, 0);
    const totalPossible = quiz.questions.reduce((sum, q) => sum + (q.points || 10), 0);
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= (quiz.passing_score || 70);
    
    return { correctCount, totalPoints, totalPossible, percentage, passed };
  };

  const handleFinish = () => {
    const results = calculateResults();
    onComplete({
      score: results.totalPoints,
      total_possible: results.totalPossible,
      percentage: results.percentage,
      passed: results.passed,
      time_taken_seconds: (quiz.time_limit_minutes * 60) - timeLeft,
      answers
    });
  };

  if (!quiz) {
    return (
      <div className="text-center py-12 text-slate-500">
        No quiz loaded
      </div>
    );
  }

  if (isComplete) {
    const results = calculateResults();
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <Card className="overflow-hidden">
          <div className={cn(
            "p-8 text-center text-white",
            results.passed
              ? "bg-gradient-to-br from-emerald-500 to-teal-600"
              : "bg-gradient-to-br from-amber-500 to-orange-600"
          )}>
            {results.passed ? (
              <Trophy className="w-20 h-20 mx-auto mb-4" />
            ) : (
              <Award className="w-20 h-20 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold mb-2">
              {results.passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <p className="text-white/90">
              {results.passed 
                ? 'You passed the quiz!' 
                : `You need ${quiz.passing_score || 70}% to pass`}
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-slate-900">{results.percentage}%</p>
                <p className="text-xs text-slate-500">Score</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-emerald-600">{results.correctCount}</p>
                <p className="text-xs text-slate-500">Correct</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-rose-600">{totalQuestions - results.correctCount}</p>
                <p className="text-xs text-slate-500">Wrong</p>
              </div>
            </div>

            <div className="space-y-3">
              {quiz.questions.map((q, idx) => (
                <div 
                  key={q.question_id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg",
                    answers[idx]?.is_correct ? "bg-emerald-50" : "bg-rose-50"
                  )}
                >
                  {answers[idx]?.is_correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )}
                  <span className="text-sm text-slate-700 truncate">{q.question_text}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleFinish}
              className="w-full bg-gradient-to-r from-[#0fabc0] to-[#9ad7f7] text-slate-900 font-semibold hover:opacity-90"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Question {currentIndex + 1} of {totalQuestions}
        </Badge>
        <Badge 
          variant="outline" 
          className={cn(
            "text-sm",
            timeLeft < 60 ? "text-rose-600 border-rose-300" : ""
          )}
        >
          <Clock className="w-3.5 h-3.5 mr-1" />
          {formatTime(timeLeft)}
        </Badge>
      </div>

      <Progress 
        value={((currentIndex + 1) / totalQuestions) * 100}
        className="mb-6 h-2"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="overflow-hidden border-2 border-[#0fabc0]/30 shadow-lg shadow-[#0fabc0]/20">
            <div className="bg-gradient-to-r from-[#0fabc0] to-[#9ad7f7] p-6 text-slate-900">
              <p className="text-lg text-slate-900 font-semibold">
                {currentQuestion?.question_text}
              </p>
            </div>

            <div className="p-5 space-y-3">
              {currentQuestion?.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  disabled={showResult}
                  onClick={() => handleSelectAnswer(idx)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all",
                    showResult
                      ? idx === currentQuestion.correct_answer
                        ? "border-emerald-500 bg-emerald-50"
                        : idx === selectedAnswer
                          ? "border-rose-500 bg-rose-50"
                          : "border-slate-200 opacity-50"
                      : "border-slate-200 hover:border-[#0fabc0] hover:bg-[#0fabc0]/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0",
                      showResult && idx === currentQuestion.correct_answer
                        ? "bg-emerald-500 text-white"
                        : showResult && idx === selectedAnswer
                          ? "bg-rose-500 text-white"
                          : "bg-slate-100 text-slate-600"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-700">{option}</span>
                    {showResult && idx === currentQuestion.correct_answer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />
                    )}
                    {showResult && idx === selectedAnswer && idx !== currentQuestion.correct_answer && (
                      <XCircle className="w-5 h-5 text-rose-500 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}

              <AnimatePresence>
                {showResult && currentQuestion?.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-blue-50 rounded-xl"
                  >
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Explanation: </span>
                      {currentQuestion.explanation}
                    </p>
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