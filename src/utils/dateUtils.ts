export const DATE_LENGTH_FOR_CHART = 10;

export const formatDate = (date: Date, digits = DATE_LENGTH_FOR_CHART) => {
  return date.toISOString().slice(0, digits);
};
