import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@ipbazaar.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 IP Street, Tech City, TC 12345",
      description: "Our main office location",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM EST",
      description: "Weekend support available",
    },
  ];

  const faqs = [
    {
      question: "How long does the patent application process take?",
      answer:
        "The patent application process typically takes 18-36 months, depending on the complexity of the invention and the jurisdiction. We provide regular updates throughout the process.",
    },
    {
      question: "What documents do I need for a trademark application?",
      answer:
        "You'll need a clear representation of your mark, a description of goods/services, and proof of use in commerce (if applicable). Our team will guide you through the complete documentation process.",
    },
    {
      question: "Do you offer international IP protection?",
      answer:
        "Yes, we provide comprehensive international IP protection services across multiple jurisdictions including the US, EU, Asia-Pacific, and other key markets worldwide.",
    },
    {
      question: "What are your consultation fees?",
      answer:
        "We offer a free initial consultation to assess your IP needs. Our transparent pricing structure will be provided during the consultation based on your specific requirements.",
    },
    {
      question: "How do you ensure confidentiality?",
      answer:
        "We maintain strict confidentiality protocols and can provide Non-Disclosure Agreements (NDAs) before any detailed discussions about your intellectual property.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-16 py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/800"
            alt="Get in Touch Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Ready to protect your intellectual property? Contact our expert team
            for personalized guidance and comprehensive IP solutions.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-left">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <Label
                        htmlFor="name"
                        className="font-paragraph text-sm font-medium text-gray-700"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 font-paragraph transition-all duration-300 focus:scale-105 border-2 border-gray-300 focus:border-primary bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="group">
                      <Label
                        htmlFor="email"
                        className="font-paragraph text-sm font-medium text-gray-700"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 font-paragraph transition-all duration-300 focus:scale-105 border-2 border-gray-300 focus:border-primary bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <Label
                      htmlFor="subject"
                      className="font-paragraph text-sm font-medium text-gray-700"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1 font-paragraph transition-all duration-300 focus:scale-105 border-2 border-gray-300 focus:border-primary bg-white"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div className="group">
                    <Label
                      htmlFor="message"
                      className="font-paragraph text-sm font-medium text-gray-700"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="mt-1 font-paragraph transition-all duration-300 focus:scale-105 border-2 border-gray-300 focus:border-primary bg-white resize-none"
                      placeholder="Please describe your IP needs or questions in detail..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-paragraph bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in-right">
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                  Contact Information
                </h2>
                <p className="font-paragraph text-gray-600 mb-8">
                  Get in touch with our team through any of the following
                  channels. We're here to help with all your intellectual
                  property needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-primary mb-1">
                            {info.title}
                          </h3>
                          <p className="font-paragraph text-sm font-medium text-gray-900 mb-1">
                            {info.content}
                          </p>
                          <p className="font-paragraph text-xs text-gray-600">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-accent to-secondary/20 rounded-lg flex items-center justify-center group">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="font-paragraph text-gray-600">
                        Interactive Map
                      </p>
                      <p className="font-paragraph text-sm text-gray-500">
                        123 IP Street, Tech City
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Quick answers to common questions about our IP services
            </p>
          </div>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-heading font-semibold text-primary text-left hover:text-primary/80 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-gray-600 ml-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/api/placeholder/1920/600"
            alt="Let's Start Securing Your IP Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Let's Start Securing Your IP
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't leave your intellectual property unprotected. Contact us today
            for a free consultation and take the first step towards
            comprehensive IP protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/services">
              <Button
                size="lg"
               variant="secondary"
                className="font-paragraph border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
