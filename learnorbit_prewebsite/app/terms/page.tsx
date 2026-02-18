import Link from "next/link";

export default function TermsOfService() {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-muted">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl bg-card p-8 md:p-12 rounded-xl shadow-sm border border-border">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
                <p className="text-muted-foreground mb-8 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-slate max-w-none text-muted-foreground space-y-8">
                    <section className="space-y-4">
                        <p className="text-lg font-medium text-foreground">
                            Welcome to LearnOrbit. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">1. Accounts</h2>
                        <p>
                            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p>
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">2. Content Ownership</h2>
                        <p>
                            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                        </p>
                        <p>
                            <strong>We do not claim ownership of your content.</strong> By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service only as necessary to provide the Service to you and your students.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">3. Usage & Prohibited Activities</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                            <li>You agree not to modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service.</li>
                            <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.</li>
                            <li>Harassment, hate speech, and abuse of any kind will not be tolerated and result in immediate account termination.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">4. Subscriptions & Fees</h2>
                        <p>
                            Certain parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle").
                        </p>
                        <p>
                            We reserve the right to modify our fee structure at any time and will provide users with reasonable notice of any changes. Your continued use of the Service after the fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">5. Termination</h2>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">6. Limitation of Liability</h2>
                        <p>
                            In no event shall LearnOrbit, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">7. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="space-y-4 border-t border-border pt-8">
                        <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <div className="font-medium text-foreground">
                            <p>Email: legal@learnorbit.com</p>
                            <p>Support: <Link href="/contact" className="text-primary hover:underline">Content Page</Link></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
