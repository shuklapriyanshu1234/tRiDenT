import { Suspense } from "react";
import CatalogSection from "@/components/CatalogSection";

const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 sm:pt-24">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <CatalogSection />
        </Suspense>
      </main>
    </div>
  );
};

export default CatalogPage;
