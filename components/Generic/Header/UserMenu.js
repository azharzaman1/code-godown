import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Logout, Settings } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { selectUserInDB } from "../../../redux/slices/userSlice";
import Transition from "../../utils/Transition";
import { menu } from "./data";

function UserMenu() {
  const userDetails = useSelector(selectUserInDB) || {};
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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
        <img
          className="w-6 h-6 rounded-full"
          src="https://i.ibb.co/7p7fG1y/avatar-placeholder.png"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="hidden md:block truncate ml-2 text-sm font-medium group-hover:text-slate-800">
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
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
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
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">
              {userDetails?.fullName || "Azhar Zaman"}
            </div>
          </div>
          <div className="main-menu">
            {menu.map((item) => (
              <div key={item.href}>{item.name}</div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
