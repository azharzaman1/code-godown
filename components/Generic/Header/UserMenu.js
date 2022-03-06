import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AccountCircle, Logout } from "@mui/icons-material";
import { selectUserInDB } from "../../../redux/slices/userSlice";
import Transition from "../../utils/Transition";
import { menu } from "./data";
import { auth } from "../../../client/firebase";
import { useRouter } from "next/router";
import Text from "../Text";
import { Avatar } from "@mui/material";

function UserMenu() {
  const [userMenu, setUserMenu] = useState(menu);
  const userDetails = useSelector(selectUserInDB) || {};
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  function handleLogout() {
    auth.signOut();
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="flex items-center space-x-2 truncate">
          <Avatar
            sx={{
              width: 30,
              height: 30,
            }}
          />
          <Text className="hidden md:block">
            {userDetails?.fullName || "Azhar Zaman"}
          </Text>
          <svg
            className="hidden md:block w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-backgroundContrast dark:bg-backgroundContrastDark border border-slate-200 dark:border-slate-600 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="flex flex-col w-[250px] max-w-[95vw]"
        >
          <div className="flex flex-col p-3">
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
              <div className="flex flex-col justify-start">
                <Text>{userDetails?.fullName || "Azhar Zaman"}</Text>
                <Text type="info">@{userDetails?.username || "idrazhar"}</Text>
              </div>
            </div>
          </div>
          <div className="main-menu">
            {userMenu?.map((item) => (
              <MenuItem key={item.key} item={item} id={item.key} />
            ))}
            <MenuItem
              item={{
                name: "Logout",
                href: null,
                icon: Logout,
              }}
              onClick={handleLogout}
            />
          </div>
        </div>
      </Transition>
    </div>
  );
}

const MenuItem = ({ item, id, onClick }) => {
  const router = useRouter();

  const isFirstItem = id == 0;
  const isLastItem = item.name === "Logout";

  return (
    <div
      onClick={() => {
        if (item.href) {
          router.push(item.href);
        }

        onClick && onClick();
      }}
      className={`flex items-center p-3 space-x-2 text-primaryText dark:text-primaryTextDark hover:bg-slate-100 dark:hover:bg-backgroundV1Dark cursor-pointer ${
        isFirstItem &&
        "border-t border-borderColorDark dark:border-dividerColor"
      } ${
        isLastItem && "border-t border-borderColorDark dark:border-dividerColor"
      }`}
    >
      <item.icon
        fontSize="small"
        className="text-gray-500 dark:text-secondaryDark"
      />
      <Text>{item.name}</Text>
    </div>
  );
};

export default UserMenu;
