'use client';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { allProducts } from "@/data/products";
import { Eye } from "lucide-react";
import Link from "next/link";

const CatalogSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("All products");

  const filterTabs = [
    "All products",
    "injectable",
    "oral",
    "pct-medicine"
  ];

  // Handle URL changes for client-side navigation
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      setActiveFilter(filter);
    } else {
      // If no filter in URL, default to "All products"
      setActiveFilter("All products");
    }
  }, [searchParams]);

  // Function to update filter and URL
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    
    if (filter === "All products") {
      // Remove filter param for "All products"
      params.delete('filter');
    } else {
      // Set filter param
      params.set('filter', filter);
    }
    
    // Update URL without page reload
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  };


  const filteredProducts = activeFilter === "All products" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeFilter);

  const getBadgeColor = (badge: string | null) => {
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
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-4 px-1">
            Product Catalog
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-1">
            Discover our comprehensive range of professional-grade sports pharmacology products
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {filterTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeFilter === tab ? "default" : "outline"}
                onClick={() => handleFilterChange(tab)}
                className={`text-xs md:text-sm font-medium px-3 md:px-6 py-2 md:py-3 transition-all duration-300 ${
                  activeFilter === tab
                    ? "bg-gold text-background hover:bg-gold-dark shadow-lg"
                    : "border-border/50 hover:border-gold/50 hover:text-gold hover:bg-gold/10"
                }`}
              >
                {tab.replace("-", " ").toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card 
                className="group bg-gradient-card border border-border/50 hover:border-gold/30 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-gold/10 to-gold-dark/10 flex items-center justify-center relative">
                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="text-center">
                              <div class="text-4xl mb-2">💊</div>
                              <div class="text-xs text-muted-foreground">Product Image</div>
                              <div class="text-xs text-muted-foreground/70">${product.name}</div>
                            </div>
                          `;
                        }
                      }}
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                        {product.badge}
                      </div>
                    )}


                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 md:p-6">
                  {/* Category */}
                  <p className="text-xs text-gold font-medium mb-2 uppercase tracking-wide">
                    {product.category}
                  </p>

                  {/* Product Name */}
                  <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-gold transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Formula Name */}
                  {product.formulaName && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.formulaName}
                    </p>
                  )}

                  {/* Description */}
                  {/* {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {product.description}
                    </p>
                  )} */}
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CatalogSection;