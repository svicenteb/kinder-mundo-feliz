
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck, Trash2 } from "lucide-react";
import { Event } from "./Calendar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { Spinner } from "./ui/spinner";

interface UpcomingEventsProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
  isLoading?: boolean;
}

const UpcomingEvents = ({ events, onEventsChange, isLoading = false }: UpcomingEventsProps) => {
  const { toast } = useToast();
  const { session } = useAuthContext();
  const user = session?.user;
  
  // Sort events by date (closest first)
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Only show upcoming events (today or in the future)
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  const handleDeleteEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debe iniciar sesión para eliminar eventos",
        variant: "destructive",
      });
      return;
    }

    try {
      // Delete the event from Supabase
      const { error } = await supabase
        .from("calendar_events" as any)
        .delete()
        .eq("id", eventId);

      if (error) {
        console.error("Error deleting event:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el evento",
          variant: "destructive",
        });
        return;
      }

      // Update local state after successful deletion from database
      const updatedEvents = events.filter(event => event.id !== eventId);
      onEventsChange(updatedEvents);
      
      toast({
        title: "Evento eliminado",
        description: "El evento ha sido eliminado correctamente",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el evento",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center" style={{ minHeight: "300px" }}>
        <Spinner size="lg" />
      </div>
    );
  }

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
                disabled={!user}
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
