
import StudentEvaluation from "@/components/StudentEvaluation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const EvaluationPage = () => {
  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <StudentEvaluation />
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
