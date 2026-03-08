import ContactSection from "../components/sections/ContactSection";
import FloatingSocial from "../components/sections/FloatingSocial";
import Footer from "../components/sections/Footer";
import GallerySection from "../components/sections/GallerySection";
import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import IntroSection from "../components/sections/IntroSection";
import MobileBottomNav from "../components/sections/MobileBottomNav";
import PostGalleryCTA from "../components/sections/PostGalleryCTA";
import QuoteSection from "../components/sections/QuoteSection";
import ReviewsSection from "../components/sections/ReviewsSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhatsAppButton from "../components/sections/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground print-bg">
      <Header />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <QuoteSection />
        <GallerySection />
        <PostGalleryCTA />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingSocial />
      <MobileBottomNav />
    </div>
  );
}
