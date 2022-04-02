import Layout from "../../components/Dashboard/Layout";
import SnippetsArchivePanel from "../../components/Dashboard/SnippetsArchivePanel";

const Dashboard = () => {
  return <SnippetsArchivePanel />;
};

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
