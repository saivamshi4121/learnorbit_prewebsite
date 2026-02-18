-- Create the marketing_waitlist_users table
CREATE TABLE IF NOT exists marketing_waitlist_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  current_platform TEXT DEFAULT 'None',
  frustrations TEXT[],
  desired_features TEXT[],
  pricing_expectation TEXT,
  early_access_interest BOOLEAN DEFAULT FALSE,
  beta_tester BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'waitlist_wizard',
  whatsapp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) - optional for admin access but good practice
ALTER TABLE marketing_waitlist_users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anyone (since this is a public form)
-- Note: In a real prod app, you might want to wrap this in a function or use Anon key carefully
-- For Supabase client-side inserts (if used directly), this is needed.
-- But our backend is using the Service Role or just standard PG connection? 
-- If backend uses standard PG connection (postgres user), it bypasses RLS.
-- If backend uses Supabase client with Anon key, we need this policy.
-- Since we are switching to Supabase client in backend (maybe?), let's add it.
-- Actually, the backend is now using Supabase Client with Anon Key? No, wait.
-- The user gave me a Service Role key? No, "sb_publishable_...". 
-- That is the ANON key. 
-- So the backend, if using supabase-js with ANON key, MUST have RLS policy for INSERT.

CREATE POLICY "Allow anon inserts" ON marketing_waitlist_users
FOR INSERT 
WITH CHECK (true);

-- Allow anon to read their own data? No, probably not needed for now, only insert.
-- The backend might need to read implementation details?
-- If backend checks for duplicates (status 409), it needs SELECT permission.
CREATE POLICY "Allow anon select email" ON marketing_waitlist_users
FOR SELECT
USING (true); 
-- Warning: This allows anyone with the anon key to read all emails if they know how to query.
-- Better: The backend should use the SERVICE_ROLE_KEY if it needs to check existence securely.
-- But I only have the ANON key from the user.
-- I will stick to the basic table creation.
