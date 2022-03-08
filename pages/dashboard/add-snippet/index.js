import Layout from "../../../components/Dahsboard/Layout";
import PreEditor from "../../../components/Dahsboard/PreEditor";

const AddNewSnippetPanel = () => {
  return <PreEditor />;
};

AddNewSnippetPanel.getLayout = (page) => (
  <Layout title="Add Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default AddNewSnippetPanel;
