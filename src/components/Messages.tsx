
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Messages: React.FC = () => {
  // Mock data for conversations
  const conversations = [
    { id: 1, name: "María López", role: "Madre", lastMessage: "Buenos días, profesor", time: "10:30 AM", unread: true, avatar: "" },
    { id: 2, name: "Carlos Rodríguez", role: "Padre", lastMessage: "¿Podemos hablar sobre las calificaciones?", time: "Ayer", unread: false, avatar: "" },
    { id: 3, name: "Laura Martínez", role: "Madre", lastMessage: "Gracias por la información", time: "Lunes", unread: false, avatar: "" },
    { id: 4, name: "Pedro Gómez", role: "Padre", lastMessage: "Mi hijo estará ausente mañana", time: "23/04", unread: false, avatar: "" },
  ];

  // Mock data for selected conversation
  const messages = [
    { id: 1, sender: "them", content: "Buenos días, profesor. ¿Cómo está usted?", time: "10:30 AM" },
    { id: 2, sender: "me", content: "Buenos días, María. Estoy bien, gracias. ¿En qué puedo ayudarle?", time: "10:32 AM" },
    { id: 3, sender: "them", content: "Quería preguntarle sobre el progreso de mi hijo en matemáticas. Me comentó que le está costando entender algunos conceptos.", time: "10:35 AM" },
    { id: 4, sender: "me", content: "Comprendo su preocupación. He notado que tiene algunas dificultades con las fracciones, pero estamos trabajando en ello. ¿Le gustaría programar una reunión para hablar más detalladamente?", time: "10:40 AM" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Conversations list */}
      <div className="md:col-span-1 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Mensajes</h2>
        </div>
        <div className="p-2 border-b">
          <Input placeholder="Buscar mensajes..." className="w-full" />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 12rem)" }}>
          {conversations.map((conversation) => (
            <div 
              key={conversation.id} 
              className={`p-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${conversation.id === 1 ? 'bg-gray-50' : ''}`}
            >
              <Avatar>
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback className="bg-kindergarten-primary/20 text-kindergarten-primary">
                  {conversation.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="font-medium truncate">{conversation.name}</span>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 truncate">{conversation.lastMessage}</span>
                  {conversation.unread && (
                    <span className="w-2 h-2 bg-kindergarten-primary rounded-full"></span>
                  )}
                </div>
                <span className="text-xs text-kindergarten-secondary">{conversation.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md flex flex-col">
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-kindergarten-primary/20 text-kindergarten-primary">ML</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">María López</h3>
            <span className="text-xs text-kindergarten-secondary">Madre de Juan López • Sala Amarilla</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 16rem)" }}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'me' ? 'flex justify-end' : ''}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'me' 
                    ? 'bg-kindergarten-primary text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block text-right ${
                  message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button className="bg-kindergarten-primary hover:bg-kindergarten-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
