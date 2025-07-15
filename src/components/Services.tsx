import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Ship, 
  Package, 
  Truck, 
  FileText, 
  Shield, 
  Clock,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Ship,
      title: "Freight Forwarding",
      description: "Comprehensive sea freight solutions for containers, break bulk, and project cargo worldwide.",
      features: ["FCL & LCL Shipments", "Door-to-Door Service", "Cargo Consolidation"]
    },
    {
      icon: FileText,
      title: "Port Agency Services",
      description: "Comprehensive vessel calls coordination and port services management.",
      features: ["Vessel calls coordination (arrival, berthing & departure)", "Documentation & clearance (customs, immigration, port authority)", "Local liaison with terminal operators, port authorities and service providers", "Bunker procurement and fresh water arrangements", "Cost control and disbursement account preparation"]
    },
    {
      icon: Truck,
      title: "Logistics & Transport",
      description: "End-to-end logistics solutions including inland transportation and warehousing.",
      features: ["Inland Transportation", "Warehousing", "Distribution Services"]
    },
    {
      icon: Package,
      title: "Cargo Handling",
      description: "Professional cargo handling services with specialized equipment and trained personnel.",
      features: ["Loading & Unloading", "Cargo Inspection", "Special Cargo Handling"]
    },
    {
      icon: Shield,
      title: "Husbandry & Crew Support",
      description: "Complete crew management and vessel husbandry services for maritime operations.",
      features: ["Crew changes (embarkation/disembarkation, visas, transportation)", "Provisions & ship stores supply", "Fresh water supply & bunkering coordination", "Hull cleaning & underwater inspection coordination", "Medical assistance and repatriation arrangements"]
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support and real-time cargo tracking for peace of mind.",
      features: ["Live Tracking", "Emergency Support", "Regular Updates"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-maritime-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-maritime-navy mb-6">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive shipping and logistics solutions tailored to meet your global trade requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-maritime-ocean to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-maritime-navy">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-maritime-ocean mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="group-hover:bg-maritime-ocean group-hover:text-white transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ocean" size="lg" className="text-lg px-8">
            Request Custom Quote
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;