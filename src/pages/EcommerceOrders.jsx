import { useMemo, useState } from "react";

const ordersData = [
  {
    id: "#790842",
    customer: "Chloe Warren",
    date: "12.01.20",
    total: "$145.85",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: "#790846",
    customer: "Theresa Robertson",
    date: "12.09.20",
    total: "$225.15",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: "#790841",
    customer: "Nathan Hawkins",
    date: "12.09.20",
    total: "$45.55",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: "#790848",
    customer: "Lily Williamson",
    date: "12.09.20",
    total: "$106.25",
    payment: "Credit Card",
    status: "Processing",
  },
  {
    id: "#790849",
    customer: "Brooklyn Steward",
    date: "12.09.20",
    total: "$458.80",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: "#790850",
    customer: "Norma Flores",
    date: "12.09.20",
    total: "$128.79",
    payment: "Payoneer",
    status: "Processing",
  },
  {
    id: "#790851",
    customer: "Leslie McKinney",
    date: "12.09.20",
    total: "$105.05",
    payment: "Credit Card",
    status: "Cancelled",
  },
  {
    id: "#790852",
    customer: "Gregory Block",
    date: "12.09.20",
    total: "$1028.15",
    payment: "PayPal",
    status: "Shipped",
  },
];

const products = [
  {
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    price: "$2,500",
    quantity: 1,
  },
  {
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    price: "$3,000",
    quantity: 2,
  },
  {
    name: "Apple iPhone 11 Pro Max 256GB Space Gray",
    price: "$1,100",
    quantity: 1,
  },
];

