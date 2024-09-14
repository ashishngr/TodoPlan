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
        <div>
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>SortBy</SelectLabel>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        </div>
        <div>
            <Input type="text" placeholder="SearchByID" className="w-[280px]"/>
        </div>
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
                <SelectItem value="Heigh">High</SelectItem>
                <SelectItem value="Heigh">Urgent</SelectItem>
            </SelectGroup>
            </SelectContent>
        </Select>
        </div>
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
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
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
        <div>
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Search by status</SelectLabel>
            <SelectItem value="backlog">backlog</SelectItem>
            <SelectItem value="in-progress">In-Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On-Hold</SelectItem>
            <SelectItem value="cancelled">Canceled</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        </div>
    </div>
  )
}

export default Filters