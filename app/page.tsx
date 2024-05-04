"use client";
import LoginPage from "@/components/login-page/LoginPage";
import { useAppSelector } from "@/redux/store";
import React from "react";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return <LoginPage />;
};

export default Home;
