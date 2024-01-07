export const CutText = (text: string | undefined, maxLength: number) => {
  if (!text || text.length <= maxLength) {
    return text || "";
  } else {
    return text?.substring(0, maxLength) + "...";
  }
};
