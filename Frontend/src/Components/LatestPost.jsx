import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function LatestPost() {
  const navigation = useNavigate();

  const handleBlog = (id) => {
    navigation(`/blog/${id}`);
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const request = await get("/blog/GetPosts");
        const response = request.data;
        setBlogs(response.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  // Helper function to truncate text to a specific number of words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="container">
      <div className="mb-5 text-center"></div>
      <div className="row g-4">
        {blogs &&
          blogs.map((elem) => {
            return (
              <div className="col-md-4 d-flex" key={elem._id}>
                <div
                  className="card"
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f7f7f7", // Soft neutral light gray
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%", // Ensure the card takes full available height
                    width: "100%", // Ensure the card width is consistent
                    maxWidth: "400px", // Increased max-width for a wider card
                    margin: "0 auto", // Center the card horizontally
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 12px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src={`${BaseUrl}/images/${elem.image}`}
                    className="card-img-top"
                    alt="Blog Post"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%", // Ensure full width
                    }}
                  />
                  <div
                    className="card-body d-flex flex-column"
                    style={{
                      padding: "20px",
                      flex: 1,
                      display: "flex", // Ensures the body takes the remaining space
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        color: "#333",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                      }}
                    >
                      {elem.title}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        color: "#777",
                        fontSize: "0.9rem",
                        flex: 1,
                      }}
                    >
                      {truncateText(elem.desc, 20)}
                    </p>
                    <button
                      className="btn"
                      style={{
                        width: "100%",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        fontWeight: "500",
                        borderRadius: "8px",
                      }}
                      onClick={() => handleBlog(elem._id)}
                    >
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
