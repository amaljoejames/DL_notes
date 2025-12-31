import { useUnit } from "@/hooks/use-units";
import { Layout } from "@/components/Layout";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";

export default function UnitDetail() {
  const [, params] = useRoute("/units/:id");
  const id = parseInt(params?.id || "0");
  const { data: unit, isLoading, error } = useUnit(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !unit) {
    return (
      <Layout>
        <div className="h-[80vh] flex flex-col items-center justify-center text-destructive">
          <h2 className="text-2xl font-bold mb-2">MODULE NOT FOUND</h2>
          <Link href="/">
            <CyberButton variant="outline">RETURN TO DASHBOARD</CyberButton>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <Link href="/">
          <button className="flex items-center text-primary/60 hover:text-primary transition-colors font-mono text-sm mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO DASHBOARD
          </button>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-primary text-sm tracking-widest mb-2 block">UNIT_0{unit.unitNumber}</span>
            <h1 className="text-5xl font-bold mb-4 text-white text-glow">{unit.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-light">
              {unit.description}
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="text-right font-mono text-xs text-white/40">
                <div>TOPICS: {unit.topics?.length || 0}</div>
                <div>STATUS: ACTIVE</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {unit.topics?.sort((a, b) => a.order - b.order).map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/topics/${topic.id}`}>
              <div className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 p-6 rounded-lg transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-primary/50 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        <span className="text-xs font-mono text-white/50 uppercase">Read Module</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
