import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserApi from "../../apis/services/User";
import { useNavigate } from "react-router-dom";

const EditUser = (props) => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserApi.get(
        window.location.pathname.split("/")[2]
      );

      setTitle(response.title);
      setUser(response.user);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateUser = async () => {
    // check all field of user are required
    if (user.name === "" || user.YOB === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      let status = await UserApi.put(user._id, user);

      if (status < 400) {
        if (user._id === props.user._id) {
          props.setUser(user);
        }
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="column">
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Name</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-info"
                name="name"
                type="text"
                placeholder="e.g. Truc Nhu"
                defaultValue={user && user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" htmlFor="YOB">
            YOB
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-info"
                type="number"
                min=""
                max=""
                name="YOB"
                id="YOB"
                placeholder="Year of birth"
                defaultValue={user && user.YOB}
                onChange={(e) => setUser({ ...user, YOB: e.target.value })}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button className="button is-primary" onClick={handleUpdateUser}>
                Save
              </button>
              <Link to="/user">
                <button className="button" type="button">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
