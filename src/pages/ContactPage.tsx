import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwContact from '../components/reachwise/RwContact';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact — Optenary Digital Product Studio';
    window.scrollTo(0, 0);
  }, []);

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://optenary.in/contact#webpage",
        "url": "https://optenary.in/contact",
        "name": "Contact Optenary — Digital Marketing Agency",
        "description": "Tell us where you are and where you want to be. A senior strategist reads every message and replies within two hours on work days."
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
        title="Contact — Optenary Digital Product Studio"
        description="Tell us where you are and where you want to be. A senior strategist reads every message and replies within two hours on work days."
        keywords="contact Optenary, marketing agency contact, hire digital marketing agency, SEO agency New York, marketing strategy call"
        canonicalPath="/contact"
        schema={contactSchema}
      />
      <RwHeader active="contact" ground="light" />
      <main>
        <RwContact />
      </main>
      <RwFooter
        blurb="SEO, social media and paid ads that bring the right people to your door."
        wordmark="Optenary"
      />
    </div>
  );
}
