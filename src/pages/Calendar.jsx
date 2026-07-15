import { useState } from "react";
import "./Calendar.css";

const calendarTypes = [
  { name: "Important", color: "#ff7474" },
  { name: "Meeting", color: "#24c7dd" },
  { name: "Event", color: "#45c96b" },
  { name: "Work", color: "#ffc832" },
  { name: "Other", color: "#9098a3" },
];

const initialEvents = [
  {
    id: 1,
    title: "Call Back Priscilla",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum risus egestas elementum erat elementum a est.",
    day: 1,
    start: "00:30",
    end: "01:30",
    type: "Important",
  },
  {
    id: 2,
    title: "Meeting with Judith",
    description: "Meeting with Judith",
    day: 9,
    start: "10:00",
    end: "11:30",
    type: "Meeting",
  },
  {
    id: 3,
    title: "Meeting...",
    description: "New meeting",
    day: 9,
    start: "10:00",
    end: "11:30",
    type: "Meeting",
  },
  {
    id: 4,
    title: 'Project "Rocket"',
    description: "Rocket project meeting",
    day: 14,
    start: "10:00",
    end: "11:30",
    type: "Work",
  },
  {
    id: 5,
    title: "Presentation",
    description: "Project presentation",
    day: 23,
    start: "10:00",
    end: "11:30",
    type: "Event",
  },
  {
    id: 6,
    title: "Presentation",
    description: "Project presentation",
    day: 24,
    start: "10:00",
    end: "11:30",
    type: "Event",
  },
];

const monthDays = [
  { day: 30, muted: true },
  { day: 31, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 1, muted: true },
  { day: 2, muted: true },
  { day: 3, muted: true },
];

const weekDays = [
  { label: "MO", day: 6 },
  { label: "TU", day: 7 },
  { label: "WE", day: 8 },
  { label: "TH", day: 9 },
  { label: "FR", day: 10 },
  { label: "SA", day: 11 },
  { label: "SU", day: 12 },
];

const timeOptions = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
];

const calendarColors = [
  "#ff7474",
  "#43c7b7",
  "#ffc832",
  "#22983f",
  "#25c6da",
  "#49cc70",
  "#a5df3d",
  "#ad4ee5",
  "#f35bc2",
  "#9098a3",
];

