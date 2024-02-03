import AgeChart from "@/components/AgeChart";
import CriminalStatusChart from "@/components/CriminalStatusChart";
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

export default async function page() {
  const cases = await getCases();
  const criminals = await getCriminals();
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        <AgeChart cases={cases} />
        <CriminalStatusChart criminals={criminals} />
      </div>
    </div>
  );
}
