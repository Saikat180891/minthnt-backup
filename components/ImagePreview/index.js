import React from "react";
import { Input, Flex, Image, Box } from "@chakra-ui/react";

const ImagePreview = ({ onChange = () => {}, ...rest }) => {
  const [img, setImg] = React.useState(null);

  const handleImageChange = (e) => {
    onChange(e);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (fileSelected) => setImg(fileSelected.target.result);
  };

  return (
    <Flex
      w="100%"
      h="100%"
      overflow="hidden"
      position="relative"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      {...rest}
    >
      <Image w="full" h="full" src={img} />
      {!img && (
        <Box
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          No file choosen
        </Box>
      )}
      <Input
        type="file"
        position="absolute"
        opacity="0"
        top="0"
        left="0"
        w="full"
        h="full"
        accept="image/png, image/gif, image/jpeg"
        size="300"
        cursor="pointer"
        onChange={handleImageChange}
      />
    </Flex>
  );
};

export default ImagePreview;
