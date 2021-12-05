import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const MonacoEditor = ({
  value = "// some comment",
  language = "javascript",
}) => {
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco isntance:", monaco);
    }
  }, [monaco]);

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage={language}
      defaultValue={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
    />
  );
};

export default MonacoEditor;
