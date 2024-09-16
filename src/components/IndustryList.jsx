import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const IndustryList = ({ isOpen, onClose, industries, onIndustrySelect }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="bg-black text-white w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-white">Industry List</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] mt-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-800"
              onClick={() => onIndustrySelect(industry.name)}
            >
              <span>{industry.name}</span>
              <span>{industry.count}</span>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default IndustryList;
