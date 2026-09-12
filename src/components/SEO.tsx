import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  schema?: object;
  canonicalPath?: string;
  noindex?: boolean;
}

export default function SEO({ title, description, keywords, author, ogImage, schema, canonicalPath, noindex }: SEOProps) {
  useEffect(() => {
    // Update Document Title
    const brandName = 'Optenary';
    const formattedTitle = title.includes(brandName) ? title : `${title} | ${brandName}`;
    document.title = formattedTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Meta Author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', author || 'Optenary');

    // Update Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Update Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    const imageUrl = ogImage || 'https://optenary.in/images/og-image.webp';
    let ogImgTag = document.querySelector('meta[property="og:image"]');
    if (!ogImgTag) {
      ogImgTag = document.createElement('meta');
      ogImgTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImgTag);
    }
    ogImgTag.setAttribute('content', imageUrl);

    // Update Twitter Tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', formattedTitle);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);

    let twitterImgTag = document.querySelector('meta[property="twitter:image"]');
    if (!twitterImgTag) {
      twitterImgTag = document.createElement('meta');
      twitterImgTag.setAttribute('property', 'twitter:image');
      document.head.appendChild(twitterImgTag);
    }
    twitterImgTag.setAttribute('content', imageUrl);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const fullCanonicalUrl = `https://optenary.in${canonicalPath || ''}`;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);

    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonicalUrl);

    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', fullCanonicalUrl);

    // Update JSON-LD Structured Data Schema script
    let schemaScript = document.querySelector('script[id="json-ld-schema"]');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('id', 'json-ld-schema');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else {
      if (schemaScript) {
        schemaScript.remove();
      }
    }

  }, [title, description, keywords, author, ogImage, schema, canonicalPath, noindex]);

  return null;
}

