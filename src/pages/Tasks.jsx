import { useMemo, useRef, useState } from "react";
import {
  FaPlus,
  FaEllipsisH,
  FaCalendarAlt,
  FaPaperclip,
  FaCommentAlt,
  FaCheck,
  FaTimes,
  FaLink,
  FaEye,
  FaDownload,
  FaTrash,
  FaSearch,
  FaSlidersH,
  FaThLarge,
  FaList,
  FaChevronDown,
  FaSmile,
  FaImage,
} from "react-icons/fa";

import headerImage from "../assets/header-image.png";
import backgroundImage from "../assets/background-image.png";
import slider1 from "../assets/slider-1.png";
import slider2 from "../assets/slider-2.png";
import slider3 from "../assets/slider-3.png";

import "../styles/Tasks.css";

const members = [
  "Regina Cooper",
  "Jacob Hawkins",
  "Jane Wilson",
  "Shane Black",
];

const initialLabels = [
  { id: 1, name: "Wireframing", color: "#27c3d4" },
  { id: 2, name: "Design", color: "#48c774" },
  { id: 3, name: "Frontend", color: "#42cbb2" },
  { id: 4, name: "Backend", color: "#ff7272" },
];

const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Brand Logo Design",
      description: "Make a redesign of the logo in corporate colors.",
      labels: [2, 3],
      attachments: 2,
      comments: 5,
    },
    {
      id: 2,
      title: "New Header Image",
      image: headerImage,
      labels: [2],
      attachments: 1,
      comments: 3,
    },
    {
      id: 3,
      title: "Wireframe for App",
      description:
        "Make a wireframe for an app for a pre-presentation.",
      labels: [1, 3],
      comments: 1,
    },
  ],

  progress: [
    {
      id: 4,
      title: "Updating Modules",
      description: "Step-by-step update of modules.",
      progress: 50,
      labels: [1, 3],
      attachments: 2,
      comments: 5,
    },
    {
      id: 5,
      title: "Template Progress",
      description: "Designing cool UI design templates.",
      progress: 75,
      labels: [1, 3],
      attachments: 2,
      comments: 5,
      checklist: [
        { id: 1, title: "Inbox Template", done: true },
        { id: 2, title: "Chat Template", done: true },
        { id: 3, title: "Tasks Template", done: true },
        { id: 4, title: "Projects Template", done: false },
      ],
    },
  ],

  completed: [
    {
      id: 6,
      title: "Refresh Photo Slider",
      slider: true,
      labels: [1, 2],
      attachments: 3,
      comments: 2,
    },
    {
      id: 7,
      title: "Server Startup",
      description:
        "Running the server in test mode and configuring.",
      labels: [1, 3],
      comments: 17,
    },
    {
      id: 8,
      title: "New Background",
      image: backgroundImage,
      labels: [2],
      attachments: 1,
      comments: 2,
    },
  ],
};

const colorOptions = [
  "#ff7272",
  "#42cbb2",
  "#ffc83d",
  "#1f9d45",
  "#27c3d4",
  "#48c774",
  "#95df43",
  "#a855f7",
  "#ec4899",
  "#e5e7eb",
];

