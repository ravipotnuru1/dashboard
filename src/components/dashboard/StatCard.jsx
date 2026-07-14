function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        borderLeft: `5px solid ${color}`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;