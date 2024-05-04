import { Badge, Box, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { IoNotifications } from "react-icons/io5";

const NotificationBell = () => {
  return (
    <Box
      position="relative"
      onClick={() => {}}
      cursor={"pointer"}
      display={"inline-block"}
    >
      <Icon as={IoNotifications} boxSize={9} />
      <Badge
        position="absolute"
        top={0}
        right={0}
        px="1.5"
        borderRadius="full"
        variant="solid"
        colorScheme="purple"
      >
        {0}
      </Badge>
    </Box>
  );
};

export default NotificationBell;
