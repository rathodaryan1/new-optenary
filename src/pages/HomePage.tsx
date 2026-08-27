import { lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LazyShow from '../components/LazyShow';

// Lazy load below-the-fold components to reduce main-thread work and TTI
const Partners = lazy(() => import('../components/Partners'));
const Services = lazy(() => import('../components/Services'));
const AIService = lazy(() => import('../components/AIService'));
const Process = lazy(() => import('../components/Process'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const Integrations = lazy(() => import('../components/Integrations'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Vision = lazy(() => import('../components/Vision'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FounderSection = lazy(() => import('../components/FounderSection'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));

export default function HomePage() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://optenary.in/#organization",
        "name": "Optenary",
        "url": "https://optenary.in/",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://optenary.in/#logo",
          "url": "https://optenary.in/images/logo.webp",
          "caption": "Optenary"
        },
        "founder": {
          "@type": "Person",
          "name": "Aryan Rathod",
          "jobTitle": "Founder & CEO",
          "sameAs": "https://www.linkedin.com/in/rathodaryan/"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://optenary.in/#website",
        "url": "https://optenary.in/",
        "name": "Optenary",
        "description": "Custom Software Development & AI Solutions Partner",
        "publisher": {
          "@id": "https://optenary.in/#organization"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://optenary.in/#service",
        "name": "Optenary",
        "url": "https://optenary.in/",
        "image": "https://optenary.in/images/logo.webp",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "description": "Optenary is a global technology partner engineering custom software, mobile apps, web development, and autonomous AI agent automation services.",
        "areaServed": "Global"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://optenary.in/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://optenary.in/"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased">
      <SEO 
        title="Optenary | Custom Software Development &amp; AI Solutions Agency"
        description="Optenary is a global technology partner engineering custom software, web platforms, mobile apps, and autonomous AI agents designed to scale operations and boost efficiency."
        keywords="custom software development, AI solutions, web development services, mobile app development, AI agents, workflow automation, Optenary"
        canonicalPath="/"
        schema={homeSchema}
      />
      {/* Sticky Navigation and Socials header */}
      <Header />

      <main>
        {/* Intro Hero Section */}
        <Hero />

        <LazyShow>
          {/* Clients Marquee */}
          <Partners />
        </LazyShow>

        <LazyShow>
          {/* Core Services Grid */}
          <Services />
        </LazyShow>

        <LazyShow>
          {/* AI automation details and mock console dashboard */}
          <AIService />
        </LazyShow>

        <LazyShow>
          {/* Timeline roadmap diagram */}
          <Process />
        </LazyShow>

        <LazyShow>
          {/* Trust points beside custom code mock-editor */}
          <WhyChooseUs />
        </LazyShow>

        <LazyShow>
          {/* Double-run integrations marquee */}
          <Integrations />
        </LazyShow>

        <LazyShow>
          {/* Portfolio product cards */}
          <Portfolio />
        </LazyShow>

        <LazyShow>
          {/* Vision call-to-action panel banner */}
          <Vision />
        </LazyShow>

        <LazyShow>
          {/* Meet the Founder */}
          <FounderSection />
        </LazyShow>

        <LazyShow>
          {/* Reviews slider */}
          <Testimonials />
        </LazyShow>

        <LazyShow>
          {/* Accordions */}
          <FAQ />
        </LazyShow>

        <LazyShow>
          {/* Project intake submission form */}
          <Contact />
        </LazyShow>
      </main>

      {/* Corporate directories, newsletter registration, phone and email contacts */}
      <Footer />
    </div>
  );
}
