"use client";
import { SelectInput } from "@/components/CustomFormInput";
import UnitCard from "@/components/protected/my-courses/UnitCard";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import _ from "lodash";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Obj_schema {
  [key: string]: unknown;
}

const MyCourses = () => {
  const [grade, setGrade] = useState<Obj_schema | null>(null);
  const [course, setCourse] = useState<Obj_schema | null>(null);
  return (
    <Flex
      grow={1}
      flexDirection={"column"}
      // alignItems={"center"}
      px={5}
      py={10}
      gap={10}
    >
      <Flex
        flexWrap={"wrap"}
        gap={3}
        alignItems={{
          base: "stretch",
          sm: "flex-end",
        }}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
        shadow={"md"}
        p={2}
        border={"1px"}
        borderRadius={8}
        borderColor={"#F2F0EE"}
        borderBottom={"none"}
      >
        <Box
          flexBasis={{
            base: "auto",
            sm: "150px",
          }}
          maxWidth={{
            base: "auto",
            sm: "200px",
          }}
          flexGrow={1}
          flexShrink={1}
        >
          <SelectInput
            name=""
            title="Select Grade"
            placeholder="---"
            options={[
              { title: "Grade 1", value: 1 },
              { title: "Grade 2", value: 2 },
              { title: "Grade 3", value: 3 },
              { title: "Grade 4", value: 4 },
              { title: "Grade 5", value: 5 },
              { title: "Grade 6", value: 6 },
            ]}
            optTitleKey={"title"}
            getValue={(key, val) => {
              setGrade(val);
            }}
            error={(key) => ""}
          />
        </Box>
        <Box
          flexBasis={{
            base: "auto",
            sm: "150px",
          }}
          maxWidth={{
            base: "auto",
            sm: "200px",
          }}
          flexGrow={1}
          flexShrink={1}
        >
          <SelectInput
            name=""
            title="Select Course"
            placeholder="---"
            options={[
              { title: "Math", value: "math" },
              { title: "Language Arts", value: "language_arts" },
              { title: "Science", value: "science" },
            ]}
            optTitleKey={"title"}
            getValue={(key, val) => {
              setCourse(val);
            }}
            error={(key) => ""}
          />
        </Box>
        <Button
          bg={"theme.orange"}
          boxSize={10}
          _active={{
            bg: "theme.orange",
            transform: "scale(0.98)",
          }}
          _disabled={{
            bg: "theme.orange",
            _hover: {
              bg: "theme.orange",
              cursor: "not-allowed",
            },
          }}
          borderRadius={5}
          width={{
            base: "100%",
            sm: "auto",
          }}
          mt={2}
          // isLoading={false}
        >
          <Icon as={FaSearch} boxSize={6} />
        </Button>
      </Flex>
      {_.fill(Array(5), "*").map((v, i) => {
        return (
          <UnitCard
            img={i % 2 == 0 ? "/icon.png" : ""}
            isPublished={i % 4 == 0 ? true : false}
            isFree={i % 3 == 0 ? true : false}
            title="Unit Test: I Win with Comparison (Part 2)"
            onEdit_click={() => {
              alert("Edit clicked");
            }}
            videoCount={i}
            duration={{ minute: i + 1, second: i + 2 }}
            enrolledCount={i + 3}
            onUpload_click={() => {
              alert("Upload clicked");
            }}
            onDelete_click={() => {
              alert("Delete clicked");
            }}
            onVocabulary_click={() => {
              alert("Vocabulary clicked");
            }}
            onStory_click={() => {
              alert("Story clicked");
            }}
            onPractice_click={() => {
              alert("Practice clicked");
            }}
            onQuiz_click={() => {
              alert("Quiz clicked");
            }}
            key={i}
          />
        );
      })}
    </Flex>
  );
};

export default MyCourses;
