import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Student {
  id: string;
  name: string;
  age: number;
  group_name: string;
  parent_name: string;
  contact: string;
  code: string;
}

const StudentManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [students, setStudents] = useState<Student[]>([]);
  
  const [newStudent, setNewStudent] = useState<Omit<Student, "id" | "code">>({
    name: "",
    age: 4,
    group_name: "Preescolar A",
    parent_name: "",
    contact: ""
  });

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("name", { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setStudents(data || []);
    } catch (error: any) {
      toast({
        title: "Error al cargar estudiantes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      const newStudentData = {
        ...newStudent,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from("students")
        .insert(newStudentData)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setStudents([...students, data]);
      setNewStudent({
        name: "",
        age: 4,
        group_name: "Preescolar A",
        parent_name: "",
        contact: ""
      });
      setIsAddingStudent(false);
      
      toast({
        title: "Estudiante agregado",
        description: `${newStudent.name} ha sido agregado exitosamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al agregar estudiante",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const student = students.find(s => s.id === id);
      if (!student) return;
      
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id);
      
      if (error) {
        throw error;
      }
      
      setStudents(students.filter(s => s.id !== id));
      
      toast({
        title: "Estudiante eliminado",
        description: `${student.name} ha sido eliminado exitosamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al eliminar estudiante",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: "El código ha sido copiado al portapapeles.",
    });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Estudiantes</h1>
        <Button 
          onClick={() => setIsAddingStudent(true)} 
          className="bg-kindergarten-primary hover:bg-kindergarten-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" /> Agregar Estudiante
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Buscar estudiante..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {isAddingStudent ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Estudiante</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  min="3"
                  max="6"
                  value={newStudent.age}
                  onChange={(e) => setNewStudent({...newStudent, age: parseInt(e.target.value)})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="group">Grupo</Label>
                <Select 
                  value={newStudent.group_name}
                  onValueChange={(value) => setNewStudent({...newStudent, group_name: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preescolar A">Preescolar A</SelectItem>
                    <SelectItem value="Preescolar B">Preescolar B</SelectItem>
                    <SelectItem value="Preescolar C">Preescolar C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentName">Nombre del padre/tutor</Label>
                <Input
                  id="parentName"
                  value={newStudent.parent_name}
                  onChange={(e) => setNewStudent({...newStudent, parent_name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contacto</Label>
                <Input
                  id="contact"
                  value={newStudent.contact}
                  onChange={(e) => setNewStudent({...newStudent, contact: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddingStudent(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-kindergarten-primary hover:bg-kindergarten-primary/90">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-kindergarten-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-500">Cargando estudiantes...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Edad</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grupo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Padre/Tutor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contacto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{student.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{student.code}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(student.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{student.age} años</td>
                      <td className="px-4 py-3 text-sm">{student.group_name}</td>
                      <td className="px-4 py-3 text-sm">{student.parent_name}</td>
                      <td className="px-4 py-3 text-sm">{student.contact}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!isLoading && filteredStudents.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No se encontraron estudiantes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
