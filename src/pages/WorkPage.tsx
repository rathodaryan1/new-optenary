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
          title="Engineering|products that|*scale.*"
          lead="From custom e-commerce and high-capacity B2B inventory portals to intelligent AI solutions and tenant management platforms."
          primary="Start a Project"
          primaryLink="/contact"
          secondary="Our Capabilities"
          secondaryLink="/services"
          meta="Web Apps;Mobile Apps;SaaS;AI Solutions;E-Commerce"
          scrollCue="Scroll"
          chartLabel="Production lines of code · last 12 months"
          chartKpi="248k+"
          chartSub="clean TypeScript & Python delivered"
          chartStats="Uptime:99.9%;Lighthouse:99+;Commits:1,420"
          chartPop="Build deployed · Mehta Dairy"
          chartPoints="14,22,28,35,42,56,64,72,85,94,108,124"
        />
        <RwWorkGrid
          filterLabel="Filter by domain"
          allLabel="All Projects"
          countLabel="engineering builds"
          viewLabel="View Project"
          beforeLabel="Initial"
          afterLabel="Engineered"
        />
        <RwNumbers
          eyebrow="(05) Engineering Standards"
          heading="Engineering standards|*you can inspect*."
          intro="Every project is built to strict engineering principles. These are the benchmarks we commit to across all client builds."
          kpis="99.9%:Target System Uptime:up;100%:Client Code & IP Ownership:up;< 1.2s:Target Page Load Speed:up;24/7:Production Monitoring & Support:up"
          events="Git commit deployed to production · Mehta Dairy · 4 min ago;Automated security audit passed · 0 vulnerabilities · 12 min ago;API integration test suite 100% green · Urban Nest · 19 min ago;Database backup snapshot verified · PostgreSQL cluster · 32 min ago;Core Web Vitals scored 98+ · Vishal Masala · 45 min ago;Sprint demo approved · Client portal · 1 h ago"
        />
        <RwCta />
      </main>
      <RwFooter
        blurb="Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions."
        wordmark="Optenary"
      />
    </div>
  );
}
