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
        "description": "AI Automation & Custom Software Development Partner",
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
        "description": "Optenary is a global technology partner offering custom software development, mobile app development, web development, and AI agent automation services.",
        "areaServed": "Global"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased">
      <SEO 
        title="Web Development Services & AI Automation Agency"
        description="Optenary is your global technology partner specializing in web development services, AI agents, custom software, automated workflows, and scalable mobile apps."
        keywords="web development services, AI automation, custom software, web development agency, workflow automation, Optenary"
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
