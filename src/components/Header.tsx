'use client';
import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle, ChevronRight, Instagram } from 'lucide-react';
import WelcomeModal from './WelcomeModal';

const HEADER_HEIGHT = 64; // px — matches h-16
const INSTAGRAM_URL = 'https://www.instagram.com/trident.pharma';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Our advantages', href: '/#advantages' },
  { name: 'Athletes', href: '/#ambassadors' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Product check', href: '/authenticity' },
  { name: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── lock body scroll when sidebar is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  /* ── close sidebar on route change ── */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ── helpers ── */
  const smoothScrollToId = (id: string): boolean => {
    const el = document.getElementById(id);
    if (!el) return false;
    window.scrollTo({ top: el.offsetTop - HEADER_HEIGHT, behavior: 'smooth' });
    return true;
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];

      if (!targetId) {
        router.push('/');
        return;
      }

      if (pathname === '/') {
        smoothScrollToId(targetId);
      } else {
        router.push(`/#${targetId}`);
      }
      return;
    }

    if (href === '/') {
      e.preventDefault();
      if (pathname !== '/') {
        router.push('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════
          HEADER BAR
      ════════════════════════════════════════ */}
      <header
        className={[
          'fixed left-0 right-0 z-50 transition-all duration-300',
          'bg-background/90 backdrop-blur-md',
          isScrolled
            ? 'border-b border-border/60 shadow-sm shadow-black/10'
            : 'border-b border-transparent',
        ].join(' ')}
        style={{ top: 'var(--maintenance-banner-height, 0px)' }}
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='flex h-16 items-center justify-between gap-4'>

            {/* ── Logo ── */}
            <div
              onClick={() => router.push('/')}
              className="flex shrink-0 items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-md"
              aria-label="Go to homepage"
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push('/');
                }
              }}
            >
              <img
                src="/logo.png"
                alt="Trident Pharma Logo"
                className="h-12 w-auto md:h-12"
                draggable={false}
              />
              <div className="hidden xl:block text-[11px] leading-tight text-muted-foreground border-l border-border pl-3 uppercase tracking-widest">
                Sports<br />Pharmacology
              </div>
            </div>
      

            {/* ── Desktop / Tablet Navigation ── */}
            <nav className='hidden md:flex items-center gap-1 lg:gap-2' aria-label='Main navigation'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={[
                    'relative px-3 py-1.5 text-sm font-medium rounded-md',
                    'text-foreground/80 hover:text-gold',
                    'transition-colors duration-200 whitespace-nowrap',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
                    'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px',
                    'after:bg-gold after:scale-x-0 after:transition-transform after:duration-300 after:origin-left',
                    'hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* ── Actions ── */}
            <div className='flex shrink-0 items-center gap-2'>
              {/* Welcome button — visible on tablet+ */}
              <Button
                onClick={() => setIsWelcomeModalOpen(true)}
                variant='outline'
                size='sm'
                className='hidden md:flex items-center gap-2 border-primary/20 hover:bg-gold/10 hover:border-gold/40 hover:text-gold text-xs lg:text-sm transition-all duration-200'
              >
                <MessageCircle className='h-4 w-4 shrink-0' />
                <span className='hidden lg:inline'>Welcome</span>
              </Button>

              {/* Mobile hamburger */}
              <Button
                variant='ghost'
                size='icon'
                className={[
                  'md:hidden h-9 w-9 rounded-md transition-all duration-200',
                  isMobileMenuOpen
                    ? 'bg-gold/10 text-gold'
                    : 'hover:bg-gold/10 hover:text-gold',
                ].join(' ')}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-expanded={isMobileMenuOpen}
                aria-controls='mobile-menu'
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span
                  className='block transition-transform duration-300'
                  style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  {isMobileMenuOpen
                    ? <X className='h-5 w-5' />
                    : <Menu className='h-5 w-5' />
                  }
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE SIDEBAR  (< md)
      ════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setIsMobileMenuOpen(false)}
        className={[
          'fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm',
          'transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Drawer panel */}
      <aside
        id='mobile-menu'
        aria-label='Mobile navigation'
        className={[
          'fixed right-0 top-0 z-50 md:hidden',
          'h-[100dvh] w-[min(85vw,22rem)]',
          'flex flex-col bg-background',
          'border-l border-gold/20 shadow-2xl shadow-black/30',
          'transition-transform duration-300 ease-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Drawer header */}
        <div className='flex shrink-0 items-center justify-between border-b border-gold/20 px-5 py-4'>
          <div className='text-lg font-bold tracking-tight'>
            <span className='text-gold'>TRIDENT</span>
            <span className='text-foreground ml-1'>Pharma</span>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMobileMenuOpen(false)}
            className='h-8 w-8 hover:bg-gold/10 hover:text-gold transition-colors'
            aria-label='Close menu'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Navigation links */}
        <nav className='flex-1 overflow-y-auto px-3 py-4' aria-label='Mobile navigation'>
          <ul className='flex flex-col gap-1'>
            {navigation.map((item, i) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={[
                    'flex items-center justify-between',
                    'rounded-lg px-4 py-3',
                    'text-base font-medium text-foreground/90',
                    'border border-transparent',
                    'hover:bg-gold/8 hover:border-gold/20 hover:text-gold',
                    'active:scale-[0.98]',
                    'transition-all duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
                    'animate-in fade-in slide-in-from-right-4',
                  ].join(' ')}
                  style={{ animationDelay: `${i * 40}ms`, animationDuration: '250ms' }}
                >
                  {item.name}
                  <ChevronRight className='h-4 w-4 text-muted-foreground/40' />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Welcome button — mobile only */}
        {/* <div className='shrink-0 px-4 pb-3'>
          <Button
            onClick={() => { setIsWelcomeModalOpen(true); setIsMobileMenuOpen(false); }}
            variant='outline'
            className='w-full gap-2 border-primary/20 hover:bg-gold/10 hover:border-gold/40 hover:text-gold text-sm transition-all duration-200'
          >
            <MessageCircle className='h-4 w-4 shrink-0' />
            Welcome
          </Button>
        </div> */}

        {/* Manager contact footer */}
        <div className='shrink-0 border-t border-gold/20 bg-background/80 px-4 py-4 space-y-3'>
          <div className='text-center'>
            <p className='text-xs font-semibold uppercase tracking-widest text-gold'>
              Follow Trident
            </p>
            <p className='mt-0.5 text-xs text-muted-foreground'>News and updates on Instagram</p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setIsMobileMenuOpen(false)}
            className={[
              'flex items-center gap-3 rounded-lg px-4 py-3',
              'border border-primary/20 bg-primary/8',
              'hover:border-gold/40 hover:bg-gold/10 hover:shadow-md hover:shadow-gold/10',
              'active:scale-[0.97]',
              'transition-all duration-200 group',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
            ].join(' ')}
          >
            <Instagram className='h-5 w-5 shrink-0 text-primary group-hover:text-gold transition-colors duration-200' />
            <div className='min-w-0'>
              <p className='text-sm font-medium text-primary group-hover:text-gold transition-colors duration-200 truncate'>
                @trident.pharma
              </p>
              <p className='text-xs text-muted-foreground'>Instagram</p>
            </div>
          </a>
        </div>
      </aside>

      <WelcomeModal
        open={isWelcomeModalOpen}
        onOpenChange={setIsWelcomeModalOpen}
      />
    </>
  );
};

export default Header;