import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QrCode, Search, Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";

const VerificationSection = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<"idle" | "valid" | "invalid" | "loading">("idle");

  const handleVerification = () => {
    if (!verificationCode.trim()) return;
    
    setVerificationResult("loading");
    
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, codes starting with "TR" are valid
      if (verificationCode.toUpperCase().startsWith("TR")) {
        setVerificationResult("valid");
      } else {
        setVerificationResult("invalid");
      }
    }, 1500);
  };

  const verificationFeatures = [
    {
      icon: QrCode,
      title: "QR Code Scanning",
      description: "Scan the QR code on your product packaging for instant verification"
    },
    {
      icon: Shield,
      title: "Batch Verification",
      description: "Enter batch number to verify authenticity and manufacturing details"
    },
    {
      icon: FileText,
      title: "Certificate Access",
      description: "Download official certificates of analysis for your products"
    }
  ];

  const sampleProducts = [
    {
      code: "TR001-HGH-2024",
      name: "Growth Hormone Elite",
      batch: "GH240315",
      status: "Verified",
      mfgDate: "March 15, 2024",
      expDate: "March 15, 2026"
    },
    {
      code: "TR002-TEST-2024",
      name: "Testosterone Pro",
      batch: "TP240320",
      status: "Verified",
      mfgDate: "March 20, 2024",
      expDate: "March 20, 2027"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-card/10 to-background"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Product Verification
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Verify Product Authenticity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ensure your products are genuine with our advanced verification system. 
            Protect yourself from counterfeit products and verify quality standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Verification Tool */}
          <div>
            <Card className="bg-gradient-card border border-gold/20 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold mb-6">
                  Verify Your Product
                </h3>
                
                <div className="space-y-6">
                  {/* Input Section */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Product Code or Batch Number
                    </label>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter code (e.g., TR001-HGH-2024)"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="flex-1 bg-card/50 border-border/50 focus:border-gold/50"
                      />
                      <Button 
                        onClick={handleVerification}
                        disabled={!verificationCode.trim() || verificationResult === "loading"}
                        className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background"
                      >
                        {verificationResult === "loading" ? (
                          <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Verification Result */}
                  {verificationResult !== "idle" && (
                    <div className={`p-4 rounded-lg border ${
                      verificationResult === "valid" 
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : verificationResult === "invalid"
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : "bg-gold/10 border-gold/20 text-gold"
                    }`}>
                      <div className="flex items-center gap-3">
                        {verificationResult === "valid" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : verificationResult === "invalid" ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                        )}
                        <div>
                          <div className="font-semibold">
                            {verificationResult === "valid" 
                              ? "✅ Product Verified"
                              : verificationResult === "invalid"
                              ? "❌ Invalid Code"
                              : "🔍 Verifying..."
                            }
                          </div>
                          <div className="text-sm opacity-80">
                            {verificationResult === "valid" 
                              ? "This product is authentic and meets our quality standards"
                              : verificationResult === "invalid"
                              ? "Code not found. Please check and try again"
                              : "Please wait while we verify your product..."
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* QR Code Section */}
                  <div className="border-t border-border/50 pt-6">
                    <h4 className="font-semibold text-foreground mb-3">
                      Alternative Verification Methods
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {verificationFeatures.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <div key={index} className="text-center p-4 bg-card/30 rounded-lg border border-border/30 hover:border-gold/30 transition-colors">
                            <IconComponent className="h-8 w-8 text-gold mx-auto mb-2" />
                            <div className="text-sm font-medium text-foreground mb-1">{feature.title}</div>
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Verified Products */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-6">
              Recently Verified Products
            </h3>
            <div className="space-y-4">
              {sampleProducts.map((product, index) => (
                <Card key={index} className="bg-gradient-card border border-border/50 hover:border-gold/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">Code: {product.code}</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-xs font-medium text-green-400">{product.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Batch:</span>
                        <span className="ml-2 font-medium text-foreground">{product.batch}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mfg Date:</span>
                        <span className="ml-2 font-medium text-foreground">{product.mfgDate}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Exp Date:</span>
                        <span className="ml-2 font-medium text-foreground">{product.expDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gold mb-2">Security Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    Always verify your products before use. If you suspect a counterfeit product, 
                    please contact our security team immediately. We take product authenticity seriously 
                    and work continuously to protect our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;