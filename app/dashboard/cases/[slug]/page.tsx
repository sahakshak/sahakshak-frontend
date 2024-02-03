import React from "react";
import { Card, Chip, Divider, Spacer } from "@nextui-org/react";
import { Badge } from "@tremor/react";
import { Image } from "@nextui-org/react";

const fetchCase = async (slug: string) => {
  const res = await fetch(
    `https://sahakshak-backend.vercel.app/api/cases/${slug}`
  );
  const data = await res.json();
  return data;
};

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const caseData = await fetchCase(slug);
  console.log(caseData);

  return (
    <div className=" ">
      <h2 className="text-3xl font-bold mb-2">Case Details</h2>
      <Card className="p-10 bg-primary grid grid-cols-3 max-md:grid-cols-1 mt-5     gap-4">
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
              </section>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
