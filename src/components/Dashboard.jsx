import React from "react";

const Dashboard = () => {
  const emailId = sessionStorage.getItem("emailId");

  const username = emailId
    ? emailId.split("@")[0]
    : "User";

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h1 className="text-primary">
        Welcome {username}
      </h1>
    </div>
  );
};

export default Dashboard;
