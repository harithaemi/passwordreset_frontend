
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const emailId = sessionStorage.getItem("emailId");

  const username = emailId ? emailId.split("@")[0] : "User";

  const HandleLogout = async () => {
    try {
      await axios.post(
        "https://passwordreset-backend-mngj.onrender.com/logout",
        {},
        {
          withCredentials: true,
        }
      );


      sessionStorage.removeItem("emailId");


      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <button
          className="btn btn-primary"
          onClick={HandleLogout}
        >
          Logout
        </button>
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <h1 className="text-primary">
          Welcome {username}
        </h1>
      </div>
    </>
  );
};

export default Dashboard;


