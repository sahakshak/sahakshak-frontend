"use client";
import { Evidence } from "@/lib/types/evidence";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

interface EvidenceTableProps {
  evidences: Evidence[];
}

const EvidenceTable: React.FC<EvidenceTableProps> = ({ evidences }) => {
  console.log(evidences);

  const [evidenceData, setEvidenceData] = useState([] as Evidence[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEvidenceData(evidences);
    setLoading(false);
  }, [evidences]);

  return (
    <Table aria-label="Evidence Data Table" className="mt-5">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Case ID</TableColumn>
        <TableColumn>Location Found</TableColumn>
        <TableColumn>Evidence Type</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Found On</TableColumn>
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
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ) : (
          evidenceData.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell className="">{item._id}</TableCell>
              <TableCell>{item.caseId}</TableCell>
              <TableCell>{item.locationFound}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{new Date(item.foundOn).toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default EvidenceTable;
