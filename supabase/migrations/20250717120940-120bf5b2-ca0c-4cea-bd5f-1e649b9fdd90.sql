-- Fix RLS policies for contact_submissions to allow anonymous submissions
DROP POLICY IF EXISTS "Allow contact form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON public.contact_submissions;

-- Create clean policies for anonymous and authenticated users
CREATE POLICY "Enable contact form inserts for all users"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access for contact submissions"
ON public.contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);