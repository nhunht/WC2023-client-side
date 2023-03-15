import React from "react";

const EditUser = () => {
  return (
    <div className="column">
      <form method="POST">
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
                  defaultValue="User name"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label" for="">
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
                  defaultValue="2001"
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
                <button className="button is-primary" type="submit">
                  Save
                </button>
                <a href="/users">
                  <button className="button" type="button">
                    Back
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
