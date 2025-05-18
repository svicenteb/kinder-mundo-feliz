
import Announcements from "@/components/Announcements";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const AnnouncementsPage = () => {
  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
