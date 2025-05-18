
import Calendar from "@/components/Calendar";
import UpcomingEvents from "@/components/UpcomingEvents";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Calendario</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Calendar />
            </div>
            <div>
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
