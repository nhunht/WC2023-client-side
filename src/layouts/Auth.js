import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/ForgotPassword/ResetPassword";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

const AuthLayout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default AuthLayout;
