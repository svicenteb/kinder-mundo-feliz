
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
}

const UpcomingEvents = () => {
  const events: Event[] = [
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
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className="bg-kindergarten-accent/20 p-2 rounded-full">
              <CalendarCheck className="h-5 w-5 text-kindergarten-primary" />
            </div>
            <div>
              <p className="font-semibold">{format(event.date, "EEEE d", { locale: es })}</p>
              <p>{event.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
