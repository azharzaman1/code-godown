import { Paper } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Editor from "../../components/Dashboard/Editor";
import DashboardLayout from "../../components/Dashboard/Layout";
import { selectSnippet } from "../../redux/slices/appSlice";

const AddCodePanel = () => {
  const snippet = useSelector(selectSnippet);
  const router = useRouter();
  useEffect(() => {
    if (router.query.mode === "edit-snippet" && !snippet.files) {
      router.replace("/dashboard");
    }
  }, [router, snippet.files]);
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
