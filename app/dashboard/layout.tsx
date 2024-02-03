import { UserButton } from "@clerk/nextjs";
import { Input } from "@nextui-org/react";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex max-h-screen overflow-hidden  ">
      <div className=" bg-primary_light w-48  min-h-screen sticky top-0 left-0 max-md:hidden">
        <div className="flex flex-col item-center p-5 px-7 ">
          <h1 className="text-2xl font-bold text-black  text-left  pt-4 ">
            Sahakshak
          </h1>
        </div>
      </div>
      <div className="flex-1 w-full h-full ">
        <div className="bg-primary_light p-5 px-10 flex items-center justify-between sticky top-0 left-0 z-50 ">
          <Input
            type="text"
            placeholder="Search"
            height="1rem"
            size="sm"
            className=" max-w-sm border rounded-xl border-gray-350"
          />
          <div className=" scale-110">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className=" max-h-screen overflow-auto pb-40   p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
