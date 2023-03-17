import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NationApi from "../../apis/services/Nation";
import Footer from "../../components/Footer/Footer";

const Nations = (props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [title, setTitle] = useState("");
  const [nations, setNations] = useState(null);
  const [nation, setNation] = useState({
    name: "",
    description: "",
  });
  const [search, setSearch] = useState(null);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let params = {
      pageIndex: pageIndex ?? 1,
    };

    if (search) {
      params.search = search;
    }

    const fetchData = async () => {
      let response = await NationApi.gets(params);

      setTitle(response.title);
      setNations(response.nations);
      setTotalPages(response.totalPages);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pageIndex, search]);

  const fetchData = async () => {
    let response = await NationApi.gets({ pageIndex: pageIndex ?? 1 });

    setTitle(response.title);
    setNations(response.nations);
    setTotalPages(response.totalPages);
  };

  const handleAddNation = async () => {
    // check all field of nation are required
    if (nation.name === "" || nation.description === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      let status = await NationApi.post(nation);

      if (status < 400) {
        fetchData();
        setPageIndex(totalPages);
        closePopup();

        // clear value of input field
        setNation({
          name: "",
          description: "",
        });

        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNation = async (id, name) => {
    // show confirm before delete
    if (!window.confirm(`Are you sure you want to delete nation: ${name}?`)) {
      return;
    }

    try {
      let status = await NationApi.delete(id);

      if (status < 400) {
        fetchData();
      } else {
        alert("Delete failed, some players are linked to this nation");
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
                setSearch(e.target.value);
              }}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <button
            className="button is-primary"
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
              <th>Ensign</th>
              <th>Name</th>
              <th>Description</th>
              <th hidden={!props.isAdmin}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Nations map */}
            {nations &&
              nations.map((nation) => (
                <tr key={nation._id}>
                  <td>
                    <figure className="image is-64x64">
                      <img src={nation.ensign} alt={nation.name} />
                    </figure>
                  </td>
                  <td>{nation.name}</td>
                  <td>{nation.description}</td>
                  <td hidden={!props.isAdmin}>
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <i
                          className="fa fa-bars"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div
                        className="dropdown-menu"
                        id="dropdown-menu"
                        role="menu"
                      >
                        <div className="dropdown-content">
                          <Link
                            to={`/edit-nation/${nation._id}`}
                            className="dropdown-item"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={(event) => {
                              event.preventDefault();
                              handleDeleteNation(nation._id, nation.name);
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
              Add Nation
            </p>
            <button
              className="delete"
              aria-label="close"
              style={{ backgroundColor: "red" }}
              onClick={closePopup}
            ></button>
          </header>
          <section className="modal-card-body">
            <form id="newNationForm" method="post">
              <div className="field">
                <label className="label" htmlFor="name">
                  Name:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Vietnam"
                    onChange={(e) =>
                      setNation({ ...nation, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="description">
                  Description:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Say somthing about this country"
                    onChange={(e) =>
                      setNation({ ...nation, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleAddNation}>
              Add
            </button>
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

export default Nations;
