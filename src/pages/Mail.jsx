import { useMemo, useState } from "react";

const initialMails = [
  {
    id: 1,
    sender: "Regina Cooper",
    subject: "Creative Director Resume",
    preview: "The Arts play a large role in the expression of inner thoughts...",
    time: "10:45",
    label: "Personal",
    unread: true,
  },
  {
    id: 2,
    sender: "Dustin Williamson",
    subject: "Meeting with friends",
    preview: "Hello, Mark! I'm writing to introduce...",
    time: "10:45",
    label: "Work",
    unread: false,
  },
  {
    id: 3,
    sender: "Jane Wilson",
    subject: "UX Conference in New York",
    preview: "This allows us to be as specific as our...",
    time: "09:45",
    label: "Friends",
    unread: true,
  },
  {
    id: 4,
    sender: "Brandon Pena",
    subject: "Music's weekly design #236",
    preview: "The arts allow us to be specific...",
    time: "08:45",
    label: "Family",
    unread: false,
  },
  {
    id: 5,
    sender: "Jacob Hawkins",
    subject: "Weekly project report",
    preview: "Concept of life is shown through...",
    time: "08:20",
    label: "Social",
    unread: false,
  },
  {
    id: 6,
    sender: "Shane Black",
    subject: "Order Status #249718",
    preview: "Music, singing, dancing, poetry...",
    time: "07:55",
    label: "Work",
    unread: true,
  },
];

const labelColors = {
  Personal: "#ef4444",
  Work: "#14b8a6",
  Friends: "#22c55e",
  Family: "#eab308",
  Social: "#16a34a",
};

