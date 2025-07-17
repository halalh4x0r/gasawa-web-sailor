-- Fix database function security by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admin can view all submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow quote submissions for all users" ON public.quote_requests;
DROP POLICY IF EXISTS "Public can view quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Service role can view all quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Users can view their own quote requests" ON public.quote_requests;

-- Create more restrictive policies for contact_submissions
CREATE POLICY "Service role can manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role')
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create more restrictive policies for quote_requests  
CREATE POLICY "Service role can manage quote requests"
ON public.quote_requests
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role')
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow quote request submissions"
ON public.quote_requests
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own quote requests"
ON public.quote_requests
FOR SELECT
USING (auth.uid() = user_id);