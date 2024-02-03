import DashboardHeader from "@/components/DashboardHeader";
import GenderChart from "@/components/GenderChart";
import WeekChart from "@/components/WeekChart";

async function getCases() {
  const res = await fetch("https://sahakshak-backend.vercel.app/api/cases", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
async function getCriminals() {
  const res = await fetch(
    "https://sahakshak-backend.vercel.app/api/criminals",
    {
      credentials: "same-origin",
      cache: "no-store",
    }
  );
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
    <div>
      <DashboardHeader cases={cases} totalArrests={totalArrests} />
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className=" col-span-2">
          <WeekChart cases={cases} />
        </div>
        <GenderChart criminals={criminals} />
      </div>
    </div>
  );
}
