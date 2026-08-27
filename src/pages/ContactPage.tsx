import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Contact Optenary | Start Your Custom Software or AI Project"
        description="Get in touch with Optenary to discuss your custom software development, AI automation, or mobile & web application needs. Get a free quote & project scoping."
        keywords="contact optenary, hire developers, software intake form, project inquiry, hire custom software agency"
        canonicalPath="/contact"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="flex-grow pt-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
