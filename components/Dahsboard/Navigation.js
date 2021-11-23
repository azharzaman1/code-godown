import { Inbox } from "@mui/icons-material";
import { Navigation as MinimalNavigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const Navigation = () => {
  return (
    <>
      <h3>Nav</h3>
      {/* <MinimalNavigation
        activeItemId="/management/members"
        onSelect={({ itemId }) => {}}
        items={[
          {
            title: "Dashboard",
            itemId: "/dashboard",
            elemBefore: () => <Inbox />,
          },
          {
            title: "Management",
            itemId: "/management",
            elemBefore: () => <Inbox />,
            subNav: [
              {
                title: "Projects",
                itemId: "/management/projects",
              },
              {
                title: "Members",
                itemId: "/management/members",
              },
            ],
          },
          {
            title: "Another Item",
            itemId: "/another",
            subNav: [
              {
                title: "Teams",
                itemId: "/management/teams",
              },
            ],
          },
        ]}
      /> */}
    </>
  );
};

export default Navigation;
