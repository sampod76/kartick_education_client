export const EllipsisMiddle: React.FC<{
  suffixCount: number;
  maxLength: number;
  children: string;
}> = ({ suffixCount, children, maxLength }) => {
  const maxLengthString = maxLength;
  let start, suffix;
  if (typeof children !== "string") {
    start = "";
    suffix = "";
  } else if (children.length <= maxLengthString) {
    start = children;
    suffix = "";
  } else {
    const startLength = Math.floor((maxLengthString - suffixCount) / 2);
    start = children.slice(0, startLength).trim();
    suffix = children.slice(-suffixCount).trim();
  }

  return `${start}${suffix ? "..." + suffix : ""}`;
};