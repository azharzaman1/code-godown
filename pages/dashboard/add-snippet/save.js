import Layout from "../../../components/Dahsboard/Layout";
import SaveSnippet from "../../../components/Dahsboard/SaveSnippet";

const SaveSnippetPanel = () => {
  return <SaveSnippet />;
};

SaveSnippetPanel.getLayout = (page) => (
  <Layout title="Saving Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default SaveSnippetPanel;
