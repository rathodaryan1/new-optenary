import SEO from '../components/SEO';
import RwHero from '../components/reachwise/RwHero';
import RwClients from '../components/reachwise/RwClients';
import RwIntro from '../components/reachwise/RwIntro';
import RwServices from '../components/reachwise/RwServices';
import RwWork from '../components/reachwise/RwWork';
import RwFunnel from '../components/reachwise/RwFunnel';
import RwNumbers from '../components/reachwise/RwNumbers';
import RwFeed from '../components/reachwise/RwFeed';
import RwTeam from '../components/reachwise/RwTeam';
import RwReviews from '../components/reachwise/RwReviews';
import RwFaq from '../components/reachwise/RwFaq';
import RwJournal from '../components/reachwise/RwJournal';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';

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
        "description": "Where Technology Evolves — Custom Software & Digital Product Studio",
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
        "telephone": "+919316688014",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "description": "Optenary is a digital technology studio engineering custom software, high-performance web applications, mobile apps, and autonomous AI systems.",
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
    <div className="min-h-screen bg-[#08090A] text-white selection:bg-[#D4FF3A] selection:text-[#0D0E10] antialiased">
      <SEO 
        title="Optenary | Where Technology Evolves — Custom Software & AI Studio"
        description="We design and build digital experiences that move businesses forward. From web platforms and mobile apps to intelligent software and autonomous AI agents."
        keywords="custom software development studio, web development company India, mobile app development, ecommerce development, AI agents, Optenary, Aryan Rathod"
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* Instant Reachwise Hero Experience */}
      {/* <IntroLoader /> */}

      <main>
        {/* Exact Reachwise Hero Experience Clone as per image */}
        <RwHero
          eyebrow="WHERE TECHNOLOGY EVOLVES"
          heading="We turn ambitious ideas into|*powerful digital experiences.*"
          subCopy="Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions that help businesses evolve."
          primary="Explore Our Work"
          primaryLink="/work"
          secondary="Start a Project"
          secondaryLink="/contact"
          hint="MOVE TO REACH · CLICK TO EXPLORE CAPABILITIES"
          counterLabel="PRODUCTION LINES OF CODE DELIVERED"
          counterStart={248690}
          services="Web, Mobile, SaaS, AI, E-Commerce"
          navCta="Start a project"
        />

        {/* Exact Reachwise Client Sonar Radar */}
        <RwClients />

        {/* Exact Reachwise Crowd Sort & Why Section */}
        <RwIntro />

        {/* Exact Reachwise Six-Channel Interactive Services Switcher */}
        <RwServices />

        {/* Exact Reachwise Before/After Case Studies Section */}
        <RwWork />

        {/* Exact Reachwise (04) How We Work Funnel Section */}
        <RwFunnel />

        {/* Exact Reachwise (05) The Numbers Client Report Section */}
        <RwNumbers
          eyebrow="(05) Engineering Standards"
          heading="Engineering standards|*you can inspect.*"
          intro="Every project is built to strict engineering principles. These are the benchmarks we commit to across all client builds."
          kpis="99.9%:Target System Uptime:up;100%:Client Code & IP Ownership:up;< 1.2s:Target Page Load Speed:up;24/7:Production Monitoring & Support:up"
          events="Git commit deployed to production · Mehta Dairy · 4 min ago;Automated security audit passed · 0 vulnerabilities · 12 min ago;API integration test suite 100% green · Urban Nest · 19 min ago;Database backup snapshot verified · PostgreSQL cluster · 32 min ago;Core Web Vitals scored 98+ · Vishal Masala · 45 min ago;Sprint demo approved · Client portal · 1 h ago"
        />

        {/* Exact Reachwise (06) Content Social Media Feed Section */}
        <RwFeed
          eyebrow="(06) Engineering Insights"
          heading="Software built for|*the real world.*"
          subCopy="We architect systems that endure real-world loads. From resilient database transactions to fluid, 60fps micro-interactions."
          stats="100% TYPESCRIPT;CI/CD AUTOMATED;SUB-SECOND TTFB"
          button="Custom software service"
          buttonLink="/services/custom-software"
        />

        {/* Exact Reachwise (07) Team Specialists Section */}
        <RwTeam />

        {/* Exact Reachwise (08) Client Reviews Lock Screen Section */}
        <RwReviews />

        {/* Exact Reachwise (09) FAQ Accordion Section */}
        <RwFaq />

        {/* Exact Reachwise (10) Insights / Journal Section */}
        <RwJournal />

        {/* Exact Reachwise (11) Free Audit CTA Section */}
        <RwCta />

        {/* Exact Reachwise (12) Giant Wordmark Footer */}
        <RwFooter wordmark="Optenary" />
      </main>
    </div>
  );
}
