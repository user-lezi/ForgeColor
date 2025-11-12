import { ForgeColor } from "..";

export function isNamedColor(name: string): boolean {
  return ForgeColor.Colors.some(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );
}

export function searchColorName(
  query: string,
  limit = 5,
): { name: string; value: number }[] {
  const lowerQuery = query.toLowerCase();
  return ForgeColor.Colors.filter((c: { name: string }) =>
    c.name.toLowerCase().includes(lowerQuery),
  ).slice(0, limit);
}
