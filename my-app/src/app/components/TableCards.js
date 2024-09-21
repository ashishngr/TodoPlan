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
import { ScrollArea } from "@/components/ui/scroll-area"


import { Separator } from "@/components/ui/separator"; 

const invoices = [
    {
      id: "1",
      title: "Task title 1",
      creator: "A"
    
    },
    {
        id: "1",
        title: "Task title 1",
        creator: "A"
      
    },
    {
        id: "1",
        title: "Task title 1",
        creator: "A"
      
      },
      {
          id: "1",
          title: "Task title 1",
          creator: "A"
        
      },
      {
        id: "1",
        title: "Task title 1",
        creator: "A"
      
      },
      {
          id: "1",
          title: "Task title 1",
          creator: "A"
        
      },
      {
        id: "1",
        title: "Task title 1",
        creator: "A"
      
      },
      {
          id: "1",
          title: "Task title 1",
          creator: "A"
        
      },
    
]


const TableCards = ({title, number, description}) => {
  return (
    <Card className="w-[350px] h-[350px]">
      <CardHeader className="p-2">  {/* Reduce padding here */}
        <CardTitle className="flex items-center">
            <span className="bg-gray-100 p-2 rounded-full w-8 h-8 inline-flex items-center justify-center">
            {number}
            </span>
            <span className="ml-2">{title}</span>
        </CardTitle>
        </CardHeader>
      <Separator className="" />
      <CardContent className="max-h-[240px] overflow-y-auto">
        <Table >
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">S.No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Creator</TableHead>
                </TableRow>
            </TableHeader>
            
                <TableBody>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.title}</TableCell>
                        <TableCell>
                        <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
                            {invoice.creator}
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>  
        </Table>
      </CardContent>
      <Separator className="" />
      <CardFooter className="flex justify-center p-2 text-md font-bold">
        {description}
      </CardFooter>
    </Card>
  );
};

export default TableCards;
