import { useState } from "react";

import headerImage from "../assets/header-image.png";
import backgroundImage from "../assets/background-image.png";
import slider1 from "../assets/slider-1.png";
import slider2 from "../assets/slider-2.png";
import slider3 from "../assets/slider-3.png";

const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Brand Logo Design",
      description: "Make a redesign of the logo in corporate colors.",
    },
    {
      id: 2,
      title: "New Header Image",
      image: headerImage,
    },
    {
      id: 3,
      title: "Wireframe for App",
      description: "Make a wireframe for an app for a pre-presentation.",
    },
    {
      id: 4,
      title: "Template Progress",
      description: "Designing cool UI design templates.",
      progress: 75,
    },
  ],

  progress: [
    {
      id: 5,
      title: "Updating Modules",
      description: "Step-by-step update of modules.",
      progress: 50,
    },
    {
      id: 6,
      title: "Template Progress",
      description: "Designing cool UI design templates.",
      progress: 75,
    },
  ],

  completed: [
    {
      id: 7,
      title: "Refresh Photo Slider",
      slider: true,
    },
    {
      id: 8,
      title: "Server Startup",
      description: "Running the server in test mode and configuring.",
    },
    {
      id: 9,
      title: "New Background",
      image: backgroundImage,
    },
  ],
};

