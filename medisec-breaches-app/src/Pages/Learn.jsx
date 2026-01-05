import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, ChevronLeft, ChevronRight, X,
  Shield, AlertTriangle, CheckCircle2, ExternalLink,
  Lock, Users, Building, Server, Brain, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
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

const riskColors = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700'
};

export default function Learn() {
  const [selectedType, setSelectedType] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: breachTypes, isLoading } = useQuery({
    queryKey: ['breachTypes'],
    queryFn: () => base44.entities.BreachType.list(),
    initialData: []
  });

  const categories = ['all', ...new Set(breachTypes.map(b => b.category))];
  
  const filteredTypes = breachTypes.filter(b => 
    activeCategory === 'all' || b.category === activeCategory
  );

  if (selectedType) {
    const config = categoryConfig[selectedType.category] || categoryConfig.phishing;
    const Icon = config.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10">
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-[#0fabc0]/10 via-white/80 to-[#9ad7f7]/10 border-b border-[#0fabc0]/30">
          <div className="max-w-lg mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedType(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Learning</span>
            </button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header Card */}
            <Card className="overflow-hidden mb-6">
              <div className={cn("p-6 text-white bg-gradient-to-br", config.color)}>
                <Icon className="w-12 h-12 mb-4" />
                <h1 className="text-2xl font-bold mb-2">{selectedType.name}</h1>
                <div className="flex gap-2">
                  <Badge className="bg-white/20 text-white">
                    {selectedType.category?.replace('_', ' ')}
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    {selectedType.risk_level} risk
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-600 leading-relaxed">{selectedType.description}</p>
              </div>
            </Card>

            {/* How It Works */}
            {selectedType.how_it_works && (
              <Card className="p-5 mb-4">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  How It Works
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedType.how_it_works}</p>
              </Card>
            )}

            {/* Prevention Tips */}
            {selectedType.prevention_tips?.length > 0 && (
              <Card className="p-5 mb-4">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  Prevention Tips
                </h3>
                <ul className="space-y-3">
                  {selectedType.prevention_tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Real World Examples */}
            {selectedType.real_world_examples?.length > 0 && (
              <Card className="p-5">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                  Real World Examples
                </h3>
                <ul className="space-y-2">
                  {selectedType.real_world_examples.map((example, idx) => (
                    <li key={idx} className="text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#9ad7f7]/20 to-[#0fabc0]/10">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Home')}>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="font-bold text-slate-900">Learn</h1>
              <p className="text-xs text-slate-500">Healthcare breach types</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0fabc0] to-[#9ad7f7] rounded-2xl p-5 text-slate-900"
        >
          <BookOpen className="w-10 h-10 mb-3 text-slate-900" />
          <h2 className="text-xl font-bold mb-2 text-slate-900">Breach Encyclopedia</h2>
          <p className="text-slate-800 text-sm">
            Learn about different types of healthcare data breaches, how they happen, and how to prevent them.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === cat
                  ? "bg-[#0fabc0] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              {cat === 'all' ? 'All Types' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Breach Types Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">Loading...</div>
          ) : filteredTypes.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No breach types found</div>
          ) : (
            filteredTypes.map((type, idx) => {
              const config = categoryConfig[type.category] || categoryConfig.phishing;
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedType(type)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#0fabc0]/30">
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
                          <h3 className="font-semibold text-slate-900 mb-1">{type.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2">{type.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Badge className={cn("text-xs", riskColors[type.risk_level] || riskColors.medium)}>
                          {type.risk_level} risk
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {type.category?.replace('_', ' ')}
                        </Badge>
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