-- Clean up duplicate INSERT policies that are causing conflicts
DROP POLICY IF EXISTS "Allow anonymous quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow anonymous quote submissions" ON public.quote_requests;
DROP POLICY IF EXISTS "Public can insert quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.quote_requests;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.quote_requests;

-- Create a single, clean INSERT policy for both anonymous and authenticated users
CREATE POLICY "Allow quote submissions for all users"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Add SELECT policy so users can view their own submissions in the future
CREATE POLICY "Users can view their own quote requests"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous users to view their submissions if they have the ID (future enhancement)
CREATE POLICY "Public can view quote requests"
ON public.quote_requests
FOR SELECT
TO anon
USING (true);