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
      <Box py={10} px={8} flexGrow={1}>
        Box 2
      </Box>
    </Flex>
  );
};

export default Dashboard;
