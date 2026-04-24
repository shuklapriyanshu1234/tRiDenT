'use client';

import { useLayoutEffect, useRef } from 'react';

export default function MaintenanceBanner() {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const updateHeightVar = () => {
      const height = bannerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty(
        '--maintenance-banner-height',
        `${height}px`
      );
    };

    updateHeightVar();
    window.addEventListener('resize', updateHeightVar);
    return () => {
      window.removeEventListener('resize', updateHeightVar);
      document.documentElement.style.removeProperty(
        '--maintenance-banner-height'
      );
    };
  }, []);

  return (
    <div ref={bannerRef} className="fixed top-0 left-0 right-0 z-[60] bg-yellow-500 text-black pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2 text-center text-xs sm:text-sm font-medium max-w-[100vw]">
        The site is currently under maintenance. Some features may be unavailable.
      </div>
    </div>
  );
}


