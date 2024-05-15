"use client";
import AddCourseModal from "@/components/protected/upload-course/AddCourseModal";
import CourseListTable from "@/components/protected/upload-course/CourseListTable";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UploadCourse = () => {
  return (
    <Flex
      grow={1}
      flexDirection={"column"}
      // alignItems={"center"}
      px={5}
      py={10}
      gap={10}
      overflow={"hidden"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} letterSpacing={1}>
          Course
        </Text>
        <AddCourseModal />
      </Flex>
      <Box overflow={"auto"} width={"100%"}>
        <CourseListTable />
      </Box>
    </Flex>
  );
};

export default UploadCourse;
