"use client";

import React, { useState } from "react";
import SideNavItem from "@/lib/types/SideNav";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RxDashboard } from "react-icons/rx";
import { FaFileAlt } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";

const SIDENAV_ITEMS = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard size={20} />,
  },

  {
    title: "Cases",
    path: "/dashboard/cases",
    icon: <FaFileAlt size={20} />,
    submenu: true,
    subMenuItems: [
      { title: "View Cases", path: "/dashboard/cases" },
      { title: "Add Cases", path: "/dashboard/cases/new" },
    ],
  },
  {
    title: "Evidence",
    path: "/dashboard/evidence",
    icon: <MdHelpCenter size={20} />,
    submenu: true,
    subMenuItems: [
      { title: "View Evidence", path: "/dashboard/evidence" },
      { title: "Add Evidence", path: "/dashboard/evidence/new" },
    ],
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: <IoMdAnalytics size={20} />,
  },
];

const SideNav = () => {
  return (
    <div className="flex flex-col   space-y-3 w-full mt-14">
      {SIDENAV_ITEMS.map((item, idx) => {
        return <MenuItem key={idx} item={item} />;
      })}
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "text-blue-500" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon || ""}
              <span className="font-semibold   flex">{item.title}</span>
            </div>

            <div
              className={`transition ${subMenuOpen ? "rotate-180" : ""} flex`}
            >
              <FaChevronDown size={14} className="pl-1" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-6 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "text-blue-500" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold  flex justify-center">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
