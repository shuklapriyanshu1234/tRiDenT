import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import { Shield, Zap, Globe, Users, Award } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      id: 1,
      icon: Shield,
      title: 'Our own production',
      description:
        'We guarantee the fairest price for our highest quality and original products',
      backgroundImage: '/advantages/our-own-production.png',
      gradient: 'from-blue-600/80 to-blue-800/80',
    },
    {
      id: 2,
      icon: Award,
      title: 'Flexible discount system',
      description:
        'We provide promotions, contests, gifts, and offers for coaches and athletes',
      backgroundImage: '/advantages/flexible-discount-system.png',
      gradient: 'from-purple-600/80 to-purple-800/80',
    },
    {
      id: 3,
      icon: Zap,
      title: 'Professional advice for free',
      description:
        'We employ highly qualified consultants and we always provide free support',
      backgroundImage: '/advantages/professional-advice-for-free.png',
      gradient: 'from-green-600/80 to-green-800/80',
    },
    {
      id: 4,
      icon: Globe,
      title: 'Anti-counterfeiting',
      description:
        'Trident Pharma products have a unique check code for online originality verification',
      backgroundImage: '/advantages/anti-counterfeiting.png',
      gradient: 'from-orange-600/80 to-orange-800/80',
    },
    {
      id: 5,
      icon: Users,
      title: 'High quality service',
      description:
        'Our managers work nonstop, even on holidays and weekends, to process applications and offer the best fitting, cost-effective option',
      backgroundImage: '/advantages/high-quality-service.png',
      gradient: 'from-red-600/80 to-red-800/80',
    },
  ];

  return (
    <section className='relative py-20 md:py-28 overflow-hidden bg-gradient-dark'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background'></div>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl'></div>

      <div className='container relative z-10 mx-auto px-4 sm:px-6'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6'>
            <Award className='h-4 w-4' />
            Our Advantages
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-6 px-1'>
            Why Choose Trident Pharma
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-1'>
            Discover the key advantages that make us the preferred choice for
            professional athletes and fitness enthusiasts worldwide.
          </p>
        </div>

        {/* Timeline */}
        <div className='relative max-w-4xl mx-auto'>
          {/* Desktop Timeline */}
          <div className='hidden md:block relative'>
            {/* Vertical timeline line */}
            <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30'></div>

            {/* Advantages as timeline items */}
            <div className='space-y-12'>
              {advantages.map((advantage, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={advantage.id}
                    className={`relative flex ${
                      isEven ? 'flex-row' : 'flex-row-reverse'
                    } items-center`}
                  >
                    {/* Content Card */}
                    <div
                      className={`w-full md:w-1/2 ${
                        isEven ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <Card className='group relative overflow-hidden rounded-2xl shadow-card hover:shadow-xl transition-smooth cursor-pointer border border-gold/20 hover:border-gold/40 bg-gradient-card'>
                        <CardContent className='p-6'>
                          <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center group-hover:glow-gold transition-glow'>
                              <Image
                                src={advantage.backgroundImage}
                                alt={advantage.title}
                                width={64}
                                height={64}
                                className='h-16 w-16 object-cover rounded-full border-2 border-gold'
                              />
                            </div>
                            <div>
                              <h3 className='text-xl font-semibold text-gold-dark mb-2 group-hover:text-gold transition-colors duration-300'>
                                {advantage.title}
                              </h3>
                              <p className='text-muted-foreground leading-relaxed'>
                                {advantage.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline connector dot */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gold border-4 border-background shadow-card z-10'></div>

                    {/* Empty spacer for alternating layout */}
                    <div className='hidden md:block w-5/12'></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className='block md:hidden space-y-6'>
            {advantages.map((advantage) => (
              <Card
                key={advantage.id}
                className='group relative overflow-hidden rounded-2xl shadow-card hover:shadow-xl transition-smooth cursor-pointer border border-gold/20 hover:border-gold/40 bg-gradient-card'
              >
                <CardContent className='p-4'>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center group-hover:glow-gold transition-glow'>
                      <Image
                        src={advantage.backgroundImage}
                        alt={advantage.title}
                        width={56}
                        height={56}
                        className='h-14 w-14 object-cover rounded-full border-2 border-gold'
                      />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gold-dark mb-1 group-hover:text-gold transition-colors duration-300'>
                        {advantage.title}
                      </h3>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
