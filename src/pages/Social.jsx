import React from "react";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiImage,
  FiPlay,
} from "react-icons/fi";
import "./Social.css";

const friends = [
  "Ronald Robertson",
  "Regina Cooper",
  "Judith Black",
  "Dustin Williamson",
  "Nathan Fox",
  "Calvin Flores",
  "Brandon Pena",
  "Courtney Nguyen",
];

const posts = [
  {
    id: 1,
    name: "Dustin Williamson",
    date: "Jun 17, 2020",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    text: "Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives.",
  },
  {
    id: 2,
    name: "Dustin Williamson",
    date: "Jun 17, 2020",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    text: "Creativity is to discover a question that has never been asked.",
    video: true,
  },
];

function Social() {
  return (
    <div className="social-page">
      <div className="social-left">
        <div className="profile-card">
          <img
            className="profile-image"
            src="https://i.pravatar.cc/150?img=12"
            alt="Jane"
          />

          <h2>Jane Wilson</h2>
          <p>Creative Director</p>

          <div className="profile-info">
            <span>INFO</span>

            <label>EMAIL</label>
            <p>black@example.com</p>

            <label>PHONE</label>
            <p>+1 (070) 123-6458</p>

            <label>BIRTHDAY</label>
            <p>17 March, 1985</p>

            <label>LOCATION</label>
            <p>New York, NY</p>
          </div>
        </div>

        <div className="friends-card">
          <h3>FRIENDS</h3>

          {friends.map((friend, index) => (
            <div className="friend" key={friend}>
              <img
                src={`https://i.pravatar.cc/60?img=${index + 20}`}
                alt={friend}
              />

              <div>
                <h4>{friend}</h4>
                <p>Project Manager</p>
              </div>
            </div>
          ))}
        </div>

        <div className="photos-card">
          <h3>PHOTOS</h3>

          <div className="photo-grid">
            {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((id) => (
              <img
                key={id}
                src={`https://picsum.photos/100/100?random=${id}`}
                alt="Social"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="social-feed">
        <div className="create-post">
          <div className="create-top">
            <img src="https://i.pravatar.cc/50?img=12" alt="User" />
            <input type="text" placeholder="Write something..." />
          </div>

          <div className="create-bottom">
            <button>Post</button>

            <div>
              <FiPaperclip />
              <FiSmile />
              <FiImage />
            </div>
          </div>
        </div>

        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-user">
              <img src="https://i.pravatar.cc/50?img=18" alt={post.name} />

              <div>
                <h4>{post.name}</h4>
                <p>{post.date}</p>
              </div>
            </div>

            <div className="post-image-box">
              <img src={post.image} alt="Post" />

              {post.video && (
                <button className="play-button">
                  <FiPlay />
                </button>
              )}
            </div>

            <p className="post-text">{post.text}</p>

            <div className="post-actions">
              <span>
                <FiHeart /> 50
              </span>

              <span>
                <FiMessageSquare /> 14
              </span>
            </div>

            <div className="comment-input">
              <input type="text" placeholder="Write a comment..." />
              <FiSmile />
              <FiSend />
            </div>

            <div className="comments">
              <div className="comment">
                <img src="https://i.pravatar.cc/40?img=25" alt="Judith" />

                <div>
                  <h4>Judith Black</h4>
                  <p>
                    Very interesting and informative article. I learned a lot
                    of new and interesting things. 😊
                  </p>
                </div>
              </div>

              <div className="comment">
                <img src="https://i.pravatar.cc/40?img=30" alt="Nathan" />

                <div>
                  <h4>Nathan Fox</h4>
                  <p>Hello! I agree, a very interesting article.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Social;