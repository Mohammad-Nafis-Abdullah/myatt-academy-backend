import { Flex, FlexProps, Icon, IconProps, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

export const LessInfoCard = ({
  icon,
  iconProps,
  title,
  highlightedText,
  cardProps,
}: {
  icon: IconType;
  iconProps?: IconProps;
  title: string;
  highlightedText?: string;
  cardProps?: FlexProps;
}) => {
  return (
    <Flex
      cursor="pointer"
      bg={"#FFFFFF"}
      border={"1px"}
      borderRadius={5}
      borderColor={"#EDEDED"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
      px={3}
      py={7}
      width={"100%"}
      minHeight={"120px"}
      shadow={"lg"}
      {...cardProps}
    >
      <Icon
        as={icon}
        boxSize={12}
        borderRadius={"50%"}
        border="1px"
        p={2}
        {...iconProps}
      />
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
