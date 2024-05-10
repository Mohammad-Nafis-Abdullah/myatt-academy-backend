import {
  Badge,
  Box,
  Button,
  ColorProps,
  Flex,
  Icon,
  ResponsiveValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { MdOutlineOndemandVideo, MdDelete } from "react-icons/md";
import { IoTimerOutline, IoPeople } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface UnitCard_schema {
  img?: string;
  isPublished?: boolean;
  isFree?: boolean;
  videoCount?: number;
  duration?: {
    minute: number;
    second: number;
  };
  enrolledCount?: number;
  title: string;
  onEdit_click?: <T>(e: T) => void;
  onUpload_click?: <T>(e: T) => void;
  onDelete_click?: <T>(e: T) => void;
  onVocabulary_click?: <T>(e: T) => void;
  onStory_click?: <T>(e: T) => void;
  onPractice_click?: <T>(e: T) => void;
  onQuiz_click?: <T>(e: T) => void;
}

const UnitCard: React.FC<UnitCard_schema> = ({
  img = "",
  isPublished = true,
  isFree = true,
  videoCount = 0,
  duration = { minute: 0, second: 0 },
  enrolledCount = 0,
  title,
  onEdit_click,
  onUpload_click,
  onDelete_click,
  onVocabulary_click,
  onStory_click,
  onPractice_click,
  onQuiz_click,
}) => {
  return (
    <Flex
      shadow={"md"}
      border={"2px"}
      borderBottom={"none"}
      borderColor={"#F5F3EF"}
      borderRadius={5}
      p={2}
      flexWrap={"wrap"}
      gap={5}
      justifyContent={"center"}
    >
      {/* card image */}
      <Box
        bg={"theme.darkGreen"}
        borderRadius={5}
        position={"relative"}
        flexBasis={"250px"}
        flexShrink={1}
      >
        {img ? (
          <Box as="img" src={img} width={"100%"} aspectRatio={1 / 1} />
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            aspectRatio={1 / 1}
          >
            No image
          </Flex>
        )}
        <Stack
          direction="row"
          justifyContent={"space-between"}
          p={2}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          flexWrap={"wrap"}
        >
          {isPublished ? (
            <Flex
              bg={"theme.orange"}
              color={"white"}
              px={3}
              borderRadius={5}
              fontWeight={"bold"}
              letterSpacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              Published
            </Flex>
          ) : (
            <Box />
          )}
          {isFree ? (
            <Flex
              bg={"white"}
              color={"theme.orange"}
              border={"2px"}
              px={2}
              borderRadius={5}
              fontWeight={"bold"}
              letterSpacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              Free
            </Flex>
          ) : (
            <Box />
          )}
        </Stack>
      </Box>

      {/* card text info */}
      <Stack
        direction={"column"}
        flexBasis={"300px"}
        flexGrow={40}
        flexShrink={1}
        gap={5}
      >
        <Flex fontWeight={"bold"} rowGap={1} columnGap={3} flexWrap={"wrap"}>
          {/* video count */}
          <Flex alignItems={"center"} gap={1}>
            <Icon as={MdOutlineOndemandVideo} boxSize={5} color={"gray"} />
            <Text lineHeight={1} color={"gray"}>
              Video
            </Text>
            <Text color={"black"}>{`(${videoCount})`}</Text>
          </Flex>

          {/* video duration */}
          <Flex alignItems={"center"} gap={1}>
            <Icon as={IoTimerOutline} boxSize={5} color={"gray"} />
            <Text lineHeight={1} color={"gray"}>
              Duration
            </Text>
            <Text
              color={"black"}
            >{`(${duration.minute} min ${duration.second} sec)`}</Text>
          </Flex>

          {/* total enrolled */}
          <Flex alignItems={"center"} gap={1}>
            <Icon as={IoPeople} boxSize={5} color={"gray"} />
            <Text lineHeight={1} color={"gray"}>
              Enrolled
            </Text>
            <Text color={"black"}>{`(${enrolledCount})`}</Text>
          </Flex>
        </Flex>

        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {title}
        </Text>

        <Flex rowGap={3} columnGap={5} flexWrap={"wrap"}>
          <LinkBtn onClick={onEdit_click}>
            <Icon as={FaRegEdit} boxSize={5} />
            <Text>Edit</Text>
          </LinkBtn>
          <LinkBtn onClick={onUpload_click}>
            <Icon as={FaPlus} boxSize={5} />
            <Text>Upload Video</Text>
          </LinkBtn>
          <LinkBtn onClick={onDelete_click}>
            <Icon as={MdDelete} boxSize={5} />
            <Text>Delete</Text>
          </LinkBtn>
        </Flex>
      </Stack>

      {/* card button */}
      <Flex
        rowGap={1.5}
        columnGap={1.5}
        flexWrap={"wrap"}
        flexBasis={"120px"}
        flexGrow={1}
        justifyContent={"center"}
        alignContent={"start"}
      >
        <CustomBtn onClick={onVocabulary_click} bgColor="theme.darkGreen">
          Vocabulary
        </CustomBtn>
        <CustomBtn
          onClick={onStory_click}
          bgColor="theme.orange"
          textColor="white"
        >
          Story
        </CustomBtn>
        <CustomBtn
          onClick={onPractice_click}
          bgColor="theme.primary"
          textColor="white"
        >
          Practice
        </CustomBtn>
        <CustomBtn onClick={onQuiz_click} bgColor="theme.darkGreen">
          Quiz
        </CustomBtn>
      </Flex>
    </Flex>
  );
};

export default UnitCard;

const LinkBtn: React.FC<{
  children: ReactNode;
  onClick?: <T>(e: T) => void;
}> = ({ children, onClick }) => {
  return (
    <Flex
      alignItems={"center"}
      cursor={"pointer"}
      color={"gray"}
      fontWeight={"bold"}
      _hover={{
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        color: "black",
      }}
      _active={{
        transform: "scale(0.98)",
      }}
      gap={1}
      userSelect={"none"}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};

const CustomBtn: React.FC<{
  children: ReactNode;
  onClick?: <T>(e: T) => void;
  textColor?: string;
  bgColor?: string;
}> = ({
  children,
  onClick,
  textColor = "black",
  bgColor = "theme.darkGreen",
}) => {
  return (
    <Flex
      flexShrink={1}
      flexBasis={"120px"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={4}
      px={5}
      py={2}
      fontWeight={"bold"}
      letterSpacing={1}
      bg={bgColor}
      color={textColor}
      cursor={"pointer"}
      _active={{
        transform: "scale(0.98)",
      }}
      userSelect={"none"}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
