
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== Contact Email Function Started ===");
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { name, email, phone, service_type, message }: ContactSubmission = await req.json();

    console.log("Processing contact submission:", { name, email, service_type });
    console.log("RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));

    // Save to database
    console.log("Saving to database...");
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        service_type,
        message,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Contact submission saved to database:", data.id);

    // Send email to company
    console.log("Attempting to send email to company...");
    try {
      const emailResponse = await resend.emails.send({
        from: "Contact Form <noreply@gasawa-shipping.com>",
        to: ["info@gasawa-shipping.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${service_type ? `<p><strong>Service Type:</strong> ${service_type}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submission ID: ${data.id}</small></p>
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
        from: "Gasawa Shipping <noreply@gasawa-shipping.com>",
        to: [email],
        subject: "Thank you for contacting Gasawa Shipping",
        html: `
          <h2>Thank you for contacting us, ${name}!</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Best regards,<br>The Gasawa Shipping Team</p>
        `,
      });

      console.log("Confirmation email sent:", confirmationResponse);
      
      if (confirmationResponse.error) {
        console.error("Resend API error for confirmation email:", confirmationResponse.error);
        // Don't throw here as the main email was sent successfully
      }
    } catch (confirmError: any) {
      console.error("Failed to send confirmation email:", confirmError);
      // Don't throw here as the main email was sent successfully
    }

    console.log("=== Contact Email Function Completed Successfully ===");

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
    console.error("=== Error in send-contact-email function ===");
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
