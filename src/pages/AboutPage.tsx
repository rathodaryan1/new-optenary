import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwAbout from '../components/reachwise/RwAbout';
import RwTeam from '../components/reachwise/RwTeam';
import RwReviews from '../components/reachwise/RwReviews';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Optenary — Digital Product & Technology Studio';
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://optenary.in/about#webpage",
        "url": "https://optenary.in/about",
        "name": "About Us - Optenary",
        "description": "Optenary is a digital product & technology studio designing and engineering modern web platforms, mobile applications, custom SaaS software, and intelligent AI solutions."
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
        title="About Us | Optenary Digital Product Studio"
        description="Optenary is a digital product & technology studio based in India. We engineer scalable web platforms, mobile applications, custom software, and AI solutions."
        keywords="Optenary about, software engineering company India, web development, custom software, AI solutions, digital product studio"
        canonicalPath="/about"
        schema={aboutSchema}
      />

      {/* Floating Pill Nav with active indicator on About */}
      <RwHeader active="about" />

      <main>
        {/* Exact Reachwise About Section: Hero + Story Signal Line + Values + Careers Strip */}
        <RwAbout
          eyebrow="About Optenary"
          heading="We build digital platforms|*that scale with you*."
          lead="Optenary is a digital technology studio based in India. We design and engineer modern web platforms, mobile applications, custom SaaS software, and intelligent AI solutions."
          facts="Founded 2023;100% Code Ownership;India + Global"
          primary="Start a project"
          primaryLink="/contact"
          secondary="See our work"
          secondaryLink="/work"
          captions="Architecture design review;Sprint demo · production release;Engineering workshop · Mehta Dairy"
          storyEyebrow="(01) Our Journey"
          storyHeading="Engineering software|*that matters*."
          story="2023:Optenary founded with an engineering-first vision;2024:Delivered scalable platforms for dairy, e-commerce, and real estate;2025:Expanded into autonomous AI agents, enterprise SaaS, and mobile apps;2026:Architecting next-generation digital products globally;Now:Your project next"
          scrollHint="Scroll to follow the signal"
          valuesEyebrow="(02) Engineering Standards"
          valuesHeading="Three principles we|*stand by*."
          values="Code Quality over Shortcuts:Clean architecture, type safety with TypeScript, and comprehensive testing in every repo.;100% IP & Source Code Ownership:Every line of code, Docker file, and database schema belongs to the client from day one.;Transparent Sprints:Weekly video walkthroughs, live staging environments, and direct engineer communication."
          hiringLabel="Open Roles"
          hiringCount="2 roles"
          hiringText="Full-stack engineer (React / Node.js), AI systems developer (Python / LangChain)"
          hiringLink="/contact"
          hiringButton="See open roles"
        />

        {/* Specialists Team Section */}
        <RwTeam
          eyebrow="(03) Team"
          heading="Engineers & architects,|not *middlemen*."
          subCopy="You work directly with senior software engineers, system architects, and UI/UX designers who write the code and ship your product."
          button="Meet the team"
          buttonLink="/about#team"
        />

        {/* Client Reviews Section (iPhone lock screen cards) */}
        <RwReviews
          eyebrow="(04) Client reviews"
          heading="Trusted by founders|*and enterprises*."
          subCopy="Real feedback from the business leaders whose platforms, systems, and digital stores we have engineered."
        />

        {/* Free Audit CTA Section with Live NYC Clock */}
        <RwCta />
      </main>

      {/* Giant Wordmark Footer */}
      <RwFooter
        blurb="Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions."
        wordmark="Optenary"
      />
    </div>
  );
}
