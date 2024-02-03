export default async function Page() {
  //   const totalArrests = criminals.filter(
  //     (criminal: any) => criminal.status === "Arrested"
  //   ).length;

  return (
    <div>
      {/* <DashboardHeader cases={cases} totalArrests={totalArrests} /> */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className=" col-span-2">{/* <WeekChart cases={cases} /> */}</div>
        {/* <GenderChart criminals={criminals} /> */}
      </div>
    </div>
  );
}
