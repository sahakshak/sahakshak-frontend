"use client";
import React, { useLayoutEffect, useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Case } from "@/lib/types/case";
const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];
const statuses = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Pending", label: "Pending" },
];
export default function Page({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState<Case>({} as Case);
  const [imageFile, setImageFile] = useState<File | null>(null);
  useLayoutEffect(() => {
    setIsLoading(true);
    fetch("https://sahakshak-backend.vercel.app/api/cases/" + params.slug, {
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data: Case) => {
        const { _id, __v, ...cleanedData } = data;
        setCaseData(cleanedData);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, [params.slug]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      setIsLoading(true);
      const res = await fetch(
        "https://sahakshak-backend.vercel.app/api/cases/" + params.slug,
        {
          method: "PUT",
          body: formData,

          credentials: "same-origin",
        }
      );
      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();
      console.log(data);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    setCaseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-semibold mb-5">
        Edit Case{" "}
        <span className=" text-sm text-gray-700 font-medium">
          #{params.slug}
        </span>
      </h1>
      <div className="flex flex-col space-y-4 ">
        <div className="bg-primary_light p-5 rounded-xl">
          <h1 className="font-semibold text-lg ">Complainer Information</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 my-4">
                <Input
                  type="text"
                  name="title"
                  label="Title"
                  required
                  color="secondary"
                  value={caseData.title || ""}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="name"
                  label="Name"
                  color="secondary"
                  required
                  value={caseData.name || ""}
                  onChange={handleChange}
                />
                <Select
                  color="secondary"
                  label="Gender"
                  placeholder="Select a gender"
                  name="gender"
                  items={genders}
                  className="max-w-xs"
                  value={caseData.gender || ""}
                  onChange={(e: any) => handleChange(e)}
                >
                  {(gender) => (
                    <SelectItem key={gender.value}>{gender.label}</SelectItem>
                  )}
                </Select>
                <Textarea
                  name="description"
                  label="Enter The Description"
                  color="secondary"
                  className="col-span-2 h-full"
                  required
                  onChange={handleChange}
                  value={caseData.description || ""}
                />
                <Input
                  type="number"
                  color="secondary"
                  name="age"
                  label="Age"
                  required
                  className="max-w-xs"
                  value={String(caseData?.age || 0)}
                  onChange={handleChange}
                />
                <Input
                  color="secondary"
                  type="text"
                  name="location"
                  label="Location"
                  required
                  value={caseData.location || ""}
                  onChange={handleChange}
                />
                <Input
                  color="secondary"
                  type="text"
                  name="address"
                  label="Address"
                  value={caseData.address || ""}
                  onChange={handleChange}
                  required
                />
                <Input
                  color="secondary"
                  type="text"
                  name="pinCode"
                  label="Pin Code"
                  className="max-w-xs"
                  required
                  value={caseData.pinCode || ""}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  color="secondary"
                  name="phoneNumber"
                  label="Phone Number"
                  onChange={handleChange}
                  value={caseData.phoneNumber || ""}
                  required
                />
                <Input
                  color="secondary"
                  type="text"
                  name="email"
                  label="Email"
                  required
                  onChange={handleChange}
                  value={caseData.email || ""}
                />{" "}
                <Input
                  color="secondary"
                  type="datetime-local"
                  name="timeOfCrime"
                  onChange={handleChange}
                  className="max-w-xs"
                  value={
                    caseData.timeOfCrime
                      ? new Date(caseData.timeOfCrime)
                          .toISOString()
                          .slice(0, -8)
                      : ""
                  }
                  required
                />
                <Input
                  color="secondary"
                  type="text"
                  name="suspect"
                  onChange={handleChange}
                  label="Suspect"
                  value={caseData.suspect || ""}
                  required
                />
                <Select
                  color="secondary"
                  name="status"
                  label="Status"
                  placeholder="Select a Status"
                  items={statuses}
                  className="max-w-xs"
                  value={caseData.status || ""}
                  onChange={(e: any) => handleChange(e)}
                >
                  {(status) => (
                    <SelectItem key={status.value}>{status.label}</SelectItem>
                  )}
                </Select>
                <div className="flex gap-2">
                  <label htmlFor="image" className="text-sm font-semibold">
                    Upload Image
                  </label>
                  <Input
                    type="file"
                    name="image"
                    color="secondary"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  radius="full"
                  isLoading={isLoading}
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mr-5"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
