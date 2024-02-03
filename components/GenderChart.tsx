"use client";
import { Card, DonutChart, Legend, Title } from "@tremor/react";

const valueFormatter = (number: number) =>
  `${Number(number).toLocaleString()} Criminals`;

interface GenderChartProps {
  criminals?: { gender: string }[];
}

const GenderChart: React.FC<GenderChartProps> = ({ criminals = [] }) => {
  const genderCounts = criminals.reduce(
    (counts, { gender }: { gender: string }) => {
      const key = gender.toLowerCase();
      (counts as Record<string, number>)[key] =
        ((counts as Record<string, number>)[key] || 0) + 1;
      return counts;
    },
    {}
  );
  console.log(genderCounts);

  const genders = Object.entries(genderCounts).map(([name, number]) => ({
    name,
    number,
  }));
  return (
    <Card className="max-w-lg bg-primary_light">
      <Title>Gender Ratio</Title>
      <DonutChart
        className="my-14 scale-125"
        data={genders}
        category="number"
        index="name"
        valueFormatter={valueFormatter}
        colors={["blue", "yellow", "red"]}
      />
      <Legend
        className="mt-3 text-center"
        categories={Object.keys(genderCounts)}
        colors={["blue", "yellow", "red"]}
      />
    </Card>
  );
};

export default GenderChart;
