import { Paper } from "@mui/material";
import Editor from "../../components/Dashboard/Editor";
import DashboardLayout from "../../components/Dashboard/Layout";

const AddCodePanel = () => {
  return (
    <Paper className="w-full">
      <Editor />
    </Paper>
  );
};

AddCodePanel.getLayout = (page) => (
  <DashboardLayout
    title="Add Snippet | Dashboard"
    className={`min-w-full bg-slate-900`}
  >
    {page}
  </DashboardLayout>
);

export default AddCodePanel;
