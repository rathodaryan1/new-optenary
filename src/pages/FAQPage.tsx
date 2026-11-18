import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwPageHero from '../components/reachwise/RwPageHero';
import RwFaq from '../components/reachwise/RwFaq';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function FAQPage() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions — Optenary';
    window.scrollTo(0, 0);
  }, []);

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
        title="Frequently Asked Questions (FAQ) | Optenary Digital Studio"
        description="Frequently asked questions about Optenary's web development, custom software engineering, AI agent automation, pricing models, and delivery timelines."
        keywords="optenary faq, custom software faq, development process questions, project cost, project timeline, web development faq, Optenary"
        canonicalPath="/faq"
      />
      <RwHeader ground="light" />
      <main id="main-content">
        <RwPageHero
          ground="light"
          object="pulse"
          eyebrow="(05) FAQ"
          title="Frequently asked|*questions*."
          lead="Everything you need to know about our sprints, engineering team, IP ownership, and delivery process."
          primary="Start a Project"
          primaryLink="/contact"
          secondary="View Work"
          secondaryLink="/work"
          meta="Pricing;Timelines;IP Ownership;Tech Stack;Security"
          scrollCue="Scroll"
        />
        <RwFaq
          eyebrow="(01) Knowledge Base"
          heading="Clear answers to|*key questions*."
          cardTitle="Need specific technical clarification?"
          cardBody="Schedule a direct 30-minute scoping call with an Optenary engineering lead. We review your architecture and provide an estimate with zero obligation."
          button="Book Scoping Call"
          buttonLink="/contact"
        />
        <RwCta />
      </main>
      <RwFooter wordmark="Optenary" />
    </div>
  );
}
