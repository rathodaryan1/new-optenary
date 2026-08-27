import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col justify-between">
      <SEO 
        title="Frequently Asked Questions - FAQ"
        description="Find answers to common questions about Optenary's design process, engagement models, project pricing, technology stack, and timeline delivery."
        keywords="optenary faq, custom software faq, development process questions, project cost, project timeline, design pricing"
        canonicalPath="/faq"
      />
      <Header />
      <main className="flex-grow pt-10">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
