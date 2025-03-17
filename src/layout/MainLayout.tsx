import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommonWrapper from "@/wrapper/CommonWrapper";

const MainLayout = () => {
  return (
    <div>
      <CommonWrapper>
        <Navbar />
        <Outlet />
        <div className="min-h-screen">
          <Footer />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default MainLayout;
