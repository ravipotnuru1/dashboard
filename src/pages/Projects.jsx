import { useMemo, useState } from "react";
import {
  FaDropbox,
  FaGitlab,
  FaPython,
  FaSlack,
  FaAngular,
  FaVuejs,
  FaFacebookMessenger,
} from "react-icons/fa";
import {
  FiPlus,
  FiMoreHorizontal,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiPaperclip,
  FiMessageSquare,
  FiX,
  FiLink,
  FiDownload,
} from "react-icons/fi";
import { SiBitbucket } from "react-icons/si";

const green = "#1f9d45";

const initialProjects = [
  {
    id: 1,
    name: "App Development",
    client: "Dropbox, Inc.",
    icon: "dropbox",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
  },
  {
    id: 2,
    name: "Website Redesign",
    client: "GitLab Inc.",
    icon: "gitlab",
    description:
      "It is necessary to develop a website redesign in a corporate style.",
    progress: 75,
    status: "Started",
    deadline: "1 week left",
  },
  {
    id: 3,
    name: "Landing Page",
    client: "Bitbucket, Inc.",
    icon: "bitbucket",
    description:
      "It is necessary to create a landing together with the development of design.",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
  },
  {
    id: 4,
    name: "Parser Development",
    client: "Driveway, Inc.",
    icon: "python",
    description:
      "It is necessary to develop a ticket site parser in python.",
    progress: 50,
    status: "On Hold",
    deadline: "5 days left",
  },
  {
    id: 5,
    name: "App Development",
    client: "Slack Technologies, Inc.",
    icon: "slack",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "5 days left",
  },
  {
    id: 6,
    name: "App Development",
    client: "Google, Inc.",
    icon: "firebase",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 25,
    status: "Started",
    deadline: "1 week left",
  },
  {
    id: 7,
    name: "Admin Dashboard",
    client: "ArtTemplate, Inc.",
    icon: "angular",
    description:
      "Necessary to create Admin Dashboard on Angular 8.",
    progress: 30,
    status: "Started",
    deadline: "1 week left",
  },
  {
    id: 8,
    name: "Web App on Vue.js",
    client: "ArtTemplate, Inc.",
    icon: "vue",
    description:
      "It is necessary to develop a web app on the framework Vue.js.",
    progress: 100,
    status: "Completed",
    deadline: "1 week left",
  },
  {
    id: 9,
    name: "App Development",
    client: "Facebook, Inc.",
    icon: "messenger",
    description:
      "Create a mobile application on iOS and Android devices.",
    progress: 50,
    status: "Started",
    deadline: "1 week left",
  },
];

const members = [
  "Shane Black",
  "Jane Wilson",
  "Jacob Hawkins",
  "Regina Cooper",
];

