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
    document.title = 'About Optenary — Digital Marketing Agency in New York';
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
        "description": "Optenary is a digital product & technology studio helping brands get found on search, stopped on social and chosen over the competition."
      },
      {
        "@type": "Organization",
        "@id": "https://optenary.in/#organization",
        "name": "Optenary",
        "url": "https://optenary.in/",
        "email": "hello@optenary.in",
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
        description="Optenary is a digital product & technology studio. Since 2016 we have helped 140+ brands get found on search, stopped on social and chosen over the competition."
        keywords="Optenary about, marketing agency New York, SEO team, digital marketing agency, growth team"
        canonicalPath="/about"
        schema={aboutSchema}
      />

      {/* Floating Pill Nav with active indicator on About */}
      <RwHeader active="about" />

      <main>
        {/* Exact Reachwise About Section: Hero + Story Signal Line + Values + Careers Strip */}
        <RwAbout
          eyebrow="About Optenary"
          heading="We put brands|*in front of people*."
          lead="Optenary is a digital product & technology studio. Since 2016 we have helped 140+ brands get found on search, stopped on social and chosen over the competition — and we report every result in plain numbers."
          facts="Founded 2016;38 people;New York + remote"
          primary="Book a call"
          primaryLink="/contact"
          secondary="See our work"
          secondaryLink="/work"
          captions="Monday strategy review;Content sprint · week 32;Client workshop · Lumen Skin"
          storyEyebrow="(01) Our story"
          storyHeading="Ten years of|*reaching people*."
          story="2016:Two people, one laptop in Brooklyn;2018:First 20 clients, all local;2020:Paid ads team joins;2022:38 people, New York + remote;2025:140+ brands grown;2026:Your brand next"
          scrollHint="Scroll to follow the signal"
          valuesEyebrow="(02) How we work"
          valuesHeading="Three rules we|*don't break*."
          values="Numbers over opinions:Every decision starts with data from your own accounts, not a hunch or a trend.;One team, every channel:SEO, social, ads and content are planned together, so they all push the same way.;No long contracts:Month to month after the first 90 days. We keep clients by getting results."
          hiringLabel="We're hiring"
          hiringCount="3 roles"
          hiringText="SEO strategist, social media producer, paid ads specialist"
          hiringLink="/contact"
          hiringButton="See open roles"
        />

        {/* Specialists Team Section */}
        <RwTeam
          eyebrow="(03) Team"
          heading="Specialists,|not *generalists*."
          subCopy="Every account gets a senior lead for each channel you buy. No juniors learning on your budget, no hand-offs."
          button="Meet the team"
          buttonLink="/about#team"
        />

        {/* Client Reviews Section (iPhone lock screen cards) */}
        <RwReviews
          eyebrow="(04) Client reviews"
          heading="Clients who|*stayed*."
          subCopy="Our average client has been with us for 2.4 years. These are the messages that land in our inbox when the numbers move."
        />

        {/* Free Audit CTA Section with Live NYC Clock */}
        <RwCta />
      </main>

      {/* Giant Wordmark Footer */}
      <RwFooter
        blurb="SEO, social media and paid ads that bring the right people to your door."
        wordmark="Optenary"
      />
    </div>
  );
}
