import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import React, { ReactNode, useState, useRef } from "react";
import NotificationBell from "./NotificationBell";
import UserBtn from "./UserBtn";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { FaChevronDown, FaUserGraduate } from "react-icons/fa";
import { FiPackage, FiUpload } from "react-icons/fi";
import { GrAppsRounded } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import _ from "lodash";

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

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

          <DrawerBody>
            <Navbar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box py={10} px={3} display={"flex"} flexDirection={"column"} gap={5}>
      {/* dashboard */}
      <NavigationItem path="/dashboard" icon={IoHomeOutline}>
        Dashboard
      </NavigationItem>

      {/* create */}
      <NavigationItem path="/upload-units" icon={FiUpload}>
        Upload Units
      </NavigationItem>

      {/* courses */}
      <NavigationItem path="/my-courses" icon={GrAppsRounded}>
        My Courses
      </NavigationItem>

      {/* grades */}
      <Flex
        alignItems={"start"}
        gap={5}
        fontSize={"xl"}
        bg={isOpen ? "theme.green" : ""}
        px={5}
        py={3}
        borderEndRadius={isOpen ? 0 : 5}
        borderTopRadius={5}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Icon as={FiPackage} boxSize={6} />
        <Text>Grades</Text>
        <Icon as={FaChevronDown} boxSize={3} alignSelf={"center"} />
      </Flex>
      <Box
        display={isOpen ? "block" : "none"}
        overflow={"hidden"}
        mt={-5}
        bg={"theme.green"}
        borderBottomRadius={5}
      >
        {_.fill(Array(6), "*").map((val, i) => {
          return (
            <Box key={i} p={0} bg={"theme.green"}>
              <GradeMenu gradeName={`Grade ${i + 1}`} gradePath={`${i + 1}`} />
            </Box>
          );
        })}
      </Box>

      {/* all students */}
      <NavigationItem path="/all-students" icon={FaUserGraduate}>
        All Students
      </NavigationItem>
    </Box>
  );
};

const GradeMenu = ({
  gradeName,
  gradePath,
}: {
  gradeName: string;
  gradePath: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right-start"
    >
      <MenuButton
        width={"100%"}
        as={Text}
        fontSize="lg"
        py={3}
        px={5}
        textAlign="left"
        bg={isOpen ? "theme.darkGreen" : "theme.green"}
        fontWeight={isOpen ? "bold" : "normal"}
      >
        {gradeName}
      </MenuButton>
      <MenuList mx={-2} bg={"#F8F6F0"} fontSize="lg">
        {/* math */}
        <CustomMenuItem href={`/grade/${gradePath}/math`}>Math</CustomMenuItem>

        {/* language arts */}
        <CustomMenuItem href={`/grade/${gradePath}/language-arts`}>
          Language Arts
        </CustomMenuItem>

        {/* science */}
        <CustomMenuItem href={`/grade/${gradePath}/science`}>
          Science
        </CustomMenuItem>
      </MenuList>
    </Menu>
  );
};

const NavigationItem = ({
  path,
  children,
  icon,
}: {
  path: string;
  children: ReactNode;
  icon: IconType;
}) => {
  const pathname = usePathname();
  return (
    <Link href={path}>
      <Flex
        alignItems={"start"}
        gap={5}
        fontSize={"xl"}
        bg={pathname === path ? "theme.green" : "transparent"}
        _hover={{
          bgColor: "theme.green",
        }}
        px={5}
        py={3}
        borderRadius={5}
      >
        <Icon as={icon} boxSize={6} />
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
};

const CustomMenuItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const router = useRouter();
  return (
    <MenuItem
      bg={"#F8F6F0"}
      my={1}
      py={1.5}
      px={5}
      _hover={{
        bgColor: "theme.green",
        fontWeight: "bold",
      }}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
    </MenuItem>
  );
};
