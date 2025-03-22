import Image from "next/image";
import prisma from "@/lib/prisma";
import AttendanceChart from "./AttendenceChart";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  const daysSinceSunday = dayOfWeek === 0 ? 0 : dayOfWeek; // Adjust to start from Sunday

  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - daysSinceSunday); // Get last Sunday's date

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastSunday, // Fetch attendance from last Sunday to today
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]; // No Saturday

  const attendanceMap: Record<string, { present: number; absent: number }> = {
    Sun: { present: 0, absent: 0 },
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 },
  };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayIndex = itemDate.getDay(); // 0 = Sun, 6 = Sat

    if (dayIndex !== 6) { // Exclude Saturday
      const dayName = daysOfWeek[dayIndex]; // Map index to day name
      attendanceMap[dayName].present += item.present ? 1 : 0;
      attendanceMap[dayName].absent += item.present ? 0 : 1;
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
