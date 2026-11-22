/**
 * Optenary Domain & Subdomain Router Utility
 * 
 * Manages routing separation between:
 * - Public Agency Website: https://optenary.in
 * - Client Portal & Admin Platform: https://app.optenary.in
 */

export const PRODUCTION_MAIN_DOMAIN = 'optenary.in';
export const PRODUCTION_APP_SUBDOMAIN = 'app.optenary.in';

export const APP_BASE_URL = import.meta.env.VITE_APP_URL || `https://${PRODUCTION_APP_SUBDOMAIN}`;
export const SITE_BASE_URL = import.meta.env.VITE_SITE_URL || `https://${PRODUCTION_MAIN_DOMAIN}`;

/**
 * Checks if current environment is localhost / development
 */
export function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local');
}

/**
 * Checks if current host is the dedicated platform subdomain (app.optenary.in)
 */
export function isAppSubdomain(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return h === PRODUCTION_APP_SUBDOMAIN || h.startsWith('app.');
}

/**
 * Checks if current host is the public main website (optenary.in or www.optenary.in)
 */
export function isMainProductionDomain(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === PRODUCTION_MAIN_DOMAIN ||
    h === `www.${PRODUCTION_MAIN_DOMAIN}` ||
    h === 'optenary.tech' ||
    h === 'www.optenary.tech'
  );
}

/**
 * Generates an absolute or relative link to the App Platform (Client Portal / Admin)
 */
export function getAppUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (isLocalhost()) {
    return cleanPath;
  }
  return `${APP_BASE_URL}${cleanPath}`;
}

/**
 * Generates an absolute or relative link to the Public Agency Website
 */
export function getMainSiteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (isLocalhost()) {
    return cleanPath;
  }
  return `${SITE_BASE_URL}${cleanPath}`;
}
