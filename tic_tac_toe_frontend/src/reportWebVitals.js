/* eslint-disable no-console */

/**
 * Optional CRA hook for measuring performance.
 * Left here for compatibility with standard CRA tooling.
 */
export default function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Lazy-load web-vitals only when used.
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((e) => console.warn("web-vitals not available:", e));
  }
}
