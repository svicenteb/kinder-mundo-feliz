
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Día del Niño",
      date: new Date(2025, 4, 17), // Months are 0-indexed in JS, so 4 = May
      description: "Celebración del día del niño"
    },
    {
      id: "2",
      title: "Feriado",
      date: new Date(2025, 4, 20), // Months are 0-indexed in JS, so 4 = May
      description: "Día feriado nacional"
    }
  ]);
  
  const isMobile = useIsMobile();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Adjust weekday names to match Spanish format (Monday first)
  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = getDay(monthStart);
  
  // Adjust for starting week on Monday (in ES locale)
  // Sunday (0) becomes position 6, Monday (1) becomes position 0
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create an array for empty cells before the first day of the month
  const emptyDays = Array(adjustedFirstDay).fill(null);
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const isToday = (day: Date) => {
    return isSameDay(day, new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentDate(new Date())}
          >
            Hoy
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first of the month */}
        {emptyDays.map((_, idx) => (
          <div key={`empty-${idx}`} className="min-h-12 p-1 bg-gray-50 rounded-md"></div>
        ))}
        
        {/* Actual days of the month */}
        {monthDays.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayHighlight = isToday(day);
          
          return (
            <div
              key={idx}
              className={`min-h-12 p-1 border rounded-md ${
                isCurrentMonth
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-400"
              } ${isTodayHighlight ? "border-kindergarten-primary border-2" : ""} 
                ${dayEvents.length > 0 ? "border-kindergarten-accent" : ""}`}
            >
              <div className={`text-right text-sm ${isTodayHighlight ? "font-bold text-kindergarten-primary" : ""}`}>
                {format(day, "d")}
              </div>
              {dayEvents.length > 0 && !isMobile && (
                <div className="mt-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 bg-kindergarten-accent/20 rounded mb-1 truncate"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
              {dayEvents.length > 0 && isMobile && (
                <div className="mt-1 flex justify-center">
                  <div className="h-2 w-2 rounded-full bg-kindergarten-accent"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <Button className="mt-4 w-full bg-kindergarten-primary hover:bg-kindergarten-primary/90">
        <Plus className="h-4 w-4 mr-2" /> Crear Nuevo Evento
      </Button>
    </div>
  );
};

export default Calendar;
