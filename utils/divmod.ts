export function divmod(dividend: number, divisor: number) {
  return [Math.floor(dividend / divisor), dividend % divisor];
}
