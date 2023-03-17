import { Route, Routes } from "react-router-dom";
import AuthLayout from "../../layouts/Auth";
import UserLayout from "../../layouts/User";

const AuthorRoute = () => {
  const email = JSON.parse(localStorage.getItem("email"));

  if (!email) {
    return (
      <Routes>
        <Route path="/*" element={<AuthLayout />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/user/*" element={<UserLayout />} />
      </Routes>
    );
  }
};

export default AuthorRoute;
