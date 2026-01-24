export function parseLocalDateTime(value: string) {
  const [date, time] = value.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi, s] = time.split(":").map(Number);

  return new Date(y, m - 1, d, h, mi, s);
}