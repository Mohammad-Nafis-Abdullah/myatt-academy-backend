/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowUpDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaCamera } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface OptionSchema {
  [key: string]: any;
}

export const TextInput = ({
  title,
  value,
  onChange,
  getValue,
  placeholder,
  error,
  name,
  type = "text",
  required,
  readonly = false,
  props,
}: {
  title: string;
  value: (key: string) => string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getValue: (
    key: string,
    value: string | number | readonly string[] | undefined
  ) => any;
  placeholder: string;
  error: (key: string) => string | undefined;
  name: string;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  readonly?: boolean;
  props?: InputProps;
}) => {
  const [show, setShow] = useState(false);

  return (
    <Box display={"flex"} flexFlow={"column nowrap"}>
      <Text mb="8px" fontWeight={800} fontSize={"larger"}>
        {title}:{" "}
        {required ? (
          <Box as="span" color={"red"}>
            *
          </Box>
        ) : (
          <></>
        )}
      </Text>
      <InputGroup>
        <Input
          value={value(name)}
          onChange={(e) => {
            onChange && onChange(e);
            getValue(name, e.target.value);
          }}
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          size="md"
          name={name}
          border={"none"}
          bgColor={"#A9C667"}
          outline={0}
          required={!!required}
          _placeholder={{
            color: "gray.600",
          }}
          readOnly={readonly}
          cursor={readonly ? "not-allowed" : "auto"}
          {...props}
        />
        {type === "password" ? (
          <InputRightElement height={"100%"}>
            {show ? (
              <ViewOffIcon
                onClick={() => setShow(false)}
                cursor={"pointer"}
                color={"gray.500"}
              />
            ) : (
              <ViewIcon
                onClick={() => setShow(true)}
                cursor={"pointer"}
                color={"gray.500"}
              />
            )}
          </InputRightElement>
        ) : (
          <></>
        )}
      </InputGroup>
      {error(name) ? (
        <Text mt="4px" color={"red"} fontSize={"small"}>
          {error(name)}:
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
};

export const SelectInput = ({
  title,
  options,
  // value,
  // onChange,
  getValue,
  placeholder,
  error,
  name,
  required,
  optTitleKey,
  isLoading,
  props,
}: {
  title: string;
  options: OptionSchema[];
  // value: (key: string) => string | number | undefined;
  // onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getValue: (key: string, value: OptionSchema | null) => any;
  placeholder: string;
  error: (key: string) => string | undefined;
  name: string;
  required?: boolean;
  optTitleKey: keyof OptionSchema;
  isLoading: boolean;
  props?: MenuProps;
}) => {
  const [current, setCurrent] = useState<OptionSchema | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    getValue(name, current);
  }, [name, current]);

  return (
    <Box display={"flex"} flexFlow={"column nowrap"}>
      <Text mb="8px" fontWeight={800} fontSize={"larger"}>
        {title}:{" "}
        {required ? (
          <Box as="span" color={"red"}>
            *
          </Box>
        ) : (
          <></>
        )}
      </Text>
      {/* ====================================== */}
      <Menu>
        {({ isOpen }) => {
          return (
            <>
              <MenuButton
                as={Button}
                // backgroundColor={"theme.yellow"}
                fontFamily={"var(--font-schoolbell)"}
                color={"gray.600"}
                __css={{
                  backgroundColor: "#A9C667",
                }}
                height={10}
                borderRadius={7}
                px={3}
                rightIcon={<ArrowUpDownIcon height={3} />}
                {...props}
              >
                {current ? current[optTitleKey] : placeholder}
              </MenuButton>
              <MenuList>
                {isLoading ? (
                  <MenuItem display={"flex"} justifyContent={"center"}>
                    <Spinner speed="0.7s" color="orangered" size="lg" />
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      backgroundColor={
                        currentIndex === null ? "gray.200" : "transparent"
                      }
                      onClick={() => {
                        setCurrent(null);
                        setCurrentIndex(null);
                      }}
                    >
                      {placeholder}
                    </MenuItem>
                    {options.map((opt, i) => {
                      return (
                        <MenuItem
                          key={i}
                          backgroundColor={
                            currentIndex === i ? "gray.200" : "transparent"
                          }
                          _hover={{
                            backgroundColor: "gray.200",
                          }}
                          onClick={() => {
                            setCurrent(opt);
                            setCurrentIndex(i);
                          }}
                        >
                          {opt[optTitleKey]}
                        </MenuItem>
                      );
                    })}
                  </>
                )}
              </MenuList>
            </>
          );
        }}
      </Menu>
      {/* ====================================== */}
      {error(name) ? (
        <Text mt="4px" color={"red"} fontSize={"small"}>
          {error(name)}:
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
};

export const TextAreaInput = ({
  title,
  value,
  onChange,
  getValue,
  placeholder,
  error,
  name,
  required,
  ...props
}: {
  title: string;
  value: (key: string) => string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  getValue: (
    key: string,
    value: string | number | readonly string[] | undefined
  ) => any;
  placeholder: string;
  error: (key: string) => string | undefined;
  name: string;
  required?: boolean;
  props?: InputProps;
}) => {
  return (
    <Box display={"flex"} flexFlow={"column nowrap"}>
      <Text mb="8px" fontWeight={800} fontSize={"larger"}>
        {title}:{" "}
        {required ? (
          <Box as="span" color={"red"}>
            *
          </Box>
        ) : (
          <></>
        )}
      </Text>
      <Textarea
        value={value(name)}
        onChange={(e) => {
          onChange && onChange(e);
          getValue(name, e.target.value);
        }}
        placeholder={placeholder}
        size="lg"
        minHeight={200}
        name={name}
        border={"none"}
        bgColor={"#A9C667"}
        borderRadius={5}
        outline={0}
        required={!!required}
        _placeholder={{
          color: "gray.600",
        }}
        resize={"none"}
        overflowY={"auto"}
        {...props}
      />
      {error(name) ? (
        <Text mt="4px" color={"red"} fontSize={"small"}>
          {error(name)}:
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
};

export const SingleImageInput = ({
  title,
  value,
  onChange,
  getValue,
  placeholder,
  error,
  name,
  required,
  acceptFileType = "*",
  size,
  ...props
}: {
  title: string;
  value: (key: string) => File | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getValue: (key: string, value: File | undefined | null) => void;
  placeholder: string;
  error: (key: string) => string | undefined;
  name: string;
  required?: boolean;
  acceptFileType: string;
  size: number | string;
  props?: InputProps;
}) => {
  const profile_img_REF = useRef<HTMLInputElement>(null);

  return (
    <Box display={"flex"} flexFlow={"column nowrap"}>
      <Text mb="8px" fontWeight={800} fontSize={"larger"}>
        {title}:{" "}
        {required ? (
          <Box as="span" color={"red"}>
            *
          </Box>
        ) : (
          <></>
        )}
      </Text>
      <Box
        as="label"
        htmlFor="profile_img"
        cursor={"pointer"}
        borderRadius={5}
        bgColor={"#A9C667"}
        position={"relative"}
      >
        {value(name) ? (
          <>
            <Box
              as="img"
              height={size}
              width={size}
              objectFit={"cover"}
              src={URL.createObjectURL(value(name) as Blob | MediaSource) || ""}
              alt=""
            />
            <Icon
              position={"absolute"}
              top={3}
              right={3}
              height={6}
              width={6}
              borderRadius={10}
              backgroundColor={"black"}
              color={"theme.yellow"}
              onClick={(e) => {
                e.preventDefault();
                if (profile_img_REF?.current) {
                  profile_img_REF.current.value = "";
                }
                getValue(name, null);
              }}
              as={IoClose}
            />
          </>
        ) : (
          <Box
            as="div"
            height={size}
            width={size}
            display={"flex"}
            flexFlow={"column nowrap"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Icon as={FaCamera} color={"gray.700"} />
            <Box
              as="small"
              fontFamily={"var(--font-schoolbell)"}
              color={"gray.700"}
            >
              {placeholder}
            </Box>
          </Box>
        )}
        <Input
          display="none"
          id="profile_img"
          ref={profile_img_REF}
          name={name}
          onChange={(e) => {
            onChange && onChange(e);
            getValue(name, e.target.files?.[0]);
          }}
          type="file"
          accept={acceptFileType}
          {...props}
        />
      </Box>
      {error(name) ? (
        <Text mt="4px" color={"red"} fontSize={"small"}>
          {error(name)}:
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
};
