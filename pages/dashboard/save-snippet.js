import DashboardLayout from "../../components/Dashboard/Layout";
import SaveSnippet from "../../components/Dashboard/SaveSnippet";

const SaveSnippetPanel = () => {
  return <SaveSnippet />;
};

SaveSnippetPanel.getLayout = (page) => (
  <DashboardLayout title="Saving Snippet | Dashboard">{page}</DashboardLayout>
);

export default SaveSnippetPanel;
