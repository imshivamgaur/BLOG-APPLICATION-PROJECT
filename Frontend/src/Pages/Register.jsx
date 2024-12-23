import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null, // To store the selected image
  });

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Remove scrollbar
    return () => {
      document.body.style.overflow = "auto"; // Restore scrollbar on unmount
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", value.fullName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("profile", value.image);

    try {
      const response = await post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (data.success) {
        console.log(data.message);
        navigate("/login");
        toast.success(data.message);
      }
      console.log("register api", data);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-h-100vh ">
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
            Create an account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <label htmlFor="image" className="form-label text-light">
                Profile Picture
              </label>
              <div className="d-flex justify-content-center">
                <img
                  src={
                    value.image
                      ? URL.createObjectURL(value.image)
                      : "https://via.placeholder.com/150"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  width="100"
                  height="100"
                  style={{ cursor: "pointer" }}
                  onClick={handleImageClick}
                />
              </div>
              <input
                type="file"
                className="form-control d-none"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-light">
                Full Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary rounded-3"
                id="fullName"
                placeholder="John Doe"
                required
                value={value.fullName}
                onChange={(e) =>
                  setValue({ ...value, fullName: e.target.value })
                }
                style={{
                  transition: "all 0.3s ease",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary rounded-3"
                id="email"
                placeholder="xyz@gmail.com"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
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
                className="form-control bg-dark text-light border-secondary rounded-3"
                id="password"
                placeholder="••••••••"
                required
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
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
              Sign up
            </button>
          </form>
          <p className="mt-3 mb-0 text-muted text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-success">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
