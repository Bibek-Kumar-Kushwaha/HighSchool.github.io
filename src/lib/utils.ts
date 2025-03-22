import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const getLatestSunday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
  const daysSinceSunday = dayOfWeek; // Sunday is 0, so no change needed

  const latestSunday = new Date(today);
  latestSunday.setDate(today.getDate() - daysSinceSunday);
  return latestSunday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestSunday = getLatestSunday();

  return lessons
    .filter((lesson) => lesson.start.getDay() !== 6) // Exclude Saturday (6)
    .map((lesson) => {
      const lessonDayOfWeek = lesson.start.getDay(); // 0 (Sunday) - 6 (Saturday)

      // Adjust the offset based on Sunday as the first day
      const daysFromSunday = lessonDayOfWeek;

      const adjustedStartDate = new Date(latestSunday);
      adjustedStartDate.setDate(latestSunday.getDate() + daysFromSunday);
      adjustedStartDate.setHours(
        lesson.start.getHours(),
        lesson.start.getMinutes(),
        lesson.start.getSeconds()
      );

      const adjustedEndDate = new Date(adjustedStartDate);
      adjustedEndDate.setHours(
        lesson.end.getHours(),
        lesson.end.getMinutes(),
        lesson.end.getSeconds()
      );

      return {
        title: lesson.title,
        start: adjustedStartDate,
        end: adjustedEndDate,
      };
    });
};
