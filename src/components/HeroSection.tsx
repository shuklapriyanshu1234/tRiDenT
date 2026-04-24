import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Award, Star } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const features = [
    { icon: Zap, text: "High Performance", subtitle: "Supplements" },
    { icon: Shield, text: "Laboratory Tested", subtitle: "Quality" },
    { icon: Award, text: "Professional Grade", subtitle: "Products" },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-28 sm:pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-normal animate-pulse">
              <Star className="h-4 w-4 fill-current" />
              #1 Sports Pharmacology Brand
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight flex items-center gap-2">
                <span className="text-gold drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-dark">
                  TRIDENT
                </span>
                <span className="text-foreground">PHARMA</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-dark rounded-full mt-2"></div>
            </div>

            {/* Subtitle */}
            <h1 className="text-2xl md:text-3xl font-medium text-gold drop-shadow-lg">
              Elevate Your Performance
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-lg">
              {/* with{' '}
              <span className='text-gold font-normal'>professional-grade</span>{' '}
              sports pharmacology solutions */}
              <span className="text-gold font-normal"> We are a high-tech</span>{" "}
              laboratory to develop <span className="text-gold font-normal">new and innovative</span> formulas , focused on
              providing specific benefits for high-performance athletes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background font-medium px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/catalog" className="flex items-center">
                  Explore Catalog
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold font-normal px-8 py-3 text-base transition-all duration-300 hover:shadow-md"
                asChild
              >
                <Link href="/#advantages" className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-8 pt-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 border border-border/30 hover:border-gold/30 transition-all duration-300 group hover:shadow-md hover:translate-y-[-4px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-gold transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm transition-colors group-hover:text-gold">
                      {feature.text}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light transition-colors group-hover:text-foreground">
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative hidden lg:block">
            {/* Main Product Image */}
            <div className="relative">
              <div className="w-full h-[600px] bg-gradient-to-br from-card/40 to-card/20 rounded-3xl border border-gold/20 flex items-center justify-center shadow-2xl backdrop-blur-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src="/hero/prod3.png"
                    alt="Premium Product"
                    className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105 duration-500"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-center space-y-4">
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-gold/20">
                    <h3 className="text-lg font-medium text-gold mb-1 transition-colors group-hover:text-gold-dark">
                      Premium Products
                    </h3>
                    <p className="text-sm text-muted-foreground font-light transition-colors group-hover:text-foreground">
                      Professional supplement showcase
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/10 rounded-2xl border border-gold/20 flex items-center justify-center backdrop-blur-sm animate-bounce">
                <div className="text-2xl">🏆</div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-20 bg-card/60 rounded-2xl border border-border/30 flex items-center justify-center backdrop-blur-sm group hover:border-gold/30 transition-colors duration-300">
                <div className="text-center">
                  <div className="text-lg font-medium text-gold transition-colors group-hover:text-gold-dark">
                    100%
                  </div>
                  <div className="text-xs text-muted-foreground font-light transition-colors group-hover:text-foreground">
                    Authentic
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-card/80 backdrop-blur-xl rounded-2xl border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:border-gold/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold-dark/20 border-2 border-gold/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-lg">👨‍⚕️</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-light transition-colors group-hover:text-foreground">
                    Follow us on Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/trident.pharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-2 group/link"
                  >
                    @trident.pharma
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
