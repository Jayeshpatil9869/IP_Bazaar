import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BaseCrudService } from "@/integrations";
import { TeamMembers } from "@/entities/team-members";
import { Statistics } from "@/entities/statistics";
import { Testimonials } from "@/entities/testimonials";
import { CompanyMilestones } from "@/entities/company-milestones";
import {
  Target,
  Eye,
  Users,
  Globe,
  Award,
  TrendingUp,
  ArrowRight,
  Quote,
  Lightbulb,
  Building,
  CheckCircle,
  Rocket,
} from "lucide-react";

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [milestones, setMilestones] = useState<CompanyMilestones[]>([]);
  const [animationClasses, setAnimationClasses] = useState<string[]>([]);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Static team data based on provided content
  const staticTeamMembers = [
    {
      name: "Aarav Reddy",
      role: "CEO & Founder",
      avatar: "/AaravReddy.webp",
      initials: "AR"
    },
    {
      name: "Ajun Meheta",
      role: "Head of Brokerage",
      avatar: "/AjunMeheta.jpg",
      initials: "AM"
    },
    {
      name: "Ananya Deshmukh",
      role: "Lead RIR Policy Analyst",
      avatar: "/AnanyaDeshmukh.jpg",
      initials: "AD"
    },
    {
      name: "Jayant Patel",
      role: "Chief Technology Officer",
      avatar: "/JayantPatel.jpg",
      initials: "JP"
    },
    {
      name: "Meera Nair",
      role: "Head of Client Relations",
      avatar: "/MeeraNair.jpg",
      initials: "MN"
    },
    {
      name: "Priya Sharma",
      role: "Marketing Director",
      avatar: "/PriyaSharma.jpg",
      initials: "PS"
    },
    {
      name: "Rohan Kapoor",
      role: "Senior Developer",
      avatar: "/RohanKapoor.jpg",
      initials: "RK"
    },
    {
      name: "Vikram Iyer",
      role: "Business Analyst",
      avatar: "/VikramIyer.jpg",
      initials: "VI"
    }
  ];

  // Static statistics based on provided content
  const staticStatistics = [
    {
      value: "1,500+",
      label: "Clients Served",
      icon: Users
    },
    {
      value: "7,500+",
      label: "IP Blocks Transferred",
      icon: Globe
    },
    {
      value: "80+",
      label: "Countries Covered",
      icon: Award
    },
    {
      value: "99%",
      label: "Success Rate on Transfers",
      icon: TrendingUp
    }
  ];

  // Static journey timeline based on provided content
  const journeyTimeline = [
    {
      year: "2021",
      title: "The Idea",
      description: "Our founders, a team of network engineers, identify a critical need for a transparent IPv4 marketplace.",
      icon: Lightbulb
    },
    {
      year: "2022",
      title: "Company Formation",
      description: "IP Bazaar is officially founded with a mission to build a secure platform for IP brokers and businesses.",
      icon: Building
    },
    {
      year: "2023",
      title: "First Major Transfer",
      description: "We successfully facilitate our first inter-regional /16 block transfer, proving our model and process.",
      icon: CheckCircle
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "The IP Bazaar online marketplace officially launches to the public, offering a full suite of services.",
      icon: Rocket
    }
  ];

  // Static testimonials based on provided content
  const staticTestimonials = [
    {
      text: "The IP Bazaar team made selling our legacy address block effortless. Their expertise in handling the RIPE transfer process was invaluable.",
      clientName: "John D.",
      clientRole: "CTO",
      clientCompany: "Cloud Solutions Inc.",
      avatar: "/RohanKapoor.jpg",
      initials: "JD"
    },
    {
      text: "As a growing ISP, we needed IPv4 space quickly. IP Bazaar found us a seller in under a week and handled everything. Highly recommended.",
      clientName: "Maria P.",
      clientRole: "Network Manager",
      clientCompany: "TechNet ISP",
      avatar: "/PriyaSharma.jpg",
      initials: "MP"
    },
    {
      text: "Professional service and deep understanding of IPv4 regulations. They guided us through our first ARIN transfer seamlessly.",
      clientName: "David L.",
      clientRole: "IT Director",
      clientCompany: "Global Networks Ltd.",
      avatar: "/VikramIyer.jpg",
      initials: "DL"
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [teamData, statsData, testimonialsData, milestonesData] =
          await Promise.all([
            BaseCrudService.getAll("Team Members"),
            BaseCrudService.getAll("Statistics"),
            BaseCrudService.getAll("Testimonials"),
            BaseCrudService.getAll("Milestones"),
          ]);

        const sortedMilestones = (
          milestonesData.items as CompanyMilestones[]
        ).sort((a, b) => a.order - b.order);

        setTeamMembers((teamData.items as TeamMembers[]).slice(0, 6));
        setStatistics((statsData.items as Statistics[]).slice(0, 4));
        setTestimonials((testimonialsData.items as Testimonials[]).slice(0, 3));
        setMilestones(sortedMilestones);

        // Generate random animation classes for each milestone
        const animations = sortedMilestones.map(() =>
          Math.random() > 0.5 ? "scroll-animate-left" : "scroll-animate-right"
        );
        setAnimationClasses(animations);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

          if (isVisible && !ref.classList.contains("in-view")) {
            ref.classList.add("in-view");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [milestones]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-16 py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/50 to-secondary/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            About IPV4Bazaar
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            A dedicated team of network and market experts committed to providing a transparent and reliable bridge for the global IPv4 community.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-lighter-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-left">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-primary-blue" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-primary">
                    Our Mission
                  </h2>
                </div>
                <p className="font-paragraph text-gray-600 leading-relaxed">
                  To simplify the complexities of the IPv4 market, making it easy and secure for any organization to buy, sell, or lease IP addresses. We are committed to upholding all RIR policies and promoting fair market practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-right">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-6 w-6 text-primary-blue" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-primary">
                    Our Vision
                  </h2>
                </div>
                <p className="font-paragraph text-gray-600 leading-relaxed">
                  To be the world's leading and most trusted platform for IP address transfers and management, while actively supporting the global transition to IPv6.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-8 md:py-16 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Journey
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Key milestones in our company's growth and evolution
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-secondary/30"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone._id}
                  ref={(el) => (timelineRefs.current[index] = el)}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } ${animationClasses[index] || ""}`}
                >
                  {/* Timeline dot - hidden on mobile */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white z-10 animate-pulse hidden md:block"></div>

                  <Card
                    className={`w-full max-w-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                      index % 2 === 0 ? "mr-auto md:pr-8" : "ml-auto md:pl-8"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <Award className="h-5 w-5 text-primary-blue mr-2" />
                        <span className="font-heading font-semibold text-primary">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="font-paragraph text-sm text-gray-600">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-lighter-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Experienced professionals dedicated to protecting your
              intellectual property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-secondary/20 text-secondary font-heading font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="font-paragraph text-secondary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="font-paragraph text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Impact
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Numbers that reflect our commitment to excellence
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
                    <TrendingUp className="h-6 w-6 text-primary-blue" />
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

      {/* Testimonials */}
      <section className="py-16 bg-lighter-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="font-paragraph text-lg text-gray-600">
              Trusted by businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-secondary/40 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-paragraph text-gray-600 mb-6 italic">
                    "{testimonial.testimonialText}"
                  </p>
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage
                        src={testimonial.clientAvatar}
                        alt={testimonial.clientName}
                      />
                      <AvatarFallback className="bg-secondary/20 text-secondary font-heading text-sm">
                        {testimonial.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-heading font-semibold text-primary text-sm">
                        {testimonial.clientName}
                      </div>
                      <div className="font-paragraph text-xs text-gray-500">
                        {testimonial.clientRole}, {testimonial.clientCompany}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://larus.net/assets/frontend/images/home/home_banner_bg.webp"
            alt="Join Our Mission Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Join Our Mission
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be part of our journey to make intellectual property protection
            accessible to all. Let's protect your innovations together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="default"
                className="font-paragraph hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="default"
                className="font-paragraph border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
