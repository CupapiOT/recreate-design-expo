function snakeCaseToTitle(rawString: string): string {
  const formatted = rawString.replaceAll("_", " ");
  return formatted.replace(
    /\b\w+/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export { snakeCaseToTitle };
