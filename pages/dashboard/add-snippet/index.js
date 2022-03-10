import Layout from "../../../components/Dashboard/Layout";
import PreEditor from "../../../components/Dashboard/PreEditor";

const AddNewSnippetPanel = () => {
  return <PreEditor />;
};

AddNewSnippetPanel.getLayout = (page) => (
  <Layout title="Add Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default AddNewSnippetPanel;
