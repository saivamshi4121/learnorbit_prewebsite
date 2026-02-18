# Deployment Guide

Follow these steps to deploy your LearnOrbit application to production.

## 1. Backend Deployment (Render)

1.  **Create a New Web Service**:
    *   Connect your GitHub repository.
    *   **Root Directory**: `backend` (Important: Change this from the root).
    *   **Build Command**: `npm install` (Use default if available, or specify this).
    *   **Start Command**: `node server.js` (Render should detect this from `package.json`).

2.  **Environment Variables**:
    *   Go to the "Environment" tab in your Render service.
    *   Add the following variables:
        *   `SUPABASE_URL`: Your Supabase project URL.
        *   `SUPABASE_KEY`: Your Supabase service role key (or anon key if using client-side auth, but backend usually needs service role).
        *   `SMTP_HOST`: (e.g., `smtp.gmail.com`)
        *   `SMTP_PORT`: `587` (Recommended for Render - port 465 may be blocked)
        *   `SMTP_USER`: Your email address.
        *   `SMTP_PASS`: Your Gmail App Password (NOT your regular password - see below).
        *   `ADMIN_EMAIL`: Email to receive notifications.
        *   `PORT`: `10000` (Render sets this automatically, but your code uses `process.env.PORT` so it's fine).

3.  **Wait for Deployment**:
    *   Once deployed, copy the **Render URL** (e.g., `https://learnorbit-backend.onrender.com`).

## 2. Frontend Deployment (Vercel)

1.  **Import Project**:
    *   Connect your GitHub repository.
    *   **Root Directory**: `learnorbit_prewebsite` (Vercel might auto-detect `Next.js`).

2.  **Build Settings**:
    *   **Framework Preset**: Next.js (Default).
    *   **Build Command**: `npm run build` (Default).
    *   **Output Directory**: `.next` (Default).
    *   **Install Command**: `npm install` (Default).

3.  **Environment Variables**:
    *   Go to "Settings" -> "Environment Variables".
    *   Add:
        *   `NEXT_PUBLIC_API_URL`: The **Render URL** you copied in step 1 (e.g., `https://learnorbit-backend.onrender.com`).
        *   **Note**: Ensure there is no trailing slash unless your code expects it (Your code appends `/api/...` so URL should be base).

4.  **Deploy**:
    *   Click "Deploy". Vercel will build and deploy your frontend.

## 3. Post-Deployment Checks

1.  **Visit your Vercel URL**.
2.  **Test the Waitlist Form**:
    *   Submit a test email.
    *   Check if you receive the "Welcome" email.
    *   Check the Supabase database for the new entry.
    *   Check for any console errors in the browser (F12).

## Important Notes

*   **Database Access**: Ensure your Supabase database allows connections from `0.0.0.0/0` (Allow all IP addresses) since Render uses dynamic IPs. Go to Supabase -> Settings -> Database -> Network Restrictions.
*   **CORS**: Your backend currently allows all origins (`app.use(cors())`). This is fine for now but consider restricting it to your Vercel domain later for security.
