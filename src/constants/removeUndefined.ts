export const removeUndefinedValues = (yourData: any) => {

  const filteredData = Object.fromEntries(
    Object.entries(yourData).filter(([key, value]) => value !== undefined)
  );
  return filteredData;
};
