import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function FAQPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://optenary.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://optenary.in/faq"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Frequently Asked Questions | Optenary Software &amp; AI FAQ"
        description="Find answers to common questions about Optenary's design process, engagement models, project pricing, technology stack, and timeline delivery."
        keywords="optenary faq, custom software faq, development process questions, project cost, project timeline, design pricing"
        canonicalPath="/faq"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="flex-grow pt-10">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
