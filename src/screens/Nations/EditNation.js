import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NationApi from "../../apis/services/Nation";
import { useNavigate } from "react-router-dom";

const EditNation = () => {
  const [title, setTitle] = useState("");
  const [nation, setNation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await NationApi.get(
        window.location.pathname.split("/")[3]
      );

      setTitle(response.title);
      setNation(response.nation);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateNation = async () => {
    // check all field of nation are required
    if (nation.name === "" || nation.description === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      let status = await NationApi.put(nation._id, nation);

      if (status < 400) {
        navigate("/user/nations");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="column">
      <form>
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
                  placeholder="e.g. Vietnam"
                  defaultValue={nation && nation.name}
                  onChange={(e) =>
                    setNation({ ...nation, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Description</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  className="input is-info"
                  name="description"
                  type="text"
                  placeholder="Some description about this country"
                  defaultValue={nation && nation.description}
                  onChange={(e) =>
                    setNation({ ...nation, description: e.target.value })
                  }
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
                <Link
                  className="button is-primary"
                  onClick={handleUpdateNation}
                >
                  Save
                </Link>
                <Link to="/user/nations">
                  <button className="button" type="button">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNation;
