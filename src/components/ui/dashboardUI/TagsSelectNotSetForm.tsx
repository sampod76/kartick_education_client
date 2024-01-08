import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import LabelUi from "./LabelUi";
import { useFormContext } from "react-hook-form";

const TagsSelectNotSetFormUI = ({
  defaultTags,
  setSelectedTags,
}: {
  defaultTags?: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [selectedTags, setSelectedTagsall] = useState<string[]>(
    defaultTags || []
  );

  const onchangeTags = (value: string[]) => {
    // setValue("tags", value)
    setSelectedTags(value);
    setSelectedTagsall(value);
  };

  return (
    <div>
      <LabelUi>Select Tags</LabelUi>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <TagsInput
        value={selectedTags}
        onChange={(value) => onchangeTags(value)}
        name="fruits"
        placeHolder="enter fruits"
      />
      <em>press enter or comma to add new tag</em>
    </div>
  );
};

export default TagsSelectNotSetFormUI;
