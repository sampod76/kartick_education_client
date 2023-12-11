import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/shared/Headers/HomeHeader";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto min-h-[100vh] text-center">
        <h1>This is home page</h1>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
