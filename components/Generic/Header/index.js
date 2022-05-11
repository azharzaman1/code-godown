import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import MenuDropdown from "./MenuDropdown";
import UserMenu, { MenuItem } from "./UserMenu";
import Link from "../Link";
import Button from "../Button";
import { auth } from "../../../firebase";
import useAuth from "../../../hooks/auth/useAuth";
import {
  callsToAction,
  dropdownMenu,
  moreFromMe,
  features,
  moreFromMeActions,
} from "./data";
import useLogout from "../../../hooks/auth/useLogout";

export default function Header({ themeSwitch = false, variant = "dark" }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const currentUser = useAuth();

  const handleLoginRedirect = () => {
    router.push({
      pathname: "/auth/login",
    });
  };

  const handleRegisterRedirect = () => {
    router.push({
      pathname: "/auth/register",
    });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const switchTheme = () => {
    setTheme(theme === "light" || theme === "system" ? "dark" : "light");
  };

  return (
    <Popover className={`relative bg-white dark:bg-backgroundV1Dark`}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 border-b border-dividerColor shadow-md">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10 z-40">
          <div
            className="flex justify-start lg:w-0 lg:flex-1 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <span className="sr-only">Workflow</span>
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </div>

          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <MenuDropdown
                  label="Features"
                  links={features}
                  footerActions={callsToAction}
                  open={open}
                />
              )}
            </Popover>

            <Popover className="relative">
              {({ open }) => (
                <MenuDropdown
                  label="More from me"
                  links={moreFromMe}
                  footerActions={moreFromMeActions}
                  open={open}
                />
              )}
            </Popover>
            <a
              href="#"
              className="text-base font-medium text-secondaryText dark:text-secondaryTextDark cursor-pointer"
            >
              Docs
            </a>
          </Popover.Group>

          <div className="flex md:flex-1 lg:w-0 justify-end space-x-4">
            {themeSwitch && (
              <div className="cursor-pointer">
                <IconButton
                  onClick={switchTheme}
                  aria-label="fingerprint"
                  color="secondary"
                >
                  {theme === "dark" ? (
                    <SunIcon className={`h-8 p-1`} />
                  ) : (
                    <MoonIcon className="h-8 p-1" />
                  )}
                </IconButton>
              </div>
            )}

            <div className="hidden md:flex items-center justify-end">
              {currentUser ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-3">
                  <Button type="text" onClick={handleLoginRedirect}>
                    Sign in
                  </Button>
                  <Button onClick={handleRegisterRedirect}>Sign up</Button>
                </div>
              )}
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white dark:bg-backgroundV2Dark rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu />
    </Popover>
  );
}

const MobileMenu = () => {
  const router = useRouter();
  const currentUser = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-2 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="flex flex-col space-y-1">
                {dropdownMenu.map((item) => (
                  <MenuItem key={item.key} item={item} id={item.key} />
                ))}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <Link bold href="#">
                Documentaion
              </Link>
              <Link bold href="#">
                Guides
              </Link>
              <Link bold href="#">
                Future
              </Link>
              <Link bold href="#">
                Wanna Contribute?
              </Link>
              <Link bold href="#">
                Buy me a coffee 🍵
              </Link>
            </div>
            {!currentUser && (
              <div className="mt-2">
                <Button
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                  className="w-full justify-center"
                >
                  Sign up
                </Button>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link underline href="/auth/login">
                    Sign in
                  </Link>
                </p>
              </div>
            )}

            {currentUser && (
              <div className="mt-2">
                <Button
                  onClick={handleLogout}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
