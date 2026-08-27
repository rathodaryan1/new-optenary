import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Contact Us - Start Your Project"
        description="Get in touch with Optenary to discuss your custom software development, AI automation, or mobile & web application needs."
        keywords="contact optenary, hire developers, software intake form, project inquiry, hire custom software agency"
        canonicalPath="/contact"
      />
      <Header />
      <main className="flex-grow pt-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
