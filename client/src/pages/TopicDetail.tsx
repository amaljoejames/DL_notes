import { useTopic } from "@/hooks/use-topics";
import { Layout } from "@/components/Layout";
import { Link, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, Share2, Printer, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { CyberButton } from "@/components/CyberButton";

export default function TopicDetail() {
  const [, params] = useRoute("/topics/:id");
  const id = parseInt(params?.id || "0");
  const { data: topic, isLoading, error } = useTopic(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !topic) {
    return (
      <Layout>
        <div className="h-[80vh] flex flex-col items-center justify-center text-destructive">
          <h2 className="text-2xl font-bold mb-2">TOPIC ACCESS DENIED</h2>
          <Link href="/units">
            <CyberButton variant="outline">RETURN TO UNITS</CyberButton>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-8 sticky top-0 z-40 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
          <Link href={`/units/${topic.unitId}`}>
            <button className="flex items-center text-primary/60 hover:text-primary transition-colors font-mono text-sm group px-4 py-2 border border-transparent hover:border-primary/30 rounded">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              BACK TO UNIT
            </button>
          </Link>

          <div className="flex gap-2">
            <button className="p-2 text-white/60 hover:text-primary transition-colors hover:bg-white/5 rounded">
              <Printer size={20} />
            </button>
            <button className="p-2 text-white/60 hover:text-primary transition-colors hover:bg-white/5 rounded">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="mb-10">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold text-black bg-primary rounded">
                TOPIC DETAIL
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow leading-tight">
                {topic.title}
              </h1>
            </div>

            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-white prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/20 prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-strong:text-white">
              <ReactMarkdown>{topic.content}</ReactMarkdown>
            </article>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="text-white/40 font-mono text-sm">END OF FILE</span>
              <CyberButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                RETURN TO TOP
              </CyberButton>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-6 rounded-xl sticky top-24">
              <h3 className="font-display text-lg mb-4 text-white border-b border-white/10 pb-2">
                INTERACTIVE LAB
              </h3>
              <p className="text-sm text-white/60 mb-6">
                Launch the simulation environment to experiment with concepts from this topic.
              </p>
              
              <div className="aspect-video bg-black/50 rounded border border-white/10 mb-4 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Play className="w-12 h-12 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                
                {/* Simulated Grid */}
                <div className="absolute inset-0 cyber-grid opacity-30" />
              </div>

              <CyberButton className="w-full">
                LAUNCH SIMULATION
              </CyberButton>
            </div>

            <div className="p-6 rounded-xl border border-dashed border-white/10 bg-white/5">
              <h4 className="font-mono text-sm text-primary mb-2">KEY CONCEPTS</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Neural Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Backpropagation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Activation Functions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
