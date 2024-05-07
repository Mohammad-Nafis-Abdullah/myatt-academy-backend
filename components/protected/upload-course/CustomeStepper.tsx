import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useWindowSize } from "react-use";

const CustomeStepper = ({
  activeStep,
  steps,
}: {
  activeStep: number;
  steps: {
    title: string;
  }[];
}) => {
  const { width } = useWindowSize();
  return (
    <Stepper
      index={activeStep}
      // border={"2px"}
      orientation={width < 768 ? "vertical" : "horizontal"}
      maxWidth={"750px"}
      width={"100%"}
      shadow={"md"}
      borderRadius={10}
      px={5}
      py={10}
      border={"1px"}
      borderColor={"#F2F0EE"}
      borderBottom={"none"}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>
              <Text color={activeStep > index ? "orangered" : "orange"}>
                {step.title}
              </Text>
            </StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomeStepper;
