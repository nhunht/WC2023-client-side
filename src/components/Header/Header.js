import { Link, NavLink } from "react-router-dom";
import { UserAuth } from "../../apis/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { path, user } = props;

  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("name");

      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar"
      style={{ background: "blue" }}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="tabs is-large">
          <NavLink to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5nyBspTX9fE7joIYpK-1sPcplcNe-a7ErQ&usqp=CAU"
              width="120"
              height="320"
              alt="Logo"
            />
          </NavLink>
          <NavLink to="/" style={{ color: "black" }}>
            <span className="icon is-small">
              <i className="fas fa-home" aria-hidden="true"></i>
            </span>
            <span>Home</span>
          </NavLink>
          <NavLink to={`${path}/players`} style={{ color: "black" }}>
            <span className="icon is-small">
              <i className="fas fa-futbol" aria-hidden="true"></i>
            </span>
            <span>Players</span>
          </NavLink>
          <NavLink to={`${path}/nations`} style={{ color: "black" }}>
            <span className="icon is-small">
              <i className="fas fa-flag" aria-hidden="true"></i>
            </span>
            <span>Nations</span>
          </NavLink>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons is-right">
              {user && (
                <div
                  className="dropdown is-hoverable"
                  style={{ color: "wheat" }}
                >
                  <div className="dropdown-trigger">
                    <i
                      className="fa fa-user"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      aria-hidden="true"
                    ></i>
                    <span style={{ paddingLeft: "8px", paddingRight: "48px" }}>
                      {user.name}
                    </span>
                  </div>
                  <div
                    className="dropdown-menu notification is-primary is-light"
                    id="dropdown-menu"
                    role="menu"
                  >
                    <span>Welcome!</span>
                    <div className="dropdown-menu-min-width">
                      <Link className="dropdown-item" to={path + "/user"}>
                        <i
                          className="fa fa-user"
                          style={{ paddingRight: "4px" }}
                        />
                        My profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={path + "/change-password"}
                      >
                        <i
                          className="fa fa-key"
                          style={{ paddingRight: "4px" }}
                        />
                        Change password
                      </Link>
                      <Link
                        className="dropdown-item"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {!user && (
                // button login with bulma
                <>
                  <Link className="button is-primary" to="/login">
                    Login
                  </Link>
                  <Link className="button is-light" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
