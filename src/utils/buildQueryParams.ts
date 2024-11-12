/* function buildQueryParams(queryObject: QueryObject) {
  const params = new URLSearchParams(queryObject);
  return params.toString();
} */

export function buildQueryParams(
  queryObject: Record<string, string | number | undefined>,
): string {
  const params = new URLSearchParams();

  // Loop through the queryObject to add each key-value pair to params
  Object.entries(queryObject).forEach(([key, value]) => {
    if (value !== undefined) {
      // Ignore undefined values
      params.append(key, value.toString());
    }
  });

  return params.toString();
}
