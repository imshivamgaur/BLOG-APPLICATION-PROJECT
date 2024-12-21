import React from "react";
import { FaHome, FaPlusSquare, FaUsers, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh", // Ensure the sidebar fills at least the full screen height
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        overflowY: "auto", // Allow vertical scrolling if content exceeds sidebar height
      }}
    >
      <div className="p-3">
        <ul className="nav flex-column">
          {/* Dashboard Link */}
          <li className="nav-item mb-3">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/dashboard"
              style={{ fontSize: "18px" }}
            >
              <FaHome className="me-2" style={{ fontSize: "20px" }} />
              Dashboard
            </Link>
          </li>

          {/* Add Post Link */}
          <li className="nav-item mb-3">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/dashboard/addpost"
              style={{ fontSize: "18px" }}
            >
              <FaPlusSquare className="me-2" style={{ fontSize: "20px" }} />
              Add Post
            </Link>
          </li>

          {/* All Users Link */}
          <li className="nav-item mb-3">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/dashboard/users"
              style={{ fontSize: "18px" }}
            >
              <FaUsers className="me-2" style={{ fontSize: "20px" }} />
              All Users
            </Link>
          </li>

          {/* All Posts Link */}
          <li className="nav-item mb-3">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/dashboard/allposts"
              style={{ fontSize: "18px" }}
            >
              <FaFileAlt className="me-2" style={{ fontSize: "20px" }} />
              All Posts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
