import AgeChart from "@/components/AgeChart";
import CriminalStatusChart from "@/components/CriminalStatusChart";
import WeekChart from "@/components/WeekChart";
async function getCases() {
  const res = await fetch(process.env.API_URL + "/cases", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
async function getCriminals() {
  const res = await fetch(process.env.API_URL + "/criminals", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function page() {
  const cases = await getCases();
  const criminals = await getCriminals();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Analytics</h1>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <AgeChart cases={cases} />
        <CriminalStatusChart criminals={criminals} />
      </div>
      <WeekChart cases={cases} />
    </div>
  );
}
