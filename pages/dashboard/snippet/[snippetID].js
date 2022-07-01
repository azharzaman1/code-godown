import DashboardLayout from "../../../components/Dashboard/Layout";
import SnippetDisplay from "../../../components/Dashboard/SnippetDisplay/SnippetDisplay";

const Snippet = () => {
  return <SnippetDisplay />;
};

Snippet.getLayout = (page) => (
  <DashboardLayout title="Add Snippet | Dashboard">{page}</DashboardLayout>
);

export default Snippet;
