"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Flex,
  Grid,
  GridItem,
  Box,
  Container,
  HStack,
} from "@chakra-ui/react";
import CloseButton from "../ui/CloseButton";
import _ from "lodash";
import TeacherCard from "../homepage/TeacherCard";
import { data } from "@/constants/data";
import type { Teacher } from "@/types";
import FullscreenButton from "../ui/FullscreenButton";

const TeachersModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFullScreen, setIsFullscreen] = React.useState(false);

  const shift = searchParams.get("shift");

  const onClose = () => {
    router.push(pathname, { scroll: false });
  };

  const onFullscreen = () => {
    setIsFullscreen(!isFullScreen);
  };

  const ButtonRef = React.useRef(null);
  const teachers = _.filter(data.teachers, { shift }) as Teacher[];

  const title = _.get(teachers, "[0].shift_title");

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={!!shift}
        scrollBehavior="inside"
        size={
          !isFullScreen
            ? {
                base: "lg",
                md: "xl",
                lg: "3xl",
                xl: "6xl",
              }
            : "full"
        }
      >
        <ModalOverlay />
        <ModalContent borderRadius="13px" bg="theme.darkGreen" pb={5}>
          <ModalHeader>
            <Flex alignItems="center">
              <Text as="h2" fontSize="4xl" fontWeight="bold" mb="7">
                Our Teachers
              </Text>
              <FullscreenButton onClick={onFullscreen} ml="auto" />
              <CloseButton onClick={onClose} />
            </Flex>
            <React.Fragment>
              <Box as="section" mb={5}>
                <Container maxW="container.xl">
                  <HStack
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      ref={ButtonRef}
                      variant="outline"
                      color={
                        shift === "early-childhood-ages-3-5" ? "white" : ""
                      }
                      _hover={{
                        bg: "theme.orange",
                        color: "white",
                        borderColor: "theme.orange",
                      }}
                      bg={
                        shift === "early-childhood-ages-3-5"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      borderColor={
                        shift === "early-childhood-ages-3-5"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      onClick={() =>
                        router.push(
                          `${pathname}?modal=teachers&shift=early-childhood-ages-3-5`,
                          { scroll: false }
                        )
                      }
                      fontFamily="var(--font-schoolbell)"
                      letterSpacing="1.36px"
                    >
                      Early childhood (ages 3-5)
                    </Button>
                    <Button
                      ref={ButtonRef}
                      variant="outline"
                      color={
                        shift === "elementary-school-grades-1-6" ? "white" : ""
                      }
                      _hover={{
                        bg: "theme.orange",
                        color: "white",
                        borderColor: "theme.orange",
                      }}
                      bg={
                        shift === "elementary-school-grades-1-6"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      borderColor={
                        shift === "elementary-school-grades-1-6"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      onClick={() =>
                        router.push(
                          `${pathname}?modal=teachers&shift=elementary-school-grades-1-6`,
                          { scroll: false }
                        )
                      }
                      fontFamily="var(--font-schoolbell)"
                      letterSpacing="1.36px"
                    >
                      Elementary school (grades 1-6)
                    </Button>
                    <Button
                      ref={ButtonRef}
                      variant="outline"
                      color={
                        shift === "middle-school-grades-7-9" ? "white" : ""
                      }
                      _hover={{
                        bg: "theme.orange",
                        color: "white",
                        borderColor: "theme.orange",
                      }}
                      bg={
                        shift === "middle-school-grades-7-9"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      borderColor={
                        shift === "middle-school-grades-7-9"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      onClick={() =>
                        router.push(
                          `${pathname}?modal=teachers&shift=middle-school-grades-7-9`,
                          { scroll: false }
                        )
                      }
                      fontFamily="var(--font-schoolbell)"
                      letterSpacing="1.36px"
                    >
                      Middle school (grades 7-9)
                    </Button>
                    <Button
                      ref={ButtonRef}
                      variant="outline"
                      color={
                        shift === "upper-school-grades-10-12" ? "white" : ""
                      }
                      _hover={{
                        bg: "theme.orange",
                        color: "white",
                        borderColor: "theme.orange",
                      }}
                      bg={
                        shift === "upper-school-grades-10-12"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      borderColor={
                        shift === "upper-school-grades-10-12"
                          ? "theme.orange"
                          : "theme.black"
                      }
                      onClick={() =>
                        router.push(
                          `${pathname}?modal=teachers&shift=upper-school-grades-10-12`,
                          { scroll: false }
                        )
                      }
                      fontFamily="var(--font-schoolbell)"
                      letterSpacing="1.36px"
                    >
                      Upper school (grades 10-12)
                    </Button>
                  </HStack>
                </Container>
              </Box>
            </React.Fragment>

            <Text as="h1">{title}</Text>
          </ModalHeader>
          <ModalBody bg="theme.darkGreen" py="9" px="9">
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              {_.map(teachers, (teacher: Teacher) => (
                <React.Fragment key={teacher.id}>
                  <GridItem colSpan={{ base: 2, lg: 1 }}>
                    <TeacherCard
                      id={teacher.id}
                      name={teacher.name}
                      image={teacher.image}
                      shift={teacher.shift}
                      flag={teacher.flag}
                      message={teacher.message}
                      shift_title={teacher.shift_title}
                    />
                  </GridItem>
                </React.Fragment>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeachersModal;
