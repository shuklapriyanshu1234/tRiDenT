'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Instagram, ExternalLink, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INSTAGRAM_URL = 'https://www.instagram.com/trident.pharma';

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    description: 'Latest updates & offers',
    url: INSTAGRAM_URL,
    accent: 'border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-500/5',
    iconColor: 'text-pink-500',
  },
];

const WelcomeModal = ({ open, onOpenChange }: WelcomeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          'flex flex-col',
          'w-[calc(100vw-1.5rem)] max-w-lg',
          'max-h-[calc(100dvh-2rem)]',
          'bg-background border border-border/60',
          'rounded-2xl shadow-xl shadow-black/20',
          'p-0 overflow-hidden',
          'focus:outline-none',
        ].join(' ')}
      >
        {/* Header */}
        <div className='relative shrink-0 px-4 sm:px-5 pt-4 pb-3 border-b border-border/40'>
          <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent' />
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold tracking-tight leading-tight'>
                <span className='text-gold'>Welcome</span>
                <span className='text-foreground'> to Trident</span>
              </h2>
              <p className='mt-0.5 text-xs text-muted-foreground'>
                Your trusted source for sports pharmacology.
              </p>
            </div>
            {/* <div className='shrink-0 w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center'>
              <span className='text-gold font-bold text-sm'>T</span>
            </div> */}
          </div>
        </div>

        {/* Scrollable body */}
        <div className='flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-3 space-y-3'>

          {/* Social grid */}
          <div>
            <p className='mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground'>
              Follow us
            </p>
            <div className='grid grid-cols-1 gap-2'>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={[
                      'group flex items-center gap-2.5 p-2.5 rounded-xl',
                      'border bg-transparent',
                      'transition-all duration-200',
                      'active:scale-[0.97]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
                      link.accent,
                    ].join(' ')}
                  >
                    <span className={['shrink-0', link.iconColor].join(' ')}>
                      <Icon className='h-4 w-4' />
                    </span>
                    <div className='min-w-0 flex-1'>
                      <p className='text-xs font-semibold text-foreground leading-tight truncate'>{link.label}</p>
                      <p className='text-[10px] text-muted-foreground leading-tight mt-0.5 truncate'>{link.description}</p>
                    </div>
                    <ExternalLink className='h-3 w-3 shrink-0 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors' />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-border/40' />

          {/* Expert CTA */}
          <div>
            <p className='mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground'>
              Need advice?
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/#contact';
                onOpenChange(false);
              }}
         
              className={[
                'group flex items-center gap-3 p-3 rounded-xl w-full',
                'border border-gold/20',
                'hover:bg-gold/8 hover:border-gold/40',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60',
              ].join(' ')}
            >
              <div className='relative shrink-0'>
                <div className='w-10 h-10 rounded-full border-2 border-gold/30 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden'>
                  <div className='flex flex-col items-center'>
                    <div className='h-3.5 w-3.5 rounded-full bg-gray-500' />
                    <div className='mt-0.5 h-1 w-6 rounded-full bg-gray-500' />
                  </div>
                </div>
                <span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-400' />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-bold text-foreground leading-tight'>Trident Pharma</p>
                <p className='text-[11px] text-muted-foreground'>Expert</p>
                <p className='mt-0.5 text-[11px] font-medium text-gold'>Contact form · Get in touch</p>
              </div>
              <ArrowRight className='h-4 w-4 shrink-0 text-gold/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200' />
            </button>
       
          </div>
        </div>

        {/* Footer */}
        <div className='shrink-0 px-4 sm:px-5 py-2 border-t border-border/40 bg-muted/20'>
          <p className='text-center text-[10px] text-muted-foreground/60 leading-snug'>
            All products for research purposes only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;