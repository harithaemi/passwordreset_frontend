import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    emailId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({
      emailId: "",
      password: "",
    });

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      sessionStorage.setItem("emailId", emailId);

      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err);
      console.log("Response:", err.response?.data);

      const backendErrors = err.response?.data?.errors;

      if (backendErrors) {
        setErrors({
          emailId: backendErrors.emailId || "",
          password: backendErrors.password || "",
        });
      } else {
    
        const message = err.response?.data?.message;

        if (message) {
          const lowerMessage = message.toLowerCase();

          if (lowerMessage.includes("email")) {
            setErrors((prev) => ({
              ...prev,
              emailId: message,
            }));
          } else if (
            lowerMessage.includes("password") ||
            lowerMessage.includes("credentials")
          ) {
            setErrors((prev) => ({
              ...prev,
              password: message,
            }));
          }
        }
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
            Login
          </h4>

          <form onSubmit={handleLogin}>

           
            <div className="mb-3">

              <label htmlFor="email" className="form-label">
                Email address
              </label>

              <input
                type="email"
                id="email"
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
                type="password"
                id="password"
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


          
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mt-4">

              <Link to="/forgotpassword">
                Forgot password?
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
