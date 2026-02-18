"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Layers, Zap, Shield, Code, MousePointer2, Box, Cpu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function About() {
    const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-secondary text-secondary-foreground overflow-x-hidden selection:bg-primary selection:text-white">

            {/* 1. The Blueprint Hero */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center border-b border-white/10">
                {/* CSS Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                <div className="container relative z-10 px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-8 uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Architecture v2.0
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">BLUEPRINT</span><br />
                        OF KNOWLEDGE.
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        We didn't just build another LMS. We deconstructed education and re-engineered it for the speed of thought.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                        <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-none border-l-4 border-white/20" asChild>
                            <Link href="/contact">View Documentation <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>

                {/* Floating Abstract UI Elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
            </section>

            {/* 2. Deconstructed Engineering (Accordion Core) */}
            <section className="py-32 bg-background relative overflow-hidden">
                <div className="container px-4 mx-auto relative z-10">
                    <div className="mb-20 text-center">
                        <h2 className="text-3xl font-mono text-primary mb-4">// SYSTEM_CORE</h2>
                        <p className="text-2xl md:text-4xl font-bold text-foreground">The Engine Under the Hood</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2 h-[600px] w-full">
                        {/* Panel 1: Performance */}
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end group cursor-pointer shadow-md hover:shadow-xl",
                                hoveredBlock === 'speed' ? "lg:flex-[3]" : "lg:flex-[1]",
                                hoveredBlock !== null && hoveredBlock !== 'speed' && "lg:opacity-40"
                            )}
                            onMouseEnter={() => setHoveredBlock('speed')}
                            onMouseLeave={() => setHoveredBlock(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10" />
                            {/* Visual: Pulsing Core */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                                <Zap className={cn("w-32 h-32 text-primary transition-all duration-700", hoveredBlock === 'speed' ? "scale-110" : "scale-75")} />
                            </div>

                            <div className="relative z-20 p-8 md:p-12 transition-all duration-500">
                                <h3 className="text-3xl font-bold text-foreground mb-2 whitespace-nowrap">Hyper-Velocity</h3>
                                <div className={cn("overflow-hidden transition-all duration-700", hoveredBlock === 'speed' ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0")}>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                        We shaved off every millisecond. Our rendering engine pre-fetches resources before you even click, making navigation feel instantaneous.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-widest">
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">TTFB: 12ms</div>
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">FCP: 0.4s</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Architecture */}
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end group cursor-pointer shadow-md hover:shadow-xl",
                                hoveredBlock === 'structure' ? "lg:flex-[3]" : "lg:flex-[1]",
                                hoveredBlock !== null && hoveredBlock !== 'structure' && "lg:opacity-40"
                            )}
                            onMouseEnter={() => setHoveredBlock('structure')}
                            onMouseLeave={() => setHoveredBlock(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10" />
                            {/* Visual: Scrolling Code */}
                            <div className="absolute inset-0 p-8 font-mono text-xs text-primary/10 overflow-hidden pointer-events-none whitespace-pre select-none">
                                {`{
  "module": "core",
  "status": "active",
  "dependencies": ["neural_net", "quantum_bridge"],
  "integrity": "verified"
}
...syncing
...optimizing
{
  "render_mode": "atomic",
  "components": 420,
  "state": "immutable"
}`}
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                                <Code className={cn("w-32 h-32 text-primary transition-all duration-700", hoveredBlock === 'structure' ? "rotate-0 scale-110" : "rotate-12 scale-75")} />
                            </div>

                            <div className="relative z-20 p-8 md:p-12 transition-all duration-500">
                                <h3 className="text-3xl font-bold text-foreground mb-2 whitespace-nowrap">API-First Design</h3>
                                <div className={cn("overflow-hidden transition-all duration-700", hoveredBlock === 'structure' ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0")}>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                        Your data shouldn't be trapped. Our entire platform is built on a headless API, allowing you to build custom frontends or integrate with your existing tools seamlessly.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-widest">
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">REST</div>
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">GraphQL</div>
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">Webhooks</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Ecosystem */}
                        <div
                            className={cn(
                                "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end group cursor-pointer shadow-md hover:shadow-xl",
                                hoveredBlock === 'api' ? "lg:flex-[3]" : "lg:flex-[1]",
                                hoveredBlock !== null && hoveredBlock !== 'api' && "lg:opacity-40"
                            )}
                            onMouseEnter={() => setHoveredBlock('api')}
                            onMouseLeave={() => setHoveredBlock(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10" />
                            {/* Visual: Floating Blocks */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                                <Box className={cn("w-32 h-32 text-primary transition-all duration-700", hoveredBlock === 'api' ? "translate-y-0 scale-110" : "translate-y-4 scale-75")} />
                            </div>

                            <div className="relative z-20 p-8 md:p-12 transition-all duration-500">
                                <h3 className="text-3xl font-bold text-foreground mb-2 whitespace-nowrap">Atomic Ecosystem</h3>
                                <div className={cn("overflow-hidden transition-all duration-700", hoveredBlock === 'api' ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0")}>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                        Courses, lessons, and quizzes are treated as atomic units. Mix, match, and reuse content across different tracks without duplicating effort.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-widest">
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">Modular</div>
                                        <div className="px-3 py-1 border border-primary/30 rounded bg-primary/10">Reusable</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Manifesto (Bento Grid) */}
            <section className="py-32 bg-background text-foreground">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-5xl font-black mb-4 tracking-tighter">OUR<br />MANIFESTO</h2>
                            <div className="h-2 w-24 bg-primary" />
                        </div>
                        <p className="max-w-md text-lg text-muted-foreground text-right">
                            We believe in tools that respect the user. No bloat. No darkness patterns. Just pure utility.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 bg-secondary text-secondary-foreground border-none shadow-xl overflow-hidden group">
                            <CardContent className="p-10 relative">
                                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity text-9xl font-black text-white pointer-events-none">01</div>
                                <h3 className="text-2xl font-bold mb-4">Simplicity is Engineering</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    Complex systems fail. Simple systems scale. We fight complexity in every line of code we write, ensuring that LearnOrbit remains lightweight even as it grows powerful.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted text-foreground border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-10 flex flex-col justify-center h-full">
                                <Shield className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-2">Respect Data</h3>
                                <p className="text-muted-foreground">Your content is yours. Your students are yours. We are the infrastructure, not the owners.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted text-foreground border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-10 flex flex-col justify-center h-full">
                                <Cpu className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-2">Automate Everything</h3>
                                <p className="text-muted-foreground">If a computer can do it, a human shouldn't. We automate admin tasks so you can teach.</p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2 bg-primary text-primary-foreground border-none shadow-xl overflow-hidden group">
                            <CardContent className="p-10 relative">
                                <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-30 transition-opacity text-9xl font-black text-white pointer-events-none">04</div>
                                <h3 className="text-2xl font-bold mb-4">Build for the Future</h3>
                                <p className="text-primary-foreground/90 leading-relaxed text-lg">
                                    Education is evolving. We build with modern standards to ensure that your academy is ready for what comes next, from AI integration to spatial computing.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 4. Minimal CTA */}
            <section className="py-24 bg-secondary text-secondary-foreground border-t border-white/10">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-12">
                        "The best way to predict the future is to <span className="text-primary font-bold">build it</span>."
                    </h2>
                    <Button size="lg" className="h-16 px-12 text-xl bg-white text-secondary hover:bg-slate-200" asChild>
                        <Link href="/contact">Start Building</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
