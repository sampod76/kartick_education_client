import NavbarPublic from "./Navbar/NavbarPublic";
import TopBar from "./TopBar";

const HomeHeader = () => {
  return (
    <div className="sticky md:-top-[4.3rem] top-0 z-40">
      <TopBar />
      <NavbarPublic />
    </div>
  );
};

export default HomeHeader;
