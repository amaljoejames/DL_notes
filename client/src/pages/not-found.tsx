import { Link } from "wouter";
import { CyberButton } from "@/components/CyberButton";
import { Layout } from "@/components/Layout";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[80vh] w-full flex items-center justify-center bg-grid-white/[0.02]">
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center max-w-md mx-4 relative overflow-hidden">
          {/* Background alert animation */}
          <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 p-4 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
              <AlertTriangle className="w-12 h-12" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-2 text-white">404 ERROR</h1>
            <p className="text-xl text-destructive font-mono mb-6">SIGNAL LOST</p>
            
            <p className="text-white/60 mb-8 font-light">
              The requested neural pathway does not exist or has been corrupted.
            </p>

            <Link href="/">
              <CyberButton variant="primary" className="w-full">
                RE-INITIALIZE ROUTE
              </CyberButton>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
