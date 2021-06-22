import React from "react";
import { Input, Flex, Image, Box, Text } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

const ImagePlaceholder = () => {
  return (
    <Flex direction="column" w="full" h="full" bg="minthnt.gray3">
      <Text fontStyle="italic">Upload a image</Text>
      <Flex
        justifyContent="center"
        alignItems="center"
        w="6"
        h="6"
        rounded="full"
        bg="green.500"
      >
        <AddIcon />
      </Flex>
    </Flex>
  );
};

const ImagePreview = ({ onChange = () => {}, disabled = false, ...rest }) => {
  const [img, setImg] = React.useState(null);

  const handleImageChange = (e) => {
    onChange(e);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (fileSelected) => setImg(fileSelected.target.result);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="full"
      h="full"
      bg="minthnt.gray3"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {img ? (
        <Image w="full" h="full" objectFit="cover" src={img} />
      ) : (
        <>
          <Text fontStyle="italic" mb="4">
            Upload a image
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            w="6"
            h="6"
            rounded="full"
            bg="green.500"
          >
            <AddIcon />
          </Flex>
        </>
      )}

      <Input
        type="file"
        position="absolute"
        opacity="0"
        top="0"
        left="0"
        w="full"
        h="full"
        isDisabled={disabled}
        accept="image/png, image/gif, image/jpeg"
        size="300"
        cursor="pointer"
        onChange={handleImageChange}
      />
    </Flex>
    // <Flex
    //   w="100%"
    //   h="100%"
    //   overflow="hidden"
    //   position="relative"
    //   justifyContent="center"
    //   alignItems="center"
    //   cursor="pointer"
    //   {...rest}
    // >

    //   {!img && (
    //     <Box
    //       pos="absolute"
    //       top="50%"
    //       left="50%"
    //       transform="translate(-50%, -50%)"
    //     >
    //       No file choosen
    //     </Box>
    //   )}

    // </Flex>
  );
};

export default ImagePreview;
