'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield, CheckCircle, AlertTriangle, Scan } from "lucide-react";
import { authCodes } from "@/data/authCodes";
const ProductCheckSection = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<
    "idle" | "valid" | "invalid" | "loading"
  >("idle");

  const handleVerification = () => {
    if (!verificationCode.trim()) return;

    setVerificationResult("loading");

    if (authCodes.includes(verificationCode.toUpperCase())) {
      setVerificationResult("valid");
    } else {
      setVerificationResult("invalid");
    }
  };

  return (
    <section
      id="product-check"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Product Verification
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-6 px-1">
            Verify Product Authenticity
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-1">
            Ensure your products are genuine with our advanced verification
            system. Protect yourself from counterfeit products and verify
            quality standards.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Verification Tool */}
          <div className="w-full max-w-2xl">
            <Card className="bg-card/30 backdrop-blur-xl border border-gold/20 shadow-lg">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20 flex items-center justify-center">
                    <Scan className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-gold">
                    Verify Your Product
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Input Section */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter product code
                    </label>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="flex-1 bg-card/50 border-border/50 focus:border-gold/50"
                      />
                      <Button
                        onClick={handleVerification}
                        disabled={
                          !verificationCode.trim() ||
                          verificationResult === "loading"
                        }
                        className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-background px-6"
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
                    <div
                      className={`p-4 rounded-lg border ${
                        verificationResult === "valid"
                          ? "bg-green-500/10 border-green-500/20"
                          : verificationResult === "invalid"
                          ? "bg-red-500/10 border-red-500/20"
                          : "bg-gold/10 border-gold/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {verificationResult === "valid" ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : verificationResult === "invalid" ? (
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                        )}
                        <div>
                          <div
                            className={`font-semibold ${
                              verificationResult === "valid"
                                ? "text-green-400"
                                : verificationResult === "invalid"
                                ? "text-red-400"
                                : "text-gold"
                            }`}
                          >
                            {verificationResult === "valid"
                              ? "✅ Product Verified"
                              : verificationResult === "invalid"
                              ? "❌ Invalid Code"
                              : "🔍 Verifying..."}
                          </div>
                          <div
                            className={`text-sm opacity-80 ${
                              verificationResult === "valid"
                                ? "text-green-300"
                                : verificationResult === "invalid"
                                ? "text-red-300"
                                : "text-gold"
                            }`}
                          >
                            {verificationResult === "valid"
                              ? "This product is authentic and meets our quality standards"
                              : verificationResult === "invalid"
                              ? "Code not found. Please check and try again"
                              : "Please wait while we verify your product..."}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCheckSection;
