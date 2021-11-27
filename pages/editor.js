import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../files/editorOptions";
import { selectActiveTabIndex, selectSnippet } from "../redux/slices/appSlice";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const editor = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(selectSnippet);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  return (
    <Editor
      height="100vh"
      defaultLanguage={snippet[activeTabIndex]?.language?.name.toLowerCase()}
      defaultValue={snippet[activeTabIndex]?.code}
      theme="vs-dark"
      options={options}
    />
  );
};

export default editor;
