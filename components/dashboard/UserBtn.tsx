import { useLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { useAppSelector } from "@/redux/store";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContactIcon } from "../ui/Icon";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";

const UserBtn = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await logout("").unwrap();
      if (res?.success) {
        toast({
          title: res.message,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }
      router.push("/?step=login");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Box onMouseLeave={() => setIsOpen(false)}>
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        placement="bottom-start"
        flip={true}
        offset={[0, 0]}
      >
        <MenuButton
          as={IconButton}
          bg="transparent !important"
          onMouseOver={() => setIsOpen(true)}
          p={0}
          fontSize={{
            base: "32px",
            md: "32px",
          }}
          border={"none"}
          outline={"none"}
        >
          <Avatar
            outline={"none"}
            boxSize={12}
            name={user?.name}
            src={user?.image}
          />
        </MenuButton>
        <MenuList bg="white" color="#1a202c" p={5}>
          <MenuItem
            bg=""
            // _hover={{
            //   bg: "orangered",
            //   color: "white",
            // }}
            color="dark.500"
            onClick={() => router.push("/my-profile")}
            display={"flex"}
            alignItems={"center"}
            gap={3}
          >
            <Avatar name={user?.name} src={user?.image} />
            <Box>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {user?.name}
              </Text>
              <Text color={"orangered"}>{user?.email}</Text>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            bg=""
            _hover={{
              bg: "orangered",
              color: "white",
            }}
            color="dark.500"
            onClick={() => {}}
            display={"flex"}
            alignItems={"center"}
            gap={3}
          >
            <IoSettingsOutline />
            <Text>Profile Settings</Text>
          </MenuItem>
          <Divider />
          <MenuItem
            bg=""
            _hover={{
              bg: "orangered",
              color: "white",
            }}
            color="dark.500"
            onClick={handleLogout}
            display={"flex"}
            alignItems={"center"}
            gap={3}
          >
            <IoLogOutOutline />
            <Text>Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserBtn;
