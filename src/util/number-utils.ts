export const nanToZero = (input: number) => (isNaN(input) ? 0 : input);

export function isEmpty(value: unknown) {
  return (
    typeof value === 'undefined' ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    value === false ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function isNumber(value: unknown) {
  if (isEmpty(value)) return true;

  if ((typeof value === 'boolean' && value === true) || (Array.isArray(value) && value.length !== 0)) {
    return false;
  }

  value = Number(value);

  return typeof value === 'number' && !isNaN(value);
}
