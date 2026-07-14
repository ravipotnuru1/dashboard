import { useMemo, useState } from "react";

const initialProducts = [
  {
    id: "#790341",
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    category: "Notebook",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
  {
    id: "#790342",
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    category: "Watch",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
  {
    id: "#790343",
    name: "Apple iPhone 11 Pro Max 256GB Space Gray",
    category: "Phone",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
  {
    id: "#790344",
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    category: "Watch",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
  {
    id: "#790345",
    name: "MacBook Pro 16 Retina Touch Bar MVVJ2",
    category: "Notebook",
    date: "12.09.20",
    price: "$2,500",
    status: "Disabled",
  },
  {
    id: "#790346",
    name: "Apple iPhone 11 Pro Max 64GB Midnight Green",
    category: "Phone",
    date: "12.09.20",
    price: "$2,500",
    status: "Disabled",
  },
  {
    id: "#790347",
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    category: "Notebook",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
  {
    id: "#790348",
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    category: "Watch",
    date: "12.09.20",
    price: "$2,500",
    status: "Available",
  },
];

const modalTabs = [
  "Information",
  "Images",
  "Pricing",
  "Inventory",
  "Shipping",
];

function Ecommerce() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("list");

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeTab, setActiveTab] = useState("Information");

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [quantity, setQuantity] = useState(1);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "Phone",
    price: "",
    discount: "",
    tags: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const tabMatch =
        activeStatus === "All" ||
        product.status === activeStatus;

      const categoryMatch =
        filterCategory === "All" ||
        product.category === filterCategory;

      const statusMatch =
        filterStatus === "All" ||
        product.status === filterStatus;

      return (
        searchMatch &&
        tabMatch &&
        categoryMatch &&
        statusMatch
      );
    });
  }, [
    products,
    search,
    activeStatus,
    filterCategory,
    filterStatus,
  ]);

  const addProduct = () => {
    if (!newProduct.name.trim()) return;

    const product = {
      id: `#${790349 + products.length}`,
      name: newProduct.name,
      category: newProduct.category,
      date: "12.09.20",
      price: `$${newProduct.price || "0"}`,
      status: "Available",
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      description: "",
      category: "Phone",
      price: "",
      discount: "",
      tags: "",
    });

    setAddOpen(false);
  };

  const openEditor = () => {
    setActiveTab("Information");
    setEditOpen(true);
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setQuickViewOpen(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Products</h1>

          <div style={styles.statusTabs}>
            {["All", "Available", "Disabled"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                style={{
                  ...styles.statusTab,
                  color:
                    activeStatus === status
                      ? "#16a34a"
                      : "#888",
                  borderBottom:
                    activeStatus === status
                      ? "2px solid #16a34a"
                      : "2px solid transparent",
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.headerActions}>
          <div style={{ position: "relative" }}>
            <button
              style={styles.exportButton}
              onClick={() => setExportOpen(!exportOpen)}
            >
              ⇩ Export ▾
            </button>

            {exportOpen && (
              <div style={styles.exportMenu}>
                {["Print", "Excel", "PDF", "CSV"].map((item) => (
                  <div
                    key={item}
                    style={styles.exportItem}
                    onClick={() => setExportOpen(false)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            style={styles.addButton}
            onClick={() => setAddOpen(true)}
          >
            +
          </button>
        </div>
      </div>

      <div style={styles.viewButtons}>
        <button
          style={{
            ...styles.viewButton,
            color: view === "list" ? "#16a34a" : "#999",
          }}
          onClick={() => setView("list")}
        >
          ☰
        </button>

        <button
          style={{
            ...styles.viewButton,
            color: view === "grid" ? "#16a34a" : "#999",
          }}
          onClick={() => setView("grid")}
        >
          ▦
        </button>
      </div>

      <div style={styles.contentCard}>
        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              style={styles.search}
            />

            {search && (
              <div style={styles.suggestions}>
                {filteredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    style={styles.suggestion}
                    onClick={() => {
                      setSearch(product.name);
                      openQuickView(product);
                    }}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              style={styles.actionButton}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Actions ▾
            </button>

            {filterOpen && (
              <div style={styles.filterPopup}>
                <h2>Filter</h2>

                <label style={styles.label}>Category</label>

                <select
                  style={styles.input}
                  value={filterCategory}
                  onChange={(event) =>
                    setFilterCategory(event.target.value)
                  }
                >
                  <option>All</option>
                  <option>Phone</option>
                  <option>Notebook</option>
                  <option>Watch</option>
                </select>

                <label style={styles.label}>Status</label>

                <select
                  style={styles.input}
                  value={filterStatus}
                  onChange={(event) =>
                    setFilterStatus(event.target.value)
                  }
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Disabled</option>
                </select>

                <label style={styles.label}>Date</label>

                <div style={styles.twoColumns}>
                  <input type="date" style={styles.input} />
                  <input type="date" style={styles.input} />
                </div>

                <label style={styles.label}>Price</label>

                <input
                  type="range"
                  min="500"
                  max="5500"
                  style={{ width: "100%" }}
                />

                <div style={styles.priceRow}>
                  <span>$500</span>
                  <span>$5,500</span>
                </div>

                <button
                  style={styles.saveButton}
                  onClick={() => setFilterOpen(false)}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {view === "list" ? (
          <ProductTable
            products={filteredProducts}
            onEdit={openEditor}
            onProductClick={openQuickView}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onProductClick={openQuickView}
          />
        )}

        <div style={styles.pagination}>
          <span>
            Showing 1 - {filteredProducts.length} of 100
          </span>

          <div>
            <button style={styles.activePage}>1</button>
            <button style={styles.pageButton}>2</button>
            <button style={styles.pageButton}>3</button>
            <button style={styles.pageButton}>›</button>
          </div>
        </div>
      </div>

      {addOpen && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setAddOpen(false)}
          />

          <div style={styles.addPanel}>
            <h2>Add Product</h2>

            <label style={styles.label}>Product Name</label>

            <input
              style={styles.input}
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  name: event.target.value,
                })
              }
              placeholder="Apple iPhone 11 Pro Max"
            />

            <label style={styles.label}>Description</label>

            <div style={styles.editor}>
              <div style={styles.editorTools}>
                A ▾ &nbsp; B &nbsp; / &nbsp; U &nbsp; ≡
              </div>

              <textarea
                style={styles.textarea}
                placeholder="Type something"
                value={newProduct.description}
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    description: event.target.value,
                  })
                }
              />
            </div>

            <label style={styles.label}>Category</label>

            <select
              style={styles.input}
              value={newProduct.category}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  category: event.target.value,
                })
              }
            >
              <option>Phone</option>
              <option>Notebook</option>
              <option>Watch</option>
            </select>

            <div style={styles.twoColumns}>
              <div>
                <label style={styles.label}>Price</label>

                <input
                  style={styles.input}
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      price: event.target.value,
                    })
                  }
                  placeholder="$ 2,500"
                />
              </div>

              <div>
                <label style={styles.label}>Discount</label>

                <input
                  style={styles.input}
                  value={newProduct.discount}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      discount: event.target.value,
                    })
                  }
                  placeholder="% 15"
                />
              </div>
            </div>

            <label style={styles.label}>Product Images</label>

            <div style={styles.uploadBox}>
              ☁
              <p>Drag and Drop or Browse to upload</p>
            </div>

            <div style={styles.imageRow}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={styles.imageBox}>
                  🖼
                </div>
              ))}
            </div>

            <label style={styles.label}>Tags</label>

            <input
              style={styles.input}
              value={newProduct.tags}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  tags: event.target.value,
                })
              }
              placeholder="Apple • Phone • 64GB"
            />

            <div style={styles.buttonRow}>
              <button
                style={styles.saveButton}
                onClick={addProduct}
              >
                Save
              </button>

              <button
                style={styles.cancelButton}
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {editOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <button
              style={styles.closeButton}
              onClick={() => setEditOpen(false)}
            >
              ✕
            </button>

            <div style={styles.modalTabs}>
              {modalTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.modalTab,
                    color:
                      activeTab === tab ? "#16a34a" : "#555",
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #16a34a"
                        : "2px solid transparent",
                  }}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={styles.modalBody}>
              {activeTab === "Information" && <Information />}
              {activeTab === "Images" && <Images />}
              {activeTab === "Pricing" && <Pricing />}
              {activeTab === "Inventory" && <Inventory />}
              {activeTab === "Shipping" && <Shipping />}
            </div>
          </div>
        </div>
      )}

      {quickViewOpen && selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.quickView}>
            <button
              style={styles.closeButton}
              onClick={() => setQuickViewOpen(false)}
            >
              ✕
            </button>

            <div style={styles.quickImage}>🖼</div>

            <div style={styles.quickInfo}>
              <h2>{selectedProduct.name}</h2>

              <p style={styles.description}>
                We have always supported our customers with
                high-quality products and modern technology.
              </p>

              <label style={styles.label}>Quantity</label>

              <div style={styles.quantity}>
                <button
                  style={styles.quantityButton}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.max(1, value - 1)
                    )
                  }
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  style={styles.quantityButton}
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                >
                  +
                </button>
              </div>

              <h2>{selectedProduct.price}</h2>

              <button style={styles.cartButton}>
                Add to Cart
              </button>

              <h3>Specifications</h3>

              <Spec name="Display" value="6.1 inch" />
              <Spec name="Chip" value="A13 Bionic chip" />
              <Spec
                name="Camera"
                value="Dual 12MP Ultra Wide"
              />
              <Spec name="OS" value="iOS 13" />
              <Spec name="Connector" value="4G LTE" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductTable({
  products,
  onEdit,
  onProductClick,
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>PRODUCT NAME</th>
            <th>PRODUCT NO.</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            <th>PRICE</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div style={styles.productName}>
                  <input type="checkbox" />

                  <span
                    style={styles.clickableProduct}
                    onClick={() => onProductClick(product)}
                  >
                    {product.name}
                  </span>
                </div>
              </td>

              <td>{product.id}</td>
              <td>{product.category}</td>
              <td>{product.date}</td>
              <td>{product.price}</td>

              <td>
                <Status status={product.status} />
              </td>

              <td>
                <button
                  style={styles.moreButton}
                  onClick={onEdit}
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductGrid({ products, onProductClick }) {
  return (
    <div style={styles.productGrid}>
      {products.map((product) => (
        <div
          key={product.id}
          style={styles.productCard}
          onClick={() => onProductClick(product)}
        >
          <Status status={product.status} />

          <div style={styles.productImage}>🖼</div>

          <strong>{product.name}</strong>

          <div style={styles.cardDetails}>
            <span>{product.category}</span>
            <span>{product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Status({ status }) {
  return (
    <span
      style={{
        ...styles.status,
        background:
          status === "Available" ? "#ecfdf5" : "#fff7ed",
        color:
          status === "Available" ? "#16a34a" : "#d97706",
      }}
    >
      {status}
    </span>
  );
}

function Information() {
  return (
    <>
      <h2>Information</h2>

      <label style={styles.label}>Product Name</label>

      <input
        style={styles.input}
        defaultValue="Apple iPhone 11 Pro Max 64GB Midnight Green"
      />

      <label style={styles.label}>Description</label>

      <div style={styles.editor}>
        <div style={styles.editorTools}>
          A ▾ &nbsp; B &nbsp; / &nbsp; U &nbsp; ≡
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Type something"
        />
      </div>

      <label style={styles.label}>Category</label>

      <select style={styles.input}>
        <option>Phone</option>
        <option>Notebook</option>
        <option>Watch</option>
      </select>

      <label style={styles.label}>Tags</label>

      <input
        style={styles.input}
        defaultValue="Apple • Phone • 64GB"
      />

      <ModalButtons />
    </>
  );
}

function Images() {
  return (
    <>
      <h2>Images</h2>

      <div style={styles.uploadBox}>
        ☁
        <p>Drag and Drop or Browse to upload</p>
      </div>

      {[1, 2, 3].map((item) => (
        <div key={item} style={styles.imageListItem}>
          <span>☰</span>
          <div style={styles.smallImage}>🖼</div>
          <span style={{ flex: 1 }}>{item}</span>
          <span>✓</span>
          <span>♙</span>
        </div>
      ))}

      <ModalButtons />
    </>
  );
}

function Pricing() {
  return (
    <>
      <h2>Pricing</h2>

      <label style={styles.label}>Tax Excluded Price</label>
      <input style={styles.input} defaultValue="$ 2500" />

      <label style={styles.label}>Tax Included Price</label>
      <input style={styles.input} defaultValue="$ 2600" />

      <label style={styles.label}>Tax Rule</label>

      <input
        style={styles.input}
        defaultValue="US-Tax Rate (4%)"
      />

      <div style={styles.twoColumns}>
        <div>
          <label style={styles.label}>Unit Price</label>
          <input style={styles.input} defaultValue="$ 10" />
        </div>

        <div>
          <label style={styles.label}>Per</label>
          <input style={styles.input} defaultValue="1" />
        </div>
      </div>

      <ModalButtons />
    </>
  );
}

function Inventory() {
  return (
    <>
      <h2>Inventory</h2>

      <label style={styles.label}>SKU</label>
      <input style={styles.input} placeholder="SKU" />

      <label style={styles.label}>Quantity</label>

      <input
        style={styles.input}
        type="number"
        defaultValue="0"
      />

      <ModalButtons />
    </>
  );
}

function Shipping() {
  return (
    <>
      <h2>Shipping</h2>

      <div style={styles.twoColumns}>
        <div>
          <label style={styles.label}>Width</label>
          <input style={styles.input} placeholder="0cm" />
        </div>

        <div>
          <label style={styles.label}>Height</label>
          <input style={styles.input} placeholder="0cm" />
        </div>

        <div>
          <label style={styles.label}>Depth</label>
          <input style={styles.input} placeholder="0cm" />
        </div>

        <div>
          <label style={styles.label}>Weight</label>
          <input style={styles.input} placeholder="0kg" />
        </div>
      </div>

      <label style={styles.label}>Extra Shipping Fee</label>

      <input style={styles.input} defaultValue="$ 0.00" />

      <ModalButtons />
    </>
  );
}

function ModalButtons() {
  return (
    <div style={styles.buttonRow}>
      <button style={styles.saveButton}>Save</button>
      <button style={styles.cancelButton}>Cancel</button>
    </div>
  );
}

function Spec({ name, value }) {
  return (
    <div style={styles.spec}>
      <span>{name}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    padding: "25px",
    background: "#f5f7f6",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    margin: 0,
  },

  statusTabs: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  statusTab: {
    border: "none",
    background: "transparent",
    padding: "10px",
    cursor: "pointer",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
  },

  exportButton: {
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
  },

  exportMenu: {
    position: "absolute",
    top: "45px",
    right: 0,
    width: "130px",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,.15)",
    borderRadius: "6px",
    zIndex: 50,
  },

  exportItem: {
    padding: "11px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },

  addButton: {
    width: "42px",
    height: "42px",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "22px",
    cursor: "pointer",
  },

  viewButtons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0",
  },

  viewButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  contentCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  searchWrap: {
    position: "relative",
    width: "70%",
  },

  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  suggestions: {
    position: "absolute",
    top: "45px",
    width: "100%",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,.15)",
    zIndex: 40,
  },

  suggestion: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  actionButton: {
    padding: "10px 18px",
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },

  filterPopup: {
    position: "absolute",
    right: 0,
    top: "45px",
    width: "300px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,.18)",
    zIndex: 60,
  },

  label: {
    display: "block",
    fontSize: "13px",
    color: "#777",
    margin: "15px 0 7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  saveButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 25px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  cancelButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  productName: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "14px 0",
  },

  clickableProduct: {
    cursor: "pointer",
  },

  status: {
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
  },

  moreButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  productCard: {
    border: "1px solid #eee",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  productImage: {
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
  },

  cardDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    color: "#777",
  },

  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    color: "#888",
  },

  activePage: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
  },

  pageButton: {
    border: "none",
    background: "transparent",
    padding: "8px 12px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.2)",
    zIndex: 100,
  },

  addPanel: {
    position: "fixed",
    right: 0,
    top: 0,
    width: "430px",
    height: "100vh",
    background: "#fff",
    padding: "25px",
    boxSizing: "border-box",
    overflowY: "auto",
    zIndex: 101,
  },

  editor: {
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  editorTools: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    height: "100px",
    border: "none",
    padding: "10px",
    boxSizing: "border-box",
    resize: "none",
  },

  uploadBox: {
    border: "2px dashed #ddd",
    padding: "30px",
    textAlign: "center",
    color: "#888",
  },

  imageRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  imageBox: {
    width: "55px",
    height: "55px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonRow: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },

  modal: {
    width: "650px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    borderRadius: "8px",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    right: "12px",
    top: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 5,
  },

  modalTabs: {
    display: "flex",
    borderBottom: "1px solid #eee",
    padding: "0 20px",
  },

  modalTab: {
    border: "none",
    background: "transparent",
    padding: "18px 12px",
    fontSize: "11px",
    cursor: "pointer",
  },

  modalBody: {
    padding: "25px",
  },

  imageListItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  smallImage: {
    width: "45px",
    height: "45px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  quickView: {
    width: "800px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderRadius: "8px",
    position: "relative",
  },

  quickImage: {
    minHeight: "500px",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
  },

  quickInfo: {
    padding: "35px",
  },

  description: {
    color: "#888",
    lineHeight: "1.6",
  },

  quantity: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  quantityButton: {
    width: "35px",
    height: "35px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  cartButton: {
    width: "100%",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  spec: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
};

export default Ecommerce;