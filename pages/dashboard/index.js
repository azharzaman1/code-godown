import { useEffect } from "react";
import { useTheme } from "next-themes";
import Layout from "../../components/Dashboard/Layout";
import SnippetsArchivePanel from "../../components/Dashboard/SnippetsArchivePanel";

const Dashboard = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return <SnippetsArchivePanel />;
};

Dashboard.getLayout = (page) => (
  <Layout className={`min-w-full`}>{page}</Layout>
);

export default Dashboard;
