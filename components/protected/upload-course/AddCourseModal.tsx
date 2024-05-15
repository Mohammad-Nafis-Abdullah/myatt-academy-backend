import {
  RadioInput,
  SelectInput,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocalStorage } from "react-use";
import { course_schema } from "./CourseListTable";

interface selection_field_schema<T> {
  title: string;
  value: T;
}

interface form_schema {
  category: selection_field_schema<string>;
  name: string;
  price: number | string;
  image: File | null | string;
  show_publicly: selection_field_schema<boolean>;
  has_story: selection_field_schema<boolean>;
  has_vocabulary: selection_field_schema<boolean>;
}

type form_key = keyof form_schema;

const grade_opt_list = [
  { title: "Grade 1", value: "1" },
  { title: "Grade 2", value: "2" },
  { title: "Grade 3", value: "3" },
  { title: "Grade 4", value: "4" },
  { title: "Grade 5", value: "5" },
  { title: "Grade 6", value: "6" },
];

const AddCourseModal = () => {
  const [state, setState] = useLocalStorage<course_schema | null>(
    "course_modal_state",
    null
  );
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      router.push(pathname);
      setState(null);
    },
  });
  const searchParams = useSearchParams();

  // modal open and close according to search param
  useEffect(() => {
    const param = searchParams.get("modal");
    if (param === "course_modal") {
      onOpen();
    } else {
      onClose();
    }
  }, [searchParams, onOpen, onClose]);

  return (
    <Box>
      <Button
        onClick={() => router.push("?modal=course_modal")}
        size={"xs"}
        _active={{ bg: "", transform: "scale(0.98)" }}
      >
        <Flex gap={2} alignItems={"center"}>
          <Icon as={FaPlus} />
          <Text>Add Course</Text>
        </Flex>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent borderRadius={5}>
          <ModalHeader>Add Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddGradeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddCourseModal;

const AddGradeForm = ({ onClose }: { onClose: () => void }) => {
  const [state] = useLocalStorage<course_schema | null>(
    "course_modal_state",
    null
  );
  const [formData, setFormData] = useState<form_schema>({} as form_schema);
  const [formError, setFormError] = useState<{ [key in form_key]: string }>(
    {} as { [key in form_key]: string }
  );

  useEffect(() => {
    if (state) {
      setFormData({
        category: grade_opt_list.find(
          (grade) => grade.title === state.category
        ) as selection_field_schema<string>,
        name: state.name,
        price: state.price,
        image: state.image,
        show_publicly:
          state.status === "Public"
            ? { title: "Yes", value: true }
            : { title: "No", value: false },
        has_story: state.story
          ? { title: "Yes", value: true }
          : { title: "No", value: false },
        has_vocabulary: state.vocabulary
          ? { title: "Yes", value: true }
          : { title: "No", value: false },
      });
    }
  }, [state]);

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
      category: "",
      name: "",
      price: "",
      image: "",
      show_publicly: "",
      has_story: "",
      has_vocabulary: "",
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
    data.category = formData.category.value;
    data.name = formData.name;
    data.price = formData.price;
    data.image = formData.image;
    data.show_publicly = formData.show_publicly.value;
    data.has_story = formData.has_story.value;
    data.has_vocabulary = formData.has_vocabulary.value;

    console.log(data);
    setFormData({} as form_schema);
    setFormError({} as { [key in form_key]: string });
    onClose();
  };

  return (
    <Box as="form" overflow={"auto"} p={2}>
      <Flex flexWrap={"wrap"} gap={8} alignItems={"flex-start"} mx={"auto"}>
        {/* category */}
        <Box flexBasis={"100%"} flexShrink={1}>
          <SelectInput
            required={true}
            name="category"
            title="Category"
            placeholder="---"
            value={formData.category}
            getValue={(key, val) => {
              handleFormData(key, val) as void;
            }}
            error={(key) => formError[key as form_key]}
            options={grade_opt_list}
            optTitleKey={"title"}
          />
        </Box>

        {/* name */}
        <Box flexBasis={"100%"} flexShrink={1}>
          <TextInput
            required={true}
            name="name"
            title="Name"
            placeholder="Enter the name"
            getValue={(key, value) => handleFormData(key, value)}
            value={(key) => formData[key as form_key] || ""}
            error={(key) => formError[key as form_key]}
          />
        </Box>

        {/* price */}
        <Box flexBasis={"100%"} flexShrink={1}>
          <TextInput
            required={true}
            name="price"
            title="Price"
            type="number"
            placeholder="Enter the price"
            getValue={(key, value) => handleFormData(key, value)}
            value={(key) => formData[key as form_key] || ""}
            error={(key) => formError[key as form_key]}
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

        {/* has story */}
        <Box flexBasis={"100%"} flexShrink={1} flexGrow={1}>
          <RadioInput
            required={true}
            name="has_story"
            title="Has Story"
            value={formData.has_story}
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

        {/* has vocabulary */}
        <Box flexBasis={"100%"} flexShrink={1} flexGrow={1}>
          <RadioInput
            required={true}
            name="has_vocabulary"
            title="Has Vocabulary"
            value={formData.has_vocabulary}
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
