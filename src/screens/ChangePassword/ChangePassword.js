import React, { useState } from "react";
import { UserAuth } from "../../apis/auth/AuthContext";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { updatePassword } = UserAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      alert("Your password has been updated successfully!");
      // Clear the password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
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
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
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
                    type="submit"
                    className="btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
