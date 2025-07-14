import { Anchor, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-maritime-deep text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-maritime-ocean to-accent rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Gasawa Shipping</h3>
                <p className="text-sm text-white/70">Agency Ltd</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your trusted global shipping partner, connecting businesses worldwide with reliable, efficient, and professional maritime solutions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-white/60 hover:text-maritime-gold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/60 hover:text-maritime-gold cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-white/60 hover:text-maritime-gold cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-white/60 hover:text-maritime-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Contact', 'Careers', 'News'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-maritime-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                'Freight Forwarding',
                'Customs Clearance',
                'Logistics & Transport',
                'Cargo Handling',
                'Marine Insurance',
                'Project Cargo'
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-white/70 hover:text-maritime-gold transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-maritime-gold mt-1 flex-shrink-0" />
                <div className="text-white/70">
                  <p>Mama Ngina Street,</p>
                  <p>International House, 3rd Floor</p>
                  <p>Nairobi CBD</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-maritime-gold flex-shrink-0" />
                <div className="text-white/70">
                  <p>+254 715 348 937</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-maritime-gold flex-shrink-0" />
                <div className="text-white/70">
                  <p>info@gasawa-shipping.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Gasawa Shipping Agency Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-maritime-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-maritime-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-maritime-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;