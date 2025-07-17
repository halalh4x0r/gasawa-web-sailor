-- Fix RLS policies for quote_requests to allow anonymous submissions
DROP POLICY IF EXISTS "Allow quote request submissions" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow quote submissions for all users" ON public.quote_requests;
DROP POLICY IF EXISTS "Service role can manage quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Users can view their own quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Public can view quote requests" ON public.quote_requests;

-- Create clean policies for anonymous and authenticated users
CREATE POLICY "Enable insert for all users"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access"
ON public.quote_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Users can view their own requests"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Anonymous can view all requests"
ON public.quote_requests
FOR SELECT
TO anon
USING (true);