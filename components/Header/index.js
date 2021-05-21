import tw from "twin.macro";
import HambergerIcon from "../../public/images/svg/view_headline.svg";
import Button from "@/Button";
import Link from "next/link";

const Header = () => {
  return (
    <header tw="w-full bg-white h-12 items-center shadow text-sm sm:relative sm:px-5 flex sm:justify-center lg:justify-center">
      <div tw="w-200 flex justify-between items-center sm:justify-center">
        <div tw="absolute top-0 left-0 h-full px-5 flex items-center lg:hidden">
          <HambergerIcon />
        </div>
        <Link href="/">
          <div tw="text-purple-500 font-semibold text-lg flex items-center cursor-pointer">
            <img src="/images/png/blockchain-icon.png" tw="w-8 pr-1" />
            <span>mintHNT</span>
          </div>
        </Link>
        <nav tw="sm:hidden">
          <ul tw="flex items-center">
            <li tw="px-5">
              <Link href="/">HOME</Link>
            </li>
            <li tw="px-5">
              <Link href="/register">
                <a>APPLY</a>
              </Link>
            </li>
            <li tw="px-5 hidden">
              <a>FAQ</a>
            </li>
            <li tw="px-5 hidden">
              <a>CONTACT</a>
            </li>
            <li tw="pl-5 hidden">
              <Button tw="border border-purple-500 text-purple-500 px-4 py-1 rounded duration-300 hover:bg-purple-500 hover:text-white hover:shadow">
                LOGIN
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
