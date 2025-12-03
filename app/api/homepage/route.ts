import { NextResponse } from 'next/server';
import { transformDbDataToHomeContent } from '@/lib/data-transform';
import { getSetting, getHomepageSection, getAllProjects, getProjectMetrics, getAllWorkExperience } from '@/lib/db';

export async function GET() {
  try {
    // Build colors object from settings
    const colors = {
      primary: getSetting('color_primary', '#f0633f'),
      secondary: getSetting('color_secondary', '#191818'),
      background: getSetting('color_background', '#f7f4ed'),
      text: {
        primary: getSetting('color_text_primary', '#191818'),
        secondary: getSetting('color_text_secondary', '#494848'),
        accent: getSetting('color_text_accent', '#f0633f'),
        muted: getSetting('color_text_muted', '#babcc0')
      },
      border: getSetting('color_border', '#e5e7eb')
    };

    // Build sections from database
    const heroSection = getHomepageSection('hero');
    const servicesSection = getHomepageSection('services');
    const featuresSection = getHomepageSection('features');
    const aboutSection = getHomepageSection('about');
    const contactSection = getHomepageSection('contact');

    // Get ML projects (category = 'ml')
    const mlProjects = getAllProjects('ml').slice(0, 3); // Limit to 3 for preview
    const mlProjectsWithMetrics = mlProjects.map(project => ({
      ...project,
      metrics: getProjectMetrics(project.id)
    }));

    // Get work experience (PD projects)
    const workExperience = getAllWorkExperience().slice(0, 3); // Limit to 3 for preview

    const homeContent = {
      meta: {
        version: '2.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      colors,
      hero: heroSection ? JSON.parse(heroSection.content_json) : getDefaultHero(),
      services: servicesSection ? JSON.parse(servicesSection.content_json) : getDefaultServices(),
      features: featuresSection ? JSON.parse(featuresSection.content_json) : getDefaultFeatures(),
      mlPreview: {
        title: getSetting('ml_preview_title', 'Machine Learning & AI'),
        subtitle: getSetting('ml_preview_subtitle', 'Hands-on experimentation with ML models, computer vision, and AI applications'),
        projects: mlProjectsWithMetrics
      },
      pdPreview: {
        title: getSetting('pd_preview_title', 'Product Design'),
        subtitle: getSetting('pd_preview_subtitle', 'This is my working experience in product design'),
        projects: workExperience
      },
      about: aboutSection ? JSON.parse(aboutSection.content_json) : getDefaultAbout(),
      contact: contactSection ? JSON.parse(contactSection.content_json) : getDefaultContact(),
      footer: getDefaultFooter()
    };

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    );
  }
}

function getDefaultHero() {
  return {
    backgroundColor: '#f7f4ed',
    badge: 'Machine Learning Engineer',
    title: 'Building AI-powered solutions',
    subtitle: 'I specialize in machine learning, computer vision, and product design',
    buttons: [
      { text: 'View Projects', link: '#projects', style: 'primary' },
      { text: 'Contact Me', link: '#contact', style: 'secondary' }
    ],
    image: {
      src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20headshot%20of%20a%20tech%20professional%2C%20modern%20lighting%2C%20confident%20expression&image_size=square',
      alt: 'Professional headshot'
    }
  };
}

function getDefaultServices() {
  return {
    title: 'What I Do',
    services: [
      {
        title: 'Machine Learning',
        description: 'Developing ML models for computer vision, NLP, and predictive analytics',
        icon: 'brain'
      },
      {
        title: 'Product Design',
        description: 'Creating user-centered designs with focus on usability and aesthetics',
        icon: 'palette'
      },
      {
        title: 'Full Stack Development',
        description: 'Building end-to-end applications with modern web technologies',
        icon: 'code'
      }
    ]
  };
}

function getDefaultFeatures() {
  return {
    backgroundColor: '#ffffff',
    title: 'Featured Work',
    subtitle: 'A selection of my recent projects and achievements',
    features: [
      {
        title: 'AI-Powered Analytics',
        description: 'Built a machine learning pipeline for real-time data analysis',
        icon: 'chart-bar'
      },
      {
        title: 'Computer Vision System',
        description: 'Developed object detection and classification models',
        icon: 'eye'
      },
      {
        title: 'Design System',
        description: 'Created comprehensive design systems for enterprise applications',
        icon: 'layers'
      }
    ]
  };
}

function getDefaultAbout() {
  return {
    badge: 'About Me',
    title: 'Passionate about technology and design',
    paragraphs: [
      'I am a machine learning engineer with a passion for creating innovative solutions that bridge the gap between technology and user experience.',
      'With expertise in both technical implementation and design thinking, I approach problems holistically to deliver impactful results.'
    ],
    stats: [
      { value: '5+', label: 'Years Experience' },
      { value: '20+', label: 'Projects Completed' },
      { value: '15+', label: 'Happy Clients' }
    ],
    image: {
      src: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20workspace%20with%20multiple%20monitors%2C%20modern%20tech%20setup%2C%20clean%20minimalist%20design&image_size=landscape_16_9',
      alt: 'Workspace setup'
    }
  };
}

function getDefaultContact() {
  return {
    title: 'Let\'s Work Together',
    subtitle: 'Ready to bring your ideas to life',
    email: 'hello@example.com',
    linkedin: 'https://linkedin.com/in/example',
    opportunities: 'I\'m always interested in new challenges and collaborations.'
  };
}

function getDefaultFooter() {
  return {
    brand: {
      name: 'Your Name',
      description: 'Machine Learning Engineer & Product Designer'
    },
    sections: [
      {
        title: 'Services',
        links: [
          { label: 'Machine Learning', href: '#services' },
          { label: 'Product Design', href: '#services' },
          { label: 'Consulting', href: '#contact' }
        ]
     