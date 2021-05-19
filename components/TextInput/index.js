import Input from "@/Input";
import tw from "twin.macro";

const TextInput = ({ type = "text", ...props }) => {
  return (
    <Input
      {...{ type, ...props }}
      tw="outline-none border border-gray-900 p-1.5 h-8 rounded text-sm w-64"
    />
  );
};

export default TextInput;
