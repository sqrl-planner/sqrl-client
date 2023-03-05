import React from "react"
import TimetableCard from "./timetableCard"
import * as ScrollArea from "@radix-ui/react-scroll-area"

const Timetables = () => {
  return (
    <div className="p-8 gap-6 flex flex-col h-full max-h-[calc(100vh-3.5rem)] overflow-auto  scrollbar scrollbar-thumb-gray-300 scrollbar-track-[#ffffff00]">
      <h1 className="text-7xl font-serif">Timetables</h1>

      <div className="flex justify-between items-center text-xl font-medium">
        <div>Sort by</div>
        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2 px-3"
         />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {[...new Array(30)].map((_, i) => (
          <TimetableCard key={i} />
        ))}
      </div>
    </div>
  )
}

export default Timetables
