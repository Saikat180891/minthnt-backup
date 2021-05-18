import Header from "@/Header";
import tw from "twin.macro";
import Button from "@/Button";
import Footer from "@/Footer";

const HomePage = () => {
  return (
    <div tw="flex flex-col">
      <Header />
      <div tw="w-full relative">
        <img src="/images/png/banner.png" tw="sm:h-full" />
        <div tw="flex flex-col justify-center items-center sm:pb-20 absolute top-1/2 left-1/2 text-white transform -translate-y-1/2 -translate-x-1/2">
          <h1 tw="text-5xl font-bold mb-4">mintHNT</h1>
          <h2 tw="text-lg mb-4 text-center">
            Get Your Free Helium Hotspot Today And Start Earning{" "}
            <strong>$$$</strong>
          </h2>
          <Button tw="px-5 py-2 mb-4 font-semibold outline-none rounded shadow bg-white text-purple-500">
            Apply now
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
