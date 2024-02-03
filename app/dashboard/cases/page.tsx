import CaseList from "@/components/CaseList";

async function getCases() {
  const res = await fetch("http://172.105.54.189/api/cases", {
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function page() {
  const cases = await getCases();
  console.log(cases);

  return (
    <div>
      <h1 className="text-3xl font-semibold ">Cases</h1>
      {/* <CaseTable cases={cases} /> */}
      <CaseList cases={cases} />
    </div>
  );
}
