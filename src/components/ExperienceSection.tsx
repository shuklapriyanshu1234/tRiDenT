import { Card, CardContent } from "@/components/ui/card";
import { Globe, Clock, TrendingUp, MapPin } from "lucide-react";

const ExperienceSection = () => {
  const milestones = [
    {
      icon: Clock,
      title: "9 Years",
      subtitle: "Global Experience",
      description: "Serving professional athletes worldwide"
    },
    {
      icon: Globe,
      title: "50+",
      subtitle: "Countries Served",
      description: "International market presence"
    },
    {
      icon: TrendingUp,
      title: "300%",
      subtitle: "Growth Rate",
      description: "Continuous expansion year over year"
    },
    {
      icon: MapPin,
      title: "15+",
      subtitle: "Distribution Centers",
      description: "Strategic global locations"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-gold/3"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
            <Globe className="h-12 w-12 text-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Our company's</span>
            <br />
            <span className="text-gold">global market experience</span>
            <br />
            <span className="text-foreground">spans</span>
            <span className="text-gold ml-2">9 years</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a local startup to a global leader in sports pharmacology, 
            we've built trust through consistent quality and innovation
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border border-border/50 shadow-card hover:shadow-lg hover:border-gold/30 transition-all duration-300 group text-center"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-smooth">
                    <IconComponent className="h-8 w-8 text-gold" />
                  </div>
                  <div className="text-3xl font-black text-gold mb-1">
                    {milestone.title}
                  </div>
                  <div className="text-lg font-bold text-foreground mb-2">
                    {milestone.subtitle}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gold to-gold-dark"></div>
            <div className="space-y-12">
              {[
                { year: "2015", event: "Company Founded", description: "Started with a vision for clean sports enhancement" },
                { year: "2018", event: "International Expansion", description: "Entered European and Asian markets" },
                { year: "2021", event: "Research Partnership", description: "Collaborated with leading sports science institutes" },
                { year: "2024", event: "Global Leadership", description: "Recognized as industry leader in 50+ countries" }
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-gradient-card border border-border/50 shadow-card p-6 rounded-lg hover:border-gold/30 transition-colors">
                      <div className="text-2xl font-bold text-gold mb-2">{item.year}</div>
                      <div className="text-lg font-bold text-foreground mb-2">{item.event}</div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;