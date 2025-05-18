
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

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
      date: new Date(2025, 5, 17),
      description: "Celebración del día del niño"
    },
    {
      id: "2",
      title: "Feriado",
      date: new Date(2025, 5, 20),
      description: "Día feriado nacional"
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
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
        {monthDays.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={idx}
              className={`min-h-12 p-1 border rounded-md ${
                isCurrentMonth
                  ? "bg-white text-gray-800"
                  : "bg-gray-100 text-gray-400"
              } ${dayEvents.length > 0 ? "border-kindergarten-accent" : ""}`}
            >
              <div className="text-right text-sm">{format(day, "d")}</div>
              {dayEvents.length > 0 && (
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
