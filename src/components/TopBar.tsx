
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface TopBarProps {
  schoolName?: string;
  userName?: string;
  userRole?: string;
}

const TopBar: React.FC<TopBarProps> = ({ 
  schoolName: defaultSchoolName = "Colegio Demo", 
  userName: defaultUserName = "Usuario Demo", 
  userRole: defaultUserRole = "Director" 
}) => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : defaultUserName;

  const schoolName = profile?.school_name || defaultSchoolName;
  const userRole = profile?.role || defaultUserRole;

  const handleSignOut = () => {
    signOut();
  };

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
        <Button variant="ghost" onClick={handleSignOut} className="p-1">
          <LogOut className="h-5 w-5 text-gray-300 hover:text-white" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
