import { AdvertorialTemplate } from '@/types/advertorial';

export const templates: AdvertorialTemplate[] = [
  {
    id: 'saas-product-launch',
    name: 'SaaS Product Launch',
    description: 'Perfect for software products with strong problem-solution framework and feature highlights.',
    category: 'saas',
    thumbnail: '/templates/saas.png',
    features: [
      'Hero with compelling CTA',
      'Problem-solution framework',
      'Feature highlights',
      'Social proof section',
      'Money-back guarantee',
    ],
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        order: 1,
        content: {
          headline: 'Transform Your Business with [Product Name]',
          subheadline: 'The all-in-one solution that saves you 10+ hours per week',
          body: 'Join thousands of successful businesses already using our platform.',
          ctaText: 'Start Your Free Trial',
          ctaUrl: '#signup',
        },
      },
      {
        id: 'problem-1',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Are You Struggling With These Challenges?',
          bulletPoints: [
            'Wasting hours on manual, repetitive tasks',
            'Lost revenue due to inefficient processes',
            'Team frustration from outdated tools',
            'Difficulty scaling your operations',
          ],
          body: 'You\'re not alone. 73% of businesses face these exact problems daily.',
        },
      },
      {
        id: 'solution-1',
        type: 'solution',
        order: 3,
        content: {
          headline: 'Introducing [Product Name]: Your Complete Solution',
          subheadline: 'Everything you need in one powerful platform',
          body: 'We\'ve built the tool you\'ve been searching for. Simple enough to use on day one, powerful enough to scale with your business.',
        },
      },
      {
        id: 'features-1',
        type: 'features',
        order: 4,
        content: {
          headline: 'Powerful Features That Drive Results',
          bulletPoints: [
            'Automation engine - Save 10+ hours per week',
            'Real-time analytics - Make data-driven decisions',
            'Team collaboration - Work seamlessly together',
            'Enterprise security - Bank-level encryption',
            'Integrations - Connect with 100+ tools',
          ],
        },
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Trusted by Industry Leaders',
          testimonials: [
            {
              id: 't1',
              name: 'Sarah Johnson',
              role: 'CEO, TechCorp',
              content: 'This tool transformed our operations. We saw ROI in the first month.',
              rating: 5,
            },
            {
              id: 't2',
              name: 'Michael Chen',
              role: 'Operations Director',
              content: 'Finally, a solution that actually works. Our team productivity increased 40%.',
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
          body: 'Try [Product Name] risk-free. If you\'re not completely satisfied, get a full refund. No questions asked.',
        },
      },
      {
        id: 'cta-1',
        type: 'cta',
        order: 7,
        content: {
          headline: 'Ready to Transform Your Business?',
          subheadline: 'Join 10,000+ successful businesses today',
          ctaText: 'Start Your Free Trial',
          ctaUrl: '#signup',
          body: 'No credit card required. Cancel anytime.',
        },
      },
    ],
  },
  {
    id: 'ecommerce-product',
    name: 'E-Commerce Product',
    description: 'Optimized for physical products with benefit-focused features and customer testimonials.',
    category: 'ecommerce',
    thumbnail: '/templates/ecommerce.png',
    features: [
      'Compelling product headline',
      'Pain point identification',
      'Product benefits focus',
      'Customer testimonials',
      'Limited-time offer CTA',
    ],
    sections: [
      {
        id: 'hero-2',
        type: 'hero',
        order: 1,
        content: {
          headline: 'The [Product] That Changed Everything',
          subheadline: 'Finally, a solution that actually works',
          body: 'Over 50,000 satisfied customers can\'t be wrong.',
          ctaText: 'Order Now - 50% Off',
          ctaUrl: '#buy',
        },
      },
      {
        id: 'problem-2',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Tired of Products That Don\'t Deliver?',
          body: 'Most products promise the world but fail to deliver results. You deserve better.',
          bulletPoints: [
            'Wasted money on products that don\'t work',
            'Frustrated by false promises',
            'Ready to give up on finding a real solution',
          ],
        },
      },
      {
        id: 'solution-2',
        type: 'solution',
        order: 3,
        content: {
          headline: 'Meet [Product Name] - The Real Deal',
          subheadline: 'Proven results, backed by science',
          body: 'We\'ve spent years perfecting this formula. The result? A product that actually delivers on its promises.',
        },
      },
      {
        id: 'features-2',
        type: 'features',
        order: 4,
        content: {
          headline: 'What Makes Us Different',
          bulletPoints: [
            'Scientifically proven formula',
            '100% natural ingredients',
            'Made in the USA',
            'Fast results in just 30 days',
            'No harmful side effects',
          ],
        },
      },
      {
        id: 'testimonials-2',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Real People, Real Results',
          testimonials: [
            {
              id: 't3',
              name: 'Jennifer Smith',
              role: 'Verified Customer',
              content: 'I saw results in just 2 weeks! This product is amazing.',
              rating: 5,
            },
            {
              id: 't4',
              name: 'David Brown',
              role: 'Verified Customer',
              content: 'Best purchase I\'ve made all year. Highly recommend!',
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
          body: 'Love it or your money back. We\'re that confident in [Product Name].',
        },
      },
      {
        id: 'cta-2',
        type: 'cta',
        order: 7,
        content: {
          headline: 'Limited Time: 50% Off Your First Order',
          subheadline: 'This special offer expires in 24 hours',
          ctaText: 'Claim Your Discount Now',
          ctaUrl: '#buy',
          body: 'Free shipping on all orders over $50.',
        },
      },
    ],
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Ideal for supplements and health products with natural solution positioning and trust-building.',
    category: 'health',
    thumbnail: '/templates/health.png',
    features: [
      'Natural solution positioning',
      'Doctor recommendations',
      'Benefit-focused features',
      'Real testimonials',
      'Special offer section',
    ],
    sections: [
      {
        id: 'hero-3',
        type: 'hero',
        order: 1,
        content: {
          headline: 'Discover the Natural Way to [Health Benefit]',
          subheadline: 'Recommended by doctors, trusted by thousands',
          body: 'Safe, effective, and backed by clinical research.',
          ctaText: 'Try Risk-Free Today',
          ctaUrl: '#order',
        },
      },
      {
        id: 'problem-3',
        type: 'problem',
        order: 2,
        content: {
          headline: 'Your Health Deserves Better',
          body: 'Conventional solutions often come with unwanted side effects and limited results.',
          bulletPoints: [
            'Harsh chemicals with side effects',
            'Temporary relief, not long-term solutions',
            'Expensive treatments that don\'t work',
          ],
        },
      },
      {
        id: 'solution-3',
        type: 'solution',
        order: 3,
        content: {
          headline: 'The Natural Alternative You\'ve Been Looking For',
          subheadline: 'Powered by nature, validated by science',
          body: 'Our formula combines ancient wisdom with modern science to deliver real, lasting results.',
        },
      },
      {
        id: 'features-3',
        type: 'features',
        order: 4,
        content: {
          headline: 'Why Choose [Product Name]',
          bulletPoints: [
            '100% natural ingredients',
            'Clinically tested and proven',
            'No harmful side effects',
            'Recommended by doctors',
            'GMP certified facility',
          ],
        },
      },
      {
        id: 'testimonials-3',
        type: 'testimonials',
        order: 5,
        content: {
          headline: 'Success Stories from Real Customers',
          testimonials: [
            {
              id: 't5',
              name: 'Dr. Emily Watson',
              role: 'MD, Functional Medicine',
              content: 'I recommend this to my patients. The results speak for themselves.',
              rating: 5,
            },
            {
              id: 't6',
              name: 'Robert Martinez',
              role: 'Verified Customer',
              content: 'Life-changing. I wish I had found this years ago.',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'guarantee-3',
        type: 'guarantee',
        order: 6,
        content: {
          headline: '90-Day Results Guarantee',
          body: 'See results or get your money back. That\'s our promise to you.',
        },
      },
      {
        id: 'cta-3',
        type: 'cta',
        order: 7,
        content: {
          headline: 'Take Control of Your Health Today',
          subheadline: 'Special introductory pricing available now',
          ctaText: 'Order Your Supply',
          ctaUrl: '#order',
          body: 'Free shipping and 90-day guarantee included.',
        },
      },
    ],
  },
];
