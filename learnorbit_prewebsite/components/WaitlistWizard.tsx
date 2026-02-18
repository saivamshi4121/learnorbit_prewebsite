"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    User, GraduationCap, Presentation, Building, Briefcase,
    CheckCircle2, ChevronRight, ChevronLeft, Loader2,
    AlertCircle, DollarSign, BarChart3, Smartphone,
    Layout, Bot, Users, Award, CreditCard, Megaphone,
    X, Check, Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import confetti from "canvas-confetti";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// --- Types ---

type FormData = {
    fullName: string;
    email: string;
    role: string;
    currentPlatform: string;
    frustrations: string[];
    desiredFeatures: string[];
    pricingExpectation: string;
    earlyAccessInterest: boolean;
    betaTester: boolean;
    source: string;
    whatsapp?: string;
};

const INITIAL_DATA: FormData = {
    fullName: "",
    email: "",
    role: "",
    currentPlatform: "",
    frustrations: [],
    desiredFeatures: [],
    pricingExpectation: "",
    earlyAccessInterest: false,
    betaTester: false,
    source: "waitlist_wizard",
    whatsapp: ""
};

// --- Options Data ---

const ROLES = [
    { id: "student", label: "Student", icon: User },
    { id: "instructor", label: "Instructor", icon: GraduationCap },
    { id: "course_creator", label: "Course Creator", icon: Presentation },
    { id: "institute", label: "Coaching Institute", icon: Building },
    { id: "corporate_trainer", label: "Corporate Trainer", icon: Briefcase },
];

const LMS_OPTIONS = [
    "Udemy", "Teachable", "Thinkific", "Moodle", "Google Classroom", "Other"
];

const FRUSTRATIONS = [
    { id: "ui", label: "Complicated UI", icon: Layout },
    { id: "price", label: "Expensive pricing", icon: DollarSign },
    { id: "engagement", label: "Poor engagement", icon: Users },
    { id: "analytics", label: "Bad analytics", icon: BarChart3 },
    { id: "customization", label: "Limited customization", icon: AlertCircle },
    { id: "mobile", label: "Poor mobile app", icon: Smartphone },
];

const FEATURES = [
    { id: "ai", label: "AI Assistant", icon: Bot },
    { id: "analytics", label: "Deep Analytics", icon: BarChart3 },
    { id: "live", label: "Live Classes", icon: Megaphone },
    { id: "community", label: "Community", icon: Users },
    { id: "certs", label: "Certificates", icon: Award },
    { id: "payments", label: "Global Payments", icon: CreditCard },
];

const PRICING = [
    "Free only", "₹499–999", "₹999–2999", "₹2999+"
];

// --- Component ---

