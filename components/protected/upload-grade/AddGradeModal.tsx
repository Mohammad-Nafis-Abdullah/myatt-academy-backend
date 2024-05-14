import {
  RadioInput,
  SingleImageInput,
  TextInput,
} from "@/components/CustomFormInput";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface selection_field_schema<T> {
  title: string;
  value: T;
}

interface form_schema {
  name: string;
  feature: selection_field_schema<boolean>;
  image: File | null;
  show_publicly: selection_field_schema<boolean>;
}

type form_key = keyof form_schema;

const AddGradeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button
        onClick={onOpen}
        size={"xs"}
        _active={{ bg: "", transform: "scale(0.98)" }}
      >
        <Flex gap={2} alignItems={"center"}>
          <Icon as={FaPlus} />
          <Text>Add Grade</Text>
        </Flex>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent borderRadius={5}>
          <ModalHeader>Add New Grade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddGradeForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddGradeModal;

const AddGradeForm = () => {
  const [formData, setFormData] = useState<form_schema>({} as form_schema);
  const [formError, setFormError] = useState<{ [key in form_key]: string }>(
    {} as { [key in form_key]: string }
  );

  const handleFormData = (key: string, val: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let errorCount = 0;
    // console.log(formData);
    const error: { [key in form_key]: string } = {
      image: "",
      name: "",
      feature: "",
      show_publicly: "",
    };
    // console.log(error);
    for (const key in error) {
      if (!formData[key as form_key]) {
        error[key as form_key] = "This is require field";
        errorCount++;
      }
    }

    if (errorCount) {
      setFormError(error);
      return;
    }

    const data: { [key in form_key]: unknown } = {} as {
      [key in form_key]: unknown;
    };
    data.name = formData.name;
    data.feature = formData.feature.value;
    data.image = formData.image;
    data.show_publicly = formData.show_publicly.value;

    console.log(data);
    setFormData({} as form_schema);
    setFormError({} as { [key in form_key]: string });
  };

  return (
    <Box as="form" overflow={"auto"} p={2}>
      <Flex flexWrap={"wrap"} gap={8} alignItems={"flex-start"} mx={"auto"}>
        {/* grade name */}
        <Box flexBasis={"100%"} flexShrink={1}>
          <TextInput
            required={true}
            name="name"
            title="Grade Name"
            placeholder="Enter the grade name"
            getValue={(key, value) => handleFormData(key, value)}
            value={(key) => formData[key as form_key] || ""}
            error={(key) => formError[key as form_key]}
          />
        </Box>

        {/* feature */}
        <Box flexBasis={"100%"} flexShrink={1} flexGrow={1}>
          <RadioInput
            required={true}
            name="feature"
            title="Feature"
            value={formData.feature}
            getValue={(key, val) => {
              handleFormData(key, val) as void;
            }}
            error={(key) => formError[key as form_key]}
            options={[
              { title: "Yes", value: true },
              { title: "No", value: false },
            ]}
            optTitleKey={"title"}
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
          value={(key) => formData[key as form_key] as File | null}
          error={(key) => formError[key as form_key]}
          acceptFileType=".png, .jpeg, .jpg, .img, .webp"
        />

        {/* show publicly */}
        <Box flexBasis={"100%"} flexShrink={1} flexGrow={1}>
          <RadioInput
            required={true}
            name="show_publicly"
            title="Show Publicly"
            value={formData.show_publicly}
            getValue={(key, val) => {
              handleFormData(key, val) as void;
            }}
            error={(key) => formError[key as form_key]}
            options={[
              { title: "Yes", value: true },
              { title: "No", value: false },
            ]}
            optTitleKey={"title"}
          />
        </Box>

        <Flex flexBasis={"100%"} justifyContent={"center"}>
          <Button
            onClick={handleSubmit}
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
  );
};
