export type EventCategory = 'work' | 'personal' | 'other';

export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  category: EventCategory;
}

export interface EventFormData {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  category: EventCategory;
}

export interface DayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: Event[];
  onSelectDate: (date: Date) => void;
  onDrop: (date: Date, eventId: string) => void;
}