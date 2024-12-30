export const dateFormatter = (date: string | Date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
