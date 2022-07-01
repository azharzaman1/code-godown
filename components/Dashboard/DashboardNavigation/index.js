import Text from "../../Generic/Text";
import { Tab } from "@headlessui/react";
import { classNames } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDashboardNavigationMode,
  SET_DASHBOARD_NAVIGATION_MODE,
} from "../../../redux/slices/appSlice";
import SnippetsNavigation from "./SnippetsNavigation";

const Tabs = ["Snippets", "Posts"];

const DashboardNavigation = () => {
  const dispatch = useDispatch();
  const navigationMode = useSelector(selectDashboardNavigationMode);

  const handleActiveTabChange = (activeIndex) => {
    dispatch(SET_DASHBOARD_NAVIGATION_MODE(Tabs[activeIndex]));
  };

  return (
    <div className="w-full">
      <div className="w-full px-2 mt-2">
        <Tab.Group
          onChange={handleActiveTabChange}
          selectedIndex={Tabs.findIndex((tab) => tab === navigationMode)}
        >
          <Tab.List className="flex space-x-1 rounded-xl bg-primary/[0.05] dark:bg-primary/[0.05] p-1 border border-primary border-opacity-20">
            {Tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary",
                    "focus:outline-none transition-all duration-100",
                    selected
                      ? "bg-backgroundV1 dark:bg-backgroundV1Dark shadow"
                      : "text-primaryTextDark hover:bg-white/[0.12]"
                  )
                }
              >
                <Text>{tab}</Text>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 pb-2">
            <Tab.Panel
              key="snippets-tab-content"
              className={classNames(
                "rounded-xl bg-transparent dark:bg-backgroundContrastDark p-3",
                "focus:outline-none"
              )}
            >
              <SnippetsNavigation />
            </Tab.Panel>
            <Tab.Panel
              key="posts-tab-content"
              className={classNames(
                "text-primaryText dark:text-primaryTextDark rounded-xl bg-transparent dark:bg-backgroundContrastDark p-3",
                "focus:outline-none"
              )}
            >
              Coming Soon
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default DashboardNavigation;
