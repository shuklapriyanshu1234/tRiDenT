import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Microscope, Shield, CheckCircle, FileText, Award, ArrowRight } from "lucide-react";

const InspectionSection = () => {
  const inspectionSteps = [
    {
      step: "01",
      icon: Microscope,
      title: "Laboratory Analysis",
      description: "Every batch undergoes comprehensive testing using state-of-the-art equipment",
      details: ["Purity testing", "Potency verification", "Contamination screening"]
    },
    {
      step: "02",
      icon: Shield,
      title: "Quality Assurance",
      description: "Multi-level quality checks ensure consistency and safety standards",
      details: ["GMP compliance", "ISO certification", "Third-party validation"]
    },
    {
      step: "03",
      icon: FileText,
      title: "Documentation",
      description: "Complete traceability with detailed certificates and test reports",
      details: ["Certificate of Analysis", "Batch records", "Chain of custody"]
    },
    {
      step: "04",
      icon: Award,
      title: "Final Approval",
      description: "Products released only after passing all quality parameters",
      details: ["Expert review", "Final inspection", "Quality seal"]
    }
  ];

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System",
      icon: "🏆"
    },
    {
      name: "GMP Certified",
      description: "Good Manufacturing Practice",
      icon: "✅"
    },
    {
      name: "FDA Approved",
      description: "Food and Drug Administration",
      icon: "🛡️"
    },
    {
      name: "WADA Compliant",
      description: "World Anti-Doping Agency",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/20 via-background to-card/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gold/3 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            <Microscope className="h-4 w-4" />
            Quality Inspection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Rigorous Quality Control Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every product undergoes extensive testing and inspection to ensure the highest standards 
            of purity, potency, and safety for professional athletes.
          </p>
        </div>

        {/* Inspection Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {inspectionSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border border-border/50 shadow-card hover:shadow-xl hover:border-gold/30 transition-all duration-300 group relative overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-black text-gold/10 group-hover:text-gold/20 transition-colors">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors relative z-10">
                    <IconComponent className="h-8 w-8 text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gold mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 relative z-10">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 relative z-10">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-gold flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="bg-gradient-card border border-gold/20 rounded-2xl p-8 shadow-xl mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gold mb-4">
              International Certifications
            </h3>
            <p className="text-muted-foreground">
              Our facilities and processes are certified by leading international bodies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-card/50 border border-border/30 rounded-xl hover:border-gold/30 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-foreground mb-2">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Image Placeholder */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gold mb-6">
              State-of-the-Art Laboratory
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Our advanced testing facility employs cutting-edge technology and follows 
              strict protocols to ensure every product meets our exacting standards.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "HPLC and GC-MS analysis",
                "Microbiological testing",
                "Heavy metals screening",
                "Sterility verification",
                "Endotoxin testing"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background font-semibold"
            >
              View Lab Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-gold/10 to-gold-dark/10 rounded-2xl border border-gold/20 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🔬</div>
                <h4 className="text-xl font-bold text-gold mb-2">Laboratory Image</h4>
                <p className="text-muted-foreground">Advanced testing facility</p>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm border border-gold/20 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">99.9%</div>
                <div className="text-xs text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-sm border border-gold/20 rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">24h</div>
                <div className="text-xs text-muted-foreground">Test Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectionSection;