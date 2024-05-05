import { Box } from "@chakra-ui/react";
import React from "react";
import UserBtn from "./UserBtn";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <Box bg={"theme.yellow"}>
      <Box
        as="div"
        px={{
          base: 5,
          md: 10,
        }}
        py={5}
        mx={"auto"}
        maxWidth={"8xl"}
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
        <Box
          display={{
            base: "none",
            md: "flex",
          }}
          alignItems={"center"}
          gap={3}
        >
          <NotificationBell />
          <UserBtn />
        </Box>
        <Box
          display={{
            base: "inline-block",
            md: "none",
          }}
        >
          <MobileMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