export default function WaitlistWizard() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedEmail, setSubmittedEmail] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"success" | "exists">("success");

    const totalSteps = 5;

    const updateData = (key: keyof FormData, value: any) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const toggleSelection = (key: 'frustrations' | 'desiredFeatures', value: string) => {
        setData(prev => {
            const current = (prev[key] || []) as string[];
            if (current.includes(value)) {
                return { ...prev, [key]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [key]: [...current, value] };
            }
        });
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }; // Higher z-index for modal

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleNext = async () => {
        if (!validateStep(step)) return;

        if (step === 1) {
            setLoading(true);
            setError(null);

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://learnorbit-backend.onrender.com";
                const response = await axios.post(`${apiUrl}/api/marketing/check-email`, { email: data.email });

                if (response.data.exists) {
                    setSubmittedEmail(data.email);
                    setModalType("exists");
                    setIsModalOpen(true);
                    triggerConfetti(); // 🎉 Celebration even if already joined!
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Email check failed", err);
                setError("Unable to verify email. Please try again.");
                setLoading(false);
                return;
            }

            setLoading(false);
        }

        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1));
    };

    const validateStep = (currentStep: number) => {
        switch (currentStep) {
            case 1: return data.fullName.length > 2 && data.email.includes("@") && !!data.role;
            case 2: return true;
            case 3: return data.frustrations.length > 0;
            case 4: return data.desiredFeatures.length > 0 && !!data.pricingExpectation;
            case 5: return true;
            default: return true;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://learnorbit-backend.onrender.com";

            const payload = {
                fullName: data.fullName,
                email: data.email,
                role: data.role,
                currentPlatform: data.currentPlatform || "None",
                frustrations: data.frustrations,
                desiredFeatures: data.desiredFeatures,
                pricingExpectation: data.pricingExpectation,
                earlyAccessInterest: data.earlyAccessInterest,
                betaTester: data.betaTester,
                source: data.source
            };

            const response = await axios.post(`${apiUrl}/api/marketing/waitlist`, payload);

            if (response.status === 201) {
                setSubmittedEmail(data.email);
                setModalType("success");
                setIsModalOpen(true);
                triggerConfetti();
                setData(INITIAL_DATA);
                setSubmitted(true); // Keep internal state too if needed, but modal overtakes UI
            }
        } catch (err: any) {
            console.error("Submission failed", err);

            if (err.response?.status === 409) {
                // Should basically not happen due to Step 1 check, but just in case
                setModalType("exists");
                setSubmittedEmail(data.email);
                setIsModalOpen(true);
                triggerConfetti();
            } else if (err.response?.status === 400) {
                setError(err.response?.data?.message || "Please check your inputs.");
            } else {
                setError("Something went wrong. Please check your connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#F8FAFC] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 flex flex-col min-h-[450px] md:min-h-[500px]">
            {/* Progress Bar */}
            <div className="h-1.5 bg-slate-100 w-full">
                <div
                    className="h-full bg-primary transition-all duration-700 ease-out rounded-r-full"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-5 md:p-8 flex flex-col">
                {/* Header */}
                <div className="mb-6 md:mb-8 flex justify-between items-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Step {step} of {totalSteps}</span>
                    {step > 1 && (
                        <button onClick={handleBack} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center text-sm font-medium p-2 -mr-2">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">Let's get you set up. Who are you?</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name</label>
                                        <Input
                                            placeholder="Jane Doe"
                                            value={data.fullName}
                                            onChange={(e) => updateData('fullName', e.target.value)}
                                            className="bg-white text-base md:text-sm h-12 md:h-10"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={data.email}
                                            onChange={(e) => updateData('email', e.target.value)}
                                            className="bg-white text-base md:text-sm h-12 md:h-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">I am a...</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {ROLES.map((role) => (
                                            <div
                                                key={role.id}
                                                onClick={() => updateData('role', role.id)}
                                                className={cn(
                                                    "p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
                                                    data.role === role.id
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                                                        : "border-slate-200 bg-white hover:border-primary/50"
                                                )}
                                            >
                                                <div className={cn("p-2 rounded-full", data.role === role.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                                                    <role.icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium text-sm">{role.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">Are you currently using an LMS?</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => updateData('currentPlatform', "None")} // Simple toggle logic for UI
                                    className={cn(
                                        "p-4 md:p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 md:gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] h-32 md:h-40",
                                        data.currentPlatform === "None" ? "border-primary bg-primary/5 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                                    )}
                                >
                                    <X className={cn("w-8 h-8 md:w-10 md:h-10", data.currentPlatform === "None" ? "text-primary" : "text-slate-300")} />
                                    <span className="font-bold text-base md:text-lg text-center">No, I'm new</span>
                                </div>
                                <div
                                    onClick={() => updateData('currentPlatform', "")} // Clear it to force selection below
                                    className={cn(
                                        "p-4 md:p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 md:gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] h-32 md:h-40",
                                        data.currentPlatform !== "None" ? "border-primary bg-primary/5 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                                    )}
                                >
                                    <CheckCircle2 className={cn("w-8 h-8 md:w-10 md:h-10", data.currentPlatform !== "None" ? "text-primary" : "text-slate-300")} />
                                    <span className="font-bold text-base md:text-lg text-center">Yes, I am</span>
                                </div>
                            </div>

                            {data.currentPlatform !== "None" && (
                                <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <label className="text-sm font-semibold text-slate-700 mb-3 block">Which platform are you migrating from?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {LMS_OPTIONS.map(opt => (
                                            <div
                                                key={opt}
                                                onClick={() => updateData('currentPlatform', opt)}
                                                className={cn(
                                                    "p-3 rounded-xl border text-center cursor-pointer transition-all duration-200 font-medium text-sm active:scale-[0.98]",
                                                    data.currentPlatform === opt
                                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/50"
                                                )}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">What frustrates you most?</h2>
                            <p className="text-slate-500 text-sm md:text-base">Select all that apply. We're asking so we can fix it.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {FRUSTRATIONS.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleSelection('frustrations', item.id)}
                                        className={cn(
                                            "p-3 md:p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
                                            data.frustrations.includes(item.id)
                                                ? "border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500"
                                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn("p-2 rounded-lg shrink-0", data.frustrations.includes(item.id) ? "bg-white text-red-500" : "bg-slate-100 text-slate-400")}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-semibold text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">Build your dream cockpit.</h2>
                                <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">What features are non-negotiable for you?</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {FEATURES.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleSelection('desiredFeatures', item.id)}
                                            className={cn(
                                                "p-3 rounded-xl border flex flex-col items-center text-center gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] aspect-square justify-center",
                                                data.desiredFeatures.includes(item.id)
                                                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/50"
                                            )}
                                        >
                                            <item.icon className="w-6 h-6" />
                                            <span className="font-semibold text-xs md:text-sm">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200">
                                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">Ideally, how much would you pay monthly?</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {PRICING.map(price => (
                                        <div
                                            key={price}
                                            onClick={() => updateData('pricingExpectation', price)}
                                            className={cn(
                                                "p-3 rounded-lg border text-center cursor-pointer transition-all duration-200 text-sm font-medium active:scale-[0.98]",
                                                data.pricingExpectation === price
                                                    ? "border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600 shadow-sm"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                            )}
                                        >
                                            {price}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">Final checks.</h2>
                            <p className="text-slate-500 text-sm md:text-base">Secure your lifetime discount and priority support.</p>

                            <div
                                onClick={() => updateData('earlyAccessInterest', !data.earlyAccessInterest)}
                                className={cn(
                                    "p-4 md:p-6 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] mb-4",
                                    data.earlyAccessInterest ? "border-primary bg-primary/5 shadow-sm" : "border-slate-200 bg-white"
                                )}
                            >
                                <div>
                                    <h3 className="font-bold text-base md:text-lg text-slate-900">Enable Early Access</h3>
                                    <p className="text-xs md:text-sm text-slate-500 mt-1">Get 50% off for life + Founding Member badge.</p>
                                </div>
                                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4", data.earlyAccessInterest ? "bg-primary border-primary" : "border-slate-300")}>
                                    {data.earlyAccessInterest && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </div>

                            <div
                                onClick={() => updateData('betaTester', !data.betaTester)}
                                className={cn(
                                    "p-4 md:p-6 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
                                    data.betaTester ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white"
                                )}
                            >
                                <div>
                                    <h3 className="font-bold text-base md:text-lg text-slate-900">Volunteer as Beta Tester</h3>
                                    <p className="text-xs md:text-sm text-slate-500 mt-1">Help shape the future of LearnOrbit.</p>
                                </div>
                                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4", data.betaTester ? "bg-indigo-500 border-indigo-500" : "border-slate-300")}>
                                    {data.betaTester && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">WhatsApp Number (Optional)</label>
                                <Input
                                    placeholder="+91 99999 99999"
                                    value={data.whatsapp}
                                    onChange={(e) => updateData('whatsapp', e.target.value)}
                                    className="bg-white text-base md:text-sm h-12 md:h-10"
                                />
                                <p className="text-[10px] md:text-xs text-slate-400 mt-2">We only use this for unparalleled support. No spam.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Actions */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-4 justify-end">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 border border-red-200 text-sm animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="flex justify-end">
                        {step < totalSteps ? (
                            <Button
                                onClick={handleNext}
                                size="lg"
                                className="w-full md:w-auto px-8 rounded-full font-bold bg-primary hover:bg-primary/90"
                                disabled={!validateStep(step) || loading}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Next Step <ChevronRight className="w-4 h-4 ml-2" /></>}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                size="lg"
                                className="w-full md:w-auto px-8 rounded-full font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                                disabled={loading || !validateStep(step)}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Rocket className="w-5 h-5 mr-2" />}
                                Launch Waitlist
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Success/Existence Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md text-center">
                    <DialogHeader>
                        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Rocket className="w-10 h-10 text-green-600" />
                        </div>
                        <DialogTitle className="text-xl md:text-2xl font-bold text-center">
                            {modalType === "success" ? "Welcome to the Orbit! 🚀" : "You're Already In! 🚀"}
                        </DialogTitle>
                        <DialogDescription className="text-center text-lg mt-2">
                            {modalType === "success"
                                ? "You've secured your spot in the early access."
                                : "Good news! You have already secured your spot."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-slate-500 mb-6">
                            We'll send a transmission to <span className="font-semibold text-slate-800">{submittedEmail}</span>.
                        </p>
                        {modalType === "success" && (
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block text-center w-full">
                                <p className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-widest">Your Ticket ID</p>
                                <p className="text-2xl font-bold text-slate-900 tracking-widest font-mono">ORBIT-{Math.floor(Math.random() * 10000)}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <Button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full">
                            Close & Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ... existing code ...


// --- Component ---

