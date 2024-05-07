"use client";
import { LessInfoCard } from "@/components/DisplayCard";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa6";
import { FaBookBookmark } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <Flex
      py={10}
      px={8}
      flexGrow={1}
      gap={6}
      flexWrap={"wrap"}
      alignContent={"flex-start"}
    >
      {/* total grades */}
      <LessInfoCard
        icon={SiGoogleclassroom}
        iconProps={{
          color: "#45C881",
          bg: "#E8F8F0",
          borderColor: "#45C881",
        }}
        title="Total Grades"
        highlightedText="0"
      />

      {/* total courses */}
      <LessInfoCard
        icon={FaBook}
        iconProps={{
          color: "#4F7A28",
          bg: "#EDE8F8",
          borderColor: "#4F7A28",
        }}
        title="Total Courses"
        highlightedText="0"
      />

      {/* total lessons */}
      <LessInfoCard
        icon={FaBookBookmark}
        iconProps={{
          color: "theme.darkGreen",
          bg: "#EDE8F8",
          borderColor: "#E1AC1B",
        }}
        title="Total Lessons"
        highlightedText="0"
      />

      {/* total students */}
      <LessInfoCard
        icon={IoIosPeople}
        iconProps={{
          color: "#E1AC1B",
          bg: "#FFF1CB",
          borderColor: "#E1AC1B",
        }}
        title="Total Students"
        highlightedText="0"
      />

      {/* total teachers */}
      <LessInfoCard
        icon={FaGraduationCap}
        iconProps={{
          color: "theme.orange",
          bg: "#FFF1CB",
          borderColor: "#E1AC1B",
        }}
        title="Total Teachers"
        highlightedText="0"
      />
    </Flex>
  );
};

export default Dashboard;
