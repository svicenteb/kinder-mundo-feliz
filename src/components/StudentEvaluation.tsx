
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  age: number;
  group: string;
}

const StudentEvaluation = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [evaluation, setEvaluation] = useState({
    behavior: "",
    academic: "",
    social: "",
    comments: "",
  });

  // Estudiantes de ejemplo
  const students: Student[] = [
    { id: "1", name: "Ana García", age: 5, group: "Preescolar A" },
    { id: "2", name: "Carlos Rodríguez", age: 4, group: "Preescolar B" },
    { id: "3", name: "Sofía López", age: 5, group: "Preescolar A" },
  ];

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    // Reset evaluation form
    setEvaluation({
      behavior: "",
      academic: "",
      social: "",
      comments: "",
    });
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Evaluación guardada",
      description: `La evaluación de ${selectedStudent?.name} ha sido guardada.`,
    });
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Evaluaciones de Estudiantes</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Estudiantes</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedStudent?.id === student.id
                    ? "bg-kindergarten-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleSelectStudent(student)}
              >
                <div className="font-medium">{student.name}</div>
                <div className="text-sm opacity-80">
                  {student.age} años | {student.group}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          {selectedStudent ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Evaluar a {selectedStudent.name}
              </h2>
              <form onSubmit={handleSubmitEvaluation} className="space-y-4">
                <div className="space-y-2">
                  <Label>Comportamiento</Label>
                  <RadioGroup
                    value={evaluation.behavior}
                    onValueChange={(value) =>
                      setEvaluation({ ...evaluation, behavior: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="excelente" id="behavior-excellent" />
                      <Label htmlFor="behavior-excellent">Excelente</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bueno" id="behavior-good" />
                      <Label htmlFor="behavior-good">Bueno</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="regular" id="behavior-fair" />
                      <Label htmlFor="behavior-fair">Regular</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="mejorar" id="behavior-improve" />
                      <Label htmlFor="behavior-improve">Mejorar</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Desempeño académico</Label>
                  <RadioGroup
                    value={evaluation.academic}
                    onValueChange={(value) =>
                      setEvaluation({ ...evaluation, academic: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="excelente" id="academic-excellent" />
                      <Label htmlFor="academic-excellent">Excelente</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bueno" id="academic-good" />
                      <Label htmlFor="academic-good">Bueno</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="regular" id="academic-fair" />
                      <Label htmlFor="academic-fair">Regular</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="mejorar" id="academic-improve" />
                      <Label htmlFor="academic-improve">Mejorar</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Habilidades sociales</Label>
                  <RadioGroup
                    value={evaluation.social}
                    onValueChange={(value) =>
                      setEvaluation({ ...evaluation, social: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="excelente" id="social-excellent" />
                      <Label htmlFor="social-excellent">Excelente</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="bueno" id="social-good" />
                      <Label htmlFor="social-good">Bueno</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="regular" id="social-fair" />
                      <Label htmlFor="social-fair">Regular</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="mejorar" id="social-improve" />
                      <Label htmlFor="social-improve">Mejorar</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Comentarios adicionales</Label>
                  <Textarea
                    id="comments"
                    value={evaluation.comments}
                    onChange={(e) =>
                      setEvaluation({ ...evaluation, comments: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="bg-kindergarten-primary hover:bg-kindergarten-primary/90 w-full">
                  Guardar Evaluación
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500">
                Seleccione un estudiante para crear una evaluación
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluation;
