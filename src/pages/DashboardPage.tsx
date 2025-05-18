
import { useState } from "react";
import Calendar, { Event } from "@/components/Calendar";
import UpcomingEvents from "@/components/UpcomingEvents";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const DashboardPage = () => {
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
              <Calendar events={events} onEventsChange={handleEventsChange} />
            </div>
            <div>
              <UpcomingEvents events={events} onEventsChange={handleEventsChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
