import { useEffect } from 'react';
import RwHeader from '../components/reachwise/RwHeader';
import RwPageHero from '../components/reachwise/RwPageHero';
import RwWorkGrid from '../components/reachwise/RwWorkGrid';
import RwNumbers from '../components/reachwise/RwNumbers';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function WorkPage() {
  useEffect(() => {
    document.title = 'Work — Optenary Digital Product Studio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="optenary-site"
      style={{
        background: '#08090A',
        minHeight: '100vh',
        color: '#F5F3E9',
        overflowX: 'clip',
      }}
    >
      <RwHeader active="work" />
      <main>
        <RwPageHero
          ground="dark"
          object="chart"
          eyebrow="(03) Case studies"
          title="Results|you can|*count.*"
          lead="Every case shows the number we were hired to move, where it started and where it is now."
          primary="Book a call"
          primaryLink="/contact"
          secondary="See pricing"
          secondaryLink="/pricing"
          meta="SEO;Social media;Paid ads;Content;Web design;Branding"
          scrollCue="Scroll"
          chartLabel="Organic traffic · last 12 months"
          chartKpi="+212%"
          chartSub="vs. the year before"
          chartStats="Leads:2,940;CTR:4.8%;ROAS:6.2×"
          chartPop="New lead · Haven Realty"
          chartPoints="12,18,16,24,22,31,36,34,45,52,61,74"
        />
        <RwWorkGrid
          filterLabel="Filter by channel"
          allLabel="All"
          countLabel="case studies"
          viewLabel="View case"
          beforeLabel="Before"
          afterLabel="After"
        />
        <RwNumbers
          eyebrow="(05) The numbers"
          heading="What our clients|*got* last year."
          intro="Every client gets this report each month. These are the averages across all of them."
          kpis="212%:average organic growth:up;6.2×:return on ad spend:up;38M:people reached in 2025:up;140+:brands grown since 2018:up"
          events="New lead · Haven Realty · 2 min ago;Call booked · Northside Dental · 6 min ago;Reel passed 48k views · Kettlebrook Coffee · 11 min ago;ROAS 6.4× today · Fitloop · 18 min ago;#1 for “skin clinic near me” · Lumen Skin · 26 min ago;5-star review · Orbit Legal · 34 min ago;New lead · Northside Dental · 41 min ago;212 new followers · Lumen Skin · 1 h ago"
        />
        <RwCta />
      </main>
      <RwFooter
        blurb="SEO, social media and paid ads that bring the right people to your door."
        wordmark="Optenary"
      />
    </div>
  );
}
