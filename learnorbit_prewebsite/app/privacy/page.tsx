export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-muted">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl bg-card p-8 md:p-12 rounded-xl shadow-sm border border-border">
                <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        At LearnOrbit, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.
                    </p>

                    <h2 className="text-xl font-bold text-foreground">Information We Collect</h2>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                    </p>

                    <h2 className="text-xl font-bold text-foreground">How We Use Your Information</h2>
                    <p>
                        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send administrative information to you.</li>
                        <li>To fulfill and manage your orders.</li>
                        <li>To post testimonials.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may email us at privacy@learnorbit.com or by post to:
                    </p>
                    <p className="italic">
                        LearnOrbit Inc.<br />
                        123 Innovation Drive<br />
                        Tech Park, CA 94103
                    </p>
                </div>
            </div>
        </div>
    );
}
