function LastOrders() {
  const orders = [
    { id: "#1001", customer: "John", product: "Laptop", amount: "$1200", status: "Completed" },
    { id: "#1002", customer: "David", product: "Phone", amount: "$800", status: "Pending" },
    { id: "#1003", customer: "Emma", product: "Watch", amount: "$250", status: "Completed" },
    { id: "#1004", customer: "Sophia", product: "Headphones", amount: "$150", status: "Cancelled" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <h3>Last Orders</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: "10px" }}>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ padding: "10px" }}>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LastOrders;