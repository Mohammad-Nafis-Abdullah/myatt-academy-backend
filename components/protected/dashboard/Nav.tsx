"use client";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiUpload, FiPackage } from "react-icons/fi";
import { GrAppsRounded } from "react-icons/gr";
import { FaUserGraduate, FaChevronDown } from "react-icons/fa";
import _ from "lodash";
import { IconType } from "react-icons/lib";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      flexGrow={0}
      flexBasis={"300px"}
      borderRight={"2px"}
      borderRightColor={"#F2F0EE"}
      py={10}
      px={8}
      display={{
        base: "none",
        lg: "flex",
      }}
      flexDirection={"column"}
      gap={5}
    >
      {/* dashboard */}
      <NavigationItem path="/dashboard" icon={IoHomeOutline}>
        Dashboard
      </NavigationItem>

      {/* create */}
      <NavigationItem path="/create" icon={FiUpload}>
        Upload Course
      </NavigationItem>

      {/* courses */}
      <NavigationItem path="/courses" icon={GrAppsRounded}>
        My Courses
      </NavigationItem>

      {/* grades */}
      <Menu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right-start"
      >
        <MenuButton
          bg={isOpen ? "theme.green" : "transparent"}
          _hover={{
            bgColor: "theme.green",
          }}
          borderRadius={5}
        >
          <Flex alignItems={"start"} gap={5} fontSize={"xl"} px={5} py={3}>
            <Icon as={FiPackage} boxSize={6} />
            <Text>Grades</Text>
            <Icon as={FaChevronDown} boxSize={3} alignSelf={"center"} />
          </Flex>
        </MenuButton>
        <MenuList bg={"#F8F6F0"}>
          {_.fill(Array(6), "*").map((val, i) => {
            return (
              <MenuItem key={i} p={0} bg={"#F8F6F0"}>
                <GradeMenu gradeName={`Grade ${i}`} gradePath={`grade-${i}`} />
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {/* all students */}
      <NavigationItem path="/all-students" icon={FaUserGraduate}>
        All Students
      </NavigationItem>
    </Box>
  );
};

export default Nav;

const GradeMenu = ({
  gradeName,
  gradePath,
}: {
  gradeName: string;
  gradePath: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose} placement="right-start">
      <MenuButton
        width={"100%"}
        as={Text}
        fontSize="lg"
        py={3}
        px={5}
        textAlign="left"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        _hover={{
          bgColor: "theme.green",
        }}
        bg={isOpen ? "theme.green" : "#F8F6F0"}
        fontWeight={isOpen ? "bold" : "normal"}
      >
        {gradeName}
      </MenuButton>
      <MenuList
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        mx={-2}
        bg={"#F8F6F0"}
        fontSize="lg"
      >
        {/* math */}
        <CustomMenuItem href={`/course/${gradePath}/math`}>Math</CustomMenuItem>

        {/* language arts */}
        <CustomMenuItem href={`/course/${gradePath}/language-arts`}>
          Language Arts
        </CustomMenuItem>

        {/* science */}
        <CustomMenuItem href={`/course/${gradePath}/science`}>
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
