import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketTicker } from "@/components/MarketTicker";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustBadges } from "@/components/TrustBadges";
import { Counters } from "@/components/Counters";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => (
  <main className="min-h-screen bg-background overflow-x-hidden">
    <Loader />
    <Navbar />
    <Hero />
    <MarketTicker />
    <ProductGrid />
    <TrustBadges />
    <Counters />
    <Testimonials />
    <Footer />
    <FloatingCTA />
  </main>
);

export default Index;
