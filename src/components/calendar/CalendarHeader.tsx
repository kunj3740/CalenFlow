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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold">Calendar</h1>
        <div className="flex items-center gap-2">
          <button  onClick={onPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-semibold min-w-40 text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
        <Button onClick={onAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
    </div>
  );
}
