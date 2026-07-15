import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaSearch,
  FaExpand,
  FaCompress,
  FaComments,
  FaBell,
  FaChevronDown,
  FaLock,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaUsers,
} from "react-icons/fa";

import "./Header.css";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullScreen(true);
      } else {
        await document.exitFullscreen();
        setFullScreen(false);
      }
    } catch (error) {
      console.log("Fullscreen not supported", error);
    }
  };

  const goToSocial = () => {
    setProfileOpen(false);
    navigate("/dashboard-social");
  };

  return (
    <>
      <header className="figma-header">
        <div className="header-left">
          <button
            type="button"
            className="header-icon-button mobile-menu-button"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div
            className={`header-search ${
              searchOpen ? "search-open" : ""
            }`}
          >
            <FaSearch />

            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon-button"
            onClick={toggleFullScreen}
            aria-label="Fullscreen"
          >
            {fullScreen ? <FaCompress /> : <FaExpand />}
          </button>

          <button
            type="button"
            className="header-icon-button"
            onClick={() => setChatOpen(true)}
            aria-label="Chat"
          >
            <FaComments />
          </button>

          <div
            className="header-dropdown-wrapper"
            ref={notificationRef}
          >
            <button
              type="button"
              className="header-icon-button notification-button"
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
            >
              <FaBell />
              <span className="notification-dot" />
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="dropdown-heading">
                  <h3>Notifications</h3>
                  <span>3 New</span>
                </div>

                <div className="notification-item">
                  <div className="notification-avatar">RR</div>

                  <div>
                    <strong>Ronald Robertson</strong>
                    <p>Added a new project update.</p>
                    <small>2 min ago</small>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-avatar">AC</div>

                  <div>
                    <strong>Anna Cooper</strong>
                    <p>Sent you a new message.</p>
                    <small>15 min ago</small>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-avatar">JD</div>

                  <div>
                    <strong>John Doe</strong>
                    <p>Completed a task.</p>
                    <small>1 hour ago</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="view-all-button"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>

          <div
            className="header-profile-wrapper"
            ref={profileRef}
          >
            <button
              type="button"
              className="header-profile"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotificationOpen(false);
              }}
            >
              <img
                src="/profile.png"
                alt="Ronald Robertson"
              />

              <div className="header-profile-text">
                <strong>Ronald Robertson</strong>
                <span>Administrator</span>
              </div>

              <FaChevronDown className="profile-arrow" />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <button type="button">
                  <FaUser />
                  My Profile
                </button>

                {/* SOCIAL */}

                <button
                  type="button"
                  onClick={goToSocial}
                >
                  <FaUsers />
                  Social
                </button>

                <button type="button">
                  <FaCog />
                  Settings
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/unlock")}
                >
                  <FaLock />
                  Lock Screen
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {chatOpen && (
        <>
          <div
            className="chat-overlay"
            onClick={() => setChatOpen(false)}
          />

          <aside className="header-chat-panel">
            <div className="chat-panel-heading">
              <h3>Messages</h3>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="chat-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search messages..."
              />
            </div>

            <div className="chat-user">
              <div className="chat-avatar">AC</div>

              <div>
                <strong>Anna Cooper</strong>
                <p>Hey! How are you?</p>
              </div>

              <small>10:32</small>
            </div>

            <div className="chat-user">
              <div className="chat-avatar">JD</div>

              <div>
                <strong>John Doe</strong>
                <p>Project files are ready.</p>
              </div>

              <small>09:15</small>
            </div>

            <div className="chat-user">
              <div className="chat-avatar">SR</div>

              <div>
                <strong>Sarah Rose</strong>
                <p>Thank you!</p>
              </div>

              <small>Yesterday</small>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default Header;