function Mail() {
  const [mails] = useState(initialMails);
  const [selectedMail, setSelectedMail] = useState(initialMails[0]);
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("Inbox");

  const [composeOpen, setComposeOpen] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const [labels, setLabels] = useState([
    "Personal",
    "Work",
    "Friends",
    "Family",
    "Social",
  ]);

  const [newLabel, setNewLabel] = useState("");
  const [labelColor, setLabelColor] = useState("#22c55e");

  const [reply, setReply] = useState("");

  const filteredMails = useMemo(() => {
    return mails.filter((mail) => {
      const searchMatch =
        mail.sender.toLowerCase().includes(search.toLowerCase()) ||
        mail.subject.toLowerCase().includes(search.toLowerCase());

      return searchMatch;
    });
  }, [mails, search]);

  const createLabel = () => {
    if (!newLabel.trim()) return;

    setLabels([...labels, newLabel]);
    setNewLabel("");
    setLabelOpen(false);
  };

  const addEmoji = (emoji) => {
    setReply((previous) => previous + emoji);
    setEmojiOpen(false);
  };

  return (
    <div style={styles.page}>
      <aside style={styles.mailSidebar}>
        <button
          style={styles.newMessageButton}
          onClick={() => setComposeOpen(true)}
        >
          NEW MESSAGE
        </button>

        {[
          "Inbox",
          "Marked",
          "Drafts",
          "Sent",
          "Important",
          "Deleted",
        ].map((item) => (
          <div
            key={item}
            onClick={() => setFolder(item)}
            style={{
              ...styles.folder,
              background:
                folder === item ? "#eef9e9" : "transparent",
              color: folder === item ? "#16a34a" : "#555",
            }}
          >
            <span>{getFolderIcon(item)}</span>
            <span>{item}</span>

            {item === "Inbox" && (
              <span style={styles.badge}>8</span>
            )}
          </div>
        ))}

        <div style={styles.labelHeader}>
          <span>LABELS</span>

          <button
            style={styles.plusButton}
            onClick={() => setLabelOpen(true)}
          >
            +
          </button>
        </div>

        {labels.map((label) => (
          <div key={label} style={styles.labelItem}>
            <span
              style={{
                ...styles.labelDot,
                background:
                  labelColors[label] || labelColor,
              }}
            />

            {label}
          </div>
        ))}
      </aside>

      <section style={styles.mailList}>
        <div style={styles.searchRow}>
          <input
            style={styles.search}
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select style={styles.recentSelect}>
            <option>Recent</option>
            <option>Oldest</option>
          </select>
        </div>

        {filteredMails.map((mail) => (
          <div
            key={mail.id}
            onClick={() => setSelectedMail(mail)}
            style={{
              ...styles.mailItem,
              background:
                selectedMail.id === mail.id
                  ? "#f5f5f5"
                  : "#fff",
            }}
          >
            <div style={styles.avatar}>
              {mail.sender.charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={styles.mailTop}>
                <strong>{mail.sender}</strong>
                <small>{mail.time}</small>
              </div>

              <strong style={styles.subject}>
                {mail.subject}
              </strong>

              <p style={styles.preview}>{mail.preview}</p>
            </div>

            {mail.unread && <span style={styles.unreadDot} />}
          </div>
        ))}
      </section>

      <main style={styles.mailContent}>
        <div style={styles.mailContentHeader}>
          <div style={styles.senderInfo}>
            <div style={styles.avatar}>
              {selectedMail.sender.charAt(0)}
            </div>

            <div>
              <strong>{selectedMail.sender}</strong>
              <p style={styles.email}>
                {selectedMail.sender
                  .toLowerCase()
                  .replace(" ", ".")}
                @examplemail.com
              </p>
            </div>
          </div>

          <span>May 27, 2020 — 10:45</span>
        </div>

        <h1 style={styles.mailTitle}>
          {selectedMail.subject}
        </h1>

        <p>Hello, Regina Cooper!</p>

        <p style={styles.messageText}>
          I am writing to introduce you to David Boyd. I know
          you've been looking hard for a candidate for that
          Creative Director position and I believe David Boyd
          fits the position.
        </p>

        <p style={styles.messageText}>
          David Boyd and I worked together at Apple company.
          Where they were the senior Creative Director. They did
          a terrific job there.
        </p>

        <p style={styles.messageText}>
          If you are interested please feel free to contact David
          Boyd at example@email.com.
        </p>

        <p>Thanks for any help you can give. 😊</p>

        <p>
          Best regards,
          <br />
          Regina Cooper
        </p>

        <div style={styles.attachments}>
          <div style={styles.attachment}>
            📄 Resume.pdf
            <small>827 KB</small>
          </div>

          <div style={styles.attachment}>
            📄 Portfolio.zip
            <small>205 MB</small>
          </div>
        </div>

        <div style={styles.replyBox}>
          <div style={styles.replyTo}>
            To: <strong>{selectedMail.sender}</strong>
          </div>

          <div style={styles.editorTools}>
            A ▾ &nbsp; <b>B</b> &nbsp; / &nbsp; U &nbsp;
            🔗 &nbsp; ☷ &nbsp; ≡
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Type something"
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />

          <div style={styles.replyActions}>
            <button
              style={styles.sendButton}
              onClick={() => setReply("")}
            >
              Send ➤
            </button>

            <div style={{ position: "relative" }}>
              <button
                style={styles.iconButton}
                onClick={() => setEmojiOpen(!emojiOpen)}
              >
                😊
              </button>

              {emojiOpen && (
                <EmojiPicker onEmoji={addEmoji} />
              )}
            </div>

            <button style={styles.iconButton}>📎</button>
          </div>
        </div>
      </main>

      {labelOpen && (
        <div style={styles.overlay}>
          <div style={styles.labelModal}>
            <button
              style={styles.closeButton}
              onClick={() => setLabelOpen(false)}
            >
              ✕
            </button>

            <h2>New Label</h2>

            <label style={styles.formLabel}>Name</label>

            <input
              style={styles.input}
              value={newLabel}
              onChange={(event) =>
                setNewLabel(event.target.value)
              }
              placeholder="Personal"
            />

            <label style={styles.formLabel}>Color</label>

            <div style={styles.colorGrid}>
              {[
                "#fb7185",
                "#22c55e",
                "#facc15",
                "#16a34a",
                "#06b6d4",
                "#4ade80",
                "#a3e635",
                "#fde047",
                "#f472b6",
                "#ec4899",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setLabelColor(color)}
                  style={{
                    ...styles.colorButton,
                    background: color,
                    border:
                      labelColor === color
                        ? "3px solid #333"
                        : "none",
                  }}
                />
              ))}
            </div>

            <button
              style={styles.createButton}
              onClick={createLabel}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {composeOpen && (
        <div style={styles.overlay}>
          <div style={styles.composeModal}>
            <div style={styles.composeHeader}>
              <h2>New Message</h2>

              <button
                style={styles.closeButtonStatic}
                onClick={() => setComposeOpen(false)}
              >
                ✕
              </button>
            </div>

            <input style={styles.input} placeholder="To" />

            <input
              style={styles.input}
              placeholder="Subject"
            />

            <div style={styles.editorTools}>
              A ▾ &nbsp; <b>B</b> &nbsp; / &nbsp; U &nbsp;
              🔗 &nbsp; ☷ &nbsp; ≡
            </div>

            <textarea
              style={styles.composeTextarea}
              placeholder="Type something"
            />

            <div style={styles.uploadProgress}>
              📄 Resume.pdf
              <span>Uploading file... 40%</span>
            </div>

            <button
              style={styles.sendButton}
              onClick={() => setComposeOpen(false)}
            >
              Send ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EmojiPicker({ onEmoji }) {
  const emojis = [
    "😀",
    "😁",
    "😂",
    "😊",
    "😍",
    "😎",
    "🥳",
    "😇",
    "🤔",
    "😭",
    "😡",
    "👍",
    "👏",
    "🔥",
    "❤️",
    "🎉",
    "🚀",
    "💯",
  ];

  return (
    <div style={styles.emojiPicker}>
      <strong>SMILEYS</strong>

      <div style={styles.emojiGrid}>
        {emojis.map((emoji) => (
          <button
            key={emoji}
            style={styles.emojiButton}
            onClick={() => onEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

function getFolderIcon(folder) {
  const icons = {
    Inbox: "⌂",
    Marked: "☆",
    Drafts: "✎",
    Sent: "➤",
    Important: "!",
    Deleted: "♲",
  };

  return icons[folder];
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "190px 330px 1fr",
    minHeight: "100vh",
    background: "#fff",
  },

  mailSidebar: {
    padding: "20px 15px",
    borderRight: "1px solid #eee",
  },

  newMessageButton: {
    width: "100%",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },

  folder: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "11px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  badge: {
    marginLeft: "auto",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
  },

  labelHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: "30px 8px 15px",
    color: "#999",
    fontSize: "12px",
  },

  plusButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  labelItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "9px",
    color: "#555",
  },

  labelDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },

  mailList: {
    borderRight: "1px solid #eee",
    overflowY: "auto",
  },

  searchRow: {
    display: "flex",
    padding: "15px",
    gap: "10px",
    borderBottom: "1px solid #eee",
  },

  search: {
    flex: 1,
    border: "none",
    outline: "none",
  },

  recentSelect: {
    border: "none",
    outline: "none",
  },

  mailItem: {
    display: "flex",
    gap: "12px",
    padding: "15px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    position: "relative",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#ef8b72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  mailTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  subject: {
    display: "block",
    fontSize: "13px",
    marginTop: "5px",
  },

  preview: {
    margin: "4px 0",
    color: "#999",
    fontSize: "12px",
  },

  unreadDot: {
    width: "7px",
    height: "7px",
    background: "#ef4444",
    borderRadius: "50%",
  },

  mailContent: {
    padding: "30px",
    overflowY: "auto",
  },

  mailContentHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  senderInfo: {
    display: "flex",
    gap: "12px",
  },

  email: {
    color: "#16a34a",
    margin: "4px 0",
    fontSize: "12px",
  },

  mailTitle: {
    marginTop: "30px",
  },

  messageText: {
    lineHeight: 1.7,
    color: "#555",
  },

  attachments: {
    display: "flex",
    gap: "15px",
    margin: "25px 0",
  },

  attachment: {
    border: "1px solid #eee",
    padding: "15px",
    width: "150px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  replyBox: {
    border: "1px solid #ddd",
  },

  replyTo: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  editorTools: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  textarea: {
    width: "100%",
    height: "120px",
    border: "none",
    resize: "none",
    padding: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  replyActions: {
    display: "flex",
    gap: "8px",
    padding: "10px",
  },

  sendButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 25px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  iconButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  },

  emojiPicker: {
    position: "absolute",
    bottom: "35px",
    left: 0,
    width: "230px",
    background: "#fff",
    padding: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,.2)",
    zIndex: 50,
  },

  emojiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    marginTop: "10px",
  },

  emojiButton: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  labelModal: {
    width: "380px",
    background: "#fff",
    padding: "25px",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    right: "15px",
    top: "15px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  formLabel: {
    display: "block",
    margin: "15px 0 7px",
    color: "#777",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ddd",
    marginBottom: "12px",
  },

  colorGrid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  colorButton: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  createButton: {
    width: "100%",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px",
    marginTop: "20px",
    cursor: "pointer",
  },

  composeModal: {
    width: "520px",
    background: "#fff",
    padding: "25px",
  },

  composeHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  closeButtonStatic: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  composeTextarea: {
    width: "100%",
    height: "180px",
    boxSizing: "border-box",
    padding: "15px",
    border: "1px solid #eee",
    resize: "none",
  },

  uploadProgress: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    margin: "15px 0",
    border: "1px solid #eee",
  },
};

export default Mail;