"use client";
import CustomeStepper from "@/components/protected/upload-course/CustomeStepper";
import {
  Box,
  Button,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useWindowSize } from "react-use";

const steps = [
  { title: "Unit Overview" },
  { title: "Upload Video" },
  { title: "Submit Process" },
];

const UploadCourse = () => {
  const { width } = useWindowSize();
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Flex
      grow={1}
      flexDirection={"column"}
      alignItems={"center"}
      px={5}
      py={10}
      gap={10}
    >
      {/* custom stepper  */}
      <CustomeStepper activeStep={activeStep} steps={steps} />

      {/* step control button */}
      <Flex justifyContent={"space-between"} maxWidth={"750px"} width={"100%"}>
        <Button onClick={goToPrevious}>prev</Button>
        <Button onClick={goToNext}>next</Button>
      </Flex>
    </Flex>
  );
};

export default UploadCourse;
