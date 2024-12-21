import React, { useEffect, useState } from "react";
import { get } from "../../services/Endpoint";

export default function Admin() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const request = await get("/dashboard");
        const response = request.data;

        if (request.status === 200) {
          setPost(response.Posts);
          setUsers(response.Users);
          setComments(response.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center text-white">Dashboard</h2>
      <div className="row justify-content-center">
        {/* Total Users Card */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm rounded-3"
            style={{
              backgroundColor: "#4caf50", // Green
              color: "#fff",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              height: "180px", // Smaller height
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#388e3c", // Darker green for icon background
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i className="fas fa-users" style={{ fontSize: "24px" }}></i>
              </div>
              <h5 className="card-title">Total Users</h5>
              <p className="card-text" style={{ fontSize: "24px", fontWeight: "bold" }}>
                {users ? users.length : "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm rounded-3"
            style={{
              backgroundColor: "#2196f3", // Blue
              color: "#fff",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              height: "180px", // Smaller height
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#1976d2", // Darker blue for icon background
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i className="fas fa-file-alt" style={{ fontSize: "24px" }}></i>
              </div>
              <h5 className="card-title">Total Posts</h5>
              <p className="card-text" style={{ fontSize: "24px", fontWeight: "bold" }}>
                {post ? post.length : "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm rounded-3"
            style={{
              backgroundColor: "#ff9800", // Orange
              color: "#fff",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              height: "180px", // Smaller height
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#f57c00", // Darker orange for icon background
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i className="fas fa-comment" style={{ fontSize: "24px" }}></i>
              </div>
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text" style={{ fontSize: "24px", fontWeight: "bold" }}>
                {comments ? comments.length : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
