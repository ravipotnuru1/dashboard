import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";

import "./Contacts.css";

const initialContacts = [
  {
    id: 1,
    name: "Ronald Robertson",
    job: "Product Designer",
    email: "ronald@example.com",
    phone: "+1 (070) 123-4567",
    location: "New York, NY",
    company: "ArtTemplate",
    favorite: true,
  },
  {
    id: 2,
    name: "Regina Cooper",
    job: "Project Manager",
    email: "regina@example.com",
    phone: "+1 (070) 456-8800",
    location: "California, CA",
    company: "Flower",
    favorite: false,
  },
  {
    id: 3,
    name: "Judith Black",
    job: "Business Analyst",
    email: "judith@example.com",
    phone: "+1 (070) 784-2290",
    location: "Chicago, IL",
    company: "Rocket",
    favorite: true,
  },
  {
    id: 4,
    name: "Dustin Williamson",
    job: "Web Developer",
    email: "dustin@example.com",
    phone: "+1 (070) 981-5543",
    location: "Austin, TX",
    company: "ArtTemplate",
    favorite: false,
  },
  {
    id: 5,
    name: "Calvin Flores",
    job: "Senior Vice President",
    email: "calvin@example.com",
    phone: "+1 (070) 345-1188",
    location: "Boston, MA",
    company: "Flower",
    favorite: false,
  },
  {
    id: 6,
    name: "Jane Wilson",
    job: "Creative Director",
    email: "jane@example.com",
    phone: "+1 (070) 123-6458",
    location: "New York, NY",
    company: "Rocket",
    favorite: true,
  },
];

