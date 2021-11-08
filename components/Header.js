import { Popover } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownLink from "@material-tailwind/react/DropdownLink";

const Header = ({ navigation = [] }) => {
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
              <>
                {dropdown ? (
                  <Dropdown
                    placement="bottom-start"
                    buttonText={name}
                    buttonType="link"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="dark"
                    className="font-main hover:bg-transparent link text"
                  >
                    {dropdownItems.map(({ label, link }) => (
                      <DropdownLink
                        target="_blank"
                        href={link}
                        ripple="light"
                        color="red"
                      >
                        {label}
                      </DropdownLink>
                    ))}
                  </Dropdown>
                ) : (
                  <a key={name} href={href} className="link">
                    {name}
                  </a>
                )}
              </>
            ))}
          </div>

          <div>
            <a className="primary-button m-7 md:m-0">Login</a>
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
