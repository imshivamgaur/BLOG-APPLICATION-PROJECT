import React from "react";
import LatestPost from "../Components/LatestPost";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="container-fluid hero-section text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1729882417531-eead4fe0bb2b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textShadow: "0 2px 6px rgba(0, 0, 0, 0.7)",
        }}
      >
        <h1
          className="fs-1 fw-bold"
          style={{
            fontSize: "4rem",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Welcome to SR Blogs
        </h1>
        <p
          className="fs-5 mt-3"
          style={{
            maxWidth: "600px",
            lineHeight: "1.8",
            fontSize: "1.2rem",
            opacity: 0.85,
          }}
        >
          Dive into a world of creativity, insights, and inspiration. Discover
          the extraordinary in the ordinary. Read, share, and explore!
        </p>
      </div>

      {/* Latest Posts Section */}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <div className="mb-5 text-center">
          <h2
            className="fw-bold fs-1"
            style={{
              color: "#e0e0e0",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Latest Posts
          </h2>
          <p
            style={{
              color: "#aaa",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1rem",
              lineHeight: "1.5",
            }}
          >
            Stay updated with the latest insights, stories, and trends from our
            blog. Don't miss out on what's new and exciting!
          </p>
        </div>

        {/* LatestPost Component */}
        <LatestPost />
      </div>

      {/* Footer Section */}
      <footer
        className="text-center py-4"
        style={{
          backgroundColor: "#111",
          color: "#777",
          fontSize: "0.9rem",
          marginTop: "",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} My Blog. All Rights Reserved.
        </p>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/imshivamgaur/BLOG-APPLICATION-PROJECT"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#4caf50", textDecoration: "none" }}
          >
            SR GROUP
          </a>
        </p>
      </footer>
    </>
  );
}