function EcommerceOrders() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("Order Details");
  const [exportOpen, setExportOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const searchMatch =
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        activeStatus === "All" ||
        order.status === activeStatus;

      return searchMatch && statusMatch;
    });
  }, [search, activeStatus]);

  const openOrder = (order) => {
    setSelectedOrder(order);
    setActiveTab("Order Details");
    setModalOpen(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Orders</h1>

          <div style={styles.tabs}>
            {["All", "Pending", "Processing", "Refunded"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  style={{
                    ...styles.tab,
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
              )
            )}
          </div>
        </div>

        <ExportButton
          exportOpen={exportOpen}
          setExportOpen={setExportOpen}
        />
      </div>

      <div style={styles.card}>
        <div style={styles.toolbar}>
          <input
            style={styles.search}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order..."
          />

          <button style={styles.actionButton}>
            Actions ▾
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>ORDER NO.</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  style={styles.tableRow}
                  onDoubleClick={() => openOrder(order)}
                >
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td
                    style={styles.orderId}
                    onClick={() => openOrder(order)}
                  >
                    {order.id}
                  </td>

                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.payment}</td>

                  <td>
                    <Status status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.pagination}>
          <span>
            Showing 1 - {filteredOrders.length} of 100
          </span>

          <div>
            <button style={styles.activePage}>1</button>
            <button style={styles.pageButton}>2</button>
            <button style={styles.pageButton}>3</button>
            <button style={styles.pageButton}>›</button>
          </div>
        </div>
      </div>

      {modalOpen && selectedOrder && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              style={styles.close}
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <div style={styles.modalTabs}>
              {["Order Details", "Products", "Invoice"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      ...styles.modalTab,
                      color:
                        activeTab === tab
                          ? "#16a34a"
                          : "#555",
                      borderBottom:
                        activeTab === tab
                          ? "2px solid #16a34a"
                          : "2px solid transparent",
                    }}
                  >
                    {tab.toUpperCase()}
                  </button>
                )
              )}
            </div>

            <div style={styles.modalBody}>
              {activeTab === "Order Details" && (
                <OrderDetails order={selectedOrder} />
              )}

              {activeTab === "Products" && (
                <Products
                  onProductClick={() => setProductOpen(true)}
                />
              )}

              {activeTab === "Invoice" && (
                <Invoice order={selectedOrder} />
              )}
            </div>
          </div>
        </div>
      )}

      {productOpen && (
        <div style={styles.productOverlay}>
          <div style={styles.productModal}>
            <button
              style={styles.close}
              onClick={() => setProductOpen(false)}
            >
              ✕
            </button>

            <div style={styles.productImage}>
              🖼
            </div>

            <div style={styles.productInfo}>
              <h2>Apple iPhone 11 64GB Purple</h2>

              <p style={styles.muted}>
                We have always supported customers with
                high-quality products and modern technology.
              </p>

              <label style={styles.label}>Quantity</label>

              <div style={styles.quantity}>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <h2>$699</h2>

              <button style={styles.cartButton}>
                Add to Cart
              </button>

              <h3>Specifications</h3>

              <Spec name="Display" value="6.1 inch" />
              <Spec name="Chip" value="A13 Bionic chip" />
              <Spec name="Camera" value="Dual 12MP Ultra Wide" />
              <Spec name="OS" value="iOS 13" />
              <Spec name="Connector" value="4G LTE" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExportButton({ exportOpen, setExportOpen }) {
  return (
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
  );
}

function OrderDetails({ order }) {
  return (
    <>
      <h2>
        Orders <span style={styles.muted}>{order.id}</span>
      </h2>

      <h3>Customer</h3>

      <div style={styles.customerRow}>
        <div style={styles.avatar}>
          {order.customer.charAt(0)}
        </div>

        <div>
          <strong>{order.customer}</strong>
          <p style={styles.muted}>example@mail.com</p>
        </div>

        <span>+1(000) 4567-8800</span>

        <span>New York, NY</span>
      </div>

      <div style={styles.detailsGrid}>
        <section>
          <h3>Payment Method</h3>

          <select style={styles.input}>
            <option>{order.payment}</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>

          <p style={styles.muted}>
            Transaction ID: 00001-1812
          </p>

          <p>Amount: {order.total}</p>
        </section>

        <section>
          <h3>Shipping Method</h3>

          <select style={styles.input}>
            <option>Courier</option>
            <option>Express</option>
          </select>

          <p style={styles.muted}>
            Tracking Code: F-09245-5
          </p>

          <p>Date: {order.date}</p>
        </section>

        <section>
          <h3>Fulfillment Status</h3>

          <select style={styles.input}>
            <option>Delivered</option>
            <option>Processing</option>
          </select>
        </section>

        <section>
          <h3>Payment Status</h3>

          <select style={styles.input}>
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </section>
      </div>

      <div style={styles.address}>
        <h3>Billing address</h3>

        <p>First name: Regina</p>
        <p>Last name: Cooper</p>
        <p>Address: 001 E. Brown St. Holtsville</p>
        <p>State/Region: New York</p>
        <p>Country: United States</p>
      </div>

      <div style={styles.address}>
        <h3>Shipping address</h3>

        <p>New York, United States</p>
      </div>
    </>
  );
}

function Products({ onProductClick }) {
  return (
    <>
      <h2>Products</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.name}>
              <td
                style={styles.orderId}
                onClick={onProductClick}
              >
                {product.name}
              </td>

              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Invoice({ order }) {
  return (
    <>
      <div style={styles.invoiceHeader}>
        <div style={styles.invoiceBox}>
          <strong>INVOICE</strong>
          <p>{order.id}</p>
        </div>

        <div>
          <strong>SECRET INC.</strong>
          <p style={styles.muted}>
            New York, NY, USA
          </p>
          <p style={styles.muted}>
            info@secret.com
          </p>
        </div>

        <div>
          <p>SEPTEMBER 12, 2019</p>
          <h3>FLOWER</h3>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.invoiceTotal}>
        <p>SUBTOTAL &nbsp; $6,600</p>
        <p>TAX (20%) &nbsp; $1,320</p>
        <p>DISCOUNT &nbsp; -$800</p>
        <h3>TOTAL &nbsp; $7,120</h3>
      </div>
    </>
  );
}

function Status({ status }) {
  const statusStyles = {
    Shipped: {
      background: "#ecfdf5",
      color: "#16a34a",
    },
    Processing: {
      background: "#fff7ed",
      color: "#d97706",
    },
    Cancelled: {
      background: "#fef2f2",
      color: "#ef4444",
    },
  };

  return (
    <span
      style={{
        ...styles.status,
        ...(statusStyles[status] || statusStyles.Processing),
      }}
    >
      {status}
    </span>
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
    minHeight: "100vh",
    background: "#f5f7f6",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    margin: 0,
  },

  tabs: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  tab: {
    border: "none",
    background: "transparent",
    padding: "10px",
    cursor: "pointer",
  },

  exportButton: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  exportMenu: {
    position: "absolute",
    right: 0,
    top: "45px",
    width: "130px",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,.15)",
    zIndex: 50,
  },

  exportItem: {
    padding: "11px 15px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  search: {
    width: "70%",
    padding: "11px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  actionButton: {
    padding: "10px 18px",
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: "5px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  tableRow: {
    borderBottom: "1px solid #eee",
  },

  orderId: {
    color: "#555",
    cursor: "pointer",
    padding: "15px 5px",
  },

  status: {
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },

  modal: {
    width: "850px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    borderRadius: "8px",
    position: "relative",
  },

  close: {
    position: "absolute",
    right: "15px",
    top: "12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  },

  modalTabs: {
    display: "flex",
    padding: "0 25px",
    borderBottom: "1px solid #eee",
  },

  modalTab: {
    border: "none",
    background: "transparent",
    padding: "18px 12px",
    cursor: "pointer",
    fontSize: "11px",
  },

  modalBody: {
    padding: "25px",
  },

  muted: {
    color: "#888",
    fontSize: "13px",
  },

  customerRow: {
    display: "grid",
    gridTemplateColumns: "50px 1fr 1fr 1fr",
    alignItems: "center",
    gap: "15px",
    padding: "15px 0",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxSizing: "border-box",
  },

  address: {
    borderTop: "1px solid #eee",
    marginTop: "20px",
    paddingTop: "10px",
  },

  invoiceHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: "30px",
    marginBottom: "30px",
  },

  invoiceBox: {
    background: "#ef6f61",
    color: "#fff",
    padding: "20px",
  },

  invoiceTotal: {
    textAlign: "right",
    marginTop: "25px",
  },

  productOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },

  productModal: {
    width: "800px",
    maxWidth: "90%",
    background: "#fff",
    padding: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    position: "relative",
  },

  productImage: {
    background: "#f5f5f5",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
  },

  productInfo: {
    padding: "20px",
  },

  label: {
    display: "block",
    color: "#777",
    fontSize: "13px",
    margin: "15px 0 7px",
  },

  quantity: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
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

export default EcommerceOrders;