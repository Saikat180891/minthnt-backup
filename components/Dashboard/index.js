import { Flex, Box, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import tw from "twin.macro";
import Sidenav from "@/Sidenav";
import Topnav from "@/Topnav";
import { Scrollbars } from "react-custom-scrollbars-2";

const Dashboard = ({ children }) => {
  return (
    <Grid
      w="100"
      h="100vh"
      bg="black"
      color="white"
      templateColumns="14rem repeat(7, 1fr)"
      templateRows="4rem 1fr"
    >
      <GridItem colSpan="8">
        <Topnav />
      </GridItem>
      <GridItem colSpan="1">
        <Sidenav />
      </GridItem>
      <GridItem colSpan="7" colStart="2">
        <Scrollbars style={{ width: "100%", height: "100%" }} universal={true}>
          {children}
        </Scrollbars>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
