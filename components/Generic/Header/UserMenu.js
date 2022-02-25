import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { selectUserInDB } from "../../../redux/slices/userSlice";
import Transition from "../../utils/Transition";
import { menu } from "./data";
import { useRouter } from "next/router";

function UserMenu() {
  const [userMenu, setUserMenu] = useState(menu);
  const userDetails = useSelector(selectUserInDB) || {};
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const logoutItem = userMenu.find((item) => item.name === "Logout");
    logoutItem.onClick = () => {
      console.log("hy");
    };
    const newMenu = userMenu.filter((item) => item.name !== "Logout");
    setUserMenu([...newMenu, logoutItem]);
  }, [menu]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  function handleLogout(e) {
    e.preventDefault();
    console.log("logout");
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
        <div className="flex items-center truncate">
          <AccountCircle />
          <span className="hidden md:block truncate ml-2 text-sm font-medium">
            {userDetails?.fullName || "Azhar Zaman"}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white dark:bg-backgroundContrast border border-slate-200 dark:border-divider py-1.5 rounded shadow-lg overflow-hidden mt-1"
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
          className="w-[250px] max-w-[95vw]"
        >
          <div className="main-menu">
            {userMenu?.map((item) => (
              <MenuItem key={item.key} item={item} />
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
}

const MenuItem = ({ item }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (item.href) {
          router.push(item.href);
        }

        item.onClick && item.onClick();
      }}
      className="px-2 py-3 text-primaryTextLight dark:text-primaryText hover:bg-slate-100 dark:hover:bg-backgroundV1 cursor-pointer"
    >
      {item.name}
    </div>
  );
};

export default UserMenu;
