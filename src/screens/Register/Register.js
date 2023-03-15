import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../apis/auth/AuthContext";
import UserApi from "../../apis/services/User";

const Register = () => {
  const [user, setUser] = React.useState({
    username: "",
    name: "",
    password: "",
    YOB: "",
    isAdmin: false,
  });

  const { createUser } = UserAuth();

  useEffect(() => {
    document.title = "Register";
  });

  const handleSignUp = async () => {
    // check app input filed are required
    if (
      user.username === "" ||
      user.name === "" ||
      user.password === "" ||
      user.YOB === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // check the year of birth so that the corresponding age is 18-45
    var age = new Date().getFullYear() - user.YOB;
    if (age < 18 || age > 45) {
      alert(
        "Please enter a valid year of birth so that the corresponding age is 18-45"
      );
      return;
    }

    try {
      await createUser(user.username, user.password);
      let status = await UserApi.post(user);

      if (status < 400) {
        alert("Register successfully");

        // cleare the input field
        setUser({
          username: "",
          name: "",
          password: "",
          YOB: "",
          isAdmin: false,
        });

        document.getElementById("username").value = "";
        document.getElementById("name").value = "";
        document.getElementById("password").value = "";
        document.getElementById("YOB").value = "";
      }
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
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="second">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>SignUp</h1>
                </div>
              </div>
              <form method="POST">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="username"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    aria-describedby="password"
                    placeholder="Enter Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter first name"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">YOB</label>
                  <input
                    type="number"
                    name="YOB"
                    className="form-control"
                    id="YOB"
                    aria-describedby="YOB"
                    placeholder="Year of birth"
                    onChange={(e) => setUser({ ...user, YOB: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-12 text-center mb-3">
                  <Link
                    className="btn btn-block mybtn btn-primary tx-tfm"
                    onClick={handleSignUp}
                  >
                    Register
                  </Link>
                </div>
                <div className="col-md-12 ">
                  <div className="form-group">
                    <p className="text-center">
                      <Link to="/login" id="signin">
                        Already have an account?
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
