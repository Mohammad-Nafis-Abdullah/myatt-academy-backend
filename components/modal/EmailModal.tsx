"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import * as React from "react";
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
} from "@chakra-ui/react";
import CloseButton from "../ui/CloseButton";
import _ from "lodash";
import { data } from "@/constants/data";
import type { Staff } from "@/types";
import StaffCard from "../homepage/StaffCard";
import FullscreenButton from "../ui/FullscreenButton";
import Link from "next/link";

interface EmailInfo {
  label: string;
  email: string;
}

interface Emails {
  general: EmailInfo;
  scholarships: EmailInfo;
  employment: EmailInfo;
  teacherRecruitment: EmailInfo;
  legal: EmailInfo;
  media: EmailInfo;
  contact: EmailInfo;
}

type EmailType =
  | "general"
  | "scholarships"
  | "employment"
  | "teacherRecruitment"
  | "legal"
  | "media"
  | "contact";

const EmailModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "email";

  const emailType: EmailType =
    (searchParams.get("type") as EmailType) || "test";

  const emails: Emails = {
    general: {
      label: "General Inquiries",
      email: "inquiries@myattacademy.com",
    },
    scholarships: {
      label: "Scholarships",
      email: "scholarships@myattacademy.com",
    },
    employment: {
      label: "Employment",
      email: "employment@myattacademy.com",
    },
    teacherRecruitment: {
      label: "Teacher Recruitment",
      email: "teacher@myattacademy.com",
    },
    legal: {
      label: "Legal",
      email: "legal@myattacademy.com",
    },
    media: {
      label: "Media",
      email: "media@myattacademy.com",
    },
    contact: {
      label: "Contact us",
      email: "inquiries@myattacademy.com",
    },
  };

  const currentEmail = emails[emailType];

  const onClose = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={!!isOpen}
        scrollBehavior="inside"
        size={
          !false
            ? {
                base: "lg",
                md: "xl",
                lg: "3xl",
                xl: "6xl",
              }
            : "full"
        }
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent borderRadius="13px" bg="theme.darkGreen" pt="0" pb="10">
          <ModalHeader>
            <Flex alignItems="center">
              <Text as="h2" fontSize="3xl" fontWeight="bold" mb="0">
                {currentEmail.label}
              </Text>
              <CloseButton onClick={onClose} ml={"auto"} size="28" />
            </Flex>
          </ModalHeader>
          <ModalBody bg="theme.darkGreen" py="9" px="9">
            <Flex as="div" fontSize="3xl">
              <Link href={`mailto:${currentEmail.email}`}>
                {currentEmail.email}
              </Link>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmailModal;
