
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck, Trash2 } from "lucide-react";
import { Event } from "./Calendar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface UpcomingEventsProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

const UpcomingEvents = ({ events, onEventsChange }: UpcomingEventsProps) => {
  const { toast } = useToast();
  
  // Sort events by date (closest first)
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Only show upcoming events (today or in the future)
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    onEventsChange(updatedEvents);
    
    toast({
      title: "Evento eliminado",
      description: "El evento ha sido eliminado correctamente",
    });
  };

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
              <div className="flex-1">
                <p className="font-semibold capitalize">{format(event.date, "EEEE d 'de' MMMM", { locale: es })}</p>
                <p className="font-medium">{event.title}</p>
                {event.description && (
                  <p className="text-sm text-gray-500">{event.description}</p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                onClick={() => handleDeleteEvent(event.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
