import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Notification() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      name: "Dustin Williamson",
      text: "Sent you a message",
      time: "10 minutes ago",
    },
    {
      name: "Kathryn Murphy",
      text: "Commented on your post",
      time: "30 minutes ago",
    },
    {
      name: "Savannah Nguyen",
      text: "Liked your photo",
      time: "1 hour ago",
    },
    {
      name: "Darrell Steward",
      text: "Started following you",
      time: "2 hours ago",
    },
    {
      name: "Brooklyn Simmons",
      text: "Mentioned you in a comment",
      time: "3 hours ago",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "relative",
          cursor: "pointer",
          fontSize: "21px",
        }}
      >
        <FaBell />

        <span
          style={{
            position: "absolute",
            top: "-7px",
            right: "-8px",
            background: "#16a34a",
            color: "#fff",
            width: "17px",
            height: "17px",
            borderRadius: "50%",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          5
        </span>
      </div>

      <FaUserCircle
        onClick={() => navigate("/home-two")}
        style={{
          cursor: "pointer",
          fontSize: "24px",
        }}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            right: "35px",
            width: "330px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 18px",
              borderBottom: "1px solid #eee",
            }}
          >
            <h3 style={{ margin: 0 }}>
              Notifications
            </h3>

            <span
              style={{
                color: "#16a34a",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Mark all as read
            </span>
          </div>

          {notifications.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "12px",
                padding: "14px 18px",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#ef8b72",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontWeight: "bold",
                }}
              >
                {item.name.charAt(0)}
              </div>

              <div>
                <strong
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {item.name}
                </strong>

                <p
                  style={{
                    margin: "3px 0",
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  {item.text}
                </p>

                <small
                  style={{
                    color: "#999",
                  }}
                >
                  {item.time}
                </small>
              </div>
            </div>
          ))}

          <div
            style={{
              padding: "14px",
              textAlign: "center",
              color: "#16a34a",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View all notifications
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;