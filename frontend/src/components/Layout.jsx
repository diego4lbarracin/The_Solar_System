import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Starfield from "./Starfield";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Starfield />
      <Header />
      <main className="flex-1 relative z-10 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
