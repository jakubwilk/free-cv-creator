'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks which section (by ID) is currently visible in the viewport and
 * updates the URL hash via history.replaceState — no scroll, no history entry.
 *
 * Only the IDs passed in `sectionIds` are considered "linkable".
 * When none of them is active (e.g. hero, top of page), the hash is cleared.
 *
 * @param sectionIds - Ordered list of section IDs to observe (must match DOM ids)
 */
export function useActiveSection(sectionIds: string[]) {
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const updateHash = (id: string | null) => {
      if (id === activeRef.current) return;
      activeRef.current = id;

      const newUrl = id
        ? `${window.location.pathname}${window.location.search}#${id}`
        : `${window.location.pathname}${window.location.search}`;

      history.replaceState(null, '', newUrl);
    };

    // Ratio of section height that must be visible to count as "active".
    // A narrow band around the vertical centre of the viewport works well
    // for most section heights.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateHash(entry.target.id);
          } else if (activeRef.current === entry.target.id) {
            // Section left viewport — clear hash only if no other section picks it up
            updateHash(null);
          }
        });
      },
      {
        // Trigger when the section crosses the horizontal band between
        // 40 % from the top and 45 % from the bottom of the viewport.
        rootMargin: '-40% 0px -45% 0px',
        threshold: 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);
}
