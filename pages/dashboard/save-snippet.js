import Layout from "../../components/Dashboard/Layout";
import SaveSnippet from "../../components/Dashboard/SaveSnippet";

const SaveSnippetPanel = () => {
  return <SaveSnippet />;
};

SaveSnippetPanel.getLayout = (page) => (
  <Layout title="Saving Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default SaveSnippetPanel;
