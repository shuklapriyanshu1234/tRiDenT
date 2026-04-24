'use client';

import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/trident.pharma';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Our advantages', href: '/#advantages' },
  { name: 'Featured athletes', href: '/#ambassadors' },
  { name: 'Product check', href: '/authenticity' },
  { name: 'Contact', href: '/#contact' },
] as const;

const Footer = () => {
  return (
    <footer className='relative border-t border-border/50 bg-gradient-to-b from-card/40 via-background to-background'>
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent'
        aria-hidden
      />
      <div className='container mx-auto px-4 py-14 md:py-20'>
        <div className='grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10'>
          {/* Brand + primary CTA */}
          <div className='space-y-6 lg:col-span-6'>
            <div>
              <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/90'>
                Sports pharmacology
              </p>
              <h2 className='mt-2 text-2xl font-bold tracking-tight text-gold md:text-3xl'>
                TRIDENT PHARMA
              </h2>
              <p className='mt-3 max-w-md text-sm leading-relaxed text-muted-foreground'>
                Professional-grade formulations for athletes who expect verified quality, clear
                labeling, and consistent results.
              </p>
            </div>

            <a
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={[
                'group flex max-w-md items-center gap-4 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4',
                'transition-all duration-200 hover:border-gold/45 hover:bg-gold/[0.1] hover:shadow-md hover:shadow-gold/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
              ].join(' ')}
            >
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-gold/20 text-pink-500'>
                <Instagram className='h-5 w-5' aria-hidden />
              </span>
              <span className='min-w-0 flex-1 text-left'>
                <span className='block text-sm font-semibold text-foreground'>Instagram</span>
                <span className='block truncate text-xs text-muted-foreground'>@trident.pharma</span>
              </span>
              <ArrowUpRight
                className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold'
                aria-hidden
              />
            </a>
          </div>

          {/* Explore */}
          <div className='lg:col-span-6'>
            <h3 className='text-xs font-semibold uppercase tracking-widest text-gold/80'>
              Explore
            </h3>
            <nav
              className='mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-2'
              aria-label='Footer navigation'
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'rounded-lg px-1 py-2 text-sm text-muted-foreground',
                    'transition-colors duration-200 hover:text-gold',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row sm:items-center'>
          <p className='text-center text-xs text-muted-foreground sm:text-left'>
            © {new Date().getFullYear()} Trident Pharma. All rights reserved.
          </p>
          <button
            type='button'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm'
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
