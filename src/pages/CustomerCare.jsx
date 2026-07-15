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
  FaPlus,
  FaTimes,
  FaCheck,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaClipboardCheck,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "../styles/CustomerCare.css";

const customerNames = [
  "Regina Cooper",
  "Claire Warren",
  "Theresa Robertson",
  "Nathan Hawkins",
  "Lily Williamson",
  "Brooklyn Steward",
  "Norma Flores",
  "Leslie Mckinney",
  "Gregory Black",
  "Judith Hawkins",
];

const initialCustomers = Array.from(
  { length: 100 },
  (_, index) => {
    const name =
      customerNames[index % customerNames.length];

    const [firstName, ...lastParts] = name.split(" ");

    return {
      id: index + 1,
      firstName,
      lastName: lastParts.join(" "),
      name,
      email: `customer${index + 1}@mail.com`,
      phone: `+1 (070) 4567-${String(
        8800 + index
      ).slice(-4)}`,
      company: "Rocket Inc.",
      address: "993 E. Brewer St.",
      apartment: "",
      city: "New York",
      country: "United States",
      state: "New York",
      postcode: "11742",
      location: "New York, USA",
      orders: (index % 12) + 1,
      spent: 250 + index * 18.5,
      type:
        index % 5 === 0
          ? "Abandoned"
          : index % 3 === 0
          ? "Returning"
          : "New",
      cardName: name,
      cardNumber: "4582 1458 4582 1458",
      expiry: "12/29",
      cvv: "123",
    };
  }
);

