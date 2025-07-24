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

  const features = [
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick turnaround times for all your IP needs",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 support from IP professionals",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Worldwide IP protection and services",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/api/placeholder/1920/1080"
          >
            <source src="/ip.mp4" type="video/mp4" />
            {/* Fallback gradient if video doesn't load */}
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Protect Your Ideas with
              <span className="block text-secondary-foreground bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent animate-gradient">
                Professional IP Services
              </span>
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Comprehensive intellectual property management solutions for
              businesses worldwide. From patents to trademarks, we've got you
              covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button
                size="lg"
                className="font-paragraph bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

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

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-accent/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                Why Choose IPBazaar?
              </h2>
              <p className="font-paragraph text-lg text-gray-600 mb-6">
                With over a decade of experience in intellectual property
                management, we provide comprehensive solutions that protect and
                enhance your business assets.
              </p>
              <p className="font-paragraph text-gray-600 mb-8">
                Our team of experts ensures your intellectual property is
                properly protected, managed, and leveraged for maximum business
                value.
              </p>
              <Link to="/about">
                <Button className="font-paragraph bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                  Learn About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-right">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    Our Mission
                  </h3>
                </div>
                <p className="font-paragraph text-gray-600 mb-4">
                  To democratize intellectual property protection and make it
                  accessible to businesses of all sizes worldwide.
                </p>
                <div className="flex items-center text-sm text-secondary">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-paragraph">Established 2020</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our IP Services
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive intellectual property solutions tailored to your
              business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                    {service.serviceName}
                  </h3>
                  <p className="font-paragraph text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <Badge
                    variant="secondary"
                    className="font-paragraph text-xs hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    Learn More
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button
                variant="link"
                size="lg"
                className="font-paragraph hover:scale-105 transition-all duration-300"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/600"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust IPBazaar with their
            intellectual property needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="secondary"
                className="font-paragraph border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
