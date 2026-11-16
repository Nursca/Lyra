export function serviceOrigin(configured?: unknown): string {
  if (typeof configured === "string" && configured.length > 0) return configured;
  const bound = process.env.LYRA_ORIGIN?.replace(/\/$/, "");
  if (bound) return bound;
  return `http://127.0.0.1:${process.env.PORT ?? 4020}`;
}