function Contacts() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("flower-contacts");

    return savedContacts
      ? JSON.parse(savedContacts)
      : initialContacts;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const [form, setForm] = useState({
    name: "",
    job: "",
    email: "",
    phone: "",
    location: "",
    company: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "flower-contacts",
      JSON.stringify(contacts)
    );
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const value = search.toLowerCase();

      const matchesSearch =
        contact.name.toLowerCase().includes(value) ||
        contact.job.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.company.toLowerCase().includes(value);

      const matchesFilter =
        filter === "All" ||
        (filter === "Favorites" && contact.favorite) ||
        contact.company === filter;

      return matchesSearch && matchesFilter;
    });
  }, [contacts, search, filter]);

  const openAddContact = () => {
    setEditingContact(null);

    setForm({
      name: "",
      job: "",
      email: "",
      phone: "",
      location: "",
      company: "",
    });

    setShowModal(true);
  };

  const openEditContact = (contact) => {
    setEditingContact(contact);

    setForm({
      name: contact.name,
      job: contact.job,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      company: contact.company,
    });

    setMenuOpen(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const saveContact = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      alert("Please enter name, email and phone.");
      return;
    }

    if (editingContact) {
      setContacts((previous) =>
        previous.map((contact) =>
          contact.id === editingContact.id
            ? {
                ...contact,
                ...form,
              }
            : contact
        )
      );
    } else {
      setContacts((previous) => [
        {
          id: Date.now(),
          ...form,
          favorite: false,
        },
        ...previous,
      ]);
    }

    closeModal();
  };

  const deleteContact = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    setContacts((previous) =>
      previous.filter((contact) => contact.id !== id)
    );

    setMenuOpen(null);

    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const toggleFavorite = (id) => {
    setContacts((previous) =>
      previous.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              favorite: !contact.favorite,
            }
          : contact
      )
    );
  };

  const companies = [
    ...new Set(contacts.map((contact) => contact.company)),
  ].filter(Boolean);

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <div>
          <h1>Contacts</h1>
          <p>Manage your contacts and team members</p>
        </div>

        <button
          className="add-contact-button"
          onClick={openAddContact}
        >
          <FaPlus />
          Add Contact
        </button>
      </div>

      <div className="contacts-toolbar">
        <div className="contacts-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="contacts-filters">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={
              filter === "Favorites" ? "active" : ""
            }
            onClick={() => setFilter("Favorites")}
          >
            <FaStar />
            Favorites
          </button>

          {companies.map((company) => (
            <button
              key={company}
              className={
                filter === company ? "active" : ""
              }
              onClick={() => setFilter(company)}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      <div className="contacts-count">
        <span>CONTACTS</span>
        <strong>{filteredContacts.length}</strong>
      </div>

      {filteredContacts.length > 0 ? (
        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <div
              className="contact-card"
              key={contact.id}
            >
              <div className="contact-card-actions">
                <button
                  className={`contact-favorite ${
                    contact.favorite ? "active" : ""
                  }`}
                  onClick={() =>
                    toggleFavorite(contact.id)
                  }
                >
                  {contact.favorite ? (
                    <FaStar />
                  ) : (
                    <FaRegStar />
                  )}
                </button>

                <div className="contact-menu-wrapper">
                  <button
                    className="contact-more-button"
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === contact.id
                          ? null
                          : contact.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {menuOpen === contact.id && (
                    <div className="contact-dropdown">
                      <button
                        onClick={() =>
                          openEditContact(contact)
                        }
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        className="contact-delete-option"
                        onClick={() =>
                          deleteContact(contact.id)
                        }
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="contact-profile-button"
                onClick={() =>
                  setSelectedContact(contact)
                }
              >
                <div className="contact-avatar">
                  {contact.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .slice(0, 2)
                    .join("")}
                </div>

                <h3>{contact.name}</h3>
                <p>{contact.job}</p>
              </button>

              <div className="contact-card-details">
                <div>
                  <FaEnvelope />
                  <span>{contact.email}</span>
                </div>

                <div>
                  <FaPhone />
                  <span>{contact.phone}</span>
                </div>

                <div>
                  <FaMapMarkerAlt />
                  <span>{contact.location}</span>
                </div>
              </div>

              <div className="contact-card-footer">
                <span>{contact.company}</span>

                <button
                  onClick={() =>
                    setSelectedContact(contact)
                  }
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="contacts-empty">
          <div>👥</div>
          <h3>No contacts found</h3>

          <p>
            Add a new contact or change your search.
          </p>

          <button onClick={openAddContact}>
            <FaPlus />
            Add Contact
          </button>
        </div>
      )}

      {selectedContact && (
        <div
          className="contact-details-overlay"
          onMouseDown={() => setSelectedContact(null)}
        >
          <aside
            className="contact-details-panel"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="contact-panel-close"
              onClick={() => setSelectedContact(null)}
            >
              <FaTimes />
            </button>

            <div className="contact-panel-profile">
              <div className="contact-large-avatar">
                {selectedContact.name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .slice(0, 2)
                  .join("")}
              </div>

              <h2>{selectedContact.name}</h2>
              <p>{selectedContact.job}</p>

              <button
                className={`panel-favorite ${
                  selectedContact.favorite
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  toggleFavorite(selectedContact.id);

                  setSelectedContact({
                    ...selectedContact,
                    favorite:
                      !selectedContact.favorite,
                  });
                }}
              >
                {selectedContact.favorite ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )}

                {selectedContact.favorite
                  ? "Favorite"
                  : "Add to Favorites"}
              </button>
            </div>

            <div className="contact-panel-info">
              <span>CONTACT INFORMATION</span>

              <div>
                <FaEnvelope />

                <section>
                  <small>EMAIL</small>
                  <p>{selectedContact.email}</p>
                </section>
              </div>

              <div>
                <FaPhone />

                <section>
                  <small>PHONE</small>
                  <p>{selectedContact.phone}</p>
                </section>
              </div>

              <div>
                <FaMapMarkerAlt />

                <section>
                  <small>LOCATION</small>
                  <p>{selectedContact.location}</p>
                </section>
              </div>

              <div className="contact-company-info">
                <section>
                  <small>COMPANY</small>
                  <p>{selectedContact.company}</p>
                </section>
              </div>
            </div>

            <div className="contact-panel-actions">
              <button
                onClick={() => {
                  setSelectedContact(null);
                  openEditContact(selectedContact);
                }}
              >
                <FaEdit />
                Edit Contact
              </button>

              <button
                className="panel-delete-button"
                onClick={() =>
                  deleteContact(selectedContact.id)
                }
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </aside>
        </div>
      )}

      {showModal && (
        <div
          className="contact-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="contact-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="contact-modal-header">
              <h2>
                {editingContact
                  ? "Edit Contact"
                  : "Add Contact"}
              </h2>

              <button onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={saveContact}>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Ronald Robertson"
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
              />

              <label>Job Title</label>

              <input
                type="text"
                placeholder="Product Designer"
                value={form.job}
                onChange={(event) =>
                  setForm({
                    ...form,
                    job: event.target.value,
                  })
                }
              />

              <label>Email</label>

              <input
                type="email"
                placeholder="example@mail.com"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
              />

              <label>Phone</label>

              <input
                type="text"
                placeholder="+1 (070) 123-4567"
                value={form.phone}
                onChange={(event) =>
                  setForm({
                    ...form,
                    phone: event.target.value,
                  })
                }
              />

              <label>Location</label>

              <input
                type="text"
                placeholder="New York, NY"
                value={form.location}
                onChange={(event) =>
                  setForm({
                    ...form,
                    location: event.target.value,
                  })
                }
              />

              <label>Company</label>

              <input
                type="text"
                placeholder="ArtTemplate"
                value={form.company}
                onChange={(event) =>
                  setForm({
                    ...form,
                    company: event.target.value,
                  })
                }
              />

              <div className="contact-modal-actions">
                <button
                  type="button"
                  className="contact-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="contact-save-button"
                >
                  {editingContact
                    ? "Save Changes"
                    : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;