import { useState } from "react";
import {
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
  FaComments,
  FaEllipsisV,
  FaPaperPlane,
} from "react-icons/fa";

const customers = [
  {
    id: 1,
    name: "Ronald Robertson",
    role: "Customer",
    status: "Online",
    message: "Hello, I need help with my order.",
  },
  {
    id: 2,
    name: "Regina Cooper",
    role: "Customer",
    status: "Online",
    message: "When will my product be delivered?",
  },
  {
    id: 3,
    name: "Judith Black",
    role: "Customer",
    status: "Offline",
    message: "I want to return my product.",
  },
  {
    id: 4,
    name: "Dustin Williamson",
    role: "Customer",
    status: "Online",
    message: "Payment was deducted twice.",
  },
  {
    id: 5,
    name: "Calvin Flores",
    role: "Customer",
    status: "Offline",
    message: "Can you update my address?",
  },
];

function CustomerCare() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState({
    1: [
      {
        sender: "customer",
        text: "Hello, I need help with my order.",
      },
      {
        sender: "admin",
        text: "Hello Ronald. How can I help you?",
      },
    ],
  });

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    setChats((previous) => ({
      ...previous,
      [selectedCustomer.id]: [
        ...(previous[selectedCustomer.id] || []),
        {
          sender: "admin",
          text: message,
        },
      ],
    }));

    setMessage("");
  };

  return (
    <div style={styles.page}>
      {/* CUSTOMER LIST */}

      <aside style={styles.customerPanel}>
        <h2 style={styles.title}>Customer Care</h2>

        <div style={styles.searchBox}>
          <FaSearch color="#aaa" />

          <input
            style={styles.searchInput}
            placeholder="Search customers..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              style={{
                ...styles.customer,
                background:
                  selectedCustomer.id === customer.id
                    ? "#f0faf3"
                    : "transparent",
              }}
            >
              <div style={styles.avatar}>
                {customer.name.charAt(0)}
              </div>

              <div style={{ flex: 1 }}>
                <strong style={styles.customerName}>
                  {customer.name}
                </strong>

                <p style={styles.lastMessage}>
                  {customer.message}
                </p>
              </div>

              <span
                style={{
                  ...styles.statusDot,
                  background:
                    customer.status === "Online"
                      ? "#22c55e"
                      : "#bbb",
                }}
              />
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT */}

      <main style={styles.chatPanel}>
        <div style={styles.chatHeader}>
          <div style={styles.headerUser}>
            <div style={styles.avatar}>
              {selectedCustomer.name.charAt(0)}
            </div>

            <div>
              <strong>{selectedCustomer.name}</strong>

              <p style={styles.onlineText}>
                {selectedCustomer.status}
              </p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button style={styles.iconButton}>
              <FaPhoneAlt />
            </button>

            <button style={styles.iconButton}>
              <FaEnvelope />
            </button>

            <button style={styles.iconButton}>
              <FaEllipsisV />
            </button>
          </div>
        </div>

        <div style={styles.messages}>
          {(chats[selectedCustomer.id] || []).length === 0 ? (
            <div style={styles.emptyChat}>
              <FaComments size={35} />

              <h3>{selectedCustomer.name}</h3>

              <p>No messages yet</p>
            </div>
          ) : (
            chats[selectedCustomer.id].map((chat, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    chat.sender === "admin"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    background:
                      chat.sender === "admin"
                        ? "#22a447"
                        : "#f1f3f2",
                    color:
                      chat.sender === "admin"
                        ? "#fff"
                        : "#333",
                  }}
                >
                  {chat.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.messageInput}>
          <input
            style={styles.input}
            placeholder="Write a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            style={styles.sendButton}
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </main>

      {/* CUSTOMER INFORMATION */}

      <aside style={styles.infoPanel}>
        <div style={styles.largeAvatar}>
          {selectedCustomer.name.charAt(0)}
        </div>

        <h3 style={{ textAlign: "center" }}>
          {selectedCustomer.name}
        </h3>

        <p style={styles.centerMuted}>
          {selectedCustomer.role}
        </p>

        <hr style={styles.divider} />

        <h4 style={styles.infoTitle}>CUSTOMER INFO</h4>

        <Info label="EMAIL" value="customer@example.com" />
        <Info label="PHONE" value="+123-4567-8800" />
        <Info label="LOCATION" value="New York, NY" />
        <Info label="CUSTOMER ID" value="#790341" />

        <hr style={styles.divider} />

        <h4 style={styles.infoTitle}>LAST ORDER</h4>

        <div style={styles.orderCard}>
          <strong>#790341</strong>

          <p>Apple iPhone 11 Pro Max</p>

          <span>$2,500</span>
        </div>
      </aside>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <small>{label}</small>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "300px 1fr 280px",
    minHeight: "100vh",
    background: "#fff",
  },

  customerPanel: {
    borderRight: "1px solid #eee",
    padding: "25px 15px",
  },

  title: {
    margin: "0 10px 20px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f7f8f8",
    padding: "11px",
    margin: "0 10px 20px",
    borderRadius: "5px",
  },

  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
  },

  customer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 10px",
    cursor: "pointer",
    borderRadius: "6px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#ef8b72",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  customerName: {
    fontSize: "13px",
  },

  lastMessage: {
    fontSize: "11px",
    color: "#999",
    margin: "5px 0 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "170px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },

  chatPanel: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  chatHeader: {
    height: "85px",
    borderBottom: "1px solid #eee",
    padding: "0 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerUser: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  onlineText: {
    color: "#22a447",
    fontSize: "11px",
    margin: "4px 0 0",
  },

  headerActions: {
    display: "flex",
    gap: "8px",
  },

  iconButton: {
    border: "none",
    background: "#f6f7f7",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    cursor: "pointer",
    color: "#777",
  },

  messages: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    background: "#fafbfb",
  },

  emptyChat: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#aaa",
  },

  message: {
    maxWidth: "55%",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  messageInput: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #eee",
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
  },

  sendButton: {
    width: "45px",
    border: "none",
    borderRadius: "5px",
    background: "#22a447",
    color: "#fff",
    cursor: "pointer",
  },

  infoPanel: {
    borderLeft: "1px solid #eee",
    padding: "35px 25px",
  },

  largeAvatar: {
    width: "90px",
    height: "90px",
    margin: "auto",
    borderRadius: "50%",
    background: "#ef8b72",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },

  centerMuted: {
    textAlign: "center",
    color: "#999",
    fontSize: "12px",
  },

  divider: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "25px 0",
  },

  infoTitle: {
    fontSize: "11px",
  },

  infoItem: {
    marginTop: "18px",
  },

  orderCard: {
    background: "#f7f8f8",
    padding: "15px",
    borderRadius: "6px",
  },
};

export default CustomerCare;