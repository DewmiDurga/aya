import React from "react";
import { Wifi } from "lucide-react";

export function StatusBar() {
  return (
    <div className="w-full pt-3 pb-2 px-6 flex items-center justify-between text-[#1B1E28] select-none text-xs font-semibold z-20">
      <span className="tracking-tight text-[13px] font-semibold">9:41</span>
      
      <div className="flex items-center gap-1.5">
        {/* Cellular signal bars */}
        <div className="flex items-end gap-[2px] h-3">
          <div className="w-[3px] h-1.5 bg-[#1B1E28] rounded-[0.5px]"></div>
          <div className="w-[3px] h-2 bg-[#1B1E28] rounded-[0.5px]"></div>
          <div className="w-[3px] h-2.5 bg-[#1B1E28] rounded-[0.5px]"></div>
          <div className="w-[3px] h-3 bg-[#1B1E28] rounded-[0.5px]"></div>
        </div>

        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

        {/* Battery icon */}
        <div className="w-[20px] h-[10px] border-[1.5px] border-[#1B1E28] rounded-[3px] p-[1px] flex items-center relative ml-0.5">
          <div className="h-full w-full bg-[#1B1E28] rounded-[1px]"></div>
          <div className="absolute -right-[3px] top-[2px] w-[1.5px] h-[4px] bg-[#1B1E28] rounded-r-[0.5px]"></div>
        </div>
      </div>
    </div>
  );
}
