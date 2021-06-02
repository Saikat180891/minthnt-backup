import { Badge } from "@chakra-ui/react";

const DisplayText = ({ children, divideBy = 1, align = "left", ...rest }) => {
  return (
    <Badge
      {...rest}
      backgroundColor="transparent"
      textAlign={align}
      width={`calc(100% / ${divideBy})`}
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      overflow="hidden"
    >
      {children}
    </Badge>
  );
};

export default DisplayText;
