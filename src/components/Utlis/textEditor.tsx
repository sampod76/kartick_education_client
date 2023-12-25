"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import parse from "html-react-parser";
const TextEditor = (/* {setValue} */) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [vlaue, setValue] = useState("");
  console.log(vlaue);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      defaultTextAlignment: 'left'
    }),
    []
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        config={editorConfig}
        value={content}
        // tabIndex={10} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setValue(newContent)}
      />
      <div className="jodit-container px-6">{parse(vlaue)}</div>
    </div>
  );
};

export default TextEditor;
