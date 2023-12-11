import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Heros/BannerSection";
import HomeHeader from "@/components/shared/Headers/HomeHeader";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="min-h-[100vh] text-center">
        <BannerSection/>
     
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
