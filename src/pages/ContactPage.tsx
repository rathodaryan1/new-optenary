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
        "name": "Contact Optenary — Digital Product & Technology Studio",
        "description": "Tell us about your product, timeline and technical requirements. Our engineering team reviews every brief and replies within 24 hours."
      },
      {
        "@type": "Organization",
        "@id": "https://optenary.in/#organization",
        "name": "Optenary",
        "url": "https://optenary.in/",
        "email": "hello@optenary.in",
        "telephone": "+919316688014",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN"
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
        description="Tell us about your product, timeline and technical requirements. Our engineering team reviews every brief and replies within 24 hours."
        keywords="contact Optenary, hire software engineers, custom web development, mobile app development India, AI solutions"
        canonicalPath="/contact"
        schema={contactSchema}
      />
      <RwHeader active="contact" ground="light" />
      <main>
        <RwContact />
      </main>
      <RwFooter
        blurb="Optenary designs and engineers websites, mobile applications, custom software, SaaS platforms and intelligent AI solutions."
        wordmark="Optenary"
      />
    </div>
  );
}
