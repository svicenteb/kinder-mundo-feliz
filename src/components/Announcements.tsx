
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Reunión de padres",
      content: "Se convoca a todos los padres a una reunión el próximo viernes para discutir las actividades del semestre.",
      date: new Date(2025, 4, 10),
      author: "Director"
    },
    {
      id: "2",
      title: "Horario de verano",
      content: "Les informamos que a partir de la próxima semana comenzará el horario de verano. Las clases terminarán a las 13:00.",
      date: new Date(2025, 4, 5),
      author: "Coordinación"
    }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anuncios</h1>
        <Button className="bg-kindergarten-primary hover:bg-kindergarten-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Nuevo Anuncio
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-lg font-semibold">{announcement.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {format(announcement.date, "PPP", { locale: es })} | Por: {announcement.author}
            </p>
            <p className="text-gray-700">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
