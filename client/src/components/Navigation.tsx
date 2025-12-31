import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Layers, Terminal, Activity } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "DASHBOARD", icon: Home },
    { href: "/units", label: "MODULES", icon: Layers },
    { href: "/simulation", label: "SIMULATION", icon: Activity },
    { href: "/console", label: "CONSOLE", icon: Terminal },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 hover:w-64 z-50 bg-black/80 backdrop-blur-xl border-r border-white/10 transition-all duration-300 group flex flex-col items-center py-8 overflow-hidden">
      <div className="mb-12 w-full flex justify-center group-hover:justify-start group-hover:px-6 transition-all">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
          <span className="font-display font-bold text-black text-xl">N</span>
        </div>
        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <h1 className="font-display font-bold text-lg leading-none tracking-widest text-white">NEURAL</h1>
          <span className="text-[10px] text-primary tracking-[0.3em]">SYSTEMS</span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-2 px-2">
        {links.map((link) => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href} className="block">
              <div 
                className={`
                  relative flex items-center h-12 rounded-lg px-3 cursor-pointer transition-all duration-200 overflow-hidden
                  ${isActive ? "bg-white/10 text-primary shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]" : "text-white/50 hover:text-white hover:bg-white/5"}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#0ff]"
                  />
                )}
                <link.icon size={20} className="shrink-0" />
                <span className="ml-4 font-mono text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="w-full px-4 py-4 border-t border-white/5">
        <div className="flex items-center justify-center group-hover:justify-start">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="ml-3 text-[10px] font-mono text-green-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </nav>
  );
}
