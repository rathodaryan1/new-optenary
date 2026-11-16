import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwPageHero from '../components/reachwise/RwPageHero';
import RwServiceGrid from '../components/reachwise/RwServiceGrid';
import RwFunnel from '../components/reachwise/RwFunnel';
import RwFaq from '../components/reachwise/RwFaq';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services — Optenary Digital Product Studio';
    window.scrollTo(0, 0);
  }, []);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://optenary.in/services#webpage",
        "url": "https://optenary.in/services",
        "name": "Services — Engineering Digital Platforms & Scalable Software | Optenary",
        "description": "Web development, mobile apps, UI/UX design, custom software & SaaS, AI agents & automation, and modern digital commerce engineered by one unified studio."
      },
      {
        "@type": "Organization",
        "@id": "https://optenary.in/#organization",
        "name": "Optenary",
        "url": "https://optenary.in/",
        "email": "hello@optenary.in",
        "telephone": "+919316688014",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <div
      className="optenary-site"
      style={{
        background: '#EEEEE8',
        minHeight: '100vh',
        color: '#0D0E10',
        overflowX: 'clip',
      }}
    >
      <SEO
        title="Services — Optenary Digital Product Studio"
        description="Web development, mobile apps, UI/UX design, custom software & SaaS, AI agents & automation, and modern digital commerce engineered by one unified studio."
        keywords="marketing channels, SEO, social media, paid ads, content marketing, web design, branding, Optenary services"
        canonicalPath="/services"
        schema={servicesSchema}
      />
      <RwHeader active="services" ground="light" />
      <main>
        {/* Exact Reachwise (02) Services Hero Section */}
        <RwPageHero
          ground="chalk"
          object="search"
          eyebrow="(02) Services"
          title="Six core capabilities.|*One engineering*|studio."
          lead="Web development, mobile apps, UI/UX design, custom software & SaaS, AI agents & automation, and modern digital commerce engineered by one unified studio."
          primary="Start a Project"
          primaryLink="/contact"
          secondary="Our Engagements"
          secondaryLink="/pricing"
          meta="Web Dev;Mobile Apps;UI/UX;Custom Software;AI Agents;E-Commerce"
          scrollCue="Scroll"
          query="top software development company"
          ourTitle="Optenary · Digital Product & Technology Studio"
          ourDomain="optenary.in"
          searchPop="Production Ready · Scalable"
        />

        {/* Exact Reachwise (01) Channel Wall Grid Section */}
        <RwServiceGrid
          eyebrow="(01) Core Services"
          heading="Pick one capability,|or *an end-to-end stack*."
          intro="Every solution below is architected by dedicated engineers, documented with clean architecture, and built with modern tech. Scale seamlessly from MVP to enterprise."
          button="Start a project"
          buttonLink="/contact"
          fromLabel="From"
          exploreLabel="Explore"
          liveLabel="Live"
          waitLabel="Waiting for signal"
          replayLabel="Hover a card to replay it"
        />

        {/* Exact Reachwise (04) How We Work Funnel Section */}
        <RwFunnel
          eyebrow="(04) How we work"
          heading="From architecture|to *deployment*."
        />

        {/* Exact Reachwise (09) FAQ Accordion Section */}
        <RwFaq
          eyebrow="(09) FAQ"
          heading="Engineering & process,|*clarified*."
        />

        {/* Exact Reachwise (11) Free Audit CTA Section */}
        <RwCta />
      </main>

      {/* Exact Reachwise (12) Giant Wordmark Footer */}
      <RwFooter
        blurb="Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions."
        wordmark="Optenary"
      />
    </div>
  );
}

