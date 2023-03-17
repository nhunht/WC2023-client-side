import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserApi from "../apis/services/User";
import Header from "../components/Header/Header";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import Home from "../screens/Home/Home";
import EditNation from "../screens/Nations/EditNation";
import Nations from "../screens/Nations/Nations";
import EditPlayer from "../screens/Players/EditPlayer";
import Players from "../screens/Players/Players";
import EditUser from "../screens/User/EditUser";
import User from "../screens/User/User";

const UserLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserApi.gets({
        username: JSON.parse(localStorage.getItem("email")),
        isAdmin: false,
      });

      console.log(response.users[0]);
      setUser(response.users[0]);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header path="" user={user} />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/players"
          element={<Players isAdmin={user && user.isAdmin} />}
        />
        <Route
          path="/nations"
          element={<Nations isAdmin={user && user.isAdmin} />}
        />
        <Route
          path="/user"
          element={<User user={user} isAdmin={user && user.isAdmin} />}
        />
        <Route path="/edit-player/*" element={<EditPlayer />} />
        <Route path="/edit-nation/*" element={<EditNation />} />
        <Route
          path="/edit-user/*"
          element={<EditUser user={user} setUser={setUser} />}
        />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
};

export default UserLayout;
