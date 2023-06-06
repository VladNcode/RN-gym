import { DateTime } from 'luxon';

const findClosestAvailableClassDate = (daysToFind: number[]) => {
  const nowLuxon = DateTime.local();

  let closestDay = null;

  // Look for the closest day(s) of the week on the same week
  for (let i = 0; i < daysToFind.length; i++) {
    const day = nowLuxon.set({ weekday: daysToFind[i] });
    if ((!closestDay || closestDay > day) && day > nowLuxon) {
      closestDay = day;
    }
  }

  // If there are no matches this week, find the closest day(s) next week
  if (!closestDay) {
    closestDay = nowLuxon.set({ weekday: daysToFind[0] }).plus({ week: 1 });
    for (let i = 1; i < daysToFind.length; i++) {
      const day = nowLuxon.set({ weekday: daysToFind[i] }).plus({ week: 1 });
      if ((!closestDay || closestDay > day) && day > nowLuxon) {
        closestDay = day;
      }
    }
  }

  return closestDay.toJSDate();
};

export default findClosestAvailableClassDate;
