import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, MapPin, Users, Calendar, 
  ChevronRight, ExternalLink 
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

const breachTypeColors = {
  phishing: 'bg-[#890909]/10 text-[#890909]',
  ransomware: 'bg-[#890909]/10 text-[#890909]',
  insider_threat: 'bg-[#0fabc0]/10 text-[#0fabc0]',
  physical: 'bg-[#0fabc0]/10 text-[#0fabc0]',
  third_party: 'bg-[#0fabc0]/10 text-[#0fabc0]',
  misconfiguration: 'bg-[#0fabc0]/10 text-[#0fabc0]',
  social_engineering: 'bg-[#890909]/10 text-[#890909]'
};

export default function DailyBreachCard({ breach, onLearnMore }) {
  if (!breach) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden border-2 border-[#890909]/30 shadow-lg shadow-[#890909]/20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Today's Breach Alert</span>
          </div>
          <h3 className="text-lg font-bold text-white">{breach.title}</h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={cn("font-medium", breachTypeColors[breach.breach_type] || 'bg-slate-100 text-slate-700')}>
              {breach.breach_type?.replace('_', ' ')}
            </Badge>
            {breach.state && (
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {breach.state}
              </Badge>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {breach.summary}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {breach.date ? format(new Date(breach.date), 'MMM d, yyyy') : 'N/A'}
              </span>
              {breach.records_affected && (
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {breach.records_affected.toLocaleString()} affected
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onLearnMore(breach)}
              className="text-[#0fabc0] hover:text-[#0fabc0]/80"
            >
              Learn More
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}