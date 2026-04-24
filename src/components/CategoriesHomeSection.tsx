import { Card, CardContent } from '@/components/ui/card';
import { injectableProducts, oralProducts, pctMedicineProducts } from '@/data/products';
import { Package, Syringe, Pill, Shield, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoriesHomeSection = () => {
  const router = useRouter();
  const categories = [
    // {
    //   id: 1,
    //   icon: Package,
    //   title: 'Ready-Made Courses',
    //   productCount: '12 Products',
    //   description:
    //     'Complete treatment cycles designed by professionals for optimal results and safety protocols.',
    //   image: 'ready-made-courses',
    //   link: '/catalog?filter=ready-made-courses',
    // },
    // {
    //   id: 2,
    //   icon: Zap,
    //   title: 'HGH and Peptides',
    //   productCount: '8 Products',
    //   description:
    //     'Growth hormones and peptide compounds for enhanced performance and recovery acceleration.',
    //   image: 'hgh-peptides',
    //   link: '/catalog?filter=hgh-peptides',
    // },
    {
      id: 3,
      icon: Syringe,
      title: 'Injectable Remedies',
      productCount: injectableProducts.length,
      description:
        'Professional injectable solutions with precise dosing and maximum bioavailability.',
      image: 'injectable',
      link: '/catalog?filter=injectable',
    },
    {
      id: 4,
      icon: Shield,
      title: 'PCT Medicines',
      productCount: pctMedicineProducts.length,
      description:
        'Post Cycle Therapy medications for safe and effective recovery protocols.',
      image: 'pct-medicines',
      link: '/catalog?filter=pct-medicine',
    },
    {
      id: 5,
      icon: Pill,
      title: 'Tablet Remedies',
      productCount: oralProducts.length,
      description:
        'Oral pharmaceutical solutions with convenient administration and proven effectiveness.',
      image: 'tablet-remedies',
      link: '/catalog?filter=oral',
    },
  ];

  return (
    <section className='py-16 md:py-24 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background'></div>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl'></div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6'>
            <Package className='h-4 w-4' />
            Product Categories
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-6 px-1'>
            Our Catalog
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-1'>
            Explore our comprehensive range of professional-grade products,
            carefully categorized for your specific needs and goals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className={`group bg-card/30 backdrop-blur-xl border border-border/30 hover:border-gold/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${index === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                onClick={() => router.push(category.link)}
              >
                <CardContent className='p-0 h-full relative min-h-[280px]'>
                  {/* Glassy Background */}
                  <div className='absolute inset-0'>
                    <div className='w-full h-full bg-gradient-to-br from-gold/5 via-transparent to-gold/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500'></div>
                    <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent'></div>

                    {/* Background Pattern */}
                    <div className='absolute top-4 right-4 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500'>
                      <div className='w-full h-full bg-gradient-to-br from-gold/50 to-gold-dark/50 rounded-full blur-xl'></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 p-6 h-full flex flex-col justify-between'>
                    <div>
                      {/* Icon */}
                      <div className='w-16 h-16 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500'>
                        <IconComponent className='h-8 w-8 text-gold' />
                      </div>

                      {/* Title */}
                      <h3 className='text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300'>
                        {category.title}
                      </h3>

                      {/* Product Count */}
                      <p className='text-sm text-gold font-medium mb-4'>
                        {category.productCount} Products
                      </p>

                      {/* Description */}
                      <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesHomeSection;
