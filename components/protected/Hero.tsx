import { useAppSelector } from "@/redux/store";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Hero = () => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  return (
    <Box
      bg={"theme.darkGreen"}
      py={10}
      px={3}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"300px"}
    >
      <Text
        fontSize={{
          base: "xl",
          sm: "2xl",
          md: "4xl",
        }}
        color={"orangered"}
        fontWeight={"bold"}
        letterSpacing={2}
        textAlign={"center"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        Hey, {user?.name}
        <Image
          src="https://admin.myattacademy.com/frontend/assets/img/student-profile-img/waving-hand.png"
          alt="clap"
          boxSize={{
            base: 5,
            sm: 10,
          }}
        />
      </Text>
      <Text
        fontSize={{
          base: "lg",
          sm: "xl",
        }}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href={pathname}>{pathname.slice(1)}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Text>
    </Box>
  );
};

export default Hero;
