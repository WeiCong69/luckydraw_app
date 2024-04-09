import React from "react";
import {
  Table,
  Thead,
  Tbody,
  // Button,
  Flex,
  Container,
  Tr,
  Th,
  Td,
  Spinner,
  // useToast,
  Input,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import useDocumentTitle from "../components/useDocumentTitle";
import { useState, useEffect } from "react";
import userService from "../services/user.service";

export default function UserTable() {
  useDocumentTitle("User Table");
  const [userList, setUserList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  // const toast = useToast();

  const pageSize = 20;
  const offset = (current - 1) * pageSize;
  const posts = searchList.slice(offset, offset + pageSize);

  const searchHandler = async (e) => {
    let text = await e.target.value.toLowerCase();
    setSearchText(text);
  };

  useEffect(() => {
    const getUserList = async () => {
      let list = [];
      if (Object.keys(userList).length === 0) {
        list = await userService.showAllUser();
        setUserList(list);
      }
      let filterdata = [];
      filterdata = userList.filter((data) => {
        if (searchText === "") {
          return data;
        } else {
          setCurrent(1);
          return (
            data.firstname.toLowerCase().includes(searchText) ||
            data.lastname.toLowerCase().includes(searchText) ||
            data.id.toString().includes(searchText) ||
            data.email.toLowerCase().includes(searchText)
          );
        }
      });
      setSearchList(filterdata);
      setLoading(false);
    };
    getUserList();
  }, [searchText, userList]);

  // const Prev = forwardRef((props, ref) => (
  //   <Button ref={ref} {...props}>
  //     Prev
  //   </Button>
  // ));
  // const Next = forwardRef((props, ref) => (
  //   <Button ref={ref} {...props}>
  //     Next
  //   </Button>
  // ));

  // const itemRender = (_, type) => {
  //   if (type === "prev") {
  //     return Prev;
  //   }
  //   if (type === "next") {
  //     return Next;
  //   }
  // };
  return loading ? (
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
      <Container maxW={"8xl"} py={14}>
        <Spinner />
      </Container>
    </Flex>
  ) : (
    <>
      <Flex minH={"90vh"} align={"center"} justify={"center"}>
        <Container maxW={"8xl"} py={14}>
          <Input placeholder="Search ... " onChange={searchHandler} />
          <Table
            maxW="98%"
            m={15}
            mt={20}
            shadow="base"
            rounded="lg"
            variant="simple"
          >
            {/* <TableCaption>
              {/* <Pagination
                current={current}
                onChange={(page) => {
                  setCurrent(page);
                }}
                pageSize={pageSize}
                total={searchList.length}
                itemRender={itemRender}
                paginationProps={{
                  display: "flex",
                  pos: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                colorScheme="red"
                focusRing="green"
              /> 
            </TableCaption> */}
            <Thead>
              <Tr>
                <Th w="2px">ID</Th>
                <Th w="110px">First Name</Th>
                <Th w="110px">Last Name</Th>
                <Th>Email</Th>
                {/* <Th>Data</Th> */}
                <Th>Remark</Th>
                {/* <Th>Details</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.firstname}</Td>
                  <Td>{item.lastname}</Td>
                  <Td>{item.email}</Td>
                  {/* <Td>{item?.userDetails[0].createdAt}</Td> */}
                  <Td>{item.remark}</Td>
                  {/* <Td>{item?.userDetails[0].details}</Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex w="full" p={0} alignItems="center" justifyContent="center">
            <Pagination
              current={current}
              onChange={(page) => {
                setCurrent(page);
              }}
              pageSize={pageSize}
              defaultCurrent={1}
              total={searchList.length}
              paginationProps={{
                display: "flex",
              }}
              pageNeighbours={1}
              showQuickJumper
              colorScheme="gray"
            />
          </Flex>
        </Container>
      </Flex>
    </>
  );
}
