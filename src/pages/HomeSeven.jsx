import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const statistics = [
  { day: "Mon", tasks: 40 },
  { day: "Tue", tasks: 70 },
  { day: "Wed", tasks: 55 },
  { day: "Thu", tasks: 90 },
  { day: "Fri", tasks: 65 },
  { day: "Sat", tasks: 80 },
];

const projects = [
  { name: "Completed", value: 420 },
  { name: "Progress", value: 210 },
  { name: "Pending", value: 200 },
];

const COLORS = ["#16a34a", "#14b8a6", "#facc15"];

const tasks = [
  "Design Homepage",
  "Prepare Project",
  "Develop Dashboard",
  "Design Company",
];

const activities = [
  "Regina Cooper added new project",
  "Judith Black updated project",
  "Devon Wilson completed task",
  "Philip Henry added comment",
  "Mitchell Cooper joined project",
];

function HomeSeven() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Overview</h2>
        <button style={styles.button}>+ Add Task</button>
      </div>

      <div style={styles.layout}>
        <main>
          <div style={styles.stats}>
            <Stat title="Total Projects" value="780" />
            <Stat title="Total Tasks" value="136" />
            <Stat title="Completed" value="324" />
            <Stat title="In Progress" value="215" />
          </div>

          <div style={styles.grid}>
            <section style={styles.card}>
              <h3>Projects</h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={projects}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {projects.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <h2 style={{ textAlign: "center" }}>830</h2>
            </section>

            <section style={styles.card}>
              <h3>Statistics</h3>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={statistics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="tasks"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </div>

          <section style={styles.card}>
            <h3>Active Tasks</h3>

            {tasks.map((task, index) => (
              <div key={task} style={styles.task}>
                <span style={styles.taskLine} />

                <div style={{ flex: 1 }}>
                  <strong>{task}</strong>
                  <p style={styles.muted}>
                    Project task information and details
                  </p>
                </div>

                <span>{index + 1}/5</span>
              </div>
            ))}
          </section>

          <section style={styles.card}>
            <h3>Posting Tasks</h3>

            <div style={styles.posting}>
              {Array.from({ length: 60 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.square,
                    background:
                      index % 7 === 0 || index % 13 === 0
                        ? "#14b8a6"
                        : "#e5f7f4",
                  }}
                />
              ))}
            </div>
          </section>
        </main>

        <aside>
          <section style={styles.card}>
            <h3>September 2020</h3>

            <div style={styles.calendar}>
              {Array.from({ length: 35 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    ...styles.day,
                    background:
                      index === 15 ? "#16a34a" : "transparent",
                    color: index === 15 ? "#fff" : "#555",
                  }}
                >
                  {index < 30 ? index + 1 : ""}
                </span>
              ))}
            </div>
          </section>

          <section style={styles.card}>
            <h3>Recent Activity</h3>

            {activities.map((activity, index) => (
              <div key={index} style={styles.activity}>
                <div style={styles.avatar}>
                  {activity.charAt(0)}
                </div>

                <div>
                  <strong>{activity}</strong>
                  <p style={styles.muted}>
                    {index + 1} hours ago
                  </p>
                </div>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.muted}>{title}</p>
      <h2>{value}</h2>
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
  button: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: 20,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 15,
    margin: "20px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 20,
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  muted: {
    color: "#888",
    fontSize: 13,
    margin: "4px 0",
  },
  task: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 13,
    borderBottom: "1px solid #eee",
  },
  taskLine: {
    width: 4,
    height: 40,
    background: "#16a34a",
    borderRadius: 5,
  },
  posting: {
    display: "grid",
    gridTemplateColumns: "repeat(15,1fr)",
    gap: 6,
    marginTop: 20,
  },
  square: {
    height: 25,
    borderRadius: 3,
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: 5,
  },
  day: {
    padding: 8,
    textAlign: "center",
    borderRadius: "50%",
  },
  activity: {
    display: "flex",
    gap: 10,
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};

export default HomeSeven;