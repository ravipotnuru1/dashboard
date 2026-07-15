import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaChevronDown,
  FaEllipsisV,
} from "react-icons/fa";

import "../styles/Home.css";

const orders = [
  {
    name: "Regina Cooper",
    order: "#7090841",
    amount: "$2.500",
    payment: "Credit Card",
    date: "12.09.2019",
  },
  {
    name: "Robert Edwards",
    order: "#7090934",
    amount: "$1.500",
    payment: "PayPal",
    date: "12.09.2019",
  },
  {
    name: "Gloria McKinney",
    order: "#7090857",
    amount: "$5.600",
    payment: "Credit Card",
    date: "12.09.2018",
  },
  {
    name: "Randall Fisher",
    order: "#7090687",
    amount: "$2.850",
    payment: "PayPal",
    date: "12.09.2018",
  },
];

const transactions = [
  {
    name: "Devon Williamson",
    time: "08:00 AM — 19 August",
    amount: "+$1.400",
    type: "Payment",
  },
  {
    name: "Debra Wilson",
    time: "09:45 AM — 19 August",
    amount: "-$850",
    type: "Refund",
  },
  {
    name: "Judith Black",
    time: "10:15 AM — 20 August",
    amount: "+$2.050",
    type: "Payment",
  },
  {
    name: "Philip Henry",
    time: "10:50 AM — 23 August",
    amount: "+$650",
    type: "Payment",
  },
  {
    name: "Mitchell Cooper",
    time: "12:45 AM — 25 August",
    amount: "+$900",
    type: "Payment",
  },
];

