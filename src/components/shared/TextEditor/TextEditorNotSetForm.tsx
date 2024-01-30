"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
// import parse from "html-react-parser";
import parse from "html-react-parser";
import { useFormContext } from "react-hook-form";
import { Switch } from 'antd';
const TextEditorNotSetValue = ({
  textEditorValue,
  setTextEditorValue,
  defaultTextEditorValue = "",
  name = "details",
}: {
  textEditorValue?: string;
  defaultTextEditorValue?: string;
  name?: string;
  setTextEditorValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultTextEditorValue);
  const [openTextEditor, setopenTextEditor] = useState<boolean>(false);
  // console.log("🚀 ~ content:", content);

  // const [vlaue, setTextEditorValue] = useState("");
  // const { setValue } = useFormContext();

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

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setopenTextEditor(checked)
  };

  return (
    <>
      <Switch checkedChildren="Open" unCheckedChildren='Close' defaultChecked onChange={onChange} style={{
        background: openTextEditor ? "blue" : "#4D545A"
      }} />

      {openTextEditor &&
        <JoditEditor
          ref={editor}
          config={editorConfig}
          value={content}
          // tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setTextEditorValue(newContent);
            setContent(newContent);
          }} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) =>  setTextEditorValue(newContent)}
        />
      }
      {/* <div>
        <div>{content && parse(content)}</div>
      </div> */}
    </>
  );
};

export default TextEditorNotSetValue;
