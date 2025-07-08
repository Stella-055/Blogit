import Nav from "../components/Nav";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default Dashboard
