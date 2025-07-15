-- Drop existing policy that requires authentication
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.quote_requests;

-- Create new policy allowing anonymous quote submissions
CREATE POLICY "Allow anonymous quote submissions"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Make user_id column nullable (it already is, but being explicit)
-- This allows anonymous submissions while still storing user_id if user is logged in