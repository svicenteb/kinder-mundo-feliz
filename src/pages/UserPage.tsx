
import StudentManagement from "@/components/StudentManagement";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <StudentManagement />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
