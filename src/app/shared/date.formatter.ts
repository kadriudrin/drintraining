export function dateFormatter(dt: string) {
  const d: Date = new Date(dt);
  return d.toLocaleString().split(',')[0].replace(/\//g, '-');
}
