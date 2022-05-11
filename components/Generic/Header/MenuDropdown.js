import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Text from "../Text";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuDropdown = ({
  label = "Link",
  links = [],
  footerActions = [],
  open,
}) => {
  return (
    <>
      <Popover.Button
        className={classNames(
          open
            ? "text-primaryText dark:text-primaryTextDark"
            : "text-secondaryText dark:text-secondaryTextDark",
          "group rounded-md inline-flex items-center text-sm md:text-base font-medium marker:hover:text-gray-900 dark:hover:text-primaryTextDark transition duration-150"
        )}
      >
        <span>{label}</span>
        <ChevronDownIcon
          className={classNames(
            open
              ? "text-primaryText dark:text-primaryTextDark"
              : "text-secondaryText dark:text-secondaryTextDark",
            "ml-2 h-5 w-5 marker:hover:text-gray-900 dark:hover:text-primaryTextDark"
          )}
          aria-hidden="true"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-50 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white dark:bg-backgroundContrastDark py-6 sm:gap-8 sm:py-8 sm:px-8">
              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href !== "#" && "_blank"}
                  rel="noopener noreferer"
                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100 dark:hover:bg-backgroundV1Dark transition duration-150"
                >
                  <item.icon
                    className="flex-shrink-0 h-6 w-6 text-secondary"
                    aria-hidden="true"
                  />
                  <div className="ml-4">
                    <Text>{item.name}</Text>
                    <Text type="info" className="mt-1">
                      {item.description}
                    </Text>
                  </div>
                </a>
              ))}
            </div>
            {footerActions && (
              <div
                className={`px-5 py-5 border-t ${
                  footerActions && "dark:border-t-slate-600"
                } bg-backgroundV1 dark:bg-backgroundContrastDark space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8`}
              >
                {footerActions.map((item) => (
                  <div key={item.name} className="flow-root">
                    <a
                      href={item.href}
                      target={item.href !== "#" && "_blank"}
                      rel="noopener noreferer"
                      className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 dark:text-primaryText hover:bg-backgroundContrast dark:hover:bg-backgroundV1Dark transition duration-150"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <Text className="ml-3">{item.name}</Text>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

export default MenuDropdown;
