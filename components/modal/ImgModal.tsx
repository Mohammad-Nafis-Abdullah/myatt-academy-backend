/* eslint-disable @next/next/no-img-element */
"use client";
import { Modal, ModalOverlay, ModalContent, Flex } from "@chakra-ui/react";
import CloseButton from "../ui/CloseButton";
import React from "react";

export const ImgModal = ({
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
      size="3xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius={11} bg="theme.yellow" p="2">
        {/* <ModalHeader> */}
        <Flex
          justifyContent="end"
          alignItems="center"
          // borderRadius="13px"
          // bg="yellow"
          py={0}
          px={0}
        >
          <CloseButton onClick={() => setImg("")} size="30" />
        </Flex>
        {/* </ModalHeader> */}
        {/* <ModalBody py="0" px={5}> */}

        {/* </ModalBody> */}
        <img src={img} alt={"image"} className="w-full" />
      </ModalContent>
    </Modal>
  );
};
