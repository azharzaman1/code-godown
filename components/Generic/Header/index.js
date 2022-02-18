import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { selectTheme } from "../../../redux/slices/appSlice";
import { selectUserFromDB } from "../../../redux/slices/userSlice";
import { auth } from "../../../client/firebase";
import MenuDropdown from "./MenuDropdown";
import { callsToAction, resources, solutions } from "./data";
import ThemeButton from "../Button";
import { Button } from "primereact/button";

export default function Header({ themeSwitch = false, variant = "dark" }) {
  const router = useRouter();
  const themePreference = useSelector(selectTheme);
  const userInDB = useSelector(selectUserFromDB);
  const [user, loading, error] = useAuthState(auth);
  const { theme, setTheme } = useTheme();

  const darkHeader = variant === "dark";

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
    setTheme(theme === "light" || theme === "system" ? "dark" : "light");
  };

  return (
    <Popover className={`relative bg-white dark:bg-transparent`}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2.5 md:justify-start md:space-x-10 shadow-md z-50">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <>
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <MenuDropdown
                  label="Features"
                  links={solutions}
                  footerActions={callsToAction}
                  open={open}
                />
              )}
            </Popover>

            <a
              href="#"
              className="text-sm md:text-base font-medium text-gray-900 dark:text-secondaryText hover:text-gray-900 hover:dark:text-primaryText transition duration-150"
            >
              Docs
            </a>

            <Popover className="relative">
              {({ open }) => (
                <MenuDropdown
                  label="More from me"
                  links={resources}
                  open={open}
                />
              )}
            </Popover>
          </Popover.Group>

          <div className="flex md:flex-1 lg:w-0 justify-end space-x-4">
            {themeSwitch && (
              <div className="cursor-pointer">
                <IconButton
                  onClick={switchTheme}
                  aria-label="fingerprint"
                  color="secondary"
                >
                  {themePreference === "dark" ? (
                    <SunIcon className={`h-8 p-1`} />
                  ) : (
                    <MoonIcon className="h-8 p-1" />
                  )}
                </IconButton>
              </div>
            )}

            <div className="hidden md:flex items-center justify-end space-x-3">
              <ThemeButton
                type="text"
                size="small"
                // className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                onClick={handleLoginRedirect}
              >
                Sign in
              </ThemeButton>
              <ThemeButton
                type="primary"
                size="small"
                // className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={handleRegisterRedirect}
              >
                Sign up
              </ThemeButton>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu />
    </Popover>
  );
}

const MobileMenu = () => {
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
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {solutions.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-gray-900">
                      {item.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <a
                href="#"
                className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Pricing
              </a>

              <a
                href="#"
                className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Docs
              </a>
              {resources.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
