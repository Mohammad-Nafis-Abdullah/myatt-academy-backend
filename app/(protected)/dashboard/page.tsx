"use client";
import DashboardOutlet from "@/components/protected/dashboard/DashboardOutlet";
import Nav from "@/components/protected/dashboard/Nav";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <Flex
      bg={"#FFFFFF"}
      mx={"auto"}
      maxWidth={"8xl"}
      minHeight={"80vh"}
      border={"2px"}
      borderColor={"#F2F0EE"}
      borderRadius={10}
    >
      <Nav />
      <DashboardOutlet />
    </Flex>
  );
};

export default Dashboard;
