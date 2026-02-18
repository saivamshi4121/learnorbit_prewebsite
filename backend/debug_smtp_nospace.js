require('dotenv').config();
const nodemailer = require('nodemailer');

async function testConnection() {
    const rawPass = process.env.SMTP_PASS;
    const cleanPass = rawPass.replace(/\s+/g, '');

    console.log('Testing SMTP connection with Clean Password (no spaces)...');
    console.log('Original:', rawPass);
    console.log('CleanED:', cleanPass);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: cleanPass
        },
        debug: true,
        logger: true
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
