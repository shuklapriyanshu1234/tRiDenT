'use client';
import { useState, useEffect } from 'react';
// import Header from '@/components/Header';
import HeroIntroSection from '@/components/HeroIntroSection';
// import CatalogSection from '@/components/CatalogSection';
// import NewsSection from '@/components/NewsSection';
// import Footer from '@/components/Footer';
import WelcomeModal from '@/components/WelcomeModal';
// import TrustSection from '@/components/TrustSection';
import CategoriesHomeSection from '@/components/CategoriesHomeSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import FeaturedAthletesSection from '@/components/FeaturedAthletesSection';
import ProductCheckSection from '@/components/ProductCheckSection';
import ContactSection from '@/components/ContactSection';
// import ProductShowcase from '@/components/ProductShowcase';
// import ExperienceSection from '@/components/ExperienceSection';
// import InspectionSection from '@/components/InspectionSection';
// import VerificationSection from '@/components/VerificationSection';

const Home = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Show welcome modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('pharma-trident-visited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('pharma-trident-visited', 'true');
    }
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <div id='home' className='mt-10'>
        <HeroIntroSection />
      </div>
      <FeaturedAthletesSection />
      <div id='categories' className='mt-5'>
        <CategoriesHomeSection />
      </div>
      <div id='advantages'>
        <AdvantagesSection />
      </div>
      {/* <TrustSection /> */}
      {/* <ProductShowcase /> */}
      {/* <ExperienceSection /> */}
      {/* <InspectionSection /> */}
      {/* <VerificationSection /> */}
      <ProductCheckSection />
      <ContactSection />
      {/* <NewsSection /> */}

      {/* <WelcomeModal
        open={showWelcomeModal}
        onOpenChange={setShowWelcomeModal}
      /> */}
    </div>
  );
};

export default Home;
