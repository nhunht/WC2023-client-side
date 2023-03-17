import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlayerApi from "../../apis/services/Player";
import Footer from "../../components/Footer/Footer";

const Players = (props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState(null);
  const [nations, setNations] = useState(null);
  const [positions, setPositions] = useState(null);
  const [player, setPlayer] = useState({
    name: "",
    nationId: "",
    position: "",
    isCaptain: true,
    goals: -1,
    image: "",
  });
  const [search, setSearch] = useState(null);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let params = {
      pageIndex: pageIndex ?? 1,
    }

    if (search) {
      params.search = search;
    }

    const fetchData = async () => {
      let response = await PlayerApi.gets(params);

      setTitle(response.title);
      setPlayers(response.players);
      setNations(response.nations);
      setPositions(response.positions);
      setTotalPages(response.totalPages);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pageIndex, search]);

  const fetchData = async () => {
    let response = await PlayerApi.gets({ pageIndex: pageIndex ?? 1 });

    setTitle(response.title);
    setPlayers(response.players);
    setNations(response.nations);
    setPositions(response.positions);
    setTotalPages(response.totalPages);
  };

  const handleAddPlayer = async () => {
    // check all field of player are required
    if (player.name === "" || player.goals < 0 || player.image === "") {
      alert("Please fill all fields");
      return;
    }

    if (player.nationId === "" || player.position === "") {
      player.nationId = nations[0]._id;
      player.position = positions[0].name;
    }

    try {
      let status = await PlayerApi.post(player);

      if (status < 400) {
        fetchData();
        setPageIndex(totalPages);
        closePopup();

        // clear value of input field
        setPlayer({
          name: "",
          nationId: "",
          position: "",
          isCaptain: true,
          goals: -1,
          image: "",
        });

        document.getElementById("name").value = "";
        document.getElementById("goals").value = "";
        document.getElementById("image").value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePlayer = async (id, name) => {
    // show confirm before delete
    if (!window.confirm(`Are you sure you want to delete player: ${name}?`)) {
      return;
    }

    try {
      let status = await PlayerApi.delete(id);

      if (status < 400) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPopup = () => {
    document.getElementById("popup").classList.add("is-active");
  };

  const closePopup = () => {
    document.getElementById("popup").classList.remove("is-active");
  };

  return (
    <>
      <div
        className="notification is-link is-light"
        style={{ backgroundColor: "rgb(205, 223, 247)" }}
      >
        <div className="buttons is-right">
          <div
            className="control has-icons-left"
            style={{ marginBottom: "8px" }}
          >
            <input
              className="input"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setPageIndex(1);
                setSearch(e.target.value.toLocaleLowerCase());
              }}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <button
            className="button"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={openPopup}
          >
            Add
          </button>
        </div>

        <table
          className="table is-fullwidth"
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Position</th>
              <th>Goals</th>
              <th>Is Captain</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map players */}
            {players &&
              players.map((player) => (
                <tr key={player._id}>
                  <td>
                    <figure className="image is-64x64">
                      <img src={player.image} alt={player.name} />
                    </figure>
                  </td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.goals}</td>
                  <td>{`${player.isCaptain}`}</td>
                  <td>
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <i
                          className="fa fa-bars"
                          aria-hidden="true"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                        ></i>
                      </div>
                      <div
                        className="dropdown-menu"
                        id="dropdown-menu"
                        role="menu"
                      >
                        <div className="dropdown-content">
                          <Link
                            to={`/edit-player/${player._id}`}
                            className="dropdown-item"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeletePlayer(player._id, player.name);
                            }}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            {/* Close map */}
          </tbody>
        </table>
      </div>

      <div id="popup" className="modal">
        <div className="modal-background" onClick={closePopup}></div>
        <div className="modal-card">
          <header
            className="modal-card-head"
            style={{ backgroundColor: "blue" }}
          >
            <p className="modal-card-title" style={{ color: "wheat" }}>
              Add Player
            </p>
            <button
              className="delete"
              aria-label="close"
              style={{ backgroundColor: "red" }}
              onClick={closePopup}
            ></button>
          </header>
          <section className="modal-card-body">
            <form id="newPlayerForm" method="post">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label" style={{ width: "10%" }}>
                    Name:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control" style={{ width: "90%" }}>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="e.g. Truc Nhu"
                          onChange={(e) =>
                            setPlayer({ ...player, name: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label" style={{ width: "10%" }}>
                    Nation:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control" style={{ width: "100%" }}>
                      <div className="select is-fullwidth">
                        <select
                          name="nation"
                          onChange={(e) =>
                            setPlayer({ ...player, nationId: e.target.value })
                          }
                        >
                          {/* Map nations */}
                          {nations &&
                            nations.map((nation) => (
                              <option key={nation._id} value={nation._id}>
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
                  <label className="label" style={{ width: "10%" }}>
                    Position:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control" style={{ width: "100%" }}>
                      <div className="select is-fullwidth">
                        <select
                          name="position"
                          onChange={(e) =>
                            setPlayer({ ...player, position: e.target.value })
                          }
                        >
                          {/* Map positions */}
                          {positions &&
                            positions.map((position) => (
                              <option key={position.id} value={position.name}>
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
                  <label className="label" style={{ width: "10%" }}>
                    IsCaptain?
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control" style={{ width: "100%" }}>
                      <div className="select is-fullwidth">
                        <select
                          name="isCaptain"
                          onChange={(e) =>
                            setPlayer({ ...player, isCaptain: e.target.value })
                          }
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label" style={{ width: "10%" }}>
                    Goals:{" "}
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control" style={{ width: "90%" }}>
                      <input
                        className="input is-info"
                        id="goals"
                        name="goals"
                        min="0"
                        type="number"
                        placeholder="Number of goals"
                        onChange={(e) =>
                          setPlayer({ ...player, goals: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label
                    className="label"
                    style={{ width: "10%" }}
                    htmlFor="image"
                  >
                    Image URL:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control" style={{ width: "90%" }}>
                      <input
                        className="input"
                        type="url"
                        id="image"
                        name="image"
                        placeholder="URL of image"
                        onChange={(e) =>
                          setPlayer({ ...player, image: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <Link className="button is-success" onClick={handleAddPlayer}>
              Add
            </Link>
            <button
              className="button"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={closePopup}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>

      <Footer
        {...props}
        pageIndex={pageIndex}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
      />
    </>
  );
};

export default Players;
