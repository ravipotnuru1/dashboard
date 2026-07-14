import {
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaShoppingBag,
  FaUtensils,
  FaHome,
  FaCar,
  FaEllipsisV,
} from "react-icons/fa";

function HomeFour() {
  const transactions = [
    ["Devon Williamson", "Payment", "+$4,500"],
    ["Darlene Robertson", "Payment", "-$250"],
    ["Judith Black", "Payment", "+$2,800"],
    ["Philip Henry", "Payment", "-$150"],
    ["Mitchell Cooper", "Payment", "+$900"],
  ];

  const payments = [
    ["Shopping", "20 Aug", "-$1,400", <FaShoppingBag />],
    ["Travel", "21 Aug", "-$900", <FaCar />],
    ["Food", "24 Aug", "-$250", <FaUtensils />],
    ["Housing", "26 Aug", "-$600", <FaHome />],
  ];

  const contacts = [
    "Ronald Robertson",
    "Regina Cooper",
    "Judith Black",
    "Dustin Williamson",
    "Calvin Flores",
    "Robert Edwards",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f8",
        padding: "25px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>Overview</h2>

        <select
          style={{
            border: "1px solid #eee",
            padding: "9px 14px",
            borderRadius: "5px",
            background: "#fff",
          }}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2.5fr 1.3fr",
          gap: "20px",
        }}
      >
        {/* INCOME / SPENT */}

        <div>
          <div style={greenCard}>
            <div style={iconBox}>
              <FaArrowUp />
            </div>
            <p>Income</p>
            <h2>$5,750</h2>
          </div>

          <div style={{ ...greenCard, background: "#fff", color: "#333" }}>
            <div
              style={{
                ...iconBox,
                background: "#47c5a3",
                color: "#fff",
              }}
            >
              <FaArrowDown />
            </div>
            <p>Spent</p>
            <h2>$2,400</h2>
          </div>
        </div>

        {/* BALANCE */}

        <div style={card}>
          <div style={sectionHeader}>
            <h3>Balance</h3>
            <FaEllipsisV />
          </div>

          <div
            style={{
              display: "flex",
              gap: "35px",
              margin: "25px 0",
            }}
          >
            <div>
              <small>Income</small>
              <h3>$24,500</h3>
            </div>

            <div>
              <small>Spending</small>
              <h3>$9,400</h3>
            </div>
          </div>

          <div
            style={{
              height: "220px",
              position: "relative",
              borderBottom: "1px solid #ddd",
              background:
                "linear-gradient(to bottom, transparent 24%, #eee 25%, transparent 26%, transparent 49%, #eee 50%, transparent 51%, transparent 74%, #eee 75%, transparent 76%)",
            }}
          >
            <svg width="100%" height="220" viewBox="0 0 600 220">
              <path
                d="M0 150 C60 120,90 80,150 95 S230 170,300 120 S390 70,450 110 S530 170,600 90"
                fill="none"
                stroke="#2caf62"
                strokeWidth="4"
              />

              <path
                d="M0 150 C60 120,90 80,150 95 S230 170,300 120 S390 70,450 110 S530 170,600 90 L600 220 L0 220 Z"
                fill="rgba(44,175,98,0.08)"
              />
            </svg>
          </div>
        </div>

        {/* CARDS */}

        <div>
          <h3>Cards</h3>

          <div style={bankCard}>
            <p>Current Balance</p>
            <h2>80,700.00</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "45px",
              }}
            >
              <span>**** 2874</span>
              <b>VISA</b>
            </div>
          </div>

          <h3>Contacts</h3>

          <div style={card}>
            {contacts.map((name, index) => (
              <div key={index} style={contactRow}>
                <div style={avatar}>
                  {name.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: "13px" }}>{name}</b>
                  <p
                    style={{
                      margin: "3px 0",
                      fontSize: "11px",
                      color: "#999",
                    }}
                  >
                    Project Manager
                  </p>
                </div>

                <FaEllipsisV color="#aaa" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* TRANSACTIONS */}

        <div style={card}>
          <div style={sectionHeader}>
            <h3>Transactions</h3>
            <FaEllipsisV />
          </div>

          {transactions.map((item, index) => (
            <div key={index} style={listRow}>
              <div style={avatar}>{item[0].charAt(0)}</div>

              <div style={{ flex: 1 }}>
                <b>{item[0]}</b>
                <p style={smallText}>{item[1]} • 20 Aug</p>
              </div>

              <b
                style={{
                  color: item[2].includes("+") ? "#20a756" : "#e65c5c",
                }}
              >
                {item[2]}
              </b>
            </div>
          ))}
        </div>

        {/* PAYMENTS */}

        <div style={card}>
          <div style={sectionHeader}>
            <h3>Payments</h3>
            <FaEllipsisV />
          </div>

          {payments.map((item, index) => (
            <div key={index} style={listRow}>
              <div
                style={{
                  ...avatar,
                  background: "#eaf8ef",
                  color: "#23a455",
                }}
              >
                {item[3]}
              </div>

              <div style={{ flex: 1 }}>
                <b>{item[0]}</b>
                <p style={smallText}>{item[1]}</p>
              </div>

              <b>{item[2]}</b>
            </div>
          ))}

          <button
            style={{
              border: "none",
              background: "#23a455",
              color: "#fff",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              float: "right",
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "6px",
  border: "1px solid #eee",
};

const greenCard = {
  background: "#209b43",
  color: "#fff",
  padding: "20px",
  borderRadius: "6px",
  marginBottom: "20px",
};

const iconBox = {
  width: "35px",
  height: "35px",
  borderRadius: "6px",
  background: "#fff",
  color: "#209b43",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const bankCard = {
  background: "linear-gradient(135deg,#168f43,#52cfa9)",
  color: "#fff",
  padding: "22px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const avatar = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#e8866d",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
};

const contactRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
};

const listRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const smallText = {
  margin: "4px 0 0",
  color: "#999",
  fontSize: "12px",
};

export default HomeFour;