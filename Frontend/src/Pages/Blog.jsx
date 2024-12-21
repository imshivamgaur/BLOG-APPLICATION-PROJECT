import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get, post } from "../services/Endpoint";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Blog() {
  const { postId } = useParams(); // Assuming you're passing the post ID in the route
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState("");
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        const response = request.data;
        setSinglePost(response.Post);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]); // Added postId as dependency

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment.");
    } else {
      try {
        const request = await post("/comment/addcomment", {
          comment,
          postId,
          userId: user._id,
        });
        const response = request.data;
        console.log(response);
        setLoaddata((prevState) => !prevState); // Toggle loaddata
        if (response.success) {
          toast.success(response.message);
          setComment("");
        }
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
    }
  };

  return (
    <div className="container mt-5 mb-5 text-white">
      <div className="row">
        <div className="col-md-12">
          <h1 className="fw-bold text-white mb-4 display-4 text-center">
            {singlePost && singlePost.title}
          </h1>
          
          <img
            src={singlePost && `${BaseUrl}/images/${singlePost.image}`}
            alt="Blog Post"
            className="img-fluid mb-4 rounded shadow-lg"
            style={{
              borderRadius: "15px",
              maxHeight: "500px",
              objectFit: "cover",
              width: "100%",
            }}
          />

          <p className="mb-5">{singlePost && singlePost.desc}</p>

          <hr className="text-white" />

          <h3 className="mt-5 mb-4">Leave a Comment</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                className="form-control"
                id="comment"
                rows="4"
                placeholder="Write your comment here..."
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  border: "1px solid #34495e",
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={onSubmitComment}
              style={{
                backgroundColor: "#2980b9",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#3498db")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2980b9")}
            >
              Submit Comment
            </button>
          </form>

          <hr className="text-white" />

          <h3 className="mt-5 mb-4">Comments</h3>
          {singlePost &&
            singlePost.comments &&
            singlePost.comments.map((elem, index) => {
              return (
                <div key={index} className="bg-secondary p-3 rounded mb-3 d-flex">
                  <img
                    src={`${BaseUrl}/images/${elem.userId.profile}`}
                    alt="User"
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h5 className="mb-1">{elem.userId.FullName}</h5>
                    <p className="mb-0">{elem.comment}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
