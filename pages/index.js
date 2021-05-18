import tw from "twin.macro";

const HomePage = () => {
  return (
    <div className="MainBackground">
      <div tw="w-full h-full bg-purple-500 bg-opacity-75 py-20 px-12 flex justify-between">
        <div tw="flex flex-col justify-start items-start">
          <div tw="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold">
            Coming June 2021
          </div>
          <div tw="flex flex-col text-white text-5xl pt-10">
            <span>Connect The World.</span>
            <span>Get Paid.</span>
          </div>
          <div tw="text-white pt-8 font-semibold">
            MintHNT is a new model for delivering wireless networks that
            <br /> rewards individuals and business in exchange for providing
            <br />
            wireless coverage. Based on the Helium Networks blockchain,
            <br /> MintHNT represents a transformational shift towards a<br />
            decentralized, people-powered wireless economy.
          </div>
          <div tw="pt-6">
            <button tw="px-4 py-1 rounded-lg text-purple-500 bg-white outline-none">
              Apply Now
            </button>
          </div>
        </div>
        <div tw="w-96">
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
