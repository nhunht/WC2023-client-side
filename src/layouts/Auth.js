import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthHeader from "../components/Header/AuthHeader";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

const AuthLayout = (props) => {
  return (
    <>
      <AuthHeader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AuthLayout;
