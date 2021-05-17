import Input from "@/Input";
import Button from "@/Button";
import tw from "twin.macro";

const LoginPage = () => {
  return (
    <div tw="flex flex-col p-5">
      <h1 tw="w-full h-12 flex justify-start items-center text-2xl mb-5">
        Login to your account
      </h1>
      <div tw="mb-5">
        <Input
          type="text"
          placeholder="Your email id"
          tw="w-full h-12 text-base px-3 py-1 outline-none border border-gray-900"
        />
      </div>
      <div tw="mb-5">
        <Input
          type="password"
          placeholder="Your password"
          tw="w-full h-12 text-base px-3 py-1 outline-none border border-gray-900"
        />
      </div>
      <div>
        <Button tw="bg-gray-900 text-base w-full h-12 text-white rounded">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
