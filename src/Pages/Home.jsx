import { useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center p-6 text-center">
      <Card className="max-w-4xl border-0 shadow-2xl p-16 rounded-[60px] bg-white">
        <div className="flex justify-center mb-10 text-[#0fabc0]">
          <ShieldCheck size={100} strokeWidth={2.5} />
        </div>
        
        <div className="space-y-8 mb-12">
          <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tight">
            Our Mission
          </h2>
          
          <p className="text-2xl text-slate-600 leading-relaxed font-medium">
            We are dedicated to spreading awareness about the critical significance of 
            <span className="text-[#890909] font-bold"> security breaches in healthcare</span>. 
            Protecting patient data is a fundamental part of modern care.
          </p>
          
          <p className="text-2xl text-slate-600 leading-relaxed font-medium">
            Our goal is to empower others to 
            <span className="text-[#0fabc0] font-bold"> learn how to prevent </span> 
            cyber threats through interactive simulations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Using the new 'lg' size for maximum impact */}
          <Button onClick={() => navigate("/learn")} size="lg">
            Start Learning
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard")} size="lg">
            Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}