import { useEffect } from 'react';
import SEO from '../components/SEO';
import RwHeader from '../components/reachwise/RwHeader';
import RwBlogList from '../components/reachwise/RwBlogList';
import RwFooter from '../components/reachwise/RwFooter';
import '../components/reachwise/reachwise.css';

export default function BlogPage({ slug: _slug }: { slug?: string } = {}) {
  useEffect(() => {
    document.title = 'Engineering Insights & Tech Articles — Optenary';
    window.scrollTo(0, 0);
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://optenary.in/blog#blog",
        "url": "https://optenary.in/blog",
        "name": "Optenary Engineering Journal",
        "description": "Architectural lessons, performance benchmarks, and production breakdowns from our engineering sprints.",
        "publisher": {
          "@type": "Organization",
          "name": "Optenary",
          "url": "https://optenary.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://optenary.in/logo.png"
          }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#EEEEE8] text-[#0D0E10] selection:bg-[#D4FF3A] selection:text-[#08090A] antialiased">
      <SEO
        title="Engineering Insights & Tech Articles | Optenary"
        description="Deep dives on high-performance web architecture, AI agent orchestration, cross-platform mobile apps, and scalable cloud deployments."
        keywords="software engineering blog, web development insights, AI automation, React Native vs Flutter, high throughput microservices, optenary journal"
        canonicalPath="/blog"
        schema={blogSchema}
      />
      <RwHeader />
      <main id="main-content">
        <RwBlogList
          eyebrow="Journal"
          heading="Engineering|*insights*."
          lead="Architectural lessons, performance benchmarks, and production breakdowns from our engineering sprints."
          stat="▲|3.2k reads this month"
          allLabel="All"
          featuredLabel="Featured"
          readSuffix="min read"
          askLabel="Your challenge"
          askTitle="Have an architecture challenge you want us to solve?"
          askText="Share your system requirements. If it provides general engineering value, we write an in-depth case study here."
          askButton="Submit challenge"
          nlLabel="Newsletter"
          nlHeading="Engineering dispatch,|every *fortnight*."
          nlPlaceholder="you@company.com"
          nlButton="Subscribe"
          nlNote="Direct engineering breakdowns · No marketing fluff"
        />
      </main>
      <RwFooter wordmark="Optenary" />
    </div>
  );
}
