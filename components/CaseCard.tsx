import { Case } from "@/lib/types/case";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import Link from "next/link";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  return (
    <Card className="py-4 mt-5">
      <div className=" grid grid-cols-3">
        <div className="relative min-h-[200px]">
          <Image
            isZoomed
            alt="Card background"
            src={
              caseData.imageURL ||
              "https://img.freepik.com/free-vector/police-arresting-criminal-concept-illustration_114360-13673.jpg?w=740&t=st=1706870279~exp=1706870879~hmac=9cd477943a7b573c7ffd8bce6afbe31859723aae72766c83abbd9d2f41900243"
            }
          />
        </div>
        <div className=" col-span-2">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-1">
            <p className="text-tiny uppercase font-bold">
              Case Id: #{caseData._id}
            </p>
            <small className="text-default-500">
              Status: {caseData.status} | Gender: {caseData.gender}
            </small>
            <h4 className="font-bold text-large">{caseData.title}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <p className="text-sm text-default-700">
              Description: {caseData.description}
            </p>
            <p className="text-sm text-default-700">
              Location: {caseData.location}
            </p>
            <p className="text-sm text-default-700">
              Phone: {caseData.phoneNumber} | Email: {caseData.email}
            </p>
            <p className="text-sm text-default-700">
              Time of Crime: {new Date(caseData.timeOfCrime).toLocaleString()}
            </p>

            <p className="text-sm text-default-700">
              Created At: {new Date(caseData.createdAt).toLocaleString()}
            </p>
          </CardBody>
          <div className="flex gap-3 w-full justify-end px-4 py-2">
            <Link href={`/dashboard/cases/${caseData._id}`}>
              <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                View Case
              </Button>
            </Link>
            <Link href={`/dashboard/cases/edit/${caseData._id}`}>
              <Button
                variant="bordered"
                className="border border-yellow-500 text-black shadow-lg"
              >
                Edit Case
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CaseCard;
