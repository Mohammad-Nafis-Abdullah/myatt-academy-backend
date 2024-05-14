"use client";
import AddGradeModal from "@/components/protected/upload-grade/AddGradeModal";
import GradeListTable from "@/components/protected/upload-grade/GradeListTable";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UploadGrade = () => {
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
          Grade List
        </Text>
        <AddGradeModal />
      </Flex>
      <Box overflow={"auto"} width={"100%"}>
        <GradeListTable />
      </Box>
    </Flex>
  );
};

export default UploadGrade;
