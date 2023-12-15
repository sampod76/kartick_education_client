import React from "react";

const ModuleName = ({
  params: { moduleName },
}: {
  params: { moduleName: string };
}) => {
  return <div>
    <h2>This is Module {moduleName} Page </h2>
  </div>;
};

export default ModuleName;
