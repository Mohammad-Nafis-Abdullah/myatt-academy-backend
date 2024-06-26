import { Flex, Spinner } from "@chakra-ui/react";
import { describe } from "node:test";

export default function Loading() {
  return (
    <Flex
      width={"100%"}
      minHeight={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}
