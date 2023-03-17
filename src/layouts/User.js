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
      <Header path="/user" user={user} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/nations" element={<Nations />} />
        <Route path="/list" element={<User user={user} />} />
        <Route path="/edit-player/*" element={<EditPlayer />} />
        <Route path="/edit-nation/*" element={<EditNation />} />
        <Route path="/edit-user/*" element={<EditUser />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
};

export default UserLayout;
