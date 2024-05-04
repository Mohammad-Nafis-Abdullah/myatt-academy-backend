import { Question, Quiz, QuizResultType } from "@/types";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CloseButton from "../ui/CloseButton";
import dayjs from "dayjs";
interface QuizScoreModalProps {
  result: QuizResultType[][] | null;
  showModal: boolean;
  close: () => void;
  setShowModal: (showModal: boolean) => void;
  lessonId: string | number;
  subjectName: string;
  gradeName: string;
}

const COLUMNS = [
  {
    title: "No.",
    name: "index",
  },
  {
    title: "Your Marks",
    name: "your_marks",
  },
  {
    title: "Total",
    name: "total",
  },
  {
    title: "Submission date",
    name: "submission_date",
  },
];

const QuizScoreModal: React.FC<QuizScoreModalProps> = ({
  result,
  showModal,
  close,
  setShowModal,
  lessonId,
  gradeName,
  subjectName,
}) => {
  const RESULT = useMemo(() => {
    const res = result?.map((val, i) => {
      return val.reduce(
        (prev, v, j, arr) => {
          return {
            uuid: v.uuid,
            your_marks: prev.your_marks + Number(v.is_passed),
            total: arr.length,
            submission_date: v.created_at,
          };
        },
        {
          uuid: "",
          your_marks: 0,
          total: 0,
          submission_date: "",
        }
      );
    });
    // console.log(res);
    return res;
  }, [result]);

  return (
    <Modal
      onClose={close}
      isOpen={showModal}
      scrollBehavior="inside"
      // size={
      //   !false
      //     ? {
      //         base: "lg",
      //         md: "xl",
      //         lg: "3xl",
      //         xl: "6xl",
      //       }
      //     : "full"
      // }
      size="full"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="3" bg="theme.darkGreen" pt="2" pb="2">
        <ModalHeader>
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="start"
            borderRadius="13px"
            // bg="yellow"
            py={1}
            px={5}
            mb={11}
          >
            <Box mx={"auto"}>
              <Text as="h2" mb={1} fontWeight={800}>
                Quiz Scores
              </Text>
            </Box>
            <CloseButton onClick={close} size="28" />
          </Flex>
        </ModalHeader>
        <ModalBody bg="theme.darkGreen" py="0" px="9">
          <TableContainer
            maxW={{ base: "280px", sm: "1000px" }}
            mb={7}
            mx={"auto"}
            borderRadius={5}
            padding={5}
            bgColor={"theme.yellow"}
            fontFamily="var(--font-schoolbell)"
          >
            <Table color="theme.purple">
              <Thead>
                <Tr>
                  {COLUMNS.map(
                    (
                      column: { title: string; name: string },
                      index: number
                    ) => {
                      return (
                        <Th
                          key={index}
                          letterSpacing="1.26px"
                          textTransform="uppercase"
                          fontSize={"25px"}
                          textAlign={"center"}
                          fontWeight={800}
                        >
                          {column.title}
                        </Th>
                      );
                    }
                  )}
                </Tr>
              </Thead>

              <Tbody>
                {_.map(RESULT, (res, i) => {
                  return (
                    <Tr p={4} key={i}>
                      <Td textAlign={"center"} fontSize={"2xl"}>
                        {i + 1}
                      </Td>
                      <Td textAlign={"center"} fontSize={"2xl"}>
                        {res.your_marks}
                      </Td>
                      <Td textAlign={"center"} fontSize={"2xl"}>
                        {res.total}
                      </Td>
                      <Td textAlign={"center"} fontSize={"2xl"}>
                        {dayjs(res.submission_date).format(
                          "DD MMM, YYYY; hh:mm A"
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuizScoreModal;
