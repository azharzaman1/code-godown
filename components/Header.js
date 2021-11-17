import Dropdown from "@material-tailwind/react/Dropdown";
import { useRouter } from "next/dist/client/router";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import DropdownLink from "./_Header_DropdownLink";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { auth } from "../client/firebase";
import { signOut } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSnackbar } from "notistack";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: RefreshIcon,
  },
];

const Header = ({ navigation = [] }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  console.log("Loading:", loading, "|", "Current user:", user);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Popover>
      <nav
        className="absolute top-0 w-full border-b border-[#eeeeee41] bg-[#ffffffb4] z-20 px-3 lg:px-16 flex shadow items-center justify-between"
        aria-label="Global"
      >
        <div className="flex items-center py-3 px-3">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              />
            </a>
          </div>
        </div>
        <div className="flex md:flex-1 md:pl-5 items-center md:justify-between">
          <div className="hidden md:flex md:space-x-6">
            {navigation.map(({ name, href, dropdown, dropdownItems }) => (
              <Fragment key={name}>
                {dropdown ? (
                  <DropdownLink dropdownData={dropdownItems} label={name} />
                ) : (
                  <a href={href} className="link">
                    {name}
                  </a>
                )}
              </Fragment>
            ))}
          </div>

          <div className="flex space-x-2">
            <a
              className="text-button"
              onClick={() => {
                if (user) {
                  signOut(auth)
                    .then(() => {
                      router.push({
                        pathname: "/authentication",
                        query: {
                          mode: "login",
                        },
                      });
                      enqueueSnackbar(`Successfully signed out`, {
                        variant: "success",
                      });
                    })
                    .catch((error) => {
                      alert(error);
                    });
                } else {
                  router.push({
                    pathname: "/authentication",
                    query: {
                      mode: "login",
                    },
                  });
                }
              }}
            >
              {user ? "Logout" : "Login"}
            </a>
            {!user && (
              <a
                className="primary-button-small m-7 md:m-0"
                onClick={() => {
                  router.push({
                    pathname: "/authentication",
                    query: {
                      mode: "register",
                    },
                  });
                }}
              >
                Signup
              </a>
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
