import { useMemo, useState } from "react";
import {
  FaSearch,
  FaSlidersH,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaEllipsisV,
  FaDownload,
  FaPrint,
  FaFileExcel,
  FaFilePdf,
  FaFileCsv,
  FaTimes,
  FaChevronUp,
} from "react-icons/fa";

import "../styles/EcommerceOrders.css";

const initialOrders = [
  {
    id: "#790841",
    customer: "Claire Warren",
    date: "12.09.20",
    total: "$145.85",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: "#790842",
    customer: "Theresa Robertson",
    date: "12.09.20",
    total: "$225.15",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: "#790843",
    customer: "Nathan Hawkins",
    date: "12.09.20",
    total: "$45.55",
    payment: "PayPal",
    status: "Shipped",
  },
  {
    id: "#790844",
    customer: "Lily Williamson",
    date: "12.09.20",
    total: "$305.25",
    payment: "Credit Card",
    status: "Processing",
  },
  {
    id: "#790845",
    customer: "Brooklyn Steward",
    date: "12.09.20",
    total: "$483.80",
    payment: "Credit Card",
    status: "Shipped",
  },
  {
    id: "#790846",
    customer: "Norma Flores",
    date: "12.09.20",
    total: "$128.79",
    payment: "Payoneer",
    status: "Processing",
  },
  {
    id: "#790847",
    customer: "Leslie Mckinney",
    date: "12.09.20",
    total: "$105.05",
    payment: "Credit Card",
    status: "Cancelled",
  },
  {
    id: "#790848",
    customer: "Gregory Black",
    date: "12.09.20",
    total: "$1028.15",
    payment: "PayPal",
    status: "Shipped",
  },
];

const products = [
  {
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    price: "$2.500",
    quantity: 1,
    total: "$2.500",
  },
  {
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    price: "$1.500",
    quantity: 2,
    total: "$3.000",
  },
  {
    name: "Apple iPhone 11 Pro Max 256GB Space Gray",
    price: "$1.100",
    quantity: 1,
    total: "$1.100",
  },
];

