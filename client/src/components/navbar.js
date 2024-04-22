import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Portal,
  PopoverArrow,
  // PopoverCloseButton,
  PopoverBody,
  Avatar,
  /* useToast, */
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/auth";
import HBLogo2 from "../assets/HBLogo2.svg"


// let nav_user = [];
export default function WithSubnavigation() {
  /* const toast = useToast(); */
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  // const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onToggle } = useDisclosure();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };
  const nav_items = user?.roles === 3
    ? [
      // {
      //   label: "Inspiration",
      //   children: [
      //     {
      //       label: "Explore Design Work",
      //       subLabel: "Trending Design to inspire you",
      //       href: "#",
      //     },
      //     {
      //       label: "New & Noteworthy",
      //       subLabel: "Up-and-coming Designers",
      //       href: "#",
      //     },
      //   ],
      // },
      // {
      //   label: "Find Work",
      //   children: [
      //     {
      //       label: "Job Board",
      //       subLabel: "Find your dream design job",
      //       href: "#",
      //     },
      //     {
      //       label: "Freelance Projects",
      //       subLabel: "An exclusive list for contract work",
      //       href: "#",
      //     },
      //   ],
      // },
      // {
      //   label: "Forms",
      //   href: "/form_g1",
      // },
      {
        label: "User List",
        href: "/user/list",
      },
      {
        label: "Rooms",
        href: "/user/room",
      },
    ]
    : [
      {
        label: "Rooms",
        href: "/user/room",
      },
    ];
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        position="fixed"
        w="100%"
        as="header"
        zIndex={10}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} alignItems={"center"}>
          <Link href="/">
            <img src={HBLogo2} alt="" width="50" height="50" />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav navItems={nav_items} />
          </Flex>
        </Flex>

        {isLoggedIn === true ? (
          <>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={0}
            >
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="transparent">
                    <Avatar name={user.firstname} src="" />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody
                      py={10}
                      // px={30}
                      justify={"center"}
                      align={"center"}
                      display="grid"
                    >
                      <Link
                        fontSize={"sm"}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                          textDecoration: "none",
                          color: linkHoverColor,
                        }}
                        mb={5}
                        href="/profile"
                      >
                        Profile
                      </Link>
                      <Button
                        as={"a"}
                        fontSize={"sm"}
                        fontWeight={400}
                        color={"white"}
                        bg={"blue.400"}
                        // href={"/signup"}
                        _hover={{
                          bg: "blue.700",
                        }}
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Log Out
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Stack>
          </>
        ) : (
          <>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/login"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                href={"/signup"}
                _hover={{
                  bg: "blue.700",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={nav_items} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  return (
    <Stack direction={"row"} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      pt={20}
      display={{ md: "none" }}
    >
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
