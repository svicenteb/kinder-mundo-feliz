
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
}

const Announcements = () => {
  const { toast } = useToast();
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    author: "Director"
  });

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const announcement: Announcement = {
      id: uuidv4(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date(),
      author: newAnnouncement.author
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: "", content: "", author: "Director" });
    setIsDialogOpen(false);
    
    toast({
      title: "Anuncio creado",
      description: "El anuncio ha sido creado correctamente"
    });
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    
    toast({
      title: "Anuncio eliminado",
      description: "El anuncio ha sido eliminado correctamente"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anuncios</h1>
        <Button 
          className="bg-kindergarten-primary hover:bg-kindergarten-primary/90"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Nuevo Anuncio
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto" 
                onClick={() => handleDeleteAnnouncement(announcement.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {format(announcement.date, "PPP", { locale: es })} | Por: {announcement.author}
            </p>
            <p className="text-gray-700">{announcement.content}</p>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nuevo Anuncio</DialogTitle>
            <DialogDescription>
              Crea un nuevo anuncio para compartir información importante.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Título
              </label>
              <Input
                id="title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="col-span-3"
                placeholder="Título del anuncio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="content" className="text-right font-medium">
                Contenido
              </label>
              <Textarea
                id="content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                className="col-span-3"
                placeholder="Contenido del anuncio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="author" className="text-right font-medium">
                Autor
              </label>
              <Input
                id="author"
                value={newAnnouncement.author}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, author: e.target.value })}
                className="col-span-3"
                placeholder="Autor del anuncio"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateAnnouncement}>
              Crear Anuncio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
