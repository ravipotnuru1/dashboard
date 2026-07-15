import { useState } from "react";
import {
  FaTimes,
  FaCreditCard,
} from "react-icons/fa";

import "./DashboardModals.css";

function AddCardModal({ isOpen, onClose, onAddCard }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !cardNumber ||
      !cardHolder ||
      !expiryDate ||
      !cvv
    ) {
      setError("Please fill all card details");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("Enter a valid card number");
      return;
    }

    if (cvv.length < 3) {
      setError("Enter a valid CVV");
      return;
    }

    onAddCard({
      id: Date.now(),
      cardNumber,
      cardHolder,
      expiryDate,
    });

    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
    setError("");

    onClose();
  };

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);

    return numbers
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-modal-header">
          <h2>Add New Card</h2>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-button"
          >
            <FaTimes />
          </button>
        </div>

        <form
          className="dashboard-modal-form"
          onSubmit={handleSubmit}
        >
          <label>Card Number</label>

          <div className="modal-input-box">
            <FaCreditCard />

            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  formatCardNumber(e.target.value)
                )
              }
            />
          </div>

          <label>Card Holder Name</label>

          <input
            type="text"
            className="modal-input"
            placeholder="Enter card holder name"
            value={cardHolder}
            onChange={(e) =>
              setCardHolder(e.target.value)
            }
          />

          <div className="modal-form-row">
            <div>
              <label>Expiry Date</label>

              <input
                type="month"
                className="modal-input"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(e.target.value)
                }
              />
            </div>

            <div>
              <label>CVV</label>

              <input
                type="password"
                className="modal-input"
                placeholder="***"
                maxLength="4"
                value={cvv}
                onChange={(e) =>
                  setCvv(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 4)
                  )
                }
              />
            </div>
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
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCardModal;