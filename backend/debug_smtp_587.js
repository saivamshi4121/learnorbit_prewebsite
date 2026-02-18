require('dotenv').config();
const nodemailer = require('nodemailer');

async function testConnection() {
    console.log('Testing SMTP connection (Port 587)...');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
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
