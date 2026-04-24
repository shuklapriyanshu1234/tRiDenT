import { allProducts } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import BackButton from "@/components/BackButton";

// Generate static params for all products
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ProductDetailPageProps) => {
  const { id: productId } = await params;

  // Find the product by ID
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border border-border/50">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  badge={product.badge}
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <p className="text-sm text-gold font-medium mb-2 uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 break-words">
                  {product.name}
                </h1>
                {product.formulaName && (
                  <p className="text-lg text-muted-foreground">
                    {product.formulaName}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Usage */}
              {product.usages && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.usages}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          {/* <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> */}
                          <span className="text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Contraindications */}
              {product.contraindications &&
                product.contraindications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Contraindications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.contraindications.map(
                          (contraindication, index) => (
                            <li key={index} className="flex items-start gap-2">
                              {/* <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" /> */}
                              <span className="text-muted-foreground">
                                {contraindication}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
