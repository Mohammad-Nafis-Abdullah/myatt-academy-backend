"use client";
import { useAppSelector } from "@/redux/store";
import { notFound } from "next/navigation";
import React from "react";
import Loading from "../loading";
import Header from "../../components/dashboard/Header";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "fulfilled" && !user) {
    return notFound();
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedLayout;
