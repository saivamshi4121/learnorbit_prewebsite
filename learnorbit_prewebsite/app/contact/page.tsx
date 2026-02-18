import WaitlistWizard from "@/components/WaitlistWizard";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen py-12 md:py-24 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Join the Orbit</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We are currently in private beta. Fill out the application below to request early access and secure lifetime pricing.
                    </p>
                </div>

                {/* Main Wizard */}
                <div className="w-full max-w-3xl mx-auto mb-20 relative z-10">
                    <WaitlistWizard />
                </div>

                {/* Secondary Contact Details */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-slate-900">Other ways to connect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
                                <p className="text-sm text-slate-500">
                                    support@learnorbit.com
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">HQ</h3>
                                <p className="text-sm text-slate-500">
                                    Hyderabad, India
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
