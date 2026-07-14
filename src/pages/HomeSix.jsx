import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const statistics = [
  { day: "Mon", sales: 50, orders: 25 },
  { day: "Tue", sales: 80, orders: 45 },
  { day: "Wed", sales: 60, orders: 35 },
  { day: "Thu", sales: 95, orders: 55 },
  { day: "Fri", sales: 70, orders: 40 },
  { day: "Sat", sales: 100, orders: 60 },
];

const analytics = [
  { day: "Mon", value: 20 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 30 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 80 },
];

const browserData = [
  { name: "Chrome", value: 55 },
  { name: "Firefox", value: 25 },
  { name: "Safari", value: 20 },
];

const COLORS = ["#16a34a", "#14b8a6", "#facc15"];

function HomeSix() {
  return (
    <div style={styles.page}>
      <h2>Overview</h2>

      <div style={styles.topCards}>
        <Stat title="Total Sales" value="$12.500" />
        <Stat title="Total Profit" value="30.800K" />
        <Stat title="New Users" value="6.300K" />
      </div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <h3>Statistics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#14b8a6" />
              <Bar dataKey="orders" fill="#ef8b72" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section style={styles.card}>
          <h3>Analytics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      <div style={styles.bottomGrid}>
        <SmallCard title="Top Browser" value="2500" text="Chrome" />
        <SmallCard title="Top Platform" value="2200" text="Mac OS" />

        <section style={styles.card}>
          <h3>Online Users</h3>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={browserData}
                dataKey="value"
                innerRadius={45}
                outerRadius={70}
              >
                {browserData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h2 style={{ textAlign: "center" }}>1.883</h2>
        </section>

        <SmallCard title="Top Country" value="4550" text="America" />
        <SmallCard title="Top Social Engine" value="3100" text="Google" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.muted}>{title}</p>
      <h2>{value}</h2>
      <span style={{ color: "#16a34a" }}>+5.08%</span>
    </div>
  );
}

function SmallCard({ title, value, text }) {
  return (
    <div style={styles.card}>
      <p style={styles.muted}>{title}</p>
      <h2>{value}</h2>
      <strong>{text}</strong>
    </div>
  );
}

const styles = {
  page: {
    padding: 25,
    minHeight: "100vh",
    background: "#f5f7f6",
  },
  topCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    margin: "20px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 20,
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  muted: {
    color: "#888",
    margin: "4px 0",
  },
};

export default HomeSix;