function Calendar() {
  const [view, setView] = useState("Month");
  const [events, setEvents] = useState(initialEvents);
  const [calendars, setCalendars] = useState(calendarTypes);

  const [showEventModal, setShowEventModal] = useState(false);
  const [showCalendarPanel, setShowCalendarPanel] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [calendarMenu, setCalendarMenu] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    day: 12,
    start: "00:00",
    end: "00:00",
    type: "Important",
    allDay: true,
    repeat: false,
  });

  const [calendarForm, setCalendarForm] = useState({
    name: "",
    description: "",
    color: "#43c7b7",
  });

  const resetEventForm = () => {
    setEventForm({
      title: "",
      description: "",
      day: 12,
      start: "00:00",
      end: "00:00",
      type: "Important",
      allDay: true,
      repeat: false,
    });
  };

  const openNewEvent = () => {
    resetEventForm();
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const createEvent = () => {
    if (!eventForm.title.trim()) return;

    if (editingEvent) {
      setEvents((current) =>
        current.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...eventForm,
                day: Number(eventForm.day),
              }
            : event
        )
      );
    } else {
      setEvents((current) => [
        ...current,
        {
          id: Date.now(),
          ...eventForm,
          day: Number(eventForm.day),
        },
      ]);
    }

    setShowEventModal(false);
    setEditingEvent(null);
    setSelectedEvent(null);
    resetEventForm();
  };

  const openEditEvent = () => {
    setEventForm({
      title: selectedEvent.title,
      description: selectedEvent.description,
      day: selectedEvent.day,
      start: selectedEvent.start,
      end: selectedEvent.end,
      type: selectedEvent.type,
      allDay: selectedEvent.allDay ?? false,
      repeat: selectedEvent.repeat ?? false,
    });

    setEditingEvent(selectedEvent);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const deleteEvent = () => {
    setEvents((current) =>
      current.filter((event) => event.id !== selectedEvent.id)
    );

    setDeleteModal(false);
    setSelectedEvent(null);
  };

  const createCalendar = () => {
    if (!calendarForm.name.trim()) return;

    setCalendars((current) => [
      ...current,
      {
        name: calendarForm.name,
        color: calendarForm.color,
      },
    ]);

    setCalendarForm({
      name: "",
      description: "",
      color: "#43c7b7",
    });

    setShowCalendarPanel(false);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-page-header">
        <h1>Calendar</h1>

        <button className="calendar-add-event" onClick={openNewEvent}>
          + Add Event
        </button>
      </div>

      <div className="calendar-wrapper">
        <aside className="calendar-sidebar">
          <div className="calendar-sidebar-title">
            <span>CALENDARS</span>

            <button onClick={() => setShowCalendarPanel(true)}>+</button>
          </div>

          {calendars.map((calendar) => (
            <div className="calendar-sidebar-item" key={calendar.name}>
              <span
                className="calendar-check"
                style={{ background: calendar.color }}
              >
                ✓
              </span>

              <span>{calendar.name}</span>

              <button
                className="calendar-three-dots"
                onClick={() =>
                  setCalendarMenu(
                    calendarMenu === calendar.name ? null : calendar.name
                  )
                }
              >
                ⋮
              </button>

              {calendarMenu === calendar.name && (
                <div className="calendar-options-menu">
                  <button>◉ Display this Only</button>
                  <button>⌁ Hide from List</button>
                  <button>⚙ Settings</button>

                  <div className="calendar-menu-divider" />

                  <button className="calendar-delete-option">
                    ♙ Delete Calendar
                  </button>

                  <div className="calendar-menu-colors">
                    {calendarColors.map((color) => (
                      <button
                        key={color}
                        style={{ background: color }}
                        onClick={() => {
                          setCalendars((current) =>
                            current.map((item) =>
                              item.name === calendar.name
                                ? { ...item, color }
                                : item
                            )
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </aside>

        <main className="calendar-main">
          <div className="calendar-toolbar">
            <div className="calendar-navigation">
              <div className="calendar-arrow-group">
                <button>‹</button>
                <button>›</button>
              </div>

              <button className="calendar-today">Today</button>
            </div>

            <h2>
              September <span>2020</span>
            </h2>

            <div className="calendar-view-tabs">
              {["Month", "Week", "Day"].map((item) => (
                <button
                  key={item}
                  className={view === item ? "active" : ""}
                  onClick={() => setView(item)}
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

      {showCalendarPanel && (
        <>
          <div
            className="calendar-overlay"
            onClick={() => setShowCalendarPanel(false)}
          />

          <div className="new-calendar-panel">
            <button
              className="calendar-close"
              onClick={() => setShowCalendarPanel(false)}
            >
              ×
            </button>

            <h2>New Calendar</h2>

            <label>Name</label>

            <input
              placeholder="Personal"
              value={calendarForm.name}
              onChange={(e) =>
                setCalendarForm({
                  ...calendarForm,
                  name: e.target.value,
                })
              }
            />

            <label>Description</label>

            <textarea
              placeholder="Type something"
              value={calendarForm.description}
              onChange={(e) =>
                setCalendarForm({
                  ...calendarForm,
                  description: e.target.value,
                })
              }
            />

            <label>Color</label>

            <div className="new-calendar-colors">
              {calendarColors.map((color) => (
                <button
                  key={color}
                  style={{ background: color }}
                  className={
                    calendarForm.color === color ? "selected-color" : ""
                  }
                  onClick={() =>
                    setCalendarForm({
                      ...calendarForm,
                      color,
                    })
                  }
                >
                  {calendarForm.color === color && "✓"}
                </button>
              ))}
            </div>

            <button
              className="calendar-create-full"
              onClick={createCalendar}
            >
              Create
            </button>
          </div>
        </>
      )}

      {showEventModal && (
        <div className="calendar-modal-overlay">
          <div className="new-event-modal">
            <button
              className="calendar-close"
              onClick={() => {
                setShowEventModal(false);
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}
            >
              ×
            </button>

            <h2>{editingEvent ? "Edit Event" : "New Event"}</h2>

            <label>Title</label>

            <input
              placeholder="Sending order"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  title: e.target.value,
                })
              }
            />

            <label>Description</label>

            <textarea
              placeholder="Sending order #25789 Felecia Burke at 5:30"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  description: e.target.value,
                })
              }
            />

            <label>Time and Date</label>

            <div className="event-date-row">
              <div className="event-picker-wrapper">
                <button
                  className="event-picker-button"
                  onClick={() =>
                    setShowTimePicker(!showTimePicker)
                  }
                >
                  {eventForm.start}
                </button>

                {showTimePicker && (
                  <div className="event-time-dropdown">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        className={
                          eventForm.start === time ? "active-time" : ""
                        }
                        onClick={() => {
                          setEventForm({
                            ...eventForm,
                            start: time,
                          });

                          setShowTimePicker(false);
                        }}
                      >
                        {eventForm.start === time && "✓ "}
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="event-picker-wrapper">
                <button
                  className="event-picker-button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {String(eventForm.day).padStart(2, "0")}.09.2020⌄
                </button>

                {showDatePicker && (
                  <DatePicker
                    selectedDay={eventForm.day}
                    onSelect={(day) => {
                      setEventForm({
                        ...eventForm,
                        day,
                      });

                      setShowDatePicker(false);
                    }}
                  />
                )}
              </div>

              <span className="event-date-divider">—</span>

              <input
                type="time"
                value={eventForm.end}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    end: e.target.value,
                  })
                }
              />

              <button className="event-picker-button">
                {String(eventForm.day).padStart(2, "0")}.09.2020⌄
              </button>
            </div>

            <div className="event-checkbox-row">
              <label>
                <input
                  type="checkbox"
                  checked={eventForm.allDay}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      allDay: e.target.checked,
                    })
                  }
                />

                <span>All Day</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={eventForm.repeat}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      repeat: e.target.checked,
                    })
                  }
                />

                <span>Repeat</span>
              </label>
            </div>

            <label>Calendar</label>

            <select
              value={eventForm.type}
              onChange={(e) =>
                setEventForm({
                  ...eventForm,
                  type: e.target.value,
                })
              }
            >
              {calendars.map((calendar) => (
                <option key={calendar.name} value={calendar.name}>
                  {calendar.name}
                </option>
              ))}
            </select>

            <div className="event-modal-actions">
              <button className="event-create-button" onClick={createEvent}>
                {editingEvent ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && !deleteModal && (
        <div
          className="calendar-modal-overlay calendar-preview-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="calendar-event-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="event-preview-actions">
              <button onClick={openEditEvent}>✎</button>

              <button onClick={() => setDeleteModal(true)}>♙</button>

              <button>•••</button>

              <button onClick={() => setSelectedEvent(null)}>×</button>
            </div>

            <div className="event-preview-title">
              <span
                style={{
                  background: getColor(selectedEvent.type, calendars),
                }}
              />

              <h2>{selectedEvent.title}</h2>
            </div>

            <p className="event-preview-time">
              ◷ Wednesday, September {selectedEvent.day} ・{" "}
              {selectedEvent.start} - {selectedEvent.end}
            </p>

            <p className="event-preview-description">
              ☷{" "}
              {selectedEvent.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum risus egestas elementum erat elementum a est."}
            </p>

            <p className="event-preview-calendar">
              ▧ {selectedEvent.type}
            </p>
          </div>
        </div>
      )}

      {deleteModal && selectedEvent && (
        <div className="calendar-modal-overlay">
          <div className="delete-event-modal">
            <h2>Deleting Event</h2>

            <p>Are you sure you want to delete this event?</p>

            <div>
              <button
                className="delete-cancel"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="delete-confirm" onClick={deleteEvent}>
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
  const weekNames = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  return (
    <>
      <div className="calendar-week-names">
        {weekNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-month-grid">
        {monthDays.map((date, index) => (
          <div
            key={`${date.day}-${index}`}
            className={`calendar-day-cell ${
              date.muted ? "muted-calendar-day" : ""
            }`}
          >
            <span
              className={
                date.day === 8 && index === 9
                  ? "calendar-current-day"
                  : "calendar-day-number"
              }
            >
              {date.day}
            </span>

            {!date.muted &&
              events
                .filter((event) => event.day === date.day)
                .map((event) => (
                  <button
                    key={event.id}
                    className="calendar-month-event"
                    style={{
                      background: getLightColor(event.type),
                      borderLeftColor: getDefaultColor(event.type),
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <span>{event.title}</span>
                    <small>{event.start}</small>
                  </button>
                ))}
          </div>
        ))}
      </div>
    </>
  );
}

function WeekView({ events, onEventClick }) {
  const displayEvents = [
    { ...events[1], column: 1, top: 40, height: 65 },
    {
      id: 101,
      title: "New Event",
      type: "Meeting",
      start: "10:00",
      end: "11:30",
      column: 1,
      top: 110,
      height: 145,
    },
    { ...events[3], column: 2, top: 185, height: 100 },
    { ...events[0], column: 3, top: 335, height: 140 },
    { ...events[4], column: 4, top: 110, height: 285 },
    { ...events[5], column: 4, top: 400, height: 110 },
  ];

  return (
    <div className="calendar-time-view">
      <div className="calendar-week-days">
        <div className="calendar-time-space" />

        {weekDays.map((day) => (
          <div key={day.day}>
            <small>{day.label}</small>

            <span className={day.day === 8 ? "week-current-day" : ""}>
              {day.day}
            </span>
          </div>
        ))}
      </div>

      <div className="calendar-week-body">
        <TimeLabels />

        <div className="calendar-week-columns">
          {weekDays.map((day) => (
            <div
              key={day.day}
              className={day.day === 8 ? "week-today-column" : ""}
            />
          ))}

          {displayEvents.map((event) => (
            <button
              key={event.id}
              className="calendar-timed-event"
              style={{
                left: `calc(${event.column} * (100% / 7) + 4px)`,
                width: "calc((100% / 7) - 8px)",
                top: event.top,
                height: event.height,
                background: getLightColor(event.type),
                borderLeftColor: getDefaultColor(event.type),
              }}
              onClick={() => onEventClick(event)}
            >
              <small>
                {event.start} - {event.end}
              </small>

              <span>{event.title}</span>
            </button>
          ))}

          <div className="calendar-current-time">
            <span>06:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayView({ events, onEventClick }) {
  const dayEvents = [
    {
      ...events[3],
      top: 40,
      height: 110,
    },
    {
      id: 202,
      title: "New Event",
      type: "Meeting",
      start: "10:00",
      end: "11:30",
      top: 190,
      height: 160,
    },
    {
      ...events[0],
      top: 355,
      height: 55,
    },
    {
      ...events[4],
      top: 515,
      height: 110,
    },
  ];

  return (
    <div className="calendar-day-view">
      <div className="calendar-day-view-title">TUESDAY 7</div>

      <div className="calendar-day-time-body">
        <TimeLabels />

        <div className="calendar-day-events">
          {dayEvents.map((event) => (
            <button
              key={event.id}
              className="calendar-day-event"
              style={{
                top: event.top,
                height: event.height,
                background: getLightColor(event.type),
                borderLeftColor: getDefaultColor(event.type),
              }}
              onClick={() => onEventClick(event)}
            >
              <small>
                {event.start} - {event.end}
              </small>

              <span>{event.title}</span>
            </button>
          ))}

          <div className="calendar-current-time">
            <span>06:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeLabels() {
  return (
    <div className="calendar-time-labels">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index}>
          {String(index + 1).padStart(2, "0")}:00
        </span>
      ))}
    </div>
  );
}

function DatePicker({ selectedDay, onSelect }) {
  const pickerDays = [
    28, 29, 30, 31, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 1,
  ];

  return (
    <div className="calendar-date-picker">
      <div className="date-picker-header">
        <button>‹</button>

        <strong>
          September <span>2020</span>
        </strong>

        <button>›</button>
      </div>

      <div className="date-picker-week">
        {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="date-picker-days">
        {pickerDays.map((day, index) => (
          <button
            key={`${day}-${index}`}
            className={
              day === Number(selectedDay) && index > 6
                ? "selected-picker-day"
                : ""
            }
            onClick={() => onSelect(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function getDefaultColor(type) {
  return (
    calendarTypes.find((calendar) => calendar.name === type)?.color ||
    "#9098a3"
  );
}

function getColor(type, calendars) {
  return (
    calendars.find((calendar) => calendar.name === type)?.color ||
    "#9098a3"
  );
}

function getLightColor(type) {
  const colors = {
    Important: "#ffdede",
    Meeting: "#c7f2f5",
    Event: "#d0f3db",
    Work: "#fff1bd",
    Other: "#e5e7eb",
  };

  return colors[type] || "#d0f3db";
}

export default Calendar;