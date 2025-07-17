import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Globe,
  Loader2
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/<[^>]*>/g, '').substring(0, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      service_type: sanitizeInput(formData.service_type),
      message: sanitizeInput(formData.message)
    };
    
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields (name, email, and message).",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database first
      const { data, error: dbError } = await supabase
        .from('contact_submissions')
        .insert([sanitizedData])
        .select();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Send email using secure edge function
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData
      });

      if (emailError) {
        console.error('Email error:', emailError);
        throw emailError;
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service_type: "",
        message: ""
      });

    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Mama Ngina Street,", "International House, 3rd Floor", "Nairobi CBD"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+254 715 348 937", "24/7 Customer Support", "Emergency: +254 715 348 937"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@gasawa-shipping.com", "quotes@gasawa-shipping.com", "support@gasawa-shipping.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "24/7 Emergency Support"]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-maritime-navy via-maritime-deep to-maritime-ocean relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to ship with confidence? Contact our expert team for personalized shipping solutions and competitive quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-maritime-gold rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{info.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-white/80 mb-1">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center space-x-2">
                  <Send className="w-6 h-6" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name" 
                          className="bg-white/10 border-white/30 text-white placeholder-white/60"
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com" 
                          className="bg-white/10 border-white/30 text-white placeholder-white/60"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+254 715 348 937" 
                          className="bg-white/10 border-white/30 text-white placeholder-white/60" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="service_type" className="text-white mb-2 block">Service Type</Label>
                        <Input 
                          id="service_type" 
                          value={formData.service_type}
                          onChange={handleInputChange}
                          placeholder="e.g., Freight Forwarding" 
                          className="bg-white/10 border-white/30 text-white placeholder-white/60" 
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">Message *</Label>
                      <Textarea 
                        id="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your shipping requirements..." 
                        rows={5}
                        className="bg-white/10 border-white/30 text-white placeholder-white/60"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-maritime-gold hover:bg-maritime-gold/90 text-maritime-deep font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <Globe className="w-12 h-12 text-maritime-gold mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Ship Globally?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Gasawa Shipping for their international logistics needs.
          </p>
          <Button variant="hero" size="lg" className="bg-white text-maritime-navy hover:bg-white/90">
            Get Instant Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;