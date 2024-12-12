import { DayProps } from '@/types/calendar';
import { CalendarDay } from './CalendarDay';
import { cn } from '@/lib/utils';
import { isToday } from 'date-fns';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  days: Date[];
  dayProps: Omit<DayProps, 'date'>;
}

export function CalendarGrid({ days, dayProps }: CalendarGridProps) {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl overflow-hidden shadow-2xl border border-purple-200">
      <div className="grid grid-cols-7 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        {WEEKDAYS.map((day) => (
          <div key={day} className="p-3 text-center">
            <span className="text-sm font-bold">{day}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px p-2">
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className={cn(
              "rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md",
              isToday(date) && "bg-gradient-to-br from-yellow-200 to-orange-200 shadow-md"
            )}
          >
            <CalendarDay
              key={date.toISOString()}
              date={date}
              {...dayProps}
              isToday={isToday(date)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
