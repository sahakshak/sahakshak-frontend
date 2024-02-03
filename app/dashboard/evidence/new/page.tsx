"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Textarea,
} from "@nextui-org/react";

const evidenceTypes = [
  { value: "Type1", label: "Type 1" },
  { value: "Type2", label: "Type 2" },
  { value: "Type3", label: "Type 3" },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    // const formObject: { [key: string]: string } = {};
    // formData.forEach((value, key) => {
    //   formObject[key] = String(value);
    // });

    try {
      setIsLoading(true);
      const data = await fetch("http://172.105.54.189/api/evidence", {
        method: "POST",
        body: formData,

        credentials: "same-origin",
      });
      const response = await data.json();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">
        Add Evidence
        <span className=" text-sm text-gray-700 font-medium"></span>
      </h1>
      <div className="flex flex-col space-y-4 ">
        <div className="bg-primary_light p-5 rounded-xl">
          <h1 className="font-semibold text-lg ">Evidence Information</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 my-4">
                <Input
                  type="text"
                  name="caseId"
                  label="Case ID"
                  required
                  color="secondary"
                />
                <Input
                  type="text"
                  name="locationFound"
                  label="Location Found"
                  required
                  color="secondary"
                />
                <Input
                  type="text"
                  color="secondary"
                  required
                  name="type"
                  label="Evidence Type"
                  className="max-w-xs"
                />

                <Textarea
                  name="description"
                  label="Description"
                  color="secondary"
                  className="col-span-2 h-full"
                  required
                />
                <div className="flex items-center">
                  <Input
                    type="datetime-local"
                    name="foundOn"
                    label="Found On"
                    required
                    color="secondary"
                    className="h-1/2"
                    labelPlacement="outside-left"
                  />
                </div>
                <Input
                  type="text"
                  name="foundBy"
                  label="Found By"
                  required
                  color="secondary"
                />
                <Input
                  type="text"
                  name="collectedBy"
                  label="Collected By"
                  required
                  color="secondary"
                />
                <Input
                  type="datetime-local"
                  name="collectedOn"
                  label="Collected On"
                  labelPlacement="outside-left"
                  required
                  color="secondary"
                />
                <div className="flex gap-2">
                  <label htmlFor="image" className="text-sm font-semibold">
                    Upload Image
                  </label>
                  <Input
                    type="file"
                    name="image"
                    color="secondary"
                    accept="image/*"
                    required
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
