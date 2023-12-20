export const removeUndefinedValues = (yourData: any) => {
  console.log(yourData);
  const filteredData = Object.fromEntries(
    Object.entries(yourData).filter(([key, value]) => value !== undefined)
  );
  return filteredData;
};
