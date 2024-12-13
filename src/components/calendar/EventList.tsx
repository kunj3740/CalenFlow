import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Event } from '@/types/calendar';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface EventListProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventList({
  isOpen,
  onClose,
  selectedDate,
  events,
  onEditEvent,
  onDeleteEvent,
}: EventListProps) {
  const dayEvents = events
    .filter((event) => event.date === format(selectedDate, 'yyyy-MM-dd'))
    .sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  useEffect( () => {
    
  } ,[])
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Events for {format(selectedDate, 'PP')}</SheetTitle>
          <SheetDescription>
            {dayEvents.length === 0
              ? 'No events scheduled for this day.'
              : 'Manage your events for the day.'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg space-y-2 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditEvent(event)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
              <div className="text-sm">
                {event.startTime} - {event.endTime}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}