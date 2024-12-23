import React, { useState } from "react";
import { post } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log("image", image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append("postimg", image);
      }
      formData.append("title", title);
      formData.append("desc", description);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await post("/blog/create", formData);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setImage(null);
        setDescription("");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="card shadow-lg"
            style={{ borderRadius: "10px", backgroundColor: "#2b2b2b" }}
          >
            <div
              className="card-header text-white"
              style={{
                backgroundColor: "#1f1f1f",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <h2 className="text-center mb-0">Add New Post</h2>
            </div>
            <div className="card-body p-4" style={{ backgroundColor: "#333" }}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="postImage" className="form-label text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      borderColor: "#555",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      borderColor: "#555",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="postDescription"
                    className="form-label text-white"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="postDescription"
                    rows="6"
                    placeholder="Write your post description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      borderColor: "#555",
                    }}
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#2980b9")
                    } // Darker blue on hover
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#3498db")
                    } // Original blue color on mouse out
                  >
                    Submit Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
