function snakeCaseToTitle(rawString: string): string {
  const formatted = rawString.replaceAll("_", " ");
  return formatted.replace(
    /\b\w+/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

function titleToSnakeCase(rawString: string): string {
  const formatted = rawString.replaceAll(" ", "_");
  return formatted.toLowerCase();
}

function lowerCaseToSentence(rawString: string): string {
  return rawString.charAt(0).toUpperCase() + rawString.slice(1) + ".";
}

export { snakeCaseToTitle, titleToSnakeCase, lowerCaseToSentence };
