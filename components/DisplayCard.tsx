import { Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

export const LessInfoCard = ({
  icon,
  iconProps,
  title,
  highlightedText,
  cardProps,
}: {
  icon: IconType;
  iconProps?: FlexProps;
  title: string;
  highlightedText?: string;
  cardProps?: FlexProps;
}) => {
  return (
    <Flex
      cursor="pointer"
      bg={"#FFFFFF"}
      border={"2px"}
      borderRadius={10}
      borderColor={"#EDEDED"}
      borderBottom={"none"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
      px={3}
      py={10}
      basis={"300px"}
      grow={1}
      shadow={"md"}
      _hover={{
        bg: "theme.green",
      }}
      _active={{
        transform: "scale(0.98)",
      }}
      {...cardProps}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        boxSize={12}
        borderRadius={16}
        color={"black"}
        {...iconProps}
      >
        <Icon as={icon} boxSize={16} p={4} />
      </Flex>
      <Flex flexDir={"column"}>
        <Text fontWeight={"bold"} letterSpacing={1.5} fontSize={"sm"}>
          {title}
        </Text>
        {highlightedText ? (
          <Text fontSize={"4xl"} lineHeight={1}>
            {highlightedText}
          </Text>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};
