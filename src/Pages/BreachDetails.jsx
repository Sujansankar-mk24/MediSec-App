import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, AlertTriangle, MapPin, Users, 
  Calendar, ExternalLink, Lightbulb, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

const breachTypeColors = {
  phishing: 'from-[#890909] to-[#890909]/80',
  ransomware: 'from-[#890909] to-[#890909]/80',
  insider_threat: 'from-[#0fabc0] to-[#9ad7f7]',
  physical: 'from-[#0fabc0] to-[#9ad7f7]',
  third_party: 'from-[#0fabc0] to-[#9ad7f7]',
  misconfiguration: 'from-[#0fabc0] to-[#9ad7f7]',
  social_engineering: 'from-[#890909] to-[#890909]/80'
};

export default function BreachDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const breachId = urlParams.get('id');

  const { data: breach, isLoading } = useQuery({
    queryKey: ['breach', breachId],
    queryFn: async () => {
      if (!breachId) return null;
      const breaches = await base44.entities.DailyBreach.filter({ id: breachId });
      return breaches[0] || null;
    },
    enabled: !!breachId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!breach) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Breach Not Found</h2>
        <p className="text-slate-500 mb-4">The breach you're looking for doesn't exist.</p>
        <Link to={createPageUrl('Home')}>
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Link to={createPageUrl('Home')}>
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <Card className="overflow-hidden mb-6">
            <div className={cn(
              "p-6 text-white bg-gradient-to-br",
              breachTypeColors[breach.breach_type] || 'from-slate-600 to-slate-700'
            )}>
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Breach Alert</span>
              </div>
              <h1 className="text-xl font-bold mb-3">{breach.title}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white">
                  {breach.breach_type?.replace('_', ' ')}
                </Badge>
                {breach.state && (
                  <Badge className="bg-white/20 text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {breach.state}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Organization</p>
                  <p className="font-medium text-slate-900">{breach.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Date</p>
                  <p className="font-medium text-slate-900">
                    {breach.date ? format(new Date(breach.date), 'MMM d, yyyy') : 'Unknown'}
                  </p>
                </div>
                {breach.records_affected && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Records Affected</p>
                    <p className="font-medium text-rose-600 text-lg">
                      {breach.records_affected.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-5 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">What Happened</h3>
            <p className="text-slate-600 leading-relaxed">{breach.summary}</p>
          </Card>

          {/* Lessons Learned */}
          {breach.lessons_learned?.length > 0 && (
            <Card className="p-5 mb-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Lessons Learned
              </h3>
              <ul className="space-y-3">
                {breach.lessons_learned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Shield className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{lesson}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Source Link */}
          {breach.source_url && (
            <a 
              href={breach.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">View Original Source</span>
                  <ExternalLink className="w-4 h-4 text-cyan-500" />
                </div>
              </Card>
            </a>
          )}

          {/* Related Actions */}
          <div className="mt-6 space-y-3">
            <Link to={createPageUrl('Learn')}>
              <Button variant="outline" className="w-full">
                Learn About {breach.breach_type?.replace('_', ' ')} Attacks
              </Button>
            </Link>
            <Link to={createPageUrl('Quizzes')}>
              <Button className="w-full bg-gradient-to-r from-[#0fabc0] to-[#9ad7f7] text-slate-900 font-semibold hover:opacity-90">
                Test Your Knowledge
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}