const colors = [
  "#ff6b6b",
  "#22c55e",
  "#38bdf8",
  "#facc15",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState("board");

  const [selectedTask, setSelectedTask] = useState(null);

  const [labelOpen, setLabelOpen] = useState(false);
  const [newLabelOpen, setNewLabelOpen] = useState(false);

  const [labels, setLabels] = useState([
    { name: "Wireframing", color: "#38bdf8" },
    { name: "Design", color: "#22c55e" },
    { name: "Frontend", color: "#14b8a6" },
    { name: "Backend", color: "#ff6b6b" },
  ]);

  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("#22c55e");

  const [newTask, setNewTask] = useState("");

  const addTask = (column) => {
    if (!newTask.trim()) return;

    setTasks({
      ...tasks,
      [column]: [
        ...tasks[column],
        {
          id: Date.now(),
          title: newTask,
          description: "New task description",
        },
      ],
    });

    setNewTask("");
  };

  const addLabel = () => {
    if (!labelName.trim()) return;

    setLabels([
      ...labels,
      {
        name: labelName,
        color: labelColor,
      },
    ]);

    setLabelName("");
    setNewLabelOpen(false);
  };

  const allTasks = [
    ...tasks.todo.map((task) => ({
      ...task,
      group: "Todo",
    })),
    ...tasks.progress.map((task) => ({
      ...task,
      group: "In Progress",
    })),
    ...tasks.completed.map((task) => ({
      ...task,
      group: "Completed",
    })),
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Design Plan⌄</h1>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.avatars}>
            {["J", "R", "D", "S"].map((item) => (
              <span key={item} style={styles.avatar}>
                {item}
              </span>
            ))}

            <button style={styles.plusAvatar}>+</button>
          </div>

          <button
            style={styles.iconButton}
            onClick={() =>
              setView(view === "board" ? "list" : "board")
            }
          >
            {view === "board" ? "☰" : "▦"}
          </button>

          <button
            style={styles.addButton}
            onClick={() => {
              setNewTask("New Task");
              addTask("todo");
            }}
          >
            Add⌄
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div style={styles.board}>
          <TaskColumn
            title="TODO"
            color="#facc15"
            tasks={tasks.todo}
            onTask={setSelectedTask}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={() => addTask("todo")}
          />

          <TaskColumn
            title="IN PROGRESS"
            color="#22d3ee"
            tasks={tasks.progress}
            onTask={setSelectedTask}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={() => addTask("progress")}
          />

          <TaskColumn
            title="COMPLETED"
            color="#22c55e"
            tasks={tasks.completed}
            onTask={setSelectedTask}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={() => addTask("completed")}
          />
        </div>
      ) : (
        <div style={styles.listView}>
          {["Todo", "In Progress", "Completed"].map(
            (group) => (
              <div key={group} style={styles.listSection}>
                <h3>⌄ {group}</h3>

                {allTasks
                  .filter((task) => task.group === group)
                  .map((task) => (
                    <div
                      key={task.id}
                      style={styles.listTask}
                      onClick={() => setSelectedTask(task)}
                    >
                      <span>○</span>

                      <span style={{ flex: 1 }}>
                        {task.title}
                      </span>

                      <span style={styles.listDate}>
                        ◫ Jun 17
                      </span>

                      <span style={styles.dotGreen}></span>
                      <span style={styles.dotBlue}></span>

                      <span style={styles.smallAvatar}>
                        J
                      </span>
                    </div>
                  ))}

                <button style={styles.addTaskText}>
                  + Add Task
                </button>
              </div>
            )
          )}
        </div>
      )}

      {selectedTask && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setSelectedTask(null)}
          />

          <div style={styles.taskPanel}>
            <div style={styles.panelHeader}>
              <button style={styles.completeButton}>
                ✓ Complete
              </button>

              <span>◉ 2⌄</span>

              <div style={{ marginLeft: "auto" }}>
                🔗 &nbsp; ⋯ &nbsp;
                <button
                  style={styles.close}
                  onClick={() => setSelectedTask(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            <h2>{selectedTask.title}</h2>

            <div style={styles.infoGrid}>
              <div>
                <label style={styles.label}>ASSIGNED TO</label>

                <div style={styles.avatars}>
                  <span style={styles.avatar}>J</span>
                  <span style={styles.avatar}>R</span>
                  <span style={styles.avatar}>D</span>
                  <button style={styles.plusAvatar}>+</button>
                </div>
              </div>

              <div>
                <label style={styles.label}>CREATED BY</label>

                <div style={styles.person}>
                  <span style={styles.avatar}>S</span>
                  Shane Black
                </div>
              </div>
            </div>

            <label style={styles.label}>LABELS</label>

            <div style={styles.labelRow}>
              {labels.slice(1, 4).map((label) => (
                <span
                  key={label.name}
                  style={{
                    ...styles.tag,
                    background: label.color,
                  }}
                >
                  {label.name}
                </span>
              ))}

              <button
                style={styles.plusAvatar}
                onClick={() => setLabelOpen(!labelOpen)}
              >
                +
              </button>
            </div>

            {labelOpen && (
              <div style={styles.labelPopup}>
                <h3>Labels</h3>

                <input
                  style={styles.input}
                  placeholder="Search Label..."
                />

                {labels.map((label) => (
                  <div
                    key={label.name}
                    style={styles.labelOption}
                  >
                    <span
                      style={{
                        ...styles.tag,
                        background: label.color,
                      }}
                    >
                      {label.name}
                    </span>

                    <span>✓</span>
                  </div>
                ))}

                <button
                  style={styles.addLabelButton}
                  onClick={() => {
                    setLabelOpen(false);
                    setNewLabelOpen(true);
                  }}
                >
                  Add New Label
                </button>
              </div>
            )}

            <label style={styles.label}>DUE DATE</label>

            <input
              type="datetime-local"
              style={styles.input}
            />

            <label style={styles.label}>DESCRIPTION</label>

            <p style={styles.description}>
              We need to develop several options (Inbox
              template, Chat template, Tasks template, Projects
              template) of cool user interface design templates
              to carefully work out the smallest details.
            </p>

            <label style={styles.label}>CHECKLIST (75%)</label>

            <div style={styles.progressTrack}>
              <div style={styles.progressFill}></div>
            </div>

            {[
              "Inbox Template",
              "Chat Template",
              "Tasks Template",
              "Projects Template",
            ].map((item, index) => (
              <div key={item} style={styles.checkItem}>
                <span>{index < 3 ? "✓" : "○"}</span>
                <span style={{ flex: 1 }}>{item}</span>
                <span>⋮</span>
                <span>♙</span>
              </div>
            ))}

            <button style={styles.addTaskText}>
              + Add Checklist Item
            </button>

            <label style={styles.label}>ATTACHMENTS</label>

            <Attachment name="Wireframe UI Kit.zip" />

            <div style={styles.attachment}>
              <img src={slider1} style={styles.attachImage} />

              <div style={{ flex: 1 }}>
                <strong>Picture 01.png</strong>
                <p style={styles.muted}>
                  Uploaded on 15.01.2020 at 11:50
                </p>
              </div>

              <span>⇩</span>
              <span>♙</span>
            </div>

            <div style={styles.attachment}>
              <img src={slider2} style={styles.attachImage} />

              <div style={{ flex: 1 }}>
                <strong>Picture 02.png</strong>
                <p style={styles.muted}>
                  Uploaded on 15.01.2020 at 11:50
                </p>
              </div>

              <span>⇩</span>
              <span>♙</span>
            </div>

            <button style={styles.addTaskText}>
              + Add Attachment
            </button>

            <div style={styles.commentTabs}>
              <span style={styles.activeCommentTab}>
                COMMENTS
              </span>
              <span>ACTIVITY</span>
            </div>

            <div style={styles.commentBox}>
              <input
                style={styles.commentInput}
                placeholder="Add Comment..."
              />

              <button style={styles.commentButton}>
                Comment
              </button>
            </div>

            <Comment
              name="Jane Wilson"
              text="Hi Cody, any progress on the project? 😊"
            />

            <Comment
              name="Jacob Hawkins"
              text="Hi Jane! Yes, I just finished developing the Chat template."
            />

            <div style={styles.commentImages}>
              <img src={slider1} />
              <img src={slider2} />
              <img src={slider3} />
              <span>+3</span>
            </div>

            <Comment
              name="Regina Cooper"
              text="Hi Jacob. Will you be able to finish the last item of the task by tomorrow?"
            />
          </div>
        </>
      )}

      {newLabelOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.labelModal}>
            <button
              style={styles.modalClose}
              onClick={() => setNewLabelOpen(false)}
            >
              ✕
            </button>

            <h2>Add New Label</h2>

            {labels.map((label) => (
              <div key={label.name} style={styles.existingLabel}>
                <span
                  style={{
                    ...styles.colorSquare,
                    background: label.color,
                  }}
                ></span>

                <span style={{ flex: 1 }}>{label.name}</span>

                <span>✎</span>
                <span>♙</span>
              </div>
            ))}

            <div style={styles.existingLabel}>
              <span
                style={{
                  ...styles.colorSquare,
                  background: labelColor,
                }}
              ></span>

              <input
                style={styles.labelNameInput}
                placeholder="Type an item label..."
                value={labelName}
                onChange={(event) =>
                  setLabelName(event.target.value)
                }
              />
            </div>

            <button style={styles.addTaskText}>
              + Add Label
            </button>

            <h4>Change Color</h4>

            <div style={styles.colorRow}>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setLabelColor(color)}
                  style={{
                    ...styles.colorButton,
                    background: color,
                    border:
                      labelColor === color
                        ? "3px solid #222"
                        : "none",
                  }}
                />
              ))}
            </div>

            <button
              style={styles.doneButton}
              onClick={addLabel}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskColumn({
  title,
  color,
  tasks,
  onTask,
  newTask,
  setNewTask,
  addTask,
}) {
  return (
    <div style={styles.column}>
      <div
        style={{
          ...styles.columnLine,
          background: color,
        }}
      ></div>

      <div style={styles.columnHeader}>
        <span>{title}</span>
        <span>{tasks.length}</span>
        <span style={{ marginLeft: "auto" }}>⋯</span>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={() => onTask(task)}
        />
      ))}

      <div style={styles.quickAdd}>
        <input
          value={newTask}
          onChange={(event) =>
            setNewTask(event.target.value)
          }
          placeholder="New task..."
          style={styles.quickInput}
        />

        <button style={styles.quickButton} onClick={addTask}>
          +
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task, onClick }) {
  return (
    <div style={styles.taskCard} onClick={onClick}>
      <div style={styles.cardTop}>
        <span style={styles.smallLine}></span>
        <span>◫ Jun 17</span>
      </div>

      <h3 style={styles.cardTitle}>{task.title}</h3>

      {task.description && (
        <p style={styles.cardDescription}>
          {task.description}
        </p>
      )}

      {task.image && (
        <img
          src={task.image}
          alt=""
          style={styles.cardImage}
        />
      )}

      {task.slider && (
        <div style={styles.sliderRow}>
          <img src={slider1} />
          <img src={slider2} />
          <img src={slider3} />
        </div>
      )}

      {task.progress && (
        <>
          <div style={styles.progressText}>
            <span>SUB-TASKS: 4</span>
            <span>{task.progress}%</span>
          </div>

          <div style={styles.cardProgress}>
            <div
              style={{
                ...styles.cardProgressFill,
                width: `${task.progress}%`,
              }}
            ></div>
          </div>
        </>
      )}

      <div style={styles.cardFooter}>
        <span>♧ 2</span>
        <span>▢ 5</span>

        <div style={styles.cardAvatars}>
          <span style={styles.smallAvatar}>J</span>
          <span style={styles.smallAvatar}>R</span>
        </div>
      </div>
    </div>
  );
}

