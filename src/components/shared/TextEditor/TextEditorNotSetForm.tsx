'use client';
import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const TextEditorNotSetValue = ({
  textEditorValue,
  setTextEditorValue,
  defaultTextEditorValue = '',
  name = 'details',
}: {
  textEditorValue?: string;
  defaultTextEditorValue?: string;
  name?: string;
  setTextEditorValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useRef<any>(null);
  const [content, setContent] = useState(defaultTextEditorValue);
  const [openTextEditor, setOpenTextEditor] = useState<boolean>(true);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...',
      defaultMode: 1, // Set default alignment to left
      toolbarAdaptive: false,
    }),
    [],
  );
  useEffect(() => {
    if (defaultTextEditorValue && !content) {
      setContent(defaultTextEditorValue);
    }
  }, [defaultTextEditorValue]);

  return (
    <>
      {openTextEditor && (
        <JoditEditor
          ref={editor}
          config={editorConfig}
          value={content}
          onBlur={(newContent) => {
            setTextEditorValue(newContent);
            setContent(newContent);
          }}
        />
      )}
    </>
  );
};

export default TextEditorNotSetValue;
