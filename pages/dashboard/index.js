import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Layout from "../../components/Dahsboard/Layout";
import SnippetsArchivePanel from "../../components/Dahsboard/SnippetsArchivePanel";
import { selectTheme } from "../../redux/slices/appSlice";

const Dashboard = () => {
  const themePreference = useSelector(selectTheme);

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return <SnippetsArchivePanel />;
};

Dashboard.getLayout = (page) => (
  <Layout className={`min-w-full`}>{page}</Layout>
);

export default Dashboard;
