import { useEffect } from "react";
import { useTheme } from "next-themes";
import Layout from "../../components/Dahsboard/Layout";
import SnippetsArchivePanel from "../../components/Dahsboard/SnippetsArchivePanel";

const Dashboard = () => {
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
