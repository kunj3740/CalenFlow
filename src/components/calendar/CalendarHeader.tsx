import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Download, Plus, Search } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddEvent: () => void;
  onExport: (format: 'json' | 'csv') => void;
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  searchTerm,
  onSearchChange,
  onAddEvent,
  onExport,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4 mb-6 min-w-full w-full">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Calendar
      </h1>
      <div className="flex items-center justify-center w-full max-w-3xl">
        <Button variant="ghost" onClick={onPreviousMonth} className="text-purple-500">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold mx-4 min-w-[200px] text-center">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <Button variant="ghost" onClick={onNextMonth} className="text-blue-500">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport('json')}>
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onAddEvent} className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-none">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
    </div>
  );
}

