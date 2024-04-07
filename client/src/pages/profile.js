import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // InputGroup,
  // InputRightElement,
  // Checkbox,
  HStack,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/actions/auth";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { updateProfile } from "../redux/actions/user";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  // const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    // getProfile();
  });
  //redux
  // const { isLoggedIn } = useSelector((state) => state.auth);
  /* const { message } = useSelector((state) => state.message); */
  const dispatch = useDispatch();

  /* const getProfile = async () => {
    setSubmitLoading(true);
    // dispatch(getProfile(user.id)).then((res) => {});
    console.log("profile auth", user);
    setSubmitLoading(false);
  }; */
  const submit = async () => {
    setSubmitLoading(true);
    dispatch(updateProfile(user.id, firstName, lastName))
      .then((res) => {
        navigate("/profile");
        toast({
          description: res?.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((res) => {
        console.log(res);
        toast({
          description: res?.response?.data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    setSubmitLoading(false);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Profile
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Edit your First Name and Last Name here ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                isReadOnly={true}
              />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    isRequired={true}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    isRequired={true}
                  />
                </FormControl>
              </Box>
            </HStack>
            <Stack spacing={5} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  submit();
                }}
              >
                {submitLoading === true ? <Spinner size="md" /> : "Update"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Forgot Password? <Link color={"blue.400"}>Reset</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
