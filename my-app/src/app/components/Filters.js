import React, {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; 
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { addDays } from "date-fns"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


const Filters = ({filters}) => {
    console.log("Filters", filters)
    const [date, setDate] = useState(Date)
    

  return (
    <div className='flex flex-row flex-wrap gap-2'>
     <div className='content-center'>Filters</div>   
    {filters.includes("SortBy") && (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort By</SelectLabel>
                        <SelectItem value="Latest">Latest</SelectItem>
                        <SelectItem value="Oldest">Oldest</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )}
    {filters.includes("SearchById") && (
        <div>
            <Input type="text" placeholder="Search by ID" className="w-[280px]" />
        </div>
    )}
    {filters.includes("SearchByPriority") && (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )}
    {filters.includes("SearchByCreatedAt") && (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Created At</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                    <Select
                        onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Created At" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )}
    {filters.includes("SearchByStatus") && (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="backlog">Backlog</SelectItem>
                        <SelectItem value="in-progress">In-Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On-Hold</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )}
</div>
  )
}

export default Filters