
import StudentEvaluation from "@/components/StudentEvaluation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

const EvaluationPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-kindergarten-background">
        <TopBar />
        <Sidebar />
        
        <div className="pt-16 pl-16 md:pl-64">
          <div className="p-6">
            <StudentEvaluation />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default EvaluationPage;
