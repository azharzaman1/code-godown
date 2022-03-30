import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import DashboardLayout from "../../components/Dashboard/Layout";
import SaveSnippet from "../../components/Dashboard/SaveSnippet";
import { selectSnippet } from "../../redux/slices/appSlice";

const SaveSnippetPanel = () => {
  const snippet = useSelector(selectSnippet);
  const router = useRouter();
  useEffect(() => {
    if (router.query.mode === "edit-snippet" && !snippet.files) {
      router.replace("/dashboard");
    }
  }, [router, snippet.files]);
  return <SaveSnippet />;
};

SaveSnippetPanel.getLayout = (page) => (
  <DashboardLayout title="Saving Snippet | Dashboard">{page}</DashboardLayout>
);

export default SaveSnippetPanel;
