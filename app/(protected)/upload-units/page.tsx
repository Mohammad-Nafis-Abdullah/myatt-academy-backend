"use client";
import {
  SelectInput,
  SingleImageInput,
  TextInput,
} from "@/components/CustomFormInput";
import CustomeStepper from "@/components/protected/upload-units/CustomeStepper";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
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
        <Flex flexDirection={"column"} gap={8} alignItems={"flex-start"}>
          {/* unit title */}
          <Box maxWidth={"500px"} flexGrow={1} width={"100%"}>
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

          {/* select grades */}
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

          {/* select course */}
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

          {/* status */}

          {/* has story */}

          {/* has vocabulary */}

          {/* price */}
          <TextInput
            required={true}
            name="price"
            title="Price"
            type="number"
            placeholder="Enter Price"
            getValue={(key, value) => handleFormData(key, value)}
            value={(key) => formData[key]}
            error={(key) => formError[key] as string}
          />

          {/* description */}

          {/* tag */}

          {/* order */}
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default UploadCourse;
