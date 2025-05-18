
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, MessageSquare, Book, Home } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Calendar,
      label: "Calendario",
      path: "/dashboard",
    },
    {
      icon: MessageSquare,
      label: "Anuncios",
      path: "/anuncios",
    },
    {
      icon: Book,
      label: "Evaluaciones",
      path: "/evaluaciones",
    },
    {
      icon: Home,
      label: "Inicio",
      path: "/",
    },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 md:w-64 bg-kindergarten-dark text-white flex flex-col border-r border-gray-700">
      <div className="p-4 flex flex-col items-center md:items-start">
        <span className="text-xs md:text-sm font-medium text-gray-400 hidden md:block">NAVEGACIÓN</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center justify-center md:justify-start p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-kindergarten-primary text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="ml-3 hidden md:block">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 hidden md:block">
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm font-medium text-center">KinderCRM v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
