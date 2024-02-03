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
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  // ! Handle Criminal
  async function handleCriminalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      setIsLoading(true);

      const data = await fetch(
        "https://sahakshak-backend.vercel.app/api/criminals",
        {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        }
      );

      const response = await data.json();
      console.log("Response:", response);

      // Reset the form
      // (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <h1>Criminal Data</h1>
      <form onSubmit={handleCriminalSubmit}>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 my-4">
          <Input
            type="text"
            name="caseId"
            label="Case ID"
            color="secondary"
            required
          />
          <Input
            type="text"
            name="name"
            label="Criminal Name"
            color="secondary"
            required
          />
          <Autocomplete
            color="secondary"
            defaultItems={genders}
            name="gender"
            label="Gender"
            placeholder="Select a Gender"
            className="max-w-xs"
          >
            {(gender) => (
              <AutocompleteItem key={gender.value}>
                {gender.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            color="secondary"
            type="text"
            name="address"
            label="Address"
            required
          />
          <Input
            color="secondary"
            type="text"
            name="crime"
            label="Crime"
            required
          />{" "}
          <Input
            type="number"
            color="secondary"
            name="age"
            label="Age"
            required
            className="max-w-xs"
          />
          <Autocomplete
            color="secondary"
            defaultItems={[
              { value: "Wanted", label: "Wanted" },
              { value: "Arrested", label: "Arrested" },
              { value: "Released", label: "Released" },
            ]}
            name="status"
            label="Status"
            placeholder="Select a Status"
            className="max-w-xs"
          >
            {(status) => (
              <AutocompleteItem key={status.value}>
                {status.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <div className="flex gap-2">
            <label htmlFor="criminalImage" className="text-sm font-semibold">
              Upload Criminal Image
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
            Submit Criminal
          </Button>
        </div>
      </form>
    </div>
  );
}
