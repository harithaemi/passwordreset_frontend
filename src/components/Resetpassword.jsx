import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setErrors({
      password: "",
      confirmPassword: "",
      general: "",
    });

    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `https://passwordreset-backend-mngj.onrender.com/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      console.log(res.data);

      setSuccess(
        res.data.message || "Password reset successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.log("Reset password error:", err);
      console.log("Response:", err.response?.data);

      const message = err.response?.data?.message;

      if (!message) {
        setErrors((prev) => ({
          ...prev,
          general: "Something went wrong",
        }));

        return;
      }

      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("password")) {
        if (lowerMessage.includes("match")) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: message,
          }));
        }
      } else if (
        lowerMessage.includes("reset") ||
        lowerMessage.includes("expired") ||
        lowerMessage.includes("invalid")
      ) {
        setErrors((prev) => ({
          ...prev,
          general: message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: message,
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
            Reset Password
          </h4>

          <form onSubmit={handleResetPassword}>

          
            <div className="mb-3">

              <label htmlFor="password" className="form-label">
                New Password
              </label>

              <input
                type="text"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                    general: "",
                  }));

                  setSuccess("");
                }}
              />

              {errors.password && (
                <div className="text-danger small mt-1">
                  {errors.password}
                </div>
              )}

            </div>


          
            <div className="mb-3">

              <label
                htmlFor="confirmPassword"
                className="form-label"
              >
                Confirm Password
              </label>

              <input
                type="text"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                    general: "",
                  }));

                  setSuccess("");
                }}
              />

              {errors.confirmPassword && (
                <div className="text-danger small mt-1">
                  {errors.confirmPassword}
                </div>
              )}

            </div>


       
            {errors.general && (
              <div className="alert alert-danger py-2">
                {errors.general}
              </div>
            )}


           
            {success && (
              <div className="alert alert-success py-2">
                {success}
              </div>
            )}


           
            <div className="d-grid mt-4">

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
