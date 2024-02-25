import CaseTable from "@/components/CaseTable";
import DashboardHeader from "@/components/DashboardHeader";
import GenderChart from "@/components/GenderChart";
import WeekChart from "@/components/WeekChart";
import { KEY } from "@/constant/const";
async function getCases() {
  const res = await fetch(KEY + "/cases", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
async function getCriminals() {
  const res = await fetch(KEY + "/criminals", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const criminals = await getCriminals();
  const cases = await getCases();
  const totalArrests = criminals.filter(
    (criminal: any) => criminal.status === "Arrested"
  ).length;

  return (
    <div className="w-full h-full mt-5">
      <DashboardHeader cases={cases} totalArrests={totalArrests} />
      <div className="mt-5 grid grid-cols-3 max-md:grid-cols-1  gap-4">
        <div className=" col-span-2 max-md:col-span-1">
          <WeekChart cases={cases} />
        </div>
        <GenderChart criminals={criminals} />
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 mt-4 p-2">
        <div className=" col-span-2">
          <h1 className="text-2xl font-semibold">Recent Cases</h1>
          <CaseTable cases={cases} />
        </div>
      </div>
    </div>
  );
}
