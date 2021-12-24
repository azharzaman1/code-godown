import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover } from "@headlessui/react";
import { MenuIcon, MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Link from "next/link";
import CustomizedDropdown from "./CustomizedDropdown";
import { auth } from "../../../client/firebase";
import { selectUserFromDB } from "../../../redux/slices/userSlice";
import { selectTheme, SET_THEME } from "../../../redux/slices/appSlice";
import { IconButton } from "@chakra-ui/react";
import SimpleDropdown from "./SimpleDropdown";
import ThemeButton from "../Button";

const Header = ({
  navigation = [],
  transparentEffect,
  variant,
  themeSwitch = true,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const themePreference = useSelector(selectTheme);
  const userInDB = useSelector(selectUserFromDB);
  const [user, loading, error] = useAuthState(auth);
  console.log("Loading:", loading, "|", "Current user:", user);

  const handleLoginRedirect = () => {
    router.push({
      pathname: "/authentication",
      query: {
        mode: "login",
      },
    });
  };

  const handleRegisterRedirect = () => {
    router.push({
      pathname: "/authentication",
      query: {
        mode: "register",
      },
    });
  };

  const switchTheme = () => {
    dispatch(SET_THEME(themePreference === "dark" ? "light" : "dark"));
  };

  return (
    <Popover>
      <nav
        className={`${
          transparentEffect
            ? "absolute top-0 bg-[#ffffffb4] border-[#eeeeee41]"
            : variant === "light"
            ? "bg-white border-[#eeeeee41]"
            : "dark-bg-light"
        } w-full z-20 px-3 lg:px-16 flex shadow items-center justify-between`}
        aria-label="Global"
      >
        <div className="flex items-center py-3 px-3">
          <div className="flex-between-center w-full md:w-auto cursor-pointer">
            <Link href="/">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              />
            </Link>
          </div>
        </div>
        <div className="flex md:flex-1 md:pl-5 items-center md:justify-between">
          <div className="hidden md:flex md:space-x-6">
            {navigation &&
              navigation.map(({ name, href, dropdown, dropdownItems }) => (
                <Fragment key={name}>
                  {dropdown ? (
                    <SimpleDropdown
                      dropdownData={dropdownItems}
                      label={name}
                      disableTooltip
                      dark={variant === "dark"}
                    />
                  ) : (
                    <a href={href} className="link">
                      {name}
                    </a>
                  )}
                </Fragment>
              ))}
          </div>

          <div className="flex space-x-2 items-center">
            {themeSwitch && (
              <div className="cursor-pointer">
                <IconButton
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="lg"
                  onClick={switchTheme}
                  icon={
                    themePreference === "dark" ? (
                      <SunIcon
                        className={`h-8 p-1 ${
                          !transparentEffect && "text-gray-200"
                        }`}
                      />
                    ) : (
                      <MoonIcon className="h-8 p-1" />
                    )
                  }
                />
              </div>
            )}

            {user ? (
              <div className="cursor-pointer">
                <CustomizedDropdown
                  dropdownTrigger={
                    <Avatar
                      src={
                        userInDB?.userDetails?.photoURL &&
                        userInDB?.userDetails?.photoURL
                      }
                      sx={{ bgcolor: deepOrange[500], width: 40, height: 40 }}
                    >
                      {userInDB?.userDetails?.displayName[0].toUpperCase()}
                    </Avatar>
                  }
                  avatar={
                    <Avatar
                      src={
                        userInDB?.userDetails?.photoURL &&
                        userInDB?.userDetails?.photoURL
                      }
                      sx={{ bgcolor: deepOrange[500], width: 30, height: 30 }}
                    >
                      {userInDB?.userDetails?.displayName[0].toUpperCase()}
                    </Avatar>
                  }
                />
              </div>
            ) : (
              <>
                <ThemeButton
                  type="text"
                  isDark={variant !== "light"}
                  onClick={handleLoginRedirect}
                >
                  Login
                </ThemeButton>
                <ThemeButton
                  className="m-7 md:m-0"
                  onClick={handleRegisterRedirect}
                  size="small"
                >
                  Signup
                </ThemeButton>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </nav>
    </Popover>
  );
};

export default Header;
