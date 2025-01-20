export const normalizeAndEncode = (input: string): string =>
  encodeURIComponent(
    input
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .trim()
  );
