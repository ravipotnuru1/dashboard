function Transactions() {
  const transactions = [
    {
      name: "John Smith",
      action: "Payment Received",
      amount: "+$250",
      color: "green",
    },
    {
      name: "Emma Watson",
      action: "Order Placed",
      amount: "$120",
      color: "blue",
    },
    {
      name: "David Lee",
      action: "Refund",
      amount: "-$80",
      color: "red",
    },
    {
      name: "Sophia",
      action: "Subscription",
      amount: "+$50",
      color: "green",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3>Recent Transactions</h3>

      {transactions.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <div>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <small>{item.action}</small>
          </div>

          <strong style={{ color: item.color }}>
            {item.amount}
          </strong>
        </div>
      ))}
    </div>
  );
}

export default Transactions;