// Mock data service for development
export class BaseCrudService {
  static async getAll(entityType: string): Promise<{ items: any[] }> {
    // Mock data for development
    const mockData: Record<string, any[]> = {
      'Services': [
        {
          _id: '1',
          serviceName: 'Patent Registration',
          shortDescription: 'Protect your inventions with comprehensive patent filing services.',
          detailedDescription: 'Our patent registration service provides end-to-end support for protecting your inventions. We conduct thorough prior art searches, prepare detailed patent applications, and guide you through the entire filing process across multiple jurisdictions.'
        },
        {
          _id: '2',
          serviceName: 'Trademark Protection',
          shortDescription: 'Secure your brand identity with trademark registration.',
          detailedDescription: 'Establish and protect your brand with our comprehensive trademark services. We handle trademark searches, application preparation, filing, and ongoing monitoring to ensure your brand remains protected.'
        },
        {
          _id: '3',
          serviceName: 'Copyright Filing',
          shortDescription: 'Protect your creative works with copyright registration.',
          detailedDescription: 'Safeguard your original creative works including literature, music, art, and software with our copyright registration services. We ensure your intellectual property rights are properly documented and protected.'
        },
        {
          _id: '4',
          serviceName: 'IP Litigation Support',
          shortDescription: 'Expert legal support for IP disputes and enforcement.',
          detailedDescription: 'When your intellectual property rights are challenged, our experienced legal team provides comprehensive litigation support, from cease and desist letters to full court representation.'
        },
        {
          _id: '5',
          serviceName: 'IP Strategy Consulting',
          shortDescription: 'Strategic guidance for your intellectual property portfolio.',
          detailedDescription: 'Develop a comprehensive IP strategy that aligns with your business goals. Our consultants help you identify, protect, and monetize your intellectual property assets effectively.'
        },
        {
          _id: '6',
          serviceName: 'IP Due Diligence',
          shortDescription: 'Thorough IP assessment for business transactions.',
          detailedDescription: 'Comprehensive evaluation of intellectual property assets for mergers, acquisitions, licensing deals, and investment decisions. We provide detailed reports on IP value, risks, and opportunities.'
        }
      ],
      'Team Members': [
        {
          _id: '1',
          name: 'Sarah Johnson',
          role: 'Senior Patent Attorney',
          bio: 'With over 15 years of experience in patent law, Sarah specializes in technology and biotech patents.',
          avatar: '/api/placeholder/150/150'
        },
        {
          _id: '2',
          name: 'Michael Chen',
          role: 'Trademark Specialist',
          bio: 'Michael has helped hundreds of businesses protect their brand identity through strategic trademark planning.',
          avatar: '/api/placeholder/150/150'
        },
        {
          _id: '3',
          name: 'Emily Rodriguez',
          role: 'IP Litigation Partner',
          bio: 'Emily leads our litigation team with a track record of successful IP enforcement cases.',
          avatar: '/api/placeholder/150/150'
        },
        {
          _id: '4',
          name: 'David Kim',
          role: 'IP Strategy Consultant',
          bio: 'David helps companies develop comprehensive IP strategies that drive business value.',
          avatar: '/api/placeholder/150/150'
        },
        {
          _id: '5',
          name: 'Lisa Thompson',
          role: 'Copyright Attorney',
          bio: 'Lisa specializes in creative industries and digital media copyright protection.',
          avatar: '/api/placeholder/150/150'
        },
        {
          _id: '6',
          name: 'Robert Wilson',
          role: 'IP Analytics Director',
          bio: 'Robert leverages data analytics to provide insights on IP portfolio optimization.',
          avatar: '/api/placeholder/150/150'
        }
      ],
      'Statistics': [
        {
          _id: '1',
          statisticName: 'Clients Served',
          statisticValue: 1500,
          unit: '+',
          description: 'Businesses worldwide trust us with their IP needs'
        },
        {
          _id: '2',
          statisticName: 'Patents Protected',
          statisticValue: 7500,
          unit: '+',
          description: 'Successful patent applications filed and protected'
        },
        {
          _id: '3',
          statisticName: 'Countries Covered',
          statisticValue: 80,
          unit: '+',
          description: 'Global reach across major markets and jurisdictions'
        },
        {
          _id: '4',
          statisticName: 'Success Rate',
          statisticValue: 95,
          unit: '%',
          description: 'High success rate in IP application approvals'
        }
      ],
      'Testimonials': [
        {
          _id: '1',
          testimonialText: 'IPV4Bazaar helped us secure crucial patents that became the foundation of our $50M funding round. Their expertise is unmatched.',
          clientName: 'Alex Rivera',
          clientRole: 'CEO',
          clientCompany: 'TechStart Inc.',
          clientAvatar: '/api/placeholder/100/100'
        },
        {
          _id: '2',
          testimonialText: 'The trademark protection services saved our brand from potential infringement. Professional, efficient, and results-driven.',
          clientName: 'Maria Santos',
          clientRole: 'Founder',
          clientCompany: 'Creative Brands Co.',
          clientAvatar: '/api/placeholder/100/100'
        },
        {
          _id: '3',
          testimonialText: 'Outstanding IP strategy consulting that helped us identify and protect our most valuable assets. Highly recommended.',
          clientName: 'James Park',
          clientRole: 'CTO',
          clientCompany: 'Innovation Labs',
          clientAvatar: '/api/placeholder/100/100'
        }
      ],
      'Milestones': [
        {
          _id: '1',
          year: '2024',
          title: 'Company Founded',
          description: 'IPV4Bazaar was established with a mission to democratize IP protection for businesses of all sizes.',
          order: 1
        },
        {
          _id: '2',
          year: '2021',
          title: 'First 100 Clients',
          description: 'Reached our first major milestone of serving 100 satisfied clients across various industries.',
          order: 2
        },
        {
          _id: '3',
          year: '2022',
          title: 'Global Expansion',
          description: 'Expanded our services to cover IP protection in over 50 countries worldwide.',
          order: 3
        },
        {
          _id: '4',
          year: '2023',
          title: 'Technology Platform Launch',
          description: 'Launched our proprietary IP management platform to streamline client services.',
          order: 4
        },
        {
          _id: '5',
          year: '2024',
          title: '1000+ Patents Filed',
          description: 'Celebrated filing our 1000th patent application, marking a significant achievement.',
          order: 5
        }
      ]
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ items: mockData[entityType] || [] });
      }, 100); // Simulate API delay
    });
  }
}
