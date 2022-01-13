import { useRouter } from "next/dist/client/router";
import Editor from "./Editor";
import PreEditor from "./PreEditor";
import SaveSnippet from "./SaveSnippet";

const AddNewSnippetPanel = () => {
  const router = useRouter();
  const { display } = router.query;

  const addingSnippetInfo = display === "add-new-snippet-info";
  const addingCodeToSnippet = display === "adding-code-to-snippet";
  const savingSnippet = display === "saving-snippet";
  const editingSnippet = display === "edit-snippet";

  return (
    <>
      {addingSnippetInfo && <PreEditor />}
      {addingCodeToSnippet || editingSnippet ? <Editor /> : null}
      {savingSnippet && <SaveSnippet />}
    </>
  );
};

export default AddNewSnippetPanel;
