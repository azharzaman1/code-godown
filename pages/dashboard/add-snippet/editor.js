import { Paper } from "@mui/material";
import Editor from "../../../components/Dahsboard/Editor";
import Layout from "../../../components/Dahsboard/Layout";

const AddCodePanel = () => {
  return (
    <Paper>
      <Editor />
    </Paper>
  );
};

AddCodePanel.getLayout = (page) => (
  <Layout title="Add Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default AddCodePanel;
