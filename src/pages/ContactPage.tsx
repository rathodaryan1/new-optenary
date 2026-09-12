import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
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
        "name": "Contact",
        "item": "https://optenary.in/contact"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-[#0b0d0e] bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Contact Optenary | Start Your Web, Mobile or AI Project"
        description="Get in touch with Optenary to discuss your web development, mobile app, custom software, or AI agent automation project. Get a free project scope &amp; quote."
        keywords="contact optenary, hire developers, software intake form, project inquiry, hire custom software agency, Optenary"
        canonicalPath="/contact"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="flex-grow pt-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Breadcrumbs items={[{ name: 'Contact' }]} className="mb-6" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
