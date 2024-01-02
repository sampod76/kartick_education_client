export default function timeDurationToMilliseconds(timeDuration:string) {
      // Parse minutes and seconds from the time duration
      const [minutes, seconds] = timeDuration.split(':').map(Number);

      // Convert minutes and seconds to milliseconds
      const minutesInMilliseconds = minutes * 60 * 1000;
      const secondsInMilliseconds = seconds * 1000;
  
      // Calculate total milliseconds
      const totalMilliseconds = minutesInMilliseconds + secondsInMilliseconds;
  
      return totalMilliseconds;
}