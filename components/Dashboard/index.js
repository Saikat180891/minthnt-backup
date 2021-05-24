import { Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import tw from "twin.macro";
import Sidenav from "@/Sidenav";
import Topnav from "@/Topnav";
import { Scrollbars } from "react-custom-scrollbars-2";

const Dashboard = ({ children }) => {
  return (
    <Box as="main" w="100%" paddingLeft="16rem">
      <Sidenav />
      <Topnav />
      <Box
        w="calc(100% - 16rem)"
        h="calc(100vh - 3rem)"
        position="fixed"
        top="3rem"
        right="0"
        backgroundColor="#e7eef7"
      >
        <Scrollbars style={{ width: "100%", height: "100%" }} universal={true}>
          {children}
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default Dashboard;
