import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSection from '@/components/home/AboutSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <AboutSection />
    </main>
  );
}