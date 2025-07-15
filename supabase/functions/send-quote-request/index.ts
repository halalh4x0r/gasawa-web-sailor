import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country: string;
  port_name: string;
  vessel_type: string;
  grt_nrt: string;
  dwt: string;
  loa_beam: string;
  built: string;
  crane_capacity: string;
  commodity: string;
  quantity: string;
  additional_notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== Quote Request Function Started ===");
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const quoteData: QuoteRequest = await req.json();

    console.log("Processing quote request:", { name: quoteData.name, email: quoteData.email });
    console.log("RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));

    // Save to database
    console.log("Saving quote request to database...");
    const { data, error: dbError } = await supabase
      .from('quote_requests')
      .insert(quoteData)
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Quote request saved to database:", data.id);

    // Send email to company
    console.log("Attempting to send email to company...");
    try {
      const emailResponse = await resend.emails.send({
        from: "Quote Request <onboarding@resend.dev>",
        to: ["info@gasawa-shipping.com"],
        subject: `New Quote Request from ${quoteData.name}`,
        html: `
          <h2>New Quote Request</h2>
          
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${quoteData.name}</p>
          <p><strong>Email:</strong> ${quoteData.email}</p>
          ${quoteData.phone ? `<p><strong>Phone:</strong> ${quoteData.phone}</p>` : ''}
          ${quoteData.company ? `<p><strong>Company:</strong> ${quoteData.company}</p>` : ''}
          
          <h3>Port Information</h3>
          <p><strong>Country:</strong> ${quoteData.country}</p>
          <p><strong>Port Name:</strong> ${quoteData.port_name}</p>
          
          <h3>Vessel Information</h3>
          <p><strong>Vessel Type:</strong> ${quoteData.vessel_type}</p>
          <p><strong>GRT/NRT:</strong> ${quoteData.grt_nrt}</p>
          <p><strong>DWT:</strong> ${quoteData.dwt}</p>
          <p><strong>LOA/BEAM:</strong> ${quoteData.loa_beam}</p>
          <p><strong>Built:</strong> ${quoteData.built}</p>
          <p><strong>Crane Capacity:</strong> ${quoteData.crane_capacity}</p>
          
          <h3>Cargo Information</h3>
          <p><strong>Commodity:</strong> ${quoteData.commodity}</p>
          <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
          
          ${quoteData.additional_notes ? `<h3>Additional Notes</h3><p>${quoteData.additional_notes.replace(/\n/g, '<br>')}</p>` : ''}
          
          <hr>
          <p><small>Request ID: ${data.id}</small></p>
        `,
      });

      console.log("Company email sent successfully:", emailResponse);
      
      if (emailResponse.error) {
        console.error("Resend API error for company email:", emailResponse.error);
        throw new Error(`Email delivery failed: ${emailResponse.error.message}`);
      }
    } catch (emailError: any) {
      console.error("Failed to send company email:", emailError);
      throw new Error(`Failed to send notification email: ${emailError.message}`);
    }

    // Send confirmation email to user
    console.log("Attempting to send confirmation email to user...");
    try {
      const confirmationResponse = await resend.emails.send({
        from: "Gasawa Shipping <onboarding@resend.dev>",
        to: [quoteData.email],
        subject: "Quote Request Received - Gasawa Shipping",
        html: `
          <h2>Thank you for your quote request, ${quoteData.name}!</h2>
          <p>We have received your quote request and will prepare a detailed quotation for you as soon as possible.</p>
          
          <h3>Your Request Details:</h3>
          <p><strong>Port:</strong> ${quoteData.port_name}, ${quoteData.country}</p>
          <p><strong>Vessel Type:</strong> ${quoteData.vessel_type}</p>
          <p><strong>Commodity:</strong> ${quoteData.commodity}</p>
          <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
          
          <p>Our team will review your requirements and contact you within 24 hours with a comprehensive quotation.</p>
          
          <p>Best regards,<br>The Gasawa Shipping Team</p>
          <p><small>Reference: ${data.id}</small></p>
        `,
      });

      console.log("Confirmation email sent:", confirmationResponse);
      
      if (confirmationResponse.error) {
        console.error("Resend API error for confirmation email:", confirmationResponse.error);
      }
    } catch (confirmError: any) {
      console.error("Failed to send confirmation email:", confirmError);
    }

    console.log("=== Quote Request Function Completed Successfully ===");

    return new Response(JSON.stringify({ 
      success: true, 
      id: data.id,
      emailSent: true 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("=== Error in send-quote-request function ===");
    console.error("Error details:", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);