import { useSelector } from "react-redux";
import MonacoEditor from "../../components/Dahsboard/Editor";
import Layout from "../../components/Dahsboard/Layout";
import PreEditor from "../../components/Dahsboard/PreEditor";
import SaveSnippet from "../../components/Dahsboard/SaveSnippet";
import { selectDashboardCurrentState } from "../../redux/slices/appSlice";

const AddNewSnippetPanel = () => {
  const dashboardCurrentState = useSelector(selectDashboardCurrentState);

  const addingSnippetInfo =
    dashboardCurrentState === "addNewSnippet_addingInfo";
  const addingCodeToSnippet =
    dashboardCurrentState === "addNewSnippet_addingCode";
  const savingSnippet = dashboardCurrentState === "savingSnippet";
  const editingSnippet = dashboardCurrentState === "editSnippet";

  return (
    <>
      {addingSnippetInfo && <PreEditor />}
      {addingCodeToSnippet || editingSnippet ? <MonacoEditor /> : null}
      {savingSnippet && <SaveSnippet />}
    </>
  );
};

AddNewSnippetPanel.getLayout = (page) => (
  <Layout title="Add Snippet | Dashboard" className={`min-w-full`}>
    {page}
  </Layout>
);

export default AddNewSnippetPanel;
