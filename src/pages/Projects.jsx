import { useMemo, useState } from "react";
import {
  FaPlus,
  FaSlidersH,
  FaThLarge,
  FaList,
  FaEllipsisH,
  FaSearch,
  FaTimes,
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaCopy,
  FaCommentAlt,
  FaFileAlt,
  FaDownload,
  FaPaperclip,
  FaSmile,
  FaImage,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import "./Projects.css";

const initialProjects = [
  {
    id: 1,
    icon: "◆",
    iconClass: "dropbox",
    name: "App Development",
    company: "Dropbox, Inc.",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
    creator: "Shane Black",
    budget: "2.500.000",
    members: ["SB", "JW", "RR"],
  },
  {
    id: 2,
    icon: "🦊",
    iconClass: "gitlab",
    name: "Website Redesign",
    company: "GitLab Inc.",
    description:
      "It is necessary to develop a website redesign in a corporate style.",
    progress: 75,
    status: "Started",
    deadline: "1 week left",
    creator: "Jane Wilson",
    budget: "1.800.000",
    members: ["JW", "RC", "RR"],
  },
  {
    id: 3,
    icon: "▣",
    iconClass: "bitbucket",
    name: "Landing Page",
    company: "Bitbucket, Inc.",
    description:
      "It is necessary to create a landing together with the development of design.",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
    creator: "Shane Black",
    budget: "3.200.000",
    members: ["SB", "JW"],
  },
  {
    id: 4,
    icon: "🐍",
    iconClass: "python",
    name: "Parser Development",
    company: "Driveway, Inc.",
    description:
      "It is necessary to develop a ticket site parser in python.",
    progress: 50,
    status: "On Hold",
    deadline: "5 days left",
    creator: "Jacob Hawkins",
    budget: "1.200.000",
    members: ["JH", "JW", "RC"],
  },
  {
    id: 5,
    icon: "✣",
    iconClass: "slack",
    name: "App Development",
    company: "Slack Technologies, Inc.",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "5 days left",
    creator: "Jacob Hawkins",
    budget: "2.100.000",
    members: ["JH", "RR"],
  },
  {
    id: 6,
    icon: "🔥",
    iconClass: "firebase",
    name: "App Development",
    company: "Google, Inc.",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 25,
    status: "On Hold",
    deadline: "1 week left",
    creator: "Ronald Robertson",
    budget: "2.500.000",
    members: ["RR", "JW"],
  },
  {
    id: 7,
    icon: "A",
    iconClass: "angular",
    name: "Admin Dashboard",
    company: "ArtTemplate, Inc.",
    description:
      "Necessary to create Admin Dashboard on Angular 8.",
    progress: 30,
    status: "Started",
    deadline: "1 week left",
    creator: "Shane Black",
    budget: "4.000.000",
    members: ["SB", "RC"],
  },
  {
    id: 8,
    icon: "V",
    iconClass: "vue",
    name: "Web App on Vue.js",
    company: "ArtTemplate, Inc.",
    description:
      "It is necessary to develop a web app on the framework Vue.js",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
    creator: "Robert Edwards",
    budget: "3.000.000",
    members: ["RE", "JW"],
  },
  {
    id: 9,
    icon: "●",
    iconClass: "facebook",
    name: "App Development",
    company: "Facebook, Inc.",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
    creator: "Ronald Robertson",
    budget: "2.800.000",
    members: ["RR", "SB", "JW"],
  },
];

const initialChecklist = [
  { id: 1, title: "Create wireframes", done: true },
  { id: 2, title: "UI/UX design development", done: true },
  { id: 3, title: "Layout design", done: true },
  { id: 4, title: "Functional programming", done: false },
  { id: 5, title: "Testing for possible errors", done: false },
  { id: 6, title: "Final debugging applications", done: false },
];

const ganttInitial = [
  {
    id: 1,
    title: "Planning",
    start: 0,
    width: 22,
    progress: 100,
    type: "green",
    group: "Planning",
  },
  {
    id: 2,
    title: "Wireframing",
    start: 0,
    width: 28,
    progress: 100,
    type: "blue",
    group: "Wireframing",
  },
  {
    id: 3,
    title: "Design",
    start: 8,
    width: 45,
    progress: 60,
    type: "yellow",
    group: "Design",
  },
  {
    id: 4,
    title: "Font Research",
    start: 15,
    width: 28,
    progress: 100,
    type: "yellow",
    group: "Design",
  },
  {
    id: 5,
    title: "Color Palette",
    start: 15,
    width: 34,
    progress: 80,
    type: "yellow",
    group: "Design",
  },
  {
    id: 6,
    title: "Mockup",
    start: 23,
    width: 26,
    progress: 25,
    type: "yellow",
    group: "Design",
  },
  {
    id: 7,
    title: "User Interface",
    start: 31,
    width: 36,
    progress: 50,
    type: "green",
    group: "Design",
  },
  {
    id: 8,
    title: "Illustrations",
    start: 39,
    width: 28,
    progress: 100,
    type: "yellow",
    group: "Design",
  },
  {
    id: 9,
    title: "Animated UI Flow",
    start: 15,
    width: 28,
    progress: 0,
    type: "yellow",
    group: "Design",
  },
  {
    id: 10,
    title: "Development",
    start: 54,
    width: 44,
    progress: 50,
    type: "aqua",
    group: "Development",
  },
  {
    id: 11,
    title: "Testing",
    start: 69,
    width: 31,
    progress: 0,
    type: "purple",
    group: "Testing",
  },
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState("All");
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const [projectMenu, setProjectMenu] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [checklist, setChecklist] = useState(initialChecklist);
  const [newChecklist, setNewChecklist] = useState("");

  const [commentTab, setCommentTab] = useState("comments");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Jane Wilson",
      time: "5 min ago",
      text: "Hi Cody, any progress on the project? 😊",
    },
    {
      id: 2,
      name: "Jacob Hawkins",
      time: "1 day ago",
      text: "Hi Jane! Yes. I just finished developing the Chat template.",
    },
  ]);

  const [ganttTasks, setGanttTasks] = useState(ganttInitial);
  const [ganttMenu, setGanttMenu] = useState(null);
  const [taskPreview, setTaskPreview] = useState(null);
  const [designOpen, setDesignOpen] = useState(true);

  const emptyProject = {
    name: "",
    company: "",
    description: "",
    status: "Started",
    progress: 0,
    deadline: "1 week left",
    creator: "Shane Black",
    budget: "",
    members: ["SB"],
  };

  const [projectForm, setProjectForm] = useState(emptyProject);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.company.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All" || project.status === activeTab;

      const matchesFilter =
        filterStatus === "All" || project.status === filterStatus;

      return matchesSearch && matchesTab && matchesFilter;
    });
  }, [projects, search, activeTab, filterStatus]);

  const createProject = (event) => {
    event.preventDefault();

    if (!projectForm.name.trim()) return;

    setProjects((previous) => [
      ...previous,
      {
        ...projectForm,
        id: Date.now(),
        icon: "◆",
        iconClass: "dropbox",
        progress: Number(projectForm.progress) || 0,
      },
    ]);

    setProjectForm(emptyProject);
    setAddModal(false);
  };

  const saveProject = (event) => {
    event.preventDefault();

    setProjects((previous) =>
      previous.map((project) =>
        project.id === editProject.id ? editProject : project
      )
    );

    if (selectedProject?.id === editProject.id) {
      setSelectedProject(editProject);
    }

    setEditProject(null);
  };

  const deleteProject = (id) => {
    setProjects((previous) =>
      previous.filter((project) => project.id !== id)
    );

    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    setProjectMenu(null);
  };

  const addMember = (id) => {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === id
          ? {
              ...project,
              members: [...project.members, "NW"],
            }
          : project
      )
    );

    setProjectMenu(null);
  };

  const addDueDate = (id) => {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === id
          ? { ...project, deadline: "10 days left" }
          : project
      )
    );

    setProjectMenu(null);
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
      {
        id: Date.now(),
        name: "Ronald Robertson",
        time: "Just now",
        text: comment,
      },
      ...previous,
    ]);

    setComment("");
  };

  const duplicateTask = (task) => {
    setGanttTasks((previous) => [
      ...previous,
      {
        ...task,
        id: Date.now(),
        title: `${task.title} Copy`,
      },
    ]);

    setGanttMenu(null);
  };

  const deleteTask = (id) => {
    setGanttTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );

    setGanttMenu(null);
  };

  const addSubtask = (task) => {
    setGanttTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: "New Subtask",
        start: task.start + 5,
        width: 20,
        progress: 0,
        type: task.type,
        group: task.group,
      },
    ]);

    setGanttMenu(null);
  };

  const changeTaskColor = (id, type) => {
    setGanttTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, type } : task
      )
    );

    setGanttMenu(null);
  };

  const tabs = ["All", "Started", "On Hold", "Completed"];

  const ProjectCard = ({ project }) => (
    <article
      className="project-card"
      onDoubleClick={() => setSelectedProject(project)}
    >
      <div className="project-card-header">
        <div className={`project-logo ${project.iconClass}`}>
          {project.icon}
        </div>

        <div className="project-title-info">
          <h3>{project.name}</h3>
          <span>{project.company}</span>
        </div>

        <div className="project-menu-wrapper">
          <button
            type="button"
            className="project-more"
            onClick={() =>
              setProjectMenu(
                projectMenu === project.id ? null : project.id
              )
            }
          >
            <FaEllipsisH />
          </button>

          {projectMenu === project.id && (
            <div className="project-dropdown">
              <button
                onClick={() => {
                  setEditProject({ ...project });
                  setProjectMenu(null);
                }}
              >
                <FaEdit />
                Edit
              </button>

              <button onClick={() => addMember(project.id)}>
                <FaUserPlus />
                Add Member
              </button>

              <button onClick={() => addDueDate(project.id)}>
                <FaCalendarAlt />
                Add Due Date
              </button>

              <button
                onClick={() => {
                  setSelectedProject(project);
                  setProjectMenu(null);
                }}
              >
                <FaFileAlt />
                Project Details
              </button>

              <button
                className="delete-option"
                onClick={() => deleteProject(project.id)}
              >
                <FaTrash />
                Delete Project
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-progress-title">
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>

      <div className="project-progress">
        <div style={{ width: `${project.progress}%` }} />
      </div>

      <div className="project-card-footer">
        <div className="project-members">
          {project.members.map((member, index) => (
            <span key={`${member}-${index}`}>{member}</span>
          ))}
        </div>

        <span
          className={`project-deadline ${
            project.deadline.includes("5") ? "urgent" : ""
          }`}
        >
          <FaClock />
          {project.deadline}
        </span>
      </div>
    </article>
  );

  if (view === "gantt") {
    return (
      <div className="projects-page gantt-page">
        <div className="gantt-header">
          <button className="design-plan-button">
            Design Plan
            <FaChevronDown />
          </button>

          <h2>
            September <span>2020</span>
          </h2>

          <div className="projects-header-actions">
            <button
              className="filter-button"
              onClick={() => setView("grid")}
            >
              <FaThLarge />
            </button>

            <button
              className="add-project-button"
              onClick={() => setAddModal(true)}
            >
              <FaPlus />
              Add Project
            </button>
          </div>
        </div>

        <div className="gantt-board">
          <div className="gantt-sidebar">
            <span className="gantt-project-label">PROJECT NAME</span>

            <button>
              <FaChevronRight />
              Planning
            </button>

            <button>
              <FaChevronRight />
              Wireframing
            </button>

            <button
              onClick={() => setDesignOpen((previous) => !previous)}
            >
              {designOpen ? <FaChevronDown /> : <FaChevronRight />}
              Design
            </button>

            {designOpen && (
              <div className="gantt-subtasks">
                <span>Font Research</span>
                <span>Color Palette</span>
                <span>Mockup</span>
                <span>User Interface</span>
                <span>Illustrations</span>
                <span>Animated UI Flow</span>
              </div>
            )}

            <button>
              <FaChevronRight />
              Development
            </button>

            <button>
              <FaChevronRight />
              Testing
            </button>

            <button className="gantt-add-list">
              <FaPlus />
              Add List
            </button>
          </div>

          <div className="gantt-content">
            <div className="gantt-days">
              {[
                "MO 3",
                "TU 4",
                "WE 5",
                "TH 6",
                "FR 7",
                "SA 8",
                "SU 9",
                "MO 10",
                "TU 11",
                "WE 12",
                "TH 13",
                "FR 14",
                "SA 15",
                "SU 16",
              ].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="gantt-grid">
              {ganttTasks
                .filter(
                  (task) =>
                    designOpen || task.group !== "Design"
                )
                .map((task) => (
                  <div className="gantt-row" key={task.id}>
                    <button
                      className={`gantt-bar ${task.type}`}
                      style={{
                        marginLeft: `${task.start}%`,
                        width: `${task.width}%`,
                      }}
                      onClick={() => setTaskPreview(task)}
                    >
                      <span>{task.title}</span>
                      <small>{task.progress}%</small>
                    </button>

                    <button
                      className="gantt-more"
                      onClick={() =>
                        setGanttMenu(
                          ganttMenu === task.id ? null : task.id
                        )
                      }
                    >
                      <FaEllipsisH />
                    </button>

                    {ganttMenu === task.id && (
                      <div className="gantt-task-menu">
                        <button
                          onClick={() => {
                            const title = window.prompt(
                              "Edit task title",
                              task.title
                            );

                            if (title) {
                              setGanttTasks((previous) =>
                                previous.map((item) =>
                                  item.id === task.id
                                    ? { ...item, title }
                                    : item
                                )
                              );
                            }

                            setGanttMenu(null);
                          }}
                        >
                          <FaEdit />
                          Edit Title
                        </button>

                        <button onClick={() => addSubtask(task)}>
                          <FaPlus />
                          Add Subtask
                        </button>

                        <button onClick={() => setGanttMenu(null)}>
                          <FaUserPlus />
                          Add Member
                        </button>

                        <button onClick={() => duplicateTask(task)}>
                          <FaCopy />
                          Duplicate
                        </button>

                        <button
                          className="delete-option"
                          onClick={() => deleteTask(task.id)}
                        >
                          <FaTrash />
                          Delete Task
                        </button>

                        <div className="task-colors">
                          {[
                            "green",
                            "blue",
                            "yellow",
                            "aqua",
                            "purple",
                          ].map((type) => (
                            <button
                              key={type}
                              className={`task-color ${type}`}
                              onClick={() =>
                                changeTaskColor(task.id, type)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="gantt-controls">
              <button>Today</button>
              <button>−</button>
              <span>Days</span>
              <button>+</button>
            </div>
          </div>
        </div>

        {taskPreview && (
          <div className="task-preview">
            <button
              className="task-preview-close"
              onClick={() => setTaskPreview(null)}
            >
              <FaTimes />
            </button>

            <h3>{taskPreview.title}</h3>

            <p>
              <FaCalendarAlt />
              03 Sep, 2020 — 07 Sep, 2020
            </p>

            <p>
              <FaCheck />
              Tasks: {taskPreview.progress}/100
            </p>

            <div className="preview-members">
              <span>JW</span>
              <span>SB</span>
              <span>RR</span>
            </div>
          </div>
        )}

        {addModal && renderProjectModal()}
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="project-details-page">
        <aside className="details-project-list">
          <div className="details-search">
            <FaSearch />
            <input
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {filteredProjects.map((project) => (
            <button
              key={project.id}
              className={`details-project-item ${
                selectedProject.id === project.id ? "active" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={`project-logo ${project.iconClass}`}>
                {project.icon}
              </div>

              <div>
                <strong>{project.name}</strong>
                <span>{project.company}</span>

                <div className="mini-members">
                  {project.members.map((member, index) => (
                    <i key={`${member}-${index}`}>{member}</i>
                  ))}
                </div>
              </div>

              <small>
                <FaClock />
                {project.deadline}
              </small>
            </button>
          ))}
        </aside>

        <main className="project-details-content">
          <div className="details-heading">
            <div>
              <div
                className={`project-logo ${selectedProject.iconClass}`}
              >
                {selectedProject.icon}
              </div>

              <div>
                <h2>{selectedProject.name}</h2>
                <span>{selectedProject.company}</span>
              </div>
            </div>

            <button
              className="close-details"
              onClick={() => setSelectedProject(null)}
            >
              <FaTimes />
            </button>
          </div>

          <section className="project-details-summary">
            <h4>DETAILS</h4>

            <div className="details-stats">
              <div>
                <span>$</span>
                <p>
                  Budget
                  <strong>{selectedProject.budget}</strong>
                </p>
              </div>

              <div>
                <FaCalendarAlt />
                <p>
                  Start Date
                  <strong>17 Jun, 2020</strong>
                </p>
              </div>

              <div>
                <FaCalendarAlt />
                <p>
                  End Date
                  <strong>04 Jul, 2020</strong>
                </p>
              </div>
            </div>

            <h4>DESCRIPTION</h4>
            <p className="details-description">
              You need to develop an application on something like
              React native, so that it is for Android and IOS. There
              are about 30 screens, the design and layout in the
              sketch is ready. The main pages are login, getting a
              task, a list of tasks, a map, a history of tasks,
              calling the camera to complete a task.
            </p>

            <h4>CHECKLIST ({Math.round(
              (checklist.filter((item) => item.done).length /
                checklist.length) *
                100
            ) || 0}%)</h4>

            <div className="checklist-progress">
              <div
                style={{
                  width: `${
                    (checklist.filter((item) => item.done).length /
                      checklist.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="checklist">
              {checklist.map((item) => (
                <div className="checklist-item" key={item.id}>
                  <button
                    className={item.done ? "checked" : ""}
                    onClick={() => toggleChecklist(item.id)}
                  >
                    {item.done && <FaCheck />}
                  </button>

                  <span className={item.done ? "done" : ""}>
                    {item.title}
                  </span>

                  <button
                    className="checklist-delete"
                    onClick={() => deleteChecklist(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <div className="add-checklist">
                <input
                  placeholder="New checklist item..."
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

                <button onClick={addChecklistItem}>
                  <FaPlus />
                  Add Checklist Item
                </button>
              </div>
            </div>
          </section>

          <section className="project-comments">
            <div className="comment-tabs">
              <button
                className={
                  commentTab === "comments" ? "active" : ""
                }
                onClick={() => setCommentTab("comments")}
              >
                COMMENTS
              </button>

              <button
                className={
                  commentTab === "activity" ? "active" : ""
                }
                onClick={() => setCommentTab("activity")}
              >
                ACTIVITY
              </button>
            </div>

            {commentTab === "comments" ? (
              <>
                <div className="comment-editor">
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

                <div className="comments-list">
                  {comments.map((item) => (
                    <div className="comment-item" key={item.id}>
                      <div className="comment-avatar">
                        {item.name.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {item.name}
                          <small>{item.time}</small>
                        </strong>

                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="activity-list">
                <p>Jane Wilson updated project details.</p>
                <p>Shane Black completed a checklist item.</p>
                <p>Ronald Robertson added a new comment.</p>
              </div>
            )}
          </section>
        </main>

        <aside className="project-details-right">
          <select
            value={selectedProject.status}
            onChange={(event) => {
              const updated = {
                ...selectedProject,
                status: event.target.value,
              };

              setSelectedProject(updated);

              setProjects((previous) =>
                previous.map((project) =>
                  project.id === updated.id ? updated : project
                )
              );
            }}
          >
            <option>Started</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>

          <section>
            <div className="details-side-title">
              <h4>MEMBERS</h4>
              <button onClick={() => addMember(selectedProject.id)}>
                <FaPlus />
              </button>
            </div>

            {[
              "Jacob Hawkins",
              "Regina Cooper",
              "Jane Wilson",
              "Ronald Robertson",
              "Dustin Williamson",
              "Robert Edwards",
            ].map((member) => (
              <div className="details-member" key={member}>
                <span>{member.charAt(0)}</span>

                <div>
                  <strong>{member}</strong>
                  <small>Project Manager</small>
                </div>
              </div>
            ))}
          </section>

          <section>
            <div className="details-side-title">
              <h4>FILES</h4>
              <button>
                <FaPlus />
              </button>
            </div>

            {[
              "Wireframe UI Kit.zip",
              "Brand Styles Guide.pdf",
              "Rocket – Admin Dashboard.fig",
              "Picture 01.png",
              "Picture 02.png",
            ].map((file) => (
              <div className="details-file" key={file}>
                <FaFileAlt />

                <div>
                  <strong>{file}</strong>
                  <small>5.8 MB</small>
                </div>

                <button>
                  <FaDownload />
                </button>
              </div>
            ))}
          </section>
        </aside>

        {editProject && renderEditModal()}
      </div>
    );
  }

  function renderProjectModal() {
    return (
      <div className="project-modal-overlay">
        <form
          className="project-modal"
          onSubmit={createProject}
        >
          <div className="project-modal-heading">
            <h2>Add Project</h2>

            <button
              type="button"
              onClick={() => setAddModal(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="project-upload-logo">
            <FaPlus />
          </div>

          <label>Project Name</label>
          <input
            value={projectForm.name}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                name: event.target.value,
              })
            }
            placeholder="App Development"
            required
          />

          <label>Client Name</label>
          <input
            value={projectForm.company}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                company: event.target.value,
              })
            }
            placeholder="Dropbox, Inc."
            required
          />

          <label>Description</label>
          <textarea
            value={projectForm.description}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                description: event.target.value,
              })
            }
            placeholder="Project description"
          />

          <div className="project-modal-fields">
            <div>
              <label>Status</label>

              <select
                value={projectForm.status}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    status: event.target.value,
                  })
                }
              >
                <option>Started</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label>Progress</label>

              <input
                type="number"
                min="0"
                max="100"
                value={projectForm.progress}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    progress: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <label>Budget</label>
          <input
            value={projectForm.budget}
            onChange={(event) =>
              setProjectForm({
                ...projectForm,
                budget: event.target.value,
              })
            }
            placeholder="$ 2.500.000"
          />

          <button className="project-modal-submit" type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }

  function renderEditModal() {
    return (
      <div className="project-modal-overlay">
        <form className="project-modal" onSubmit={saveProject}>
          <div className="project-modal-heading">
            <h2>Edit Project</h2>

            <button
              type="button"
              onClick={() => setEditProject(null)}
            >
              <FaTimes />
            </button>
          </div>

          <div
            className={`project-upload-logo ${editProject.iconClass}`}
          >
            {editProject.icon}
          </div>

          <label>Status</label>

          <select
            value={editProject.status}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                status: event.target.value,
              })
            }
          >
            <option>Started</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>

          <label>Project Name</label>

          <input
            value={editProject.name}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                name: event.target.value,
              })
            }
          />

          <label>Client Name</label>

          <input
            value={editProject.company}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                company: event.target.value,
              })
            }
          />

          <label>Description</label>

          <textarea
            value={editProject.description}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                description: event.target.value,
              })
            }
          />

          <label>Progress</label>

          <input
            type="number"
            min="0"
            max="100"
            value={editProject.progress}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                progress: Number(event.target.value),
              })
            }
          />

          <label>Budget</label>

          <input
            value={editProject.budget}
            onChange={(event) =>
              setEditProject({
                ...editProject,
                budget: event.target.value,
              })
            }
          />

          <button className="project-modal-submit" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>

        <div className="projects-header-actions">
          <button
            className="filter-button"
            onClick={() => setFilterOpen(true)}
          >
            <FaSlidersH />
          </button>

          <button
            className="add-project-button"
            onClick={() => {
              setProjectForm(emptyProject);
              setAddModal(true);
            }}
          >
            <FaPlus />
            Add Project
          </button>
        </div>
      </div>

      <div className="projects-tabs-row">
        <div className="projects-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span>
                {tab === "All"
                  ? projects.length
                  : projects.filter(
                      (project) => project.status === tab
                    ).length}
              </span>
            </button>
          ))}
        </div>

        <div className="project-view-buttons">
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FaList />
          </button>

          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FaThLarge />
          </button>

          <button onClick={() => setView("gantt")}>
            Gantt
          </button>
        </div>
      </div>

      {view === "list" && (
        <div className="project-list-search">
          <FaSearch />

          <input
            placeholder="Search project..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      )}

      {view === "grid" ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="projects-list">
          <div className="projects-list-header">
            <span>PROJECT NAME</span>
            <span>CREATED BY</span>
            <span>PROGRESS</span>
            <span>DEADLINE</span>
            <span />
          </div>

          {filteredProjects.map((project) => (
            <div
              className="projects-list-row"
              key={project.id}
              onDoubleClick={() => setSelectedProject(project)}
            >
              <div className="list-project-name">
                <div
                  className={`project-logo ${project.iconClass}`}
                >
                  {project.icon}
                </div>

                <div>
                  <strong>{project.name}</strong>
                  <span>{project.company}</span>
                </div>
              </div>

              <div className="list-creator">
                <span>{project.creator.charAt(0)}</span>

                <div>
                  <strong>{project.creator}</strong>
                  <small>Project Manager</small>
                </div>
              </div>

              <div className="list-progress">
                <div>
                  <i style={{ width: `${project.progress}%` }} />
                </div>

                <span>{project.progress}%</span>
              </div>

              <span
                className={`project-deadline ${
                  project.deadline.includes("5") ? "urgent" : ""
                }`}
              >
                <FaClock />
                {project.deadline}
              </span>

              <button
                className="project-more"
                onClick={() =>
                  setProjectMenu(
                    projectMenu === project.id
                      ? null
                      : project.id
                  )
                }
              >
                <FaEllipsisH />
              </button>
            </div>
          ))}
        </div>
      )}

      {filterOpen && (
        <>
          <div
            className="project-filter-overlay"
            onClick={() => setFilterOpen(false)}
          />

          <aside className="project-filter-panel">
            <div className="filter-heading">
              <h2>Filter</h2>

              <button onClick={() => setFilterOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="filter-search">
              <FaSearch />
              <input
                placeholder="Search Projects..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <label>Members</label>

            <div className="member-filter">
              <span>SB</span>
              Shane Black
              <FaTimes />
            </div>

            <label>Due Date</label>

            <select>
              <option>Due anytime</option>
              <option>5 days left</option>
              <option>1 week left</option>
            </select>

            <label>Status</label>

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
            >
              <option>All</option>
              <option>Started</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>

            <div className="filter-actions">
              <button
                className="apply-filter"
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </button>

              <button
                className="reset-filter"
                onClick={() => {
                  setSearch("");
                  setFilterStatus("All");
                  setActiveTab("All");
                }}
              >
                Reset all Filters
              </button>
            </div>
          </aside>
        </>
      )}

      {addModal && renderProjectModal()}

      {editProject && renderEditModal()}
    </div>
  );
}

export default Projects;