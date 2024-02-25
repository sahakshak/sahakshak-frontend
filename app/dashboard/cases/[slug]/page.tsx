import React from "react";
import { Button, Card, Chip, Divider, Link, Spacer } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { IoIosAddCircle } from "react-icons/io";
import { KEY } from "@/constant/const";

const fetchCase = async (slug: string) => {
  const res = await fetch(KEY + `/cases/${slug}`);
  const data = await res.json();
  return data;
};

const fetchEvidence = async (slug: string) => {
  const res = await fetch(KEY + `/evidence/case/${slug}`);
  let data = await res.json();
  data = data.length > 0 ? data : [];

  return data;
};

const fetchCriminal = async (slug: string) => {
  const res = await fetch(KEY + `/criminals/case/${slug}`);
  let data = await res.json();
  data = data.length > 0 ? data : [];
  return data;
};

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const caseData = await fetchCase(slug);
  const evidenceData = await fetchEvidence(slug);
  const criminalData = await fetchCriminal(slug);

  return (
    <div className=" ">
      <h2 className="text-3xl font-bold mb-2">Case Details</h2>
      <Card className="p-10 bg-primary grid grid-cols-3 max-md:grid-cols-1 mt-5     gap-10">
        <Image
          alt="NextUI hero Image with delay"
          src={
            caseData.imageURL ||
            "https://img.freepik.com/free-vector/police-arresting-criminal-concept-illustration_114360-13673.jpg?w=740&t=st=1706870279~exp=1706870879~hmac=9cd477943a7b573c7ffd8bce6afbe31859723aae72766c83abbd9d2f41900243"
          }
        />
        <div className=" col-span-2 max-md:col-span-1 text-lg">
          <h2 className="text-3xl font-bold mb-2 flex gap-4 ">
            {caseData.title}
            <Chip color="success">{caseData.status}</Chip>
          </h2>

          <Spacer y={1} />
          <p className="  font-semibold">Description: </p>

          <p className="font-medium text-gray-600 mb-2">
            {caseData.description}
          </p>
          <p className=" font-semibold">Crime Location: </p>
          <p className="  font-medium text-gray-600">{caseData.location}</p>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Victim Details</h3>

              <section className="grid grid-cols-2 max-md:grid-cols-1">
                <div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Name:</span>
                    <span className=""> {caseData.name}</span>
                  </div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Address:</span>
                    <span className=""> {caseData.address}</span>
                  </div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Email:</span>
                    <span className=""> {caseData.email}</span>
                  </div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Gender:</span>
                    <span className=""> {caseData.gender}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Age:</span>
                    <span className=""> {caseData.age}</span>
                  </div>
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">Phone No:</span>
                    <span className=""> {caseData.phoneNumber}</span>
                  </div>
                </div>
                <Link href={`/dashboard/cases/edit/${caseData._id}`}>
                  <Button
                    variant="solid"
                    className="border bg-blue-500 text-white shadow-lg"
                  >
                    Edit Case
                  </Button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex gap-3 items-center mt-10 mb-4">
        {" "}
        <h2 className="text-3xl font-bold ">Evidence Details</h2>
        <Link href={`/dashboard/evidence/new`}>
          <IoIosAddCircle size={30} className="text-green-600" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidenceData.length > 0 ? (
          evidenceData.map((evidence: any) => (
            <Card
              key={evidence._id}
              className="p-6 grid grid-cols-2 items-center"
            >
              <div>
                {
                  <Image
                    alt={`Evidence Image ${evidence._id}`}
                    src={
                      evidence.imageURL ||
                      "https://img.freepik.com/free-vector/police-arresting-criminal-concept-illustration_114360-13673.jpg?w=740&t=st=1706870279~exp=1706870879~hmac=9cd477943a7b573c7ffd8bce6afbe31859723aae72766c83abbd9d2f41900243"
                    }
                    className="max-w-full h-auto mb-4 "
                  />
                }
              </div>
              <div className="ml-10">
                <h3 className="text-xl font-bold mb-2">{evidence.type}</h3>
                <p className="font-semibold">Description:</p>
                <p className="font-medium text-gray-600 mb-2">
                  {evidence.description}
                </p>
                <p className="font-semibold">Location Found:</p>
                <p className="font-medium text-gray-600">
                  {evidence.locationFound}
                </p>
                <p className="font-semibold">Found By:</p>
                <p className="font-medium text-gray-600">{evidence.foundBy}</p>
                <p className="font-semibold">Found On:</p>
                <p className="font-medium text-gray-600">
                  {new Date(evidence.foundOn).toLocaleString()}
                </p>
                <p className="font-semibold">Collected By:</p>
                <p className="font-medium text-gray-600">
                  {evidence.collectedBy}
                </p>
                <p className="font-semibold">Collected On:</p>
                <p className="font-medium text-gray-600">
                  {new Date(evidence.collectedOn).toLocaleString()}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <h1>No Evidence Details Found</h1>
        )}
      </div>
      <div className="flex gap-3 items-center mt-10 mb-4">
        {" "}
        <h2 className="text-3xl font-bold ">Criminal Details</h2>
        <Link href={`/dashboard/criminals/new`}>
          <IoIosAddCircle size={30} className="text-green-600" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criminalData.length > 0 ? (
          criminalData.map((criminal: any) => (
            <Card
              key={criminal._id}
              className="p-6 grid grid-cols-2 items-center"
            >
              <div>
                {
                  <Image
                    alt={`Criminal Image ${criminal._id}`}
                    src={
                      criminal.imageURL ||
                      "https://img.freepik.com/free-vector/police-arresting-criminal-concept-illustration_114360-13673.jpg?w=740&t=st=1706870279~exp=1706870879~hmac=9cd477943a7b573c7ffd8bce6afbe31859723aae72766c83abbd9d2f41900243"
                    }
                    className="max-w-full h-auto mb-4"
                  />
                }
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">{criminal.name}</h3>
                <p className="font-semibold">Gender:</p>
                <p className="font-medium text-gray-600">{criminal.gender}</p>
                <p className="font-semibold">Age:</p>
                <p className="font-medium text-gray-600">{criminal.age}</p>
                <p className="font-semibold">Address:</p>
                <p className="font-medium text-gray-600">{criminal.address}</p>
                <p className="font-semibold">Crime:</p>
                <p className="font-medium text-gray-600">{criminal.crime}</p>
                <p className="font-semibold">Status:</p>
                <p className="font-medium text-gray-600">{criminal.status}</p>
              </div>
            </Card>
          ))
        ) : (
          <h1>No Criminal Details Found</h1>
        )}
      </div>
    </div>
  );
}
