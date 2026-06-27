import type { MetadataRoute } from 'next';
import { COUNTRY_GUIDES } from '@/lib/countries';

export const dynamic = 'force-static';

const BASE_URL = 'https://calcglobal.com';
const LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'ja'];
const CALCULATORS = [
  'income-tax',
  'mortgage',
  'corporate-tax',
  'capital-gains-tax',
  'inheritance-tax',
];
const STATIC_PAGES = ['experts', 'resources', 'get-started', 'investors'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of LOCALES) {
    // Home page — highest priority
    entries.push({
      url: `${BASE_URL}/${locale}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Calculator pages — high intent traffic
    for (const calc of CALCULATORS) {
      entries.push({
        url: `${BASE_URL}/${locale}/calculators/${calc}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }

    // Countries listing
    entries.push({
      url: `${BASE_URL}/${locale}/countries/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Individual country pages
    for (const guide of COUNTRY_GUIDES) {
      entries.push({
        url: `${BASE_URL}/${locale}/countries/${guide.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Static pages
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
