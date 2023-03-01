import { getHours, getMinutes } from '../../utils/dateUtils';

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const formatTimeToHHMM = (date: Date) => {
  const koreanTime = new Date(date.getTime() + KR_TIME_DIFF);
  const hour = getHours(koreanTime);
  const minutes = getMinutes(koreanTime);

  return `${hour}:${minutes}`;
};
