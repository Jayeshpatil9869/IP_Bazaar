import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Shield className="h-8 w-8 text-white mr-2" />
              <span className="text-2xl font-bold text-white">IPV4Bazaar</span>
            </div>
            <p className="text-white/90 leading-relaxed">
              Your trusted partner for comprehensive intellectual property
              management services.
            </p>
            <p className="text-white/80 text-sm mt-2">
              © 2024 IPV4Bazaar. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/90 hover:text-white transition-colors duration-200 block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/90 hover:text-white transition-colors duration-200 block"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/90 hover:text-white transition-colors duration-200 block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                <a href="mailto:sales@infinityconsultants.in" className="text-white/90 text-sm">sales@infinityconsultants.in</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                <span className="text-white/90 text-sm">+91 9811153942</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                <span className="text-white/90 text-sm">
                  1/5599 Street No 14, Balbir Nagar Extn., Shahdara, Delhi – 110032
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
