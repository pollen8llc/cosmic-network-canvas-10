import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TimeFilter = ({ timeRange, onTimeRangeChange }) => {
  return (
    <div className="mb-4">
      <Select value={timeRange} onValueChange={onTimeRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1M">1 Month</SelectItem>
          <SelectItem value="3M">3 Months</SelectItem>
          <SelectItem value="6M">6 Months</SelectItem>
          <SelectItem value="1Y">1 Year</SelectItem>
          <SelectItem value="ALL">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeFilter;