require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

// ... (existing imports)
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client Initialized with URL:', supabaseUrl);

// Routes
app.get('/', (req, res) => {
    res.send('LearnOrbit Backend API is running with Supabase.');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 465, // Use SSL
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Helper to send email
async function sendEmail(to, subject, html) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
}

// Check if email exists
app.post('/api/marketing/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const { data, error } = await supabase
            .from('marketing_waitlist_users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error('Supabase check error:', error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (data) {
            return res.status(200).json({ exists: true, message: 'Email already registered' });
        }

        return res.status(200).json({ exists: false });
    } catch (err) {
        console.error('Server check error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Marketing Waitlist Route
app.post('/api/marketing/waitlist', async (req, res) => {
    try {
        const {
            fullName,
            email,
            role,
            currentPlatform,
            frustrations,
            desiredFeatures,
            pricingExpectation,
            earlyAccessInterest,
            betaTester,
            source
        } = req.body;

        // Basic validation
        if (!email || !fullName || !role) {
            return res.status(400).json({ message: 'Missing required fields: email, fullName, role' });
        }

        // Prepare data for Supabase
        const dbData = {
            full_name: fullName,
            email: email,
            role: role,
            current_platform: currentPlatform,
            frustrations: frustrations || [],
            desired_features: desiredFeatures || [],
            pricing_expectation: pricingExpectation,
            early_access_interest: earlyAccessInterest || false,
            beta_tester: betaTester || false,
            source: source || 'unknown',
        };

        // Insert into 'marketing_waitlist_users' table
        const { data, error } = await supabase
            .from('marketing_waitlist_users')
            .insert([dbData])
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            if (error.code === '23505') { // Unique violation for email
                return res.status(409).json({ message: 'Email already registered.' });
            }
            return res.status(500).json({ message: 'Database error', details: error.message });
        }

        // --- Send Emails ---

        // 1. Email to User
        const userHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-top: 40px; margin-bottom: 40px; }
                    .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 40px 0; text-align: center; }
                    .logo { font-size: 24px; font-weight: bold; color: white; letter-spacing: 1px; text-decoration: none; }
                    .content { padding: 40px; color: #334155; line-height: 1.6; }
                    .highlight { color: #2563EB; font-weight: bold; }
                    .ticket-box { background-color: #F1F5F9; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0; }
                    .ticket-label { font-size: 12px; text-transform: uppercase; color: #64748B; letter-spacing: 2px; font-weight: bold; margin-bottom: 5px; }
                    .ticket-id { font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #0F172A; letter-spacing: 2px; }
                    .footer { background-color: #F8FAFC; padding: 20px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0; }
                    .btn { display: inline-block; background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 99px; font-weight: bold; margin-top: 20px; }
                    .role-badge { display: inline-block; background-color: #DBEAFE; color: #1E40AF; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-top: 5px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🚀 LEARN ORBIT</div>
                    </div>
                    <div class="content">
                        <h1 style="color: #0F172A; margin-top: 0; font-size: 24px;">Welcome to the future, ${fullName.split(' ')[0]}.</h1>
                        <p>You have successfully initialized your sequence for the <strong>LearnOrbit</strong> private beta. The systems are warming up, and we are preparing for liftoff.</p>
                        
                        <div class="ticket-box">
                            <div class="ticket-label">Boarding Pass</div>
                            <div class="ticket-id">ORBIT-${data[0].id.substring(0, 8).toUpperCase()}</div>
                            <div class="role-badge">${role}</div>
                        </div>

                        <p>We are building the ultimate ecosystem for creators and learners. As an early adopter, you've secured:</p>
                        <ul style="padding-left: 20px; margin-bottom: 30px;">
                            <li style="margin-bottom: 10px;">🔒 <strong>Lifetime Priority Access</strong></li>
                            <li style="margin-bottom: 10px;">✨ <strong>Founding Member Badge</strong></li>
                            <li style="margin-bottom: 10px;">💸 <strong>Exclusive Early-Bird Pricing</strong></li>
                        </ul>

                        <p>Stand by for further transmissions. We will notify you the moment your access pod is ready.</p>

                        <div style="text-align: center; margin-top: 40px;">
                            <a href="#" class="btn" style="color: #ffffff;">Prepare for Launch</a>
                        </div>
                    </div>
                    <div class="footer">
                        &copy; ${new Date().getFullYear()} LearnOrbit. All systems normal.<br>
                        Hyderabad, India.
                    </div>
                </div>
            </body>
            </html>
        `;
        // Send asynchronously without blocking response
        sendEmail(email, 'Welcome to LearnOrbit Early Access! 🚀', userHtml);

        // 2. Email to Admin
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>New Waitlist Sign-up! 🎉</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Current Platform:</strong> ${currentPlatform}</p>
                <p><strong>Pricing Expectation:</strong> ${pricingExpectation}</p>
                <p><strong>Early Access:</strong> ${earlyAccessInterest ? 'Yes' : 'No'}</p>
                <p><strong>Beta Tester:</strong> ${betaTester ? 'Yes' : 'No'}</p>
                <p><strong>Source:</strong> ${source}</p>
            </div>
        `;
        sendEmail(process.env.ADMIN_EMAIL || process.env.SMTP_USER, `New Waitlist: ${fullName} (${role})`, adminHtml);

        return res.status(201).json({ message: 'Successfully joined waitlist', user: data ? data[0] : null });

    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
