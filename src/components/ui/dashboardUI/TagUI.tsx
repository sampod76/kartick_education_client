import React, { useState } from "react";
import LabelUi from "./LabelUi";
import { Select } from "antd";
const TagUI = ({
  tagOptions,
  selectedTags,
  setSelectedTags,
}: {
  tagOptions: string[];
  selectedTags: string[] | any;
  setSelectedTags: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const filteredOptions = tagOptions?.filter(
    (o: any) => !selectedTags?.includes(o)
  );
  return (
    <div>
      <LabelUi>Add Tags</LabelUi>
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedTags}
        onChange={setSelectedTags}
        style={{ width: "100%" }}
        options={filteredOptions?.map((item: any) => ({
          value: item,
          label: item,
        }))}
      />
    </div>
  );
};

export default TagUI;
