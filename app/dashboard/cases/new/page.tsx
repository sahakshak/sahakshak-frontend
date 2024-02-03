"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Textarea,
} from "@nextui-org/react";
const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      setIsLoading(true);

      const data = await fetch(
        "https://sahakshak-backend.vercel.app/api/cases",
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
  };

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-semibold mb-5">Create a Case</h1>
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
                />
                <Input
                  type="text"
                  name="name"
                  label="Name"
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
                <Textarea
                  name="description"
                  label="Enter The Description"
                  color="secondary"
                  className="col-span-2 h-full"
                  required
                />
                <Input
                  type="number"
                  color="secondary"
                  name="age"
                  label="Age"
                  required
                  className="max-w-xs"
                />
                <Input
                  color="secondary"
                  type="text"
                  name="location"
                  label="Location"
                  required
                />
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
                  name="pinCode"
                  label="Pin Code"
                  className="max-w-xs"
                  required
                />
                <Input
                  type="text"
                  color="secondary"
                  name="phoneNumber"
                  label="Phone Number"
                  required
                />
                <Input
                  color="secondary"
                  type="text"
                  name="email"
                  label="Email"
                  required
                />{" "}
                <Input
                  color="secondary"
                  type="datetime-local"
                  name="timeOfCrime"
                  className="max-w-xs"
                  required
                />
                <Input
                  color="secondary"
                  type="text"
                  name="suspect"
                  label="Suspect"
                  required
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
