import { Event } from '@/types/calendar';
import { format } from 'date-fns';

export const exportToJSON = (events: Event[], date: Date): void => {
  const monthEvents = events.filter(
    (event) => event.date.startsWith(format(date, 'yyyy-MM'))
  );

  const blob = new Blob([JSON.stringify(monthEvents, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `calendar-events-${format(date, 'yyyy-MM')}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (events: Event[], date: Date): void => {
  const monthEvents = events.filter(
    (event) => event.date.startsWith(format(date, 'yyyy-MM'))
  );

  const headers = ['Date', 'Title', 'Description', 'Start Time', 'End Time', 'Category'];
  const rows = monthEvents.map((event) => [
    event.date,
    event.title,
    event.description || '',
    event.startTime,
    event.endTime,
    event.category,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `calendar-events-${format(date, 'yyyy-MM')}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}