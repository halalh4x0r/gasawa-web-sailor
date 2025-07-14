import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, MapPin, TrendingUp } from "lucide-react";
import portOperations from "@/assets/port-operations.jpg";

const About = () => {
  const stats = [
    { icon: Users, value: "25+", label: "Years Experience" },
    { icon: Award, value: "1000+", label: "Satisfied Clients" },
    { icon: MapPin, value: "50+", label: "Global Locations" },
    { icon: TrendingUp, value: "99%", label: "On-Time Delivery" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-maritime-navy mb-6">
              Trusted Maritime
              <span className="text-maritime-ocean block">Excellence</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground mb-8">
              <p>
                For over two decades, Gasawa Shipping Agency Ltd has been at the forefront of international shipping and logistics, connecting businesses to global markets with unmatched reliability and expertise.
              </p>
              <p>
                Our comprehensive suite of services, combined with deep industry knowledge and strategic partnerships worldwide, ensures that your cargo reaches its destination safely, efficiently, and on time.
              </p>
              <p>
                We pride ourselves on building lasting relationships with our clients, offering personalized solutions that adapt to the ever-changing demands of global trade.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-maritime-light border-0">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-maritime-ocean mx-auto mb-3" />
                    <div className="text-3xl font-bold text-maritime-navy mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="maritime" size="lg">
                Our Story
              </Button>
              <Button variant="outline" size="lg">
                Meet Our Team
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={portOperations} 
                alt="Port Operations" 
                className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maritime-navy/20 to-transparent"></div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 animate-float">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-maritime-ocean to-accent rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-maritime-navy">ISO Certified</div>
                  <div className="text-sm text-muted-foreground">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;