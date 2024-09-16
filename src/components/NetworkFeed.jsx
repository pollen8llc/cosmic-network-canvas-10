import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThumbsUp, MessageSquare, ChevronUp, ChevronDown, Search } from 'lucide-react';
import TimeFilter from './TimeFilter';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NetworkFeed = ({ activeView, connections, networkUpdates, networkGrowth, selectedIndustry, onProfileClick, timeRange, onTimeRangeChange }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  const sortConnections = (connections) => {
    return [...connections].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (industryFilter === 'All' || connection.industry === industryFilter)
  );

  const sortedConnections = sortConnections(filteredConnections);

  const filteredUpdates = networkUpdates.filter(update =>
    update.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedIndustry ? update.industry === selectedIndustry : true) &&
    (industryFilter === 'All' || update.industry === industryFilter)
  );

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="inline-block w-4 h-4" /> : <ChevronDown className="inline-block w-4 h-4" />;
  };

  const industries = ['All', ...new Set(connections.map(c => c.industry))];

  if (activeView === 'connections') {
    return (
      <div>
        <div className="mb-4 flex flex-wrap gap-4">
          <Input
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button onClick={() => handleSort('name')} className="text-white">
            Name <SortIcon field="name" />
          </button>
          <button onClick={() => handleSort('industry')} className="text-white">
            Industry <SortIcon field="industry" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedConnections.map((connection) => (
            <Card key={connection.id} className="cursor-pointer" onClick={() => onProfileClick(connection)}>
              <CardContent className="flex flex-col items-center p-4">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage src={connection.avatar} alt={connection.name} />
                  <AvatarFallback>{connection.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{connection.name}</h3>
                <p className="text-sm text-gray-500">{connection.industry}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === 'networkValue') {
    return (
      <div className="h-96">
        <TimeFilter timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={networkGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#fff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default view: network updates or industry updates
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredUpdates.map((update) => (
        <Card key={update.id} className="mb-4">
          <CardContent className="flex items-start p-4">
            <Avatar className="mr-4">
              <AvatarImage src={update.avatar} alt={update.name} />
              <AvatarFallback>{update.name[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <h3 className="font-semibold">{update.name}</h3>
              <p className="text-sm text-gray-500">{update.industry}</p>
              <p className="text-sm">{update.content}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(update.timestamp).toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-sm mr-4">{update.likes} Likes</span>
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-sm">{update.comments.length} Comments</span>
              </div>
              <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="comments">
                  <AccordionTrigger>View Comments</AccordionTrigger>
                  <AccordionContent>
                    {update.comments.map((comment, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm font-semibold">{comment.author}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NetworkFeed;
