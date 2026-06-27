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
import { CartDrawer } from "@/components/CartDrawer";

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
    <CartDrawer />
  </main>
);

export default Index;
