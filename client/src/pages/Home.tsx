import { useUnits } from "@/hooks/use-units";
import { UnitCard } from "@/components/UnitCard";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: units, isLoading, error } = useUnits();

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[80vh] flex flex-col items-center justify-center text-primary">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-mono animate-pulse">INITIALIZING NEURAL INTERFACE...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="h-[80vh] flex flex-col items-center justify-center text-destructive">
          <h2 className="text-2xl font-bold mb-2">SYSTEM ERROR</h2>
          <p className="font-mono">{error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="mb-16 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            DEEP LEARNING
          </h1>
          <div className="flex items-center gap-4 text-primary/80 font-mono text-lg">
            <span className="px-2 py-1 border border-primary/30 rounded bg-primary/10">v2.0.45</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>INTERACTIVE KNOWLEDGE BASE</span>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {units?.map((unit, idx) => (
          <UnitCard key={unit.id} unit={unit} index={idx} />
        ))}
        
        {/* Placeholder for visual balance if needed */}
        {units && units.length < 6 && (
          <div className="hidden lg:flex items-center justify-center p-8 border border-dashed border-white/10 rounded-xl opacity-50">
            <p className="font-mono text-center text-sm">MORE MODULES<br/>UNDER DEVELOPMENT</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
