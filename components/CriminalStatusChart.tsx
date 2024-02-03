"use client";
import React from "react";
import { Card, DonutChart, Legend, Title } from "@tremor/react";

const CriminalStatusChart = ({ criminals = [] }) => {
  // Calculate counts for each status
  const statusCounts = criminals.reduce(
    (accumulator: any, criminal: { status: number }) => {
      accumulator[criminal.status]++;
      return accumulator;
    },
    { Wanted: 0, Arrested: 0, Released: 0 }
  );

  // Convert status counts to the required format for the chart
  const suspectsData = Object.keys(statusCounts).map((status) => ({
    name: status,
    count: statusCounts[status],
  }));

  const valueFormatter = (number: number) => `${number}`;

  return (
    <Card className="max-w-lg bg-primary_light">
      <Title>Criminal Status</Title>
      <DonutChart
        className="my-6 mt-12 scale-125 "
        data={suspectsData}
        category="count"
        index="name"
        valueFormatter={valueFormatter}
        variant="pie"
        colors={["red", "green", "blue"]} // You can customize colors as needed
      />
      <Legend
        className="mt-3"
        categories={["Wanted", "Arrested", "Released"]}
        colors={["red", "green", "blue"]}
      />
    </Card>
  );
};

export default CriminalStatusChart;
