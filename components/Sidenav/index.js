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
  {
    path: "/faq-editor",
    label: "FAQ editor",
    icon: AddIcon,
  },
];

const SideBar = () => {
  const router = useRouter();
  return (
    <Box w="full" h="full" bg="minthnt.blue5">
      <Flex direction="column" paddingTop="3rem" pl="2rem">
        {routes.map((route, i) => (
          <Link key={i} href={route.path}>
            <Box
              as="a"
              style={
                router.pathname === route.path
                  ? {
                      backgroundColor: "rgba(1, 170, 255, 0.5)",
                      transform: "translateX(1rem)",
                      borderRadius: "0 1rem 0 1rem",
                      fontWeight: 700,
                    }
                  : {}
              }
              color="#fff"
              paddingLeft="2rem"
              paddingY="0.8rem"
              fontSize="12px"
              cursor="pointer"
            >
              {route.label}
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default SideBar;
