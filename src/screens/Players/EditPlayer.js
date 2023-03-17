import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlayerApi from "../../apis/services/Player";
import { useNavigate } from "react-router-dom";

const EditPlayer = (props) => {
  const [title, setTitle] = useState("");
  const [player, setPlayer] = useState(null);
  const [nations, setNations] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isCaptain, setIsCaptain] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await PlayerApi.get(
        window.location.pathname.split("/")[2]
      );

      setTitle(response.title);
      setPlayer(response.player);
      setNations(response.nations);
      setPositions(response.positions);
      setIsCaptain(response.player.isCaptain);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdatePlayer = async () => {
    // check all field of player are required
    if (player.name === "" || player.goals < 0 || player.image === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      let status = await PlayerApi.put(player._id, player);

      if (status < 400) {
        navigate("/players");
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
                  required
                  defaultValue={player && player.name}
                  onChange={(e) =>
                    setPlayer({ ...player, name: e.target.value })
                  }
                  readOnly={!props.isAdmin}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Nation</label>
          </div>
          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="nation"
                    onChange={(e) =>
                      setPlayer({ ...player, nationId: e.target.value })
                    }
                    defaultValue={player && player.nationId}
                    disabled={!props.isAdmin}
                  >
                    {/* Nations map */}
                    {nations &&
                      nations.map((nation) => (
                        <option
                          key={nation._id}
                          selected={player.nationId === nation._id}
                          value={nation._id}
                        >
                          {nation.name}
                        </option>
                      ))}
                    {/* Close map */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Position</label>
          </div>
          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="position"
                    onChange={(e) =>
                      setPlayer({ ...player, position: e.target.value })
                    }
                    defaultValue={player && player.position}
                    disabled={!props.isAdmin}
                  >
                    {/* Positions map */}
                    {positions &&
                      positions.map((position) => (
                        <option
                          key={position.id}
                          selected={player.position === position.name}
                          value={position.name}
                        >
                          {position.name}
                        </option>
                      ))}
                    {/* Close map */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Goals</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  className="input is-info"
                  name="goals"
                  type="number"
                  min="0"
                  defaultValue={player && player.goals}
                  onChange={(e) =>
                    setPlayer({ ...player, goals: e.target.value })
                  }
                  required
                  readOnly={!props.isAdmin}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Is Captain?</label>
          </div>
          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="isCaptain"
                    onChange={(e) =>
                      setPlayer({ ...player, isCaptain: e.target.value })
                    }
                    disabled={!props.isAdmin}
                  >
                    {/* Player is captain? */}
                    <option selected={isCaptain} value="true">
                      True
                    </option>
                    <option selected={!isCaptain} value="false">
                      False
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Image</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  type="url"
                  className="input is-info"
                  name="image"
                  required
                  defaultValue={player && player.image}
                  onChange={(e) =>
                    setPlayer({ ...player, image: e.target.value })
                  }
                  readOnly={!props.isAdmin}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal" hidden={!props.isAdmin}>
          <div className="field-label is-normal"></div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <Link
                  className="button is-primary"
                  onClick={handleUpdatePlayer}
                >
                  Save
                </Link>
                <Link to="/players">
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

export default EditPlayer;
