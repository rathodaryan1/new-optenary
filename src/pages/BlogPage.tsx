import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Rss, Mail, Calendar, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const articles = [
  {
    slug: 'cost-of-mobile-app-india',
    category: 'Pricing Guide',
    title: 'How Much Does It Cost to Build a Mobile App in India in 2025?',
    excerpt: 'A detailed breakdown of mobile app development costs in India — from MVP to enterprise scale — with real numbers, timelines, and what factors drive price up or down.',
    readTime: '9 min',
    date: 'May 24, 2025',
    author: 'Aryan Rathod',
    accent: 'text-brand-orange',
    borderAccent: 'border-brand-orange/20 hover:border-brand-orange/40',
    gradient: 'from-brand-orange/15 to-brand-orangeLight/5',
    content: [
      {
        heading: 'The Short Answer',
        body: 'Mobile app development in India typically ranges from ₹3 Lakhs for a basic MVP to ₹50+ Lakhs for a full enterprise-grade platform. But the real answer depends on several factors we\'ll break down below.',
      },
      {
        heading: 'Cost by App Type',
        body: `Here's a realistic breakdown based on what Optenary and other top Indian agencies typically charge:\n\n• **Simple App (MVP)** — ₹2.5 to ₹6 Lakhs | 6–10 weeks\nBasic auth, 5–8 screens, one backend API, no complex logic. Examples: landing + booking form, referral app.\n\n• **Mid-Complexity App** — ₹8 to ₹20 Lakhs | 3–5 months\nAuthentication, real-time features, 3rd-party integrations (payment gateway, maps, notifications), admin panel. Examples: e-commerce app, service booking platform.\n\n• **Complex / Enterprise App** — ₹25 to ₹80 Lakhs+ | 6–12 months\nMulti-role systems, AI features, complex data models, custom hardware integrations, multi-language. Examples: healthcare platform, multi-vendor marketplace.`,
      },
      {
        heading: 'What Drives the Cost Up?',
        body: `The biggest cost drivers in any mobile app project:\n\n1. **Custom Design** — A bespoke UI/UX takes 3–5x longer than using a component library.\n2. **Third-party Integrations** — Each new API (payments, maps, SMS, ERP) adds 2–10 days of work.\n3. **Real-time Features** — Live chat, tracking, or notifications require WebSockets and a more complex backend.\n4. **Cross-platform vs Native** — React Native covers iOS + Android in one codebase. Separate native apps cost 1.8x–2x.\n5. **Admin Dashboard** — A full admin panel typically adds 30–50% to the total cost.`,
      },
      {
        heading: 'How to Reduce Costs Without Cutting Corners',
        body: `Smart ways to build great apps on a budget:\n\n• **Start with an MVP** — Launch with core features only, validate with real users, then add features based on feedback.\n• **Use React Native or Flutter** — Cover both iOS and Android with a single codebase.\n• **Reuse open-source libraries** — Auth, maps, payments, and UI kits all have battle-tested open-source options.\n• **Fixed-scope contracts** — Avoid hourly billing. Fixed-price projects with clear milestones prevent bill shock.\n• **Phased development** — Break the project into Phase 1 (MVP) and Phase 2 (full feature set) to manage cash flow.`,
      },
      {
        heading: 'Optenary\'s Approach',
        body: 'Every project at Optenary starts with a free scoping session where we map your exact requirements, identify the leanest path to an MVP, and provide a transparent fixed-price quote. We\'ve delivered 20+ apps across PropTech, EdTech, FoodTech, and FinTech — always on time and within scope.',
      },
    ],
  },
  {
    slug: 'native-vs-hybrid-app',
    category: 'Architecture',
    title: 'Native vs Hybrid App Development: Which is Right for Your Business?',
    excerpt: 'A practical comparison of native iOS/Android development vs cross-platform frameworks like React Native and Flutter — with honest trade-offs for startups and enterprises.',
    readTime: '7 min',
    date: 'May 20, 2025',
    author: 'Arjun parmar',
    accent: 'text-purple-400',
    borderAccent: 'border-purple-500/20 hover:border-purple-500/40',
    gradient: 'from-purple-500/15 to-violet-500/5',
    content: [
      {
        heading: 'The Core Question',
        body: 'When you decide to build a mobile app, one of the first decisions you\'ll make is platform strategy: should you go native (separate Swift/Kotlin apps for iOS and Android) or cross-platform (one codebase for both using React Native or Flutter)?',
      },
      {
        heading: 'Native Development',
        body: `**What it is:** Building two separate apps — one in Swift/SwiftUI for iOS, one in Kotlin/Jetpack Compose for Android.\n\n**Pros:**\n• Best performance — no bridge overhead, direct access to device APIs\n• Full access to latest platform features the day Apple/Google releases them\n• Better battery and memory efficiency for complex animations or AR features\n• Platform-specific UX that feels truly native to users\n\n**Cons:**\n• Costs nearly 2x — you're maintaining two separate codebases\n• Requires two specialized teams (iOS + Android)\n• Features take longer to ship — every change must be implemented twice\n\n**Best for:** High-performance apps, AR/VR, apps needing deep hardware access (Bluetooth LE, NFC, camera processing), or companies with large engineering teams.`,
      },
      {
        heading: 'Cross-Platform (React Native / Flutter)',
        body: `**What it is:** A single codebase that compiles to native iOS and Android apps.\n\n**React Native** (Meta) — Uses JavaScript/TypeScript, renders to native components. Huge ecosystem, easiest for web teams to adopt.\n\n**Flutter** (Google) — Uses Dart, renders using its own graphics engine (Skia/Impeller). Pixel-perfect consistency across platforms.\n\n**Pros:**\n• One codebase = roughly 60–70% cost saving vs native\n• Faster development cycles — ship features once for both platforms\n• Shared business logic, state management, and APIs\n• Mature ecosystem — used by Meta, Airbnb, Microsoft, Alibaba\n\n**Cons:**\n• Slightly lower performance than native for graphics-heavy apps\n• Some device features require native modules (extra bridge code)\n• Flutter\'s Dart language has a smaller talent pool`,
      },
      {
        heading: 'How to Choose: A Decision Framework',
        body: `**Choose Native if:**\n✓ You need peak performance (games, AR, real-time video processing)\n✓ You rely heavily on the latest iOS/Android APIs immediately on release\n✓ You have separate iOS and Android engineering teams already\n\n**Choose React Native if:**\n✓ You have a web/JavaScript team\n✓ You want to share code with a web app (React)\n✓ You need to ship fast and keep costs down\n✓ 90%+ of your app is standard UI — lists, forms, navigation\n\n**Choose Flutter if:**\n✓ You need pixel-perfect, highly custom UI\n✓ You want consistent behavior across iOS, Android, and web from one codebase\n✓ Performance is critical but a full native rewrite isn\'t feasible`,
      },
      {
        heading: 'What Does Optenary Recommend?',
        body: 'For 90% of the startups and SMBs we work with, we recommend React Native. It lets you ship faster, iterate quickly based on user feedback, and scale without burning your runway. We\'ve built 12+ production apps in React Native with no performance complaints. For consumer apps with very high design fidelity requirements, Flutter is our second choice. We only recommend going native when there\'s a specific, justified technical need.',
      },
    ],
  },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative rounded-2xl bg-dark-card border ${article.borderAccent} overflow-hidden transition-all`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${article.accent}`}>{article.category}</span>
          <div className="flex items-center gap-3 text-dark-muted text-xs">
            <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
            <span className="flex items-center gap-1"><BookOpen size={11} />{article.readTime} read</span>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-white mb-3 leading-snug group-hover:text-white transition-colors">
          {article.title}
        </h2>
        <p className="text-dark-muted text-sm leading-relaxed mb-6">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-dark-muted">
            <User size={13} />
            <span>{article.author}</span>
          </div>
          <Link
            to={`/blog/${article.slug}`}
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${article.accent} hover:gap-3 transition-all`}
          >
            Read Article <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function FullArticle({ article }: { article: typeof articles[0] }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://optenary.in/blog/${article.slug}#entry`,
        "mainEntityOfPage": `https://optenary.in/blog/${article.slug}`,
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": "2025-05-24", // Standardize/approximate from metadata
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Optenary",
          "logo": {
            "@type": "ImageObject",
            "url": "https://optenary.in/images/logo.webp"
          }
        }
      },
      {
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
            "name": "Blog",
            "item": "https://optenary.in/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://optenary.in/blog/${article.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white antialiased flex flex-col">
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={`${article.category.toLowerCase()}, optenary blog, mobile app, software development`}
        canonicalPath={`/blog/${article.slug}`}
        schema={articleSchema}
      />
      <Header />
      <main className="flex-grow">
        <article className="max-w-3xl mx-auto px-6 md:px-12 pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className={`text-xs font-bold uppercase tracking-wider ${article.accent}`}>{article.category}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-4 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-4 text-dark-muted text-sm mb-8 flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} />{article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} />{article.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime} read</span>
            </div>
            <p className="text-lg text-dark-muted leading-relaxed border-l-4 border-brand-orange pl-6 mb-10 italic">{article.excerpt}</p>
          </motion.div>

          <div className="space-y-10">
            {article.content.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{section.heading}</h2>
                <div className="text-dark-muted text-sm leading-relaxed whitespace-pre-line">
                  {section.body.split('\n').map((line, j) => {
                    if (line.startsWith('•') || line.startsWith('✓') || /^\d+\./.test(line)) {
                      return <div key={j} className="ml-4 my-1">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</div>;
                    }
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={j} className="mb-2">
                        {parts.map((part, k) => k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : part)}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-dark-card border border-brand-orange/20 text-center">
            <p className="text-white font-semibold mb-2">Ready to build your app?</p>
            <p className="text-dark-muted text-sm mb-4">Get a free project scope and fixed-price quote from Optenary.</p>
            <Link to="/contact" className="inline-flex px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-all">
              Get a Free Quote
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogPage({ slug }: { slug?: string }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const matchedArticle = slug ? articles.find(a => a.slug === slug) : null;
  if (matchedArticle) return <FullArticle article={matchedArticle} />;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    window.location.href = `mailto:info@optenary.in?subject=Blog Subscription&body=Please add ${email} to the Optenary blog newsletter.`;
    setSubscribed(true);
    setEmail('');
  };

  const blogListSchema = {
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
        "name": "Blog",
        "item": "https://optenary.in/blog"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-brand-orange selection:text-dark-bg antialiased flex flex-col">
      <SEO
        title="Optenary Tech Blog | Web Development, AI &amp; Mobile Insights"
        description="Read the Optenary tech blog for practical guides, engineering deep-dives, pricing structures, and insights on custom software and AI automation."
        keywords="optenary blog, mobile app cost india, native vs hybrid app, web development guide, AI automation insights, software agency blog"
        canonicalPath="/blog"
        schema={blogListSchema}
      />
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative pt-28 pb-16 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-orange/5 blur-[160px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-6">
              <Rss size={12} /> Optenary Blog
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Insights on building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">great software</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-dark-muted text-base md:text-lg max-w-2xl mx-auto mb-10">
              Engineering deep-dives, product strategy, and pricing guides from the team that has shipped 20+ products worldwide.
            </motion.p>

            {/* Email Subscribe */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-md mx-auto">
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold text-sm">
                  ✓ You're on the list! We'll notify you when we publish.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-card border border-dark-border focus-within:border-brand-orange/40 transition-colors">
                    <Mail size={16} className="text-dark-muted shrink-0" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                      className="bg-transparent text-white text-sm outline-none w-full placeholder:text-dark-muted" />
                  </div>
                  <button type="submit" className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap">
                    Notify Me
                  </button>
                </form>
              )}
              <p className="text-dark-muted text-xs mt-2">No spam. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </section>

        {/* Articles */}
        <section className="px-6 md:px-12 pb-24 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={16} className="text-brand-orange" />
            <span className="text-dark-muted text-sm font-semibold uppercase tracking-wider">Latest Articles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, idx) => <ArticleCard key={article.slug} article={article} index={idx} />)}
          </div>

          {/* Upcoming teasers */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={16} className="text-dark-muted" />
              <span className="text-dark-muted text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Developer or Agency for App Dev?', 'AI Agents: Automating Service Efficiency'].map((title, i) => (
                <div key={i} className="p-5 rounded-xl bg-dark-card border border-dark-border opacity-60 cursor-default">
                  <div className="text-dark-muted text-xs font-bold uppercase tracking-wider mb-2">Publishing soon</div>
                  <div className="text-white text-sm font-semibold">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
