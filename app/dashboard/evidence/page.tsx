import EvidenceTable from "@/components/EvidenceTable";
import console from "console";
async function getCases() {
  const res = await fetch("https://sahakshak-backend.vercel.app/api/evidence", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function page() {
  const evidences = await getCases();
  console.log(evidences);

  return (
    <div>
      <h1 className="text-3xl font-semibold ">Evidences</h1>
      <EvidenceTable evidences={evidences} />
    </div>
  );
}
