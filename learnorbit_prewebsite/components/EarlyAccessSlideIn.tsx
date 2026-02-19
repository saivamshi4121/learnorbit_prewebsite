"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const EarlyAccessSlideIn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if already dismissed
        const dismissed = sessionStorage.getItem("earlyAccessDismissed");
        if (dismissed === "true") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDismissed(true);
        }
    }, []);

    useEffect(() => {
        if (isDismissed || isVisible) return;

        // Timer trigger: Show after 10 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000);

        // Scroll trigger: Show after 50% scroll
        const handleScroll = () => {
            const scrollPercentage =
                (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

            if (scrollPercentage > 0.5) {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isDismissed, isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        setIsDismissed(true); // Prevent re-triggering in this session
        sessionStorage.setItem("earlyAccessDismissed", "true");
    };

    const handleJoin = () => {
        if (pathname === "/") {
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
                router.push("/contact");
            }
        } else {
            router.push("/contact");
        }
        handleClose();
    };

    if (isDismissed && !isVisible) return null;

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 z-50 w-full max-w-[90vw] md:max-w-md transition-all duration-500 ease-out transform",
                isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-20 opacity-0 pointer-events-none"
            )}
            style={{
                transitionTimingFunction: isVisible ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-in"
            }}
        >
            <style jsx global>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s infinite ease-in-out;
                }
            `}</style>
            <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6 overflow-hidden">

                {/* Subtle decorative background gradient */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors"
                    aria-label="Close Early Access Offer"
                >
                    <X size={16} />
                </button>

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl flex-shrink-0 animate-bounce-subtle">
                        <Rocket className="text-primary w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                Join Early Access
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                Be among the first to shape LearnOrbit. Get exclusive updates & perks.
                            </p>
                        </div>

                        <Button
                            onClick={handleJoin}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                        >
                            Join Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
