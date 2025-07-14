import { Button } from "@/components/ui/button";
import { ArrowRight, Ship, Globe, Clock } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroShip})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-maritime-deep/90 via-maritime-navy/80 to-maritime-ocean/70"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-16">
        <div className="max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Global Shipping
              <span className="text-maritime-gold block">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Your trusted partner for reliable freight forwarding, logistics, and shipping services across international waters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Get Shipping Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Ship className="w-8 h-8 text-maritime-gold" />
                <span className="text-3xl font-bold text-white">500+</span>
              </div>
              <p className="text-white/80">Ships Serviced</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="w-8 h-8 text-maritime-gold" />
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-white/80">Global Ports</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-8 h-8 text-maritime-gold" />
                <span className="text-3xl font-bold text-white">24/7</span>
              </div>
              <p className="text-white/80">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;