import { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import "./DashboardModals.css";

function AddContactModal({
  isOpen,
  onClose,
  onAddContact,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Please fill all contact details");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid phone number");
      return;
    }

    onAddContact({
      id: Date.now(),
      name,
      email,
      phone,
    });

    setName("");
    setEmail("");
    setPhone("");
    setError("");

    onClose();
  };

  return (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-modal-header">
          <h2>Add Contact</h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <form
          className="dashboard-modal-form"
          onSubmit={handleSubmit}
        >
          <label>Name</label>

          <div className="modal-input-box">
            <FaUser />

            <input
              type="text"
              placeholder="Enter contact name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <label>Email</label>

          <div className="modal-input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <label>Phone Number</label>

          <div className="modal-input-box">
            <FaPhone />

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          {error && (
            <p className="dashboard-modal-error">
              {error}
            </p>
          )}

          <div className="dashboard-modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-submit-button"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;