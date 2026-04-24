'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Instagram, Trophy, Award } from 'lucide-react';
import { ambassadors } from '@/data/ambassadors';
import { Card } from '@/components/ui/card';

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', onStoreChange);
      return () => m.removeEventListener('change', onStoreChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function OrbitalDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 220 320'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden
    >
      <path
        d='M 24 292 C 48 180, 120 48, 198 28'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        className='text-foreground/35'
      />
      <path d='M 200 16 l 5 5 -5 5 -5 -5 Z' className='fill-foreground/50' />
    </svg>
  );
}

function AmbassadorCard({ athlete }: { athlete: (typeof ambassadors)[0] }) {
  const igUrl = athlete.instaUrl || `https://www.instagram.com/${athlete.instagram?.replace(/^@/, '')}/`;

  return (
    <Card
      className='group relative flex flex-row overflow-hidden rounded-2xl border border-border/50 bg-gradient-card shadow-card hover:border-gold/30 hover:shadow-xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] lg:items-stretch cursor-pointer'
    >
      <div className='relative z-10 flex flex-[1.4] flex-col justify-between gap-4 p-5 sm:p-8 md:max-w-[60%]'>
        <div className='space-y-3 sm:space-y-4'>
          <h3 className='text-xl font-bold tracking-tight text-foreground group-hover:text-gold transition-colors duration-300 sm:text-2xl md:text-[1.65rem] lg:text-3xl'>
            {athlete.name}
          </h3>
          {athlete.achievemnets && athlete.achievemnets.length > 0 && (
            <ul className='space-y-2 sm:space-y-2.5'>
              {athlete.achievemnets.map((achievement, i) => (
                <li
                  key={i}
                  className='flex items-start gap-2.5 text-xs leading-snug text-muted-foreground sm:text-base'
                >
                  <Trophy className='mt-[1px] h-3.5 w-3.5 shrink-0 text-gold sm:h-4 sm:w-4' aria-hidden />
                  <span className='flex-1'>{achievement.replace(/^\d+\s*-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {athlete.instagram && <a
          href={igUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={[
            'inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/25 bg-background/40 px-3 py-2 text-xs font-medium text-foreground',
            'transition-colors hover:border-gold/50 hover:text-gold sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
          ].join(' ')}
        >
          <Instagram className='h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4' aria-hidden />
          <span>@{athlete.instagram?.replace(/^@/, '')}</span>
        </a>}
      </div>

      <div className='relative flex flex-1 items-end justify-end pr-2 sm:pr-4'>
        <OrbitalDecor className='pointer-events-none absolute bottom-6 right-2 h-[80%] max-h-[280px] w-[90%] text-foreground sm:bottom-8 lg:h-full lg:max-h-none' />
        <div className='absolute bottom-0 right-0 h-full w-full max-w-none'>
          <Image
            src={athlete.image}
            alt={athlete.name}
            width={320}
            height={480}
            className='h-full w-auto max-w-none object-contain object-bottom drop-shadow-2xl'
            unoptimized={athlete.image.endsWith('.svg')}
          />
        </div>
      </div>
    </Card>
  );
}

export default function FeaturedAthletesSection() {
  const twoCols = useMediaQuery('(min-width: 768px)');
  const perView = twoCols ? 2 : 1;
  const total = ambassadors.length;
  const [start, setStart] = useState(0);

  const canNavigate = total > perView;

  const visible = useMemo(() => {
    const out: typeof ambassadors = [];
    for (let i = 0; i < perView; i++) {
      out.push(ambassadors[(start + i) % total]);
    }
    return out;
  }, [start, perView, total]);

  const prev = () => {
    if (!canNavigate) return;
    setStart((s) => (s - 1 + total) % total);
  };

  const next = () => {
    if (!canNavigate) return;
    setStart((s) => (s + 1) % total);
  };

  return (
    <section
      id='ambassadors'
      className='relative overflow-hidden py-16 md:py-24'
      aria-labelledby='ambassadors-heading'
    >
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background' />
      <div className='pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent' />

      <div className='container relative z-[1] mx-auto px-4'>
        <div className='text-center mb-12 md:mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6'>
            <Award className='h-4 w-4' />
            Featured Athletes
          </div>
          <h2
            id='ambassadors-heading'
            className='text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-6 px-1'
          >
            We are selected by the best!
          </h2>
        </div>

        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-6 md:grid-cols-2 md:gap-8'>
            {visible.map((a) => (
              <AmbassadorCard key={a.id} athlete={a} />
            ))}
          </div>

          {canNavigate ? (
            <div className='mt-10 flex justify-center gap-4'>
              <button
                type='button'
                onClick={prev}
                className={[
                  'flex h-11 w-11 items-center justify-center rounded-full border border-foreground/30 text-foreground',
                  'transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
                ].join(' ')}
                aria-label='Previous athletes'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                type='button'
                onClick={next}
                className={[
                  'flex h-11 w-11 items-center justify-center rounded-full border border-foreground/30 text-foreground',
                  'transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
                ].join(' ')}
                aria-label='Next athletes'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
