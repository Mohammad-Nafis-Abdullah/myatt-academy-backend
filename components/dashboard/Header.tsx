import { Box } from "@chakra-ui/react";
import React from "react";
import UserBtn from "./UserBtn";
import NotificationBell from "./NotificationBell";

const Header = () => {
  return (
    <Box
      as="div"
      px={{
        base: 5,
        md: 10,
      }}
      py={5}
      bg={"theme.yellow"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box
        as="img"
        src="/logo.png"
        width={{
          base: "150px",
          md: "200px",
        }}
      />
      <Box display={"flex"} alignItems={"center"} gap={3}>
        <NotificationBell />
        <UserBtn />
      </Box>
    </Box>
  );
};

export default Header;
