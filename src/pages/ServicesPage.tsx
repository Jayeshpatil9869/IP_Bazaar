import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { IPServices } from "@/entities/ip-services";
import { Statistics } from "@/entities/statistics";
import {
  FileText,
  Search,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<IPServices[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, statsData] = await Promise.all([
          BaseCrudService.getAll("Services"),
          BaseCrudService.getAll("Statistics"),
        ]);

        setServices(servicesData.items as IPServices[]);
        setStatistics((statsData.items as Statistics[]).slice(0, 4));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const workflowSteps = [
    {
      step: 1,
      title: "Submit Your Request",
      description:
        "Fill out our simple form with your IP requirements and documentation.",
      icon: FileText,
    },
    {
      step: 2,
      title: "Expert Review",
      description:
        "Our IP specialists review your submission and conduct preliminary research.",
      icon: Search,
    },
    {
      step: 3,
      title: "Protection Strategy",
      description:
        "We develop a customized protection strategy tailored to your needs.",
      icon: Shield,
    },
    {
      step: 4,
      title: "File & Monitor",
      description:
        "We file your application and provide ongoing monitoring and support.",
      icon: Award,
    },
  ];

  const getServiceIcon = (serviceName: string) => {
    // Simple icon mapping based on service name
    if (serviceName.toLowerCase().includes("patent")) return FileText;
    if (serviceName.toLowerCase().includes("trademark")) return Award;
    if (serviceName.toLowerCase().includes("copyright")) return Shield;
    return CheckCircle;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-16 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/800"
            alt="Our IP Services Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Our IP Services
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Comprehensive intellectual property solutions designed to protect,
            manage, and maximize the value of your innovations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Complete IP Protection Suite
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              From initial consultation to ongoing management, we cover all
              aspects of IP protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service.serviceName);
              return (
                <Card
                  key={service._id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                      {service.serviceName}
                    </h3>
                    <p className="font-paragraph text-gray-600 mb-4">
                      {service.shortDescription}
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details" className="border-0">
                        <AccordionTrigger className="font-paragraph text-sm text-secondary hover:text-primary py-2 hover:scale-105 transition-all duration-300">
                          Learn More
                        </AccordionTrigger>
                        <AccordionContent className="font-paragraph text-sm text-gray-600 pt-2">
                          {service.detailedDescription}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Process
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              A streamlined approach to IP protection that ensures efficiency
              and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connection line */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-secondary/30 z-0"></div>
                )}

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center relative z-10 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="font-heading text-sm font-semibold text-secondary mb-2">
                      Step {step.step}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="font-paragraph text-sm text-gray-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us - Statistics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Trust Us
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Proven track record of success in intellectual property protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <Card
                key={stat._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="font-heading text-3xl font-bold text-primary mb-2 animate-counter">
                    {stat.statisticValue.toLocaleString()}
                    {stat.unit}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-1">
                    {stat.statisticName}
                  </h3>
                  <p className="font-paragraph text-sm text-gray-600">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                What Sets Us Apart
              </h2>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">
                      Expert Team
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      Licensed IP attorneys and specialists with decades of
                      experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">
                      Global Coverage
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      Comprehensive IP protection across multiple jurisdictions
                      worldwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">
                      Technology-Driven
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      Advanced tools and platforms for efficient IP management
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">
                      Transparent Pricing
                    </h3>
                    <p className="font-paragraph text-gray-600">
                      Clear, upfront pricing with no hidden fees or surprises
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-right">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                  Ready to Protect Your IP?
                </h3>
                <p className="font-paragraph text-gray-600 mb-6">
                  Get started with a free consultation to discuss your
                  intellectual property needs and learn how we can help protect
                  your innovations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 group">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-paragraph">
                      Free initial consultation
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-paragraph">
                      No obligation assessment
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 group">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-paragraph">
                      Expert recommendations
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/600"
            alt="Start Your IP Journey Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Start Your IP Journey
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait to protect your innovations. Get started today with our
            comprehensive IP services and secure your competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
          variant="secondary"
                className="font-paragraph border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300" 
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
