import MonacoEditor from "../../components/Dahsboard/Editor";
import Layout from "../../components/Dahsboard/Layout";
import PreEditor from "../../components/Dahsboard/PreEditor";
import SaveSnippet from "../../components/Dahsboard/SaveSnippet";

const AddNewSnippetPanel = ({ addSnippetPhase = "saving-snippet" }) => {
  const addingSnippetInfo = addSnippetPhase === "add-new-snippet-info";
  const addingCodeToSnippet = addSnippetPhase === "adding-code-to-snippet";
  const savingSnippet = addSnippetPhase === "saving-snippet";
  const editingSnippet = addSnippetPhase === "edit-snippet";

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
