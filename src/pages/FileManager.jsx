import React, { useRef, useState } from "react";
import {
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaPlus,
  FaUpload,
  FaSearch,
  FaTrash,
  FaDownload,
  FaEllipsisV,
  FaShareAlt,
  FaLink,
  FaPen,
  FaCopy,
  FaArrowsAlt,
  FaThLarge,
  FaList,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { SiFigma, SiSketch } from "react-icons/si";

import "./FileManager.css";

const initialFolders = [
  { id: 1, name: "Design", size: "5.8 GB" },
  { id: 2, name: "Projects", size: "3.2 GB" },
  { id: 3, name: "Music", size: "1.5 GB" },
  { id: 4, name: "Pictures", size: "1.7 GB" },
  { id: 5, name: "Documents", size: "440 MB" },
  { id: 6, name: "Downloads", size: "10.1 GB" },
];

const initialFiles = [
  {
    id: 1,
    name: "Rocket - Admin Dashboard UI Kit.fig",
    size: "1.8 MB",
    type: "figma",
  },
  {
    id: 2,
    name: "Rocket - Admin Dashboard UI Kit.sketch",
    size: "1.5 MB",
    type: "sketch",
  },
  {
    id: 3,
    name: "Arion - Admin Dashboard UI Kit.sketch",
    size: "1.2 MB",
    type: "sketch",
  },
  {
    id: 4,
    name: "Project Brief.docx",
    size: "1.4 MB",
    type: "word",
  },
  {
    id: 5,
    name: "Design.zip",
    size: "1.9 GB",
    type: "image",
  },
  {
    id: 6,
    name: "vCard - Resume.psd",
    size: "2.5 MB",
    type: "image",
  },
  {
    id: 7,
    name: "Project Brief",
    size: "1.2 MB",
    type: "word",
  },
  {
    id: 8,
    name: "Brand Styles Guide.pdf",
    size: "4.5 MB",
    type: "pdf",
  },
];

function FileIcon({ type }) {
  if (type === "figma") {
    return <SiFigma className="file-icon figma-icon" />;
  }

  if (type === "sketch") {
    return <SiSketch className="file-icon sketch-icon" />;
  }

  if (type === "word") {
    return <FaFileWord className="file-icon word-icon" />;
  }

  if (type === "pdf") {
    return <FaFilePdf className="file-icon pdf-icon" />;
  }

  return <FaFileImage className="file-icon image-icon" />;
}

function FileManager() {
  const uploadRef = useRef(null);

  const [folders, setFolders] = useState(initialFolders);
  const [files, setFiles] = useState(initialFiles);

  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] =
    useState("Projects");

  const [view, setView] = useState("grid");
  const [folderMenu, setFolderMenu] = useState(null);
  const [fileMenu, setFileMenu] = useState(null);

  const [projectsOpen, setProjectsOpen] = useState(true);

  const [addFolderOpen, setAddFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [renameItem, setRenameItem] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  const [fileSharing, setFileSharing] = useState(true);
  const [backup, setBackup] = useState(false);
  const [sync, setSync] = useState(false);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectFolder = (folder) => {
    setSelectedFolder(folder.name);
    setFolderMenu(null);
  };

  const addFolder = (event) => {
    event.preventDefault();

    if (!folderName.trim()) return;

    setFolders((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: folderName,
        size: "0 MB",
      },
    ]);

    setFolderName("");
    setAddFolderOpen(false);
  };

  const deleteFolder = (id) => {
    setFolders((previous) =>
      previous.filter((folder) => folder.id !== id)
    );

    setFolderMenu(null);
  };

  const deleteFile = (id) => {
    setFiles((previous) =>
      previous.filter((file) => file.id !== id)
    );

    setFileMenu(null);
  };

  const openRename = (item, type) => {
    setRenameItem({
      id: item.id,
      type,
    });

    setRenameValue(item.name);

    setFolderMenu(null);
    setFileMenu(null);
  };

  const saveRename = (event) => {
    event.preventDefault();

    if (!renameValue.trim()) return;

    if (renameItem.type === "folder") {
      setFolders((previous) =>
        previous.map((folder) =>
          folder.id === renameItem.id
            ? {
                ...folder,
                name: renameValue,
              }
            : folder
        )
      );
    } else {
      setFiles((previous) =>
        previous.map((file) =>
          file.id === renameItem.id
            ? {
                ...file,
                name: renameValue,
              }
            : file
        )
      );
    }

    setRenameItem(null);
    setRenameValue("");
  };

  const copyFile = (file) => {
    setFiles((previous) => [
      ...previous,
      {
        ...file,
        id: Date.now(),
        name: `Copy of ${file.name}`,
      },
    ]);

    setFileMenu(null);
  };

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (!selectedFiles.length) return;

    const newUploads = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      progress: Math.floor(Math.random() * 45) + 50,
      completed: false,
    }));

    setUploadFiles(newUploads);
    setUploadOpen(true);

    newUploads.forEach((upload) => {
      setTimeout(() => {
        setUploadFiles((previous) =>
          previous.map((item) =>
            item.id === upload.id
              ? {
                  ...item,
                  progress: 100,
                  completed: true,
                }
              : item
          )
        );

        setFiles((previous) => [
          ...previous,
          {
            id: upload.id,
            name: upload.name,
            size: upload.size,
            type: getFileType(upload.name),
          },
        ]);
      }, 1500);
    });

    event.target.value = "";
  };

  const shareItem = () => {
    alert("File shared successfully");
    setFolderMenu(null);
    setFileMenu(null);
  };

  const copySharingLink = () => {
    navigator.clipboard
      ?.writeText("https://flower-files.com/shared/project")
      .then(() => {
        alert("Sharing link copied");
      });

    setFolderMenu(null);
    setFileMenu(null);
  };

  const downloadFile = (file) => {
    const blob = new Blob(
      [`Demo file: ${file.name}`],
      {
        type: "text/plain",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = file.name;
    link.click();

    URL.revokeObjectURL(url);

    setFileMenu(null);
  };

  return (
    <div className="file-manager-page">
      {/* LEFT FOLDER SIDEBAR */}

      <aside className="folder-sidebar">
        <p className="folder-title">FOLDERS</p>

        <div className="folder-navigation">
          {folders.map((folder) => (
            <React.Fragment key={folder.id}>
              <button
                className={`folder-nav-item ${
                  selectedFolder === folder.name
                    ? "folder-active"
                    : ""
                }`}
                onClick={() => {
                  selectFolder(folder);

                  if (folder.name === "Projects") {
                    setProjectsOpen(
                      (previous) => !previous
                    );
                  }
                }}
              >
                <FaFolder />

                <span>{folder.name}</span>

                {folder.name === "Projects" &&
                  (projectsOpen ? (
                    <FaChevronDown className="folder-arrow" />
                  ) : (
                    <FaChevronRight className="folder-arrow" />
                  ))}
              </button>

              {folder.name === "Projects" &&
                projectsOpen && (
                  <div className="project-subfolders">
                    <button>📁 Projects_01</button>
                    <button>📁 Projects_02</button>
                    <button>📁 Projects_03</button>
                    <button>📁 Projects_04</button>
                  </div>
                )}
            </React.Fragment>
          ))}
        </div>

        <button className="trash-button">
          <FaTrash />
          <span>Trash</span>
        </button>

        <div className="storage-section">
          <div className="storage-text">
            <span>Storage</span>
            <span>70%</span>
          </div>

          <div className="storage-bar">
            <div className="storage-progress" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="file-content">
        <div className="file-toolbar">
          <div className="file-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="file-toolbar-actions">
            <button
              className="view-button"
              onClick={() =>
                setView(
                  view === "grid" ? "list" : "grid"
                )
              }
            >
              {view === "grid" ? (
                <FaList />
              ) : (
                <FaThLarge />
              )}
            </button>

            <input
              ref={uploadRef}
              type="file"
              multiple
              hidden
              onChange={handleUpload}
            />

            <button
              className="upload-button"
              onClick={() =>
                uploadRef.current?.click()
              }
            >
              <FaUpload />
              Upload
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <>
            <h2>Folders</h2>

            <div className="folder-grid">
              {filteredFolders.map((folder) => (
                <div
                  className="folder-card"
                  key={folder.id}
                  onClick={() => selectFolder(folder)}
                >
                  <div className="folder-menu-wrapper">
                    <button
                      className="folder-more"
                      onClick={(event) => {
                        event.stopPropagation();

                        setFolderMenu(
                          folderMenu === folder.id
                            ? null
                            : folder.id
                        );
                      }}
                    >
                      <FaEllipsisV />
                    </button>

                    {folderMenu === folder.id && (
                      <div className="folder-dropdown">
                        <button onClick={shareItem}>
                          <FaShareAlt />
                          Share
                        </button>

                        <button onClick={copySharingLink}>
                          <FaLink />
                          Sharing Link
                        </button>

                        <hr />

                        <button>
                          <FaDownload />
                          Download
                        </button>

                        <button
                          onClick={() =>
                            openRename(folder, "folder")
                          }
                        >
                          <FaPen />
                          Rename
                        </button>

                        <button>
                          <FaCopy />
                          Copy
                        </button>

                        <button>
                          <FaArrowsAlt />
                          Move
                        </button>

                        <hr />

                        <button
                          className="delete-menu-item"
                          onClick={() =>
                            deleteFolder(folder.id)
                          }
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <FaFolder className="large-folder-icon" />

                  <p>{folder.name}</p>
                  <span>{folder.size}</span>
                </div>
              ))}

              <button
                className="add-folder-card"
                onClick={() =>
                  setAddFolderOpen(true)
                }
              >
                <div className="add-folder-icon">
                  <FaPlus />
                </div>

                <p>Add Folder</p>
              </button>
            </div>

            <h2 className="files-heading">Files</h2>

            <div className="files-grid">
              {filteredFiles.map((file) => (
                <div
                  className="file-card"
                  key={file.id}
                >
                  <div className="file-menu-wrapper">
                    <button
                      className="file-menu-button"
                      onClick={() =>
                        setFileMenu(
                          fileMenu === file.id
                            ? null
                            : file.id
                        )
                      }
                    >
                      <FaEllipsisV />
                    </button>

                    {fileMenu === file.id && (
                      <div className="file-dropdown">
                        <button onClick={shareItem}>
                          <FaShareAlt />
                          Share
                        </button>

                        <button
                          onClick={() =>
                            downloadFile(file)
                          }
                        >
                          <FaDownload />
                          Download
                        </button>

                        <button
                          onClick={() =>
                            openRename(file, "file")
                          }
                        >
                          <FaPen />
                          Rename
                        </button>

                        <button
                          onClick={() =>
                            copyFile(file)
                          }
                        >
                          <FaCopy />
                          Copy
                        </button>

                        <button
                          className="delete-menu-item"
                          onClick={() =>
                            deleteFile(file.id)
                          }
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <FileIcon type={file.type} />

                  <p>{file.name}</p>
                  <span>{file.size}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="file-list-view">
            {[...filteredFolders, ...filteredFiles].map(
              (item) => (
                <div
                  className="file-list-row"
                  key={`${item.name}-${item.id}`}
                >
                  <input type="checkbox" />

                  {item.type ? (
                    <FileIcon type={item.type} />
                  ) : (
                    <FaFolder className="list-folder-icon" />
                  )}

                  <strong>{item.name}</strong>

                  <span>12.09.20</span>

                  <span>{item.size}</span>

                  <div className="list-owner">RR</div>

                  <FaEllipsisV />
                </div>
              )
            )}
          </div>
        )}
      </main>

      {/* RIGHT INFO */}

      <aside className="file-info-panel">
        <FaFolder className="info-folder-icon" />

        <h3>{selectedFolder}</h3>

        <div className="info-details">
          <p>
            <span>Type</span>
            Folder
          </p>

          <p>
            <span>Size</span>
            3.2 GB
          </p>

          <p>
            <span>Owner</span>
            ArtTemplate
          </p>

          <p>
            <span>Location</span>
            <b>My Files</b>
          </p>

          <p>
            <span>Modified</span>
            Sep 17, 2020 4:25
          </p>

          <p>
            <span>Created</span>
            Sep 10, 2020 2:25
          </p>
        </div>

        <h4>SETTINGS</h4>

        <SettingToggle
          label="File Sharing"
          value={fileSharing}
          onChange={setFileSharing}
        />

        <SettingToggle
          label="Backup"
          value={backup}
          onChange={setBackup}
        />

        <SettingToggle
          label="Sync"
          value={sync}
          onChange={setSync}
        />
      </aside>

      {/* ADD FOLDER */}

      {addFolderOpen && (
        <div className="file-modal-overlay">
          <form
            className="file-modal"
            onSubmit={addFolder}
          >
            <button
              type="button"
              className="file-modal-close"
              onClick={() =>
                setAddFolderOpen(false)
              }
            >
              <FaTimes />
            </button>

            <h2>Add Folder</h2>

            <label>Folder Name</label>

            <input
              value={folderName}
              onChange={(event) =>
                setFolderName(event.target.value)
              }
              placeholder="Folder name"
              autoFocus
            />

            <button
              className="file-modal-submit"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* RENAME */}

      {renameItem && (
        <div className="file-modal-overlay">
          <form
            className="file-modal"
            onSubmit={saveRename}
          >
            <button
              type="button"
              className="file-modal-close"
              onClick={() =>
                setRenameItem(null)
              }
            >
              <FaTimes />
            </button>

            <h2>Rename</h2>

            <label>Name</label>

            <input
              value={renameValue}
              onChange={(event) =>
                setRenameValue(event.target.value)
              }
              autoFocus
            />

            <button
              className="file-modal-submit"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {/* UPLOAD PANEL */}

      {uploadOpen && (
        <div className="upload-progress-panel">
          <div className="upload-progress-header">
            <div>
              <h3>
                Uploading {uploadFiles.length} files
              </h3>

              <span>
                {uploadFiles.every(
                  (file) => file.completed
                )
                  ? "100% · Completed"
                  : "98% · 2 minutes left"}
              </span>
            </div>

            <button
              onClick={() => setUploadOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="upload-progress-list">
            {uploadFiles.map((file) => (
              <div
                className="upload-progress-item"
                key={file.id}
              >
                <FaFileImage />

                <div>
                  <strong>{file.name}</strong>
                  <span>{file.size}</span>

                  {!file.completed && (
                    <div className="upload-mini-bar">
                      <i
                        style={{
                          width: `${file.progress}%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {file.completed && (
                  <FaCheck className="upload-complete" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SettingToggle({
  label,
  value,
  onChange,
}) {
  return (
    <div className="setting-row">
      <span>{label}</span>

      <button
        type="button"
        className={`setting-toggle ${
          value ? "toggle-active" : ""
        }`}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  );
}

function getFileType(name) {
  const extension = name
    .split(".")
    .pop()
    .toLowerCase();

  if (extension === "fig") return "figma";

  if (extension === "sketch") return "sketch";

  if (
    extension === "doc" ||
    extension === "docx"
  ) {
    return "word";
  }

  if (extension === "pdf") return "pdf";

  return "image";
}

export default FileManager;