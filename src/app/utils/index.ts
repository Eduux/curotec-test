export function formatDate(date: string) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}
