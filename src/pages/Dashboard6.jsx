import { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaPlus,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";

import "../styles/Dashboard6.css";

const initialContacts = [
  ["Ronald Robertson", "Product Designer"],
  ["Regina Cooper", "Project Manager"],
  ["Judith Black", "Business Analyst"],
  ["Dustin Williamson", "Web Developer"],
  ["Calvin Flores", "Senior Vice President"],
  ["Robert Edwards", "Business Analyst"],
];

const transactions = [
  ["Devon Williamson", "08:00 AM — 19 August", "+$1.400", "Payment"],
  ["Debra Wilson", "09:45 AM — 19 August", "-$850", "Refund"],
  ["Judith Black", "10:15 AM — 20 August", "+$2.050", "Payment"],
  ["Philip Henry", "10:50 AM — 23 August", "+$650", "Payment"],
  ["Mitchell Cooper", "12:45 AM — 25 August", "+$900", "Payment"],
];

const payments = [
  ["Shopping", "08:00 AM — 19 August", "-$1.400", "🛍"],
  ["Travel", "09:45 AM — 21 August", "-$850", "▥"],
  ["Food", "10:15 AM — 24 August", "-$2.150", "🛒"],
  ["Medicine", "10:50 AM — 24 August", "-$650", "♡"],
  ["Sport", "12:45 AM — 28 August", "+$900", "↔"],
];

function Dashboard6() {
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [addContactOpen, setAddContactOpen] = useState(false);

  const [cards, setCards] = useState([
    {
      number: "•••• •••• •••• 8854",
      holder: "Felecia Brown",
      month: "12",
      year: "19",
    },
  ]);

  const [contacts, setContacts] = useState(initialContacts);

  const [cardForm, setCardForm] = useState({
    number: "5890 - 6858 - 6332 - 9843",
    holder: "Regina Cooper",
    month: "12",
    year: "2023",
  });

  const [contactForm, setContactForm] = useState({
    firstName: "Regina",
    lastName: "Cooper",
    email: "regina_cooper@mail.com",
    phone: "(070) 4567-8800",
    job: "Project Manager",
  });

  const addCard = (event) => {
    event.preventDefault();

    setCards((previous) => [
      ...previous,
      {
        number: cardForm.number,
        holder: cardForm.holder,
        month: cardForm.month,
        year: cardForm.year,
      },
    ]);

    setAddCardOpen(false);
  };

  const addContact = (event) => {
    event.preventDefault();

    setContacts((previous) => [
      ...previous,
      [
        `${contactForm.firstName} ${contactForm.lastName}`,
        contactForm.job,
      ],
    ]);

    setAddContactOpen(false);
  };

  return (
    <div className="dashboard6">
      <div className="dashboard6-layout">
        <main className="dashboard6-main">
          <div className="dashboard6-money-row">
            <div className="dashboard6-money-card">
              <div className="dashboard6-arrow income">
                <FaArrowUp />
              </div>

              <div>
                <span>Income</span>
                <h2>$5.750</h2>
              </div>

              <div className="dashboard6-progress income-progress">
                <i />
              </div>
            </div>

            <div className="dashboard6-money-card">
              <div className="dashboard6-arrow spent">
                <FaArrowDown />
              </div>

              <div>
                <span>Spent</span>
                <h2>$2.400</h2>
              </div>

              <div className="dashboard6-progress spent-progress">
                <i />
              </div>
            </div>
          </div>

          <section className="dashboard6-balance-card">
            <div className="dashboard6-section-header">
              <h3>Balance</h3>

              <button type="button">
                19 Aug — 25 Aug
                <FaChevronDown />
              </button>
            </div>

            <div className="dashboard6-balance-values">
              <div>
                <span className="dashboard6-balance-icon income">
                  <FaArrowUp />
                </span>

                <div>
                  <h2>24.500</h2>
                  <span>Income</span>
                </div>
              </div>

              <div>
                <span className="dashboard6-balance-icon spent">
                  <FaArrowDown />
                </span>

                <div>
                  <h2>9.400</h2>
                  <span>Spending</span>
                </div>
              </div>
            </div>

            <div className="dashboard6-chart">
              <div className="dashboard6-chart-labels">
                <span>10K</span>
                <span>5K</span>
                <span>2K</span>
                <span>1K</span>
                <span>0</span>
              </div>

              <div className="dashboard6-chart-content">
                <div className="dashboard6-grid-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <svg
                  viewBox="0 0 700 250"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="dashboard6Fill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#239744"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#239744"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    className="dashboard6-chart-fill"
                    d="M0 190 C60 190 75 110 145 105 C210 100 235 45 310 60 C385 75 420 145 490 150 C555 155 565 45 625 55 C660 60 680 95 700 100 L700 250 L0 250 Z"
                  />

                  <path
                    className="dashboard6-chart-line"
                    d="M0 190 C60 190 75 110 145 105 C210 100 235 45 310 60 C385 75 420 145 490 150 C555 155 565 45 625 55 C660 60 680 95 700 100"
                  />
                </svg>

                <div className="dashboard6-days">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </section>

          <div className="dashboard6-bottom">
            <section className="dashboard6-list-card">
              <div className="dashboard6-list-title">
                <h3>Transactions</h3>
                <FaEllipsisV />
              </div>

              {transactions.map((item) => (
                <div className="dashboard6-list-row" key={item[0]}>
                  <div className="dashboard6-avatar">
                    {item[0].charAt(0)}
                  </div>

                  <div className="dashboard6-row-info">
                    <strong>{item[0]}</strong>
                    <span>{item[1]}</span>
                  </div>

                  <div className="dashboard6-row-value">
                    <strong
                      className={
                        item[2].startsWith("+")
                          ? "dashboard6-positive"
                          : "dashboard6-negative"
                      }
                    >
                      {item[2]}
                    </strong>
                    <span>{item[3]}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="dashboard6-list-card">
              <div className="dashboard6-list-title">
                <h3>Payments</h3>
                <FaEllipsisV />
              </div>

              {payments.map((item) => (
                <div className="dashboard6-list-row" key={item[0]}>
                  <div className="dashboard6-payment-icon">
                    {item[3]}
                  </div>

                  <div className="dashboard6-row-info">
                    <strong>{item[0]}</strong>
                    <span>{item[1]}</span>
                  </div>

                  <strong className="dashboard6-payment-value">
                    {item[2]}
                  </strong>
                </div>
              ))}
            </section>
          </div>
        </main>

        <aside className="dashboard6-right">
          <section className="dashboard6-right-section">
            <div className="dashboard6-right-title">
              <h2>Cards</h2>

              <button
                type="button"
                onClick={() => setAddCardOpen(true)}
              >
                <FaPlus />
              </button>
            </div>

            {cards.map((card, index) => (
              <div
                className="dashboard6-bank-card"
                key={`${card.number}-${index}`}
              >
                <div className="dashboard6-bank-top">
                  <div>
                    <span>Current Balance</span>
                    <h2>80,700.00</h2>
                  </div>

                  <strong>VISA</strong>
                </div>

                <div className="dashboard6-bank-bottom">
                  <div>
                    <strong>{card.holder}</strong>
                    <span>{card.number}</span>
                  </div>

                  <span>
                    {card.month}/{String(card.year).slice(-2)}
                  </span>
                </div>
              </div>
            ))}

            <div className="dashboard6-dots">
              <i className="active" />
              <i />
              <i />
            </div>
          </section>

          <section className="dashboard6-right-section">
            <div className="dashboard6-right-title">
              <h2>Contacts</h2>

              <button
                type="button"
                onClick={() => setAddContactOpen(true)}
              >
                <FaPlus />
              </button>
            </div>

            {contacts.map((contact, index) => (
              <div
                className="dashboard6-contact-row"
                key={`${contact[0]}-${index}`}
              >
                <div className="dashboard6-avatar">
                  {contact[0].charAt(0)}
                </div>

                <div className="dashboard6-row-info">
                  <strong>{contact[0]}</strong>
                  <span>{contact[1]}</span>
                </div>

                <FaEllipsisV />
              </div>
            ))}
          </section>
        </aside>
      </div>

      {addCardOpen && (
        <div className="dashboard6-modal-overlay">
          <form className="dashboard6-modal" onSubmit={addCard}>
            <div className="dashboard6-modal-title">
              <h2>Add Card</h2>

              <button
                type="button"
                onClick={() => setAddCardOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <label>Card Number</label>
            <input
              value={cardForm.number}
              onChange={(event) =>
                setCardForm({
                  ...cardForm,
                  number: event.target.value,
                })
              }
              required
            />

            <label>Card Holder</label>
            <input
              value={cardForm.holder}
              onChange={(event) =>
                setCardForm({
                  ...cardForm,
                  holder: event.target.value,
                })
              }
              required
            />

            <div className="dashboard6-form-grid">
              <div>
                <label>Month</label>
                <input
                  value={cardForm.month}
                  onChange={(event) =>
                    setCardForm({
                      ...cardForm,
                      month: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Year</label>
                <input
                  value={cardForm.year}
                  onChange={(event) =>
                    setCardForm({
                      ...cardForm,
                      year: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <button className="dashboard6-submit" type="submit">
              Add Card
            </button>
          </form>
        </div>
      )}

      {addContactOpen && (
        <div className="dashboard6-modal-overlay">
          <form className="dashboard6-modal" onSubmit={addContact}>
            <div className="dashboard6-modal-title">
              <h2>Add Contact</h2>

              <button
                type="button"
                onClick={() => setAddContactOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="dashboard6-form-grid">
              <div>
                <label>First Name</label>
                <input
                  value={contactForm.firstName}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      firstName: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  value={contactForm.lastName}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      lastName: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <label>Email</label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(event) =>
                setContactForm({
                  ...contactForm,
                  email: event.target.value,
                })
              }
              required
            />

            <label>Phone</label>
            <input
              value={contactForm.phone}
              onChange={(event) =>
                setContactForm({
                  ...contactForm,
                  phone: event.target.value,
                })
              }
              required
            />

            <label>Job Title</label>
            <input
              value={contactForm.job}
              onChange={(event) =>
                setContactForm({
                  ...contactForm,
                  job: event.target.value,
                })
              }
              required
            />

            <button className="dashboard6-submit" type="submit">
              Add Contact
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard6;