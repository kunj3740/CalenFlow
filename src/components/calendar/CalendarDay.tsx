import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { DayProps, Event } from '@/types/calendar';

const categoryColors = {
  work: 'bg-blue-400 text-white',
  personal: 'bg-green-400 text-white',
  other: 'bg-purple-400 text-white',
};

export const CalendarDay: React.FC<DayProps> = ({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onSelectDate,
  onDrop,
}) => {
  const dayEvents = events.filter(
    (event) => event.date === format(date, 'yyyy-MM-dd')
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item: { id: string }) => onDrop(date, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        'h-20 xs:h-20 sm:h-24 md:h-26 p-1 transition-all duration-200',
        {
          'bg-blue-100': isSelected,
          'cursor-pointer hover:bg-gray-50': !isSelected,
          'shadow-inner': isOver,
        }
      )}
      onClick={() => onSelectDate(date)}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn('text-xs xs:text-sm font-bold', {
            'text-blue-600': isCurrentMonth,
            'text-purple-600': !isCurrentMonth,
            'bg-yellow-400 text-white rounded-full w-5 h-5 flex items-center justify-center': isToday,
          })}
        >
          {format(date, 'd')}
        </span>
        {dayEvents.length > 0 && (
          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-1 rounded-full">
            <Calendar className="h-2 w-2" />
            <span className="text-[10px]">{dayEvents.length}</span>
          </div>
        )}
      </div>
      <div className="mt-1 space-y-1">
        {dayEvents.slice(0, 2).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {dayEvents.length > 2 && (
          <div className="text-[10px] font-semibold text-purple-600">
            +{dayEvents.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

function EventCard({ event }: { event: Event }) {
  return (
    <div
      className={cn(
        'text-[15px] p-0.5 rounded-sm truncate',
        categoryColors[event.category]
      )}
    >
      {event.title}
    </div>
  );
}

