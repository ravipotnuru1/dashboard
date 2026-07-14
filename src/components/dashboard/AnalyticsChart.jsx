import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 180 },
  { day: "Wed", users: 150 },
  { day: "Thu", users: 220 },
  { day: "Fri", users: 260 },
  { day: "Sat", users: 210 },
  { day: "Sun", users: 300 },
];

function AnalyticsChart() {
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
      <h3 style={{ marginBottom: "20px" }}>Analytics</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;