const steps = [
  {
    name: "Profile",
    icon: <FaUser />,
  },
  {
    name: "Address",
    icon: <FaMapMarkerAlt />,
  },
  {
    name: "Payment",
    icon: <FaCreditCard />,
  },
  {
    name: "Submission",
    icon: <FaClipboardCheck />,
  },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  apartment: "",
  city: "",
  country: "United States",
  state: "New York",
  postcode: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function CustomerCare() {
  const [customers, setCustomers] =
    useState(initialCustomers);

  const [activeTab, setActiveTab] =
    useState("All");

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState([]);

  const [actionsOpen, setActionsOpen] =
    useState(false);

  const [rowMenuId, setRowMenuId] = useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [modalMode, setModalMode] =
    useState("add");

  const [editingId, setEditingId] =
    useState(null);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [form, setForm] = useState(emptyForm);

  const [errors, setErrors] = useState({});

  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesTab =
        activeTab === "All" ||
        customer.type === activeTab;

      const matchesSearch =
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.phone.toLowerCase().includes(value) ||
        customer.location.toLowerCase().includes(value);

      return matchesTab && matchesSearch;
    });
  }, [customers, activeTab, search]);

  const tabCounts = {
    All: customers.length,
    New: customers.filter(
      (customer) => customer.type === "New"
    ).length,
    Returning: customers.filter(
      (customer) => customer.type === "Returning"
    ).length,
    Abandoned: customers.filter(
      (customer) => customer.type === "Abandoned"
    ).length,
  };

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCustomers.length / rowsPerPage
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safePage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const visibleCustomers =
    filteredCustomers.slice(startIndex, endIndex);

  const visibleIds = visibleCustomers.map(
    (customer) => customer.id
  );

  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) =>
      selected.includes(id)
    );

  const handleChange = (event) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiry") {
      const digits = value
        .replace(/\D/g, "")
        .slice(0, 4);

      formattedValue =
        digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    }

    if (name === "cvv") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    setForm((previous) => ({
      ...previous,
      [name]: formattedValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const toggleCustomer = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected((previous) =>
        previous.filter(
          (id) => !visibleIds.includes(id)
        )
      );

      return;
    }

    setSelected((previous) => [
      ...new Set([...previous, ...visibleIds]),
    ]);
  };

  const changeCustomerType = (type) => {
    if (!selected.length) {
      alert("Please select at least one customer");
      setActionsOpen(false);
      return;
    }

    setCustomers((previous) =>
      previous.map((customer) =>
        selected.includes(customer.id)
          ? {
              ...customer,
              type,
            }
          : customer
      )
    );

    setSelected([]);
    setActionsOpen(false);
  };

  const deleteSelected = () => {
    if (!selected.length) {
      alert("Please select at least one customer");
      setActionsOpen(false);
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selected.length} selected customer(s)?`
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter(
        (customer) =>
          !selected.includes(customer.id)
      )
    );

    setSelected([]);
    setActionsOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setCurrentStep(0);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
    setRowMenuId(null);
  };

  const openViewModal = (customer) => {
    setModalMode("view");
    setEditingId(customer.id);
    setCurrentStep(3);
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address,
      apartment: customer.apartment,
      city: customer.city,
      country: customer.country,
      state: customer.state,
      postcode: customer.postcode,
      cardName: customer.cardName,
      cardNumber: customer.cardNumber,
      expiry: customer.expiry,
      cvv: customer.cvv,
    });
    setErrors({});
    setModalOpen(true);
    setRowMenuId(null);
  };

  const openEditModal = (customer) => {
    setModalMode("edit");
    setEditingId(customer.id);
    setCurrentStep(0);

    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address,
      apartment: customer.apartment,
      city: customer.city,
      country: customer.country,
      state: customer.state,
      postcode: customer.postcode,
      cardName: customer.cardName,
      cardNumber: customer.cardNumber,
      expiry: customer.expiry,
      cvv: customer.cvv,
    });

    setErrors({});
    setModalOpen(true);
    setRowMenuId(null);
  };

  const deleteCustomer = (id) => {
    const customer = customers.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Delete ${customer?.name || "this customer"}?`
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter(
        (customerItem) => customerItem.id !== id
      )
    );

    setSelected((previous) =>
      previous.filter((item) => item !== id)
    );

    setRowMenuId(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setEditingId(null);
    setCurrentStep(0);
    setErrors({});
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!form.firstName.trim()) {
        newErrors.firstName =
          "First name is required";
      }

      if (!form.lastName.trim()) {
        newErrors.lastName =
          "Last name is required";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (
        !/\S+@\S+\.\S+/.test(form.email)
      ) {
        newErrors.email = "Enter a valid email";
      }

      if (!form.phone.trim()) {
        newErrors.phone = "Phone is required";
      }
    }

    if (currentStep === 1) {
      if (!form.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!form.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!form.postcode.trim()) {
        newErrors.postcode =
          "Postcode is required";
      }
    }

    if (currentStep === 2) {
      if (!form.cardName.trim()) {
        newErrors.cardName =
          "Cardholder name is required";
      }

      if (
        form.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber =
          "Enter a valid 16 digit card number";
      }

      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        newErrors.expiry = "Use MM/YY format";
      }

      if (form.cvv.length < 3) {
        newErrors.cvv = "Enter a valid CVV";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep((previous) =>
      Math.min(steps.length - 1, previous + 1)
    );
  };

  const previousStep = () => {
    setCurrentStep((previous) =>
      Math.max(0, previous - 1)
    );
  };

  const buildCustomerData = (id, existing = {}) => ({
    ...existing,
    id,
    firstName: form.firstName,
    lastName: form.lastName,
    name: `${form.firstName} ${form.lastName}`,
    email: form.email,
    phone: form.phone,
    company: form.company,
    address: form.address,
    apartment: form.apartment,
    city: form.city,
    country: form.country,
    state: form.state,
    postcode: form.postcode,
    location: `${form.city}, ${form.country}`,
    cardName: form.cardName,
    cardNumber: form.cardNumber,
    expiry: form.expiry,
    cvv: form.cvv,
    orders: existing.orders ?? 0,
    spent: existing.spent ?? 0,
    type: existing.type ?? "New",
  });

  const saveCustomer = () => {
    if (modalMode === "edit") {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingId
            ? buildCustomerData(
                customer.id,
                customer
              )
            : customer
        )
      );
    } else {
      const newCustomer = buildCustomerData(
        Date.now()
      );

      setCustomers((previous) => [
        newCustomer,
        ...previous,
      ]);
    }

    setActiveTab("All");
    setSearch("");
    setCurrentPage(1);
    closeModal();
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (safePage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (safePage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safePage,
      "...",
      totalPages,
    ];
  };

  return (
    <div
      className="customers-page"
      onClick={() => {
        if (rowMenuId !== null) {
          setRowMenuId(null);
        }
      }}
    >
      <div className="customers-header">
        <h1>Customers</h1>

        <button
          type="button"
          className="add-customer-button"
          onClick={openAddModal}
        >
          <FaPlus />
        </button>
      </div>

      <div className="customers-tabs">
        {[
          "All",
          "New",
          "Returning",
          "Abandoned",
        ].map((tab) => (
          <button
            type="button"
            key={tab}
            className={
              activeTab === tab ? "active" : ""
            }
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
              setSelected([]);
            }}
          >
            {tab}
            <span>{tabCounts[tab]}</span>
          </button>
        ))}
      </div>

      <section className="customers-card">
        <div className="customers-toolbar">
          <div className="customers-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
            />

            <FaSlidersH />
          </div>

          <div className="customer-actions-wrapper">
            <button
              type="button"
              className="customer-actions-button"
              onClick={() =>
                setActionsOpen(
                  (previous) => !previous
                )
              }
            >
              Actions
              <FaChevronDown />
            </button>

            {actionsOpen && (
              <div className="customer-actions-menu">
                <button
                  onClick={() =>
                    changeCustomerType("New")
                  }
                >
                  Mark as New
                </button>

                <button
                  onClick={() =>
                    changeCustomerType("Returning")
                  }
                >
                  Mark as Returning
                </button>

                <button
                  onClick={() =>
                    changeCustomerType("Abandoned")
                  }
                >
                  Mark as Abandoned
                </button>

                <button onClick={deleteSelected}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                  />
                </th>

                <th>NAME⌄</th>
                <th>EMAIL⌄</th>
                <th>PHONE⌄</th>
                <th>LOCATION⌄</th>
                <th>ORDERS⌄</th>
                <th>SPENT⌄</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {visibleCustomers.map(
                (customer) => (
                  <tr key={customer.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(
                          customer.id
                        )}
                        onChange={() =>
                          toggleCustomer(customer.id)
                        }
                      />
                    </td>

                    <td>
                      <div className="customer-name-cell">
                        <div className="customer-list-avatar">
                          {customer.name.charAt(0)}
                        </div>

                        <span>{customer.name}</span>
                      </div>
                    </td>

                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.location}</td>
                    <td>{customer.orders}</td>

                    <td>
                      $
                      {customer.spent.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td
                      style={{
                        position: "relative",
                      }}
                    >
                      <button
                        type="button"
                        className="customer-more-button"
                        onClick={(event) => {
                          event.stopPropagation();

                          setRowMenuId((previous) =>
                            previous === customer.id
                              ? null
                              : customer.id
                          );
                        }}
                      >
                        <FaEllipsisV />
                      </button>

                      {rowMenuId === customer.id && (
                        <div
                          className="customer-actions-menu"
                          style={{
                            top: "42px",
                            right: "12px",
                          }}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              openViewModal(customer)
                            }
                          >
                            <FaEye />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(customer)
                            }
                          >
                            <FaEdit />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteCustomer(customer.id)
                            }
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              )}

              {!visibleCustomers.length && (
                <tr>
                  <td
                    colSpan="8"
                    className="customers-empty"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customers-pagination">
          <div className="customers-pagination-left">
            <select
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <span>
              Showing{" "}
              {filteredCustomers.length
                ? startIndex + 1
                : 0}{" "}
              -{" "}
              {Math.min(
                endIndex,
                filteredCustomers.length
              )}{" "}
              of {filteredCustomers.length}
            </span>
          </div>

          <div className="customers-pagination-buttons">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <FaAngleDoubleLeft />
            </button>

            <button
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((previous) =>
                  Math.max(1, previous - 1)
                )
              }
            >
              <FaChevronLeft />
            </button>

            {getPageNumbers().map(
              (page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="customer-pagination-dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={
                      safePage === page
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>
                )
            )}

            <button
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((previous) =>
                  Math.min(
                    totalPages,
                    previous + 1
                  )
                )
              }
            >
              <FaChevronRight />
            </button>

            <button
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage(totalPages)
              }
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="customer-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="customer-modal">
            <button
              type="button"
              className="customer-modal-close"
              onClick={closeModal}
            >
              <FaTimes />
            </button>

            {modalMode !== "view" && (
              <div className="customer-stepper">
                {steps.map((step, index) => (
                  <div
                    key={step.name}
                    className={`customer-step ${
                      index === currentStep
                        ? "active"
                        : ""
                    } ${
                      index < currentStep
                        ? "completed"
                        : ""
                    }`}
                  >
                    <div className="customer-step-icon">
                      {index < currentStep ? (
                        <FaCheck />
                      ) : (
                        step.icon
                      )}
                    </div>

                    <span>{step.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="customer-modal-content">
              {modalMode === "view" ? (
                <>
                  <h2>Customer Details</h2>

                  <div className="customer-review">
                    <div>
                      <span>Customer</span>
                      <strong>
                        {form.firstName}{" "}
                        {form.lastName}
                      </strong>
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{form.email}</strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{form.phone}</strong>
                    </div>

                    <div>
                      <span>Company</span>
                      <strong>
                        {form.company || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Address</span>
                      <strong>
                        {form.address}, {form.city},{" "}
                        {form.country}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>
                      <strong>
                        Credit Card ending{" "}
                        {form.cardNumber
                          .replace(/\s/g, "")
                          .slice(-4)}
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {currentStep === 0 && (
                    <>
                      <h2>Profile</h2>

                      <div className="customer-form-grid">
                        <div>
                          <label>First Name</label>
                          <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                          />
                          {errors.firstName && (
                            <small>
                              {errors.firstName}
                            </small>
                          )}
                        </div>

                        <div>
                          <label>Last Name</label>
                          <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                          />
                          {errors.lastName && (
                            <small>
                              {errors.lastName}
                            </small>
                          )}
                        </div>

                        <div>
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <small>
                              {errors.email}
                            </small>
                          )}
                        </div>

                        <div>
                          <label>Phone</label>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <small>
                              {errors.phone}
                            </small>
                          )}
                        </div>

                        <div className="customer-full-field">
                          <label>Company</label>
                          <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <h2>Address</h2>

                      <div className="customer-form-grid">
                        <div className="customer-full-field">
                          <label>Address</label>
                          <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <small>
                              {errors.address}
                            </small>
                          )}
                        </div>

                        <div className="customer-full-field">
                          <label>
                            Apartment, suite, etc.
                          </label>
                          <input
                            name="apartment"
                            value={form.apartment}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label>City</label>
                          <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                          />
                          {errors.city && (
                            <small>
                              {errors.city}
                            </small>
                          )}
                        </div>

                        <div>
                          <label>Country</label>
                          <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                          >
                            <option>
                              United States
                            </option>
                            <option>India</option>
                            <option>Canada</option>
                            <option>
                              United Kingdom
                            </option>
                          </select>
                        </div>

                        <div>
                          <label>
                            State / Region
                          </label>
                          <input
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label>Postcode</label>
                          <input
                            name="postcode"
                            value={form.postcode}
                            onChange={handleChange}
                          />
                          {errors.postcode && (
                            <small>
                              {errors.postcode}
                            </small>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <h2>Payment</h2>

                      <div className="customer-payment-card">
                        <div className="payment-card-top">
                          <FaCreditCard />
                          <span>Credit Card</span>
                        </div>

                        <div className="customer-form-grid">
                          <div className="customer-full-field">
                            <label>
                              Name on Card
                            </label>
                            <input
                              name="cardName"
                              value={form.cardName}
                              onChange={handleChange}
                            />
                            {errors.cardName && (
                              <small>
                                {errors.cardName}
                              </small>
                            )}
                          </div>

                          <div className="customer-full-field">
                            <label>
                              Card Number
                            </label>
                            <input
                              name="cardNumber"
                              value={form.cardNumber}
                              onChange={handleChange}
                              placeholder="0000 0000 0000 0000"
                            />
                            {errors.cardNumber && (
                              <small>
                                {errors.cardNumber}
                              </small>
                            )}
                          </div>

                          <div>
                            <label>
                              Expiry Date
                            </label>
                            <input
                              name="expiry"
                              value={form.expiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                            />
                            {errors.expiry && (
                              <small>
                                {errors.expiry}
                              </small>
                            )}
                          </div>

                          <div>
                            <label>CVV</label>
                            <input
                              type="password"
                              name="cvv"
                              value={form.cvv}
                              onChange={handleChange}
                            />
                            {errors.cvv && (
                              <small>
                                {errors.cvv}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <h2>Submission</h2>

                      <div className="customer-submission">
                        <div className="submission-check">
                          <FaCheck />
                        </div>

                        <h3>
                          Customer is ready to be added
                        </h3>

                        <p>
                          Please review the customer
                          information before submitting.
                        </p>
                      </div>

                      <div className="customer-review">
                        <div>
                          <span>Customer</span>
                          <strong>
                            {form.firstName}{" "}
                            {form.lastName}
                          </strong>
                        </div>

                        <div>
                          <span>Email</span>
                          <strong>
                            {form.email}
                          </strong>
                        </div>

                        <div>
                          <span>Phone</span>
                          <strong>
                            {form.phone}
                          </strong>
                        </div>

                        <div>
                          <span>Address</span>
                          <strong>
                            {form.address},{" "}
                            {form.city},{" "}
                            {form.country}
                          </strong>
                        </div>

                        <div>
                          <span>Payment</span>
                          <strong>
                            Credit Card ending{" "}
                            {form.cardNumber
                              .replace(/\s/g, "")
                              .slice(-4)}
                          </strong>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="customer-modal-actions">
              {modalMode === "view" ? (
                <>
                  <button
                    type="button"
                    className="customer-cancel-button"
                    onClick={closeModal}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="customer-next-button"
                    onClick={() => {
                      const customer =
                        customers.find(
                          (item) =>
                            item.id === editingId
                        );

                      if (customer) {
                        openEditModal(customer);
                      }
                    }}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="customer-cancel-button"
                    onClick={
                      currentStep === 0
                        ? closeModal
                        : previousStep
                    }
                  >
                    {currentStep === 0
                      ? "Cancel"
                      : "Previous"}
                  </button>

                  {currentStep <
                  steps.length - 1 ? (
                    <button
                      type="button"
                      className="customer-next-button"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="customer-next-button"
                      onClick={saveCustomer}
                    >
                      {modalMode === "edit"
                        ? "Save Changes"
                        : "Add Customer"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCare;