"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Skeleton,
  Link,
  Chip,
} from "@nextui-org/react";
import { FaRegEye, FaTrash } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { Case } from "@/lib/types/case";
interface CaseTableProps {
  cases: Case[];
}
const CaseTable: React.FC<CaseTableProps> = ({ cases }) => {
  console.log(cases);

  const [caseData, setCaseData] = useState([] as Case[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setCaseData(cases);
    setLoading(false);
  }, [cases]);

  return (
    <Table aria-label="Case Data Table" className="mt-5">
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Time Of Crime</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell>
              <Skeleton className="h-5 w-14" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ) : (
          caseData.slice(0, 5).map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {new Date(item.timeOfCrime).toLocaleString()}
              </TableCell>
              <TableCell className="flex justify-center w-full">
                <Chip className="w-full" color={getStatusColor(item.status)}>
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CaseTable;

const getStatusColor = (
  status: string
): "success" | "secondary" | "warning" | "default" => {
  switch (status) {
    case "Open":
      return "success";
    case "Closed":
      return "secondary";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};
