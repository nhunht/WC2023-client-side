import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../apis/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import UserApi from "../../apis/services/User";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { login, loginWithGoogle, createUser } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async () => {
    try {
      await login(user.username, user.password);

      navigate("");
      window.location.reload();
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      let response = await UserApi.gets({
        username: JSON.parse(localStorage.getItem("email")),
        isAdmin: false,
      });

      if (!response.users[0]) {
        await UserApi.post({
          username: JSON.parse(localStorage.getItem("email")),
          name: JSON.parse(localStorage.getItem("name")),
          password: "",
          YOB: 2001,
          isAdmin: false,
        });
        await createUser(
          JSON.parse(localStorage.getItem("email")),
          Math.random().toString(36).slice(-8)
        );
      }

      navigate("");
      window.location.reload();
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
                  <h1>Login</h1>
                </div>
              </div>
              <div className="message-body">
                <form method="post">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      <i
                        className="fas fa-envelope"
                        style={{ marginRight: "6px" }}
                      />
                      Email address
                    </label>
                    <input
                      type="email"
                      name="username"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      <i
                        className="fas fa-key"
                        style={{ marginRight: "6px" }}
                      />
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter Password"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group navbar-end">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="col-md-12 text-center">
                    <Link
                      className="btn btn-block mybtn btn-primary tx-tfm"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={handleLogin}
                    >
                      Signin
                    </Link>
                  </div>
                  <div
                    className="col-md-12 mb-3"
                    style={{ paddingTop: "16px" }}
                  >
                    <p className="text-center">
                      <Link
                        className="google btn mybtn"
                        style={{
                          backgroundColor: "blue",
                          textDecoration: "none",
                          color: "white",
                        }}
                        onClick={handleGoogleLogin}
                      >
                        Sign in using Google
                      </Link>
                    </p>
                  </div>
                  <div className="form-group">
                    <p className="text-center">
                      Don't have account?
                      <Link
                        to="/register"
                        style={{ color: "red", marginLeft: "4px" }}
                      >
                        Signup here
                      </Link>
                    </p>
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

export default Login;
