import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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
  { day: "Tue", followers: 1000 },
  { day: "Wed", followers: 3000 },
  { day: "Thu", followers: 1800 },
  { day: "Fri", followers: 2800 },
  { day: "Sat", followers: 4300 },
  { day: "Sun", followers: 1500 },
];

const followerData = [
  { name: "Facebook", value: 3500 },
  { name: "Twitter", value: 7800 },
  { name: "Instagram", value: 5800 },
  { name: "YouTube", value: 4700 },
];

const COLORS = [
  "#10b981",
  "#14b8a6",
  "#facc15",
  "#f87171",
];

const favorites = [
  "Ronald Robertson",
  "Regina Cooper",
  "Judith Black",
  "Dustin Williamson",
];

const followers = [
  "Devon Williamson",
  "Devon Wilson",
  "Judith Black",
  "Philip Henry",
  "Mitchell Cooper",
];

const reginaMessages = [
  {
    text: "Lorem ipsum dolor sit amet?",
    type: "received",
  },
  {
    text: "Consectetur adipiscing elit.",
    type: "sent",
  },
  {
    text: "Sollicitudin non posuere pharetra.",
    type: "received",
  },
  {
    text: "Integer ut elementum orci.",
    type: "sent",
  },
];

function Card({ title, value, change }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{title}</p>

      <h2 style={{ margin: "5px 0" }}>
        {value}
      </h2>

      <small
        style={{
          color: change.startsWith("-")
            ? "#ef4444"
            : "#10b981",
        }}
      >
        {change}
      </small>
    </div>
  );
}

function HomeTwo() {
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [message, setMessage] = useState("");

  const [customMessages, setCustomMessages] =
    useState({});

  const getMessages = () => {
    if (!selectedUser) {
      return [];
    }

    const demoMessages =
      selectedUser === "Regina Cooper"
        ? reginaMessages
        : [];

    return [
      ...demoMessages,
      ...(customMessages[selectedUser] || []),
    ];
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) {
      return;
    }

    setCustomMessages((previous) => ({
      ...previous,

      [selectedUser]: [
        ...(previous[selectedUser] || []),

        {
          text: message,
          type: "sent",
        },
      ],
    }));

    setMessage("");
  };

  return (
    <div style={styles.page}>
      <aside style={styles.profile}>
        <div style={styles.avatar}>FB</div>

        <h3 style={styles.profileName}>
          Felecia Brown
        </h3>

        <p style={styles.centerMuted}>
          Project Manager
        </p>

        <button style={styles.editButton}>
          Edit profile
        </button>

        <hr style={styles.divider} />

        <h4>INFO</h4>

        <small>EMAIL</small>
        <p>example@email.com</p>

        <small>PHONE</small>
        <p>+123-4567-8800</p>

        <small>BIRTHDAY</small>
        <p>17 March, 1995</p>

        <small>LOCATION</small>
        <p>New York, NY</p>

        <hr style={styles.divider} />

        <h4>FAVORITES</h4>

        {favorites.map((name) => (
          <div
            key={name}
            style={{
              ...styles.favorite,

              background:
                selectedUser === name
                  ? "#e8f8ed"
                  : "transparent",
            }}
            onClick={() => setSelectedUser(name)}
          >
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
          <Card
            title="Total Visitors"
            value="20.500"
            change="+4.65%"
          />

          <Card
            title="Total Followers"
            value="21.800"
            change="-5.25%"
          />

          <Card
            title="Total Likes"
            value="30.400"
            change="+3.55%"
          />

          <Card
            title="Total Comments"
            value="14.800"
            change="-10.30%"
          />
        </div>

        <div style={styles.gridLarge}>
          <section style={styles.chartCard}>
            <h3>Visits</h3>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart data={visitsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                />

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
          </section>

          <section style={styles.chartCard}>
            <h3>Followers</h3>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>
                <Pie
                  data={followerData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {followerData.map(
                    (item, index) => (
                      <Cell
                        key={item.name}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <p style={{ textAlign: "center" }}>
              <strong>21.800</strong> Total
            </p>
          </section>
        </div>

        <div style={styles.gridLarge}>
          <section style={styles.chartCard}>
            <h3>Followers Growth</h3>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart data={growthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="followers"
                  fill="#16a34a"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section style={styles.chartCard}>
            <h3>New Followers</h3>

            {followers.map((name) => (
              <div
                key={name}
                style={styles.follower}
              >
                <div style={styles.smallAvatar}>
                  {name.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <strong>{name}</strong>

                  <p style={styles.muted}>
                    Product Designer
                  </p>
                </div>

                <button style={styles.followButton}>
                  Follow
                </button>
              </div>
            ))}
          </section>
        </div>
      </main>

      {selectedUser && (
        <aside style={styles.chat}>
          <div style={styles.chatHeader}>
            <div>
              <h3 style={{ margin: 0 }}>
                {selectedUser}
              </h3>

              <small style={styles.online}>
                Online
              </small>
            </div>

            <button
              style={styles.closeButton}
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>
          </div>

          <div style={styles.messages}>
            {getMessages().length === 0 ? (
              <div style={styles.emptyChat}>
                No messages yet
              </div>
            ) : (
              getMessages().map(
                (item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",

                      justifyContent:
                        item.type === "sent"
                          ? "flex-end"
                          : "flex-start",

                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        ...styles.message,

                        background:
                          item.type === "sent"
                            ? "#16a34a"
                            : "#f1f5f9",

                        color:
                          item.type === "sent"
                            ? "#fff"
                            : "#333",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                )
              )
            )}
          </div>

          <div style={styles.chatInput}>
            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              style={styles.input}
            />

            <button
              onClick={sendMessage}
              style={styles.sendButton}
            >
              ➤
            </button>
          </div>
        </aside>
      )}
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
    width: "230px",
    background: "#fff",
    padding: "25px",
    flexShrink: 0,
  },

  profileName: {
    textAlign: "center",
    marginBottom: "5px",
  },

  centerMuted: {
    color: "#888",
    textAlign: "center",
    fontSize: "13px",
  },

  avatar: {
    width: "90px",
    height: "90px",
    margin: "auto",
    borderRadius: "25px",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
  },

  smallAvatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  editButton: {
    display: "block",
    margin: "15px auto",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "9px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  divider: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "25px 0",
  },

  favorite: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "8px 0",
    padding: "8px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "25px",
    minWidth: 0,
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(140px, 1fr))",
    gap: "20px",
    margin: "20px 0",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  label: {
    color: "#888",
    margin: 0,
  },

  gridLarge: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  follower: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },

  muted: {
    color: "#888",
    fontSize: "13px",
    margin: "4px 0",
  },

  followButton: {
    border: "none",
    background: "#e8f8ed",
    color: "#16a34a",
    padding: "7px 18px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  chat: {
    width: "320px",
    background: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    minHeight: "100vh",
  },

  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },

  online: {
    color: "#16a34a",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  },

  messages: {
    flex: 1,
    padding: "20px 0",
  },

  emptyChat: {
    color: "#999",
    textAlign: "center",
    marginTop: "100px",
  },

  message: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "13px",
  },

  chatInput: {
    display: "flex",
    gap: "10px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
  },

  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
  },

  sendButton: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    cursor: "pointer",
  },
};

export default HomeTwo;