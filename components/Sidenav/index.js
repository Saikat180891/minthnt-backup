import { Flex, Box, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AtSignIcon, AddIcon, CalendarIcon } from "@chakra-ui/icons";

const routes = [
  // {
  //   path: "/",
  //   label: "Dashboard",
  //   icon: CalendarIcon,
  // },
  {
    path: "/",
    label: "Leads",
    icon: AtSignIcon,
  },
  {
    path: "/register-admin",
    label: "Register Admin",
    icon: AddIcon,
  },
];

const SideBar = () => {
  const router = useRouter();
  return (
    <Box
      w="16rem"
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      backgroundColor="#5b7cfd"
    >
      <Flex direction="column" paddingTop="0.6rem">
        <Box
          marginBottom="5rem"
          paddingLeft="2rem"
          textAlign="left"
          color="white"
        >
          MintHNT
        </Box>
        {routes.map((route, i) => (
          <Link key={i} href={route.path}>
            <Box
              as="a"
              backgroundColor={router.pathname === route.path && "#5374f0"}
              color="#fff"
              paddingLeft="2rem"
              paddingY="0.8rem"
              fontSize="12px"
              fontWeight="600"
              cursor="pointer"
            >
              <Icon as={route.icon} marginRight="0.5rem" />
              {route.label}
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default SideBar;
