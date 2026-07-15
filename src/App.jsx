import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

/* ================= AUTH PAGES ================= */

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Unlock from "./pages/Unlock";
import NotFound from "./pages/NotFound";

/* ================= DASHBOARD PAGES ================= */

import Home from "./pages/Home";
import Dashboard6 from "./pages/Dashboard6";
import SocialDashboard from "./pages/SocialDashboard";
import Profile from "./pages/Profile";

/* ================= E-COMMERCE PAGES ================= */

import Ecommerce from "./pages/Ecommerce";
import EcommerceOrders from "./pages/EcommerceOrders";
import CustomerCare from "./pages/CustomerCare";

/* ================= OTHER PAGES ================= */

import Calendar from "./pages/Calendar";
import Mail from "./pages/Mail";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import FileManager from "./pages/FileManager";
import Notes from "./pages/Notes";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route path="/unlock" element={<Unlock />} />

      {/* ================= MAIN LAYOUT ================= */}

      <Route element={<Layout />}>
        {/* LOGIN SUCCESS -> HOME */}

        <Route path="/home" element={<Home />} />

        {/* DASHBOARD -> DASHBOARD 6 */}

        <Route
          path="/dashboard"
          element={<Dashboard6 />}
        />

        {/* ================= PROFILE ================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ================= SOCIAL ================= */}

        <Route
          path="/dashboard-social"
          element={<SocialDashboard />}
        />

        {/* ================= E-COMMERCE ================= */}

        <Route
          path="/ecommerce"
          element={<Ecommerce />}
        />

        <Route
          path="/ecommerce-orders"
          element={<EcommerceOrders />}
        />

        <Route
          path="/ecommerce/customer-care"
          element={<CustomerCare />}
        />

        {/* ================= OTHER PAGES ================= */}

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route path="/mail" element={<Mail />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/file-manager"
          element={<FileManager />}
        />

        <Route path="/notes" element={<Notes />} />

        <Route
          path="/contacts"
          element={<Contacts />}
        />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;