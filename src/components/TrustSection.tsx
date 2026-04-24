import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, CheckCircle, Star, Globe } from "lucide-react";

const TrustSection = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "All products verified and certified by international standards",
      stats: "Zero counterfeit reports"
    },
    {
      icon: Award,
      title: "Industry Leader",
      description: "Recognized excellence in sports pharmacology worldwide",
      stats: "50+ industry awards"
    },
    {
      icon: Users,
      title: "Trusted by Athletes",
      description: "Professional athletes and teams rely on our products",
      stats: "10,000+ satisfied customers"
    },
    {
      icon: Globe,
      title: "Global Presence",
      description: "Serving customers in over 50 countries worldwide",
      stats: "15+ distribution centers"
    }
  ];

  const certifications = [
    "ISO 9001:2015",
    "GMP Certified",
    "FDA Approved",
    "WADA Compliant",
    "EU Standards",
    "Lab Tested"
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold/3 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Trusted Worldwide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Why Athletes Trust Trident Pharma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on a foundation of quality, authenticity, and scientific excellence. 
            Our commitment to athletes goes beyond products—it's about performance and safety.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border border-border/50 shadow-card hover:shadow-xl hover:border-gold/30 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-gold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <div className="text-xs font-medium text-gold-dark">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-gradient-card border border-gold/20 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gold mb-4">
              Certifications & Standards
            </h3>
            <p className="text-muted-foreground">
              Our products meet the highest international quality and safety standards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-4 bg-card/50 border border-border/30 rounded-lg hover:border-gold/30 transition-colors group"
              >
                <div className="text-center">
                  <CheckCircle className="h-6 w-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-black text-gold mb-2">99.9%</div>
            <div className="text-lg font-semibold text-foreground mb-1">Customer Satisfaction</div>
            <p className="text-sm text-muted-foreground">Based on verified reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-gold mb-2">24/7</div>
            <div className="text-lg font-semibold text-foreground mb-1">Expert Support</div>
            <p className="text-sm text-muted-foreground">Professional consultation available</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-gold mb-2">48h</div>
            <div className="text-lg font-semibold text-foreground mb-1">Fast Delivery</div>
            <p className="text-sm text-muted-foreground">Express shipping worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;