import Layout from "../../../components/Dahsboard/Layout";

const SaveSnippetPanel = () => {
  return <div>Save</div>;
};

SaveSnippetPanel.getLayout = (page) => (
  <Layout title="Saving Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default SaveSnippetPanel;
