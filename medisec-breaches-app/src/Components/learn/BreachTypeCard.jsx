import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, ChevronRight, AlertTriangle, 
  Lock, Users, Building, Server, Brain
} from 'lucide-react';
import { cn } from "@/lib/utils";

const categoryConfig = {
  phishing: { icon: Mail, color: 'from-[#890909] to-[#890909]/80', bgLight: 'bg-[#890909]/10' },
  ransomware: { icon: Lock, color: 'from-[#890909] to-[#890909]/80', bgLight: 'bg-[#890909]/10' },
  insider_threat: { icon: Users, color: 'from-[#0fabc0] to-[#9ad7f7]', bgLight: 'bg-[#0fabc0]/10' },
  physical: { icon: Building, color: 'from-[#0fabc0] to-[#9ad7f7]', bgLight: 'bg-[#0fabc0]/10' },
  third_party: { icon: Server, color: 'from-[#0fabc0] to-[#9ad7f7]', bgLight: 'bg-[#0fabc0]/10' },
  misconfiguration: { icon: AlertTriangle, color: 'from-[#0fabc0] to-[#9ad7f7]', bgLight: 'bg-[#0fabc0]/10' },
  social_engineering: { icon: Brain, color: 'from-[#890909] to-[#890909]/80', bgLight: 'bg-[#890909]/10' }
};

import { Mail } from 'lucide-react';

const riskColors = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700'
};

export default function BreachTypeCard({ breachType, onClick, index = 0 }) {
  const config = categoryConfig[breachType.category] || categoryConfig.phishing;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
        <div className={cn("h-2 bg-gradient-to-r", config.color)} />
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white",
              config.color
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 mb-1">{breachType.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{breachType.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Badge className={cn("text-xs", riskColors[breachType.risk_level] || riskColors.medium)}>
              {breachType.risk_level} risk
            </Badge>
            <Badge variant="outline" className="text-xs">
              {breachType.category?.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}