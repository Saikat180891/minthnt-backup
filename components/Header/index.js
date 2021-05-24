import tw from "twin.macro";
import HambergerIcon from "../../public/images/svg/view_headline.svg";
import Button from "@/Button";
import Link from "next/link";
import { connect } from "react-redux";
import SideBar from "@/Sidenav";
import { Avatar, AvatarBadge, AvatarGroup, Icon, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = ({ isLoggedIn }) => {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  return (
    <header tw="w-full bg-white h-12 items-center shadow text-sm sm:relative sm:px-5 flex sm:justify-center lg:justify-center">
      <div tw="w-full px-5 flex justify-between items-center sm:justify-center">
        <div tw="flex items-center">
          <Box paddingRight="1rem" cursor="pointer">
            <Icon as={HamburgerIcon} onClick={() => setOpenSidebar(true)} />
          </Box>
          <Link href="/">
            <div tw="text-purple-500 font-semibold text-lg flex items-center cursor-pointer">
              <img src="/images/png/blockchain-icon.png" tw="w-8 pr-1" />
              <span>mintHNT</span>
            </div>
          </Link>
        </div>
        <nav tw="sm:hidden">
          <ul tw="flex items-center">
            <li>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </li>
          </ul>
        </nav>
      </div>
      <SideBar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
    </header>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    email: state.user.user.email,
    isStaff: state.user.user.is_staff,
  };
};

export default connect(mapStateToProps)(Header);
