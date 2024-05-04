"use client";

import { Box, Center, Container, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Container maxW="80%" mx="auto" mt={7}>
      <Center>
        <Box>
          <Image src="/sun.png" alt="404" width={500} height={500} />
        </Box>
        <VStack spacing={3}>
          <Text as="h1" fontSize="8xl" fontWeight="bold">
            404
          </Text>
          <Text as="h2" fontSize="2xl" fontWeight="bold">
            Page not found
          </Text>

          <Text className="b3" textAlign="center">
            Sorry, we are working on this page. <br /> It will be available
            soon!
          </Text>

          <Link href="/">
            <Text
              as="span"
              fontSize="2xl"
              color="white"
              bg="theme.orange"
              display="block"
              py={3}
              px={5}
              borderRadius="13px"
            >
              Go back home
            </Text>
          </Link>
        </VStack>
      </Center>
    </Container>
  );
};

export default NotFoundPage;
