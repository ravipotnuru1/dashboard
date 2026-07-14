import React, { useState } from "react";
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
} from "react-icons/fa";
import { SiFigma, SiSketch } from "react-icons/si";
import "./FileManager.css";

const folders = [
  { name: "Design", size: "10.5 GB" },
  { name: "Projects", size: "3.2 GB" },
  { name: "Music", size: "1.5 GB" },
  { name: "Pictures", size: "1.7 GB" },
  { name: "Documents", size: "440 MB" },
  { name: "Downloads", size: "101 GB" },
];

const files = [
  {
    name: "Rocket - Admin Dashboard UI Kit.fig",
    size: "1.5 MB",
    type: "figma",
  },
  {
    name: "Rocket - Admin Dashboard UI Kit.sketch",
    size: "1.5 MB",
    type: "sketch",
  },
  {
    name: "Arion - Admin Dashboard UI Kit.sketch",
    size: "1.2 MB",
    type: "sketch",
  },
  {
    name: "Project Brief.doc",
    size: "1.4 MB",
    type: "word",
  },
  {
    name: "Design.zip",
    size: "1.1 GB",
    type: "image",
  },
  {
    name: "vCard - Resume.psd",
    size: "2.5 MB",
    type: "image",
  },
  {
    name: "Project Brief.doc",
    size: "1.2 MB",
    type: "word",
  },
  {
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
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("Projects");
  const [menu, setMenu] = useState(null);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="file-manager-page">
      <aside className="folder-sidebar">
        <p className="folder-title">FOLDERS</p>

        <div className="folder-navigation">
          {folders.map((folder) => (
            <button
              key={folder.name}
              className={`folder-nav-item ${
                selectedFolder === folder.name ? "folder-active" : ""
              }`}
              onClick={() => setSelectedFolder(folder.name)}
            >
              <FaFolder />
              <span>{folder.name}</span>
            </button>
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
            <div className="storage-progress"></div>
          </div>
        </div>
      </aside>

      <main className="file-content">
        <div className="file-toolbar">
          <div className="file-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="upload-button">
            <FaUpload />
            Upload
          </button>
        </div>

        <h2>Folders</h2>

        <div className="folder-grid">
          {folders.map((folder, index) => (
            <div
              className="folder-card"
              key={folder.name}
              onClick={() => setSelectedFolder(folder.name)}
            >
              <FaFolder className="large-folder-icon" />

              <p>{folder.name}</p>
              <span>{folder.size}</span>

              {index === folders.length - 1 && (
                <button className="folder-more">
                  <FaEllipsisV />
                </button>
              )}
            </div>
          ))}

          <div className="add-folder-card">
            <div className="add-folder-icon">
              <FaPlus />
            </div>
            <p>Add Folder</p>
          </div>
        </div>

        <h2 className="files-heading">Files</h2>

        <div className="files-grid">
          {filteredFiles.map((file, index) => (
            <div className="file-card" key={`${file.name}-${index}`}>
              <div className="file-menu-wrapper">
                <button
                  className="file-menu-button"
                  onClick={() => setMenu(menu === index ? null : index)}
                >
                  <FaEllipsisV />
                </button>

                {menu === index && (
                  <div className="file-dropdown">
                    <button>
                      <FaDownload />
                      Download
                    </button>

                    <button>
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
      </main>

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
            My Files
          </p>

          <p>
            <span>Modified</span>
            Sep 11, 2020
          </p>

          <p>
            <span>Created</span>
            Sep 10, 2020
          </p>
        </div>

        <h4>SETTINGS</h4>

        <div className="setting-row">
          <span>File Sharing</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="setting-row">
          <span>Backup</span>
          <input type="checkbox" />
        </div>

        <div className="setting-row">
          <span>Sync</span>
          <input type="checkbox" />
        </div>
      </aside>
    </div>
  );
}

export default FileManager;