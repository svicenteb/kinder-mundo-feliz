
import React from "react";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  schoolName?: string;
  userName?: string;
  userRole?: string;
}

const TopBar: React.FC<TopBarProps> = ({ 
  schoolName = "Colegio Demo", 
  userName = "Usuario Demo", 
  userRole = "Director" 
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-kindergarten-dark text-white shadow-md z-10 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/dashboard" className="border-2 border-kindergarten-primary px-4 py-1 rounded-md">
          <h1 className="text-lg font-bold">{schoolName}</h1>
        </Link>
        <div className="hidden md:block mx-8">
          <h2 className="text-xl font-semibold">PRINCIPAL</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
        <div className="flex items-center">
          <Button variant="ghost" asChild className="p-1">
            <Link to="/usuario" className="flex items-center gap-2">
              <div className="bg-gray-700 rounded-full p-1">
                <User className="h-6 w-6" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-xs text-kindergarten-secondary">{userRole}</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
