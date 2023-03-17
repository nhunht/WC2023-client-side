import React, { useState } from "react";
import { UserAuth } from "../../apis/auth/AuthContext";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const { resetPassword } = UserAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(forgotPasswordEmail);
      
      alert("Check your email and follow the instructions to reset your password");
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
                  <h1>Forgot Password</h1>
                </div>
              </div>
              <div className="message-body">
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-block mybtn btn-primary tx-tfm"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