function Attachment({ name }) {
  return (
    <div style={styles.attachment}>
      <div style={styles.fileIcon}>↕</div>

      <div style={{ flex: 1 }}>
        <strong>{name}</strong>
        <p style={styles.muted}>
          Uploaded on 15.01.2020 at 11:45
        </p>
      </div>

      <span>⇩</span>
      <span>♙</span>
    </div>
  );
}

function Comment({ name, text }) {
  return (
    <div style={styles.comment}>
      <span style={styles.avatar}>
        {name.charAt(0)}
      </span>

      <div>
        <strong>{name}</strong>
        <span style={styles.time}>5 min ago</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "25px",
    minHeight: "100vh",
    background: "#f5f7f6",
    color: "#333",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  avatars: {
    display: "flex",
    alignItems: "center",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#e8896b",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "-5px",
    border: "2px solid #fff",
    fontSize: "12px",
  },

  plusAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    cursor: "pointer",
  },

  iconButton: {
    border: "1px solid #eee",
    background: "#fff",
    padding: "10px",
    cursor: "pointer",
  },

  addButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(260px, 1fr))",
    gap: "20px",
    overflowX: "auto",
  },

  column: {
    background: "#f0f2f1",
    padding: "15px",
    minWidth: "260px",
  },

  columnLine: {
    height: "3px",
    margin: "-15px -15px 15px",
  },

  columnHeader: {
    display: "flex",
    gap: "10px",
    color: "#777",
    fontSize: "13px",
    marginBottom: "15px",
  },

  taskCard: {
    background: "#fff",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#999",
    fontSize: "11px",
  },

  smallLine: {
    width: "25px",
    height: "3px",
    background: "#22c55e",
  },

  cardTitle: {
    fontSize: "14px",
    margin: "12px 0 5px",
  },

  cardDescription: {
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  cardImage: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    marginTop: "10px",
  },

  sliderRow: {
    display: "flex",
    gap: "7px",
    marginTop: "10px",
  },

  cardFooter: {
    display: "flex",
    gap: "12px",
    marginTop: "15px",
    color: "#888",
    fontSize: "12px",
  },

  cardAvatars: {
    marginLeft: "auto",
  },

  smallAvatar: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#d97757",
    color: "#fff",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "9px",
    marginLeft: "-4px",
  },

  sliderRowImg: {
    width: "30%",
  },

  progressText: {
    display: "flex",
    justifyContent: "space-between",
    color: "#777",
    fontSize: "10px",
    marginTop: "12px",
  },

  cardProgress: {
    height: "4px",
    background: "#eee",
    marginTop: "5px",
  },

  cardProgressFill: {
    height: "100%",
    background: "#16a34a",
  },

  quickAdd: {
    display: "flex",
    marginTop: "10px",
  },

  quickInput: {
    width: "100%",
    border: "none",
    padding: "10px",
  },

  quickButton: {
    border: "none",
    background: "#dcfce7",
    color: "#16a34a",
    padding: "10px 15px",
    cursor: "pointer",
  },

  listView: {
    background: "#fff",
    padding: "20px",
  },

  listSection: {
    marginBottom: "30px",
  },

  listTask: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #eee",
    padding: "13px",
    marginBottom: "7px",
    cursor: "pointer",
  },

  listDate: {
    color: "#888",
    fontSize: "12px",
  },

  dotGreen: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  dotBlue: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22d3ee",
  },

  addTaskText: {
    border: "none",
    background: "transparent",
    color: "#16a34a",
    padding: "10px 0",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.25)",
    zIndex: 100,
  },

  taskPanel: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "520px",
    height: "100vh",
    background: "#fff",
    padding: "25px",
    boxSizing: "border-box",
    overflowY: "auto",
    zIndex: 101,
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  completeButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "5px",
  },

  close: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  label: {
    display: "block",
    fontSize: "10px",
    color: "#888",
    margin: "20px 0 8px",
  },

  person: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  labelRow: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
  },

  tag: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "10px",
  },

  labelPopup: {
    position: "absolute",
    right: "25px",
    width: "250px",
    background: "#fff",
    padding: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,.18)",
    zIndex: 150,
  },

  input: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },

  labelOption: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
  },

  addLabelButton: {
    width: "100%",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    padding: "10px",
  },

  description: {
    color: "#666",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  progressTrack: {
    height: "5px",
    background: "#eee",
  },

  progressFill: {
    width: "75%",
    height: "100%",
    background: "#16a34a",
  },

  checkItem: {
    display: "flex",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontSize: "12px",
  },

  attachment: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
  },

  fileIcon: {
    width: "45px",
    height: "45px",
    border: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  attachImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },

  muted: {
    margin: "4px 0",
    color: "#999",
    fontSize: "10px",
  },

  commentTabs: {
    display: "flex",
    gap: "25px",
    borderBottom: "1px solid #eee",
    marginTop: "20px",
  },

  activeCommentTab: {
    color: "#16a34a",
    borderBottom: "2px solid #16a34a",
    paddingBottom: "10px",
  },

  commentBox: {
    border: "1px solid #eee",
    padding: "10px",
    marginTop: "15px",
  },

  commentInput: {
    width: "100%",
    border: "none",
    padding: "10px",
    boxSizing: "border-box",
  },

  commentButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "7px 15px",
  },

  comment: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
    fontSize: "12px",
  },

  time: {
    color: "#aaa",
    marginLeft: "10px",
  },

  commentImages: {
    display: "flex",
    gap: "7px",
    marginLeft: "42px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },

  labelModal: {
    width: "400px",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  modalClose: {
    position: "absolute",
    right: "15px",
    top: "15px",
    border: "none",
    background: "transparent",
  },

  existingLabel: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  colorSquare: {
    width: "10px",
    height: "10px",
  },

  labelNameInput: {
    flex: 1,
    border: "none",
    outline: "none",
  },

  colorRow: {
    display: "flex",
    gap: "10px",
  },

  colorButton: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  doneButton: {
    display: "block",
    marginLeft: "auto",
    marginTop: "25px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 25px",
  },
};

export default Tasks;