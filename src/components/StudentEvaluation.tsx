
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Student {
  id: string;
  name: string;
  age: number;
  group_name: string;
}

interface Evaluation {
  id?: string;
  student_id: string;
  behavior: string;
  academic: string;
  social: string;
  comments: string;
}

const StudentEvaluation = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [evaluation, setEvaluation] = useState<Omit<Evaluation, "student_id">>({
    behavior: "",
    academic: "",
    social: "",
    comments: "",
  });

  // Fetch students from the database
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("students")
        .select("id, name, age, group_name")
        .order("name", { ascending: true });
      
      if (error) {
        toast({
          title: "Error al cargar estudiantes",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch existing evaluation for selected student
  const { data: existingEvaluation } = useQuery({
    queryKey: ["evaluation", selectedStudent?.id],
    queryFn: async () => {
      if (!user || !selectedStudent) return null;
      
      const { data, error } = await supabase
        .from("evaluations")
        .select("*")
        .eq("student_id", selectedStudent.id)
        .maybeSingle();
      
      if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned"
        toast({
          title: "Error al cargar evaluación",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      return data;
    },
    enabled: !!user && !!selectedStudent,
    onSuccess: (data) => {
      if (data) {
        setEvaluation({
          behavior: data.behavior || "",
          academic: data.academic || "",
          social: data.social || "",
          comments: data.comments || "",
        });
      } else {
        setEvaluation({
          behavior: "",
          academic: "",
          social: "",
          comments: "",
        });
      }
    }
  });

  // Save evaluation mutation
  const saveEvaluation = useMutation({
    mutationFn: async (evaluationData: Evaluation) => {
      if (!user) throw new Error("Usuario no autenticado");
      
      if (existingEvaluation) {
        // Update existing evaluation
        const { data, error } = await supabase
          .from("evaluations")
          .update({
            behavior: evaluationData.behavior,
            academic: evaluationData.academic,
            social: evaluationData.social,
            comments: evaluationData.comments,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingEvaluation.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Insert new evaluation
        const { data, error } = await supabase
          .from("evaluations")
          .insert({
            student_id: evaluationData.student_id,
            behavior: evaluationData.behavior,
            academic: evaluationData.academic,
            social: evaluationData.social,
            comments: evaluationData.comments,
            user_id: user.id,
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast({
        title: "Evaluación guardada",
        description: `La evaluación de ${selectedStudent?.name} ha sido guardada.`,
      });
      queryClient.invalidateQueries({ queryKey: ["evaluation", selectedStudent?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al guardar evaluación",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) return;
    
    saveEvaluation.mutate({
      student_id: selectedStudent.id,
      ...evaluation
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Evaluaciones de Estudiantes</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Estudiantes</h2>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin w-6 h-6 border-2 border-kindergarten-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.length > 0 ? (
                students.map((student) => (
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
                      {student.age} años | {student.group_name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No hay estudiantes disponibles
                </div>
              )}
            </div>
          )}
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
                
                <Button 
                  type="submit" 
                  className="bg-kindergarten-primary hover:bg-kindergarten-primary/90 w-full"
                  disabled={saveEvaluation.isPending}
                >
                  {saveEvaluation.isPending ? (
                    <span className="flex items-center justify-center">
                      <span className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Guardando...
                    </span>
                  ) : (
                    "Guardar Evaluación"
                  )}
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
