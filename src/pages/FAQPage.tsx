import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

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
        title="Frequently Asked Questions (FAQ) | Optenary Software &amp; AI"
        description="Frequently asked questions about Optenary's web development, custom software engineering, AI agent automation, pricing models, and delivery timelines."
        keywords="optenary faq, custom software faq, development process questions, project cost, project timeline, web development faq, Optenary"
        canonicalPath="/faq"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="flex-grow pt-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'FAQ' }]} className="mb-6" />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
