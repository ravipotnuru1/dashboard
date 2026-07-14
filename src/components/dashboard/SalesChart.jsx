import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 20 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

function SalesChart() {
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
      <h3 style={{ marginBottom: "20px" }}>Sales Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;