function EcommerceOrders() {
  const [orders] = useState(initialOrders);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [exportOpen, setExportOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailTab, setDetailTab] = useState("ORDER DETAILS");

  const [detailExportOpen, setDetailExportOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("Credit Card");

  const [shippingMethod, setShippingMethod] =
    useState("Carrier");

  const [fulfilmentStatus, setFulfilmentStatus] =
    useState("Delivered");

  const [paymentStatus, setPaymentStatus] =
    useState("Paid");

  const [billingOpen, setBillingOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  const tabs = ["All", "Pending", "Processing", "Refunded"];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.payment
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesTab = true;

      if (activeTab === "Pending") {
        matchesTab = order.status === "Pending";
      }

      if (activeTab === "Processing") {
        matchesTab = order.status === "Processing";
      }

      if (activeTab === "Refunded") {
        matchesTab = order.status === "Refunded";
      }

      return matchesSearch && matchesTab;
    });
  }, [orders, search, activeTab]);

  const toggleOrder = (id) => {
    setSelectedOrders((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAll = () => {
    if (
      selectedOrders.length === filteredOrders.length &&
      filteredOrders.length > 0
    ) {
      setSelectedOrders([]);
      return;
    }

    setSelectedOrders(filteredOrders.map((order) => order.id));
  };

  const openOrder = (order) => {
    setSelectedOrder(order);
    setDetailTab("ORDER DETAILS");
    setDetailExportOpen(false);
  };

  const closeOrder = () => {
    setSelectedOrder(null);
    setDetailExportOpen(false);
  };

  const handleExport = (type) => {
    alert(`${type} export selected`);
    setExportOpen(false);
    setDetailExportOpen(false);
  };

  const handleAction = (action) => {
    if (!selectedOrders.length) {
      alert("Please select at least one order");
      setActionsOpen(false);
      return;
    }

    alert(
      `${action}: ${selectedOrders.length} order(s) selected`
    );

    setActionsOpen(false);
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Orders</h1>

        <div className="orders-export-wrapper">
          <button
            type="button"
            className="orders-export-button"
            onClick={() => setExportOpen((prev) => !prev)}
          >
            <FaDownload />
            Export
            <FaChevronDown />
          </button>

          {exportOpen && (
            <div className="orders-export-menu">
              <button onClick={() => handleExport("Print")}>
                <FaPrint />
                Print
              </button>

              <button onClick={() => handleExport("Excel")}>
                <FaFileExcel />
                Excel
              </button>

              <button onClick={() => handleExport("PDF")}>
                <FaFilePdf />
                PDF
              </button>

              <button onClick={() => handleExport("CSV")}>
                <FaFileCsv />
                CSV
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="orders-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            {tab}

            <span>
              {tab === "All" && "983"}
              {tab === "Pending" && "128"}
              {tab === "Processing" && "15"}
              {tab === "Refunded" && "8"}
            </span>
          </button>
        ))}
      </div>

      <section className="orders-table-card">
        <div className="orders-toolbar">
          <div className="orders-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search order..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <FaSlidersH />
          </div>

          <div className="orders-actions-wrapper">
            <button
              type="button"
              className="orders-actions-button"
              onClick={() =>
                setActionsOpen((previous) => !previous)
              }
            >
              Actions
              <FaChevronDown />
            </button>

            {actionsOpen && (
              <div className="orders-actions-menu">
                <button
                  onClick={() =>
                    handleAction("Mark as processing")
                  }
                >
                  Mark as processing
                </button>

                <button
                  onClick={() =>
                    handleAction("Mark as shipped")
                  }
                >
                  Mark as shipped
                </button>

                <button
                  onClick={() =>
                    handleAction("Refund orders")
                  }
                >
                  Refund
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrders.length ===
                        filteredOrders.length
                    }
                    onChange={toggleAll}
                  />
                </th>

                <th>ORDER NO.⌄</th>
                <th>CUSTOMER⌄</th>
                <th>DATE⌄</th>
                <th>TOTAL⌄</th>
                <th>PAYMENT⌄</th>
                <th>STATUS⌄</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrder(order.id)}
                    />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="order-number-button"
                      onClick={() => openOrder(order)}
                    >
                      {order.id}
                    </button>
                  </td>

                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.payment}</td>

                  <td>
                    <span
                      className={`order-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="order-more-button"
                      onClick={() => openOrder(order)}
                    >
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}

              {!filteredOrders.length && (
                <tr>
                  <td
                    colSpan="8"
                    className="orders-empty"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="orders-pagination">
          <div className="orders-pagination-left">
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            <span>Showing 1 - 10 of 100</span>
          </div>

          <div className="orders-pagination-buttons">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
            >
              <FaAngleDoubleLeft />
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <FaChevronLeft />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page ? "active" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <span>...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(5)}
              className={currentPage === 5 ? "active" : ""}
            >
              5
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(5, page + 1)
                )
              }
            >
              <FaChevronRight />
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(5)}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </section>

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onMouseDown={closeOrder}
        >
          <div
            className={`order-detail-modal ${
              detailTab === "INVOICE"
                ? "invoice-modal"
                : ""
            }`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="order-modal-close"
              onClick={closeOrder}
            >
              <FaTimes />
            </button>

            <div className="order-detail-tabs">
              {[
                "ORDER DETAILS",
                "PRODUCTS",
                "INVOICE",
              ].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={
                    detailTab === tab ? "active" : ""
                  }
                  onClick={() => {
                    setDetailTab(tab);
                    setDetailExportOpen(false);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {detailTab === "ORDER DETAILS" && (
              <div className="order-details-content">
                <div className="order-detail-title-row">
                  <h2>
                    Orders{" "}
                    <span>{selectedOrder.id}</span>
                  </h2>

                  <div className="detail-export-wrapper">
                    <button
                      type="button"
                      className="detail-export-button"
                      onClick={() =>
                        setDetailExportOpen(
                          (previous) => !previous
                        )
                      }
                    >
                      <FaDownload />
                      Export
                      <FaChevronDown />
                    </button>

                    {detailExportOpen && (
                      <div className="detail-export-menu">
                        <button
                          onClick={() =>
                            handleExport("Print")
                          }
                        >
                          <FaPrint />
                          Print
                        </button>

                        <button
                          onClick={() =>
                            handleExport("Excel")
                          }
                        >
                          <FaFileExcel />
                          Excel
                        </button>

                        <button
                          onClick={() =>
                            handleExport("PDF")
                          }
                        >
                          <FaFilePdf />
                          PDF
                        </button>

                        <button
                          onClick={() =>
                            handleExport("CSV")
                          }
                        >
                          <FaFileCsv />
                          CSV
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <section className="order-customer-section">
                  <h3>Customer</h3>

                  <div className="order-customer-headings">
                    <span>NAME</span>
                    <span>EMAIL</span>
                    <span>PHONE</span>
                    <span>LOCATION</span>
                  </div>

                  <div className="order-customer-data">
                    <div className="order-customer-name">
                      <div className="customer-avatar">
                        R
                      </div>

                      <span>Regina Cooper</span>
                    </div>

                    <span>example@mail.com</span>
                    <span>+1(070) 4567-8800</span>
                    <span>993 E. Brewer St.</span>
                  </div>
                </section>

                <div className="order-method-grid">
                  <section>
                    <h3>Payment method</h3>

                    <select
                      value={paymentMethod}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    >
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Payoneer</option>
                    </select>

                    <p>
                      Transaction ID: 000001-TXHQ
                    </p>

                    <p>Amount: $2.500</p>
                  </section>

                  <section>
                    <h3>Shipping method</h3>

                    <select
                      value={shippingMethod}
                      onChange={(event) =>
                        setShippingMethod(event.target.value)
                      }
                    >
                      <option>Carrier</option>
                      <option>Express</option>
                      <option>Standard</option>
                    </select>

                    <p>
                      Tracking Code: FX-012345-6
                    </p>

                    <p>Date: 12.09.2019</p>
                  </section>

                  <section className="order-status-controls">
                    <label>
                      <span>Fulfilment status</span>

                      <select
                        value={fulfilmentStatus}
                        onChange={(event) =>
                          setFulfilmentStatus(
                            event.target.value
                          )
                        }
                      >
                        <option>Delivered</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                      </select>
                    </label>

                    <label>
                      <span>Payment status</span>

                      <select
                        value={paymentStatus}
                        onChange={(event) =>
                          setPaymentStatus(
                            event.target.value
                          )
                        }
                      >
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Refunded</option>
                      </select>
                    </label>
                  </section>
                </div>

                <section className="order-address-box">
                  <button
                    type="button"
                    className="address-heading"
                    onClick={() =>
                      setBillingOpen(
                        (previous) => !previous
                      )
                    }
                  >
                    <span>Billing address</span>

                    {billingOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {billingOpen && (
                    <div className="address-details-grid">
                      <div>
                        <p>First name: Regina</p>
                        <p>Last name: Cooper</p>
                        <p>
                          Address: 993 E. Brewer St.
                          Holtsville
                        </p>
                      </div>

                      <div>
                        <p>State/Region: New York</p>
                        <p>City: New York</p>
                        <p>Country: United States</p>
                      </div>

                      <div>
                        <p>Phone: +1(070) 4567-8800</p>
                        <p>Email: example@mail.com</p>
                        <p>Postcode: 11742</p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="order-address-box">
                  <button
                    type="button"
                    className="address-heading"
                    onClick={() =>
                      setShippingOpen(
                        (previous) => !previous
                      )
                    }
                  >
                    <span>Shipping address</span>

                    {shippingOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {shippingOpen && (
                    <div className="address-details-grid">
                      <div>
                        <p>First name: Regina</p>
                        <p>Last name: Cooper</p>
                        <p>
                          Address: 993 E. Brewer St.
                          Holtsville
                        </p>
                      </div>

                      <div>
                        <p>State/Region: New York</p>
                        <p>City: New York</p>
                        <p>Country: United States</p>
                      </div>

                      <div>
                        <p>Phone: +1(070) 4567-8800</p>
                        <p>Email: example@mail.com</p>
                        <p>Postcode: 11742</p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            )}

            {detailTab === "PRODUCTS" && (
              <div className="order-products-content">
                <div className="order-detail-title-row">
                  <h2>Products</h2>

                  <button
                    type="button"
                    className="detail-export-button"
                    onClick={() =>
                      handleExport("Products")
                    }
                  >
                    <FaDownload />
                    Export
                    <FaChevronDown />
                  </button>
                </div>

                <table className="order-products-table">
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
                        <td>{product.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {detailTab === "INVOICE" && (
              <div className="invoice-content">
                <div className="order-detail-title-row">
                  <h2>Invoice</h2>

                  <button
                    type="button"
                    className="detail-export-button"
                    onClick={() =>
                      handleExport("Invoice")
                    }
                  >
                    <FaDownload />
                    Export
                    <FaChevronDown />
                  </button>
                </div>

                <div className="invoice-company-row">
                  <div className="invoice-number-card">
                    <strong>INVOICE</strong>
                    <span>{selectedOrder.id}</span>
                  </div>

                  <div className="invoice-company-info">
                    <strong>ROCKET INC.</strong>
                    <p>
                      Russell st. 50, Boston, MA, USA,
                      02199
                    </p>
                    <p>+1 (070) 123-4567</p>
                    <p>info@rocket.com</p>
                    <p>www.rocketboard.com</p>
                  </div>

                  <div className="invoice-brand">
                    <span>September 12, 2019</span>

                    <strong>🌼 FLOWER</strong>
                  </div>
                </div>

                <table className="invoice-table">
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
                        <td>{product.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="invoice-summary">
                  <div>
                    <span>SUBTOTAL</span>
                    <strong>$6.600</strong>
                  </div>

                  <div>
                    <span>TAX (20%)</span>
                    <strong>$7.920</strong>
                  </div>

                  <div>
                    <span>DISCOUNT</span>
                    <strong>-$792</strong>
                  </div>

                  <div className="invoice-total">
                    <span>TOTAL</span>
                    <strong>$7.128</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EcommerceOrders;