export const DATE_LENGTH_FOR_CHART = 10;

export const formatDate = (date: Date, digits = DATE_LENGTH_FOR_CHART) => {
  return date.toISOString().slice(0, digits);
};

export const getHours = (date: Date) => {
  const hour = date.getUTCHours().toString();
  return hour;
};

export const getMinutes = (date: Date) => {
  const minutes = date.getUTCMinutes().toString();
  return minutes.length === 1 ? `0${minutes}` : minutes;
};
