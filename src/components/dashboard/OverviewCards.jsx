import { FaDollarSign, FaChartBar, FaUsers } from "react-icons/fa";

function OverviewCards() {
  const cards = [
    {
      title: "Total Income",
      value: "$8,500",
      change: "+5.08%",
      icon: <FaDollarSign />,
      color: "#4CAF50",
    },
    {
      title: "Total Sales",
      value: "3.500K",
      change: "-10.5%",
      icon: <FaDollarSign />,
      color: "#00BCD4",
    },
    {
      title: "New Clients",
      value: "2.500K",
      change: "+24.9%",
      icon: <FaChartBar />,
      color: "#26C6DA",
    },
    {
      title: "New Users",
      value: "850",
      change: "+8.2%",
      icon: <FaUsers />,
      color: "#81C784",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <p
              style={{
                color: "#888",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              {card.title}
            </p>

            <h2 style={{ margin: 0 }}>{card.value}</h2>

            <small style={{ color: card.color }}>
              {card.change}
            </small>
          </div>

          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "12px",
              background: "#E8F8F1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: card.color,
            }}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;