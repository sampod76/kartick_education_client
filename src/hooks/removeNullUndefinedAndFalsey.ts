export function removeNullUndefinedAndFalsey(obj: { [x: string]: any }) {
    for (let key in obj) {
      if (!Boolean(obj[key])) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          // Recursively remove null, undefined, and falsey values from nested objects
          removeNullUndefinedAndFalsey(obj[key]);
          // After recursion, check if the current object is empty
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        } else if (Array.isArray(obj[key])) {
          // Remove null, undefined, and falsey values from arrays
          obj[key] = obj[key].filter(
            (item:  null | undefined) =>
              item !== null && item !== undefined 
          );

          // After filtering, check if the array is empty
          if (obj[key].length === 0) {
            delete obj[key];
          }
        }
      }
    }
  }

  