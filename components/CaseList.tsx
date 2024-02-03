import { Case } from "@/lib/types/case";
import CaseCard from "./CaseCard";

interface CaseTableInterface {
  cases: Case[];
}

const CaseList: React.FC<CaseTableInterface> = ({ cases }) => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
      {cases.map((singleCase: Case) => (
        <CaseCard key={singleCase._id} caseData={singleCase}></CaseCard>
      ))}
    </div>
  );
};

export default CaseList;
