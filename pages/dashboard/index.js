import Layout from "../../components/Dashboard/Layout";
import SnippetsArchivePanel from "../../components/Dashboard/SnippetsArchivePanel";
import { useSelector } from "react-redux";
import { selectDashboardNavigationMode } from "../../redux/slices/appSlice";
import PostsArchivePanel from "../../components/Blog/PostsArchivePanel";

const dashboardViews = {
  Snippets: <SnippetsArchivePanel />,
  Posts: <PostsArchivePanel />,
};

const Dashboard = () => {
  const dashboardNavigationMode = useSelector(selectDashboardNavigationMode);

  return dashboardViews[dashboardNavigationMode];
};

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
