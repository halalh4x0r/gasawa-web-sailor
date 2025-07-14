import { Button } from "@/components/ui/button";
import { Anchor, Menu, Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-maritime-navy to-maritime-ocean rounded-lg flex items-center justify-center">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-maritime-navy">Gasawa Shipping</h1>
              <p className="text-xs text-muted-foreground">Agency Ltd</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-maritime-ocean transition-colors">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-maritime-ocean transition-colors">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-maritime-ocean transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-maritime-ocean transition-colors">
              Contact
            </a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-maritime-ocean" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </div>
            <Button variant="ocean" size="sm">
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;