import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeApi from "../../apis/services/Home";
import Footer from "../../components/Footer/Footer";

const Home = (props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await HomeApi.gets({ pageIndex: pageIndex ?? 1 });

      setTitle(response.title);
      setPlayers(response.players);
      setTotalPages(response.totalPages);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pageIndex]);

  return (
    <>
      <div
        className="notification is-link is-light"
        style={{ backgroundColor: "rgb(205, 223, 247)" }}
      >
        <section className="container pt-3">
          <div className="columns is-multiline">
            {/* Map players */}
            {players &&
              players.map((player) => (
                <div
                  className="column is-one-third"
                  data-target="modal-image"
                  key={player._id}
                >
                  <div className="card is-shady">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img src={player.nation[0].ensign} alt="Nation" />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">{player.name}</p>
                        </div>
                        <div className="dropdown is-hoverable is-right">
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
                                to={`/user/edit-player/${player._id}`}
                                className="dropdown-item"
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              >
                                Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={player.image} alt="Football player" />
                      </figure>
                    </div>
                  </div>
                </div>
              ))}
            {/* Close map */}
          </div>
        </section>
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

export default Home;
