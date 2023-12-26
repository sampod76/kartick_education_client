"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
const TextEditor = (/* {setValue} */) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [vlaue, setValue] = useState("");
  console.log("🚀 ~ file: textEditor.js:8 ~ TextEditor ~ vlaue:", vlaue);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
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
        onChange={(newContent) => setValue(newContent)}
      />
      <div className="my-5 jodit-wysiwyg">{parse(vlaue)}</div>
    </div>
  );
};

export default TextEditor;
