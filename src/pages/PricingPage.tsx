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
        title="Pricing — Simple Monthly Retainers | Reachwise"
        description="Pick the channels you need. Every plan comes with a strategist, a live dashboard and plain-number reports."
        canonicalPath="/pricing"
      />

      <RwHeader active="pricing" ground="dark" />

      <main>
        <RwPageHero
          ground="dark"
          object="pulse"
          eyebrow="(08) Pricing"
          title="Simple monthly|*retainers.*"
          lead="Pick the channels you need. Every plan comes with a strategist, a live dashboard and plain-number reports."
          primary="Choose a plan"
          primaryLink="#pricing"
          secondary="Talk to us"
          secondaryLink="/contact"
          meta="SEO;Social media;Paid ads;Content;Web design;Branding"
        />

        <RwPricing id="pricing" />
        <RwReviews />
        <RwFaq />
        <RwCta />
      </main>

      <RwFooter />
    </div>
  );
}

