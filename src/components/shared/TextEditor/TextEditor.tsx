"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({
  textEditorValue,
  setTextEditorValue,
  defultTextEditorValue = "",
}: {
  textEditorValue: string;
  defultTextEditorValue?: string;
  setTextEditorValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defultTextEditorValue);
  // const [vlaue, setTextEditorValue] = useState("");
  // useEffect(() => {
  //   // Load MathJax
  //   const script = document.createElement("script");
  //   script.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";
  //   script.async = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     const mathJaxScript = document.createElement("script");
  //     mathJaxScript.src =
  //       "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML";
  //     mathJaxScript.async = true;
  //     document.head.appendChild(mathJaxScript);
  //   };
  // }, []);
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      // allowFileUpload: true,
      // sanitize: false,
      defaultMode: 1, // Set default alignment to left
      toolbarAdaptive: false,
    }),
    []
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        config={editorConfig}
        value={content}
        // tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setTextEditorValue(newContent)}
      />
    </div>
  );
};

export default TextEditor;
