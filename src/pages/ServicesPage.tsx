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
    document.title = 'Services — Reachwise Digital Marketing Agency';
    window.scrollTo(0, 0);
  }, []);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reachwisestudio.com/services#webpage",
        "url": "https://reachwisestudio.com/services",
        "name": "Services — Six channels. One growth plan. | Reachwise",
        "description": "SEO, social media, paid ads, content, web design and branding from one team, planned together and reported in plain numbers."
      },
      {
        "@type": "Organization",
        "@id": "https://reachwisestudio.com/#organization",
        "name": "Reachwise",
        "url": "https://reachwisestudio.com/",
        "email": "hello@reachwisestudio.com",
        "telephone": "+12125550186",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "addressCountry": "US"
        }
      }
    ]
  };

  return (
    <div
      className="reachwise-site"
      style={{
        background: '#EEEEE8',
        minHeight: '100vh',
        color: '#0D0E10',
        overflowX: 'clip',
      }}
    >
      <SEO
        title="Services — Reachwise Digital Marketing Agency"
        description="SEO, social media, paid ads, content, web design and branding from one team, planned together and reported in plain numbers."
        keywords="marketing channels, SEO, social media, paid ads, content marketing, web design, branding, Reachwise services"
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
          title="Six channels.|*One growth*|plan."
          lead="SEO, social media, paid ads, content, web design and branding from one team, planned together and reported in plain numbers."
          primary="Book a call"
          primaryLink="/contact"
          secondary="See pricing"
          secondaryLink="/pricing"
          meta="SEO;Social media;Paid ads;Content;Web design;Branding"
          scrollCue="Scroll"
          query="marketing agency near me"
          ourTitle="Reachwise · Digital marketing agency in New York"
          ourDomain="reachwisestudio.com"
          searchPop="+318 clicks this week"
        />

        {/* Exact Reachwise (01) Channel Wall Grid Section */}
        <RwServiceGrid
          eyebrow="(01) All channels"
          heading="Pick one channel,|or *all six*."
          intro="Every channel below is run by a senior specialist, reported in one dashboard and billed as one monthly retainer. Mix them as you grow."
          button="Book a call"
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
          heading="From attention|to *clients*."
        />

        {/* Exact Reachwise (09) FAQ Accordion Section */}
        <RwFaq
          eyebrow="(09) FAQ"
          heading="Questions,|*answered*."
        />

        {/* Exact Reachwise (11) Free Audit CTA Section */}
        <RwCta />
      </main>

      {/* Exact Reachwise (12) Giant Wordmark Footer */}
      <RwFooter
        blurb="SEO, social media and paid ads that bring the right people to your door."
        wordmark="Reachwise"
      />
    </div>
  );
}

