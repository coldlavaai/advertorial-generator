export interface AdvertorialTemplate {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'finance' | 'software' | 'ecommerce' | 'saas' | 'legal';
  thumbnail: string;
  features: string[];
  sections: AdvertorialSection[];
}

export interface AdvertorialSection {
  id: string;
  type: 'hero' | 'problem' | 'solution' | 'features' | 'testimonials' | 'cta' | 'guarantee';
  order: number;
  content: SectionContent;
}

export interface SectionContent {
  headline?: string;
  subheadline?: string;
  body?: string;
  bulletPoints?: string[];
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  testimonials?: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating?: number;
  imageUrl?: string;
}

export interface AdvertorialProject {
  template: AdvertorialTemplate;
  customizations: {
    [sectionId: string]: Partial<SectionContent>;
  };
  metadata: {
    title: string;
    description: string;
    productName: string;
    keywords?: string[];
    author?: string;
  };
  createdAt: string;
  updatedAt: string;
}
