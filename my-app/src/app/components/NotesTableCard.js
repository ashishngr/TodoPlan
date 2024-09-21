import React from 'react'
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
import { Separator } from "@/components/ui/separator"; 
const invoices = [
    {
      id: "1",
      title: "Data Structure And Algorithms",
    
    },
    {
        id: "1",
        title: "Data Structure And Algorithms",
      
    },
    {
        id: "1",
        title: "Data Structure And Algorithms",
      
      },
      {
          id: "1",
          title: "Data Structure And Algorithms",
        
      },
      {
        id: "1",
        title: "Data Structure And Algorithms",

      },
      {
          id: "1",
          title: "Data Structure And Algorithms",
        
      },
      {
        id: "1",
        title: "Data Structure And Algorithms",
      },
      {
          id: "1",
          title: "Data Structure And Algorithms",        
      } 
]


const NotesTableCard = ({title, number}) => {
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
                <TableBody>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium "><span className='font-bold'>Title</span> : {" "}{invoice.title}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>  
        </Table>
      </CardContent>
      <Separator className="" />
      <CardFooter className="flex justify-center p-2 text-md font-bold">
        A list of your's latest notes
      </CardFooter>
    </Card>
  )
}

export default NotesTableCard