-- Add user_id column to quote_requests table
ALTER TABLE public.quote_requests 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing policy
DROP POLICY IF EXISTS "Public can insert quote requests" ON public.quote_requests;

-- Create new policy requiring authentication
CREATE POLICY "Allow authenticated insert"
ON public.quote_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());