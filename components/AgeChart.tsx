"use client";
import React from "react";
import { BarChart, Card, Title, Subtitle } from "@tremor/react";
import { Case } from "@/lib/types/case";

const AgeChart = ({ cases }: { cases: Case[] }) => {
  // Extract ages from cases
  const ageData = cases.map((caseItem) => caseItem.age);

  // Define age ranges with inclusive upper bounds
  const ageRanges = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  // Count occurrences of ages within each range, handling open-ended ranges
  const ageDistribution = ageRanges.map((range, index) => ({
    Ages:
      index === 0
        ? "0-9"
        : index === ageRanges.length - 1
        ? `${range}+`
        : `${range}-${range + 9}`,
    count: ageData.filter(
      (age) =>
        age >= range &&
        age < (index === ageRanges.length - 1 ? Infinity : range + 10)
    ).length, // Count cases within the range
  }));

  // Chart configuration
  const chartConfig = {
    index: "Ages",
    categories: ["count"], // Display the "count" property for each age group
    data: ageDistribution,
    colors: ["blue"],
    valueFormatter: (number: number) => `${number} crimes`,
  };

  return (
    <Card className="bg-primary_light">
      <Title>Number of Crimes by Age Group</Title>
      <Subtitle>
        Bar chart displaying the number of crimes committed by individuals in
        each age group.
      </Subtitle>
      <BarChart {...chartConfig} />
    </Card>
  );
};

export default AgeChart;
