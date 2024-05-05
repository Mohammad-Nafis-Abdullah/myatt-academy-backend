import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import React from "react";
import NotificationBell from "./NotificationBell";
import UserBtn from "./UserBtn";

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <Icon
        ref={btnRef}
        as={TiThMenu}
        boxSize={7}
        onClick={onOpen}
        ml={3}
        cursor={"pointer"}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader px={10}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <NotificationBell />
              <UserBtn />
            </Box>
          </DrawerHeader>

          <Divider />

          <DrawerBody></DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
