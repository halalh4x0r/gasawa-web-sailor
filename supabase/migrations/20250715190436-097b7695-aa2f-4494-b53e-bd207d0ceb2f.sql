-- Drop existing insert policies and create a more permissive one
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.quote_requests;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.quote_requests;

-- Create a single policy that allows anyone to insert quote requests
CREATE POLICY "Public can insert quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);