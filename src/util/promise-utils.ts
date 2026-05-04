/**
 * Check if the passed object is a promise
 * @param value the object to check
 */
export const isPromise = (value: unknown): boolean => {
  if (value !== null && typeof value === 'object') {
    return 'then' in value && typeof value.then === 'function';
  }
  return false;
};
