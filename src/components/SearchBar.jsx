function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search..."
      style={{
        padding: "10px 15px",
        width: "250px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        outline: "none",
      }}
    />
  );
}

export default SearchBar;