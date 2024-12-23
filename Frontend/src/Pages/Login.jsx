import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/auth/login", value);
      const response = request.data;
      console.log("login success", response);
      if (request.status === 200) {
        dispatch(setUser(response.user));
        navigate("/");
        toast.success(response.message);
      }
    } catch (error) {
      console.error("login error", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Remove scrollbar
    return () => {
      document.body.style.overflow = "auto"; // Restore scrollbar on unmount
    };
  }, []);

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
        <a
          href="#"
          className="mb-4 text-dark text-decoration-none d-flex align-items-center"
        >
          <Link to={"/"}>
            <span className="h4 mb-0 fw-bold">SR BLOG APP</span>
          </Link>
        </a>
        <div
          className="card w-100"
          style={{
            maxWidth: "400px",
            backgroundColor: "#222", // Darker card background
            borderRadius: "15px", // Rounded corners for the card
            transition: "all 0.3s ease", // Transition for smooth effects
            padding: "20px", // Add padding inside the card to fit the content naturally
          }}
        >
          <div className="card-body p-4">
            <h1 className="h5 mb-4 fw-bold text-light text-center">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-light">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control bg-dark text-light border-secondary rounded-3"
                  id="email"
                  placeholder="xyz@gmail.com"
                  required
                  value={value.email}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={value.password}
                  name="password"
                  className="form-control bg-dark text-light border-secondary rounded-3"
                  id="password"
                  placeholder="••••••••"
                  required
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100 py-2 rounded-3"
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                Sign in
              </button>
            </form>
            <p className="mt-3 mb-0 text-muted text-center">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-success">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
