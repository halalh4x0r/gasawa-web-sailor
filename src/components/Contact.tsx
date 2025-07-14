import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Globe
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["123 Harbor View Drive", "Maritime District", "Port City, PC 12345"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Emergency: +1 (555) 999-0000"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@gasawashipping.com", "quotes@gasawashipping.com", "support@gasawashipping.com"]
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                    <Input id="name" placeholder="Your full name" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">Service Type</Label>
                    <Input id="service" placeholder="e.g., Freight Forwarding" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your shipping requirements..." 
                    rows={5}
                    className="bg-white/10 border-white/30 text-white placeholder-white/60"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full bg-maritime-gold hover:bg-maritime-gold/90 text-maritime-deep">
                  Send Message
                  <Send className="w-5 h-5" />
                </Button>
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