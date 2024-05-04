import {
  Box,
  Center,
  ChakraProps,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="100"
      bg={useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.8)")}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default Loader;
