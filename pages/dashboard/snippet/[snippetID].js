import DashboardLayout from "../../../components/Dashboard/Layout";
import SnippetDisplay from "../../../components/Dashboard/SnippetDisplay/SnippetDisplay";

const Snippet = () => {
  return <SnippetDisplay />;
};

Snippet.getLayout = (page) => (
  <DashboardLayout
    title="Add Snippet | Dashboard"
    className={`min-w-full bg-slate-900`}
  >
    {page}
  </DashboardLayout>
);

export default Snippet;
