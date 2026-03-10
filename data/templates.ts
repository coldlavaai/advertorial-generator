import { AdvertorialTemplate } from '@/types/advertorial';

export const templates: AdvertorialTemplate[] = [
  {
    id: 'software-saas',
    name: 'SaaS Product Launch',
    description: 'High-converting landing page for software products',
    category: 'software',
    thumbnail: '💻',
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        order: 1,
        content: {
          headline: 'Transform Your Business in 30 Days',
          subheadline: 'Join 10,000+ companies using our platform to automate their workflow',
          ctaText: 'Start Free Trial',
          ctaUrl: '#signup',
        },
      },
      {
        id: 'problem-1',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Tired of Wasting Hours on Manual Tasks?',
          body: 'Most businesses lose 20+ hours per week on repetitive work that could be automated. This leads to burnout, missed opportunities, and lost revenue.',
          bulletPoints: [
            'Manual data entry eating up your day',
            'Disconnected tools creating chaos',
            'No clear visibility into performance',
            'Team spending time on busy work instead of growth',
          ],
        },
      },
      {
        id: 'solution-1',
        type: 'solution',
        order: 3,
        content: {
          headline: 'Introducing the All-in-One Solution',
          subheadline: 'Automate, integrate, and optimize your entire workflow',
          body: 'Our platform connects all your tools, automates repetitive tasks, and gives you real-time insights to make better decisions faster.',
        },
      },
      {
        id: 'features-1',
        type: 'features',
        order: 4,
        content: {
          headline: 'Everything You Need to Succeed',
          bulletPoints: [
            '⚡ One-click automation for common workflows',
            '🔗 Integrates with 500+ popular tools',
            '📊 Real-time analytics dashboard',
            '🤖 AI-powered recommendations',
            '🔒 Enterprise-grade security',
            '📱 Mobile app for on-the-go management',
          ],
        },
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Loved by Thousands of Customers',
          testimonials: [
            {
              id: 'test-1',
              name: 'Sarah Johnson',
              role: 'CEO, TechStart Inc.',
              content: 'This tool saved us 15 hours per week. The ROI was immediate.',
              rating: 5,
            },
            {
              id: 'test-2',
              name: 'Mike Chen',
              role: 'Operations Manager',
              content: 'Best investment we made this year. Our team is finally working on what matters.',
              rating: 5,
            },
            {
              id: 'test-3',
              name: 'Emily Rodriguez',
              role: 'Founder, GrowthLab',
              content: 'The automation features are incredible. Set it and forget it!',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'guarantee-1',
        type: 'guarantee',
        order: 6,
        content: {
          headline: '30-Day Money-Back Guarantee',
          body: 'Try it risk-free. If you don\'t see results in 30 days, we\'ll refund every penny. No questions asked.',
        },
      },
      {
        id: 'cta-1',
        type: 'cta',
        order: 7,
        content: {
          headline: 'Ready to Transform Your Workflow?',
          subheadline: 'Join 10,000+ companies already saving time and money',
          ctaText: 'Start Your Free Trial Now',
          ctaUrl: '#signup',
          body: 'No credit card required • Cancel anytime • Setup in 5 minutes',
        },
      },
    ],
  },
  {
    id: 'ecommerce-product',
    name: 'E-Commerce Product',
    description: 'High-converting product page for physical products',
    category: 'ecommerce',
    thumbnail: '🛍️',
    sections: [
      {
        id: 'hero-2',
        type: 'hero',
        order: 1,
        content: {
          headline: 'The Revolutionary Product Everyone\'s Talking About',
          subheadline: 'Limited stock available - Order now before it\'s gone!',
          ctaText: 'Get Yours Today',
          ctaUrl: '#order',
        },
      },
      {
        id: 'problem-2',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Are You Struggling With This Common Problem?',
          bulletPoints: [
            'Constant discomfort affecting your daily life',
            'Expensive solutions that don\'t work',
            'Wasting time and money on temporary fixes',
            'No relief in sight',
          ],
        },
      },
      {
        id: 'solution-2',
        type: 'solution',
        order: 3,
        content: {
          headline: 'Finally, a Solution That Actually Works',
          body: 'Our scientifically-designed product solves the root cause of the problem, not just the symptoms. Backed by research and loved by thousands.',
        },
      },
      {
        id: 'features-2',
        type: 'features',
        order: 4,
        content: {
          headline: 'What Makes It Different',
          bulletPoints: [
            '✓ Clinically tested and proven effective',
            '✓ Made with premium, natural materials',
            '✓ Easy to use - works in just 5 minutes',
            '✓ Lasts 10x longer than competitors',
            '✓ Eco-friendly and sustainable',
            '✓ 1-year warranty included',
          ],
        },
      },
      {
        id: 'testimonials-2',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Join 50,000+ Happy Customers',
          testimonials: [
            {
              id: 'test-4',
              name: 'Jessica M.',
              role: 'Verified Buyer',
              content: 'Life-changing! I wish I found this years ago.',
              rating: 5,
            },
            {
              id: 'test-5',
              name: 'David L.',
              role: 'Verified Buyer',
              content: 'Worth every penny. The quality is outstanding.',
              rating: 5,
            },
            {
              id: 'test-6',
              name: 'Amanda K.',
              role: 'Verified Buyer',
              content: 'Bought 3 more as gifts. Everyone loves it!',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'guarantee-2',
        type: 'guarantee',
        order: 6,
        content: {
          headline: '60-Day Satisfaction Guarantee',
          body: 'Love it or your money back. We\'re that confident you\'ll see results.',
        },
      },
      {
        id: 'cta-2',
        type: 'cta',
        order: 7,
        content: {
          headline: 'Limited Time Offer - 40% Off!',
          subheadline: 'Only 47 left in stock at this price',
          ctaText: 'Order Now - Save 40%',
          ctaUrl: '#order',
          body: 'Free shipping • Secure checkout • Ships within 24 hours',
        },
      },
    ],
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Convert visitors with a proven health product template',
    category: 'health',
    thumbnail: '💊',
    sections: [
      {
        id: 'hero-3',
        type: 'hero',
        order: 1,
        content: {
          headline: 'Discover the Natural Solution to Better Health',
          subheadline: 'Trusted by doctors and used by thousands worldwide',
          ctaText: 'Learn More',
          ctaUrl: '#discover',
        },
      },
      {
        id: 'problem-3',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Feeling Tired, Sluggish, and Out of Balance?',
          body: 'You\'re not alone. Millions struggle with low energy, poor sleep, and declining vitality. Most solutions only treat symptoms, not the root cause.',
        },
      },
      {
        id: 'solution-3',
        type: 'solution',
        order: 3,
        content: {
          headline: 'Reclaim Your Energy Naturally',
          body: 'Our breakthrough formula combines ancient wisdom with modern science. Clinically-tested ingredients work synergistically to restore balance and vitality.',
        },
      },
      {
        id: 'features-3',
        type: 'features',
        order: 4,
        content: {
          headline: 'Powerful Benefits',
          bulletPoints: [
            '🌱 100% natural, plant-based ingredients',
            '⚡ Boost energy levels within days',
            '😴 Improve sleep quality',
            '🧠 Enhance mental clarity and focus',
            '💪 Support immune system health',
            '🔬 Backed by clinical research',
          ],
        },
      },
      {
        id: 'testimonials-3',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Real Results from Real People',
          testimonials: [
            {
              id: 'test-7',
              name: 'Dr. Maria Thompson',
              role: 'Naturopathic Doctor',
              content: 'I recommend this to my patients. The results speak for themselves.',
              rating: 5,
            },
            {
              id: 'test-8',
              name: 'John P.',
              role: 'Age 52',
              content: 'My energy is back! Feel like I\'m 30 again.',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'cta-3',
        type: 'cta',
        order: 6,
        content: {
          headline: 'Start Your Transformation Today',
          subheadline: 'Special offer: Buy 2, Get 1 Free',
          ctaText: 'Claim Your Discount',
          ctaUrl: '#order',
        },
      },
    ],
  },
];
