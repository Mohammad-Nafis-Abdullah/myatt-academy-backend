/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Flex,
  Grid,
  GridItem,
  Box,
  OrderedList,
  ListItem,
  RadioGroup,
  Radio,
  Button,
  useToast,
} from "@chakra-ui/react";
import CloseButton from "../ui/CloseButton";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Loader from "../ui/LoaderComponent";
import { Option, Question, Quiz, QuizSubmissionType } from "@/types";
import _ from "lodash";
import { useQuizSubmitMutation } from "@/redux/features/course/courseApiSlice";
import { Form, Formik } from "formik";
import Switch from "../ui/Switch";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import QuizSketch from "../QuizSketch";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface QuizModalProps {
  quiz: Quiz | null;
  showModal: boolean;
  close: () => void;
  setShowModal: (showModal: boolean) => void;
  lessonId: string | number;
  subjectName: string;
  gradeName: string;
}
const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  showModal,
  close,
  setShowModal,
  lessonId,
  gradeName,
  subjectName,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [img, setImg] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsSubmitted(false);
  }, [showModal]);

  // const { quiz } = useAppSelector((state) => state.courses);

  // pass lesson id here..
  // const { data, isFetching: isQuizzesFetching } = useQuizQuery(280);

  // const quiz: Quiz = data?.data[0];
  const questions: Question[] = useMemo(() => {
    return quiz?.questions || [];
  }, [quiz]);

  const toast = useToast();
  const [quizSubmitMutation, { data, isLoading, isError }] =
    useQuizSubmitMutation();

  //   console.log(questions.length);
  // }, [data]);

  const handleQuizSubmit = async (values: any, answers: any) => {
    const formattedValues = values.answers.map(
      (answer: any, index: number) => ({
        exam_id: quiz?.exam_id,
        question_id: Number(questions[index]?.question_id),
        option_id: Number(answer?.option_id),
        // opt: questions[index].options.find((opt) => {
        //   return opt.option_id === Number(answer?.option_id);
        // }),
        isPassed:
          questions[index].options.find((opt) => {
            return opt.option_id === Number(answer?.option_id);
          })?.is_correct_answer === "yes"
            ? 1
            : 0,
      })
    );

    // console.dir(questions);
    // console.dir(values.answers);
    // console.dir(formattedValues);

    // console.log({ test: values.answers });
    try {
      if (_.some(values.answers, (answer) => answer.option_id === null)) {
        toast({
          title: "Please answer all the questions",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const result = [
          ...values.answers.map((ans: { option_id: string }, i: number) => {
            return questions[i].options.find((opt) => {
              return opt.option_id === parseInt(ans.option_id);
            });
          }),
        ];

        const count = result.reduce(
          (prev: number, cur: Question["options"][number]) => {
            if (cur.is_correct_answer === "yes") {
              return prev + 1;
            } else {
              return prev;
            }
          },
          0
        );

        const submitData: any = {
          lesson_id: Number(lessonId),
          questions: [...formattedValues],
          uuid: `${Date.now()}`,
        };
        // console.log({ questions, count });
        // console.log(JSON.stringify(submitData));
        const res = await quizSubmitMutation(submitData);
        setSubmittedAnswers(submitData.questions);
        // console.log({values, answers});

        if (questions.length === count) {
          close();
          Swal.fire({
            title: "Well Done",
            // text: "You have got the full marks",
            text: "Magic! You got the answers all right! 😎",
            imageUrl:
              "https://img.freepik.com/free-vector/simple-star-white-background_1308-95997.jpg",
            imageHeight: 100,
            imageWidth: 100,
            confirmButtonText: "OK",
            timer: 5000,
          });
        } else {
          toast({
            title: "Your answers have been successfully submitted",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        // when to close modal -> after quiz is submitted
        setIsSubmitted(true);
        // setShowModal(false);
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to submit your quiz.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isCorrectAnswer = useCallback(
    (currentQuestion: Question) => {
      let result = false;
      (
        [...submittedAnswers] as {
          exam_id: number;
          option_id: number;
          question_id: number;
        }[]
      ).forEach((submit) => {
        if (submit.question_id === currentQuestion.question_id) {
          const selectedOption = currentQuestion.options.find(
            (option) => submit.option_id === option.option_id
          );
          if (selectedOption?.is_correct_answer === "yes") {
            result = true;
          }
        }
      });
      return result;
    },
    [submittedAnswers]
  );

  // console.log({ subjectName, gradeName });

  const getScore = useCallback(() => {
    if (isSubmitted) {
      let score = 0;
      [...questions].forEach((quest) => {
        if (isCorrectAnswer(quest)) {
          score++;
        }
      });
      return score;
    } else {
      return `N/A`;
    }
  }, [isCorrectAnswer, isSubmitted, questions]);

  // console.log({ user });
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
      {/* <ModalOverlay /> */}
      <ModalContent borderRadius="3" bg="theme.darkGreen" pt="2" pb="2">
        <ModalHeader>
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="start"
            borderRadius="13px"
            bg="yellow"
            py={1}
            px={5}
            mb={11}
          >
            <Box>
              <Text as="h3" mb={1}>
                {subjectName}
              </Text>
              <Text as="span" mb={1}>
                {gradeName}
              </Text>
            </Box>
            <Box>
              <Text as="h3" mb={1}>
                {quiz?.exam_name}
              </Text>
              <Flex gap={2} alignItems="center">
                <Text as="span" fontSize="lg">
                  {quiz?.questions?.length} Questions
                </Text>
                {/* <Box w={1} h={1} bg="theme.purple" borderRadius="50%">
                  &nbsp;
                </Box> */}
                {/* <Text as="span" fontSize="lg">
                  {quiz?.duration} Mintues
                </Text> */}
                {/* <Box w={1} h={1} bg="theme.purple" borderRadius="50%">
                    &nbsp;
                  </Box> */}
                {/* <Text as="span" fontSize="sm">
                    Beginner
                  </Text> */}
              </Flex>
            </Box>
            <Box>
              <Text as="h3" mb={1}>
                Score
              </Text>
              <Text as="span" fontSize="sm">
                {/* {quiz?.score || `N/A`} */}
                {getScore()}
              </Text>
            </Box>
            {/* <Box>
                <Text as="h3" mb={1}>
                  Time
                </Text>
                <Text as="span" fontSize="sm">
                  {quiz?.duration}
                </Text>
              </Box> */}
            <CloseButton onClick={close} size="28" />{" "}
          </Flex>
        </ModalHeader>
        <ModalBody bg="theme.darkGreen" py="0" px="9">
          <Box
            width={{
              base: "95%",
              lg: "65%",
            }}
          >
            <Formik
              initialValues={{
                answers: questions.map(() => ({ option_id: null })),
              }}
              onSubmit={(values: any, answers: any) =>
                handleQuizSubmit(values, answers)
              }
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Grid templateColumns="repeat(10, 1fr)" gap={18}>
                    <GridItem colSpan={10} fontFamily="Open Sans">
                      <Grid templateColumns="repeat(2, 1fr)">
                        <GridItem colSpan={2}>
                          {_.isEmpty(quiz) ? (
                            <Loader />
                          ) : (
                            <OrderedList variant="customNoMark">
                              {questions.map((item: Question, i: number) => {
                                return (
                                  <ListItem key={item.question_id}>
                                    <Flex gap={4}>
                                      <Text
                                        as="span"
                                        fontSize={36}
                                        fontWeight="400"
                                        fontFamily="var(--font-schoolbell)"
                                      >
                                        {i + 1}.
                                      </Text>
                                      <Box as="div">
                                        <Text
                                          as="div"
                                          letterSpacing=".0338rem"
                                          mb={2}
                                          fontSize="md"
                                          fontWeight="400"
                                        >
                                          {item.question_name}
                                        </Text>
                                        {
                                          <Flex gap="3.75rem" mb={5}>
                                            {item?.image?.map((img, i) => {
                                              return (
                                                <Box
                                                  as="div"
                                                  key={i}
                                                  _hover={{
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                    setImg(img);
                                                  }}
                                                >
                                                  {/* <Image
                                                      src={img}
                                                      width={400}
                                                      height={400}
                                                      alt={"image"}
                                                    /> */}
                                                  <Box
                                                    as="img"
                                                    width={"auto"}
                                                    height={"auto"}
                                                    src={img}
                                                    alt="image"
                                                  />
                                                </Box>
                                              );
                                            })}
                                          </Flex>
                                        }
                                        <RadioGroup
                                          mb="0"
                                          onChange={(value) => {
                                            setFieldValue(
                                              `answers[${i}].option_id`,
                                              value
                                            );
                                          }}
                                        >
                                          <Flex gap="3.75rem">
                                            {item.options.map(
                                              (option: Option) => {
                                                return (
                                                  <Radio
                                                    key={option.option_id}
                                                    value={option.option_id.toString()}
                                                    variant="custom"
                                                    fontSize="md"
                                                    fontWeight="300"
                                                  >
                                                    <Switch>
                                                      <Switch.Case
                                                        condition={
                                                          option.images !== null
                                                        }
                                                      >
                                                        <Box
                                                          as="img"
                                                          width={"auto"}
                                                          height={"auto"}
                                                          src={`https://admin.myattacademy.com/${option.images}`}
                                                          alt="image"
                                                        />
                                                      </Switch.Case>
                                                      <Switch.Case
                                                        condition={
                                                          option.option_name !==
                                                          null
                                                        }
                                                      >
                                                        <Box
                                                          as="div"
                                                          mb={
                                                            option.images ===
                                                            null
                                                              ? 0
                                                              : 4
                                                          }
                                                        >
                                                          {option.option_name}
                                                        </Box>
                                                      </Switch.Case>
                                                    </Switch>
                                                  </Radio>
                                                );
                                              }
                                            )}
                                          </Flex>
                                        </RadioGroup>
                                        {isSubmitted ? (
                                          <Text
                                            as="p"
                                            letterSpacing=".0338rem"
                                            // mb={2}
                                            mt={3}
                                            fontSize="sm"
                                            fontWeight="400"
                                            color={
                                              isCorrectAnswer(item)
                                                ? "green"
                                                : "orangered"
                                            }
                                          >
                                            {isCorrectAnswer(item)
                                              ? "Your answer is correct."
                                              : (() => {
                                                  const option =
                                                    item.options.find(
                                                      (option) =>
                                                        option.is_correct_answer ===
                                                        "yes"
                                                    );

                                                  return (
                                                    <Flex
                                                      alignItems={"center"}
                                                      columnGap={3}
                                                    >
                                                      <Text>
                                                        Nice try! Correct answer
                                                        is:
                                                      </Text>
                                                      {option?.option_name ? (
                                                        <Text>
                                                          {option.option_name}
                                                        </Text>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {option?.images ? (
                                                        <Image
                                                          src={`https://admin.myattacademy.com/${option?.images}`}
                                                          width={350}
                                                          height={350}
                                                          alt={""}
                                                        ></Image>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </Flex>
                                                  );
                                                })()}
                                          </Text>
                                        ) : (
                                          <></>
                                        )}
                                      </Box>
                                    </Flex>
                                  </ListItem>
                                );
                              })}
                            </OrderedList>
                          )}
                        </GridItem>
                        <GridItem
                          colSpan={2}
                          display="flex"
                          justify-content="flex-start"
                        >
                          <Button type="submit" variant="primary" size="sm">
                            Submit
                          </Button>
                        </GridItem>
                      </Grid>
                    </GridItem>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>

          {/* board */}

          {subjectName.toLowerCase() === "math" ? (
            <Box
              position={{
                base: "static",
                lg: "fixed",
              }}
              width={{
                base: "95%",
                lg: "30%",
              }}
              top="110px"
              right="50px"
              bottom="50px"
            >
              <QuizSketch alt_pen_btn_color={true} />
            </Box>
          ) : (
            <Box />
          )}
        </ModalBody>
      </ModalContent>
      <ImgModal img={img} setImg={setImg} />
    </Modal>
  );
};

export default QuizModal;

const ImgModal = ({
  img,
  setImg,
}: {
  img: string;
  setImg: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Modal
      onClose={() => setImg("")}
      isOpen={!!img}
      scrollBehavior="inside"
      isCentered={true}
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
      <ModalOverlay />
      <ModalContent
        shadow={"none"}
        borderRadius={11}
        // bg="theme.yellow"
        backgroundColor={"transparent"}
        border={0}
        // p="2"
        mx={5}
        // height={"90vh"}
      >
        {/* <ModalHeader
          display={"flex"}
          justifyContent="end"
          alignItems="center"
          p={0}
        ></ModalHeader> */}

        <ModalBody
          py={0}
          px={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          pt={"15vh"}
          border={5}
          borderColor={"black"}
        >
          <Box
            as="img"
            src={img}
            objectFit={"contain"}
            maxW={"80vw"}
            // maxHeight={"90vh"}
            // width={{
            //   base: "95vw",
            //   sm: "50vw",
            // }}
          />
          <Box>
            <CloseButton
              onClick={() => setImg("")}
              size="28"
              icon_color="yellow"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
