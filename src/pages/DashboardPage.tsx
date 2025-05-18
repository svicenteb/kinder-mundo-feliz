
import { useState, useEffect } from "react";
import Calendar, { Event } from "@/components/Calendar";
import UpcomingEvents from "@/components/UpcomingEvents";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { session } = useAuthContext();
  const user = session?.user;

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // We need to use a type assertion here since the Supabase types don't include the calendar_events table yet
        const { data, error } = await supabase
          .from("calendar_events" as any)
          .select("*");

        if (error) {
          console.error("Error fetching events:", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los eventos",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Convert date strings to Date objects for display
        const formattedEvents = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date),
          description: event.description || ""
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar los eventos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [user, toast]);

  const handleEventsChange = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Calendario</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Calendar 
                events={events} 
                onEventsChange={handleEventsChange} 
                isLoading={isLoading} 
              />
            </div>
            <div>
              <UpcomingEvents 
                events={events} 
                onEventsChange={handleEventsChange} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