function ProjectIcon({ type, size = 32 }) {
  const props = { size };

  if (type === "dropbox") return <FaDropbox {...props} />;
  if (type === "gitlab") return <FaGitlab {...props} />;
  if (type === "bitbucket") return <SiBitbucket {...props} />;
  if (type === "python") return <FaPython {...props} />;
  if (type === "slack") return <FaSlack {...props} />;
  if (type === "angular") return <FaAngular {...props} />;
  if (type === "vue") return <FaVuejs {...props} />;
  if (type === "messenger")
    return <FaFacebookMessenger {...props} />;

  return <FaGitlab {...props} />;
}

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [view, setView] = useState("grid");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [detailsProject, setDetailsProject] = useState(null);
  const [timelineOpen, setTimelineOpen] = useState(false);

  const [menuId, setMenuId] = useState(null);

  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    description: "",
    budget: "",
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch =
        activeStatus === "All" ||
        project.status === activeStatus;

      const searchMatch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [projects, activeStatus, search]);

  const createProject = () => {
    if (!newProject.name.trim()) return;

    const project = {
      id: Date.now(),
      name: newProject.name,
      client: newProject.client || "New Client",
      description:
        newProject.description || "New project description.",
      progress: 0,
      status: "Started",
      deadline: "1 week left",
      icon: "dropbox",
    };

    setProjects([...projects, project]);

    setNewProject({
      name: "",
      client: "",
      description: "",
      budget: "",
    });

    setAddOpen(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    setMenuId(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Projects</h1>

          <div style={styles.tabs}>
            {["All", "Started", "On Hold", "Completed"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  style={{
                    ...styles.tab,
                    color:
                      activeStatus === status ? green : "#999",
                    borderBottom:
                      activeStatus === status
                        ? `2px solid ${green}`
                        : "2px solid transparent",
                  }}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        <div style={styles.headerActions}>
          <button
            style={styles.iconButton}
            onClick={() => setFilterOpen(true)}
          >
            <FiFilter />
          </button>

          <button
            style={styles.addButton}
            onClick={() => setAddOpen(true)}
          >
            <FiPlus /> Add Project
          </button>
        </div>
      </div>

      <div style={styles.viewRow}>
        <button
          style={styles.iconButton}
          onClick={() => setTimelineOpen(true)}
        >
          <FiCalendar />
        </button>

        <button
          style={{
            ...styles.viewButton,
            color: view === "list" ? green : "#999",
          }}
          onClick={() => setView("list")}
        >
          <FiList />
        </button>

        <button
          style={{
            ...styles.viewButton,
            color: view === "grid" ? green : "#999",
          }}
          onClick={() => setView("grid")}
        >
          <FiGrid />
        </button>
      </div>

      {view === "list" && (
        <div style={styles.searchBar}>
          <FiSearch color="#999" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            style={styles.searchInput}
          />
        </div>
      )}

      {view === "grid" ? (
        <div style={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              menuId={menuId}
              setMenuId={setMenuId}
              onDetails={() => setDetailsProject(project)}
              onEdit={() => setEditProject(project)}
              onDelete={() => deleteProject(project.id)}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={filteredProjects}
          onDetails={setDetailsProject}
          onEdit={setEditProject}
        />
      )}

      {filterOpen && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setFilterOpen(false)}
          />

          <div style={styles.sidePanel}>
            <button
              style={styles.close}
              onClick={() => setFilterOpen(false)}
            >
              <FiX />
            </button>

            <h2>Filter</h2>

            <label style={styles.label}>Search Projects...</label>

            <input
              style={styles.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Projects..."
            />

            <label style={styles.label}>Members</label>

            <select style={styles.input}>
              {members.map((member) => (
                <option key={member}>{member}</option>
              ))}
            </select>

            <label style={styles.label}>Due Date</label>

            <select style={styles.input}>
              <option>Due anytime</option>
              <option>Today</option>
              <option>This week</option>
            </select>

            <label style={styles.label}>Status</label>

            <select
              style={styles.input}
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
            >
              <option>All</option>
              <option>Started</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>

            <button
              style={styles.addButton}
              onClick={() => setFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      {addOpen && (
        <ProjectForm
          title="Add Project"
          project={newProject}
          setProject={setNewProject}
          onClose={() => setAddOpen(false)}
          onSave={createProject}
          buttonText="Create"
        />
      )}

      {editProject && (
        <ProjectForm
          title="Edit Project"
          project={editProject}
          setProject={setEditProject}
          onClose={() => setEditProject(null)}
          onSave={() => {
            setProjects(
              projects.map((project) =>
                project.id === editProject.id
                  ? editProject
                  : project
              )
            );

            setEditProject(null);
          }}
          buttonText="Save"
        />
      )}

      {detailsProject && (
        <ProjectDetails
          project={detailsProject}
          onClose={() => setDetailsProject(null)}
        />
      )}

      {timelineOpen && (
        <Timeline onClose={() => setTimelineOpen(false)} />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  menuId,
  setMenuId,
  onDetails,
  onEdit,
  onDelete,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div
          style={styles.projectTitle}
          onClick={onDetails}
        >
          <ProjectIcon type={project.icon} />

          <div>
            <strong>{project.name}</strong>
            <div style={styles.client}>{project.client}</div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <button
            style={styles.moreButton}
            onClick={() =>
              setMenuId(menuId === project.id ? null : project.id)
            }
          >
            <FiMoreHorizontal />
          </button>

          {menuId === project.id && (
            <div style={styles.menu}>
              <button onClick={onEdit}>
                <FiEdit2 /> Edit
              </button>

              <button>
                <FiUsers /> Add Member
              </button>

              <button>
                <FiCalendar /> Add Due Date
              </button>

              <button
                style={{ color: "#ef4444" }}
                onClick={onDelete}
              >
                <FiTrash2 /> Delete Project
              </button>
            </div>
          )}
        </div>
      </div>

      <p style={styles.description}>{project.description}</p>

      <div style={styles.progressText}>
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>

      <div style={styles.progress}>
        <div
          style={{
            ...styles.progressFill,
            width: `${project.progress}%`,
          }}
        />
      </div>

      <div style={styles.cardBottom}>
        <div style={styles.fakeAvatars}>
          <span>JW</span>
          <span>RC</span>
          <span>SB</span>
        </div>

        <div style={styles.deadline}>
          <FiClock /> {project.deadline}
        </div>
      </div>
    </div>
  );
}

function ProjectTable({ projects, onDetails, onEdit }) {
  return (
    <div style={styles.tableCard}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>PROJECT NAME</th>
            <th>CREATED BY</th>
            <th>PROGRESS</th>
            <th>DEADLINE</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <div
                  style={styles.projectTitle}
                  onClick={() => onDetails(project)}
                >
                  <ProjectIcon type={project.icon} size={24} />

                  <div>
                    <strong>{project.name}</strong>
                    <div style={styles.client}>
                      {project.client}
                    </div>
                  </div>
                </div>
              </td>

              <td>Shane Black</td>

              <td>
                <div style={styles.tableProgress}>
                  <div style={styles.progress}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>

                  <span>{project.progress}%</span>
                </div>
              </td>

              <td>
                <FiClock /> {project.deadline}
              </td>

              <td>
                <button
                  style={styles.moreButton}
                  onClick={() => onEdit(project)}
                >
                  <FiMoreHorizontal />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectForm({
  title,
  project,
  setProject,
  onClose,
  onSave,
  buttonText,
}) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.formModal}>
        <button style={styles.close} onClick={onClose}>
          <FiX />
        </button>

        <h2>{title}</h2>

        <div style={styles.logoUpload}>
          <FiPlus />
        </div>

        <label style={styles.label}>Project Name</label>

        <input
          style={styles.input}
          value={project.name}
          onChange={(e) =>
            setProject({
              ...project,
              name: e.target.value,
            })
          }
        />

        <label style={styles.label}>Client Name</label>

        <input
          style={styles.input}
          value={project.client}
          onChange={(e) =>
            setProject({
              ...project,
              client: e.target.value,
            })
          }
        />

        <label style={styles.label}>Description</label>

        <textarea
          style={styles.textarea}
          value={project.description}
          onChange={(e) =>
            setProject({
              ...project,
              description: e.target.value,
            })
          }
        />

        <div style={styles.twoColumns}>
          <div>
            <label style={styles.label}>Start Date</label>
            <input type="date" style={styles.input} />
          </div>

          <div>
            <label style={styles.label}>End Date</label>
            <input type="date" style={styles.input} />
          </div>
        </div>

        <label style={styles.label}>Members</label>

        <select style={styles.input}>
          {members.map((member) => (
            <option key={member}>{member}</option>
          ))}
        </select>

        <label style={styles.label}>Budget</label>

        <input
          style={styles.input}
          value={project.budget || ""}
          onChange={(e) =>
            setProject({
              ...project,
              budget: e.target.value,
            })
          }
          placeholder="$ 25,000"
        />

        <button style={styles.saveButton} onClick={onSave}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function ProjectDetails({ project, onClose }) {
  const [status, setStatus] = useState(project.status);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Hi Cody, any progress on the project? 🙂",
    "Yes. I just finished developing the Chat template.",
  ]);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.detailsModal}>
        <button style={styles.close} onClick={onClose}>
          <FiX />
        </button>

        <div style={styles.detailsHeader}>
          <div style={styles.projectTitle}>
            <ProjectIcon type={project.icon} />

            <div>
              <h2 style={{ margin: 0 }}>{project.name}</h2>
              <span style={styles.client}>{project.client}</span>
            </div>
          </div>

          <select
            style={styles.statusSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Started</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
        </div>

        <div style={styles.detailsGrid}>
          <main>
            <h4>DETAILS</h4>

            <div style={styles.stats}>
              <span>💰 Budget $25,000</span>
              <span>📅 Start Date 17 Jun, 2020</span>
              <span>📅 End Date 04 Jul, 2020</span>
            </div>

            <h4>DESCRIPTION</h4>

            <p style={styles.description}>
              {project.description} There are about 30 screens,
              the design and layout in the sketch is ready.
            </p>

            <h4>CHECKLIST (50%)</h4>

            <div style={styles.progress}>
              <div
                style={{
                  ...styles.progressFill,
                  width: "50%",
                }}
              />
            </div>

            {[
              "Create wireframe",
              "UI/UX design development",
              "Layout design",
              "Functional programming",
              "Testing for possible errors",
            ].map((item, index) => (
              <div style={styles.checkItem} key={item}>
                <FiCheckCircle
                  color={index < 3 ? green : "#bbb"}
                />
                {item}
              </div>
            ))}

            <h4>COMMENTS</h4>

            <div style={styles.commentBox}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add Comment..."
                style={styles.commentInput}
              />

              <button
                style={styles.saveButton}
                onClick={() => {
                  if (!comment.trim()) return;
                  setComments([...comments, comment]);
                  setComment("");
                }}
              >
                Comment
              </button>
            </div>

            {comments.map((item, index) => (
              <div key={index} style={styles.comment}>
                <div style={styles.avatar}>JW</div>

                <div>
                  <strong>
                    {index === 0 ? "Jane Wilson" : "Jacob Hawkins"}
                  </strong>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </main>

          <aside style={styles.detailsSide}>
            <h4>MEMBERS</h4>

            {members.map((member) => (
              <div style={styles.member} key={member}>
                <div style={styles.avatar}>
                  {member
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <span>{member}</span>
              </div>
            ))}

            <h4>FILES</h4>

            {[
              "Wireframe UI Kit.zip",
              "Brand Styles Guide.pdf",
              "Rocket Admin.psd",
              "Picture 01.png",
            ].map((file) => (
              <div style={styles.file} key={file}>
                <FiPaperclip />
                <span>{file}</span>
                <FiDownload />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

function Timeline({ onClose }) {
  const tasks = [
    ["Planning", 0, 3, "#bcebd0"],
    ["Wireframing", 0, 5, "#b9e9ef"],
    ["Design", 2, 6, "#ffe5a3"],
    ["Font Research", 2, 4, "#ffe5a3"],
    ["Color Palette", 3, 5, "#ffe5a3"],
    ["Mockup", 4, 3, "#ffe5a3"],
    ["User Interface", 5, 5, "#bcebd0"],
    ["Illustrations", 7, 4, "#ffe5a3"],
    ["Animated UI Flow", 3, 5, "#ffe5a3"],
    ["Development", 8, 7, "#b9e9ef"],
    ["Testing", 10, 5, "#e6c7f3"],
  ];

  const [taskMenu, setTaskMenu] = useState(null);

  return (
    <div style={styles.fullScreen}>
      <div style={styles.timelineHeader}>
        <div>
          <h2>Design Plan</h2>
        </div>

        <div>
          <strong>September 2020</strong>

          <button style={styles.addButton}>
            <FiPlus /> Add Project
          </button>

          <button style={styles.closeTimeline} onClick={onClose}>
            <FiX />
          </button>
        </div>
      </div>

      <div style={styles.timeline}>
        <div style={styles.taskNames}>
          <strong>PROJECT NAME</strong>

          {tasks.map(([name], index) => (
            <div
              key={name}
              style={styles.taskName}
              onClick={() =>
                setTaskMenu(taskMenu === index ? null : index)
              }
            >
              {name}

              {taskMenu === index && (
                <div style={styles.taskMenu}>
                  <button>
                    <FiEdit2 /> Edit Title
                  </button>

                  <button>
                    <FiPlus /> Add Subtask
                  </button>

                  <button>
                    <FiUsers /> Add Member
                  </button>

                  <button>
                    <FiLink /> Duplicate
                  </button>

                  <button style={{ color: "#ef4444" }}>
                    <FiTrash2 /> Delete Task
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.chart}>
          <div style={styles.days}>
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (day) => (
                <span key={day}>{day}</span>
              )
            )}
          </div>

          {tasks.map(([name, start, width, color]) => (
            <div style={styles.chartRow} key={name}>
              <div
                style={{
                  ...styles.timelineBar,
                  marginLeft: `${start * 55}px`,
                  width: `${width * 55}px`,
                  background: color,
                }}
              >
                {name}
                <span>{Math.min(width * 20, 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "25px",
    background: "#f7f8f8",
    color: "#333",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    margin: 0,
  },

  tabs: {
    display: "flex",
    gap: "18px",
    marginTop: "20px",
  },

  tab: {
    border: "none",
    background: "transparent",
    padding: "8px 2px",
    cursor: "pointer",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
  },

  addButton: {
    border: "none",
    background: green,
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },

  iconButton: {
    border: "1px solid #eee",
    background: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  viewRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "5px",
    margin: "10px 0",
  },

  viewButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  searchBar: {
    background: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #eee",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    marginLeft: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    border: "1px solid #eee",
    position: "relative",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  projectTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },

  client: {
    color: "#999",
    fontSize: "12px",
    marginTop: "3px",
  },

  moreButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  menu: {
    position: "absolute",
    right: 0,
    top: "30px",
    width: "170px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    zIndex: 20,
  },

  description: {
    color: "#777",
    lineHeight: 1.6,
    fontSize: "13px",
  },

  progressText: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
  },

  progress: {
    height: "5px",
    background: "#eee",
    margin: "8px 0",
  },

  progressFill: {
    height: "100%",
    background: green,
  },

  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px",
  },

  fakeAvatars: {
    display: "flex",
  },

  deadline: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#777",
  },

  tableCard: {
    background: "#fff",
    padding: "15px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  tableProgress: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "180px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.2)",
    zIndex: 100,
  },

  sidePanel: {
    position: "fixed",
    right: 0,
    top: 0,
    width: "350px",
    height: "100vh",
    background: "#fff",
    padding: "25px",
    boxSizing: "border-box",
    zIndex: 101,
  },

  close: {
    position: "absolute",
    right: "15px",
    top: "15px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  },

  label: {
    display: "block",
    color: "#777",
    fontSize: "12px",
    margin: "16px 0 7px",
  },

  input: {
    width: "100%",
    padding: "11px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.25)",
    zIndex: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formModal: {
    width: "420px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  logoUpload: {
    width: "70px",
    height: "70px",
    border: "1px dashed #ddd",
    margin: "15px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    resize: "none",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  saveButton: {
    border: "none",
    background: green,
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },

  detailsModal: {
    width: "900px",
    maxWidth: "95%",
    maxHeight: "92vh",
    overflowY: "auto",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  detailsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusSelect: {
    padding: "10px",
    border: "1px solid #ddd",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    gap: "30px",
    marginTop: "25px",
  },

  stats: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    color: "#666",
    fontSize: "13px",
  },

  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 0",
    borderBottom: "1px solid #eee",
  },

  commentBox: {
    border: "1px solid #eee",
    padding: "12px",
  },

  commentInput: {
    width: "100%",
    border: "none",
    outline: "none",
  },

  comment: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#f0b49f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "11px",
    flexShrink: 0,
  },

  detailsSide: {
    borderLeft: "1px solid #eee",
    paddingLeft: "20px",
  },

  member: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "12px 0",
  },

  file: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontSize: "12px",
  },

  fullScreen: {
    position: "fixed",
    inset: 0,
    background: "#fff",
    zIndex: 300,
    overflow: "auto",
    padding: "25px",
  },

  timelineHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeTimeline: {
    border: "none",
    background: "transparent",
    marginLeft: "15px",
    cursor: "pointer",
    fontSize: "20px",
  },

  timeline: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    marginTop: "25px",
    minWidth: "1000px",
  },

  taskNames: {
    borderRight: "1px solid #eee",
  },

  taskName: {
    height: "48px",
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    position: "relative",
    cursor: "pointer",
  },

  taskMenu: {
    position: "absolute",
    left: "120px",
    top: "35px",
    width: "170px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    zIndex: 20,
  },

  chart: {
    overflowX: "auto",
  },

  days: {
    display: "grid",
    gridTemplateColumns: "repeat(14, 55px)",
    height: "40px",
  },

  chartRow: {
    height: "48px",
    borderBottom: "1px solid #eee",
    backgroundImage:
      "linear-gradient(to right, #eee 1px, transparent 1px)",
    backgroundSize: "55px 100%",
  },

  timelineBar: {
    height: "30px",
    padding: "0 10px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "11px",
  },
};

const menuButtonStyle = `
button {
  font-family: inherit;
}
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("project-menu-style")
) {
  const style = document.createElement("style");
  style.id = "project-menu-style";
  style.innerHTML = `
    .project-menu-fix button {}
    div[style*="box-shadow"] > button {
      width: 100%;
      border: none;
      background: white;
      padding: 11px 14px;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    table th,
    table td {
      padding: 14px;
      border-bottom: 1px solid #eeeeee;
      font-size: 13px;
    }

    @media (max-width: 700px) {
      table {
        min-width: 750px;
      }
    }
  `;

  document.head.appendChild(style);
}

export default Projects;