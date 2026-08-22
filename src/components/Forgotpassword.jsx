import React, { useState } from "react";
import axios from "axios";

const Forgotpassword = () => {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!emailId.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending email:", emailId);

      const res = await axios.post(
        "https://passwordreset-backend-mngj.onrender.com/forgotpassword",
        {
          emailId: emailId.trim(),
        }
      );

      console.log("SUCCESS:", res.data);

      setSuccess(
        res.data.message || "Reset password link has been sent to your email"
      );

      setEmailId("");
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      if (err.response) {
        setError(
          err.response.data?.message || "Request failed"
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please try again."
        );
      } else {
        setError("Something went wrong");
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

          <h4 className="card-title text-center mb-2">
            Forgot Password
          </h4>

          <p className="text-muted text-center mb-4">
            Enter your email address to receive a password reset link.
          </p>

          <form onSubmit={handleForgotPassword}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>

              <input
                type="email"
                id="email"
                className={`form-control ${
                  error ? "is-invalid" : ""
                }`}
                placeholder="name@example.com"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />

              {error && (
                <div className="text-danger small mt-1">
                  {error}
                </div>
              )}
            </div>

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
                {loading ? "Sending..." : "Send link"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
