import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button.jsx";
import { Card } from "../ui/card.jsx";
import { Progress } from "../ui/progress.jsx";

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete({ completed: true });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <Progress step={step} totalSteps={3} />
      <AnimatePresence>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card>
            <h2 className="font-bold text-lg mb-2">Step {step}</h2>
            <p>This is placeholder content for step {step}.</p>
            <Button onClick={handleNext}>Next</Button>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
