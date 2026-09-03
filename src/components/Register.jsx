import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrors({
      emailId: "",
      password: "",
      age: "",
    });

    setLoading(true);

    try {
      const res = await axios.post(
        "https://passwordreset-backend-mngj.onrender.com/register",
        {
          emailId,
          password,
          age,
        },
        {
          withCredentials: true,
        }
      );

      console.log("SUCCESS:", res.data);

      sessionStorage.setItem("emailId", emailId);

      navigate("/login");
    } catch (err)  {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("RESPONSE DATA:", err.response?.data);

  const message = err.response?.data?.message;

  if (!message) {
    console.log("No backend message received");
    return;
  }

  console.log("BACKEND MESSAGE:", message);

  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("email") ||
    lowerMessage.includes("account already exists")
  ) {
    setErrors((prev) => ({
      ...prev,
      emailId: message,
    }));
  }

  if (lowerMessage.includes("password")) {
    setErrors((prev) => ({
      ...prev,
      password: message,
    }));
  }

  if (lowerMessage.includes("age")) {
    setErrors((prev) => ({
      ...prev,
      age: message,
    }));
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-4">
      <div
        className="card shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body p-4">

          <h4 className="card-title text-center mb-4">
            Create your account
          </h4>

          <form onSubmit={handleRegister}>


            <div className="mb-3">

              <label htmlFor="email" className="form-label">
                Email address
              </label>

              <input
                id="email"
                type="email"
                className={`form-control ${
                  errors.emailId ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    emailId: "",
                  }));
                }}
              />

              {errors.emailId && (
                <div className="text-danger small mt-1">
                  {errors.emailId}
                </div>
              )}

            </div>


            <div className="mb-3">

              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                id="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
              />

              {errors.password && (
                <div className="text-danger small mt-1">
                  {errors.password}
                </div>
              )}

            </div>


        
            <div className="mb-4">

              <label htmlFor="age" className="form-label">
                Age
              </label>

              <input
                id="age"
                type="number"
                className={`form-control ${
                  errors.age ? "is-invalid" : ""
                }`}
                placeholder="Enter your age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    age: "",
                  }));
                }}
              />

              {errors.age && (
                <div className="text-danger small mt-1">
                  {errors.age}
                </div>
              )}

            </div>


            <div className="d-flex flex-column flex-sm-row gap-2">

              <Link
                to="/login"
                className="btn btn-secondary w-100"
              >
                Login
              </Link>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;


