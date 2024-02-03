import React from "react";
import { Card, Text, Metric } from "@tremor/react";
import { LuPcCase } from "react-icons/lu";
import { Case } from "@/lib/types/case";
export default function DashboardHeader({
  cases,
  totalArrests,
}: {
  cases: Case[];
  totalArrests: number;
}) {
  const totalCases = cases.length;
  const pendingCases = cases.filter(
    (caseItem) => caseItem.status === "Pending"
  ).length;
  const closedCases = cases.filter(
    (caseItem) => caseItem.status === "Closed"
  ).length;
  const openedCases = totalCases - pendingCases - closedCases;
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        className="max-w-xs mx-auto bg-primary_light flex justify-between items-center"
        decoration="top"
        decorationColor="blue"
      >
        <div>
          <Text>Total Cases</Text>
          <Metric>{totalCases}</Metric>
        </div>
        <div className="p-4 bg-blue-200 text-blue-500 rounded-2xl">
          <LuPcCase className="text-xl" />
        </div>
      </Card>
      <Card
        className="max-w-xs mx-auto bg-primary_light flex justify-between items-center"
        decoration="top"
        decorationColor="green"
      >
        <div>
          <Text>Total Arrests</Text>
          <Metric>{totalArrests}</Metric>
        </div>
        <div className="p-4 bg-green-200 text-green-500 rounded-2xl">
          <LuPcCase className="text-xl" />
        </div>
      </Card>
      <Card
        className="max-w-xs mx-auto bg-primary_light flex justify-between items-center"
        decoration="top"
        decorationColor="yellow"
      >
        <div>
          <Text>Opened Cases</Text>
          <Metric>{openedCases}</Metric>
        </div>
        <div className="p-4 bg-yellow-200 text-yellow-500 rounded-2xl">
          <LuPcCase className="text-xl" />
        </div>
      </Card>
      <Card
        className="max-w-xs mx-auto bg-primary_light flex justify-between items-center"
        decoration="top"
        decorationColor="red"
      >
        <div>
          <Text>Pending Cases</Text>
          <Metric>{pendingCases}</Metric>
        </div>
        <div className="p-4 bg-red-200 text-red-500 rounded-2xl">
          <LuPcCase className="text-xl" />
        </div>
      </Card>
    </div>
  );
}
