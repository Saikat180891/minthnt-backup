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
} from "@chakra-ui/react";
import Apis from "../../context/apis";
import { useRouter } from "next/router";

const Topnav = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await Apis.logout();
    router.push("/login");
  };
  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      h="3rem"
      w="calc(100% - 16rem)"
      backgroundColor="#fff"
      boxShadow="0 2px 5px rgba(0,0,0,0.3)"
      zIndex="5"
    >
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        h="100%"
        paddingX="2rem"
      >
        <Popover>
          <PopoverTrigger>
            <Avatar size="sm" cursor="pointer" />
          </PopoverTrigger>
          <PopoverContent marginRight="1rem" w="10rem">
            <PopoverArrow />
            {/* <PopoverCloseButton /> */}
            <PopoverHeader cursor="pointer" onClick={handleLogout}>
              Logout
            </PopoverHeader>
            {/* <PopoverBody>
              Are you sure you want to have that milkshake?
            </PopoverBody> */}
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default Topnav;
