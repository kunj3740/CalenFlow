import { cn } from '@/lib/utils';
import { DayProps, Event } from '@/types/calendar';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useDrop, useDrag } from 'react-dnd';

const categoryColors = {
  work: 'bg-blue-100 text-blue-900',
  personal: 'bg-green-100 text-green-900',
  other: 'bg-purple-100 text-purple-900',
};

export function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onSelectDate,
  onDrop,
}: DayProps) {
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
        'h-32 p-2 border border-border hover:bg-accent/50 cursor-pointer transition-colors',
        {
          'opacity-50': !isCurrentMonth,
          'bg-accent': isSelected,
          'ring-2 ring-primary': isToday,
          'bg-accent/25': isOver,
        }
      )}
      onClick={() => onSelectDate(date)}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn('text-sm font-medium', {
            'text-primary': isCurrentMonth,
            'text-muted-foreground': !isCurrentMonth,
          })}
        >
          {format(date, 'd')}
        </span>
        {dayEvents.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Calendar className="h-3 w-3" />
            <span>{dayEvents.length}</span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        {dayEvents.slice(0, 2).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {dayEvents.length > 2 && (
          <div className="text-xs text-muted-foreground">
            +{dayEvents.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        'text-xs p-1 rounded truncate cursor-move',
        categoryColors[event.category],
        { 'opacity-50': isDragging }
      )}
    >
      {event.title}
    </div>
  );
}