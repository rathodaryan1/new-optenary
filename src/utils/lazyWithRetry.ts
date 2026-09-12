import { lazy, type ComponentType } from 'react';

/**
 * Wraps React.lazy with automatic chunk retry logic.
 * If a dynamic import fails due to a network glitch or a new production deployment,
 * it attempts a single retry / page reload to fetch the latest chunk.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // User may have an old version of the application with stale chunk hashes.
        // A reload will fetch the latest HTML with current hashed chunk paths.
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return { default: (() => null) as unknown as T };
      }
      // If we already tried reloading and it still fails, bubble up the error to ErrorBoundary
      throw error;
    }
  });
}
