import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Layout from "../../components/Dahsboard/Layout";
import SnippetsArchivePanel from "../../components/Dahsboard/SnippetsArchivePanel";
import { selectSnippet, selectTheme } from "../../redux/slices/appSlice";

const Dashboard = () => {
  const themePreference = useSelector(selectTheme);

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <Layout
      className={`min-w-full ${themePreference === "dark" && "dark-bg"}`}
      headerVariant={themePreference === "dark" ? "dark" : "light"}
    >
      <div className="p-1 sm:p-2 md:p-3">
        <SnippetsArchivePanel />
      </div>
    </Layout>
  );
};

export default Dashboard;
