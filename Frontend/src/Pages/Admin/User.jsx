import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { delet, get } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function User() {
  const [Users, setUsers] = useState([]);
  const [loadedata, setLoadedata] = useState(false);

  const handleDelete = async (userId) => {
    // Display a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        const response = await delet(`/dashboard/delete/${userId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata); // Trigger reloading the data
        } else {
          toast.error("Failed to delete the user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await get("/dashboard/users");
        const data = response.data;
        setUsers(data.Users);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [loadedata]);

  return (
    <div className="container py-5">
      <h1 className="text-white text-center mb-4">Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Users &&
              Users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.FullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-danger text-white d-flex align-items-center px-3 py-2 rounded"
                      style={{
                        backgroundColor: "#e74c3c",
                        border: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
