export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  if (minutes <= 0) return `${seconds} sec`;
  return `${minutes} min ${seconds} sec`;
};
