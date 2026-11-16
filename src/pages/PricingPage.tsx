import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwPageHero from '../components/reachwise/RwPageHero';
import RwPricing from '../components/reachwise/RwPricing';
import RwReviews from '../components/reachwise/RwReviews';
import RwFaq from '../components/reachwise/RwFaq';
import RwCta from '../components/reachwise/RwCta';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#08090A] text-white antialiased">
      <SEO
        title="Pricing — Transparent Engineering Engagements | Optenary"
        description="Transparent sprint and dedicated squad engagements. Every build comes with full source code ownership, automated testing, and guaranteed SLAs."
        canonicalPath="/pricing"
      />

      <RwHeader active="pricing" ground="dark" />

      <main>
        <RwPageHero
          ground="dark"
          object="pulse"
          eyebrow="(08) Engagements & Pricing"
          title="Transparent sprint|*investments.*"
          lead="Choose a dedicated sprint cadence or embedded engineering squad. Every engagement delivers production-grade architecture, complete source code ownership, and weekly staging previews."
          primary="Explore Engagements"
          primaryLink="#pricing"
          secondary="Architecture Discovery Call"
          secondaryLink="/contact"
          meta="Web Dev;Mobile Apps;SaaS;AI Agents;Cloud DevOps"
        />

        <RwPricing id="pricing" />
        <RwReviews />
        <RwFaq />
        <RwCta />
      </main>

      <RwFooter wordmark="Optenary" />
    </div>
  );
}

