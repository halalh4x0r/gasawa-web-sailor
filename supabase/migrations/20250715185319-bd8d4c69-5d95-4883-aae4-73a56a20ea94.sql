-- Drop existing policy and recreate it properly
DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.quote_requests;

-- Create a policy that allows anonymous users to insert quote requests
CREATE POLICY "Enable insert for anonymous users" ON public.quote_requests
FOR INSERT TO anon
WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON public.quote_requests
FOR INSERT TO authenticated
WITH CHECK (true);