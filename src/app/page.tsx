
import FaqList from "@/components/Home/Faq";
import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeService from "@/components/Home/HomeService";
import OverView from "@/components/Home/OverView";
import AllBlogs from "@/components/Home/BlogComponent";
import UpcomingService from "@/components/Home/UpcomingService";
import { redirect } from "next/navigation";
import { Tabs } from "antd";

const HomePage = () => {
  
  return (
    <>
      <HomeHeader />
      <main className=" ">
        <section className="container mx-auto ">
     <h1>This is home page</h1>
        </section>

     
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
