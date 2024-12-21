import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const request = await post("/auth/logout");
      const response = request.data;
      if (request.status === 200) {
        navigate("/login");
        dispatch(removeUser());
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-3 shadow-lg" style={{ backgroundColor: "#1f1f1f" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to={"/"} className="navbar-brand text-white">
          <h1 className="mx-5 fs-2 fw-bold logo-hover">
            CodeBySR
          </h1>
        </Link>
        <div className="d-flex mx-5 align-items-center">
          {/* Conditional rendering based on user authentication */}
          {!user ? (
            <Link to={"/login"}>
              <button className="btn btn-outline-light mx-3">Sign In</button>
            </Link>
          ) : (
            <>
              <p className=" me-3 fs-5 fw-bold mb-0" style={{ color: "gray" }}>{user.FullName}</p> {/* Increased font size */}
              <div className="dropdown">
                <div
                  className="avatar-container pointer rounded-circle overflow-hidden bg-info"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    width: "50px",   // Increased width
                    height: "50px",  // Increased height
                    cursor: "pointer"
                  }}
                >
                  <img
                    className="img-fluid h-100 w-100"
                    src={`${BaseUrl}/images/${user.profile}`}
                    alt="Profile"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%"  // Ensures the image stays circular
                    }}
                  />
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  {user.role === "admin" && (
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to={`/profile/${user._id}`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
