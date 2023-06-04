export const parseTime = (time: string) => {
  return time.split('T')[1].slice(0, 5);
};
