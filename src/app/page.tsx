import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Heros/BannerSection";
import CoursesTab from "@/components/Home/coureses/CoursesTab";
import HomeHeader from "@/components/shared/Headers/HomeHeader";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="min-h-[100vh] text-center">
        <BannerSection/>
     <CoursesTab/>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
