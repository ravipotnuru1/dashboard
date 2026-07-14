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
  { department: "Marketing", value: 80 },
  { department: "Sales", value: 65 },
  { department: "Development", value: 95 },
  { department: "Support", value: 55 },
  { department: "HR", value: 40 },
];

function StatisticsBar() {
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
      <h3 style={{ marginBottom: "20px" }}>Department Performance</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="department" type="category" />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#8B5CF6"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticsBar;