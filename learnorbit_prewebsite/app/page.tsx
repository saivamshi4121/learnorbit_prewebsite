"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Zap, Globe, BarChart3, PlayCircle, CheckCircle2, Trophy, Rocket, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mockup Components (Instructor & Student) ---

const InstructorDashboard = () => (
  <div className="w-full h-full bg-slate-50 rounded-xl overflow-hidden flex flex-col shadow-2xl border border-slate-200">
    {/* Fake Browser Header */}
    <div className="h-8 bg-slate-900 flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
    <div className="flex-1 flex">
      {/* Sidebar */}
      <div className="w-16 md:w-48 bg-slate-900 text-slate-400 p-4 flex flex-col gap-4 hidden md:flex">
        <div className="h-8 w-8 bg-primary rounded-md mb-4" />
        <div className="h-4 w-24 bg-slate-800 rounded" />
        <div className="h-4 w-20 bg-slate-800 rounded" />
        <div className="h-4 w-28 bg-slate-800 rounded" />
        <div className="mt-auto h-12 w-full bg-slate-800 rounded-lg flex items-center justify-center text-xs hover:bg-slate-700 cursor-pointer transition-colors">
          GO LIVE
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden bg-slate-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Dashboard</h3>
            <p className="text-sm text-slate-500">Welcome back, Captain.</p>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">Online</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-2 font-bold">Total Revenue</div>
            <div className="text-2xl font-black text-slate-900">$12,450</div>
            <div className="h-1 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-primary animate-pulse" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-2 font-bold">Active Students</div>
            <div className="text-2xl font-black text-slate-900">1,204</div>
            <div className="flex -space-x-2 mt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] text-slate-500 font-bold overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-80 mix-blend-multiply`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="text-center relative z-10">
            <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-primary transition-colors duration-300" />
            <div className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors duration-300">Engagement Metrics Visualizer</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentCockpit = () => (
  <div className="w-full h-full bg-zinc-900 rounded-[2rem] border-[8px] border-zinc-800 overflow-hidden relative shadow-2xl">
    {/* Mobile Status Bar */}
    <div className="h-6 w-full bg-zinc-900 flex justify-between items-center px-6 text-[10px] text-white select-none cursor-default">
      <span>9:41</span>
      <div className="flex gap-1">
        <Zap size={10} fill="currentColor" />
        <span>100%</span>
      </div>
    </div>

    {/* App Content */}
    <div className="p-6 text-white h-full bg-gradient-to-b from-indigo-900 via-zinc-900 to-zinc-950 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 border-2 border-white/20" />
          <span className="font-bold text-sm">Alex Explorer</span>
        </div>
        <div className="border border-white/20 bg-white/10 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center hover:bg-white/20 transition-colors cursor-pointer">
          <Star size={10} className="mr-1 text-yellow-400" fill="currentColor" /> 450 XP
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Continue Orbit</h2>
        <div className="w-full aspect-video bg-black/40 rounded-xl relative flex items-center justify-center group cursor-pointer hover:bg-black/50 transition-colors border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500 scale-100 group-hover:scale-105" />
          <PlayCircle className="w-12 h-12 text-white/90 group-hover:text-white group-hover:scale-110 transition-all z-10 drop-shadow-lg" />
          <div className="absolute bottom-3 left-3 text-xs font-medium text-white/90 z-10">Lesson 4: Advanced Propulsion</div>
          <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-[65%] z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="bg-green-500/20 p-1.5 rounded-full">
            <CheckCircle2 className="text-green-400 w-4 h-4" />
          </div>
          <div className="text-xs group-hover:text-green-300 transition-colors">Completed "Gravity Basics"</div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="bg-yellow-500/20 p-1.5 rounded-full">
            <Trophy className="text-yellow-400 w-4 h-4" />
          </div>
          <div className="text-xs group-hover:text-yellow-300 transition-colors">Earned "Fast Learner" Badge</div>
        </div>
      </div>
    </div>

    {/* Horizontal Scroll Indicator */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
  </div>
);


export default function Home() {
  const [activeTab, setActiveTab] = useState<'instructor' | 'student'>('instructor');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulated Ticker Items
  const tickerItems = [
    "🚀 Sarah launched 'React Mastery'",
    "🎓 120 Students joined 'Physics 101'",
    "💰 Mike earned his first $1k",
    "🌍 New instructor from Brazil",
    "⭐ 'Design Systems' rated 5/5"
  ];

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-primary selection:text-white">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[#0F172A] text-white selection:bg-yellow-400 selection:text-black">
        {/* Background Grid & gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />

        <div className="container relative z-10 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <span className="text-sm font-medium text-slate-200 tracking-wide">System Functional. Ready for Launch.</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-2xl">
            MISSION CONTROL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400 animate-gradient-x">FOR KNOWLEDGE</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The all-in-one ecosystem where creators build empires and students discover their orbit. Engage, monetize, and scale at lightspeed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all transform hover:-translate-y-1" asChild>
              <Link href="/contact">Launch Academy <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 text-white bg-transparent hover:border-white/20 transition-all transform hover:-translate-y-1" asChild>
              <Link href="/about">Explore the Tech</Link>
            </Button>
          </div>

          {/* HERO MOCKUP: 3D Perspective */}
          <div className="relative mx-auto max-w-5xl mt-12 perspective-[2000px] group animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="relative rounded-xl bg-slate-900 border border-slate-700 shadow-2xl transform rotate-x-12 translate-y-12 opacity-90 scale-95 border-t-white/20 group-hover:translate-y-8 group-hover:rotate-x-6 transition-all duration-1000 ease-out">
              {/* Reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20 rounded-xl mix-blend-overlay" />
              <div className="aspect-[16/9] w-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center text-slate-700 font-mono text-sm relative select-none">
                <InstructorDashboard />
              </div>
            </div>
            {/* Glow underneath */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/20 blur-[80px] transition-all duration-1000 opacity-60 group-hover:opacity-100 rounded-full -z-10 group-hover:w-[90%]" />
          </div>
        </div>
      </section>

      {/* LIVE TICKER */}
      <div className="w-full bg-primary overflow-hidden py-3 flex items-center relative z-20 shadow-lg border-y border-white/10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-white/90 font-bold text-xs md:text-sm tracking-wider uppercase select-none">
          {/* Repeat items for smooth infinite scroll */}
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default">
              <Zap size={14} className="fill-white" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* CHOOSE YOUR TRAJECTORY (INTERACTIVE SHOWCASE) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">TRAJECTORY</span></h2>
            <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab('instructor')}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 transform active:scale-95",
                  activeTab === 'instructor' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                For Instructors
              </button>
              <button
                onClick={() => setActiveTab('student')}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 transform active:scale-95",
                  activeTab === 'student' ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-primary hover:bg-blue-50"
                )}
              >
                For Students
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 min-h-[600px] lg:h-[500px]">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-8 pl-4 lg:pl-12 w-full max-w-xl relative h-[400px]">
              <div className={cn("transition-all duration-500 absolute inset-0 flex flex-col justify-center", activeTab === 'instructor' ? "opacity-100 translate-x-0 relative pointer-events-auto" : "opacity-0 -translate-x-8 pointer-events-none absolute top-0")}>
                <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3 border-2 border-white">
                  <Rocket className="text-blue-600 w-7 h-7" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Command Your Academy</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  Tools that feel like superpowers. Track revenue in real-time, manage thousands of students effortlessly, and deploy content with a single click.
                </p>
                <ul className="space-y-4 mt-8">
                  {["Real-time Analytics", "Automated Payments", "Custom Branding"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-700 font-bold text-sm bg-white border border-slate-100 p-3 rounded-xl shadow-sm w-fit">
                      <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-green-600" /></div> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn("transition-all duration-500 absolute inset-0 flex flex-col justify-center", activeTab === 'student' ? "opacity-100 translate-x-0 relative pointer-events-auto" : "opacity-0 translate-x-8 pointer-events-none absolute top-0")}>
                <div className="h-14 w-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm -rotate-3 border-2 border-white">
                  <Globe className="text-orange-600 w-7 h-7" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Space-Age Learning</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  Learning shouldn't be boring. Our gamified experience keeps you locked in with progress tracking, instant feedback, and a community that never sleeps.
                </p>
                <ul className="space-y-4 mt-8">
                  {["Gamified Progress", "Community Chat", "Mobile Optimized"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-700 font-bold text-sm bg-white border border-slate-100 p-3 rounded-xl shadow-sm w-fit">
                      <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-green-600" /></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: The Dynamic Mockup */}
            <div className="flex-1 w-full relative h-[600px] md:h-full flex items-center justify-center perspective-[1000px]">
              {/* Abstract Shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl -z-10 animate-pulse duration-[4000ms]" />

              {/* INSTRUCTOR MOCKUP CONTAINER */}
              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[600px] aspect-[4/3] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] rounded-xl bg-white",
                activeTab === 'instructor' ? "opacity-100 scale-100 rotate-0 z-10" : "opacity-0 scale-90 rotate-6 translate-y-10 pointer-events-none z-0 filter blur-sm"
              )}>
                <div className="p-2 bg-white rounded-xl h-full shadow-inner">
                  <InstructorDashboard />
                </div>
              </div>

              {/* STUDENT MOCKUP CONTAINER */}
              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[320px] aspect-[9/18] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] rounded-[2.5rem] bg-zinc-800",
                activeTab === 'student' ? "opacity-100 scale-100 rotate-0 z-10" : "opacity-0 scale-90 -rotate-6 translate-y-10 pointer-events-none z-0 filter blur-sm"
              )}>
                <div className="p-1 rounded-[2.2rem] h-full bg-zinc-800 shadow-inner">
                  <StudentCockpit />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY MESH */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden text-white selection:bg-pink-500 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F172A] to-[#0F172A]" />

        <div className="container px-4 mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">THE GALAXY IS <span className="text-yellow-400 relative inline-block">
            ALIVE
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>.</h2>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-20 px-4">
            {/* Generate abstract avatars */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="group flex flex-col items-center justify-center gap-3 cursor-pointer">
                <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-30 duration-1000" />
                  <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${['from-pink-500 to-purple-600', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-600', 'from-orange-400 to-red-500'][i % 4]} flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg border-2 border-slate-800 group-hover:border-white transition-colors`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-900 z-10">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">User_{1000 + i}</div>
              </div>
            ))}
          </div>

          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <Button className="h-16 px-12 text-xl bg-white text-slate-900 hover:bg-slate-100 rounded-full relative font-bold" asChild>
              <Link href="/contact">Join the Constellation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inline styles for marquee animation */}
      <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .perspective-[2000px] {
                    perspective: 2000px;
                }
                .perspective-[1000px] {
                    perspective: 1000px;
                }
                .rotate-x-12 {
                    transform: rotateX(12deg);
                }
                .rotate-x-6 {
                    transform: rotateX(6deg);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
    </div>
  );
}
