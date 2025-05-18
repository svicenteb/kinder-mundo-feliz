
import React from "react";
import Messages from "@/components/Messages";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const MessagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-kindergarten-background">
      <TopBar />
      <Sidebar />
      
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Mensajes</h1>
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
