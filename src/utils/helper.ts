export function cls(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ');
}

export function extractArrayOrString(arrOrStr: string | string[]) {
  if (Array.isArray(arrOrStr)) {
    return undefined;
  }
  return arrOrStr;
}