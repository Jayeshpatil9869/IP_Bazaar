import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lighter-grey to-light-grey">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-primary-blue mr-2" />
                <span className="text-2xl font-bold text-primary-blue">IPBazaar</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-8">
                  <a href="#home" className="text-gray-900 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors">
                    Home
                  </a>
                  <a href="#about" className="text-gray-700 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors">
                    About Us
                  </a>
                  <a href="#services" className="text-gray-700 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors">
                    Our Services
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-primary-blue block">IP Request Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              IPBazaar is the premier platform for managing intellectual property requests efficiently. 
              Connect with experts, track your submissions, and accelerate your IP journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#about" className="btn-outline inline-flex items-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose IPBazaar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers comprehensive solutions for all your IP management needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-blue bg-opacity-10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600">
                Quick turnaround times with our streamlined workflow and expert team
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-blue bg-opacity-10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Access to qualified IP professionals and dedicated customer support
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-blue bg-opacity-10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                International IP services covering multiple jurisdictions and markets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About IPBazaar
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with the vision to democratize intellectual property services, IPBazaar 
                connects innovators with expert IP professionals worldwide. Our platform simplifies 
                the complex world of patents, trademarks, and copyrights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Trusted by 10,000+ clients globally</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">99% customer satisfaction rate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To make intellectual property protection accessible, affordable, and efficient 
                for innovators and businesses of all sizes.
              </p>
              <Link to="/signup" className="btn-primary inline-flex items-center">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive IP solutions tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Patent Filing",
                description: "Professional patent application and prosecution services",
                icon: Shield
              },
              {
                title: "Trademark Registration",
                description: "Protect your brand with comprehensive trademark services",
                icon: Globe
              },
              {
                title: "IP Consultation",
                description: "Expert advice on IP strategy and portfolio management",
                icon: Users
              },
              {
                title: "Copyright Protection",
                description: "Secure your creative works with copyright registration",
                icon: CheckCircle
              },
              {
                title: "IP Search & Analysis",
                description: "Thorough prior art searches and freedom-to-operate analysis",
                icon: Zap
              },
              {
                title: "Licensing Support",
                description: "Navigate IP licensing agreements and negotiations",
                icon: ArrowRight
              }
            ].map((service, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <service.icon className="h-12 w-12 text-primary-blue mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust IPBazaar for their IP needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-primary-blue px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="mailto:contact@ipbazaar.com" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-blue transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary-blue mr-2" />
                <span className="text-2xl font-bold">IPBazaar</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for intellectual property management and protection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Patent Filing</li>
                <li>Trademark Registration</li>
                <li>Copyright Protection</li>
                <li>IP Consultation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@ipbazaar.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 IP Street, Tech City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IPBazaar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
