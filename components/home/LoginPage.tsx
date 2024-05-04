"use client";
import { TextInput } from "@/components/CustomFormInput";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface FormData_Schema {
  email: string | undefined;
  password: string | undefined;
}

const LoginPage = () => {
  const [formStatus, setFormStatus] = useState<"login" | "signup">("login");
  const [confirm_password, setConfirm_password] = useState("");
  const [formData, setFormData] = useState<FormData_Schema>(
    {} as FormData_Schema
  );

  const [formErr, setFormErr] = useState<FormData_Schema>(
    {} as FormData_Schema
  );

  const setValue = (key: keyof FormData_Schema, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  useEffect(() => {
    setFormData({} as FormData_Schema);
    setFormErr({} as FormData_Schema);
  }, [formStatus]);

  return (
    <Box bg={"theme.darkGreen"} p={5} pt={20} minHeight={"100vh"}>
      {formStatus === "login" ? (
        <>
          <Box as="h2" textAlign={"center"} mb={5}>
            Login
          </Box>
          <Box
            bg={"theme.yellow"}
            px={5}
            py={10}
            mx={"auto"}
            maxW={"lg"}
            borderRadius={6}
            display={"flex"}
            flexFlow={"column"}
            gap={5}
          >
            <TextInput
              title="Email"
              type="text"
              name="email"
              placeholder="Write your Email..."
              value={(key) => formData[key as keyof FormData_Schema]}
              getValue={(key, val) =>
                setValue(key as keyof FormData_Schema, val as string)
              }
              error={(key) => formErr[key as keyof FormData_Schema]}
              required={true}
            />
            <TextInput
              title="Password"
              type="password"
              name="password"
              placeholder="Write your Password..."
              value={(key) => formData[key as keyof FormData_Schema]}
              getValue={(key, val) =>
                setValue(key as keyof FormData_Schema, val as string)
              }
              error={(key) => formErr[key as keyof FormData_Schema]}
              required={true}
            />
            <Box
              display={"flex"}
              flexFlow={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
            >
              <Button>Login</Button>
              <Box
                as="button"
                _hover={{
                  borderBottom: "2px",
                }}
                onClick={() => setFormStatus("signup")}
              >
                Register new account
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box as="h2" textAlign={"center"} mb={5}>
            Sign Up
          </Box>
          <Box
            bg={"theme.yellow"}
            px={5}
            py={10}
            mx={"auto"}
            maxW={"lg"}
            borderRadius={6}
            display={"flex"}
            flexFlow={"column"}
            gap={5}
          >
            <TextInput
              title="Email"
              type="text"
              name="email"
              placeholder="Write your Email..."
              value={(key) => formData[key as keyof FormData_Schema]}
              getValue={(key, val) =>
                setValue(key as keyof FormData_Schema, val as string)
              }
              error={(key) => formErr[key as keyof FormData_Schema]}
              required={true}
            />
            <TextInput
              title="Password"
              type="password"
              name="password"
              placeholder="Write your Password..."
              value={(key) => formData[key as keyof FormData_Schema]}
              getValue={(key, val) =>
                setValue(key as keyof FormData_Schema, val as string)
              }
              error={(key) => formErr[key as keyof FormData_Schema]}
              required={true}
            />
            <TextInput
              title="Re-enter Password"
              type="password"
              name="confirm_password"
              placeholder="Re-Write your Password..."
              value={(key) => confirm_password}
              getValue={(key, val) => setConfirm_password(val as string)}
              error={(key) =>
                formData["password"] !== confirm_password &&
                confirm_password !== ""
                  ? "Password is not simillar"
                  : ""
              }
              required={true}
            />
            <Box
              display={"flex"}
              flexFlow={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
            >
              <Button>Sign up</Button>
              <Box
                as="button"
                _hover={{
                  borderBottom: "2px",
                }}
                onClick={() => setFormStatus("login")}
              >
                Already have an account
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LoginPage;
