import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const stats = [
  { day: "Mon", income: 40, expense: 25 },
  { day: "Tue", income: 65, expense: 35 },
  { day: "Wed", income: 45, expense: 20 },
  { day: "Thu", income: 75, expense: 50 },
  { day: "Fri", income: 55, expense: 35 },
  { day: "Sat", income: 80, expense: 55 },
  { day: "Sun", income: 60, expense: 40 },
];

const balance = [
  { value: 20 },
  { value: 50 },
  { value: 35 },
  { value: 70 },
  { value: 45 },
  { value: 85 },
];

const transactions = [
  ["Shopping", "-$1,400"],
  ["Travel", "-$850"],
  ["Food", "-$2,150"],
  ["Medicine", "-$950"],
  ["Sport", "-$500"],
];

function HomeFive() {
  const [profileOpen, setProfileOpen] = useState(true);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Overview</h2>

        <div style={styles.profileWrap}>
          <div
            style={styles.user}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div style={styles.avatar}>A</div>
            <strong>ArtTemplate ▾</strong>
          </div>

          {profileOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropUser}>
                <div style={styles.avatar}>A</div>
                <div>
                  <strong>ArtTemplate</strong>
                  <p style={styles.muted}>Admin profile</p>
                </div>
              </div>

              <div style={styles.menu}>👤 My Profile</div>
              <div style={styles.menu}>💬 My Messages</div>
              <div style={styles.menu}>📋 My Tasks</div>
              <div style={styles.menu}>⚙ Settings</div>
              <div style={styles.menu}>🔒 Lock Screen</div>
              <div style={styles.menu}>🚪 Log Out</div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.stats}>
        <Card title="Total Income" value="$8.500" />
        <Card title="Total Expense" value="3.500K" />
        <Card title="Total Bonus" value="5.100K" />
      </div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <h3>Statistics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#16a34a" />
              <Bar dataKey="expense" fill="#5eead4" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section style={styles.balance}>
          <h3>Balance</h3>
          <h1>$27.500,00</h1>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={balance}>
              <Line
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <p>Income $500 &nbsp; Spending $200</p>
        </section>
      </div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <h3>My Cards</h3>

          <div style={styles.bankCard}>
            <small>Current Balance</small>
            <h1>80,700.00</h1>
            <div style={styles.cardRow}>
              <span>Felecia Brown</span>
              <strong>VISA</strong>
            </div>
          </div>
        </section>

        <section style={styles.card}>
          <h3>Transactions</h3>

          {transactions.map(([name, amount]) => (
            <div key={name} style={styles.transaction}>
              <div style={styles.circle}>{name[0]}</div>
              <span style={{ flex: 1 }}>{name}</span>
              <strong>{amount}</strong>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.muted}>{title}</p>
      <h2>{value}</h2>
      <span style={{ color: "#16a34a" }}>+5.08%</span>
    </div>
  );
}

const styles = {
  page: {
    padding: 25,
    background: "#f5f7f6",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  profileWrap: { position: "relative" },
  user: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 50,
    width: 230,
    background: "#fff",
    boxShadow: "0 10px 30px #0002",
    borderRadius: 8,
    zIndex: 100,
  },
  dropUser: {
    display: "flex",
    gap: 10,
    padding: 15,
    borderBottom: "1px solid #eee",
  },
  menu: {
    padding: "12px 18px",
    borderBottom: "1px solid #f3f3f3",
    cursor: "pointer",
  },
  muted: { color: "#888", margin: "4px 0" },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    margin: "20px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  balance: {
    background: "#16a34a",
    color: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  bankCard: {
    background: "linear-gradient(135deg,#16a34a,#34d399)",
    color: "#fff",
    padding: 25,
    borderRadius: 12,
    maxWidth: 350,
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
  },
  transaction: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottom: "1px solid #eee",
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    background: "#dcfce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default HomeFive;