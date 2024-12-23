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
    <div className="container mt-5">
      <h2 className="mb-4 text-light">Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-lg bg-dark text-light mb-4 rounded-lg">
            <div className="card-body">
              <h5 className="card-title text-info">Total Users</h5>
              <p className="card-text fs-4">{users ? users.length : "0"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg bg-dark text-light mb-4 rounded-lg">
            <div className="card-body">
              <h5 className="card-title text-success">Total Posts</h5>
              <p className="card-text fs-4">{post ? post.length : "0"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg bg-dark text-light mb-4 rounded-lg">
            <div className="card-body">
              <h5 className="card-title text-warning">Total Comments</h5>
              <p className="card-text fs-4">
                {comments ? comments.length : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
