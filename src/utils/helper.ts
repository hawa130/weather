export function cls(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ');
}