"use client";
import {
  RadioInput,
  SelectInput,
  SingleImageInput,
  TextAreaInput,
  TextInput,
} from "@/components/CustomFormInput";
import CustomeStepper from "@/components/protected/upload-units/CustomeStepper";
import {
  Box,
  Button,
  Flex,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useState } from "react";

const steps = [
  { title: "Unit Overview" },
  { title: "Upload Video" },
  { title: "Submit Process" },
];

const UploadCourse = () => {
  // const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({index: 0, count: steps.length});
  const [formData, setFormData] = useState<{ [key: string]: unknown }>({});
  const [formError, setFormError] = useState<{ [key: string]: unknown }>({});

  const [tag, setTag] = useState("");

  const handleFormData = (key: string, val: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <Flex
      grow={1}
      flexDirection={"column"}
      // alignItems={"center"}
      px={5}
      py={10}
      gap={10}
    >
      {/* custom stepper  */}
      {/* <CustomeStepper activeStep={activeStep} steps={steps} /> */}

      {/* step control button */}
      {/* <Flex justifyContent={"space-between"} maxWidth={"750px"} width={"100%"}>
        <Button onClick={goToPrevious}>prev</Button>
        <Button onClick={goToNext}>next</Button>
      </Flex> */}

      <Text fontSize={"xl"} fontWeight={"bold"} alignSelf={"start"}>
        Upload Units :
      </Text>

      <Box as="form">
        <Flex
          flexWrap={"wrap"}
          gap={8}
          alignItems={"flex-start"}
          maxWidth={"700px"}
          // border={"2px"}
          mx={"auto"}
        >
          {/* unit title */}
          <Box flexBasis={"100%"} flexShrink={1}>
            <TextInput
              required={true}
              name="title"
              title="Unit Title"
              placeholder="Enter the unit title"
              getValue={(key, value) => handleFormData(key, value)}
              value={(key) => formData[key]}
              error={(key) => formError[key] as string}
            />
          </Box>

          <Flex
            flexBasis={"100%"}
            flexShrink={1}
            columnGap={10}
            rowGap={5}
            flexWrap={"wrap"}
          >
            {/* select grades */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <SelectInput
                required={true}
                name="grades"
                title="Select Grades"
                placeholder="---"
                getValue={(key, val) => {
                  handleFormData(key, val);
                }}
                error={(key) => formError[key] as string}
                optTitleKey={"title"}
                options={[
                  { title: "Grade 1", value: "1" },
                  { title: "Grade 2", value: "2" },
                  { title: "Grade 3", value: "3" },
                  { title: "Grade 4", value: "4" },
                  { title: "Grade 5", value: "5" },
                  { title: "Grade 6", value: "6" },
                ]}
              />
            </Box>

            {/* select course */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <SelectInput
                required={true}
                name="course"
                title="Select Course"
                placeholder="---"
                getValue={(key, val) => {
                  handleFormData(key, val);
                }}
                error={(key) => formError[key] as string}
                optTitleKey={"title"}
                options={[
                  { title: "Math", value: "math" },
                  { title: "Language Arts", value: "language_arts" },
                  { title: "Science", value: "science" },
                ]}
              />
            </Box>
          </Flex>

          <Flex
            flexBasis={"100%"}
            flexShrink={1}
            columnGap={10}
            rowGap={5}
            flexWrap={"wrap"}
          >
            {/* status */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <RadioInput
                required={true}
                name="status"
                title="Select status"
                getValue={(key, val) => {
                  handleFormData(key, val) as void;
                }}
                error={(key) => formError[key] as string}
                options={[
                  { title: "Active", value: true },
                  { title: "Inactive", value: false },
                ]}
                optTitleKey={"title"}
              />
            </Box>

            {/* has story */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <RadioInput
                required={true}
                name="has_story"
                title="Has Story"
                getValue={(key, val) => {
                  handleFormData(key, val) as void;
                }}
                error={(key) => formError[key] as string}
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false },
                ]}
                optTitleKey={"title"}
              />
            </Box>

            {/* has vocabulary */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <RadioInput
                required={true}
                name="has_vocabulary"
                title="Has Vocabulary"
                getValue={(key, val) => {
                  handleFormData(key, val) as void;
                }}
                error={(key) => formError[key] as string}
                options={[
                  { title: "Yes", value: true },
                  { title: "No", value: false },
                ]}
                optTitleKey={"title"}
              />
            </Box>
          </Flex>

          <Flex
            flexBasis={"100%"}
            flexShrink={1}
            columnGap={10}
            rowGap={5}
            flexWrap={"wrap"}
          >
            {/* price */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <TextInput
                required={true}
                name="price"
                title="Price ($)"
                type="number"
                placeholder="Enter Price"
                getValue={(key, value) => handleFormData(key, value)}
                value={(key) => formData[key]}
                error={(key) => formError[key] as string}
              />
            </Box>

            {/* order */}
            <Box flexBasis={"200px"} flexShrink={1} flexGrow={1}>
              <TextInput
                required={true}
                name="order"
                title="Order"
                type="number"
                placeholder="Enter Order"
                getValue={(key, value) => handleFormData(key, value)}
                value={(key) => formData[key]}
                error={(key) => formError[key] as string}
              />
            </Box>
          </Flex>

          {/* tag */}
          <Box flexBasis={"100%"} flexShrink={1}>
            <TextInput
              required={true}
              name="tag"
              title="Tag"
              placeholder="Enter Tag"
              getValue={(key, value) => {
                setTag(value as string);
              }}
              value={(key) => tag}
              error={(key) => formError[key] as string}
              captionChild={
                Object.keys((formData["tag"] as { [key: string]: true }) || {})
                  ?.length ? (
                  <Flex gap={1} flexWrap={"wrap"}>
                    {Object.keys(
                      formData["tag"] as { [key: string]: true }
                    ).map((tag, i) => {
                      return (
                        <Tag
                          key={i}
                          size={"lg"}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="orange"
                        >
                          <TagLabel color={"black"} fontWeight={"bold"}>
                            {tag}
                          </TagLabel>
                          <TagCloseButton
                            color={"black"}
                            onClick={() => {
                              const data = {
                                ...(formData["tag"] as { [key: string]: true }),
                              };
                              delete data[tag];
                              handleFormData("tag", data);
                            }}
                          />
                        </Tag>
                      );
                    })}
                  </Flex>
                ) : (
                  ""
                )
              }
              props={{
                onKeyUp: (e) => {
                  if (e.key === "Enter") {
                    const data = formData["tag"]
                      ? { ...(formData["tag"] as { [key: string]: true }) }
                      : {};
                    data[tag] = true;
                    handleFormData("tag", data);
                    setTag("");
                  }
                },
              }}
            />
          </Box>

          {/* description */}
          <Box flexBasis={"100%"} flexShrink={1}>
            <TextAreaInput
              required={true}
              name="description"
              title="Description"
              placeholder="Write the description..."
              getValue={(key, value) => handleFormData(key, value)}
              value={(key) => formData[key] as string}
              error={(key) => formError[key] as string}
            />
          </Box>

          {/* choose image */}
          <SingleImageInput
            required={true}
            name="image"
            title="Choose Image"
            placeholder="Choose an image"
            size={"200px"}
            getValue={(key, val) => handleFormData(key, val)}
            value={(key) => formData[key] as File | null}
            error={(key) => formError[key] as string}
            acceptFileType=".png, .jpeg, .jpg, .img, .webp"
          />

          <Flex flexBasis={"100%"} justifyContent={"center"}>
            <Button
              borderRadius={5}
              bg={"theme.orange"}
              _hover={{
                bg: "orangered",
              }}
              transitionDuration={"0"}
              _active={{
                bg: "orangered",
                transform: "scale(0.98)",
              }}
              _disabled={{
                bg: "orangered",
                cursor: "not-allowed",
              }}
              isLoading={false}
              loadingText={"Uploading..."}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UploadCourse;
