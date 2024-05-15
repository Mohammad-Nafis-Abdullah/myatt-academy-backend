import {
  Avatar,
  Badge,
  Flex,
  Icon,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";

export interface grade_schema {
  _id: string;
  image: string;
  name: string;
  feature: boolean;
  total_courses: number;
  total_units: number;
  status: "Public";
}

const GradeListTable = () => {
  const [grades, setGrades] = useState<grade_schema[]>([]);
  const [state, setState] = useLocalStorage<grade_schema | null>(
    "grade_modal_state",
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetch("/grade-list.json")
      .then((res) => res.json())
      .then((data) => setGrades(data));
  }, []);

  return (
    <>
      <Flex maxWidth={"300px"} alignItems={"center"} gap={2} mb={5} p={1}>
        <Text fontWeight={"bold"} whiteSpace={"pre"} letterSpacing={1}>
          Search :
        </Text>
        <Input placeholder="Enter name to search..." />
      </Flex>
      <TableContainer userSelect={"none"}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr bg={"theme.green"}>
              <CustomTh>Image</CustomTh>
              <CustomTh>Name</CustomTh>
              <CustomTh>Feature</CustomTh>
              <CustomTh>Total Courses</CustomTh>
              <CustomTh>Total Units</CustomTh>
              <CustomTh>Status</CustomTh>
              <CustomTh>Action</CustomTh>
            </Tr>
          </Thead>
          <Tbody>
            {grades.map((grade) => {
              return (
                <Tr key={grade._id}>
                  <Td>
                    <Avatar
                      outline={"none"}
                      boxSize={12}
                      p={1}
                      name={grade.name}
                      src={grade.image}
                    />
                  </Td>
                  <Td>{grade.name}</Td>
                  <Td>
                    {grade.feature ? (
                      <Badge
                        colorScheme="green"
                        fontSize={"sm"}
                        fontWeight={"bold"}
                        width={10}
                        height={7}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        pt={1.5}
                        letterSpacing={1.5}
                        borderRadius={5}
                      >
                        Yes
                      </Badge>
                    ) : (
                      <Badge
                        colorScheme="red"
                        fontSize={"sm"}
                        fontWeight={"bold"}
                        width={10}
                        height={7}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        pt={1.5}
                        letterSpacing={1.5}
                        borderRadius={5}
                      >
                        No
                      </Badge>
                    )}
                  </Td>
                  <Td>{grade.total_courses}</Td>
                  <Td>{grade.total_units}</Td>
                  <Td>
                    <Badge
                      colorScheme="green"
                      fontSize={"sm"}
                      fontWeight={"bold"}
                      width={16}
                      height={7}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      pt={1.2}
                      letterSpacing={1.5}
                      borderRadius={5}
                    >
                      {grade.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2} alignItems={"center"}>
                      <Icon
                        as={FaEdit}
                        boxSize={6}
                        cursor={"pointer"}
                        color={"gray"}
                        _hover={{ color: "black" }}
                        _active={{ transform: "scale(0.9)" }}
                        onClick={() => {
                          setState(grade);
                          router.push("?modal=grade_modal");
                        }}
                      />
                      <Icon
                        as={FaTrash}
                        boxSize={5}
                        cursor={"pointer"}
                        color={"gray"}
                        _hover={{ color: "black" }}
                        _active={{ transform: "scale(0.9)" }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
            {/* <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GradeListTable;

const CustomTh = ({ children }: { children: ReactNode }) => {
  return (
    <Th fontSize={"md"} letterSpacing={1.5} color={"black"}>
      {children}
    </Th>
  );
};