function Home() {
  return (
    <div className="home-overview">
      {/* HEADER */}

      <div className="home-overview-header">
        <h1>Overview</h1>

        <div className="home-header-actions">
          <button className="home-download-btn">
            <FaDownload />
          </button>

          <button className="home-date-btn">
            Last 7 days
            <FaChevronDown />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="home-summary-grid">
        <div className="home-summary-card">
          <div>
            <span>Total Income</span>

            <div className="home-summary-value">
              <h2>$8.500</h2>
              <small className="home-positive">
                ↑ 50.8%
              </small>
            </div>
          </div>

          <div className="home-summary-icon">$</div>
        </div>

        <div className="home-summary-card">
          <div>
            <span>Total Sales</span>

            <div className="home-summary-value">
              <h2>3.500K</h2>
              <small className="home-negative">
                ↓ 10.5%
              </small>
            </div>
          </div>

          <div className="home-summary-icon">▥</div>
        </div>

        <div className="home-summary-card">
          <div>
            <span>New Clients</span>

            <div className="home-summary-value">
              <h2>2.500K</h2>
              <small className="home-positive">
                ↑ 24.9%
              </small>
            </div>
          </div>

          <div className="home-summary-icon">♟</div>
        </div>
      </div>

      {/* CHART ROW */}

      <div className="home-chart-grid">
        {/* STATISTICS */}

        <section className="home-panel">
          <div className="home-panel-header">
            <h3>Statistics</h3>

            <button>
              19 Aug - 25 Aug
              <FaChevronDown />
            </button>
          </div>

          <div className="home-bar-chart">
            {[78, 58, 90, 62, 88, 76, 48].map(
              (height, index) => (
                <div className="home-bar-item" key={index}>
                  <div className="home-bars">
                    <span
                      className="home-income-bar"
                      style={{ height: `${height}%` }}
                    />

                    <span
                      className="home-expense-bar"
                      style={{
                        height: `${Math.max(
                          height - 35,
                          20
                        )}%`,
                      }}
                    />
                  </div>

                  <small>
                    {
                      [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                      ][index]
                    }
                  </small>
                </div>
              )
            )}
          </div>

          <div className="home-chart-legend">
            <span>● Income</span>
            <span>● Expense</span>
          </div>
        </section>

        {/* ANALYTICS */}

        <section className="home-panel">
          <div className="home-panel-header">
            <h3>Analytics</h3>

            <button>
              19 Aug - 25 Aug
              <FaChevronDown />
            </button>
          </div>

          <div className="home-analytics-values">
            <span>
              <FaArrowUp /> $5.850
            </span>

            <span>
              <FaArrowDown /> $1.750
            </span>
          </div>

          <div className="home-line-chart">
            <svg viewBox="0 0 600 220">
              <polyline
                points="0,190 90,140 170,155 260,70 350,145 450,90 600,35"
                className="home-line-one"
              />

              <polyline
                points="0,175 90,160 170,110 260,135 350,70 450,120 600,145"
                className="home-line-two"
              />

              <circle cx="260" cy="70" r="5" />

              <circle cx="350" cy="70" r="5" />
            </svg>

            <div className="home-chart-days">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </section>
      </div>

      {/* SALES AND STATISTICS */}

      <div className="home-middle-grid">
        <section className="home-panel home-sales-panel">
          <div className="home-panel-header">
            <h3>Sales</h3>

            <FaEllipsisV />
          </div>

          <div className="home-sales-circle">
            <div className="home-sales-inner">
              <strong>3.500</strong>
              <span>Total</span>
            </div>
          </div>

          <div className="home-sales-info">
            <div>
              <span>● Current Week</span>
              <strong>2.500</strong>
              <small className="home-positive">
                ↑ 8.8%
              </small>
            </div>

            <div>
              <span>● Last Week</span>
              <strong>1.000</strong>
              <small className="home-negative">
                ↓ 5.8%
              </small>
            </div>
          </div>
        </section>

        <section className="home-panel">
          <div className="home-panel-header">
            <h3>Statistics</h3>

            <button>
              19 Aug - 25 Aug
              <FaChevronDown />
            </button>
          </div>

          <div className="home-horizontal-chart">
            {[60, 80, 95, 70, 100, 85, 55].map(
              (width, index) => (
                <div
                  className="home-horizontal-row"
                  key={index}
                >
                  <span>{25 - index}</span>

                  <div className="home-horizontal-bars">
                    <i
                      className="home-horizontal-income"
                      style={{ width: `${width}%` }}
                    />

                    <i
                      className="home-horizontal-expense"
                      style={{
                        width: `${Math.max(
                          width - 20,
                          30
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>

      {/* BOTTOM */}

      <div className="home-bottom-grid">
        {/* ORDERS */}

        <section className="home-panel">
          <div className="home-panel-header">
            <h3>Last Orders</h3>

            <button>
              19 Aug - 25 Aug
              <FaChevronDown />
            </button>
          </div>

          <div className="home-orders-table">
            <div className="home-order-head">
              <span>Customer Name</span>
              <span>Order No.</span>
              <span>Amount</span>
              <span>Payment Type</span>
              <span>Date</span>
            </div>

            {orders.map((order) => (
              <div
                className="home-order-row"
                key={order.order}
              >
                <div className="home-customer">
                  <img
                    src="/profile.png"
                    alt={order.name}
                  />

                  <strong>{order.name}</strong>
                </div>

                <span>{order.order}</span>
                <span>{order.amount}</span>
                <span>{order.payment}</span>
                <span>{order.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSACTIONS */}

        <section className="home-panel">
          <div className="home-panel-header">
            <h3>Transactions</h3>

            <FaEllipsisV />
          </div>

          <div className="home-transactions">
            {transactions.map((transaction) => (
              <div
                className="home-transaction-row"
                key={transaction.name}
              >
                <img
                  src="/profile.png"
                  alt={transaction.name}
                />

                <div className="home-transaction-info">
                  <strong>{transaction.name}</strong>
                  <span>{transaction.time}</span>
                </div>

                <div className="home-transaction-amount">
                  <strong
                    className={
                      transaction.amount.startsWith("+")
                        ? "home-positive"
                        : "home-negative"
                    }
                  >
                    {transaction.amount}
                  </strong>

                  <span>{transaction.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;