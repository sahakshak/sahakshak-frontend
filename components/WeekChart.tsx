import React from "react";
import { Card, LineChart } from "@tremor/react";
import { Case } from "@/lib/types/case";

const WeekChart = ({ cases }: { cases: Case[] }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - index);
    return day;
  }).reverse();

  const crimeData: Record<string, number> = last7Days.reduce(
    (acc, currentDate) => {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      const crimesForDay = cases.filter(
        (crime) =>
          new Date(crime.timeOfCrime) >= startOfDay &&
          new Date(crime.timeOfCrime) <= endOfDay
      );

      acc[currentDate.toISOString().split("T")[0]] = crimesForDay.length;
      return acc;
    },
    {} as Record<string, number> // Initialize acc with an empty object
  );

  const formattedCrimeData = last7Days.map((date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return {
      date: date.getDate(), // Use a more descriptive label
      "Number of Crimes": crimeData[formattedDate] || 0,
    };
  });

  return (
    <Card className="bg-primary_light">
      <h2>Crime Data for the Last 7 Days</h2>{" "}
      {/* Use appropriate heading level */}
      <LineChart
        className="mt-6"
        data={formattedCrimeData}
        index="date" // Use the updated label
        categories={["Number of Crimes"]}
        colors={["red"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default WeekChart;
