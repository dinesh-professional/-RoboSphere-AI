"use client";

import React, { useState } from "react";
import Dashboard from "@/components/Dashboard";
import { Bot, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to the Go Backend JWT Authentication
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[600px] h-[600px] bg-ai/10 rounded-full blur-[120px] pointer-events-none bottom-0 right-0" />

      {/* Login Card */}
      <div className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-md relative z-10 border border-primary/30 shadow-[0_0_40px_rgba(0,240,255,0.1)] backdrop-blur-xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Bot size={36} className="text-primary animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold font-mono tracking-widest text-white text-center">ROBOSPHERE</h1>
          <p className="text-primary/70 text-sm tracking-widest mt-2 font-mono uppercase">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-mono tracking-wider">OPERATOR ID / EMAIL</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@robosphere.ai"
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-mono tracking-wider">ACCESS CODE / PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>INITIATE LINK</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
           <p className="text-xs text-gray-500 font-mono">
             By accessing this system, you agree to the Robotics Protocol Directives.
           </p>
        </div>
      </div>
    </div>
  );
}
