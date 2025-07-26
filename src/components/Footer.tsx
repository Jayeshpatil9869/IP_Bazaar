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

          {/* Quick Links with Hover Underline Animation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group relative inline-block text-white/90 hover:text-white uppercase tracking-wide transition-colors duration-200"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                <a
                  href="mailto:sales@infinityconsultants.in"
                  className="text-white/90 text-sm"
                >
                  sales@infinityconsultants.in
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                <span className="text-white/90 text-sm">+91 9811153942</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start text-center md:text-left gap-1">
                <div className="flex justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 text-white/80 mr-2 flex-shrink-0" />
                </div>
                <span className="text-white/90 text-sm break-words whitespace-normal">
                  1/5599 Street No 14, Balbir Nagar Extn, Shahdara, Delhi –
                  110032
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Managed by DigiMirai */}
        <div className="border-t border-white/20 mt-8 pt-4 text-center">
          <p className="text-white/80 text-[2vh]">
            Managed by{" "}
            <a
              href="https://digimirai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/90 underline transition-colors duration-200"
            >
              DigiMirai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
