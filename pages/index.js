import tw from "twin.macro";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="MainBackground">
      <div tw="w-full h-full bg-purple-500 bg-opacity-75 py-20 px-12 flex justify-between sm:py-8">
        <div tw="flex flex-col justify-start items-start sm:items-center sm:justify-between">
          <div tw="text-white px-4 py-1 rounded-lg font-semibold text-3xl lg:hidden">
            MintHNT
          </div>
          <div tw="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold sm:hidden">
            Coming June 2021
          </div>
          <div tw="flex flex-col text-white text-5xl pt-10 sm:text-2xl sm:py-4 sm:font-semibold">
            <span>Connect The World.</span>
            <span>Get Paid.</span>
          </div>
          <div tw="w-64 lg:hidden">
            <img tw="w-full" src="/images/svg/launch.svg" />
          </div>
          <div tw="bg-white text-purple-500 px-4 py-1 mt-5 rounded-lg font-semibold lg:hidden">
            Coming June 2021
          </div>
          <div tw="text-white pt-8 font-semibold sm:text-center sm:hidden">
            MintHNT is a new model for delivering wireless networks that
            <br /> rewards individuals and business in exchange for providing
            <br />
            wireless coverage. Based on the Helium Networks blockchain,
            <br /> MintHNT represents a transformational shift towards a<br />
            decentralized, people-powered wireless economy.
          </div>
          <div tw="pt-6 sm:pt-4">
            <Link href="/register">
              <button tw="px-4 py-1 rounded-lg text-purple-500 bg-white outline-none focus:outline-none">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
        <div tw="w-96 sm:hidden">
          <img tw="w-full" src="/images/svg/launch.svg" />
        </div>
      </div>
      <style jsx>{`
        .MainBackground {
          background-image: url(/images/jpg/main-background.jpg);
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
