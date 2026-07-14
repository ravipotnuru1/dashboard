import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const visitsData = [
  { day: "Mon", visits: 2000 },
  { day: "Tue", visits: 1200 },
  { day: "Wed", visits: 2800 },
  { day: "Thu", visits: 1300 },
  { day: "Fri", visits: 2100 },
  { day: "Sat", visits: 5200 },
  { day: "Sun", visits: 2000 },
];

const growthData = [
  { day: "Mon", followers: 3500 },
  { day: "Tue", followers: 1200 },
  { day: "Wed", followers: 3000 },
  { day: "Thu", followers: 1800 },
  { day: "Fri", followers: 2800 },
  { day: "Sat", followers: 4300 },
  { day: "Sun", followers: 1500 },
];

const messages = [
  { text: "Lorem ipsum dolor sit amet?", type: "received" },
  {
    text: "Consectetur adipiscing elit. Turpis risus commodo sed viverra.",
    type: "sent",
  },
  { text: "Sollicitudin non posuere pharetra.", type: "received" },
  { text: "Integer ut elementum orci sit ultrices.", type: "sent" },
  { text: "Posuere scelerisque elit dui.", type: "received" },
  { text: "Eget cursus bibendum amet donec.", type: "sent" },
  { text: "Quam consectetur est suspendisse.", type: "sent" },
];

function HomeThree() {
  return (
    <div style={styles.page}>
      <aside style={styles.profile}>
        <div style={styles.avatar}>FB</div>

        <h3>Felecia Brown</h3>
        <p style={styles.muted}>Project Manager</p>

        <button style={styles.editButton}>Edit profile</button>

        <hr />

        <h4>INFO</h4>

        <small>EMAIL</small>
        <p>example@email.com</p>

        <small>PHONE</small>
        <p>+123-4567-8800</p>

        <small>BIRTHDAY</small>
        <p>17 March, 1995</p>

        <small>LOCATION</small>
        <p>New York, NY</p>

        <hr />

        <h4>FAVORITES</h4>

        {[
          "Ronald Robertson",
          "Regina Cooper",
          "Judith Black",
          "Dustin Williamson",
        ].map((name) => (
          <div style={styles.favorite} key={name}>
            <div style={styles.smallAvatar}>
              {name.charAt(0)}
            </div>

            <span>{name}</span>
          </div>
        ))}
      </aside>

      <main style={styles.main}>
        <h2>Overview</h2>

        <div style={styles.cards}>
          <div style={styles.card}>
            <small>Total Visitors</small>
            <h2>20.500</h2>
            <span style={styles.green}>+4.65%</span>
          </div>

          <div style={styles.card}>
            <small>Total Followers</small>
            <h2>21.800</h2>
            <span style={styles.red}>-5.25%</span>
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3>Visits</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="visits"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.bottomGrid}>
          <div style={styles.chartCard}>
            <h3>Followers Growth</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="followers"
                  fill="#16a34a"
                  radius={[7, 7, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3>New Followers</h3>

            {[
              "Devon Williamson",
              "Devon Wilson",
              "Judith Black",
              "Philip Henry",
            ].map((name) => (
              <div style={styles.follower} key={name}>
                <div style={styles.smallAvatar}>
                  {name.charAt(0)}
                </div>

                <div>
                  <strong>{name}</strong>
                  <p style={styles.muted}>Product Designer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside style={styles.chat}>
        <div style={styles.chatHeader}>
          <h3>Chat</h3>
          <span>✕</span>
        </div>

        <div style={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent:
                  message.type === "sent"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.message,
                  background:
                    message.type === "sent"
                      ? "#16a34a"
                      : "#f1f5f9",
                  color:
                    message.type === "sent"
                      ? "#fff"
                      : "#333",
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.chatInput}>
          <input
            placeholder="Type a message"
            style={styles.input}
          />

          <button style={styles.sendButton}>➤</button>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7f6",
  },

  profile: {
    width: "220px",
    background: "#fff",
    padding: "25px",
  },

  main: {
    flex: 1,
    padding: "25px",
  },

  chat: {
    width: "320px",
    background: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },

  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "25px",
    background: "#e98b72",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
  },

  smallAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#e98b72",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "9px 20px",
    borderRadius: "5px",
  },

  muted: {
    color: "#888",
    fontSize: "12px",
    margin: "4px 0",
  },

  favorite: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "15px 0",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    margin: "20px 0",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  green: {
    color: "#16a34a",
  },

  red: {
    color: "#ef4444",
  },

  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  follower: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },

  messages: {
    flex: 1,
    padding: "20px 0",
  },

  messageRow: {
    display: "flex",
    marginBottom: "15px",
  },

  message: {
    maxWidth: "75%",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
  },

  chatInput: {
    display: "flex",
    gap: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
  },

  sendButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    cursor: "pointer",
  },
};

export default HomeThree;