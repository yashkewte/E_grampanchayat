import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-sidebar-primary" />
              <span className="font-bold text-xl">E-Gram Panchayat</span>
            </div>
            <p className="text-sidebar-foreground/80 text-sm leading-relaxed">
              Digitizing rural governance and bringing government services closer to the people. 
              Your gateway to efficient and transparent village administration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sidebar-foreground/80">Birth Certificate</span>
              </li>
              <li>
                <span className="text-sidebar-foreground/80">Death Certificate</span>
              </li>
              <li>
                <span className="text-sidebar-foreground/80">Income Certificate</span>
              </li>
              <li>
                <span className="text-sidebar-foreground/80">Residence Certificate</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-sidebar-primary" />
                <span className="text-sidebar-foreground/80 text-sm">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-sidebar-primary" />
                <span className="text-sidebar-foreground/80 text-sm">info@egrampanchayat.gov.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-sidebar-primary mt-0.5" />
                <span className="text-sidebar-foreground/80 text-sm">
                  Village Panchayat Office,<br />
                  Main Road, Village Name,<br />
                  District, State - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sidebar-foreground/60 text-sm">
              © 2025 Yash Kewate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sidebar-foreground/60 hover:text-sidebar-primary text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sidebar-foreground/60 hover:text-sidebar-primary text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
