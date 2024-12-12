import { DayProps } from '@/types/calendar';
import { CalendarDay } from './CalendarDay';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  days: Date[];
  dayProps: Omit<DayProps, 'date'>;
}

export function CalendarGrid({ days, dayProps }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
      {WEEKDAYS.map((day) => (
        <div key={day} className="bg-background p-2 text-center font-medium">
          {day}
        </div>
      ))}
      {days.map((date) => (
        <CalendarDay key={date.toISOString()} date={date} {...dayProps} />
      ))}
    </div>
  );
}