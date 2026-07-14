import { useState } from "react";

const calendarTypes = [
  { name: "Important", color: "#fb7185" },
  { name: "Meeting", color: "#22d3ee" },
  { name: "Event", color: "#4ade80" },
  { name: "Work", color: "#facc15" },
  { name: "Other", color: "#94a3b8" },
];

const initialEvents = [
  {
    id: 1,
    title: "Call Back Priscilla",
    day: 2,
    start: "10:00",
    end: "11:30",
    type: "Meeting",
  },
  {
    id: 2,
    title: "Meeting with Julian",
    day: 9,
    start: "10:00",
    end: "11:30",
    type: "Meeting",
  },
  {
    id: 3,
    title: "Project Rocket",
    day: 14,
    start: "10:00",
    end: "11:30",
    type: "Work",
  },
  {
    id: 4,
    title: "Presentation",
    day: 23,
    start: "10:00",
    end: "11:30",
    type: "Event",
  },
  {
    id: 5,
    title: "Presentation",
    day: 24,
    start: "10:00",
    end: "11:30",
    type: "Event",
  },
];

function Calendar() {
  const [view, setView] = useState("Month");
  const [events, setEvents] = useState(initialEvents);

  const [eventModal, setEventModal] = useState(false);
  const [calendarPanel, setCalendarPanel] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [calendarMenu, setCalendarMenu] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    day: 8,
    start: "00:00",
    end: "00:00",
    type: "Important",
  });

  const [calendarForm, setCalendarForm] = useState({
    name: "",
    description: "",
    color: "#4ade80",
  });

  const createEvent = () => {
    if (!eventForm.title.trim()) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        ...eventForm,
        day: Number(eventForm.day),
      },
    ]);

    setEventModal(false);

    setEventForm({
      title: "",
      description: "",
      day: 8,
      start: "00:00",
      end: "00:00",
      type: "Important",
    });
  };

  const deleteEvent = () => {
    setEvents(
      events.filter((event) => event.id !== selectedEvent.id)
    );

    setSelectedEvent(null);
    setDeleteModal(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Calendar</h1>

        <button
          style={styles.addButton}
          onClick={() => setEventModal(true)}
        >
          + Add Event
        </button>
      </div>

      <div style={styles.calendarLayout}>
        <aside style={styles.calendarSidebar}>
          <div style={styles.sidebarTitle}>
            <span>CALENDARS</span>

            <button
              style={styles.plusButton}
              onClick={() => setCalendarPanel(true)}
            >
              +
            </button>
          </div>

          {calendarTypes.map((calendar) => (
            <div
              key={calendar.name}
              style={styles.calendarItem}
            >
              <span
                style={{
                  ...styles.calendarDot,
                  background: calendar.color,
                }}
              />

              {calendar.name}

              <button
                style={styles.menuButton}
                onClick={() =>
                  setCalendarMenu(
                    calendarMenu === calendar.name
                      ? null
                      : calendar.name
                  )
                }
              >
                ⋮
              </button>

              {calendarMenu === calendar.name && (
                <div style={styles.calendarPopup}>
                  <p>◉ Display this only</p>
                  <p>☑ Hide from list</p>
                  <p>⚙ Settings</p>

                  <hr />

                  <p style={{ color: "#ef4444" }}>
                    Delete Calendar
                  </p>

                  <div style={styles.colorRow}>
                    {[
                      "#fb7185",
                      "#22d3ee",
                      "#4ade80",
                      "#facc15",
                      "#8b5cf6",
                      "#14b8a6",
                    ].map((color) => (
                      <span
                        key={color}
                        style={{
                          ...styles.colorCircle,
                          background: color,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </aside>

        <main style={styles.calendarMain}>
          <div style={styles.toolbar}>
            <div>
              <button style={styles.navButton}>‹</button>
              <button style={styles.navButton}>›</button>
              <button style={styles.todayButton}>Today</button>
            </div>

            <h2>September <small>2020</small></h2>

            <div style={styles.viewTabs}>
              {["Month", "Week", "Day"].map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  style={{
                    ...styles.viewButton,
                    background:
                      view === item ? "#16a34a" : "transparent",
                    color: view === item ? "#fff" : "#555",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {view === "Month" && (
            <MonthView
              events={events}
              onEventClick={setSelectedEvent}
            />
          )}

          {view === "Week" && (
            <WeekView
              events={events}
              onEventClick={setSelectedEvent}
            />
          )}

          {view === "Day" && (
            <DayView
              events={events}
              onEventClick={setSelectedEvent}
            />
          )}
        </main>
      </div>

      {calendarPanel && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setCalendarPanel(false)}
          />

          <div style={styles.sidePanel}>
            <button
              style={styles.closeButton}
              onClick={() => setCalendarPanel(false)}
            >
              ✕
            </button>

            <h2>New Calendar</h2>

            <label style={styles.label}>Name</label>

            <input
              style={styles.input}
              placeholder="Personal"
              value={calendarForm.name}
              onChange={(e) =>
                setCalendarForm({
                  ...calendarForm,
                  name: e.target.value,
                })
              }
            />

            <label style={styles.label}>Description</label>

            <textarea
              style={styles.textarea}
              placeholder="Type something"
              value={calendarForm.description}
              onChange={(e) =>
                setCalendarForm({
                  ...calendarForm,
                  description: e.target.value,
                })
              }
            />

            <label style={styles.label}>Color</label>

            <div style={styles.colorGrid}>
              {[
                "#fb7185",
                "#22d3ee",
                "#facc15",
                "#4ade80",
                "#67e8f9",
                "#86efac",
                "#fde68a",
                "#f9a8d4",
                "#c4b5fd",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setCalendarForm({
                      ...calendarForm,
                      color,
                    })
                  }
                  style={{
                    ...styles.colorBox,
                    background: color,
                    border:
                      calendarForm.color === color
                        ? "2px solid #111"
                        : "none",
                  }}
                />
              ))}
            </div>

            <button
              style={{
                ...styles.createButton,
                width: "100%",
              }}
              onClick={() => setCalendarPanel(false)}
            >
              Create
            </button>
          </div>
        </>
      )}

      {eventModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.eventModal}>
            <button
              style={styles.closeButton}
              onClick={() => setEventModal(false)}
            >
              ✕
            </button>

            <h2>New Event</h2>

            <label style={styles.label}>Title</label>

            <input
              style={styles.input}
              placeholder="Sending order"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  title: e.target.value,
                })
              }
            />

            <label style={styles.label}>Description</label>

            <textarea
              style={styles.description}
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  description: e.target.value,
                })
              }
              placeholder="Sending order information"
            />

            <label style={styles.label}>Day</label>

            <input
              style={styles.input}
              type="number"
              min="1"
              max="30"
              value={eventForm.day}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  day: e.target.value,
                })
              }
            />

            <label style={styles.label}>Time and Date</label>

            <div style={styles.twoColumns}>
              <input
                type="time"
                style={styles.input}
                value={eventForm.start}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    start: e.target.value,
                  })
                }
              />

              <input
                type="time"
                style={styles.input}
                value={eventForm.end}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    end: e.target.value,
                  })
                }
              />
            </div>

            <label style={styles.label}>Calendar</label>

            <select
              style={styles.input}
              value={eventForm.type}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  type: e.target.value,
                })
              }
            >
              {calendarTypes.map((calendar) => (
                <option key={calendar.name}>
                  {calendar.name}
                </option>
              ))}
            </select>

            <button
              style={styles.createButton}
              onClick={createEvent}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {selectedEvent && !deleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.eventDetails}>
            <button
              style={styles.closeButton}
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <div style={styles.eventTitleRow}>
              <span
                style={{
                  ...styles.calendarDot,
                  background: getColor(selectedEvent.type),
                }}
              />

              <h2>{selectedEvent.title}</h2>
            </div>

            <p>
              Wednesday, September {selectedEvent.day} ·{" "}
              {selectedEvent.start} - {selectedEvent.end}
            </p>

            <p style={styles.eventDescription}>
              {selectedEvent.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>

            <p>▣ {selectedEvent.type}</p>

            <div style={styles.detailActions}>
              <button style={styles.editButton}>✎ Edit</button>

              <button
                style={styles.deleteButton}
                onClick={() => setDeleteModal(true)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.deleteModal}>
            <h3>Deleting Event</h3>

            <p>
              Are you sure you want to delete this event?
            </p>

            <div style={styles.deleteActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                style={styles.yesButton}
                onClick={deleteEvent}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MonthView({ events, onEventClick }) {
  const days = [
    30, 31, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 1, 2, 3,
  ];

  return (
    <>
      <div style={styles.weekHeader}>
        {[
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div style={styles.monthGrid}>
        {days.map((day, index) => (
          <div key={index} style={styles.dayCell}>
            <span
              style={
                day === 8 && index === 9
                  ? styles.currentDay
                  : styles.dayNumber
              }
            >
              {day}
            </span>

            {events
              .filter((event) => event.day === day)
              .map((event) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  style={{
                    ...styles.monthEvent,
                    background: getLightColor(event.type),
                    borderLeft: `3px solid ${getColor(
                      event.type
                    )}`,
                  }}
                >
                  {event.title}
                  <span>{event.start}</span>
                </button>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

function WeekView({ events, onEventClick }) {
  const days = ["MON 6", "TUE 7", "WED 8", "THU 9", "FRI 10", "SAT 11", "SUN 12"];

  return (
    <div>
      <div style={styles.weekHeader}>
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div style={styles.weekBody}>
        {days.map((day, index) => (
          <div key={day} style={styles.weekColumn}>
            {events.slice(index, index + 2).map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                style={{
                  ...styles.weekEvent,
                  background: getLightColor(event.type),
                  borderLeft: `3px solid ${getColor(
                    event.type
                  )}`,
                  marginTop: `${50 + index * 35}px`,
                }}
              >
                {event.start} - {event.end}
                <br />
                {event.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayView({ events, onEventClick }) {
  return (
    <div style={styles.dayView}>
      <h4 style={{ textAlign: "center" }}>TUESDAY 7</h4>

      {events.slice(0, 4).map((event) => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          style={{
            ...styles.dayEvent,
            background: getLightColor(event.type),
            borderLeft: `3px solid ${getColor(event.type)}`,
          }}
        >
          {event.start} - {event.end}
          <br />
          {event.title}
        </button>
      ))}
    </div>
  );
}

function getColor(type) {
  return (
    calendarTypes.find((item) => item.name === type)?.color ||
    "#94a3b8"
  );
}

function getLightColor(type) {
  const colors = {
    Important: "#ffe4e6",
    Meeting: "#cffafe",
    Event: "#dcfce7",
    Work: "#fef3c7",
    Other: "#e2e8f0",
  };

  return colors[type];
}

const styles = {
  page: {
    padding: "25px",
    background: "#f5f7f6",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  calendarLayout: {
    display: "flex",
    marginTop: "20px",
    background: "#fff",
  },

  calendarSidebar: {
    width: "190px",
    padding: "20px",
    borderRight: "1px solid #eee",
  },

  sidebarTitle: {
    display: "flex",
    justifyContent: "space-between",
    color: "#999",
    fontSize: "12px",
    marginBottom: "20px",
  },

  plusButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  calendarItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 0",
    position: "relative",
  },

  calendarDot: {
    width: "10px",
    height: "10px",
    borderRadius: "3px",
  },

  menuButton: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  calendarPopup: {
    position: "absolute",
    left: "160px",
    top: "30px",
    width: "180px",
    background: "#fff",
    padding: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,.15)",
    zIndex: 50,
  },

  colorRow: {
    display: "flex",
    gap: "7px",
  },

  colorCircle: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
  },

  calendarMain: {
    flex: 1,
    minWidth: 0,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },

  navButton: {
    border: "1px solid #eee",
    background: "#fff",
    padding: "7px 12px",
  },

  todayButton: {
    border: "none",
    background: "#f5f5f5",
    padding: "8px 15px",
    marginLeft: "10px",
  },

  viewTabs: {
    display: "flex",
  },

  viewButton: {
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  weekHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
    fontSize: "11px",
    color: "#888",
    padding: "10px 0",
  },

  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
  },

  dayCell: {
    minHeight: "115px",
    border: "1px solid #eee",
    padding: "8px",
    boxSizing: "border-box",
  },

  dayNumber: {
    display: "block",
    textAlign: "center",
  },

  currentDay: {
    display: "flex",
    width: "25px",
    height: "25px",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    background: "#16a34a",
    color: "#fff",
    borderRadius: "50%",
  },

  monthEvent: {
    width: "100%",
    marginTop: "5px",
    padding: "6px",
    border: "none",
    textAlign: "left",
    fontSize: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
  },

  weekBody: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    minHeight: "600px",
  },

  weekColumn: {
    border: "1px solid #eee",
  },

  weekEvent: {
    width: "95%",
    padding: "12px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
  },

  dayView: {
    minHeight: "600px",
    padding: "20px",
  },

  dayEvent: {
    display: "block",
    width: "100%",
    padding: "20px",
    margin: "10px 0",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.2)",
    zIndex: 100,
  },

  sidePanel: {
    position: "fixed",
    top: 0,
    left: "230px",
    width: "360px",
    height: "100vh",
    background: "#fff",
    padding: "30px",
    boxSizing: "border-box",
    zIndex: 101,
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },

  eventModal: {
    width: "430px",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  eventDetails: {
    width: "450px",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  deleteModal: {
    width: "400px",
    background: "#fff",
    padding: "25px",
  },

  closeButton: {
    position: "absolute",
    right: "15px",
    top: "15px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  label: {
    display: "block",
    fontSize: "12px",
    color: "#888",
    margin: "15px 0 7px",
  },

  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
  },

  description: {
    width: "100%",
    height: "100px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    marginBottom: "25px",
  },

  colorBox: {
    height: "25px",
    cursor: "pointer",
  },

  createButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 25px",
    marginTop: "20px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  eventTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  eventDescription: {
    color: "#777",
    lineHeight: 1.6,
  },

  detailActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  editButton: {
    border: "1px solid #ddd",
    background: "#fff",
    padding: "8px 15px",
  },

  deleteButton: {
    border: "none",
    background: "#fee2e2",
    color: "#ef4444",
    padding: "8px 15px",
  },

  deleteActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelButton: {
    border: "1px solid #ddd",
    background: "#fff",
    padding: "8px 20px",
  },

  yesButton: {
    border: "none",
    background: "#fb7185",
    color: "#fff",
    padding: "8px 25px",
  },
};

export default Calendar;