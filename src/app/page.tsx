import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Heros/BannerSection";
import SupportHero from "@/components/Home/Heros/SupportHero";
import Success from "@/components/Home/Success/Success";
import CommonCourse from "@/components/Home/commonCourse/CommonCourse";
import CoursesTab from "@/components/Home/coureses/CoursesTab";
import Programmes from "@/components/Home/programms/Programmes";
import HomeHeader from "@/components/shared/Headers/HomeHeader";

const HomePage = () => {

  return (
    <>
      <HomeHeader />
      <main className="min-h-[100vh] text-center">
        <BannerSection />
        <CommonCourse/>
        <CoursesTab />
        <SupportHero />
        <Success/>
        <Programmes/>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
