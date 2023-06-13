import { DateTime } from 'luxon';

const getCorrectTimeStartOfDay = (date: Date) =>
  DateTime.fromJSDate(date).setZone('Europe/Kyiv').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate();

export default getCorrectTimeStartOfDay;
