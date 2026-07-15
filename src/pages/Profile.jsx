import { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
} from "react-icons/fa";

import "./Profile.css";

const favorites = [
  ["Ronald Robertson", "Product Designer"],
  ["Regina Cooper", "Project Manager"],
  ["Judith Black", "Business Analyst"],
  ["Dustin Williamson", "Web Developer"],
  ["Calvin Flores", "Senior Vice President"],
];

const followers = [
  ["Devon Williamson", "Product Designer, Apple Inc"],
  ["Debra Wilson", "Project Manager, Facebook Inc"],
  ["Judith Black", "Business Analyst, Google Inc"],
  ["Philip Henry", "Web Developer, Google Inc"],
  ["Mitchell Cooper", "Senior Vice President, Amazon Inc"],
];

function Profile() {
  const [activeTab, setActiveTab] = useState("Settings");

  return (
    <div className="profile-page">
      <div className="profile-tabs">
        {["Settings", "Activity", "Users"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Settings" && <SettingsTab />}

      {activeTab === "Activity" && (
        <div className="profile-empty-tab">
          <h2>Activity</h2>
          <p>Your recent profile activity will appear here.</p>
        </div>
      )}

      {activeTab === "Users" && (
        <div className="profile-empty-tab">
          <h2>Users</h2>
          <p>User information will appear here.</p>
        </div>
      )}
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="profile-dashboard">
      <aside className="profile-sidebar">
        <img
          src="/profile.png"
          alt="Felecia Brown"
          className="profile-main-image"
        />

        <h3>Felecia Brown</h3>
        <span>Project Manager</span>

        <button className="profile-edit-button">
          Edit profile
        </button>

        <div className="profile-info">
          <h4>INFO</h4>

          <ProfileInfo label="EMAIL" value="example@gmail.com" />

          <ProfileInfo label="PHONE" value="+123-4567-8800" />

          <ProfileInfo label="BIRTHDAY" value="17 March, 1995" />

          <ProfileInfo label="LOCATION" value="New York, NY" />
        </div>

        <div className="profile-favorites">
          <h4>FAVORITES</h4>

          {favorites.map((person, index) => (
            <div
              className="profile-person"
              key={`${person[0]}-${index}`}
            >
              <div className="profile-avatar">
                {person[0].charAt(0)}
              </div>

              <div>
                <strong>{person[0]}</strong>
                <span>{person[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="profile-content">
        <h1>Overview</h1>

        <div className="profile-stat-grid">
          <StatCard
            title="Total Visitors"
            value="20.500"
            percentage="4.85%"
            positive
          />

          <StatCard
            title="Total Followers"
            value="21.800"
            percentage="5.25%"
          />

          <StatCard
            title="Total Likes"
            value="30.400"
            percentage="3.55%"
            positive
          />

          <StatCard
            title="Total Comments"
            value="14.800"
            percentage="10.30%"
          />
        </div>

        <div className="profile-middle-grid">
          <section className="profile-card visits-card">
            <div className="profile-card-title">
              <h3>Visits</h3>
              <span>19 Aug – 25 Aug⌄</span>
            </div>

            <div className="visit-summary">
              <VisitValue value="1.400" label="Min. Visits" />
              <VisitValue value="3.100" label="Avg. Visits" />
              <VisitValue value="9.500" label="Max. Visits" />
            </div>

            <div className="profile-line-chart">
              <div className="profile-chart-lines">
                <i />
                <i />
                <i />
                <i />
              </div>

              <svg
                viewBox="0 0 700 230"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="profileChartFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2a9c4b"
                      stopOpacity="0.22"
                    />

                    <stop
                      offset="100%"
                      stopColor="#2a9c4b"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  className="profile-chart-fill"
                  d="M0 140 L115 180 L230 115 L345 175 L460 135 L575 35 L700 140 L700 230 L0 230 Z"
                />

                <path
                  className="profile-chart-line"
                  d="M0 140 L115 180 L230 115 L345 175 L460 135 L575 35 L700 140"
                />

                {[0, 115, 230, 345, 460, 575, 700].map(
                  (x, index) => {
                    const y = [140, 180, 115, 175, 135, 35, 140][
                      index
                    ];

                    return (
                      <circle
                        key={x}
                        cx={x}
                        cy={y}
                        r="5"
                        className="profile-chart-dot"
                      />
                    );
                  }
                )}
              </svg>

              <div className="profile-chart-days">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  )
                )}
              </div>
            </div>
          </section>

          <section className="profile-card followers-card">
            <div className="profile-card-title">
              <h3>Followers</h3>
              <FaEllipsisV />
            </div>

            <div className="followers-circle">
              <div>
                <strong>21.800</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="followers-legend">
              <span>Facebook 3.5k</span>
              <span>Twitter 7.8k</span>
              <span>Instagram 5.8k</span>
              <span>YouTube 4.7k</span>
            </div>
          </section>
        </div>

        <div className="profile-bottom-grid">
          <section className="profile-card growth-card">
            <div className="profile-card-title">
              <h3>Followers Growth</h3>
              <span>19 Aug – 25 Aug⌄</span>
            </div>

            <div className="growth-values">
              <VisitValue value="21.800" label="Current Week" />
              <VisitValue value="19.400" label="Last Week" />
            </div>

            <div className="growth-chart">
              {[70, 35, 62, 42, 58, 85, 38].map(
                (height, index) => (
                  <div className="growth-column" key={index}>
                    <i style={{ height: `${height}%` }} />

                    <span>
                      {
                        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                          index
                        ]
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="profile-card new-followers-card">
            <div className="profile-card-title">
              <h3>New Followers</h3>
              <span>19 Aug – 25 Aug⌄</span>
            </div>

            {followers.map((person, index) => (
              <div
                className="new-follower-row"
                key={`${person[0]}-${index}`}
              >
                <div className="profile-avatar">
                  {person[0].charAt(0)}
                </div>

                <div>
                  <strong>{person[0]}</strong>
                  <span>{person[1]}</span>
                </div>

                <button type="button">Follow</button>

                <FaEllipsisV />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div className="profile-info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatCard({
  title,
  value,
  percentage,
  positive = false,
}) {
  return (
    <div className="profile-stat-card">
      <div
        className={
          positive
            ? "profile-stat-icon positive"
            : "profile-stat-icon negative"
        }
      >
        {positive ? <FaArrowUp /> : <FaArrowDown />}
      </div>

      <div>
        <span>{title}</span>

        <div>
          <strong>{value}</strong>

          <small className={positive ? "positive" : "negative"}>
            {positive ? "↑" : "↓"} {percentage}
          </small>
        </div>
      </div>
    </div>
  );
}

function VisitValue({ value, label }) {
  return (
    <div className="visit-value">
      <span className="visit-arrow">
        <FaArrowUp />
      </span>

      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

export default Profile;