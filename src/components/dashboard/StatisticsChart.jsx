import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 600 },
  { month: "Apr", sales: 450 },
  { month: "May", sales: 700 },
  { month: "Jun", sales: 500 },
  { month: "Jul", sales: 650 },
];

function StatisticsChart() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Statistics</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="sales"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticsChart;