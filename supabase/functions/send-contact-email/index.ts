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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { name, email, phone, service_type, message }: ContactSubmission = await req.json();

    console.log("Processing contact submission:", { name, email, service_type });

    // Save to database
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
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
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

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to user
    const confirmationResponse = await resend.emails.send({
      from: "Gasawa Shipping <onboarding@resend.dev>",
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
    console.error("Error in send-contact-email function:", error);
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