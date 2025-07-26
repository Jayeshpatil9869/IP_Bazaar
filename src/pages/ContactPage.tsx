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
      content: "sales@infinityconsultants.in",
      description: "For sales & support inquiries",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 9811153942",
      description: "Mon-Fri, 9 AM-5 PM UTC",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "1/5599 Street No 14, Balbir Nagar Extn., Shahdara, Delhi – 110032",
      description: "By appointment only",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri, 9 AM-5 PM UTC",
      description: "IPv4 transfer support",
    },
  ];

  const faqs = [
    {
      question: "Why do I need to buy IPv4 addresses?",
      answer:
        "All five Regional Internet Registries (RIRs) have exhausted their free pools of IPv4 addresses. The only way to get new blocks is through the transfer market from organizations that hold unused addresses.",
    },
    {
      question: "How long does an IPv4 transfer usually take?",
      answer:
        "Timelines vary by RIR, but most transfers are completed within 1 to 4 weeks once a buyer and seller are matched and all paperwork is submitted.",
    },
    {
      question: "Are inter-regional transfers (e.g., ARIN to RIPE) possible?",
      answer:
        "Yes, inter-RIR transfers are possible but are subject to the specific policies of both the source and recipient regions. Our team can guide you through this complex process.",
    },
    {
      question: "How do you ensure my transaction is secure?",
      answer:
        "We use a formal sale and purchase agreement and secure third-party escrow services for all transactions. This ensures that funds are only released once the IP addresses have been successfully transferred and verified.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-16 py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/5453821/pexels-photo-5453821.jpeg"
            alt="Get in Touch Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/70 to-secondary/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Ready to get started with your IPv4 transaction? Contact our expert team for personalized guidance and a quote.
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
                          <info.icon className="h-5 w-5 text-primary-blue" />
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
                  <div className="bg-gradient-to-br from-accent to-secondary/20 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d99172.67074800449!2d77.288593!3d28.683307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb871791cb41%3A0x10d787382aa6cd7f!2sInfinity%20Consultants%20-%20ISP%20VNO%20OSP%20MSO%20NLD%20PM%20WANI%20Static%20IP%20IP1%20IP%20One%20ASN%20Number%20WPC%20BIS%20DOT%20License!5e1!3m2!1sen!2sin!4v1753516208733!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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
            src="https://larus.net/assets/frontend/images/home/home_banner_bg.webp"
            alt="Let's Start Securing Your IP Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your IPv4 Transaction?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait to secure the IPv4 addresses you need. Contact us today for expert guidance and competitive pricing on your next IPv4 transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Your Quote Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/services">
              <Button
                size="lg"
                variant="default"
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
