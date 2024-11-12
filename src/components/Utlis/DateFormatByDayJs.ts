import dayjs from 'dayjs';
export const DateFormatByDayJs = (date: string | Date, format: string) => {
  return dayjs(date).format(format);
};
