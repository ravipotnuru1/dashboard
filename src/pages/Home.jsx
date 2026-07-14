import OverviewCards from "../components/dashboard/OverviewCards";
import StatisticsChart from "../components/dashboard/StatisticsChart";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import SalesChart from "../components/dashboard/SalesChart";
import StatisticsBar from "../components/dashboard/StatisticsBar";
import LastOrders from "../components/dashboard/LastOrders";
import Transactions from "../components/dashboard/Transactions";

import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#333",
          }}
        >
          Dashboard Overview
        </h2>

        <button
          onClick={() => navigate("/social")}
          style={{
            border: "none",
            background: "#22a447",
            color: "white",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaComments />
          Social
        </button>
      </div>

      {/* OVERVIEW CARDS */}

      <OverviewCards />

      {/* STATISTICS & ANALYTICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <StatisticsChart />
        <AnalyticsChart />
      </div>

      {/* SALES & STATISTICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <SalesChart />
        <StatisticsBar />
      </div>

      {/* ORDERS & TRANSACTIONS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <LastOrders />
        <Transactions />
      </div>
    </div>
  );
}

export default Home;