import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, parseISO } from 'date-fns';
import { Event } from '@/types/calendar';

export const generateCalendarDays = (date: Date) => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));

  return eachDayOfInterval({ start, end });
};

export const hasEventOverlap = (
  startTime: string,
  endTime: string,
  date: string,
  events: Event[],
  excludeEventId?: string
): boolean => {
  const dayEvents = events.filter(
    (event) => event.date === date && event.id !== excludeEventId
  );

  const newStart = parseISO(`${date}T${startTime}`);
  const newEnd = parseISO(`${date}T${endTime}`);

  return dayEvents.some((event) => {
    const existingStart = parseISO(`${event.date}T${event.startTime}`);
    const existingEnd = parseISO(`${event.date}T${event.endTime}`);

    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};

export const filterEvents = (events: Event[], searchTerm: string): Event[] => {
  const term = searchTerm.toLowerCase();
  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(term) ||
      event.description?.toLowerCase().includes(term)
  );
};