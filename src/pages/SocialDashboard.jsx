import { useRef, useState } from "react";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiImage,
  FiPlay,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

import "./SocialDashboard.css";

const PROFILE_IMAGE = "/profile.png";

const friends = [
  ["Ronald Robertson", "Product Designer", 20],
  ["Regina Cooper", "Project Manager", 21],
  ["Judith Black", "Creative Director", 25],
  ["Dustin Williamson", "Web Developer", 18],
  ["Nathan Fox", "Business Analyst", 30],
  ["Calvin Flores", "Designer", 31],
  ["Brandon Pena", "Product Designer", 32],
  ["Courtney Nguyen", "Designer", 33],
  ["Kathryn Cooper", "Developer", 34],
  ["Cody Lane", "Web Developer", 35],
];

const initialPosts = [
  {
    id: 1,
    name: "Dustin Williamson",
    date: "Jun 17, 2020",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
    text:
      "Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives. We can look for opportunities to turn processes into projects that have tangible outcomes.",
    likes: 50,
    liked: false,
    video: false,
    comments: [
      {
        name: "Judith Black",
        image: 25,
        text:
          "Very interesting and informative article. I learned a lot of new and interesting things. 😊",
      },
      {
        name: "Nathan Fox",
        image: 30,
        text:
          "Hello! I agree, a very interesting article. Thank you very much!",
      },
      {
        name: "Calvin Flores",
        image: 31,
        text: "Thanks for the good article. Looking forward to new ones. 🤓",
      },
    ],
  },
  {
    id: 2,
    name: "Dustin Williamson",
    date: "Jun 15, 2020",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    text:
      "Creativity is to discover a question that has never been asked. If one brings up an idiosyncratic question, the answer will necessarily be unique as well.",
    likes: 50,
    liked: false,
    video: true,
    comments: [
      {
        name: "Regina Cooper",
        image: 21,
        text:
          "Very interesting and informative. I learned a lot of new and interesting things.",
      },
      {
        name: "Ronald Robertson",
        profile: true,
        text:
          "Hello! I agree, a very interesting article. Thank you very much! 😊",
      },
    ],
  },
  {
    id: 3,
    name: "Dustin Williamson",
    date: "Jun 17, 2020",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    text:
      "Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives.",
    likes: 75,
    liked: false,
    video: false,
    comments: [
      {
        name: "Nathan Fox",
        image: 30,
        text:
          "Very interesting and informative article. I learned a lot of new and interesting things. 😊",
      },
    ],
  },
  {
    id: 4,
    name: "Dustin Williamson",
    date: "Jun 17, 2020",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200",
    text:
      "Creativity is to discover a question that has never been asked. If one brings up an idiosyncratic question, the answer will necessarily be unique as well.",
    likes: 37,
    liked: false,
    video: false,
    comments: [
      {
        name: "Judith Black",
        image: 25,
        text:
          "Very interesting and informative article. I learned a lot of new and interesting things.",
      },
    ],
  },
];

const photos = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=300",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=300",
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=300",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=300",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300",
];

function Avatar({ profile, image, name, className }) {
  return (
    <img
      className={className}
      src={
        profile
          ? PROFILE_IMAGE
          : `https://i.pravatar.cc/80?img=${image || 18}`
      }
      alt={name}
    />
  );
}

