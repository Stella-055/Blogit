import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer/>
    </>
  );
};

export default Dashboard;
