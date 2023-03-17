import React, { useState } from "react";
import { UserAuth } from "../../apis/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { changePassword } = UserAuth();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check all fields are filled
    if (!newPassword || !confirmNewPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await changePassword(newPassword);
      alert("Your password has been updated successfully!");
      // Clear the password fields
      navigate("/user/list");
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
    <div className="row">
      <div className="col-md-5 mx-auto" style={{ marginTop: "10vh" }}>
        <div id="first">
          <article className="message is-link">
            <div className="message-header">
              <div className="col-md-12 text-center">
                <h1>Change Password</h1>
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
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
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
                  onClick={handleChangePassword}
                >
                  Update Password
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
