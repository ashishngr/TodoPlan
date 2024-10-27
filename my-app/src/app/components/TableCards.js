import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";

const invoices = [
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
  {
    id: "1",
    title: "Task title 1",
    creator: "A",
  },
];

const TableCards = ({ tableTitle, number, description, tasks = [] }) => {
  console.log("tasks------", tasks);
  return (
    <Card className="w-[400px] h-[400px] shadow-lg border rounded-lg">
      <CardHeader className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-lg">
        <CardTitle className="flex items-center text-white">
          <span className="bg-white p-2 rounded-full w-10 h-10 inline-flex items-center justify-center text-indigo-500 font-semibold">
            {number}
          </span>
          <span className="ml-3 font-semibold text-lg">{tableTitle}</span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="max-h-[260px] overflow-y-auto bg-gray-50 p-3 rounded-b-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700 font-semibold">
              <TableHead className="py-2 text-center">S.No</TableHead>
              <TableHead className="py-2 text-center">Title</TableHead>
              <TableHead className="py-2 text-center">Creator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow
                  key={task.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-indigo-50 transition-all duration-150`}
                >
                  <TableCell className="py-2 text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    {task.title}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    <div className="flex justify-center items-center w-10 h-10 bg-indigo-200 rounded-full text-indigo-600 font-semibold">
                      {task.creatorName
                        ? task.creatorName.charAt(0).toUpperCase()
                        : "?"}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-500 py-4"
                >
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-center p-3 text-gray-600 bg-gray-50 font-medium rounded-b-lg">
        {description}
      </CardFooter>
    </Card>
  );
};

export default TableCards;
