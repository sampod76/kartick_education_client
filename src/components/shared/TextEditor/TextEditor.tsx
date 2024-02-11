"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useFormContext } from "react-hook-form";
import { Switch } from 'antd';
const TextEditor = ({
  textEditorValue,
  setTextEditorValue,
  defaultTextEditorValue = "",
  name = "details",
  isReset = false,
}: {
  textEditorValue?: string;
  defaultTextEditorValue?: string;
  name?: string;
  isReset?: boolean;
  setTextEditorValue?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultTextEditorValue);
  const [openTextEditor, setopenTextEditor] = useState<boolean>(false);
  const { setValue } = useFormContext();

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

  useEffect(() => {
    if (isReset) {
      setContent("");
    }
  }, [isReset]);

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    setopenTextEditor((v) => !v)
  };

  return (
    <div>
      {/* <h2></h2> */}
      <Switch checkedChildren="Open" unCheckedChildren='Close'  onChange={onChange} style={{
        background: openTextEditor ? "blue" : "#4D545A",
        marginBlock: "10px"
      }} />
      {openTextEditor &&
        <JoditEditor
          ref={editor}
          config={editorConfig}
          value={content}
          // tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setValue(name, newContent);
            setContent(newContent);
          }} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => {

        //   setValue(name, newContent);
        // }}
        />

      }

    </div>
  );
};

export default TextEditor;
