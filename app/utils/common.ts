export const getNextId = (array: { id: number }[]) =>
  Math.max(...array.map((o) => o.id)) + 1;
