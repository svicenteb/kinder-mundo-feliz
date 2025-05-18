
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";
import { Event } from "./Calendar";

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  // Sort events by date (closest first)
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Only show upcoming events (today or in the future)
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
      {upcomingEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay eventos próximos</p>
      ) : (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              <div className="bg-kindergarten-accent/20 p-2 rounded-full">
                <CalendarCheck className="h-5 w-5 text-kindergarten-primary" />
              </div>
              <div>
                <p className="font-semibold capitalize">{format(event.date, "EEEE d 'de' MMMM", { locale: es })}</p>
                <p className="font-medium">{event.title}</p>
                {event.description && (
                  <p className="text-sm text-gray-500">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
