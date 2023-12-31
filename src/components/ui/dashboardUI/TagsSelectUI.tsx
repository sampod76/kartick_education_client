import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagsSelectUI = ({
  selected,
  setSelected,
}: {
  selected: any;
  setSelected: any;
}) => {
  //   const [selected, setSelected] = useState(["papaya"]);

  return (
    <div>
      <h1>Select Tags</h1>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter fruits"
      />
      <em>press enter or comma to add new tag</em>
    </div>
  );
};

export default TagsSelectUI;
