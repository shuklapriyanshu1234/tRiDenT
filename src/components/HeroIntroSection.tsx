import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Star, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Engineered stacks built for elite athletic output.',
  },
  {
    icon: Shield,
    title: 'Laboratory Tested',
    description: 'Every batch verified for purity and potency.',
  },
  {
    icon: Star,
    title: 'Trusted Results',
    description: 'Used by professionals in 40+ countries worldwide.',
  },
];

const particles = Array.from({ length: 10 }, (_, i) => ({
  top: `${(i * 13) % 100}%`,
  left: `${(i * 23) % 100}%`,
  size: `${8 + (i % 6) * 2}px`,
  delay: `${i * 0.7}s`,
  duration: `${12 + (i % 5) * 2}s`,
}));

export default function HeroIntroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/80'>
      {/* Background gradients */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-background via-background/80 to-card/40' />
        <div className='absolute top-1/3 left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-halo-one' />
        <div className='absolute bottom-24 right-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-halo-two' />
      </div>

      {/* Floating particles */}
      <div className='pointer-events-none absolute inset-0 -z-0'>
        {particles.map((p, i) => (
          <div
            key={i}
            className='absolute rounded-full bg-gold/10 animate-float'
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-20 sm:py-24 md:py-28'>
        <div className='mx-auto max-w-4xl text-center space-y-10'>
          {/* Tagline */}
          <div className='inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-2 text-xs font-semibold text-gold uppercase tracking-wide'>
            <Star className='h-4 w-4 fill-current' />
            #1 Sports Pharmacology Brand
          </div>

          {/* Title */}
          <div className='relative flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight px-1'>
              <span className='bg-gradient-to-r from-gold via-gold-dark to-gold bg-clip-text text-transparent drop-shadow-2xl'>
                TRIDENT
              </span>{' '}
              <span className='text-foreground drop-shadow-lg'>PHARMA</span>
            </h1>
            <p className='mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed'>
              Science-built formulations that drive measurable strength, recovery, and endurance gains.
              Trusted by professionals to perform at their absolute peak.
            </p>
          </div>

          {/* CTA */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6'>
            <Button
              size='lg'
              asChild
              className='group flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark px-7 py-3 text-base font-medium text-background shadow-lg transition-all duration-300 hover:shadow-gold/20'
            >
              <Link href='/catalog'>
                Explore Catalog
                <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>

            <Button
              size='lg'
              variant='outline'
              asChild
              className='group flex items-center gap-2 border-gold/40 px-7 py-3 text-base font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10'
            >
              <Link href='/#contact'>
                Connect With Us
                <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className='mt-16 grid gap-5 sm:grid-cols-3'>
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className='group relative rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-gold/30 hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10'
            >
              <div className='flex flex-col gap-4 items-start'>
                <div className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold group-hover:scale-105 transition-transform'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='text-base font-semibold text-foreground'>{title}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(6deg); }
        }
        @keyframes halo-one {
          0%, 100% { transform: translate(0, 0) scale(0.95); }
          50% { transform: translate(15px, -20px) scale(1.05); }
        }
        @keyframes halo-two {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.08); }
        }
        .animate-float { animation: float 14s ease-in-out infinite; }
        .animate-halo-one { animation: halo-one 6s ease-in-out infinite alternate; }
        .animate-halo-two { animation: halo-two 7s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
}
