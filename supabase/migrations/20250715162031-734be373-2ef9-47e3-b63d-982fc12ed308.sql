-- Create quote_requests table
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Port Information
  country TEXT NOT NULL,
  port_name TEXT NOT NULL,
  
  -- Vessel Information
  vessel_type TEXT NOT NULL,
  grt_nrt TEXT NOT NULL,
  dwt TEXT NOT NULL,
  loa_beam TEXT NOT NULL,
  built TEXT NOT NULL,
  crane_capacity TEXT NOT NULL,
  
  -- Cargo Information
  commodity TEXT NOT NULL,
  quantity TEXT NOT NULL,
  
  -- Additional Information
  additional_notes TEXT,
  
  -- File attachment (will store file path/URL)
  attachment_url TEXT,
  
  -- Status and timestamps
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since this is a public form)
CREATE POLICY "Anyone can insert quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (view all requests)
CREATE POLICY "Service role can view all quote requests" 
ON public.quote_requests 
FOR SELECT 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_status ON public.quote_requests(status);