function FriendsCard() {
  return (
    <section className="social-side-card">
      <h3>Friends</h3>

      {friends.map(([name, role, image]) => (
        <div className="friend-item" key={name}>
          <Avatar
            profile={name === "Ronald Robertson"}
            image={image}
            name={name}
          />

          <div>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function PhotosCard() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <>
      <section className="social-side-card">
        <h3>Photos</h3>

        <div className="photos-grid">
          {photos.map((photo) => (
            <button
              type="button"
              key={photo}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo} alt="Social gallery" />
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="photo-preview"
          onClick={() => setSelectedPhoto(null)}
        >
          <img src={selectedPhoto} alt="Preview" />
        </div>
      )}
    </>
  );
}

function CreatePost({ addPost }) {
  const [text, setText] = useState("");
  const fileRef = useRef(null);

  const submitPost = () => {
    if (!text.trim()) return;

    addPost(text, "");
    setText("");
  };

  const uploadImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const image = URL.createObjectURL(file);

    addPost(text || "New photo", image);

    setText("");
    event.target.value = "";
  };

  return (
    <section className="create-post">
      <div className="create-top">
        <img src={PROFILE_IMAGE} alt="Ronald Robertson" />

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write something..."
        />
      </div>

      <div className="create-bottom">
        <button type="button" onClick={submitPost}>
          Post
        </button>

        <div>
          <FiPaperclip onClick={() => fileRef.current?.click()} />

          <FiSmile
            onClick={() =>
              setText((previous) => `${previous} 😊`)
            }
          />

          <FiImage onClick={() => fileRef.current?.click()} />
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={uploadImage}
      />
    </section>
  );
}

function PostCard({ post, toggleLike, addComment }) {
  const [comment, setComment] = useState("");
  const [playing, setPlaying] = useState(false);

  const submitComment = () => {
    if (!comment.trim()) return;

    addComment(post.id, comment);
    setComment("");
  };

  return (
    <article className="social-post-card">
      <div className="post-user">
        <Avatar
          profile={post.name === "Ronald Robertson"}
          image={18}
          name={post.name}
        />

        <div>
          <strong>{post.name}</strong>
          <span>{post.date}</span>
        </div>
      </div>

      {post.image && (
        <div className="post-image-box">
          <img src={post.image} alt="Post" />

          {post.video && (
            <button
              type="button"
              className="play-button"
              onClick={() => setPlaying((previous) => !previous)}
            >
              <FiPlay />
            </button>
          )}

          {playing && (
            <span className="playing-label">
              Video Playing
            </span>
          )}
        </div>
      )}

      <p className="post-text">{post.text}</p>

      <div className="post-actions">
        <button
          type="button"
          className={post.liked ? "liked" : ""}
          onClick={() => toggleLike(post.id)}
        >
          <FiHeart />
          {post.likes}
        </button>

        <span>
          <FiMessageSquare />
          {post.comments.length}
        </span>
      </div>

      <div className="comment-input">
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitComment();
            }
          }}
          placeholder="Write a comment..."
        />

        <FiSmile
          onClick={() =>
            setComment((previous) => `${previous} 😊`)
          }
        />

        <button type="button" onClick={submitComment}>
          <FiSend />
        </button>
      </div>

      <div className="comments">
        {post.comments.map((item, index) => (
          <div
            className="comment"
            key={`${item.name}-${index}`}
          >
            <Avatar
              profile={item.profile}
              image={item.image}
              name={item.name}
            />

            <div>
              <strong>{item.name}</strong>
              <small>{index + 1} min ago</small>

              <p>{item.text}</p>

              <div className="comment-icons">
                <FiHeart />
                <span>{index + 3}</span>
                <FiMessageSquare />
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProfileView({
  posts,
  addPost,
  toggleLike,
  addComment,
}) {
  return (
    <>
      <section className="profile-cover">
        <div className="profile-information">
          <img
            className="main-profile-image"
            src={PROFILE_IMAGE}
            alt="Ronald Robertson"
          />

          <div className="profile-name">
            <h2>Ronald Robertson</h2>
            <p>Creative Director</p>

            <div className="profile-socials">
              <FiFacebook />
              <FiTwitter />
              <FiInstagram />
            </div>
          </div>

          <div className="profile-details">
            <div>
              <span>EMAIL</span>
              <strong>robe@example.com</strong>

              <span>PHONE</span>
              <strong>+1 (070) 123-8459</strong>
            </div>

            <div>
              <span>BIRTHDAY</span>
              <strong>17 March, 1995</strong>

              <span>LOCATION</span>
              <strong>New York, NY</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-layout">
        <aside className="social-left">
          <FriendsCard />
          <PhotosCard />
        </aside>

        <main className="social-feed">
          <CreatePost addPost={addPost} />

          {posts.slice(0, 2).map((post) => (
            <PostCard
              key={post.id}
              post={post}
              toggleLike={toggleLike}
              addComment={addComment}
            />
          ))}
        </main>
      </div>
    </>
  );
}

function FeedView({
  posts,
  addPost,
  toggleLike,
  addComment,
}) {
  return (
    <div className="feed-layout">
      <aside className="feed-left">
        <section className="feed-profile-card">
          <img
            className="feed-profile-image"
            src={PROFILE_IMAGE}
            alt="Jane Wilson"
          />

          <h2>Jane Wilson</h2>
          <p>Creative Director</p>

          <div className="feed-info">
            <h4>INFO</h4>

            <span>EMAIL</span>
            <strong>black@example.com</strong>

            <span>PHONE</span>
            <strong>+1 (070) 123-8459</strong>

            <span>BIRTHDAY</span>
            <strong>17 March, 1995</strong>

            <span>LOCATION</span>
            <strong>New York, NY</strong>
          </div>
        </section>

        <FriendsCard />
        <PhotosCard />
      </aside>

      <main className="social-feed">
        <CreatePost addPost={addPost} />

        {posts.slice(0, 2).map((post) => (
          <PostCard
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            addComment={addComment}
          />
        ))}
      </main>
    </div>
  );
}

function TimelineView({
  posts,
  addPost,
  toggleLike,
  addComment,
}) {
  return (
    <div className="timeline-view">
      <div className="timeline-line" />

      <div className="timeline-title">Today</div>

      <div className="timeline-grid">
        <div className="timeline-item">
          <CreatePost addPost={addPost} />
        </div>

        {posts.slice(0, 2).map((post) => (
          <div className="timeline-item" key={post.id}>
            <span className="timeline-dot" />

            <PostCard
              post={post}
              toggleLike={toggleLike}
              addComment={addComment}
            />
          </div>
        ))}
      </div>

      <div className="timeline-title timeline-yesterday">
        Yesterday
      </div>

      <div className="timeline-grid">
        {posts.slice(2).map((post) => (
          <div className="timeline-item" key={post.id}>
            <span className="timeline-dot" />

            <PostCard
              post={post}
              toggleLike={toggleLike}
              addComment={addComment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialDashboard() {
  const [activeView, setActiveView] = useState("profile");
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (text, image) => {
    const newPost = {
      id: Date.now(),
      name: "Ronald Robertson",
      date: "Just now",
      image,
      text,
      likes: 0,
      liked: false,
      video: false,
      comments: [],
    };

    setPosts((previous) => [newPost, ...previous]);
  };

  const toggleLike = (id) => {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  const addComment = (id, text) => {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  name: "Ronald Robertson",
                  profile: true,
                  text,
                },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="social-dashboard">
      {activeView === "profile" && (
        <ProfileView
          posts={posts}
          addPost={addPost}
          toggleLike={toggleLike}
          addComment={addComment}
        />
      )}

      {activeView === "feed" && (
        <FeedView
          posts={posts}
          addPost={addPost}
          toggleLike={toggleLike}
          addComment={addComment}
        />
      )}

      {activeView === "timeline" && (
        <TimelineView
          posts={posts}
          addPost={addPost}
          toggleLike={toggleLike}
          addComment={addComment}
        />
      )}

      <div className="social-view-switcher">
        <button
          type="button"
          className={activeView === "profile" ? "active" : ""}
          onClick={() => setActiveView("profile")}
        >
          Profile
        </button>

        <button
          type="button"
          className={activeView === "feed" ? "active" : ""}
          onClick={() => setActiveView("feed")}
        >
          Feed
        </button>

        <button
          type="button"
          className={activeView === "timeline" ? "active" : ""}
          onClick={() => setActiveView("timeline")}
        >
          Timeline
        </button>
      </div>
    </div>
  );
}

export default SocialDashboard;