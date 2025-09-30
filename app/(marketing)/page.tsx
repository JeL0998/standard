import SnapPage from "@/components/sections/SnapPage";
import HeroCarousel from "@/components/sections/HeroCarousel";
import RoomsCarousel from "@/components/sections/RoomsCarousel";
import FeatureTabs from "@/components/sections/FeatureTabs";
import GalleryLightbox from "@/components/sections/GalleryLightbox";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import FAQ from "@/components/sections/FAQ";
import Location from "@/components/sections/Location";
import Inquiry from "@/components/sections/Inquiry";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";
import ViewProgress from "@/components/motion/ViewProgress";
import Header from "@/components/sections/Header";
import SectionThemeSync from "@/components/motion/SectionThemeSync";
import ClientOnly from "@/components/motion/ClientOnly";
import DotNav from "@/components/sections/DotNav";
import ActivitiesCarousel from "@/components/sections/ActivitiesCarousel";

export const revalidate = 1800;

export default function Page() {
  return (
    <>
      <ViewProgress />
      <DotNav />
      <SnapPage>
        <HeroCarousel />
        <RoomsCarousel />
        <ActivitiesCarousel />
        <FeatureTabs />
        <GalleryLightbox />
        <TestimonialsCarousel />
        <FAQ />
        <Location />
        <Inquiry />
        <Newsletter />
        <Footer />
      </SnapPage>
    </>
  );
}
