import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/ForgotPassword/ResetPassword";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

const AuthLayout = (props) => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Header path="/user" />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AuthLayout;
