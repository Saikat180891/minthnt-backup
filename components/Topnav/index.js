import {
  Flex,
  Box,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import Apis from "../../context/apis";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { connect } from "react-redux";

const Topnav = ({ user = {} }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await Apis.logout();
    Cookie.remove("token");
    router.push("/login");
  };
  return (
    <Grid
      templateColumns="14rem repeat(7, 1fr)"
      backgroundColor="rgba(1, 170, 255, 0.8)"
      h="full"
    >
      <GridItem colSpan="1" alignSelf="center" justifySelf="center">
        <Image src="/images/png/logo.png" w="10rem" />
      </GridItem>
      <GridItem
        colSpan="2"
        colStart="7"
        alignSelf="center"
        justifySelf="end"
        pr="2rem"
      >
        <Flex alignItems="center">
          <Text mr="3" fontWeight="600">
            Welcome, {user?.first_name}
          </Text>
          <Popover>
            <PopoverTrigger>
              <ChevronDownIcon cursor="pointer" />
            </PopoverTrigger>
            <PopoverContent w="10rem">
              <PopoverArrow />
              <PopoverHeader
                color="black"
                cursor="pointer"
                onClick={handleLogout}
              >
                Logout
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </Flex>
      </GridItem>
      {/* <Flex
        justifyContent="flex-end"
        alignItems="center"
        h="100%"
        paddingX="2rem"
      >
      </Flex> */}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {})(Topnav);
