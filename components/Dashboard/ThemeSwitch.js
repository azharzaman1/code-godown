import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  selectSyntaxTheme,
  SET_SYNTAX_THEME,
} from "../../redux/slices/appSlice";

const ThemeSwitch = ({ themes }) => {
  const dispatch = useDispatch();
  const syntaxTheme = useSelector(selectSyntaxTheme);
  const onThemeChange = (item) => {
    dispatch(SET_SYNTAX_THEME(item));
  };

  return (
    <div className="z-[250]">
      <Listbox value={syntaxTheme} onChange={onThemeChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full min-w-[200px] sm:text-sm py-2 pl-3 pr-10 text-left bg-backgroundV1 dark:bg-backgroundV1Dark rounded-lg shadow cursor-default ">
            <span className="block truncate text-primaryText dark:text-primaryTextDark">
              {syntaxTheme}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-backgroundContrast dark:bg-backgroundContrastDark rounded-md shadow-lg max-h-60 sm:text-sm">
              {themes.map((theme) => (
                <Listbox.Option
                  key={theme.value}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-backgroundV1 dark:hover:bg-backgroundV1Dark ${
                      active
                        ? "text-primary dark:text-primary"
                        : "text-primaryText dark:text-primaryTextDark"
                    }`
                  }
                  value={theme.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-medium text-primary dark:text-primary"
                            : "font-normal"
                        }`}
                      >
                        {theme.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-primary">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ThemeSwitch;
