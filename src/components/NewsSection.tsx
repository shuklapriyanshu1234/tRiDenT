import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/trident.pharma";

const NewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      type: "promotion",
      title: "New Product Launch",
      description: "Revolutionary performance enhancer now available",
      image: "/api/placeholder/400/250",
      link: "/catalog",
      cta: "More details",
      external: false,
    },
    {
      id: 2,
      type: "video",
      title: "Training Seminar",
      description: "Advanced training techniques with Trident supplements",
      image: "/api/placeholder/400/250",
      link: INSTAGRAM_URL,
      cta: "View on Instagram",
      external: true,
    },
    {
      id: 3,
      type: "event",
      title: "Team Competition",
      description: "Our athletes dominating the competition",
      image: "/api/placeholder/400/250",
      link: INSTAGRAM_URL,
      cta: "Follow updates",
      external: true,
    },
    {
      id: 4,
      type: "special",
      title: "Limited Time Offer",
      description: "Exclusive discounts for professional athletes",
      image: "/api/placeholder/400/250",
      link: INSTAGRAM_URL,
      cta: "See on Instagram",
      external: true,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gold">
            News & Updates
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest products, training tips, and success stories from the Trident team
          </p>
        </div>

        {/* News Carousel */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newsItems.map((item, index) => (
              <Card 
                key={item.id}
                className={`bg-gradient-card border border-border/50 shadow-card hover:shadow-lg transition-all duration-300 group ${
                  index === currentSlide ? 'ring-2 ring-primary/30 glow-primary' : ''
                }`}
              >
                <CardContent className="p-0">
                  {/* Image Placeholder */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-48 bg-gradient-to-br from-gold/10 to-gold-dark/10 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold text-gold/60 mb-2">📰</div>
                      <div className="text-xs text-muted-foreground">News Image</div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                        {getIcon(item.type)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-gold-dark group-hover:text-gold transition-smooth">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40 text-xs md:text-sm"
                      asChild
                    >
                      <a
                        href={item.link}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex items-center justify-center gap-2"
                      >
                        {item.cta}
                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary glow-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All News Button */}
        <div className="text-center mt-8 md:mt-12 px-4">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:glow-primary transition-glow font-semibold px-6 md:px-8 w-full sm:w-auto"
          >
            View All News
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;