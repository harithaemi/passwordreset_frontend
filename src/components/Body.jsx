import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;