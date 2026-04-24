import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, ShoppingCart, Eye, Heart } from "lucide-react";

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("Featured");

  const categories = ["Featured", "Best Sellers", "New Arrivals", "Premium"];

  const featuredProducts = [
    {
      id: 1,
      name: "Growth Hormone Elite",
      category: "HGH & Peptides",
      price: "$299.99",
      originalPrice: "$349.99",
      rating: 4.9,
      reviews: 156,
      badge: "Best Seller",
      image: "growth-hormone",
      description: "Premium quality growth hormone for professional athletes"
    },
    {
      id: 2,
      name: "Testosterone Pro",
      category: "Injectable",
      price: "$129.99",
      originalPrice: null,
      rating: 4.8,
      reviews: 89,
      badge: "Premium",
      image: "testosterone",
      description: "High-grade testosterone for muscle development"
    },
    {
      id: 3,
      name: "Complete PCT Kit",
      category: "PCT Remedies",
      price: "$79.99",
      originalPrice: "$99.99",
      rating: 4.7,
      reviews: 124,
      badge: "Popular",
      image: "pct-kit",
      description: "Comprehensive post-cycle therapy solution"
    },
    {
      id: 4,
      name: "Cutting Stack",
      category: "Ready Courses",
      price: "$199.99",
      originalPrice: "$249.99",
      rating: 4.9,
      reviews: 203,
      badge: "New",
      image: "cutting-stack",
      description: "Complete cutting cycle for lean muscle mass"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gold text-background";
      case "New":
        return "bg-green-500 text-white";
      case "Popular":
        return "bg-blue-500 text-white";
      case "Premium":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Premium Product Showcase
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most trusted and effective products, chosen by professional athletes worldwide
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`font-medium px-6 py-3 transition-all duration-300 ${activeCategory === category
                  ? "bg-gold text-background hover:bg-gold-dark"
                  : "border-border/50 hover:border-gold/50 hover:text-gold hover:bg-gold/10"
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group bg-gradient-card border border-border/50 hover:border-gold/30 shadow-card hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-gold/10 to-gold-dark/10 flex items-center justify-center relative">
                    {/* Product Image Placeholder */}
                    <div className="text-center">
                      <div className="text-5xl mb-3">💊</div>
                      <div className="text-xs text-muted-foreground">Premium Product</div>
                      <div className="text-xs text-muted-foreground/70">{product.image}</div>
                    </div>

                    {/* Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                      {product.badge}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-white/90 hover:bg-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <p className="text-xs text-gold font-medium mb-2 uppercase tracking-wide">
                    {product.category}
                  </p>

                  {/* Product Name */}
                  <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating)
                              ? "text-gold fill-current"
                              : "text-muted-foreground/30"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-gold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background font-semibold transition-all duration-300"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card border border-gold/20 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gold mb-4">
            Explore Our Complete Catalog
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse through our extensive collection of professional-grade products,
            each carefully selected and tested for maximum effectiveness.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background font-bold px-8 py-4"
            asChild
          >
            <a href="/catalog">
              View Full Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;