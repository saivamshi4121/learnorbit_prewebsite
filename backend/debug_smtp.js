require('dotenv').config();
const nodemailer = require('nodemailer');

async function testConnection() {
    console.log('Testing SMTP connection...');
    console.log('Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
    console.log('Port:', process.env.SMTP_PORT || 587);
    console.log('User:', process.env.SMTP_USER);

    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        debug: true, // Enable debug output
        logger: true  // Log to console
    });

    try {
        console.log('Verifying...');
        await transporter.verify();
        console.log('✓ Connection successful!');
    } catch (error) {
        console.error('✗ Connection failed:');
        console.error(error);
    }
}

testConnection();
