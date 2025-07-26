import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { IPServices } from "@/entities/ip-services";
import {
  Zap,
  Users,
  Globe,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Play,
  Network,
  Server,
  FileText,
  DollarSign,
  UserCheck,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const [services, setServices] = useState<IPServices[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { items } = await BaseCrudService.getAll("Services");
        setServices((items as IPServices[]).slice(0, 6));
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };
    loadServices();
  }, []);

  const coreFeatures = [
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Complete transfers in hours, not weeks — thanks to our smart-matching and automated process.",
    },
    {
      icon: Shield,
      title: "RIR-Compliant Transfers",
      description: "Full compliance with ARIN, RIPE, APNIC, LACNIC, and AFRINIC policies. We handle the paperwork.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with verified brokers, ISPs, and enterprises from around the world.",
    },
  ];

  const ipServices = [
    {
      icon: Network,
      title: "Buy IPv4 Addresses",
      description: "From /24 to /16 blocks — discover verified, transfer-ready addresses.",
    },
    {
      icon: DollarSign,
      title: "Sell Your IPv4",
      description: "Monetize unused assets with high-demand buyers.",
    },
    {
      icon: FileText,
      title: "Secure IPv4 Marketplace",
      description: "Buy and sell IPv4 blocks with escrow-backed security and full IP ownership protection.",
    },
    {
      icon: Users,
      title: "Transfer Support",
      description: "We guide you through ARIN, RIPE, APNIC, AFRINIC, and LACNIC procedures.",
    },
    {
      icon: Award,
      title: "Valuation & Audit",
      description: "Get expert insight on IPv4 market pricing and asset worth.",
    },
    {
      icon: Lock,
      title: "Escrow & Compliance",
      description: "Licensed escrow partners for safe, secure fund handling.",
    },
    {
      icon: Globe,
      title: "Verified IPv4 Exchange",
      description: "Trade IPv4 blocks securely with escrow, fraud protection, and compliance support.",
    },
    {
      icon: Server,
      title: "IPv6 Transition Help",
      description: "Prepare your infrastructure for the future with our guidance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/api/placeholder/1920/"
          >
            <source src="Bg_Video.mp4" type="video/mp4" />  
            {/* Fallback gradient if video doesn't load */}
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/60 to-secondary/10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-3   animate-fade-in-up">
              The #1 Marketplace for
              <span className="block text-secondary-foreground bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent animate-gradient pb-2">
              Buying Selling IPv4 Addresses
              </span>
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              IPv4 addresses are running out — IPV4Bazaar connects you with verified buyers and sellers for secure, fast, and cost-effective IP address transactions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="font-paragraph bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Choose IPV4Bazaar?
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-3xl mx-auto">
              IPV4Bazaar simplifies the process of acquiring and monetizing IPv4 addresses. Our platform is designed for everyone — from tech startups to Fortune 500s — ensuring secure, compliant, and cost-effective IP transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-primary-blue" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white mb-8">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🚀</div>
                  <h3 className="font-heading text-xl font-bold">Our Mission</h3>
                </div>
                <p className="font-paragraph text-white/90">
                  To make IP address trading as easy and secure as buying a domain name — empowering digital growth across the globe.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="font-heading text-2xl font-bold text-primary">2024</div>
                  <div className="font-paragraph text-sm text-gray-600">Established</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="font-heading text-2xl font-bold text-primary">100+</div>
                  <div className="font-paragraph text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="font-heading text-2xl font-bold text-primary">1000+</div>
                  <div className="font-paragraph text-sm text-gray-600">IPs Traded</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button
                    variant="default"
                    size="lg"
                    className="font-paragraph hover:scale-105 transition-all duration-300"
                  >
                    Learn About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/827498286/photo/those-who-work-hard-win.jpg?s=612x612&w=0&k=20&c=hqwocb0QhAalyXDV2MqGXpJJNiGr62db4NSOqtZtT5k="
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our IP Services Section */}
      <section className="py-16 bg-lighter-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              A Complete Suite of IPv4 Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ipServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-primary-blue" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-gray-600 mb-4">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-block group relative">
              <Button
                variant="link"
                size="lg"
                className="font-paragraph hover:scale-105 transition-all duration-300 text-primary"
              >
                <span className="relative">
                  View All Services
        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-right scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left" />
      </span>
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </Link>
</div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://larus.net/assets/frontend/images/home/home_banner_bg.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Buy, Sell, or Rent IPv4?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join 1000+ businesses using IPV4Bazaar to power their digital infrastructure. Fast approvals, verified assets, and expert support at every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="default"
                className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
              >
                List Your IP Block
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="default"
              className="font-paragraph border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
            >
              Browse Available Addresses
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
