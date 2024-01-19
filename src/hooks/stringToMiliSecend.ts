export default function timeDurationToMilliseconds(timeDuration: string) {
  // Parse hours, minutes, and seconds from the time duration
  const [hours, minutes, seconds] = timeDuration.split(":").map(Number);

  // Convert hours, minutes, and seconds to milliseconds
  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  const minutesInMilliseconds = minutes * 60 * 1000;
  const secondsInMilliseconds = seconds * 1000;

  // Calculate total milliseconds
  const totalMilliseconds =
    hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;

  return totalMilliseconds;
}

export const convertTimeDurationMillisecondsToTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedTime;
};
