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

export interface course_schema {
  _id: string;
  image: string;
  name: string;
  category: string;
  total_units: number;
  price: number;
  status: "Public" | "Hidden";
  story: boolean;
  vocabulary: boolean;
}

const CourseListTable = () => {
  const [courses, setCourses] = useState<course_schema[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<course_schema[]>([]);
  const [state, setState] = useLocalStorage<course_schema | null>(
    "course_modal_state",
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetch("/course-list.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    let searchTimeOut_ref: any = null;
    if (search) {
      searchTimeOut_ref && clearTimeout(searchTimeOut_ref);

      searchTimeOut_ref = setTimeout(() => {
        const selected = courses.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredData(selected);
        searchTimeOut_ref = null;
      }, 500);
    } else {
      setFilteredData(courses);
    }

    return () => clearTimeout(searchTimeOut_ref);
  }, [search, courses]);

  return (
    <>
      <Flex maxWidth={"300px"} alignItems={"center"} gap={2} mb={5} p={1}>
        <Text fontWeight={"bold"} whiteSpace={"pre"} letterSpacing={1}>
          Search :
        </Text>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter name to search..."
        />
      </Flex>
      <TableContainer userSelect={"none"}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr bg={"theme.green"}>
              {/* <CustomTh>Image</CustomTh> */}
              <CustomTh>Name</CustomTh>
              <CustomTh>Category</CustomTh>
              <CustomTh>Total Units</CustomTh>
              <CustomTh>Price</CustomTh>
              <CustomTh>Status</CustomTh>
              <CustomTh>Story</CustomTh>
              <CustomTh>Vocabulary</CustomTh>
              <CustomTh>Action</CustomTh>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((course) => {
              return (
                <Tr key={course._id}>
                  {/* <Td>
                    <Avatar
                      outline={"none"}
                      boxSize={12}
                      p={1}
                      name={course.name}
                      src={course.image}
                    />
                  </Td> */}
                  <Td>{course.name}</Td>
                  <Td>{course.category}</Td>
                  <Td>{course.total_units}</Td>
                  <Td>{course.price}</Td>
                  <Td>
                    <Badge
                      colorScheme={course.status === "Public" ? "green" : "red"}
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
                      {course.status}
                    </Badge>
                  </Td>
                  <Td>
                    {course.story ? (
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
                  <Td>
                    {course.vocabulary ? (
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
                          setState(course);
                          router.push("?modal=course_modal");
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

export default CourseListTable;

const CustomTh = ({ children }: { children: ReactNode }) => {
  return (
    <Th fontSize={"md"} letterSpacing={1.5} color={"black"}>
      {children}
    </Th>
  );
};
