import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import HomeTwo from "./pages/HomeTwo";
import HomeThree from "./pages/HomeThree";
import HomeFour from "./pages/HomeFour";
import HomeFive from "./pages/HomrFive";
import HomeSix from "./pages/HomeSix";
import HomeSeven from "./pages/HomeSeven";

import Ecommerce from "./pages/Ecommerce";
import EcommerceOrders from "./pages/EcommerceOrders";
import CustomerCare from "./pages/CustomerCare";

import Calendar from "./pages/Calendar";
import Mail from "./pages/Mail";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import FileManager from "./pages/FileManager";
import Social from "./pages/Social";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />

        {/* DASHBOARD */}

        <Route path="home" element={<Home />} />
        <Route path="home-two" element={<HomeTwo />} />
        <Route path="home-three" element={<HomeThree />} />
        <Route path="home-four" element={<HomeFour />} />
        <Route path="home-five" element={<HomeFive />} />
        <Route path="home-six" element={<HomeSix />} />
        <Route path="home-seven" element={<HomeSeven />} />

        {/* E-COMMERCE */}

        <Route path="ecommerce" element={<Ecommerce />} />

        <Route
          path="ecommerce-orders"
          element={<EcommerceOrders />}
        />

        <Route
          path="ecommerce/customer-care"
          element={<CustomerCare />}
        />

        {/* OTHER PAGES */}

        <Route path="calendar" element={<Calendar />} />
        <Route path="mail" element={<Mail />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<Projects />} />

        <Route
          path="file-manager"
          element={<FileManager />}
        />

        <Route path="social" element={<Social />} />
      </Route>
    </Routes>
  );
}

export default App;