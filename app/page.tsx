"use client";
import LoginPage from "@/components/home/LoginPage";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "./loading";

const Home = () => {
  const { user, status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  } else if (status === "fulfilled" && user) {
    router.replace("/dashboard");
  } else if (status === "fulfilled" && !user) {
    return <LoginPage />;
  }
};

export default Home;
