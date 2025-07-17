/**
 * Returns `arg` if it is already an array.
 * If not, check if `arg` is undefined or null, and if so, return an empty list.
 */
export function formatToArray(arg: any): any[] {
  return Array.isArray(arg) ? arg : arg == null ? [] : [arg];
}
