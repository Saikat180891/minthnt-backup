import TextInput from "@/TextInput";
import Close from "../../public/images/svg/clear.svg";
import tw from "twin.macro";
import Button from "@/Button";

const LeadForm = ({ onClose = () => {} }) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div tw="bg-white shadow lg:rounded-lg sm:w-screen sm:h-screen">
      <div tw="flex justify-between items-center px-5 pt-4 pb-1 border-b border-gray-300">
        <h1 tw="font-bold text-lg">Apply for membership</h1>
        <Close tw="cursor-pointer" onClick={onClose} />
      </div>
      <form tw="px-5 pt-4 pb-5" onSubmit={handleSubmit}>
        <div tw="flex sm:flex-col">
          <div tw="lg:pr-8">
            <label tw="flex flex-col">
              <span tw="text-sm pb-1 block">First name</span>
              <TextInput
                type="text"
                placeholder="Ex: John"
                tw="sm:w-full sm:h-12"
              />
            </label>
          </div>
          <div tw="sm:pt-4">
            <label tw="flex flex-col">
              <span tw="text-sm pb-1 block">Last Name</span>
              <TextInput
                type="text"
                placeholder="Ex: Doe"
                tw="sm:w-full sm:h-12"
              />
            </label>
          </div>
        </div>
        <div tw="pt-4">
          <label tw="flex flex-col">
            <span tw="text-sm pb-1 block">Email Id</span>
            <TextInput
              type="text"
              placeholder="Ex: john.doe@gmail.com"
              tw="w-full sm:h-12"
            />
          </label>
        </div>
        <div tw="pt-4">
          <label tw="flex flex-col">
            <span tw="text-sm pb-1 block">Phone Number</span>
            <TextInput type="text" placeholder="Ex: +1 " tw="w-full sm:h-12" />
          </label>
        </div>
        <div tw="pt-4">
          <label tw="flex flex-col">
            <span tw="text-sm pb-1 block">Referal Code</span>
            <TextInput
              type="text"
              placeholder="Ex: ABC004 "
              tw="w-full sm:h-12"
            />
          </label>
        </div>
        <div tw="pt-4 flex justify-end">
          <Button tw="bg-purple-500 text-white px-5 py-1 rounded sm:w-full sm:h-12 outline-none focus:outline-none active:outline-none">
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
