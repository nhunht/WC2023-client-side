import React, { useState } from "react";
import { UserAuth } from "../../apis/auth/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [searchParams] = useSearchParams();

  const { confirmResetPassword } = UserAuth();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await confirmResetPassword(searchParams.get("oobCode"), newPassword);
      alert("Your password has been reset successfully!");
      // Redirect the user to the login page, or some other appropriate page
      navigate("/login");
    } catch (error) {
      let message = error.message;
      message = message
        .substring(message.indexOf("/") + 1)
        .replace(/[^\w\s]/gi, " ");
      message = message.charAt(0).toUpperCase() + message.slice(1);

      alert(message);
    }
  };

  return (
    <div className="bg">
      <div className="row">
        <div className="col-md-5 mx-auto" style={{ marginTop: "20vh" }}>
          <div id="first">
            <article className="message is-link">
              <div className="message-header">
                <div className="col-md-12 text-center">
                  <h1>Reset Password</h1>
                </div>
              </div>
              <div className="message-body">
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    className="form-control"
                    id="confirmNewPassword"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-block mybtn btn-primary tx-tfm"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