function Tasks() {
  const attachmentInput = useRef(null);

  const [tasks, setTasks] = useState(initialTasks);
  const [labels, setLabels] = useState(initialLabels);

  const [view, setView] = useState("board");
  const [selectedTask, setSelectedTask] = useState(null);

  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [assignOpen, setAssignOpen] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [newLabelOpen, setNewLabelOpen] = useState(false);

  const [taskMenu, setTaskMenu] = useState(null);

  const [selectedMembers, setSelectedMembers] = useState([
    "Regina Cooper",
    "Jacob Hawkins",
    "Jane Wilson",
  ]);

  const [selectedLabels, setSelectedLabels] = useState([
    2,
    3,
    4,
  ]);

  const [dueDate, setDueDate] = useState("2020-01-17T10:50");

  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("#1f9d45");

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Jane Wilson",
      text: "Hi Cody, any progress on the project? 😊",
      time: "5 min ago",
    },
    {
      id: 2,
      name: "Jacob Hawkins",
      text: "Hi Jane! Yes. I just finished developing the “Chat” template.",
      time: "1 day ago",
      images: true,
    },
    {
      id: 3,
      name: "Regina Cooper",
      text: "Hi Jacob. Will you be able to finish the last item of the task by tomorrow?",
      time: "5 min ago",
    },
  ]);

  const [checklist, setChecklist] = useState([
    { id: 1, title: "Inbox Template", done: true },
    { id: 2, title: "Chat Template", done: true },
    { id: 3, title: "Tasks Template", done: true },
    { id: 4, title: "Projects Template", done: false },
  ]);

  const [newChecklist, setNewChecklist] = useState("");

  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: "Wireframe UI Kit.zip",
      size: "5.8 MB",
      image: null,
    },
    {
      id: 2,
      name: "Picture 01.png",
      size: "1.2 MB",
      image: slider1,
    },
    {
      id: 3,
      name: "Picture 02.png",
      size: "1.4 MB",
      image: slider2,
    },
  ]);

  const [filterSearch, setFilterSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Completed");

  const allTasks = useMemo(
    () => [
      ...tasks.todo.map((task) => ({
        ...task,
        column: "todo",
        group: "ToDo",
      })),
      ...tasks.progress.map((task) => ({
        ...task,
        column: "progress",
        group: "In Progress",
      })),
      ...tasks.completed.map((task) => ({
        ...task,
        column: "completed",
        group: "Completed",
      })),
    ],
    [tasks]
  );

  const openTask = (task) => {
    setSelectedTask(task);
    setAssignOpen(false);
    setLabelOpen(false);
    setDateOpen(false);
  };

  const addTask = (column) => {
    const task = {
      id: Date.now(),
      title: "New Task",
      description: "New task description.",
      labels: [2],
      attachments: 0,
      comments: 0,
    };

    setTasks((previous) => ({
      ...previous,
      [column]: [...previous[column], task],
    }));
  };

  const completeTask = () => {
    if (!selectedTask) return;

    const sourceColumn =
      selectedTask.column ||
      Object.keys(tasks).find((column) =>
        tasks[column].some((task) => task.id === selectedTask.id)
      );

    if (!sourceColumn) return;

    const completedTask = {
      ...selectedTask,
      column: "completed",
    };

    setTasks((previous) => ({
      ...previous,
      [sourceColumn]: previous[sourceColumn].filter(
        (task) => task.id !== selectedTask.id
      ),
      completed:
        sourceColumn === "completed"
          ? previous.completed
          : [...previous.completed, completedTask],
    }));

    setSelectedTask(completedTask);
  };

  const deleteTask = (task) => {
    setTasks((previous) => ({
      todo: previous.todo.filter((item) => item.id !== task.id),
      progress: previous.progress.filter(
        (item) => item.id !== task.id
      ),
      completed: previous.completed.filter(
        (item) => item.id !== task.id
      ),
    }));

    setTaskMenu(null);

    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
    }
  };

  const toggleMember = (member) => {
    setSelectedMembers((previous) =>
      previous.includes(member)
        ? previous.filter((item) => item !== member)
        : [...previous, member]
    );
  };

  const toggleLabel = (id) => {
    setSelectedLabels((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addLabel = () => {
    if (!labelName.trim()) return;

    const label = {
      id: Date.now(),
      name: labelName,
      color: labelColor,
    };

    setLabels((previous) => [...previous, label]);
    setSelectedLabels((previous) => [...previous, label.id]);
    setLabelName("");
  };

  const toggleChecklist = (id) => {
    setChecklist((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const addChecklistItem = () => {
    if (!newChecklist.trim()) return;

    setChecklist((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: newChecklist,
        done: false,
      },
    ]);

    setNewChecklist("");
  };

  const deleteChecklist = (id) => {
    setChecklist((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const addComment = () => {
    if (!comment.trim()) return;

    setComments((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: "Ronald Robertson",
        text: comment,
        time: "Now",
      },
    ]);

    setComment("");
  };

  const uploadAttachment = (event) => {
    const files = Array.from(event.target.files || []);

    const uploaded = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      image: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setAttachments((previous) => [...previous, ...uploaded]);
    event.target.value = "";
  };

  const removeAttachment = (id) => {
    setAttachments((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const checklistPercentage = Math.round(
    (checklist.filter((item) => item.done).length /
      checklist.length) *
      100
  );

  return (
    <div className="tasks-page">
      <div className="tasks-topbar">
        <div className="task-project-wrapper">
          <button
            className="task-project-button"
            onClick={() => setProjectOpen((previous) => !previous)}
          >
            Design Plan
            <FaChevronDown />
          </button>

          {projectOpen && (
            <div className="task-project-dropdown">
              <h4>Projects</h4>

              <div className="task-popup-search">
                <FaSearch />
                <input placeholder="Search Project..." />
              </div>

              {[
                "Design Plans",
                "Wireframe UI Kit",
                "Admin Dashboard",
                "Sochi - Hotel Booking",
              ].map((project, index) => (
                <button
                  key={project}
                  onClick={() => setProjectOpen(false)}
                >
                  <span>▱</span>
                  {project}
                  {index === 0 && <FaCheck />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="tasks-top-actions">
          <div className="task-member-avatars">
            {["R", "J", "J", "S"].map((member, index) => (
              <span key={`${member}-${index}`}>{member}</span>
            ))}

            <button>
              <FaPlus />
            </button>
          </div>

          <button
            className="task-icon-button"
            onClick={() => setFilterOpen(true)}
          >
            <FaSlidersH />
          </button>

          <div className="task-add-wrapper">
            <button
              className="task-add-button"
              onClick={() =>
                setAddMenuOpen((previous) => !previous)
              }
            >
              Add
              <FaChevronDown />
            </button>

            {addMenuOpen && (
              <div className="task-add-menu">
                <button
                  onClick={() => {
                    addTask("todo");
                    setAddMenuOpen(false);
                  }}
                >
                  Task
                </button>

                <button
                  onClick={() => {
                    setView("board");
                    setAddMenuOpen(false);
                  }}
                >
                  Board
                </button>

                <button
                  onClick={() => setAddMenuOpen(false)}
                >
                  Project
                </button>

                <button
                  onClick={() => setAddMenuOpen(false)}
                >
                  Invite
                </button>
              </div>
            )}
          </div>

          <button
            className="task-icon-button"
            onClick={() =>
              setView((previous) =>
                previous === "board" ? "list" : "board"
              )
            }
          >
            {view === "board" ? <FaList /> : <FaThLarge />}
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div className="task-board">
          <TaskColumn
            title="TODO"
            color="#ffc83d"
            tasks={tasks.todo}
            labels={labels}
            onTask={openTask}
            onAdd={() => addTask("todo")}
            taskMenu={taskMenu}
            setTaskMenu={setTaskMenu}
            onDelete={deleteTask}
          />

          <TaskColumn
            title="IN PROGRESS"
            color="#27c3d4"
            tasks={tasks.progress}
            labels={labels}
            onTask={openTask}
            onAdd={() => addTask("progress")}
            taskMenu={taskMenu}
            setTaskMenu={setTaskMenu}
            onDelete={deleteTask}
          />

          <TaskColumn
            title="COMPLETED"
            color="#48c774"
            tasks={tasks.completed}
            labels={labels}
            onTask={openTask}
            onAdd={() => addTask("completed")}
            taskMenu={taskMenu}
            setTaskMenu={setTaskMenu}
            onDelete={deleteTask}
          />
        </div>
      ) : (
        <div className="task-list-view">
          {[
            ["ToDo", "todo"],
            ["In Progress", "progress"],
            ["Completed", "completed"],
          ].map(([title, column]) => (
            <section className="task-list-section" key={column}>
              <div className="task-list-heading">
                <h3>
                  <FaChevronDown />
                  {title} ({tasks[column].length})
                </h3>

                <FaEllipsisH />
              </div>

              {tasks[column].map((task) => (
                <button
                  className="task-list-row"
                  key={task.id}
                  onClick={() =>
                    openTask({
                      ...task,
                      column,
                    })
                  }
                >
                  <span className="task-list-check">
                    {column === "completed" && <FaCheck />}
                  </span>

                  <strong>{task.title}</strong>

                  <div className="task-list-row-right">
                    <span>
                      <FaCalendarAlt />
                      Jun 17
                    </span>

                    <div className="task-list-labels">
                      {(task.labels || []).map((id) => {
                        const label = labels.find(
                          (item) => item.id === id
                        );

                        return label ? (
                          <i
                            key={id}
                            style={{
                              backgroundColor: label.color,
                            }}
                          />
                        ) : null;
                      })}
                    </div>

                    <span className="task-mini-avatar">J</span>
                    <span className="task-mini-avatar">R</span>
                  </div>
                </button>
              ))}

              <button
                className="task-list-add"
                onClick={() => addTask(column)}
              >
                <FaPlus />
                Add Task
              </button>
            </section>
          ))}
        </div>
      )}

      {filterOpen && (
        <>
          <div
            className="task-filter-overlay"
            onClick={() => setFilterOpen(false)}
          />

          <aside className="task-filter-panel">
            <div className="task-filter-title">
              <h2>Filter</h2>

              <button onClick={() => setFilterOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="task-filter-search">
              <FaSearch />

              <input
                placeholder="Search Tasks..."
                value={filterSearch}
                onChange={(event) =>
                  setFilterSearch(event.target.value)
                }
              />
            </div>

            <label>Labels</label>

            <div className="task-filter-labels">
              {labels.slice(1).map((label) => (
                <button
                  key={label.id}
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                  {selectedLabels.includes(label.id) && (
                    <FaCheck />
                  )}
                </button>
              ))}
            </div>

            <label>Members</label>

            <div className="task-filter-field">
              <span className="task-mini-avatar">S</span>
              Shane Black
              <FaTimes />
            </div>

            <label>Due Date</label>

            <div className="task-filter-field">
              <FaCalendarAlt />
              Due anytime
              <FaChevronDown />
            </div>

            <label>Status</label>

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
            >
              <option>Completed</option>
              <option>ToDo</option>
              <option>In Progress</option>
            </select>

            <div className="task-filter-actions">
              <button onClick={() => setFilterOpen(false)}>
                Apply Filters
              </button>

              <button
                onClick={() => {
                  setFilterSearch("");
                  setFilterStatus("Completed");
                }}
              >
                Reset all Filters
              </button>
            </div>
          </aside>
        </>
      )}

      {selectedTask && (
        <div className="task-modal-overlay">
          <div className="task-details-modal">
            <div className="task-details-header">
              <button
                className="task-complete-button"
                onClick={completeTask}
              >
                <FaCheck />
                Complete
              </button>

              <button className="task-watch-button">
                <FaEye />
                2
                <FaChevronDown />
              </button>

              <div className="task-details-header-right">
                <button>
                  <FaLink />
                </button>

                <button>
                  <FaEllipsisH />
                </button>

                <button onClick={() => setSelectedTask(null)}>
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="task-details-layout">
              <main className="task-details-main">
                <h2>{selectedTask.title}</h2>

                <div className="task-mobile-info">
                  <TaskInfo
                    labels={labels}
                    selectedLabels={selectedLabels}
                    selectedMembers={selectedMembers}
                    dueDate={dueDate}
                    setAssignOpen={setAssignOpen}
                    setLabelOpen={setLabelOpen}
                    setDateOpen={setDateOpen}
                  />
                </div>

                <section className="task-description-section">
                  <h4>DESCRIPTION</h4>

                  <p>
                    We need to develop several options (Inbox
                    template, Chat template, Tasks template,
                    Projects template) of cool user interface
                    design templates – to carefully work out the
                    smallest details.
                  </p>
                </section>

                <section className="task-checklist-section">
                  <h4>CHECKLIST ({checklistPercentage}%)</h4>

                  <div className="task-progress-track">
                    <div
                      style={{
                        width: `${checklistPercentage}%`,
                      }}
                    />
                  </div>

                  {checklist.map((item) => (
                    <div
                      className={`task-checklist-row ${
                        item.done ? "completed" : ""
                      }`}
                      key={item.id}
                    >
                      <button
                        onClick={() =>
                          toggleChecklist(item.id)
                        }
                      >
                        {item.done ? <FaCheck /> : null}
                      </button>

                      <span>{item.title}</span>

                      <FaEllipsisH />

                      <button
                        onClick={() =>
                          deleteChecklist(item.id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}

                  <div className="task-new-checklist">
                    <FaPlus />

                    <input
                      placeholder="Add Checklist Item"
                      value={newChecklist}
                      onChange={(event) =>
                        setNewChecklist(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          addChecklistItem();
                        }
                      }}
                    />
                  </div>
                </section>

                <section className="task-attachments-section">
                  <h4>ATTACHMENTS</h4>

                  {attachments.map((attachment) => (
                    <div
                      className="task-attachment-row"
                      key={attachment.id}
                    >
                      {attachment.image ? (
                        <img
                          src={attachment.image}
                          alt={attachment.name}
                        />
                      ) : (
                        <div className="task-file-icon">
                          <FaPaperclip />
                        </div>
                      )}

                      <div>
                        <strong>{attachment.name}</strong>
                        <span>
                          Uploaded on 15.01.2020 at 11:50
                        </span>
                        <small>{attachment.size}</small>
                      </div>

                      <button>
                        <FaDownload />
                      </button>

                      <button
                        onClick={() =>
                          removeAttachment(attachment.id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}

                  <input
                    ref={attachmentInput}
                    type="file"
                    multiple
                    hidden
                    onChange={uploadAttachment}
                  />

                  <button
                    className="task-text-action"
                    onClick={() =>
                      attachmentInput.current?.click()
                    }
                  >
                    <FaPlus />
                    Add Attachment
                  </button>
                </section>

                <section className="task-comments-section">
                  <div className="task-comment-tabs">
                    <button className="active">COMMENTS</button>
                    <button>ACTIVITY</button>
                  </div>

                  <div className="task-comment-box">
                    <textarea
                      placeholder="Add Comment..."
                      value={comment}
                      onChange={(event) =>
                        setComment(event.target.value)
                      }
                    />

                    <div>
                      <button onClick={addComment}>Comment</button>

                      <span>
                        <FaPaperclip />
                        <FaSmile />
                        <FaImage />
                      </span>
                    </div>
                  </div>

                  {comments.map((item) => (
                    <div className="task-comment" key={item.id}>
                      <span className="task-comment-avatar">
                        {item.name.charAt(0)}
                      </span>

                      <div>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.time}</small>
                        </div>

                        <p>{item.text}</p>

                        {item.images && (
                          <div className="task-comment-images">
                            <img src={slider1} alt="" />
                            <img src={slider2} alt="" />
                            <img src={slider3} alt="" />
                            <span>+3</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              </main>

              <aside className="task-details-side">
                <TaskInfo
                  labels={labels}
                  selectedLabels={selectedLabels}
                  selectedMembers={selectedMembers}
                  dueDate={dueDate}
                  setAssignOpen={setAssignOpen}
                  setLabelOpen={setLabelOpen}
                  setDateOpen={setDateOpen}
                />

                <div className="task-created-time">
                  <strong>Created</strong>
                  <span>January 2, 2020 4:30 PM</span>

                  <strong>Updated</strong>
                  <span>January 2, 2020 4:55 PM</span>
                </div>
              </aside>
            </div>

            {assignOpen && (
              <div className="task-assign-popup">
                <h4>Assign To</h4>

                <div className="task-popup-search">
                  <FaSearch />
                  <input placeholder="Find Person..." />
                </div>

                {members.map((member) => (
                  <button
                    key={member}
                    onClick={() => toggleMember(member)}
                  >
                    <span className="task-mini-avatar">
                      {member.charAt(0)}
                    </span>

                    {member}

                    {selectedMembers.includes(member) && (
                      <FaCheck />
                    )}
                  </button>
                ))}
              </div>
            )}

            {labelOpen && (
              <div className="task-label-popup">
                <h4>Labels</h4>

                <div className="task-popup-search">
                  <FaSearch />
                  <input placeholder="Search Label..." />
                </div>

                {labels.slice(1).map((label) => (
                  <button
                    key={label.id}
                    onClick={() => toggleLabel(label.id)}
                  >
                    <span
                      style={{
                        backgroundColor: label.color,
                      }}
                    >
                      {label.name}
                    </span>

                    {selectedLabels.includes(label.id) && (
                      <FaCheck />
                    )}
                  </button>
                ))}

                <button
                  className="task-add-label-button"
                  onClick={() => {
                    setLabelOpen(false);
                    setNewLabelOpen(true);
                  }}
                >
                  Add New Label
                </button>
              </div>
            )}

            {dateOpen && (
              <div className="task-date-popup">
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                />

                <button
                  onClick={() => {
                    setDueDate("");
                    setDateOpen(false);
                  }}
                >
                  Clear Due Date
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {newLabelOpen && (
        <div className="task-modal-overlay task-label-overlay">
          <div className="task-new-label-modal">
            <div className="task-new-label-title">
              <h2>Add New Label</h2>

              <button onClick={() => setNewLabelOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {labels.map((label) => (
              <div className="task-label-editor-row" key={label.id}>
                <i
                  style={{
                    backgroundColor: label.color,
                  }}
                />

                <span>{label.name}</span>

                <FaSlidersH />

                <button
                  onClick={() =>
                    setLabels((previous) =>
                      previous.filter(
                        (item) => item.id !== label.id
                      )
                    )
                  }
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <div className="task-label-editor-row">
              <i
                style={{
                  backgroundColor: labelColor,
                }}
              />

              <input
                placeholder="Type a name label..."
                value={labelName}
                onChange={(event) =>
                  setLabelName(event.target.value)
                }
              />
            </div>

            <button
              className="task-text-action"
              onClick={addLabel}
            >
              <FaPlus />
              Add Label
            </button>

            <div className="task-label-colors">
              <h4>Change Color</h4>

              <div>
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={
                      labelColor === color ? "active" : ""
                    }
                    style={{ backgroundColor: color }}
                    onClick={() => setLabelColor(color)}
                  />
                ))}
              </div>
            </div>

            <button
              className="task-label-done"
              onClick={() => setNewLabelOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskInfo({
  labels,
  selectedLabels,
  selectedMembers,
  dueDate,
  setAssignOpen,
  setLabelOpen,
  setDateOpen,
}) {
  return (
    <div className="task-info-content">
      <div className="task-info-block">
        <div className="task-info-heading">
          <h4>CREATED BY</h4>
        </div>

        <div className="task-created-user">
          <span className="task-mini-avatar">S</span>
          Shane Black
        </div>
      </div>

      <div className="task-info-block">
        <div className="task-info-heading">
          <h4>ASSIGNED TO</h4>

          <button onClick={() => setAssignOpen(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="task-assigned-avatars">
          {selectedMembers.slice(0, 3).map((member) => (
            <button
              key={member}
              className="task-mini-avatar"
              onClick={() => setAssignOpen(true)}
            >
              {member.charAt(0)}
            </button>
          ))}
        </div>
      </div>

      <div className="task-info-block">
        <div className="task-info-heading">
          <h4>DUE DATE</h4>
        </div>

        <button
          className="task-due-date"
          onClick={() => setDateOpen(true)}
        >
          <FaCalendarAlt />
          {dueDate
            ? "Jan 17, 2020, 10:50 AM"
            : "Add Due Date"}
          <FaChevronDown />
        </button>
      </div>

      <div className="task-info-block">
        <div className="task-info-heading">
          <h4>LABELS</h4>

          <button onClick={() => setLabelOpen(true)}>
            <FaPlus />
          </button>
        </div>

        <div className="task-selected-labels">
          {selectedLabels.map((id) => {
            const label = labels.find((item) => item.id === id);

            return label ? (
              <span
                key={label.id}
                style={{
                  backgroundColor: label.color,
                }}
              >
                {label.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  color,
  tasks,
  labels,
  onTask,
  onAdd,
  taskMenu,
  setTaskMenu,
  onDelete,
}) {
  return (
    <section className="task-column">
      <div
        className="task-column-color"
        style={{ backgroundColor: color }}
      />

      <div className="task-column-heading">
        <h3>
          {title}
          <span>{tasks.length}</span>
        </h3>

        <FaEllipsisH />
      </div>

      <div className="task-column-cards">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            labels={labels}
            onTask={() => onTask(task)}
            taskMenu={taskMenu}
            setTaskMenu={setTaskMenu}
            onDelete={() => onDelete(task)}
          />
        ))}
      </div>

      <button className="task-column-add" onClick={onAdd}>
        <FaPlus />
      </button>
    </section>
  );
}

function TaskCard({
  task,
  labels,
  onTask,
  taskMenu,
  setTaskMenu,
  onDelete,
}) {
  return (
    <article className="task-card" onClick={onTask}>
      <div className="task-card-top">
        <div className="task-card-label-lines">
          {(task.labels || []).slice(0, 2).map((id) => {
            const label = labels.find((item) => item.id === id);

            return label ? (
              <i
                key={id}
                style={{
                  backgroundColor: label.color,
                }}
              />
            ) : null;
          })}
        </div>

        <span>
          <FaCalendarAlt />
          Jun 17
        </span>
      </div>

      <h4>{task.title}</h4>

      {task.description && <p>{task.description}</p>}

      {task.image && (
        <img
          className="task-card-image"
          src={task.image}
          alt={task.title}
        />
      )}

      {task.slider && (
        <div className="task-slider-images">
          <img src={slider1} alt="" />
          <img src={slider2} alt="" />
          <img src={slider3} alt="" />
        </div>
      )}

      {task.progress && (
        <div className="task-card-progress-section">
          <div>
            <span>SUB-TASKS: 4</span>
            <span>{task.progress}%</span>
          </div>

          <div className="task-card-progress">
            <i
              style={{
                width: `${task.progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {task.checklist && (
        <div className="task-card-checklist">
          {task.checklist.map((item) => (
            <div key={item.id}>
              <span>{item.title}</span>

              <i className={item.done ? "done" : ""}>
                {item.done && <FaCheck />}
              </i>
            </div>
          ))}
        </div>
      )}

      <div className="task-card-footer">
        <div>
          {task.attachments > 0 && (
            <span>
              <FaPaperclip />
              {task.attachments}
            </span>
          )}

          {task.comments > 0 && (
            <span>
              <FaCommentAlt />
              {task.comments}
            </span>
          )}
        </div>

        <div className="task-card-avatars">
          <span>J</span>
          <span>R</span>
        </div>
      </div>

      <div className="task-card-menu-wrapper">
        <button
          onClick={(event) => {
            event.stopPropagation();

            setTaskMenu(
              taskMenu === task.id ? null : task.id
            );
          }}
        >
          <FaEllipsisH />
        </button>

        {taskMenu === task.id && (
          <div
            className="task-card-menu"
            onClick={(event) => event.stopPropagation()}
          >
            <button>Move</button>
            <button>Sort Tasks</button>
            <button>Complete Tasks</button>
            <button>Archive Tasks</button>

            <button
              className="delete"
              onClick={onDelete}
            >
              <FaTrash />
              Delete Tasks
            </button>

            <div className="task-menu-colors">
              {colorOptions.map((color) => (
                <i
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default Tasks;