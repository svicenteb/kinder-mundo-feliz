
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date | string;
  author: string;
  user_id?: string;
}

const Announcements = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    author: "Director"
  });

  // Fetch announcements from Supabase when component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        if (!user) return;

        // We need to use a type assertion here since the Supabase types don't include the announcements table yet
        const { data, error } = await supabase
          .from("announcements" as any)
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.error("Error fetching announcements:", error);
          toast({
            title: "Error",
            description: "No se pudieron cargar los anuncios",
            variant: "destructive"
          });
          return;
        }

        // Convert date strings to Date objects for display
        const formattedData = data.map((announcement: any) => ({
          ...announcement,
          date: new Date(announcement.date)
        }));

        setAnnouncements(formattedData);
      } catch (error) {
        console.error("Error in fetchAnnouncements:", error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar los anuncios",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [user, toast]);

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear anuncios",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const newAnnouncementData: Announcement = {
        id: uuidv4(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date(),
        author: newAnnouncement.author,
        user_id: user.id
      };

      // Insert the new announcement into Supabase
      const { error } = await supabase
        .from("announcements" as any)
        .insert(newAnnouncementData as any);

      if (error) {
        console.error("Error creating announcement:", error);
        toast({
          title: "Error",
          description: "No se pudo crear el anuncio",
          variant: "destructive"
        });
        return;
      }

      // Add the new announcement to the local state
      setAnnouncements([{ ...newAnnouncementData, date: new Date(newAnnouncementData.date) }, ...announcements]);
      setNewAnnouncement({ title: "", content: "", author: "Director" });
      setIsDialogOpen(false);
      
      toast({
        title: "Anuncio creado",
        description: "El anuncio ha sido creado correctamente"
      });
    } catch (error) {
      console.error("Error in handleCreateAnnouncement:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el anuncio",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para eliminar anuncios",
          variant: "destructive"
        });
        return;
      }

      // Delete the announcement from Supabase
      const { error } = await supabase
        .from("announcements" as any)
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting announcement:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el anuncio",
          variant: "destructive"
        });
        return;
      }

      // Remove the announcement from local state
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
      
      toast({
        title: "Anuncio eliminado",
        description: "El anuncio ha sido eliminado correctamente"
      });
    } catch (error) {
      console.error("Error in handleDeleteAnnouncement:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el anuncio",
        variant: "destructive"
      });
    }
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="lg" />
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No hay anuncios disponibles
        </div>
      ) : (
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
                {format(new Date(announcement.date), "PPP", { locale: es })} | Por: {announcement.author}
              </p>
              <p className="text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      )}

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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleCreateAnnouncement} disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Crear Anuncio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
