"use client";
import { useAppSelector } from "@/redux/store";
import { notFound } from "next/navigation";
import React from "react";
import Loading from "../loading";
import Header from "../../components/dashboard/Header";
import Hero from "@/components/dashboard/Hero";
import { Box } from "@chakra-ui/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "fulfilled" && !user) {
    return notFound();
  }
  return (
    <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
      <Header />
      <Hero />
      <Box flexGrow={1} bg={"#F8F6F0"} px={3} py={10}>
        <Box bg={"#FFFFFF"} mx={"auto"} maxWidth={"8xl"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
