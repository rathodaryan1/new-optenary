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
          eyebrow="Now booking Q4 · 3 spots left"
          heading="Get seen by|the *right crowd.*"
          subCopy="Optenary is a digital marketing & technology studio. We run SEO, social media and paid ads that put your brand in front of the people who buy, and we report every result in plain numbers."
          primary="Book a strategy call"
          primaryLink="#contact"
          secondary="See our work"
          secondaryLink="#work"
          hint="MOVE TO REACH · CLICK TO LAUNCH A CAMPAIGN"
          counterLabel="PEOPLE REACHED FOR CLIENTS THIS MONTH"
          counterStart={1295949}
          services="SEO, Social media, Paid ads, Content"
          navCta="Book a call"
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
          eyebrow="(05) The numbers"
          heading="What our clients|*got* last year."
          intro="Every client gets this report each month. These are the averages across all of them."
          kpis="212%:average organic growth:up;6.2×:return on ad spend:up;38M:people reached in 2025:up;140+:brands grown since 2018:up"
          events="New lead · Haven Realty · 2 min ago;Call booked · Northside Dental · 6 min ago;Reel passed 48k views · Kettlebrook Coffee · 11 min ago;ROAS 6.4× today · Fitloop · 18 min ago;#1 for “skin clinic near me” · Lumen Skin · 26 min ago;5-star review · Orbit Legal · 34 min ago;New lead · Northside Dental · 41 min ago;212 new followers · Lumen Skin · 1 h ago"
        />

        {/* Exact Reachwise (06) Content Social Media Feed Section */}
        <RwFeed
          eyebrow="(06) Content"
          heading="Content that|*stops the scroll.*"
          subCopy="We plan, shoot, edit and post for our clients every month. Reels, carousels and stories made for how each platform actually works."
          stats="18 REELS LAST MONTH;94% SAVES;+112% REACH"
          button="Social media service"
          buttonLink="/services/social-media"
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
