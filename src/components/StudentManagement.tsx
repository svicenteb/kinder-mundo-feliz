
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash } from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  group: string;
  parentName: string;
  contact: string;
}

const StudentManagement = () => {
  const { toast } = useToast();
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ana García",
      age: 5,
      group: "Preescolar A",
      parentName: "María García",
      contact: "555-1234"
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      age: 4,
      group: "Preescolar B",
      parentName: "José Rodríguez",
      contact: "555-5678"
    },
    {
      id: "3",
      name: "Sofía López",
      age: 5,
      group: "Preescolar A",
      parentName: "Ana López",
      contact: "555-9012"
    }
  ]);
  
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    name: "",
    age: 4,
    group: "Preescolar A",
    parentName: "",
    contact: ""
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const student: Student = {
      ...newStudent,
      id: Date.now().toString()
    };
    
    setStudents([...students, student]);
    setNewStudent({
      name: "",
      age: 4,
      group: "Preescolar A",
      parentName: "",
      contact: ""
    });
    setIsAddingStudent(false);
    
    toast({
      title: "Estudiante agregado",
      description: `${student.name} ha sido agregado exitosamente.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    setStudents(students.filter(s => s.id !== id));
    
    toast({
      title: "Estudiante eliminado",
      description: `${student.name} ha sido eliminado exitosamente.`,
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
                  value={newStudent.group}
                  onValueChange={(value) => setNewStudent({...newStudent, group: value})}
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
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
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
                    <td className="px-4 py-3 text-sm">{student.age} años</td>
                    <td className="px-4 py-3 text-sm">{student.group}</td>
                    <td className="px-4 py-3 text-sm">{student.parentName}</td>
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
          {filteredStudents.length === 0 && (
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
